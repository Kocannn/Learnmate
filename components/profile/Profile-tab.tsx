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
import EducationSection from "./EducationSection";
import ExperienceSection from "./ExperienceSection";
import SkillsSection from "./SkillSection";
import { useProfile } from "@/context/ProfileContext";

export default function ProfileTab() {
  const {
    user,
    userData,
    userType,
    editMode,
    formData,
    setFormData,
    setShowAddEducation,
    setShowAddExperience,
  } = useProfile();

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
                  <Input
                    id="name"
                    defaultValue={user?.name}
                    className="mt-1"
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="location">Lokasi</Label>
                  <Input
                    id="location"
                    defaultValue={user?.location}
                    className="mt-1"
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  className="mt-1 min-h-[120px]"
                  defaultValue={user?.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
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
