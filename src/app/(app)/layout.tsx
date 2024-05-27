import { redirect } from "next/navigation";
import React from "react";
import { getServerAuthSession } from "~/server/auth";

interface MainAppLayoutProps {
  children: React.ReactNode;
  topnav?: React.ReactNode;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = async ({
  children,
  topnav,
}) => {
  const session = await getServerAuthSession();

  if (!session) {
    // if (process.env.NODE_ENV === "production")
     redirect("/home");
  }

  return (
    <>
      {topnav}
      {children}
    </>
  );
};

export default MainAppLayout;
