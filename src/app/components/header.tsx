import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Header() {
  return (
    <header className='fixed top-0 left-0 w-full custom-border-b z-50'>
      <div className='flex items-center justify-between py-4 px-20'>
        <div>
          <Image
            src='/logo.png'
            alt='Rentyard Logo'
            width={147.28}
            height={38.78}
          />
        </div>
        <Button
          variant='outline'
          className='cursor-pointer text-sm rounded-[12px] py-3 px-6 custom-border'
        >
          Exit
        </Button>
      </div>
    </header>
  );
}
