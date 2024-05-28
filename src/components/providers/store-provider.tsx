"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, type AppStore } from "~/store/store";

type StoreProviderProps = {
  children: React.ReactNode;
};

export default function StoreProvider({
  children,
}: StoreProviderProps) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    // storeRef.current.dispatch(setSessionSolves(solves))
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
