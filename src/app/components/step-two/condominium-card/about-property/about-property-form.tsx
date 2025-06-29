import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";

export type AboutProperty = {
  description: string;
};

interface AboutPropertyFormProps {
  initialData: AboutProperty;
  setFormData: (data: AboutProperty) => void;
  closeModal: () => void;
  hasFormValues: boolean;
}

export default function AboutPropertyForm({
  initialData,
  setFormData,
  closeModal,
  hasFormValues,
}: AboutPropertyFormProps) {
  const form = useForm<AboutProperty>({
    mode: "onChange",
    defaultValues: hasFormValues ? initialData : { description: "" },
  });

  const isValid = !!form.watch("description");

  const onSubmit = (data: AboutProperty) => {
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
          name='description'
          rules={{ required: "Description is required" }}
          render={({ field }) => (
            <FormItem className='w-full flex flex-col justify-start items-start space-y-2.5'>
              <FormLabel className='font-[600] text-[#272B35]'>
                Property Description*
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Describe the property...'
                  {...field}
                  className='w-full min-h-[100px] rounded-[12px] px-4 placeholder:text-[#6F6C6A]'
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
