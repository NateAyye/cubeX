"use client";
import { Copy, LockIcon, PencilIcon, RotateCw } from "lucide-react";
import React, { useCallback, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { useStopwatch } from "~/hooks/use-stopwatch";
import { cn, copyToClipboard } from "~/lib/utils";
import { getNewScramble, setScramble } from "~/store/features/timer/timerSlice";
import { useAppDispatch, useAppSelector } from "~/store/hooks";

type CuberStatus = "READY" | "HOLDING" | "STOPPED" | "SOLVING";

//Holding Time (in Milliseconds)
const HOLDING_TIME = 500;

const Timer: React.FC = ({}) => {
  const scramble = useAppSelector((state) => state.timer.scramble);
  const dispatch = useAppDispatch();

  const { hours, minutes, seconds, miliseconds, play, pause, reset } =
    useStopwatch();

  const scrambleRef = React.useRef<HTMLDivElement>(null);
  const cubeMatRef = React.useRef<HTMLDivElement>(null);
  const holdingTimerRef = React.useRef<NodeJS.Timeout>();
  const [cuberStatus, setCuberStatus] = React.useState<CuberStatus>("STOPPED");
  const [editingScramble, setEditingScramble] = React.useState(false);
  const [scrambleIsLocked, setScrambleIsLocked] = React.useState(false);

  const handleStart = useCallback(() => {
    setCuberStatus(() => "HOLDING");
    reset();
    holdingTimerRef.current = setTimeout(() => {
      setCuberStatus(() => "READY");
    }, HOLDING_TIME);
  }, [reset]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent | TouchEvent) => {
      if (e instanceof TouchEvent && e.target !== cubeMatRef.current) return;
      if (e instanceof KeyboardEvent && cuberStatus === "SOLVING") {
        if (!e.defaultPrevented) e.preventDefault();
        pause();
        setCuberStatus(() => "STOPPED");
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
        setCuberStatus(() => "STOPPED");
      }
    },
    [cuberStatus, handleStart, pause],
  );

  const handleKeyUp = useCallback(() => {
    if (cuberStatus === "HOLDING") {
      clearTimeout(holdingTimerRef.current);
      setCuberStatus(() => "STOPPED");
    }
    if (cuberStatus === "READY") {
      play();
      setCuberStatus(() => "SOLVING");
    }
  }, [cuberStatus, play]);

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
    <div
      id="cube-mat"
      className="absolute inset-0 flex items-center justify-center p-4"
      ref={cubeMatRef}
    >
      <div className="space-y-5">
        <div
          ref={scrambleRef}
          contentEditable={editingScramble}
          className={cn(
            " text-muted-foreground text-2xl rounded px-5 text-center",
            editingScramble ? "border-2 border-yellow-500" : "",
          )}
        >
          {scramble}
        </div>
        <div
          id="stopwatch"
          className={cn(
            "text-center font-mono font-semibold",
            cuberStatus === "HOLDING" ? "text-yellow-500" : "",
            cuberStatus === "READY" ? "text-green-500" : "",
          )}
        >
          {hours > 0 ? <span className="text-8xl">{hours}:</span> : <></>}
          {minutes > 0 ? <span className="text-8xl">{minutes}:</span> : <></>}
          <span className="text-8xl">{seconds}</span>
          <span className="text-7xl">.</span>
          <span className="text-6xl">
            {miliseconds.toString().padStart(2, "0")}
          </span>
        </div>
        <div className="flex items-center justify-center gap-4">
          <Button
            variant={"secondary"}
            className={cn(
              " h-8 w-8 p-0",
              editingScramble ? "bg-secondary/80 text-red-600" : "",
            )}
            onClick={() => {
              setEditingScramble((prev) => !prev);
              dispatch(setScramble(scrambleRef.current?.innerText ?? ""));
              setTimeout(() => {
                if (scrambleRef.current) scrambleRef.current.focus();
              }, 0);
            }}
          >
            <PencilIcon className={"h-5 w-5"} />
          </Button>
          <Button
            variant={"secondary"}
            className={cn(
              " h-8 w-8 p-0",
              scrambleIsLocked ? "bg-secondary/80 text-red-600" : "",
            )}
            onClick={() => {
              setScrambleIsLocked((prev) => !prev);
            }}
          >
            <LockIcon className="h-5 w-5" />
          </Button>
          <Button
            variant={"secondary"}
            className={cn(" h-8 w-8 p-0")}
            onClick={() => copyToClipboard(scramble)}
          >
            <Copy className="h-5 w-5" />
          </Button>
          <Button
            variant={"secondary"}
            className={cn(" h-8 w-8 p-0")}
            onClick={() => {
              if (scrambleIsLocked) return;
              if (editingScramble) return;
              dispatch(getNewScramble("3x3"));
            }}
          >
            <RotateCw className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Timer;
