import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  applicationFee: z.string().min(1, "Application fee is required"),
  adminFee: z.string().min(1, "Admin fee is required"),
});

type FormValues = z.infer<typeof formSchema>;

interface ChargesFormProps {
  initialData?: FormValues;
  setFormData: (data: FormValues) => void;
  closeModal: () => void;
}

export default function ChargesForm({
  initialData,
  setFormData,
  closeModal,
}: ChargesFormProps) {
  const form = useForm<FormValues>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      applicationFee: "",
      adminFee: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  const isValid = form.formState.isValid;

  const onSubmit = (data: FormValues) => {
    setFormData(data);
    closeModal();
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-full flex flex-col space-y-4 justify-start items-start'
      >
        <div className='w-full grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-4'>
          <FormField
            control={form.control}
            name='applicationFee'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Application Fee*</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Select application fee' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='100'>All 18+ applicant: $100</SelectItem>
                    <SelectItem value='0'>Under 18: $0</SelectItem>
                    <SelectItem value='50'>Senior (65+): $50</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='adminFee'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Admin Fee*</FormLabel>
                <FormControl>
                  <Input type='text' placeholder='Enter admin fee' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='w-full flex flex-col gap-y-4'>
          <div className='custom-border'></div>
          <div className='w-full flex justify-between items-center py-3.5'>
            <div className='flex items-center gap-x-[6px]'>
              <Image
                src='/information-circle.svg'
                alt='information-circle'
                width={20}
                height={20}
              />
              <p className='text-[#272B35] text-base font-[600]'>
                Type 0 if charges not applicable
              </p>
            </div>
            <Button
              type='submit'
              className='bg-[#316EED] hover:bg-[#2A5FD9] text-white font-semibold px-6 py-2 rounded-[12px] cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-[#316EED] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
              disabled={!isValid}
            >
              Add
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
