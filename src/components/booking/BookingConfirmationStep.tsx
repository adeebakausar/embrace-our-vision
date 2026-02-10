import { Button } from "@/components/ui/button";
import { CheckCircle, Calendar, Clock, User } from "lucide-react";
import { format } from "date-fns";
import type { BookingData } from "../Booking";

interface BookingConfirmationStepProps {
  bookingData: BookingData;
  therapist: { id: string; name: string; price: string };
  onReset: () => void;
}

const BookingConfirmationStep = ({ bookingData, therapist, onReset }: BookingConfirmationStepProps) => {
  return (
    <div className="bg-card rounded-3xl border border-border/50 overflow-hidden shadow-soft">
      <div className="p-6 md:p-10 text-center max-w-lg mx-auto">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-primary" />
        </div>

        <h3 className="font-display text-3xl font-semibold text-foreground mb-3">
          Booking Confirmed!
        </h3>
        <p className="text-muted-foreground mb-8">
          Your appointment has been successfully booked. A confirmation email will be sent to{" "}
          <span className="font-medium text-foreground">{bookingData.customerEmail}</span>.
        </p>

        <div className="bg-muted/30 rounded-2xl p-6 border border-border/30 text-left space-y-4 mb-8">
          <div className="flex items-center gap-3">
            <User size={18} className="text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Therapist</p>
              <p className="font-medium text-foreground">{bookingData.therapistName}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar size={18} className="text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Date</p>
              <p className="font-medium text-foreground">
                {bookingData.date && format(bookingData.date, "EEEE, MMMM d, yyyy")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock size={18} className="text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Time</p>
              <p className="font-medium text-foreground">{bookingData.time} (60 min)</p>
            </div>
          </div>
          {bookingData.bookingId && (
            <div className="pt-2 border-t border-border/30">
              <p className="text-xs text-muted-foreground">Booking Reference</p>
              <p className="font-mono text-sm text-foreground">{bookingData.bookingId.slice(0, 8).toUpperCase()}</p>
            </div>
          )}
        </div>

        <Button onClick={onReset} variant="outline" size="lg">
          Book Another Appointment
        </Button>
      </div>
    </div>
  );
};

export default BookingConfirmationStep;
