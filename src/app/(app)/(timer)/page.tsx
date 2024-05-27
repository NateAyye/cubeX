import Timer from "~/components/cubing/Timer";

export default async function Home() {
  return (
    <>
      <main className="flex flex-1 relative bg-background">
        <Timer />
      </main>
    </>
  );
}
