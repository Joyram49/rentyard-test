import Image from "next/image";
import { useState } from "react";
import WrapperCardModal from "../wrapper-card-modal";
import ChargesForm from "./charges-form";

type ChargesCard = {
  applicationFee: string;
  adminFee: string;
};

export default function ChargesCard() {
  const [formData, setFormData] = useState<ChargesCard>({
    applicationFee: "",
    adminFee: "",
  });
  const [isOpen, setIsOpen] = useState(false);

  // Only show summary if all required fields are filled
  const hasFormValues = !!formData.applicationFee && !!formData.adminFee;

  // Modal closes function
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <div className='rounded-[20px] custom-border w-full flex flex-col items-start justify-center hover:bg-gray-50 transition-colors'>
      <div className='w-full flex items-center justify-between p-5'>
        <h2 className=' text-lg font-[600] text-[#272B35]'>
          Charges<span className='text-[#FF6A62]'>(Required)</span>
        </h2>
        <WrapperCardModal
          title='Charges'
          isOpen={isOpen}
          setIsOpen={(open) => {
            if (!open) handleClose();
            else setIsOpen(true);
          }}
          content={
            <ChargesForm
              hasFormValues={hasFormValues}
              initialData={formData}
              setFormData={setFormData}
              closeModal={handleClose}
            />
          }
        >
          <div className='flex justify-center items-center gap-x-[6px] cursor-pointer'>
            <Image
              src={hasFormValues ? "pencil-edit-02.svg" : "/plus-sign.svg"}
              alt={hasFormValues ? "edit sign" : "plus sign"}
              width={22}
              height={22}
            />
            <p className='font-[600] underline  text-[#316EED]'>
              {hasFormValues ? "Edit" : "Add"}
            </p>
          </div>
        </WrapperCardModal>
      </div>
      {hasFormValues && (
        <div className='w-full custom-border-t '>
          <div className='p-5'>
            <p className='text-[#272B35] text-base font-[600]'>
              Application fee: ${formData.applicationFee}(All 18+ applicant),
              Admin fee: ${formData.adminFee}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
