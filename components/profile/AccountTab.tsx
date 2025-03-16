import { CreditCard, Lock, Plus } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

interface AccountTabProps {
  userData: any;
  userType: string;
}

export default function AccountTab({ userData, userType }: AccountTabProps) {
  return (
    <div className="mt-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informasi Kontak</CardTitle>
          <CardDescription>
            Informasi kontak yang digunakan untuk komunikasi
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                defaultValue={userData.email}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="phone">Nomor Telepon</Label>
              <Input
                id="phone"
                type="tel"
                defaultValue={userData.phone}
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Keamanan</CardTitle>
          <CardDescription>Pengaturan keamanan akun Anda</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Button variant="outline">
              <Lock className="h-4 w-4 mr-2" />
              Ubah Password
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="2fa">Verifikasi Dua Faktor</Label>
              <p className="text-sm text-muted-foreground">
                Aktifkan verifikasi dua faktor untuk keamanan tambahan
              </p>
            </div>
            <Switch id="2fa" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Metode Pembayaran</CardTitle>
          <CardDescription>Kelola metode pembayaran Anda</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center">
              <CreditCard className="h-5 w-5 mr-3 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Visa •••• 4242</p>
                <p className="text-xs text-muted-foreground">Expires 12/2025</p>
              </div>
            </div>
            <Badge>Default</Badge>
          </div>

          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Tambah Metode Pembayaran
          </Button>
        </CardContent>
      </Card>

      {userType === "mentor" && (
        <Card>
          <CardHeader>
            <CardTitle>Informasi Pembayaran</CardTitle>
            <CardDescription>
              Informasi untuk menerima pembayaran dari sesi mentoring
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="bank">Nama Bank</Label>
              <Input
                id="bank"
                defaultValue="Bank Central Asia (BCA)"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="account-number">Nomor Rekening</Label>
              <Input
                id="account-number"
                defaultValue="1234567890"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="account-name">Nama Pemilik Rekening</Label>
              <Input
                id="account-name"
                defaultValue={userData.name}
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-destructive">Hapus Akun</CardTitle>
          <CardDescription>Menghapus akun Anda secara permanen</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Setelah Anda menghapus akun, semua data Anda akan dihapus secara
            permanen. Tindakan ini tidak dapat dibatalkan.
          </p>
          <Button variant="destructive">Hapus Akun</Button>
        </CardContent>
      </Card>
    </div>
  );
}
