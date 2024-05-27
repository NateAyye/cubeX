"use client";
import { Bell, User2Icon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Sheet, SheetContent, SheetHeader } from "~/components/ui/sheet";
import { useMediaQuery } from "~/hooks/use-media-query";
import { setSidebarState } from "~/store/features/appState/appStateSlice";
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import SidebarLinks from "./_components/sidebar-links";

const Sidebar: React.FC = ({}) => {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const sidebarOpen = useAppSelector((state) => state.appState.sidebarOpen);
  const dispatch = useAppDispatch();

  if (isMobile) {
    return (
      <Sheet
        open={sidebarOpen}
        onOpenChange={(value) => dispatch(setSidebarState(value))}
      >
        <SheetContent side={"left"} className="w-[340px]">
          <SheetHeader className="flex flex-row items-center justify-between py-3">
            <Image
              src={"/cube_desk_logo_light.svg"}
              alt="cube x logo"
              color="black"
              width={120}
              height={42}
            />
            <div className="flex items-center justify-center gap-4">
              <Bell className="h-4 w-4 " />
              <User2Icon className="h-8 w-8 rounded-full border-2 border-white" />
            </div>
          </SheetHeader>
          <SidebarLinks />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside className="min-h-dvh w-auto bg-black/70 px-3 shadow-xl lg:w-[240px]">
      <div className="l:flex-col flex items-center  justify-between py-3 sm:flex-col sm:gap-7 sm:py-6  lg:flex-row">
        <Image
          src="https://cdn.cubedesk.io/static/images/cube_desk_logo_white.svg"
          alt="CubeDesk"
          width={100}
          height={100}
          className="hidden lg:block"
        />
        <Image
          src="/logo_white.svg"
          alt="CubeDesk"
          width={40}
          height={42}
          className="block lg:hidden"
        />
        <div className="flex items-center justify-center gap-4 sm:flex-col lg:flex-row">
          <Bell className="h-4 w-4 " />
          <User2Icon className="h-8 w-8 rounded-full border-2 border-white" />
        </div>
      </div>
      <SidebarLinks />
    </aside>
  );
};

export default Sidebar;
