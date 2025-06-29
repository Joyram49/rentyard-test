import { Input } from "@/components/ui/input";
import amenitiesData from "@/dummy-data/dummy-data.json";
import Image from "next/image";
import { useState } from "react";

export type Amenity = {
  id: number;
  name: string;
  icon: string;
};

interface CommunityAmenitiesFormProps {
  initialData: Amenity[];
  setFormData: (data: Amenity[]) => void;
  closeModal: () => void;
}

export default function CommunityAmenitiesForm({
  initialData,
  setFormData,
  closeModal,
}: CommunityAmenitiesFormProps) {
  const [selected, setSelected] = useState<Amenity[]>(initialData || []);
  const [search, setSearch] = useState("");

  const allAmenities: Amenity[] = amenitiesData.communityAmenities;
  const filteredAmenities = allAmenities.filter((amenity) =>
    amenity.name.toLowerCase().includes(search.toLowerCase())
  );

  const isSelected = (id: number) => selected.some((a) => a.id === id);

  const handleToggle = (amenity: Amenity) => {
    if (isSelected(amenity.id)) {
      setSelected((prev) => prev.filter((a) => a.id !== amenity.id));
    } else {
      setSelected((prev) => [...prev, amenity]);
    }
  };

  const handleRemove = (id: number) => {
    setSelected((prev) => prev.filter((a) => a.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormData(selected);
    closeModal();
  };

  return (
    <form className='w-full flex flex-col space-y-4' onSubmit={handleSubmit}>
      <div className='relative mb-2 w-full'>
        <span className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'>
          <Image src='/search.svg' alt='Search' width={18} height={18} />
        </span>
        <Input
          type='text'
          placeholder='Search amenities...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='pl-10 w-full'
        />
      </div>
      <div className='flex flex-wrap gap-3 mt-4'>
        {filteredAmenities.map((amenity) => {
          const selectedAmenity = isSelected(amenity.id);
          return (
            <div
              key={amenity.id}
              className={`relative flex flex-row items-center px-4 py-2 rounded-[12px] border cursor-pointer transition-all gap-2 min-w-0 max-w-full ${
                selectedAmenity
                  ? "border-[#316EED] bg-blue-50"
                  : "border-gray-200 bg-white"
              }`}
              onClick={() => handleToggle(amenity)}
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
              {selectedAmenity && (
                <button
                  type='button'
                  className='absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center rounded-full bg-[#FF6A62] border border-gray-300 text-white  z-10 cursor-pointer hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6A62] focus:ring-offset-1'
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(amenity.id);
                  }}
                  aria-label='Remove'
                >
                  <span>x</span>
                </button>
              )}
            </div>
          );
        })}
      </div>
      <div className='w-full flex flex-col gap-y-4'>
        <div className='custom-border'></div>
        <div className='w-full flex justify-end items-center py-3.5'>
          <button
            type='submit'
            className='bg-[#316EED] hover:bg-[#2A5FD9] text-white font-semibold px-6 py-2 rounded-[12px] cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-[#316EED] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {initialData.length > 0 ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </form>
  );
}
