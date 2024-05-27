import { redirect } from "next/navigation";
import React from "react";
import { getServerAuthSession } from "~/server/auth";

interface MainAppLayoutProps {
  children: React.ReactNode;
  topnav?: React.ReactNode;
  sidebar?: React.ReactNode;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = async ({
  children,
  sidebar,
}) => {
  const session = await getServerAuthSession();

  if (!session) {
    // if (process.env.NODE_ENV === "production")
    redirect("/home");
  }

  return (
    <div className="flex">
      {sidebar}
      <div className="flex min-h-dvh flex-1 flex-col">{children}</div>
    </div>
  );
};

export default MainAppLayout;
