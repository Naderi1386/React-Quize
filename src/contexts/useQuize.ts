import { useContext } from "react";
import { QuizeProvider } from "./QuizeContext";

export const useQuize = () => {
  const context = useContext(QuizeProvider);
  if (!context) throw new Error("you must use context inside the provider");
  return context;
};
