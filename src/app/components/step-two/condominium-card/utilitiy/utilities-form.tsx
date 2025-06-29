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

export type Utilities = {
  id: string;
  type: string;
  provider: string;
};

const formSchema = z.object({
  type: z.string().min(1, "Type is required"),
  provider: z.string().min(1, "Provider is required"),
});

type FormValues = z.infer<typeof formSchema>;

interface UtilitiesFormProps {
  initialData: Utilities | null;
  setFormData: (updater: (prev: Utilities[]) => Utilities[]) => void;
  closeModal: () => void;
}

export default function UtilitiesForm({
  initialData,
  setFormData,
  closeModal,
}: UtilitiesFormProps) {
  const isEdit = !!(initialData && initialData.id);
  const form = useForm<FormValues>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          type: initialData.type,
          provider: initialData.provider,
        }
      : {
          type: "",
          provider: "",
        },
  });

  const isValid = !!form.watch("type") && !!form.watch("provider");

  const onSubmit = (data: FormValues) => {
    if (isEdit && initialData) {
      setFormData((prev) =>
        prev.map((util) =>
          util.id === initialData.id ? { ...data, id: initialData.id } : util
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
        <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4'>
          <FormField
            control={form.control}
            name='type'
            render={({ field }) => (
              <FormItem className='w-full flex flex-col justify-start items-start space-y-2.5'>
                <FormLabel className='font-[600] text-[#272B35] after:[content:"*"] after:text-[#FF6A62] gap-0'>
                  Utility type
                </FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className='w-full'>
                      <SelectValue
                        placeholder='Select type'
                        className='text-[#6F6C6A]'
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='Electricity'>Electricity</SelectItem>
                      <SelectItem value='Water'>Water</SelectItem>
                      <SelectItem value='Gas'>Gas</SelectItem>
                      <SelectItem value='Internet'>Internet</SelectItem>
                      <SelectItem value='Trash'>Trash</SelectItem>
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
            name='provider'
            render={({ field }) => (
              <FormItem className='w-full  flex flex-col justify-start items-start space-y-2.5'>
                <FormLabel className='font-[600] text-[#272B35] after:[content:"*"] after:text-[#FF6A62] gap-0'>
                  Provider company name
                </FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    placeholder='Enter provider name'
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
