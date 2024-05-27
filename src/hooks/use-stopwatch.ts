import { useCallback, useRef, useState } from "react";

export const useStopwatch = (startTime?: number) => {
  const timerId = useRef<NodeJS.Timeout>();

  const [status, setStatus] = useState<"OFF" | "ON">("OFF");
  const [baseTime, setBaseTime] = useState(0);

  const [formattedTime, setFormattedTime] = useState(
    startTime
      ? {
          hours: Math.floor(startTime / 360000),
          minutes: Math.floor((startTime / 6000) % 60),
          seconds: Math.floor((startTime / 100) % 60),
          miliseconds: startTime % 100,
        }
      : {
          hours: 0,
          minutes: 0,
          seconds: 0,
          miliseconds: 0,
        },
  );

  const play = useCallback(() => {
    if (timerId.current) clearInterval(timerId.current);
    setStatus(() => "ON");
    timerId.current = setInterval(() => {
      setBaseTime((time) => {
        const hours = Math.floor(time / 360000);
        const minutes = Math.floor((time / 6000) % 60);
        const seconds = Math.floor((time / 100) % 60);
        const miliseconds = time % 100;
        setFormattedTime({ hours, minutes, seconds, miliseconds });
        return time + 1;
      });
    }, 10);

    return () => clearInterval(timerId.current);
  }, [setBaseTime, setFormattedTime]);

  const pause = useCallback(() => {
    setStatus(() => "OFF");
    if (timerId.current) clearInterval(timerId.current);
  }, []);

  const reset = useCallback(() => {
    if (timerId.current) clearInterval(timerId.current);
    setStatus(() => "OFF");
    setBaseTime(0);
    setFormattedTime({ hours: 0, minutes: 0, seconds: 0, miliseconds: 0 });
  }, []);

  return { ...formattedTime, baseTime, play, pause, reset, status };
};
