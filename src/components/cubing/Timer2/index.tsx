"use client";
import React, { useCallback, useEffect } from "react";
import { useStopwatch } from "~/hooks/use-stopwatch";
import { cn } from "~/lib/utils";
import { type solves } from "~/server/db/schema";
import { setCuberStatus } from "~/store/features/timer/timerSlice";
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import { api } from "~/trpc/react";

const HOLDING_TIME = 500;

const Timer: React.FC = ({}) => {
  const dispatch = useAppDispatch();
  const utils = api.useUtils();
  const solveCreate = api.solves.create.useMutation({
    async onMutate(newSolve) {
      // Cancel outgoing fetches (so they don't overwrite our optimistic update)
      await utils.solves.getCurrentSessionSolves.cancel();

      // Get the data from the queryCache
      const prevData = utils.solves.getCurrentSessionSolves.getData();

      // Optimistically update the data with our new solves
      utils.solves.getCurrentSessionSolves.setData(
        undefined,
        (old: (typeof solves.$inferSelect)[] | undefined) =>
          [...(old as []), newSolve] as (typeof solves.$inferSelect)[],
      );

      // Return the previous data so we can revert if something goes wrong
      return { prevData };
    },
    onError(err, newSolves, ctx) {
      // If the mutation fails, use the context-value from onMutate
      utils.solves.getCurrentSessionSolves.setData(undefined, ctx?.prevData);
    },
    onSettled() {
      // Sync with server once mutation has settled
      void utils.solves.getCurrentSessionSolves.invalidate();
    },
  });
  const cubeMatRef = React.useRef<HTMLDivElement>(null);
  const holdingTimerRef = React.useRef<NodeJS.Timeout>();
  const { baseTime, hours, minutes, seconds, miliseconds, play, pause, reset } =
    useStopwatch();
  const {
    scramble,
    scrambleIsLocked,
    editingScramble,
    cuberStatus,
    cubingEvent,
  } = useAppSelector((state) => state.timer);

  const handleStart = useCallback(() => {
    dispatch(setCuberStatus("HOLDING"));
    reset();
    holdingTimerRef.current = setTimeout(() => {
      dispatch(setCuberStatus("READY"));
    }, HOLDING_TIME);
  }, [reset, dispatch]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent | TouchEvent) => {
      console.log(e.target);

      if (e instanceof TouchEvent && e.target !== cubeMatRef.current) return;
      if (e instanceof KeyboardEvent && cuberStatus === "SOLVING") {
        if (!e.defaultPrevented) e.preventDefault();
        pause();
        dispatch(setCuberStatus("STOPPED"));

        solveCreate.mutate({
          time: baseTime,
          scramble: scramble,
          cubingEvent,
          ao5: 0,
        });
        return;
      }
      if (e instanceof KeyboardEvent && e.key !== " ") return;
      if (cuberStatus === "HOLDING") return;
      if (cuberStatus === "STOPPED") {
        if (!e.defaultPrevented) e.preventDefault();
        handleStart();
      }
      if (cuberStatus === "SOLVING") {
        if (!e.defaultPrevented) e.preventDefault();
        pause();
        dispatch(setCuberStatus("STOPPED"));
        solveCreate.mutate({
          time: baseTime,
          scramble: scramble,
          cubingEvent,
          ao5: 0,
        });
      }
    },
    [
      cuberStatus,
      handleStart,
      pause,
      dispatch,
      baseTime,
      scramble,
      cubingEvent,
      solveCreate,
    ],
  );

  const handleKeyUp = useCallback(() => {
    if (cuberStatus === "HOLDING") {
      clearTimeout(holdingTimerRef.current);
      dispatch(setCuberStatus("STOPPED"));
    }
    if (cuberStatus === "READY") {
      play();
      dispatch(setCuberStatus("SOLVING"));
    }
  }, [cuberStatus, play, dispatch]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    document.addEventListener("touchstart", handleKeyDown);
    document.addEventListener("touchend", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
      document.removeEventListener("touchstart", handleKeyDown);
      document.removeEventListener("touchend", handleKeyUp);
    };
  });

  return (
    <div className="flex flex-1">
      <div className="relative flex-1">
        <div
          id="cube-mat"
          ref={cubeMatRef}
          className={cn("absolute inset-0 transition-all duration-500 ease-in")}
        />
        <span className="absolute inset-x-0 top-5 text-center text-3xl text-muted-foreground">
          {scramble}
        </span>
        <div
          id="stopwatch"
          className={cn(
            "absolute inset-0 flex items-center justify-center text-center font-mono font-semibold",
            cuberStatus === "HOLDING" ? "text-yellow-500" : "",
            cuberStatus === "READY" ? "text-green-500" : "",
          )}
        >
          <div className="mb-20">
            {hours > 0 ? <span className="text-8xl">{hours}:</span> : <></>}
            {minutes > 0 ? <span className="text-8xl">{minutes}:</span> : <></>}
            <span className="text-8xl">{seconds}</span>
            <span className="text-7xl">.</span>
            <span className="text-6xl">
              {miliseconds.toString().padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
