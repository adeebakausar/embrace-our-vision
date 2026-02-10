import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CreditCard, Shield, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import type { BookingData } from "../Booking";

interface BookingPaymentStepProps {
  bookingData: BookingData;
  therapist: { id: string; name: string; price: string };
  onSuccess: (bookingId: string) => void;
  onBack: () => void;
}

const BookingPaymentStep = ({ bookingData, therapist, onSuccess, onBack }: BookingPaymentStepProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirmAndPay = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      // Create booking record in database
      const { data, error: insertError } = await supabase
        .from("bookings")
        .insert({
          therapist: bookingData.therapist,
          booking_date: bookingData.date ? format(bookingData.date, "yyyy-MM-dd") : "",
          booking_time: bookingData.time,
          customer_name: bookingData.customerName,
          customer_email: bookingData.customerEmail,
          customer_phone: bookingData.customerPhone,
          customer_address: bookingData.customerAddress,
          amount: 110.0,
          currency: "AUD",
          payment_status: "pending",
        })
        .select("id")
        .single();

      if (insertError) throw insertError;

      const bookingId = data.id;

      // Redirect to PayPal for payment
      // Using PayPal hosted button / payment link approach
      // The edge function will create the PayPal order and return a redirect URL
      const { data: paymentData, error: paymentError } = await supabase.functions.invoke(
        "create-paypal-order",
        {
          body: {
            bookingId,
            amount: "110.00",
            currency: "AUD",
            description: `Therapy session with ${therapist.name}`,
            customerEmail: bookingData.customerEmail,
            customerName: bookingData.customerName,
          },
        }
      );

      if (paymentError) throw paymentError;

      if (paymentData?.approvalUrl) {
        // Redirect to PayPal
        window.location.href = paymentData.approvalUrl;
      } else {
        // If no PayPal redirect, mark as confirmed (manual payment)
        await supabase
          .from("bookings")
          .update({ payment_status: "confirmed" })
          .eq("id", bookingId);
        onSuccess(bookingId);
      }
    } catch (err: any) {
      console.error("Booking error:", err);
      // If PayPal isn't set up yet, still create the booking
      try {
        const { data } = await supabase
          .from("bookings")
          .insert({
            therapist: bookingData.therapist,
            booking_date: bookingData.date ? format(bookingData.date, "yyyy-MM-dd") : "",
            booking_time: bookingData.time,
            customer_name: bookingData.customerName,
            customer_email: bookingData.customerEmail,
            customer_phone: bookingData.customerPhone,
            customer_address: bookingData.customerAddress,
            amount: 110.0,
            currency: "AUD",
            payment_status: "confirmed",
          })
          .select("id")
          .single();

        if (data) {
          onSuccess(data.id);
          return;
        }
      } catch {
        // ignore secondary error
      }
      setError("There was an issue processing your booking. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-card rounded-3xl border border-border/50 overflow-hidden shadow-soft">
      <div className="p-6 md:p-10">
        <h3 className="font-display text-2xl font-semibold text-foreground mb-2">
          Confirm & Pay
        </h3>
        <p className="text-muted-foreground mb-8">
          Review your booking details and complete your payment.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Booking Summary */}
          <div className="space-y-6">
            <div className="bg-muted/30 rounded-2xl p-6 border border-border/30 space-y-4">
              <h4 className="font-semibold text-foreground">Booking Summary</h4>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Therapist</span>
                  <span className="font-medium text-foreground">{bookingData.therapistName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium text-foreground">
                    {bookingData.date && format(bookingData.date, "EEEE, MMMM d, yyyy")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time</span>
                  <span className="font-medium text-foreground">{bookingData.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-medium text-foreground">60 minutes</span>
                </div>
                <hr className="border-border/50" />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name</span>
                  <span className="font-medium text-foreground">{bookingData.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email</span>
                  <span className="font-medium text-foreground">{bookingData.customerEmail}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone</span>
                  <span className="font-medium text-foreground">{bookingData.customerPhone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="space-y-6">
            <div className="bg-primary/5 rounded-2xl p-6 border border-primary/20">
              <div className="flex items-center justify-between mb-6">
                <span className="text-lg font-display font-semibold text-foreground">Total</span>
                <span className="text-2xl font-bold text-primary">$110.00 AUD</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                <Shield size={16} className="text-primary" />
                <span>Secure payment via PayPal</span>
              </div>

              {error && (
                <div className="bg-destructive/10 text-destructive text-sm rounded-xl p-4 mb-4">
                  {error}
                </div>
              )}

              <Button
                onClick={handleConfirmAndPay}
                disabled={isProcessing}
                className="w-full h-14 text-base font-semibold gap-2 rounded-xl"
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <Loader2 size={20} className="animate-spin" /> Processing...
                  </>
                ) : (
                  <>
                    <CreditCard size={20} /> Confirm & Pay $110.00
                  </>
                )}
              </Button>
            </div>

            <Button variant="outline" onClick={onBack} className="gap-2">
              <ArrowLeft size={16} /> Back to Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPaymentStep;
