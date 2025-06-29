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
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  frequency: z.string().min(1, "Frequency is required"),
  rentReminderDate: z.string().min(1, "Rent reminder date is required"),
  rentDueDate: z.string().min(1, "Rent due date is required"),
});

type FormValues = z.infer<typeof formSchema>;

interface RentPaymentFormProps {
  hasFormValues?: boolean;
  initialData?: {
    frequency: string;
    rentReminderDate: string | null;
    rentDueDate: string | null;
  };
  setFormData: (data: FormValues) => void;
  closeModal: () => void;
}

export default function RentPaymentForm({
  hasFormValues,
  initialData,
  setFormData,
  closeModal,
}: RentPaymentFormProps) {
  const form = useForm<FormValues>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          frequency: initialData.frequency || "",
          rentReminderDate: initialData.rentReminderDate
            ? initialData.rentReminderDate.toString().slice(0, 10)
            : "",
          rentDueDate: initialData.rentDueDate
            ? initialData.rentDueDate.toString().slice(0, 10)
            : "",
        }
      : {
          frequency: "",
          rentReminderDate: "",
          rentDueDate: "",
        },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        frequency: initialData.frequency || "",
        rentReminderDate: initialData.rentReminderDate
          ? initialData.rentReminderDate.toString().slice(0, 10)
          : "",
        rentDueDate: initialData.rentDueDate
          ? initialData.rentDueDate.toString().slice(0, 10)
          : "",
      });
    }
  }, [initialData, form]);

  const isValid = form.formState.isValid;

  const onSubmit = (data: FormValues) => {
    setFormData({
      frequency: data.frequency,
      rentReminderDate: data.rentReminderDate ? data.rentReminderDate : "",
      rentDueDate: data.rentDueDate ? data.rentDueDate : "",
    });
    closeModal();
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-full flex flex-col space-y-4 justify-start items-start'
      >
        <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-4'>
          <FormField
            control={form.control}
            name='frequency'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Frequency*</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Select frequency' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='Monthly'>Monthly</SelectItem>
                    <SelectItem value='Quarterly'>Quarterly</SelectItem>
                    <SelectItem value='Yearly'>Yearly</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='rentReminderDate'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rent Reminder Date*</FormLabel>
                <FormControl>
                  <Input
                    type='date'
                    placeholder='Select reminder date'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='rentDueDate'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rent Due Date*</FormLabel>
                <FormControl>
                  <Input type='date' placeholder='Select due date' {...field} />
                </FormControl>
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
              className='bg-[#316EED] hover:bg-[#2A5FD9] text-white font-semibold px-6 py-2 rounded-[12px] cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-[#316EED] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
              disabled={!isValid}
            >
              {hasFormValues ? "Update" : "Add"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
