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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import locationData from "@/dummy-data/dummy-data.json";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

interface CompanyFormProps {
  onValidityChange: (isValid: boolean) => void;
}

const formSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  companyIdentifier: z.string().min(1, "Company identifier is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  agreement: z
    .custom<FileList>(
      (value) => value instanceof FileList && value.length > 0,
      {
        message: "Agreement with landlord/owner is required",
      }
    )
    .refine((files) => files[0]?.type === "application/pdf", {
      message: "Only PDF files are accepted.",
    })
    .refine((files) => files[0]?.size <= 5 * 1024 * 1024, {
      message: "Max file size is 5MB.",
    }),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  street: z.string().min(1, "Street is required"),
  unit: z.string().optional(),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  zipCode: z.string().min(1, "Zip code is required"),
  isAgreed: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function CompanyForm({ onValidityChange }: CompanyFormProps) {
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");

  const form = useForm<FormValues>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      companyIdentifier: "",
      jobTitle: "",
      agreement: undefined,
      country: "",
      state: "",
      city: "",
      street: "",
      unit: "",
      phone: "",
      email: "",
      zipCode: "",
      isAgreed: false,
    },
  });

  const agreement = form.watch("agreement");
  const isValid =
    form.watch("isAgreed") &&
    form.watch("companyName") !== "" &&
    form.watch("companyIdentifier") !== "" &&
    form.watch("jobTitle") !== "" &&
    form.watch("country") !== "" &&
    form.watch("state") !== "" &&
    form.watch("city") !== "" &&
    form.watch("street") !== "" &&
    form.watch("phone") !== "" &&
    form.watch("email") !== "" &&
    form.watch("zipCode") !== "" &&
    !!agreement &&
    agreement.length > 0 &&
    agreement[0].type === "application/pdf";

  useEffect(() => {
    onValidityChange(isValid);
  }, [isValid, onValidityChange]);

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

  return (
    <Form {...form}>
      <form className='w-full flex flex-col space-y-4 justify-start items-start'>
        <div className='w-full flex flex-col justify-start items-start space-y-4 pb-4 custom-border rounded-[14px]'>
          <div className='w-full rounded-t-[14px] bg-[#F4F4F4] py-3.5 px-4 '>
            <h3 className='text-lg font-medium text-[#6F6C6A]'>
              Company & Office Info
            </h3>
          </div>
          <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 p-4'>
            <FormField
              control={form.control}
              name='companyName'
              render={({ field }) => (
                <FormItem className='flex-1 flex flex-col justify-start items-start space-y-2.5'>
                  <FormLabel className='font-[600] text-[#272B35]'>
                    Company Name*
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='text'
                      placeholder='Enter company name'
                      {...field}
                      className='w-full'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='companyIdentifier'
              render={({ field }) => (
                <FormItem className='flex-1 flex flex-col justify-start items-start space-y-2.5'>
                  <FormLabel className='font-[600] text-[#272B35]'>
                    Company Identifier*
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='text'
                      placeholder='Enter company identifier'
                      {...field}
                      className='w-full'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='jobTitle'
              render={({ field }) => (
                <FormItem className='flex-1 flex flex-col justify-start items-start space-y-2.5'>
                  <FormLabel className='font-[600] text-[#272B35]'>
                    Job Title*
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='text'
                      placeholder='Enter your job title'
                      {...field}
                      className='w-full'
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
                <FormItem className='flex-1 flex flex-col justify-start items-start space-y-2.5'>
                  <FormLabel className='font-[600] text-[#272B35]'>
                    Email*
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='email'
                      placeholder='Enter email address'
                      {...field}
                      className='w-full'
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
                <FormItem className='flex-1 flex flex-col justify-start items-start space-y-2.5'>
                  <FormLabel className='font-[600] text-[#272B35]'>
                    Phone Number*
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='tel'
                      placeholder='Enter phone number'
                      {...field}
                      className='w-full'
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
                  <FormLabel className='font-[600] text-[#272B35]'>
                    Country/Region*
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
                        <SelectValue placeholder='Select country' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {locationData.countries.map((country) => (
                        <SelectItem key={country.id} value={country.code}>
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
                  <FormLabel className='font-[600] text-[#272B35]'>
                    State/Province*
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
                        <SelectValue placeholder='Select state/province' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {selectedCountry &&
                        locationData.states[
                          selectedCountry as keyof typeof locationData.states
                        ]?.map((state) => (
                          <SelectItem key={state.id} value={state.code}>
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
                  <FormLabel className='font-[600] text-[#272B35]'>
                    City/Town*
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={!selectedState}
                  >
                    <FormControl>
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Select city' />
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
                          <SelectItem key={city.id} value={city.name}>
                            {city.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value='no-cities' disabled>
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
                  <FormLabel className='font-[600] text-[#272B35]'>
                    Street Address*
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='text'
                      placeholder='Enter street address'
                      {...field}
                      className='w-full'
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
                  <FormLabel className='font-[600] text-[#272B35]'>
                    Apt, suit, unit (if applicable)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='text'
                      placeholder='Enter unit number'
                      {...field}
                      className='w-full'
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
                  <FormLabel className='font-[600] text-[#272B35]'>
                    Zip Code*
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='text'
                      placeholder='Enter zip code'
                      {...field}
                      className='w-full'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='agreement'
              render={({ field }) => (
                <FormItem className='flex-1 flex flex-col justify-start items-start space-y-2.5'>
                  <FormLabel className='font-[600] text-[#272B35]'>
                    Agreement with landlord/owner*
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
                        className='flex items-center gap-2.5 cursor-pointer py-1.5 '
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
                  {agreement &&
                    agreement.length > 0 &&
                    agreement[0].type === "application/pdf" && (
                      <div className='text-green-600 text-sm mb-2'>
                        Selected: {agreement[0].name}
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
