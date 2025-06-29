"use client";

import { PropertiesContext } from "@/context";
import { useContext } from "react";

export const useProperty = () => {
  const context = useContext(PropertiesContext);
  if (context === undefined) {
    throw new Error("useProperty must be used within a PropertyProvider");
  }
  return context;
};
