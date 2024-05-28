"use client";
import React from "react";
import { DisplayCube, applyScramble, type Cube } from "react-rubiks-cube-utils";
import { useAppSelector } from "~/store/hooks";
import { type CubingEvents } from "~/types";

interface ScrambleDisplayProps {
  scramble?: string;
  cubingEvent?: CubingEvents;
  size?: number;
}

const SUPPORTED_EVENTS = ["2x2", "3x3", "4x4", "5x5", "6x6", "7x7"];

const ScrambleDisplay: React.FC<ScrambleDisplayProps> = (props) => {
  const { scramble, cubingEvent } = useAppSelector((state) => state.timer);
  if (!SUPPORTED_EVENTS.includes(props.cubingEvent ?? cubingEvent)) {
    return null;
  }
  const myCube: Cube = applyScramble({
    type: props.cubingEvent ?? cubingEvent,
    scramble: props.scramble ?? scramble,
  });
  return <DisplayCube size={props.size ?? 10} cube={myCube} />;
};

export default ScrambleDisplay;
