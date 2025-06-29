import AboutPropertyCard from "./condominium-card/about-property/about-property-card";
import AgreementCard from "./condominium-card/application-agreement/agreement-card";
import ChargesCard from "./condominium-card/charges/charges-card";
import CommunityAmenitiesCard from "./condominium-card/community-amenities/community-amenities-card";
import LeasingInfoCard from "./condominium-card/leasing-info/leasing-info-card";
import NearestEduCard from "./condominium-card/nearest-edu/nearest-edu-card";
import NearestLandmarkCard from "./condominium-card/nearest-landmark/nearest-landmark";
import NearestStationCard from "./condominium-card/nearest-stations/nearest-station-card";
import ParkingCard from "./condominium-card/parking/parking-card";
import PetFees from "./condominium-card/pet-fees/pet-fees-card";
import AddressCard from "./condominium-card/property-address/address-card";
import RendPaymentCard from "./condominium-card/rent-payment/rent-payment-card";
import UtilitiesCard from "./condominium-card/utilitiy/utilities-card";

export default function CondominiumsInfo() {
  return (
    <section className='flex flex-col space-y-8 w-full pt-8 px-20'>
      <div className='w-full'>
        <h1 className='text-2xl font-semibold text-[#272B35]'>
          Condominiums Information
        </h1>
      </div>
      <div className='w-full flex flex-col items-start justify-start space-y-6'>
        <div className='w-full flex flex-col md:flex-row justify-center items-start space-y-6 md:space-x-6'>
          <div className='w-full flex flex-col space-y-4'>
            <AddressCard />
            <LeasingInfoCard />
            <ChargesCard />
            <RendPaymentCard />
            <AgreementCard />
            <AboutPropertyCard />
            <CommunityAmenitiesCard />
          </div>
          <div className='w-full flex flex-col space-y-4'>
            <PetFees />
            <ParkingCard />
            <NearestEduCard />
            <NearestStationCard />
            <NearestLandmarkCard />
            <UtilitiesCard />
          </div>
        </div>
        <div>
          <p className='text-[#272B35] text-base'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
      </div>
    </section>
  );
}
