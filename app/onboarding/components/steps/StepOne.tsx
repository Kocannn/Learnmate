import { useRef } from "react";
import Image from "next/image";
import { Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { OnboardingFormValues } from "../../types";

interface StepOneProps {
  form: UseFormReturn<OnboardingFormValues>;
}

export function StepOne({ form }: StepOneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { register, setValue, getValues, formState: { errors } } = form;

  const uploadProfileImage = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setValue("profileImage", imageUrl);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center">
        <div className="relative h-32 w-32 rounded-full overflow-hidden bg-gray-100">
          <Image
            src={getValues("profileImage") || "/placeholder.svg?height=200&width=200"}
            alt="Profile"
            fill
            className="object-cover"
          />
          <button
            type="button"
            onClick={uploadProfileImage}
            className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
          >
            <Upload className="h-8 w-8 text-white" />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />
        </div>
        <button
          type="button"
          onClick={uploadProfileImage}
          className="mt-2 text-sm text-indigo-600 hover:text-indigo-500"
        >
          Upload Photo
        </button>
      </div>

      <div className="space-y-4">
        {/* Form fields */}
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Your full name"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Your email address"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* ...other fields... */}
      </div>
    </div>
  );
}
