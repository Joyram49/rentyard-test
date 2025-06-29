"use client";
import { ValidFormContext } from "@/context";
import React, { useState } from "react";

interface ValidFormProviderProps {
  children: React.ReactNode;
}

function ValidFormProvider({ children }: ValidFormProviderProps) {
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  return (
    <ValidFormContext.Provider value={{ isFormValid, setIsFormValid }}>
      {children}
    </ValidFormContext.Provider>
  );
}

export default ValidFormProvider;
