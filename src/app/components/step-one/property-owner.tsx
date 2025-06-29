"use client";
import { useProperty } from "@/hooks/useProperty";
import { useValidForm } from "@/hooks/useValidForm";
import { useState } from "react";
import SelectableCards from "./selectable-cards";
import CompanyForm from "./verification-forms/company-form";
import ProofOfOwnershipForm from "./verification-forms/proof-ownership-form";
import RealtorVerificationForm from "./verification-forms/realtor-verification-form";

const propertyData = [
  {
    id: 1,
    title: "Single House Property",
    value: "single-house",
    description: "Single unit house for single family",
    icon: "/home-09.svg",
  },
  {
    id: 2,
    title: "Apartment Complex",
    value: "apartment",
    description: "Multiple unit house for families",
    icon: "/house-01.svg",
  },
  {
    id: 3,
    title: "Condominiums",
    value: "condominiums",
    description: "Multiple unit house for families",
    icon: "/building-06.svg",
  },
];

const propertyRoles = [
  {
    id: 1,
    title: "Landlord",
    value: "landlord",
    description: "Owner of the property",
    icon: "/key-02.svg",
  },
  {
    id: 2,
    title: "Realtor",
    value: "realtor",
    description: "Manage property on behalf of the owner",
    icon: "/manager.svg",
  },
  {
    id: 3,
    title: "Property management company",
    value: "company",
    description: "For management company",
    icon: "/permanent-job.svg",
  },
];

export default function PropertyOwner() {
  const { setProperties } = useProperty();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const { setIsFormValid } = useValidForm();

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    setProperties((prev) => ({
      ...prev,
      type: type,
    }));
  };
  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
    setProperties((prev) => ({
      ...prev,
      role: role,
    }));
  };

  const renderForm = () => {
    switch (selectedRole) {
      case "landlord":
        return <ProofOfOwnershipForm onValidityChange={setIsFormValid} />;
      case "realtor":
        return <RealtorVerificationForm onValidityChange={setIsFormValid} />;
      case "company":
        return <CompanyForm onValidityChange={setIsFormValid} />;
      default:
        return null;
    }
  };

  return (
    <section className='flex flex-col space-y-6 w-full pt-8 px-20'>
      <div className='w-full flex flex-col items-start space-y-8'>
        <div className='w-full flex flex-col items-start space-y-6'>
          <h1 className='text-2xl font-semibold text-[#272B35]'>
            Welcome to RentYard
          </h1>
          <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {propertyData.map((property) => (
              <SelectableCards
                key={property.id}
                description={property.description}
                icon={property.icon}
                title={property.title}
                value={property.value}
                selected={selectedType === property.value}
                onClick={() => handleTypeChange(property.value)}
              />
            ))}
          </div>
        </div>
        <div className='w-full flex flex-col items-start space-y-6'>
          <h2 className='text-2xl font-semibold text-[#272B35]'>
            Select your role
          </h2>
          <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {propertyRoles.map((role) => (
              <SelectableCards
                key={role.id}
                description={role.description}
                icon={role.icon}
                title={role.title}
                value={role.value}
                selected={selectedRole === role.value}
                onClick={() => handleRoleChange(role.value)}
              />
            ))}
          </div>
        </div>
      </div>
      {renderForm()}
    </section>
  );
}
