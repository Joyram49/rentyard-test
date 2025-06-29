import Image from "next/image";
import { useState } from "react";
import WrapperCardModal from "../wrapper-card-modal";
import NearestLandmarkForm, { NearestLandmark } from "./nearest-landmark-form";

export default function NearestLandmarkCard() {
  const [formData, setFormData] = useState<NearestLandmark[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLandmark, setSelectedLandmark] =
    useState<NearestLandmark | null>(null);

  // Only show summary if at least one landmark is added
  const hasFormValues = formData.length > 0;

  // Modal close function
  const handleClose = () => {
    setIsOpen(false);
  };

  // Function to handle landmark selection for editing
  const handleEditLandmark = (landmark: NearestLandmark) => {
    setSelectedLandmark(landmark);
    setIsOpen(true);
  };

  // Function to remove a landmark
  const handleRemoveLandmark = (id: string) => {
    setFormData((prevData) => prevData.filter((lm) => lm.id !== id));
  };

  return (
    <div className='rounded-[20px] custom-border w-full flex flex-col items-start justify-center hover:bg-gray-50 transition-colors'>
      <div className='w-full flex items-center justify-between p-5'>
        <h2 className='text-lg font-[600] text-[#272B35]'>
          Nearest landmark
          <span className='text-[#6F6C6A]'>(Optional but recommended)</span>
        </h2>
        <WrapperCardModal
          title='Nearest Landmark'
          isOpen={isOpen}
          setIsOpen={(open) => {
            if (!open) handleClose();
            else setIsOpen(true);
          }}
          content={
            <NearestLandmarkForm
              initialData={selectedLandmark}
              setFormData={setFormData}
              closeModal={() => {
                setIsOpen(false);
                setSelectedLandmark(null);
              }}
            />
          }
        >
          <div
            className='flex justify-center items-center gap-x-[6px] cursor-pointer'
            onClick={() => {
              setSelectedLandmark(null);
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
              {formData.map((lm) => (
                <div
                  key={lm.id}
                  className='w-full flex gap-x-4 items-center justify-between custom-border-b last:border-0 py-3.5'
                >
                  <p className='text-[#272B35] text-base font-[600]'>
                    {lm.type}, {lm.name}, {lm.distance} mile
                  </p>
                  <div className='flex gap-x-3 items-center justify-end'>
                    <Image
                      src='/pencil-edit-02 (1).svg'
                      alt='pencil svg'
                      width={24}
                      height={24}
                      className='cursor-pointer'
                      onClick={() => handleEditLandmark(lm)}
                    />
                    <Image
                      src='/delete-02.svg'
                      alt='delete svg'
                      width={24}
                      height={24}
                      className='cursor-pointer'
                      onClick={() => handleRemoveLandmark(lm.id)}
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
