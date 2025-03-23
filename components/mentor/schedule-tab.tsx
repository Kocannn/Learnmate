import { useState } from "react";
import { Calendar, Clock } from "lucide-react";
import { format, parse } from "date-fns";
import { getAvailableDates } from "@/lib/date-utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Function to get available time slots
function getAvailableTimeSlots() {
  return [
    { value: "09:00:00", label: "09:00" },
    { value: "10:30:00", label: "10:30" },
    { value: "13:00:00", label: "13:00" },
    { value: "14:30:00", label: "14:30" },
    { value: "16:00:00", label: "16:00" },
  ];
}

interface ScheduleTabProps {
  mentor: any; // Replace with proper type
  onSchedule: (date: string, time: string, notes: string) => Promise<void>;
  isBooking: boolean;
}

export function ScheduleTab({
  mentor,
  onSchedule,
  isBooking,
}: ScheduleTabProps) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [notes, setNotes] = useState("");

  const availableDates = getAvailableDates();
  const availableTimes = getAvailableTimeSlots();

  const handleBookSession = () => {
    onSchedule(selectedDate, selectedTime, notes);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Jadwalkan Sesi</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <Label className="text-base">Pilih Tanggal</Label>
            <Carousel className="mt-2">
              <CarouselContent>
                {availableDates.map((date) => (
                  <CarouselItem key={date.value} className="basis-auto">
                    <div
                      className={`py-3 px-5 border rounded-md cursor-pointer transition-colors ${
                        selectedDate === date.value
                          ? "border-primary bg-primary/10"
                          : "hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedDate(date.value)}
                    >
                      <div className="text-center">
                        <Calendar size={16} className="mx-auto mb-1" />
                        <div className="text-sm font-medium">
                          {(() => {
                            try {
                              return format(
                                parse(date.value, "yyyy-MM-dd", new Date()),
                                "EEEE",
                              );
                            } catch (error) {
                              // Fallback to simple day name if formatting fails
                              return new Date(date.value).toLocaleDateString(
                                "id-ID",
                                {
                                  weekday: "long",
                                },
                              );
                            }
                          })()}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {(() => {
                            try {
                              return format(
                                parse(date.value, "yyyy-MM-dd", new Date()),
                                "dd MMM",
                              );
                            } catch (error) {
                              return new Date(date.value).toLocaleDateString(
                                "id-ID",
                                {
                                  day: "2-digit",
                                  month: "short",
                                },
                              );
                            }
                          })()}
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="hidden md:block">
                <CarouselPrevious />
                <CarouselNext />
              </div>
            </Carousel>
          </div>

          <div>
            <Label className="text-base">Pilih Waktu</Label>
            <RadioGroup
              value={selectedTime}
              onValueChange={setSelectedTime}
              className="grid grid-cols-3 gap-2 mt-2"
            >
              {availableTimes.map((time) => (
                <div key={time.value} className="relative">
                  <RadioGroupItem
                    value={time.value}
                    id={`time-${time.value}`}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={`time-${time.value}`}
                    className="flex items-center justify-center py-2 border rounded-md cursor-pointer transition-colors peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 hover:border-primary/50"
                  >
                    <Clock size={14} className="mr-1" />
                    {time.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div>
            <Label className="text-base">Catatan (Opsional)</Label>
            <Textarea
              placeholder="Jelaskan topik yang ingin dibahas dalam sesi"
              className="mt-2"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full h-12"
          onClick={handleBookSession}
          disabled={!selectedDate || !selectedTime || isBooking}
        >
          {isBooking ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-t-transparent mr-2"></div>
              Membuat Booking...
            </>
          ) : (
            "Jadwalkan Sesi"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
