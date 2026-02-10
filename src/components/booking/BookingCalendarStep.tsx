import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Clock, User } from "lucide-react";
import { format, isWeekend, isBefore, startOfDay } from "date-fns";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface BookingCalendarStepProps {
  therapistName: string;
  therapistId: string;
  onSelect: (date: Date, time: string) => void;
}

const TIME_SLOTS = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
];

const BookingCalendarStep = ({ therapistName, therapistId, onSelect }: BookingCalendarStepProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>("");

  // Fetch existing bookings for this therapist to disable taken slots
  const { data: existingBookings } = useQuery({
    queryKey: ["bookings", therapistId, selectedDate ? format(selectedDate, "yyyy-MM-dd") : null],
    queryFn: async () => {
      if (!selectedDate) return [];
      const { data } = await supabase
        .from("bookings")
        .select("booking_time")
        .eq("therapist", therapistId)
        .eq("booking_date", format(selectedDate, "yyyy-MM-dd"))
        .neq("payment_status", "cancelled");
      return data?.map((b) => b.booking_time) ?? [];
    },
    enabled: !!selectedDate,
  });

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTime("");
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      onSelect(selectedDate, selectedTime);
    }
  };

  const disabledDays = (date: Date) => {
    return isWeekend(date) || isBefore(startOfDay(date), startOfDay(new Date()));
  };

  return (
    <div className="bg-card rounded-3xl border border-border/50 overflow-hidden shadow-soft">
      <div className="p-6 md:p-10">
        <h3 className="font-display text-2xl font-semibold text-foreground mb-2">
          Select Date & Time
        </h3>
        <p className="text-muted-foreground mb-8">
          Choose an available date and time slot for your session with {therapistName}.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Calendar */}
          <div>
            <p className="text-sm font-medium text-foreground mb-3">Select a Date</p>
            <div className="border border-border rounded-2xl p-4 bg-background">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                disabled={disabledDays}
                className={cn("p-3 pointer-events-auto")}
                fromDate={new Date()}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Monday – Friday only</p>
          </div>

          {/* Time Slots */}
          <div>
            <p className="text-sm font-medium text-foreground mb-3">
              {selectedDate ? `Available Times – ${format(selectedDate, "EEEE, MMMM d")}` : "Select a date first"}
            </p>
            {selectedDate ? (
              <div className="grid grid-cols-2 gap-3">
                {TIME_SLOTS.map((time) => {
                  const isBooked = existingBookings?.includes(time);
                  return (
                    <button
                      key={time}
                      onClick={() => !isBooked && handleTimeSelect(time)}
                      disabled={isBooked}
                      className={cn(
                        "flex items-center justify-center gap-2 py-4 px-4 rounded-xl border text-sm font-medium transition-all duration-200",
                        selectedTime === time
                          ? "bg-primary text-primary-foreground border-primary shadow-md"
                          : isBooked
                          ? "bg-muted/50 text-muted-foreground border-border/50 cursor-not-allowed line-through"
                          : "bg-background text-foreground border-border hover:border-primary hover:bg-primary/5 cursor-pointer"
                      )}
                    >
                      <Clock size={14} />
                      {time}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                <Clock size={48} className="mb-4 opacity-30" />
                <p>Please select a date to see available times</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 bg-muted/30 border-t border-border/50 flex items-center justify-between">
        <div className="flex flex-wrap items-center gap-6 text-sm">
          <div className="flex items-center gap-2 text-foreground">
            <Clock size={18} className="text-primary" />
            <span>60 min session</span>
          </div>
          <div className="hidden sm:block w-px h-5 bg-border" />
          <div className="flex items-center gap-2 text-foreground">
            <span className="font-semibold text-primary">$110.00 AUD</span>
            <span className="text-muted-foreground">per session</span>
          </div>
          <div className="hidden sm:block w-px h-5 bg-border" />
          <div className="flex items-center gap-2 text-muted-foreground">
            <User size={18} />
            <span>Online & In-Person</span>
          </div>
        </div>
        <button
          onClick={handleContinue}
          disabled={!selectedDate || !selectedTime}
          className={cn(
            "px-8 py-3 rounded-xl font-semibold text-sm transition-all duration-300",
            selectedDate && selectedTime
              ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          )}
        >
          Continue →
        </button>
      </div>
    </div>
  );
};

export default BookingCalendarStep;
