import Image from "next/image";
import { useState } from "react";
import WrapperCardModal from "../wrapper-card-modal";
import AgreementForm from "./agreement-form";

type Agreement = {
  proof: FileList | undefined;
  isAgreed: boolean;
};

export default function AgreementCard() {
  const initialFormData: Agreement = {
    proof: undefined,
    isAgreed: false,
  };
  const [formData, setFormData] = useState<Agreement>(initialFormData);
  const [isOpen, setIsOpen] = useState(false);

  // Only show summary if the agreement is checked
  const hasFormValues =
    formData.isAgreed && formData.proof && formData.proof.length > 0;

  // Modal close function
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className='rounded-[20px] custom-border w-full flex flex-col items-start justify-center hover:bg-gray-50 transition-colors'>
      <div className='w-full flex items-center justify-between p-5'>
        <h2 className='text-lg font-[600] text-[#272B35]'>
          Application agreement
          <span className='text-[#6F6C6A]'>(Optional)</span>
        </h2>
        <WrapperCardModal
          title='Application agreement (optional)'
          isOpen={isOpen}
          setIsOpen={(open) => {
            if (!open) handleClose();
            else setIsOpen(true);
          }}
          content={
            <AgreementForm
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
            <div className='w-full flex justify-between items-center'>
              <div className='flex flex-col space-y-2'>
                <p className='text-[#272B35] text-base font-[600]'>
                  Agreement:{" "}
                  {formData.proof ? formData.proof[0].name : "No file uploaded"}
                </p>
                <p className='text-[#6F6C6A] text-base font-[600]'>
                  Accept immigrant & international student application
                </p>
              </div>
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
