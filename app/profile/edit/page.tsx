"use client";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { EducationFormSection } from "@/components/profile/EducationFormSection";

const profileSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().regex(/^\+62\s\d{3}\s\d{4}\s\d{4}$/),
  location: z.string(),
  bio: z.string().max(500),
  education: z
    .array(
      z.object({
        institution: z.string(),
        degree: z.string(),
        year: z.string(),
      }),
    )
    .min(1),
  experience: z.array(
    z.object({
      company: z.string(),
      position: z.string(),
      duration: z.string(),
    }),
  ),
  isMentor: z.boolean(),
  expertise: z.array(z.string()).optional(),
  rate: z.number().optional(),
  availability: z.array(
    z.object({
      day: z.string(),
      slots: z.array(z.string()),
    }),
  ),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfileEditPage() {
  const { data: session } = useSession();
  const { register, handleSubmit, formState, watch } =
    useForm<ProfileFormValues>({
      resolver: zodResolver(profileSchema),
      defaultValues: async () => {
        const res = await fetch(`/api/profile/${session?.user?.id}`);
        return res.json();
      },
    });

  const [educations, setEducations] = useState([0]);
  const [experiences, setExperiences] = useState([0]);
  const [availabilities, setAvailabilities] = useState([0]);
  const isMentor = watch("isMentor");

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Update failed");
      // Handle success
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Lengkapi Profil</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal Information Section */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Informasi Pribadi</h2>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Nama Lengkap" {...register("name")} />
            <Input label="Email" type="email" {...register("email")} />
            <Input label="Nomor Telepon" {...register("phone")} />
            <Input label="Lokasi" {...register("location")} />
            <Textarea label="Bio" {...register("bio")} className="col-span-2" />
          </div>
        </section>

        {/* Education Section */}
        <EducationFormSection
          register={register}
          educations={educations}
          setEducations={setEducations}
        />

        {/* Experience Section */}
        <ExperienceFormSection
          register={register}
          experiences={experiences}
          setExperiences={setExperiences}
        />

        {/* Mentor Toggle */}
        <div className="flex items-center gap-2">
          <Switch {...register("isMentor")} />
          <span>Saya adalah Mentor</span>
        </div>

        {isMentor && (
          <>
            <MentorExpertiseSection register={register} />
            <AvailabilitySection
              register={register}
              availabilities={availabilities}
              setAvailabilities={setAvailabilities}
            />
          </>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={formState.isSubmitting}
        >
          {formState.isSubmitting ? "Menyimpan..." : "Simpan Profil"}
        </Button>
      </form>
    </div>
  );
}
