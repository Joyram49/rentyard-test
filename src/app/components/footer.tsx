"use client";
import { Button } from "@/components/ui/button";
import { useFormStep } from "@/hooks/useFormStep";
import { useValidForm } from "@/hooks/useValidForm";

function Footer() {
  const { isFormValid } = useValidForm();
  const { step, setStep } = useFormStep();
  return (
    <footer className='fixed bottom-0 left-0 right-0 p-4 text-center w-full flex justify-between items-center py-4 px-20 shadow-one'>
      <Button
        variant='link'
        className='cursor-pointer underline font-semibold text-[#272B35] font-fustat'
        disabled={step === 1}
        onClick={() => setStep((prev) => Math.max(prev - 1, 1))}
      >
        Back
      </Button>
      <Button
        className={`bg-[#316EED] py-3 px-6 ${
          !isFormValid && "opacity-30 cursor-not-allowed"
        } cursor-pointer`}
        disabled={!isFormValid || step === 3}
        onClick={() => setStep((prev) => Math.min(prev + 1, 3))}
      >
        Get Started
      </Button>
    </footer>
  );
}

export default Footer;
