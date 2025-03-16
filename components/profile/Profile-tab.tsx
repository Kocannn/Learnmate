import { Plus, X, GraduationCap, Trash, UserCircle } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import EducationSection from "./EducationSection";
import ExperienceSection from "./ExperienceSection";
import SkillsSection from "./SkillSection";

export interface ProfileTabProps {
  user: any;
  userData: any;
  userType: string;
  editMode: boolean;
  setShowAddEducation: (show: boolean) => void;
  setShowAddExperience: (show: boolean) => void;
}

export default function ProfileTab({
  user,
  userData,
  userType,
  editMode,
  setShowAddEducation,
  setShowAddExperience,
}: ProfileTabProps) {
  return (
    <div className="mt-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informasi Dasar</CardTitle>
          <CardDescription>
            Informasi dasar yang akan ditampilkan di profil Anda
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {editMode ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nama Lengkap</Label>
                  <Input id="name" defaultValue={user?.name} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="location">Lokasi</Label>
                  <Input
                    id="location"
                    defaultValue={user?.location}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  className="mt-1 min-h-[120px]"
                  defaultValue={user?.bio}
                />
              </div>
            </div>
          ) : (
            <div>
              <h3 className="font-medium mb-2">Bio</h3>
              <p className="text-sm text-muted-foreground">{user?.bio}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <EducationSection
        userData={userData}
        editMode={editMode}
        setShowAddEducation={setShowAddEducation}
      />

      {userType === "mentor" && (
        <ExperienceSection
          userData={userData}
          editMode={editMode}
          setShowAddExperience={setShowAddExperience}
        />
      )}

      <SkillsSection
        userData={userData}
        userType={userType}
        editMode={editMode}
      />
    </div>
  );
}
