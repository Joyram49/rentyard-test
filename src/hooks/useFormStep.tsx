"use client";

import { FormStepContext } from "@/context";
import { useContext } from "react";

export const useFormStep = () => {
  const context = useContext(FormStepContext);
  if (!context) {
    throw new Error("useFormStep must be used within a FormStepProvider");
  }

  return context;
};
