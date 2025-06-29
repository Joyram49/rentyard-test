"use client";
import { PropertiesContext } from "@/context";
import React, { useState } from "react";

interface PropertyProviderProps {
  children: React.ReactNode;
}

function PropertyProvider({ children }: PropertyProviderProps) {
  const [properties, setProperties] = useState({
    type: "",
    role: "",
  });

  return (
    <PropertiesContext.Provider value={{ properties, setProperties }}>
      {children}
    </PropertiesContext.Provider>
  );
}

export default PropertyProvider;
