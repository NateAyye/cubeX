import Image from "next/image";

export default async function Home() {

  return (
    <>
      <div>
        <aside>
          <div>
            <Image
              src={"/cube_desk_logo_light.svg"}
              alt="cube x logo"
              color="black"
              width={100}
              height={42}
            />
          </div>
          <div></div>
        </aside>
        <main className="flex min-h-screen bg-background">
          <div></div>
        </main>
      </div>
    </>
  );
}
