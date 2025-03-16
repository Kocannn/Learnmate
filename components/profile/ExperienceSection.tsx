import { Plus, UserCircle, Trash } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ExperienceSectionProps {
  userData: any;
  editMode: boolean;
  setShowAddExperience: (show: boolean) => void;
}

export default function ExperienceSection({
  userData,
  editMode,
  setShowAddExperience,
}: ExperienceSectionProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Pengalaman</CardTitle>
          <CardDescription>Riwayat pengalaman kerja Anda</CardDescription>
        </div>
        {editMode && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAddExperience(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Tambah
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {userData.experience.map((exp: any) => (
            <div key={exp.id} className="flex items-start group">
              <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mr-3">
                <UserCircle className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">{exp.position}</p>
                <p className="text-sm text-muted-foreground">{exp.company}</p>
                <p className="text-xs text-muted-foreground">{exp.duration}</p>
              </div>
              {editMode && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100"
                >
                  <Trash className="h-4 w-4 text-destructive" />
                </Button>
              )}
            </div>
          ))}

          {userData.experience.length === 0 && (
            <div className="text-center py-4">
              <UserCircle className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                Belum ada data pengalaman
              </p>
              {editMode && (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => setShowAddExperience(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah Pengalaman
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
