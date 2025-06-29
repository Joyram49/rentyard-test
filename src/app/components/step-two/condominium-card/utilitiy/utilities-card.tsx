import Image from "next/image";
import { useState } from "react";
import WrapperCardModal from "../wrapper-card-modal";
import UtilitiesForm, { Utilities } from "./utilities-form";

export default function UtilitiesCard() {
  const [formData, setFormData] = useState<Utilities[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUtility, setSelectedUtility] = useState<Utilities | null>(
    null
  );

  // Only show summary if at least one utility is added
  const hasFormValues = formData.length > 0;

  // Modal close function
  const handleClose = () => {
    setIsOpen(false);
  };

  // Function to handle utility selection for editing
  const handleEditUtility = (utility: Utilities) => {
    setSelectedUtility(utility);
    setIsOpen(true);
  };

  // Function to remove a utility
  const handleRemoveUtility = (id: string) => {
    setFormData((prevData) => prevData.filter((util) => util.id !== id));
  };

  return (
    <div className='rounded-[20px] custom-border w-full flex flex-col items-start justify-center hover:bg-gray-50 transition-colors'>
      <div className='w-full flex items-center justify-between p-5'>
        <h2 className='text-lg font-[600] text-[#272B35]'>
          Utilities Provider
          <span className='text-[#6F6C6A]'>(Optional but recommended)</span>
        </h2>
        <WrapperCardModal
          title='Utilities Provider'
          isOpen={isOpen}
          setIsOpen={(open) => {
            if (!open) handleClose();
            else setIsOpen(true);
          }}
          content={
            <UtilitiesForm
              initialData={selectedUtility}
              setFormData={setFormData}
              closeModal={() => {
                setIsOpen(false);
                setSelectedUtility(null);
              }}
            />
          }
        >
          <div
            className='flex justify-center items-center gap-x-[6px] cursor-pointer'
            onClick={() => {
              setSelectedUtility(null);
              setIsOpen(true);
            }}
          >
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
              {formData.map((util) => (
                <div
                  key={util.id}
                  className='w-full flex gap-x-4 items-center justify-between custom-border-b last:border-0 py-3.5'
                >
                  <p className='text-[#272B35] text-base font-[600]'>
                    {util.type}-Utilities {util.provider}
                  </p>
                  <div className='flex gap-x-3 items-center justify-end'>
                    <Image
                      src='/pencil-edit-02 (1).svg'
                      alt='pencil svg'
                      width={24}
                      height={24}
                      className='cursor-pointer'
                      onClick={() => handleEditUtility(util)}
                    />
                    <Image
                      src='/delete-02.svg'
                      alt='delete svg'
                      width={24}
                      height={24}
                      className='cursor-pointer'
                      onClick={() => handleRemoveUtility(util.id)}
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
