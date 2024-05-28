import ScrambleDisplay from "~/components/cubing/ScrambleDisplay";
import StatsDisplay from "~/components/cubing/StatsDisplay";
import Timer from "~/components/cubing/Timer2";
import { api } from "~/trpc/server";

export default async function Home() {
  const sessionSolves = await api.cubeSessions.getCurrentSessionSolves();
  console.log(sessionSolves);

  return (
    <>
      <main className="relative flex flex-1">
        <Timer />
        <div className="absolute inset-x-2  bottom-2 flex items-stretch justify-between">
          <StatsDisplay solves={sessionSolves?.solves} />
          <div>
            <ScrambleDisplay />
          </div>
        </div>
      </main>
    </>
  );
}
