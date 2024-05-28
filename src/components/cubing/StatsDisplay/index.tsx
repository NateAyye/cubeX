"use client";
import React from "react";
import { convertToTimeString } from "~/lib/utils";

import { type solves } from "~/server/db/schema";
import { api } from "~/trpc/react";

interface StatsDisplayProps {
  solves?: (typeof solves.$inferSelect)[];
}

const StatsDisplay: React.FC<StatsDisplayProps> = ({}) => {
  const {
    isPending,
    data: solves,
    isError,
  } = api.solves.getCurrentSessionSolves.useQuery();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  const bestSolve = solves.reduce((best, solve) => {
    if (solve.time < best) {
      return solve.time;
    }
    return best;
  }, Infinity);

  const ao5 =
    solves.length > 4
      ? solves.reduce((ao5, solve, i) => {
          if (i < 5) {
            return ao5 + solve.time;
          }
          return ao5;
        }, 0) / 5
      : 0;

  // the best average of five for the current session
  const ao5pb = solves.reduce((ao5pb, solve) => {
    if (solve.ao5 < ao5pb) {
      return solve.ao5;
    }
    return ao5pb;
  }, Infinity);

  const worstSolve = solves.reduce((worst, solve) => {
    if (solve.time > worst) {
      return solve.time;
    }
    return worst;
  }, 0);

  const avg =
    solves.reduce((avg, solve) => avg + solve.time, 0) / solves.length;

  return (
    <div className="grid  max-w-96 flex-1 grid-cols-4 grid-rows-3  gap-1  text-sm">
      <div className="relative col-start-1 col-end-3 row-start-1 row-end-3 rounded border px-2">
        pb:
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {bestSolve
            ? !isFinite(bestSolve)
              ? "N/A"
              : convertToTimeString(bestSolve)
            : ""}
        </span>
      </div>
      <div className="relative col-start-1 col-end-3 row-start-3 row-end-4 rounded border px-2">
        Worst:
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {!!worstSolve ? convertToTimeString(worstSolve) : "N/A"}
        </span>
      </div>
      <div className="relative col-span-2 rounded border px-2">
        avg:
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {!!avg ? convertToTimeString(avg) : "N/A"}
        </span>
      </div>

      <div className=" relative col-span-2 rounded border px-2">
        Ao5:
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {!!ao5 ? convertToTimeString(ao5) : "N/A"}
        </span>
      </div>
      <div className="relative col-span-2 rounded border px-2">
        Ao5pb:
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {ao5pb ? (!isFinite(ao5pb) ? "N/A" : convertToTimeString(ao5pb)) : ""}
        </span>
      </div>
    </div>
  );
};

export default StatsDisplay;
