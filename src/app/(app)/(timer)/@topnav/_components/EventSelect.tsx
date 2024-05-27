"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { setCubingEvent } from "~/store/features/timer/timerSlice";
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import { CUBING_EVENTS, type CubingEvents } from "~/types";

const EventSelect: React.FC = () => {
  const cubingEvent = useAppSelector((state) => state.timer.cubingEvent);
  const dispatch = useAppDispatch();
  return (
    <Select
      onValueChange={(value) => dispatch(setCubingEvent(value as CubingEvents))}
      value={cubingEvent}
    >
      <SelectTrigger className={"h-min w-min gap-3"}>
        <SelectValue defaultValue={cubingEvent} />
      </SelectTrigger>
      <SelectContent>
        {CUBING_EVENTS.map((event) => (
          <SelectItem key={event} value={event}>
            {event}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default EventSelect;
