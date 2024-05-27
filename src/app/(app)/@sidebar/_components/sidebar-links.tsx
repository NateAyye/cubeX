import React from "react";

import { FlaskConical, PieChart, Rows3, Timer, Wrench } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";

const links: {
  href: string;
  Icon: React.ElementType;
  label: string;
}[] = [
  { href: "/", Icon: Timer, label: "Timer" },
  { href: "/stats", Icon: PieChart, label: "Stats" },
  { href: "/trainer", Icon: FlaskConical, label: "Trainer" },
  { href: "/sessions", Icon: Rows3, label: "Sessions" },
  { href: "/settings", Icon: Wrench, label: "Settings" },
];

const SidebarLinks: React.FC = ({}) => {
  const pathname = usePathname();
  return (
    <nav>
      <ul className="[&>*:not(:last-child)]:mb-7">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="flex items-center justify-start gap-3 sm:m-auto"
            >
              <link.Icon
                className={cn(
                  "m-0 h-7 w-7 sm:m-auto lg:m-0",
                  link.href === pathname
                    ? "stroke-primary-foreground"
                    : "stroke-muted-foreground",
                )}
              />
              <span
                className={cn(
                  "font-degular text-2xl font-[500] leading-4 sm:hidden lg:block",
                  link.href === pathname
                    ? "text-primary-foreground"
                    : "text-muted-foreground",
                )}
              >
                {link.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SidebarLinks;
