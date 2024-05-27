import { ThemeToggle } from "~/components/theme/theme-switcher";
import { getServerAuthSession } from "~/server/auth";
import EventSelect from "./_components/EventSelect";
import SessionSelect from "./_components/SessionSelect";
import SidebarButton from "./_components/SidebarButton";

export default async function TopNav({}) {
  const session = await getServerAuthSession();

  return (
    <nav className="flex items-center justify-between px-2 py-3">
      <div className="flex items-center justify-center gap-4">
        {/* SideBar Button */}
        <SidebarButton />

        {/* Cubing Event Select */}
        <EventSelect />
      </div>

      {/* Cubing Session Select */}
      <SessionSelect currentSessionId={session?.user.currentSessionId} />

      <ThemeToggle />
    </nav>
  );
}
