import Image from "next/image";
import { useState } from "react";
import WrapperCardModal from "../wrapper-card-modal";
import RentPaymentForm from "./rent-payment-form";

type RentPayment = {
  frequency: string; // will be a select box with options like "Monthly", "Quarterly", "Yearly" etc.
  rentReminderDate: Date | null;
  rentDueDate: number | null;
};

export default function RendPaymentCard() {
  const initialFormData: RentPayment = {
    frequency: "",
    rentReminderDate: null,
    rentDueDate: null,
  };
  const [formData, setFormData] = useState<RentPayment>(initialFormData);
  const [isOpen, setIsOpen] = useState(false);
  // Only show summary if all required fields are filled
  const hasFormValues =
    !!formData.frequency &&
    formData.rentReminderDate !== null &&
    formData.rentDueDate !== null;
  // modal closes function
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <div className='rounded-[20px] custom-border w-full flex flex-col items-start justify-center hover:bg-gray-50 transition-colors'>
      <div className='w-full flex items-center justify-between p-5'>
        <h2 className=' text-lg font-[600] text-[#272B35]'>
          Rent frequency & payment reminder
          <span className='text-[#FF6A62]'>(Required)</span>
        </h2>
        <WrapperCardModal
          title='Rent frequency & payment reminder'
          isOpen={isOpen}
          setIsOpen={(open) => {
            if (!open) handleClose();
            else setIsOpen(true);
          }}
          content={
            <RentPaymentForm
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
                Rent payment frequency: {formData.frequency}, Rent reminder
                date:{" "}
                {formData.rentReminderDate &&
                  `${formData.rentReminderDate.getDate()}th every month`}
              </p>
              <p className='text-[#272B35] text-base font-[600]'>
                Rent due date:{" "}
                {formData.rentDueDate &&
                  `${formData.rentDueDate.getDate()}th every month`}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
