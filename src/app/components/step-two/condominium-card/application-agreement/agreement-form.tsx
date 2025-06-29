import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useForm } from "react-hook-form";

// Agreement type matches AgreementCard
export type Agreement = {
  proof: FileList | undefined;
  isAgreed: boolean;
};

interface AgreementFormProps {
  initialData: Agreement;
  setFormData: (data: Agreement) => void;
  closeModal: () => void;
  hasFormValues: boolean;
}

export default function AgreementForm({
  initialData,
  setFormData,
  closeModal,
  hasFormValues,
}: AgreementFormProps) {
  const form = useForm<Agreement>({
    mode: "onChange",
    defaultValues: hasFormValues
      ? initialData
      : { proof: undefined, isAgreed: false },
  });

  const proofFile = form.watch("proof");
  const isValid =
    form.watch("isAgreed") &&
    !!proofFile &&
    proofFile.length > 0 &&
    proofFile[0].type === "application/pdf";

  // On submit, update parent state and close modal
  const onSubmit = (data: Agreement) => {
    setFormData(data);
    closeModal();
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        className='w-full flex flex-col space-y-4 justify-start items-start'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className='w-full grid grid-cols-1  gap-4'>
          <FormField
            control={form.control}
            name='proof'
            rules={{
              required: "Agreement PDF is required",
              validate: (fileList: FileList | undefined) => {
                if (!fileList || fileList.length === 0)
                  return "Agreement PDF is required";
                if (fileList[0].type !== "application/pdf")
                  return "Only PDF files are allowed.";
                return true;
              },
            }}
            render={({ field }) => (
              <FormItem className='flex-1 flex flex-col justify-start items-start space-y-2.5'>
                <FormLabel className='font-[600] text-[#272B35]'>
                  Upload agreement
                </FormLabel>
                <FormControl>
                  <div className='bg-[#F6F6F6] rounded-[12px] custom-border w-full flex justify-center items-center'>
                    <Input
                      id='agreement-upload'
                      type='file'
                      accept='application/pdf'
                      onChange={(e) => field.onChange(e.target.files)}
                      className='hidden'
                    />
                    <Label
                      htmlFor='agreement-upload'
                      className='flex items-center gap-2.5 cursor-pointer py-1.5'
                    >
                      <Image
                        src='/upload-02.svg'
                        alt='Upload PDF'
                        width={24}
                        height={24}
                      />
                      <span className='text-sm text-[#6F6C6A] font-[600] leading-[150%]'>
                        (Pdf only)
                      </span>
                    </Label>
                  </div>
                </FormControl>
                <FormMessage />
                {proofFile &&
                  proofFile.length > 0 &&
                  proofFile[0].type === "application/pdf" && (
                    <div className='text-green-600 text-sm mb-2'>
                      Selected: {proofFile[0].name}
                    </div>
                  )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='isAgreed'
            rules={{
              required: "You must agree to the terms and conditions",
            }}
            render={({ field }) => (
              <FormItem className='flex items-center space-x-2 mt-4'>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(checked)}
                    className='h-5 w-5 text-[#272B35] border-[#272B35]  focus:ring-2 focus:ring-offset-0 focus:ring-[#272B35] focus:ring-offset-white'
                  />
                </FormControl>
                <FormLabel className='text-[#272B35] font-[600] leading-[100%]'>
                  Accept immigrant & international student application
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='w-full flex flex-col gap-y-4'>
          <div className='custom-border'></div>
          <div className='w-full flex justify-end items-center py-3.5'>
            <button
              type='submit'
              disabled={!isValid}
              className='bg-[#316EED] hover:bg-[#2A5FD9] text-white font-semibold px-6 py-2 rounded-[12px] cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-[#316EED] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </Form>
  );
}
