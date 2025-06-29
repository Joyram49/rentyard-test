import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

export type Parking = {
  parkingTime: string;
  overview: string;
};

const formSchema = z.object({
  parkingTime: z.string().min(1, "Parking time is required"),
  overview: z.string().min(1, "Overview is required"),
});

type FormValues = z.infer<typeof formSchema>;

interface ParkingFormProps {
  initialData: Parking;
  setFormData: (data: Parking) => void;
  closeModal: () => void;
  hasFormValues: boolean;
}

export default function ParkingForm({
  initialData,
  setFormData,
  closeModal,
  hasFormValues,
}: ParkingFormProps) {
  const form = useForm<FormValues>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: hasFormValues
      ? initialData
      : { parkingTime: "", overview: "" },
  });

  const isValid = !!form.watch("parkingTime") && !!form.watch("overview");

  const onSubmit = (data: FormValues) => {
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
        <FormField
          control={form.control}
          name='parkingTime'
          render={({ field }) => (
            <FormItem className='w-1/2 flex flex-col justify-start items-start space-y-2.5'>
              <FormLabel className='font-[600] text-[#272B35]'>
                Guest vehicle parking time*
              </FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className='w-full'>
                    <SelectValue
                      placeholder='Select parking time'
                      className='text-[#6F6C6A]'
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='30M'>30 Minutes</SelectItem>
                    <SelectItem value='1H'>1 Hour</SelectItem>
                    <SelectItem value='2H'>2 Hours</SelectItem>
                    <SelectItem value='4H'>4 Hours</SelectItem>
                    <SelectItem value='12H'>12 Hours</SelectItem>
                    <SelectItem value='24H'>24 Hours</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='overview'
          render={({ field }) => (
            <FormItem className='w-full flex flex-col justify-start items-start space-y-2.5'>
              <FormLabel className='font-[600] text-[#272B35]'>
                Parking overview*
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Describe parking rules, location, etc.'
                  {...field}
                  className='w-full min-h-[80px] rounded-[12px] px-4 placeholder:text-[#6F6C6A]'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='w-full flex flex-col gap-y-4'>
          <div className='custom-border'></div>
          <div className='w-full flex justify-end items-center py-3.5'>
            <button
              type='submit'
              disabled={!isValid}
              className='bg-[#316EED] hover:bg-[#2A5FD9] text-white font-semibold px-6 py-2 rounded-[12px] cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-[#316EED] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {hasFormValues ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </form>
    </Form>
  );
}
