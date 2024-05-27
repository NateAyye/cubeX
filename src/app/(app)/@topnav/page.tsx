import { Menu } from "lucide-react";
import { ThemeToggle } from "~/components/theme-switcher";
import { Button } from "~/components/ui/button";
import { getServerAuthSession } from "~/server/auth";
import EventSelect from "./_components/EventSelect";
import SessionSelect from "./_components/SessionSelect";

export default async function TopNav({}) {
  const session = await getServerAuthSession();

  return (
    <nav>
      {/* SideBar Button */}
      <Button variant="outline" className="h-8 w-8 p-0">
        <Menu className="h-5 w-5" />
      </Button>

      {/* Cubing Event Select */}
      <EventSelect />

      {/* Cubing Session Select */}
      <SessionSelect currentSessionId={session?.user.currentSessionId} />

      <ThemeToggle />
    </nav>
  );
}
