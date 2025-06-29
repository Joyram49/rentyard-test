"use client";

import { ValidFormContext } from "@/context";
import { useContext } from "react";

export const useValidForm = () => {
  const context = useContext(ValidFormContext);
  if (context === undefined) {
    throw new Error("useValidForm must be used within a ValidFormProvider");
  }
  return context;
};
