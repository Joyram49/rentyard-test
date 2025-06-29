"use client";
import React, { createContext } from "react";

type PropertiesContextType = {
  type: string;
  role: string;
};

type PropertiesContextValue = {
  properties: PropertiesContextType;
  setProperties: React.Dispatch<React.SetStateAction<PropertiesContextType>>;
};


type ValidFormContextType = {
  isFormValid: boolean;
  setIsFormValid: React.Dispatch<React.SetStateAction<boolean>>;
};


type FormStepContextType = {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const PropertiesContext = createContext<PropertiesContextValue | undefined>(
  undefined
);

const ValidFormContext = createContext<ValidFormContextType | undefined>(
  undefined
);

const FormStepContext = createContext<FormStepContextType | undefined>(
  undefined
);

export { FormStepContext, PropertiesContext, ValidFormContext };
export type {
  FormStepContextType, PropertiesContextType,
  PropertiesContextValue,
  ValidFormContextType
};

