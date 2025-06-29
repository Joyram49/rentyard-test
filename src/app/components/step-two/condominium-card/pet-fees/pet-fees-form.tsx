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
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import z from "zod";

// Type from pet-fees-card
export type PatFees = {
  id: string;
  petType: string;
  weight: string;
  oneTimeFee: string;
  monthlyFee: string;
  securityDeposit: string;
};

const formSchema = z.object({
  petType: z.string().min(1, "Pet type is required"),
  weight: z
    .string()
    .min(1, "Weight is required")
    .regex(/^\d+$/, "Weight must be a number"),
  oneTimeFee: z
    .string()
    .min(1, "One-time fee is required")
    .regex(/^\d+$/, "Fee must be a number"),
  monthlyFee: z
    .string()
    .min(1, "Monthly fee is required")
    .regex(/^\d+$/, "Fee must be a number"),
  securityDeposit: z
    .string()
    .min(1, "Security deposit is required")
    .regex(/^\d+$/, "Deposit must be a number"),
});

type FormValues = z.infer<typeof formSchema>;

interface PetFeesFormProps {
  initialData: PatFees | null;
  setFormData: (updater: (prev: PatFees[]) => PatFees[]) => void;
  closeModal: () => void;
}

export default function PetFeesForm({
  initialData,
  setFormData,
  closeModal,
}: PetFeesFormProps) {
  const isEdit = !!(initialData && initialData.id);
  const form = useForm<FormValues>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          petType: initialData.petType,
          weight: initialData.weight,
          oneTimeFee: initialData.oneTimeFee,
          monthlyFee: initialData.monthlyFee,
          securityDeposit: initialData.securityDeposit,
        }
      : {
          petType: "",
          weight: "",
          oneTimeFee: "",
          monthlyFee: "",
          securityDeposit: "",
        },
  });

  const isValid =
    !!form.watch("petType") &&
    !!form.watch("weight") &&
    !!form.watch("oneTimeFee") &&
    !!form.watch("monthlyFee") &&
    !!form.watch("securityDeposit");

  const onSubmit = (data: FormValues) => {
    if (isEdit && initialData) {
      setFormData((prev) =>
        prev.map((pet) =>
          pet.id === initialData.id ? { ...data, id: initialData.id } : pet
        )
      );
    } else {
      setFormData((prev) => [...prev, { ...data, id: uuidv4() }]);
    }
    closeModal();
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        className='w-full flex flex-col space-y-4 justify-start items-start'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4'>
          <FormField
            control={form.control}
            name='petType'
            render={({ field }) => (
              <FormItem className='w-full flex flex-col justify-start items-start space-y-2.5'>
                <FormLabel className='font-[600] text-[#272B35] after:[content:"*"] after:text-[#FF6A62] gap-0'>
                  Pet Type
                </FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className='w-full'>
                      <SelectValue
                        placeholder='Select pet type'
                        className='text-[#6F6C6A]'
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='Dog'>Dog</SelectItem>
                      <SelectItem value='Cat'>Cat</SelectItem>
                      <SelectItem value='Other'>Other</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='weight'
            render={({ field }) => (
              <FormItem className='w-full flex flex-col justify-start items-start space-y-2.5'>
                <FormLabel className='font-[600] text-[#272B35] after:[content:"*"] after:text-[#FF6A62] gap-0'>
                  Max Weight(LB)
                </FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    placeholder='Enter weight in lb'
                    {...field}
                    className='w-full rounded-[12px] px-4 placeholder:text-[#6F6C6A]'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='oneTimeFee'
            render={({ field }) => (
              <FormItem className='w-full flex flex-col justify-start items-start space-y-2.5'>
                <FormLabel className='font-[600] text-[#272B35] after:[content:"*"] after:text-[#FF6A62] gap-0'>
                  One Time pet fee
                </FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    placeholder='Enter one-time fee'
                    {...field}
                    className='w-full rounded-[12px] px-4 placeholder:text-[#6F6C6A]'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='monthlyFee'
            render={({ field }) => (
              <FormItem className='w-full flex flex-col justify-start items-start space-y-2.5'>
                <FormLabel className='font-[600] text-[#272B35] after:[content:"*"] after:text-[#FF6A62] gap-0'>
                  Monthly pet rent
                </FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    placeholder='Enter monthly fee'
                    {...field}
                    className='w-full rounded-[12px] px-4 placeholder:text-[#6F6C6A]'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='securityDeposit'
            render={({ field }) => (
              <FormItem className='w-full flex flex-col justify-start items-start space-y-2.5'>
                <FormLabel className='font-[600] text-[#272B35] after:[content:"*"] after:text-[#FF6A62] gap-0'>
                  Pet security deposit
                </FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    placeholder='Enter security deposit'
                    {...field}
                    className='w-full rounded-[12px] px-4 placeholder:text-[#6F6C6A]'
                  />
                </FormControl>
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
              {isEdit ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </form>
    </Form>
  );
}
