import { z } from "zod";

export const onboardingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\+62\s\d{3}\s\d{4}\s\d{4}$/, "Phone format should be +62 8xx xxxx xxxx"),
  location: z.string().min(3, "Please enter your location"),
  bio: z.string().max(500, "Bio should be less than 500 characters"),
  profileImage: z.string().optional(),
  education: z.array(
    z.object({
      institution: z.string().min(2, "Institution name is required"),
      degree: z.string().min(2, "Degree is required"),
      year: z.string().min(4, "Year range is required"),
    }),
  ),
  interests: z.array(z.string()).min(1, "Select at least one interest"),
  experience: z.array(
    z.object({
      company: z.string().min(2, "Company name is required"),
      position: z.string().min(2, "Position is required"),
      duration: z.string().min(2, "Duration is required"),
    }),
  ).optional(),
  isMentor: z.boolean().default(false),
  expertise: z.array(z.string()).optional(),
  rate: z.number().optional(),
  availability: z.array(
    z.object({
      day: z.string(),
      slots: z.array(z.string()),
    }),
  ).optional(),
});

export type OnboardingFormValues = z.infer<typeof onboardingSchema>;
