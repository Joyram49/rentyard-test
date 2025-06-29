import Image from "next/image";
import { useState } from "react";
import WrapperCardModal from "../wrapper-card-modal";
import NearestEduForm, { EduInstitution } from "./nearest-edu-form";

export default function NearestEduCard() {
  const [formData, setFormData] = useState<EduInstitution[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedInstitution, setSelectedInstitution] =
    useState<EduInstitution | null>(null);

  // Only show summary if at least one institution is added
  const hasFormValues = formData.length > 0;

  // Modal close function
  const handleClose = () => {
    setIsOpen(false);
  };

  // Function to handle institution selection for editing
  const handleEditInstitution = (institution: EduInstitution) => {
    setSelectedInstitution(institution);
    setIsOpen(true);
  };

  // Function to remove an institution
  const handleRemoveInstitution = (id: string) => {
    setFormData((prevData) => prevData.filter((inst) => inst.id !== id));
  };

  return (
    <div className='rounded-[20px] custom-border w-full flex flex-col items-start justify-center hover:bg-gray-50 transition-colors'>
      <div className='w-full flex items-center justify-between p-5'>
        <h2 className='text-lg font-[600] text-[#272B35]'>
          Nearest educational institutions
          <span className='text-[#6F6C6A]'>(optional but recommended)</span>
        </h2>
        <WrapperCardModal
          title='Nearest Educational Institutions'
          isOpen={isOpen}
          setIsOpen={(open) => {
            if (!open) handleClose();
            else setIsOpen(true);
          }}
          content={
            <NearestEduForm
              initialData={selectedInstitution}
              setFormData={setFormData}
              closeModal={() => {
                setIsOpen(false);
                setSelectedInstitution(null);
              }}
            />
          }
        >
          <div
            className='flex justify-center items-center gap-x-[6px] cursor-pointer'
            onClick={() => {
              setSelectedInstitution(null);
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
              {formData.map((inst) => (
                <div
                  key={inst.id}
                  className='w-full flex gap-x-4 items-center justify-between custom-border-b last:border-0 py-3.5'
                >
                  <p className='text-[#272B35] text-base font-[600]'>
                    {inst.type}, {inst.name}, {inst.distance}mile
                  </p>

                  <div className='flex gap-x-3 items-center justify-end'>
                    <Image
                      src='/pencil-edit-02 (1).svg'
                      alt='pencil svg'
                      width={24}
                      height={24}
                      className='cursor-pointer'
                      onClick={() => handleEditInstitution(inst)}
                    />
                    <Image
                      src='/delete-02.svg'
                      alt='delete svg'
                      width={24}
                      height={24}
                      className='cursor-pointer'
                      onClick={() => handleRemoveInstitution(inst.id)}
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
