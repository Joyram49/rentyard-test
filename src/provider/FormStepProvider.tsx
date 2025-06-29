"use client";
import { FormStepContext } from "@/context";
import React, { useState } from "react";

export default function FormStepProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [step, setStep] = useState<number>(1);
  return (
    <FormStepContext.Provider value={{ step, setStep }}>
      {children}
    </FormStepContext.Provider>
  );
}
