import React from "react";

interface TimerLayoutProps {
  children?: React.ReactNode;
  topnav?: React.ReactNode;
}

const TimerLayout: React.FC<TimerLayoutProps> = ({ children, topnav }) => {
  return (
    <>
      {topnav}
      {children}
    </>
  );
};

export default TimerLayout;
