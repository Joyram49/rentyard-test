import Image from "next/image";
import { useState } from "react";
import WrapperCardModal from "../wrapper-card-modal";
import PetFeesForm from "./pet-fees-form";

type PatFees = {
  id: string; // unique identifier for each pet fee
  petType: string; // select pet type e.g., "Dog", "Cat"
  weight: string; // input weight in lb
  oneTimeFee: string; // input one-time fee
  monthlyFee: string; // input monthly fee
  securityDeposit: string; // input security deposit
};

export default function PetFees() {
  const [formData, setFormData] = useState<PatFees[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState<PatFees | null>(null);

  // Only show summary if at least one pet fee is added
  const hasFormValues = formData.length > 0;

  // Modal close function
  const handleClose = () => {
    setIsOpen(false);
  };

  // Function to handle pet selection for editing
  const handleEditPet = (pet: PatFees) => {
    setSelectedPet(pet);
    setIsOpen(true);
  };

  // Function to remove a pet fee
  const handleRemovePet = (id: string) => {
    setFormData((prevData) => prevData.filter((p) => p.id !== id));
  };

  return (
    <div className='rounded-[20px] custom-border w-full flex flex-col items-start justify-center hover:bg-gray-50 transition-colors'>
      <div className='w-full flex items-center justify-between p-5'>
        <h2 className='text-lg font-[600] text-[#272B35]'>
          Pet Fees
          <span className='text-[#6F6C6A]'>
            (Optional, add fees if you allow pet)
          </span>
        </h2>
        <WrapperCardModal
          title='Pet Fees'
          isOpen={isOpen}
          setIsOpen={(open) => {
            if (!open) handleClose();
            else setIsOpen(true);
          }}
          content={
            <PetFeesForm
              initialData={selectedPet}
              setFormData={setFormData}
              closeModal={handleClose}
            />
          }
        >
          <div className='flex justify-center items-center gap-x-[6px] cursor-pointer'>
            <Image
              src='/plus-sign.svg'
              alt='plus sign'
              width={22}
              height={22}
            />
            <p className='font-[600] underline  text-[#316EED]'>Add</p>
          </div>
        </WrapperCardModal>
      </div>
      {hasFormValues && (
        <div className='w-full custom-border-t '>
          <div className='p-5'>
            <div className='w-full flex flex-col gap-y-2 justify-center items-start'>
              {formData.map((pet) => (
                <div
                  key={pet.id}
                  className='w-full flex gap-x-4 items-center justify-between custom-border-b last:border-0 py-3.5'
                >
                  <div className='flex flex-col gap-y-2'>
                    <p className='text-[#272B35] text-base font-[600]'>
                      {pet.petType}, Max Weight: {pet.weight}lb, Monthly per
                      rent: ${pet.monthlyFee}
                    </p>
                    <p className='text-[#272B35] text-base font-[600]'>
                      One time pet fee: ${pet.oneTimeFee}, Pet security deposit:
                      ${pet.securityDeposit}
                    </p>
                  </div>
                  <div className='flex gap-x-3 items-center justify-end'>
                    <Image
                      src='/pencil-edit-02 (1).svg'
                      alt='pencil svg'
                      width={24}
                      height={24}
                      className='cursor-pointer'
                      onClick={() => handleEditPet(pet)}
                    />
                    <Image
                      src='/delete-02.svg'
                      alt='delete svg'
                      width={24}
                      height={24}
                      className='cursor-pointer'
                      onClick={() => handleRemovePet(pet.id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
