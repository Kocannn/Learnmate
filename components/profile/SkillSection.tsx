import { Plus, X } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SkillsSectionProps {
  userData: any;
  userType: string;
  editMode: boolean;
}

export default function SkillsSection({
  userData,
  userType,
  editMode,
}: SkillsSectionProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{userType === "mentor" ? "Keahlian" : "Minat"}</CardTitle>
          <CardDescription>
            {userType === "mentor"
              ? "Bidang keahlian yang Anda kuasai"
              : "Bidang yang Anda minati untuk dipelajari"}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {editMode ? (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {(userType === "mentor"
                ? userData.expertise
                : userData.interests
              ).map((item: string, index: number) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="flex items-center gap-1 px-3 py-1.5"
                >
                  {item}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 ml-1"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
              <Button variant="outline" size="sm" className="rounded-full">
                <Plus className="h-4 w-4 mr-1" />
                Tambah
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {(userType === "mentor"
              ? userData.expertise
              : userData.interests
            ).map((item: string, index: number) => (
              <Badge key={index} variant="secondary">
                {item}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
