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
import locationData from "@/dummy-data/dummy-data.json";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  identifier: z.string().min(1, "Identifier is required"),
  unit: z.string().min(1, "Unit number is required"),
  url: z.string().url("Invalid URL format").optional().or(z.literal("")),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  street: z.string().min(1, "Street address is required"),
  apt: z.string().optional(),
  zipCode: z.string().min(1, "Zip code is required"),
});

type FormValues = z.infer<typeof formSchema>;
interface AddressFormProps {
  setFormData: (data: FormValues) => void;
  closeModal: () => void;
  initialData: FormValues;
  hasFormValues: boolean;
}

export default function AddressForm({
  setFormData,
  closeModal,
  initialData,
  hasFormValues,
}: AddressFormProps) {
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");

  const form = useForm<FormValues>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: hasFormValues
      ? initialData
      : {
          identifier: "",
          unit: "",
          url: "",
          country: "",
          state: "",
          city: "",
          street: "",
          apt: "",
          zipCode: "",
        },
  });

  const isValid =
    form.watch("identifier") !== "" &&
    form.watch("unit") !== "" &&
    form.watch("country") !== "" &&
    form.watch("state") !== "" &&
    form.watch("city") !== "" &&
    form.watch("street") !== "" &&
    form.watch("zipCode") !== "";

  // Sync selects with initialData when modal opens for edit
  useEffect(() => {
    if (initialData) {
      setSelectedCountry(initialData.country || "");
      setSelectedState(initialData.state || "");
    }
  }, [initialData, form]);

  // Reset state and city when country changes
  const handleCountryChange = (countryCode: string) => {
    setSelectedCountry(countryCode);
    setSelectedState("");
    form.setValue("state", "");
    form.setValue("city", "");
  };

  // Reset city when state changes
  const handleStateChange = (stateCode: string) => {
    setSelectedState(stateCode);
    form.setValue("city", "");
  };

  // form submit
  const onsubmit = (data: FormValues) => {
    setFormData(data);
    closeModal();
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        className='w-full flex flex-col space-y-4 justify-start items-start'
        onSubmit={form.handleSubmit(onsubmit)}
      >
        <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          <FormField
            control={form.control}
            name='identifier'
            render={({ field }) => (
              <FormItem className='flex-1 flex flex-col justify-start items-start space-y-2.5'>
                <FormLabel className='font-[600] text-[#272B35] after:[content:"*"] after:text-[#FF6A62] gap-0'>
                  Property name as Identifier
                </FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    placeholder='Enter identifier'
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
            name='unit'
            render={({ field }) => (
              <FormItem className='flex-1 flex flex-col justify-start items-start space-y-2.5'>
                <FormLabel className='font-[600] text-[#272B35] after:[content:"*"] after:text-[#FF6A62] gap-0'>
                  Total apartment unit
                </FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    placeholder='Enter unit number'
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
            name='url'
            render={({ field }) => (
              <FormItem className='flex-1 flex flex-col justify-start items-start space-y-2.5'>
                <FormLabel className='font-[600] text-[#272B35] after:[content:"(optional)"] after:text-[#6F6C6A] gap-0'>
                  Property Website URL
                </FormLabel>
                <FormControl>
                  <Input
                    type='url'
                    placeholder='Enter property website URL'
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
            name='country'
            render={({ field }) => (
              <FormItem className='flex-1 flex flex-col justify-start items-start space-y-2.5'>
                <FormLabel className='font-[600] text-[#272B35] after:[content:"*"] after:text-[#FF6A62] gap-0'>
                  Country/Region
                </FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    handleCountryChange(value);
                  }}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger className='w-full'>
                      <SelectValue
                        placeholder='Select country'
                        className='text-[#6F6C6A]'
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {locationData.countries.map((country) => (
                      <SelectItem
                        key={country.id}
                        value={country.code}
                        className='text-[#6F6C6A]'
                      >
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='state'
            render={({ field }) => (
              <FormItem className='flex-1 flex flex-col justify-start items-start space-y-2.5'>
                <FormLabel className='font-[600] text-[#272B35] after:[content:"*"] after:text-[#FF6A62] gap-0'>
                  State/Province
                </FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    handleStateChange(value);
                  }}
                  value={field.value}
                  disabled={!selectedCountry}
                >
                  <FormControl>
                    <SelectTrigger className='w-full'>
                      <SelectValue
                        placeholder='Select state/province'
                        className='text-[#6F6C6A]'
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {selectedCountry &&
                      locationData.states[
                        selectedCountry as keyof typeof locationData.states
                      ]?.map((state) => (
                        <SelectItem
                          key={state.id}
                          value={state.code}
                          className='text-[#6F6C6A]'
                        >
                          {state.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='city'
            render={({ field }) => (
              <FormItem className='flex-1 flex flex-col justify-start items-start space-y-2.5'>
                <FormLabel className='font-[600] text-[#272B35] after:[content:"*"] after:text-[#FF6A62] gap-0'>
                  City/Town
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={!selectedState}
                >
                  <FormControl>
                    <SelectTrigger className='w-full'>
                      <SelectValue
                        placeholder='Select city'
                        className='text-[#6F6C6A]'
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {selectedState &&
                    locationData.cities[
                      selectedState as keyof typeof locationData.cities
                    ] ? (
                      locationData.cities[
                        selectedState as keyof typeof locationData.cities
                      ].map((city) => (
                        <SelectItem
                          key={city.id}
                          value={city.name}
                          className='text-[#6F6C6A]'
                        >
                          {city.name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem
                        value='no-cities'
                        disabled
                        className='text-[#6F6C6A]'
                      >
                        {selectedState
                          ? "No cities available"
                          : "Select a state first"}
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='street'
            render={({ field }) => (
              <FormItem className='flex-1 flex flex-col justify-start items-start space-y-2.5'>
                <FormLabel className='font-[600] text-[#272B35] after:[content:"*"] after:text-[#FF6A62] gap-0'>
                  Street Address
                </FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    placeholder='Enter street address'
                    {...field}
                    className='w-full text-[#6F6C6A]'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='apt'
            render={({ field }) => (
              <FormItem className='flex-1 flex flex-col justify-start items-start space-y-2.5'>
                <FormLabel className='font-[600] text-[#272B35]'>
                  Apt, suit, unit{" "}
                  <span className='text-[#6F6C6A]'>(if applicable)</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    placeholder='Enter apartment/suite number'
                    {...field}
                    className='w-full text-[#6F6C6A]'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='zipCode'
            render={({ field }) => (
              <FormItem className='flex-1 flex flex-col justify-start items-start space-y-2.5'>
                <FormLabel className='font-[600] text-[#272B35] after:[content:"*"] after:text-[#FF6A62] gap-0'>
                  Zip Code
                </FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    placeholder='Enter zip code'
                    {...field}
                    className='w-full text-[#6F6C6A]'
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
