import Image from "next/image";
import { useState } from "react";
import WrapperCardModal from "../wrapper-card-modal";
import AddressForm from "./address-form";

type PropertyAddress = {
  identifier: string;
  unit: string;
  url?: string;
  country: string;
  state: string;
  city: string;
  street: string;
  apt?: string;
  zipCode: string;
};

export default function AddressCard() {
  const initialFormData: PropertyAddress = {
    identifier: "",
    unit: "",
    country: "",
    state: "",
    city: "",
    street: "",
    apt: "",
    zipCode: "",
  };
  const [formData, setFormData] = useState<PropertyAddress>(initialFormData);
  const [isOpen, setIsOpen] = useState(false);

  // Only show summary if all required fields are filled
  const hasFormValues =
    !!formData.identifier &&
    !!formData.unit &&
    !!formData.street &&
    !!formData.city &&
    !!formData.state &&
    !!formData.country &&
    !!formData.zipCode;

  //  modal closes function
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className='rounded-[20px] custom-border w-full flex flex-col items-start justify-center hover:bg-gray-50 transition-colors'>
      <div className='w-full flex items-center justify-between p-5'>
        <h2 className=' text-lg font-[600] text-[#272B35]'>
          Property address<span className='text-[#FF6A62]'>(Required)</span>
        </h2>
        <WrapperCardModal
          title='Property Address'
          isOpen={isOpen}
          setIsOpen={(open) => {
            if (!open) handleClose();
            else setIsOpen(true);
          }}
          content={
            <AddressForm
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
                {formData.identifier}, {formData.url && `(${formData.url})`},
                Total unit: {formData.unit}
              </p>
              <p className='text-[#272B35] text-base font-[600]'>
                {formData.street}, {formData.city}, {formData.state},{" "}
                {formData.country}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
