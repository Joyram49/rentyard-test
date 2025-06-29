import { Button } from "@/components/ui/button";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  managerName: z.string().min(1, "Manager name is required"),
  phone: z.string().min(1, "Phone is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  isAgree: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms",
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface LeasingInfoFormProps {
  initialData?: FormValues;
  setFormData: (data: FormValues) => void;
  closeModal: () => void;
}

export default function LeasingInfoForm({
  initialData,
  setFormData,
  closeModal,
}: LeasingInfoFormProps) {
  const form = useForm<FormValues>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      managerName: "",
      phone: "",
      email: "",
      isAgree: false,
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
            name='managerName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Leasing Manager Name*</FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    placeholder='Enter manager name'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone*</FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    placeholder='Enter phone number'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email*</FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    placeholder='Enter email address'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='isAgree'
            render={({ field }) => (
              <FormItem className='self-center mt-4 flex flex-row items-center justify-start space-x-1'>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className='h-4 w-4 text-[#272B35] border-[#272B35] focus:ring-2 focus:ring-offset-0 focus:ring-[#272B35] focus:ring-offset-white'
                  />
                </FormControl>
                <FormLabel className='text-[#272B35] font-[600] leading-[100%] gap-0'>
                  I agree to the terms
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='w-full flex flex-col gap-y-4'>
          <div className='custom-border'></div>
          <div className='w-full flex justify-end items-center py-3.5'>
            <Button
              type='submit'
              disabled={!isValid}
              className='bg-[#316EED] hover:bg-[#2A5FD9] 
            text-white font-semibold px-6 rounded-[12px] cursor-pointer transition-colors
            focus:outline-none focus:ring-2 focus:ring-[#316EED] focus:ring-offset-2
            disabled:opacity-50 disabled:cursor-not-allowed'
            >
              Add
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
