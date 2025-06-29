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
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface ProofOfOwnershipFormProps {
  onValidityChange: (isValid: boolean) => void;
}

type FormValues = {
  proof: FileList | undefined;
  isAgreed: boolean;
};

export default function ProofOfOwnershipForm({
  onValidityChange,
}: ProofOfOwnershipFormProps) {
  const form = useForm<FormValues>({
    mode: "onChange",
    defaultValues: { proof: undefined, isAgreed: false },
  });

  const proofFile = form.watch("proof");
  const isValid =
    form.watch("isAgreed") &&
    !!proofFile &&
    proofFile.length > 0 &&
    proofFile[0].type === "application/pdf";

  useEffect(() => {
    onValidityChange(isValid);
  }, [isValid, onValidityChange]);

  return (
    <Form {...form}>
      <form className='w-full flex flex-col space-y-4 justify-start items-start'>
        <div className='w-full flex flex-col justify-start items-start space-y-4 pb-4 custom-border rounded-[14px]'>
          <div className='w-full rounded-t-[14px] bg-[#F4F4F4] py-3.5 px-4 '>
            <h3 className='text-lg font-medium text-[#6F6C6A]'>
              Proof of ownership
            </h3>
          </div>
          <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 p-4'>
            <FormField
              control={form.control}
              name='proof'
              rules={{
                required: "Proof of ownership is required",
                validate: (fileList: FileList | undefined) => {
                  if (!fileList || fileList.length === 0)
                    return "Proof of ownership is required";
                  if (fileList[0].type !== "application/pdf")
                    return "Only PDF files are allowed.";
                  return true;
                },
              }}
              render={({ field }) => (
                <FormItem className='flex-1 flex flex-col justify-start items-start space-y-2.5'>
                  <FormLabel className='font-[600] text-[#272B35]'>
                    Ownership doc*
                  </FormLabel>
                  <FormControl>
                    <div className='bg-[#F6F6F6] rounded-[12px] custom-border w-full flex justify-center items-center'>
                      <Input
                        id='proof-upload'
                        type='file'
                        accept='application/pdf'
                        onChange={(e) => field.onChange(e.target.files)}
                        className='hidden'
                      />
                      <Label
                        htmlFor='proof-upload'
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
          </div>
        </div>
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
                Accept RentYard property adding terms & condition
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
