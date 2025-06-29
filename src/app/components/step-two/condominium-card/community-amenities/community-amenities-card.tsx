import Image from "next/image";
import { useState } from "react";
import WrapperCardModal from "../wrapper-card-modal";
import CommunityAmenitiesForm, { Amenity } from "./community-amenities-form";

export default function CommunityAmenitiesCard() {
  const [selectedAmenities, setSelectedAmenities] = useState<Amenity[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const hasAmenities = selectedAmenities.length > 0;

  const handleRemove = (id: number) => {
    setSelectedAmenities((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className='rounded-[20px] custom-border w-full flex flex-col items-start justify-center hover:bg-gray-50 transition-colors'>
      <div className='w-full flex items-center justify-between p-5'>
        <h2 className='text-lg font-[600] text-[#272B35]'>
          Community Amenities
          <span className='text-[#6F6C6A]'>(Optional)</span>
        </h2>
        <WrapperCardModal
          title='Select Community Amenities'
          isOpen={isOpen}
          setIsOpen={(open) => setIsOpen(open)}
          content={
            <CommunityAmenitiesForm
              initialData={selectedAmenities}
              setFormData={setSelectedAmenities}
              closeModal={() => setIsOpen(false)}
            />
          }
        >
          <div
            className='flex justify-center items-center gap-x-[6px] cursor-pointer'
            onClick={() => setIsOpen(true)}
          >
            <Image
              src='/plus-sign.svg'
              alt='plus sign'
              width={22}
              height={22}
            />
            <p className='font-[600] underline text-[#316EED]'>
              {hasAmenities ? "Edit" : "Add"}
            </p>
          </div>
        </WrapperCardModal>
      </div>
      {hasAmenities && (
        <div className='w-full custom-border-t '>
          <div className='p-5 flex flex-wrap gap-3 mt-4'>
            {selectedAmenities.map((amenity) => (
              <div
                key={amenity.id}
                className='relative flex flex-row items-center px-4 py-2 rounded-[12px] border cursor-pointer transition-all gap-2 min-w-0 max-w-full border-[#316EED] bg-blue-50'
                style={{ width: "auto" }}
              >
                <div className='bg-[#6F6C6A10] rounded-md p-1 mr-2 flex-shrink-0'>
                  <Image
                    src={amenity.icon}
                    alt={amenity.name}
                    width={20}
                    height={20}
                    className='flex-shrink-0'
                  />
                </div>
                <span className='text-sm font-semibold text-[#272B35] text-center whitespace-nowrap'>
                  {amenity.name}
                </span>
                <button
                  type='button'
                  className='absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center rounded-full bg-[#FF6A62] border border-gray-300 text-white  z-10 cursor-pointer hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6A62] focus:ring-offset-1'
                  onClick={() => handleRemove(amenity.id)}
                  aria-label='Remove'
                >
                  <span>x</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
