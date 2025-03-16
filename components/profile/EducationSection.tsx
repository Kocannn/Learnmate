import { Plus, GraduationCap, Trash } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface EducationSectionProps {
  userData: any;
  editMode: boolean;
  setShowAddEducation: (show: boolean) => void;
}

export default function EducationSection({
  userData,
  editMode,
  setShowAddEducation,
}: EducationSectionProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Pendidikan</CardTitle>
          <CardDescription>Riwayat pendidikan Anda</CardDescription>
        </div>
        {editMode && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAddEducation(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Tambah
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {userData.education.map((edu: any) => (
            <div key={edu.id} className="flex items-start group">
              <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mr-3">
                <GraduationCap className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">{edu.degree}</p>
                <p className="text-sm text-muted-foreground">
                  {edu.institution}
                </p>
                <p className="text-xs text-muted-foreground">{edu.year}</p>
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

          {userData.education.length === 0 && (
            <div className="text-center py-4">
              <GraduationCap className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                Belum ada data pendidikan
              </p>
              {editMode && (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => setShowAddEducation(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah Pendidikan
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
