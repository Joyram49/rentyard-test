import Image from "next/image";
import { useState } from "react";
import WrapperCardModal from "../wrapper-card-modal";
import LeasingInfoForm from "./leasing-info-form";

type LeasingInfo = {
  managerName: string;
  phone: string;
  email: number;
  isAgree: number; //checkbox
};

export default function LeasingInfoCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<LeasingInfo>({
    managerName: "",
    phone: "",
    email: "",
    isAgree: false,
  });

  // Only show summary if all required fields are filled
  const hasFormValues =
    !!formData.managerName &&
    !!formData.phone &&
    !!formData.email &&
    formData.isAgree;

  // modal closes function
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <div className='rounded-[20px] custom-border w-full flex flex-col items-start justify-center hover:bg-gray-50 transition-colors'>
      <div className='w-full flex items-center justify-between p-5'>
        <h2 className=' text-lg font-[600] text-[#272B35]'>
          Leasing Info<span className='text-[#FF6A62]'>(Required)</span>
        </h2>
        <WrapperCardModal
          title='Leasing Info'
          isOpen={isOpen}
          setIsOpen={(open) => {
            if (!open) handleClose();
            else setIsOpen(true);
          }}
          content={
            <LeasingInfoForm
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
            <div className='flex flex-col space-y-2'>
              <p className='text-[#272B35] text-base font-[600]'>
                Leasing Manager: {formData.managerName}, {formData.email}
              </p>
              <p className='text-[#272B35] text-base font-[600]'>
                {formData.phone}{" "}
                <span className=' text-[#6F6C6A]'>
                  Address (same as property)
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
