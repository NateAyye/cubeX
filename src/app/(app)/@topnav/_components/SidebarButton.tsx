"use client";
import { Menu } from "lucide-react";
import React from "react";
import { Button } from "~/components/ui/button";
import { setSidebarState } from "~/store/features/appState/appStateSlice";
import { useAppDispatch } from "~/store/hooks";

const SidebarButton: React.FC = ({}) => {
  const dispatch = useAppDispatch();

  return (
    <Button
      onClick={() => {
        dispatch(setSidebarState(true));
      }}
      variant="outline"
      className="h-9 w-9 p-0 sm:hidden"
    >
      <Menu className="h-6 w-6" />
    </Button>
  );
};

export default SidebarButton;
