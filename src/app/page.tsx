"use client";

import { useFormStep } from "@/hooks/useFormStep";
import PropertyOwner from "./components/step-one/property-owner";
import CondominiumsInfo from "./components/step-two/condominiums-info";

export default function Home() {
  const { step } = useFormStep();

  const renderComponent = () => {
    switch (step) {
      case 1:
        return <PropertyOwner />;
      case 2:
        return <CondominiumsInfo />;
      case 3:
        return <div>Step 3 Component</div>;
      default:
        return <div>Default Component</div>;
    }
  };
  return (
    <main className='w-full h-auto mt-[70.53px] mb-[68px] font-fustat'>
      {renderComponent()}
    </main>
  );
}
