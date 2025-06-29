import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode } from "react";

interface GenericModalProps {
  title: string;
  content: ReactNode;
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function WrapperCardModal({
  title,
  content,
  children,
  isOpen,
  setIsOpen,
}: GenericModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='sm:max-w-[600px] lg:max-w-[780px] max-h-[80vh] overflow-y-auto rounded-[12px]custom-border p-0'>
        <DialogHeader className='bg-[#F4F4F4] py-3.5 px-4 custom-border-b'>
          <DialogTitle className='text-base leading-[24px] font-[600] text-[#6F6C6A] '>
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className=' px-4'>{content}</div>
      </DialogContent>
    </Dialog>
  );
}
