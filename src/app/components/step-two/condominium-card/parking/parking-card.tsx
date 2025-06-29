import Image from "next/image";
import { useState } from "react";
import WrapperCardModal from "../wrapper-card-modal";
import ParkingForm from "./parking-form";

type Parking = {
  parkingTime: string; // e.g., "2H", "1H", "30M"
  overview: string; // textarea
};

export default function ParkingCard() {
  const initialFormData: Parking = {
    parkingTime: "",
    overview: "",
  };

  const [formData, setFormData] = useState<Parking>(initialFormData);
  const [isOpen, setIsOpen] = useState(false);

  // Only show summary if parkingTime is filled
  const hasFormValues = !!formData.parkingTime && !!formData.overview;

  // Modal close function
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className='rounded-[20px] custom-border w-full flex flex-col items-start justify-center hover:bg-gray-50 transition-colors'>
      <div className='w-full flex items-center justify-between p-5'>
        <h2 className='text-lg font-[600] text-[#272B35]'>
          Parking
          <span className='text-[#6F6C6A]'>(Optional)</span>
        </h2>
        <WrapperCardModal
          title='Parking (optional)'
          isOpen={isOpen}
          setIsOpen={(open) => {
            if (!open) handleClose();
            else setIsOpen(true);
          }}
          content={
            <ParkingForm
              hasFormValues={hasFormValues}
              initialData={formData}
              setFormData={setFormData}
              closeModal={handleClose}
            />
          }
        >
          {!hasFormValues && (
            <div className='flex justify-center items-center gap-x-[6px] cursor-pointer'>
              <Image
                src='/plus-sign.svg'
                alt='plus sign'
                width={22}
                height={22}
              />
              <p className='font-[600] underline  text-[#316EED]'>Add</p>
            </div>
          )}
        </WrapperCardModal>
      </div>
      {hasFormValues && (
        <div className='w-full custom-border-t '>
          <div className='p-5'>
            <div className='w-full flex flex-col gap-y-2 justify-center items-start'>
              <p className='text-[#272B35] text-base font-[600]'>
                Guest vehicle parking time: {formData.parkingTime}
              </p>
              <p className='text-[#272B35] text-base font-[600]'>
                {formData.overview}
              </p>

              <div className='flex gap-x-3 items-center justify-end'>
                <Image
                  src='/pencil-edit-02 (1).svg'
                  alt='pencil svg'
                  width={24}
                  height={24}
                  className='cursor-pointer'
                  onClick={() => setIsOpen(true)}
                />
                <Image
                  src='/delete-02.svg'
                  alt='delete svg'
                  width={24}
                  height={24}
                  className='cursor-pointer'
                  onClick={() => setFormData(initialFormData)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
