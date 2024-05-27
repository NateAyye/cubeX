"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { CUBING_EVENTS, type CubingEvents } from "~/types";

const EventSelect: React.FC = () => {
  const [event, setEvent] = useState<CubingEvents>(CUBING_EVENTS[0]);
  return (
    <Select
      onValueChange={(value) => setEvent(value as CubingEvents)}
      value={event}
    >
      <SelectTrigger className={"h-min w-min gap-3"}>
        <SelectValue defaultValue={event} />
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
