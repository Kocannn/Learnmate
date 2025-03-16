import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AddEducationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (education: {
    institution: string;
    degree: string;
    year: string;
  }) => void;
}

export default function AddEducationDialog({
  open,
  onOpenChange,
  onSubmit,
}: AddEducationDialogProps) {
  const [institution, setInstitution] = useState("");
  const [degree, setDegree] = useState("");
  const [year, setYear] = useState("");

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit({ institution, degree, year });
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Pendidikan</DialogTitle>
          <DialogDescription>
            Tambahkan informasi pendidikan Anda
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <Label htmlFor="institution">Institusi</Label>
            <Input
              id="institution"
              placeholder="Nama universitas atau institusi"
              className="mt-1"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="degree">Gelar/Jurusan</Label>
            <Input
              id="degree"
              placeholder="Contoh: S1 Ilmu Komputer"
              className="mt-1"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="year">Tahun</Label>
            <Input
              id="year"
              placeholder="Contoh: 2020 - 2024"
              className="mt-1"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Batal
          </Button>
          <Button onClick={handleSubmit}>Simpan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
