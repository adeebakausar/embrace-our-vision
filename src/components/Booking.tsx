import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays } from "lucide-react";
import sandraImage from "@/assets/sandra-russet-silk.png";
import brettImage from "@/assets/brett-boyland.png";
import BookingCalendarStep from "./booking/BookingCalendarStep";
import BookingDetailsStep from "./booking/BookingDetailsStep";
import BookingPaymentStep from "./booking/BookingPaymentStep";
import BookingConfirmationStep from "./booking/BookingConfirmationStep";

export interface BookingData {
  therapist: string;
  therapistName: string;
  date: Date | null;
  time: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  bookingId: string | null;
}

const initialBookingData: BookingData = {
  therapist: "",
  therapistName: "",
  date: null,
  time: "",
  customerName: "",
  customerEmail: "",
  customerPhone: "",
  customerAddress: "",
  bookingId: null,
};

const therapists = [
  {
    id: "sandra",
    name: "Sandra Russet-Silk",
    title: "Psychoanalytic Psychotherapist",
    image: sandraImage,
    price: "$110.00 AUD",
  },
  {
    id: "brett",
    name: "Brett Boyland",
    title: "Master of Counselling",
    image: brettImage,
    price: "$110.00 AUD",
  },
];

const Booking = () => {
  const [activeTab, setActiveTab] = useState("sandra");
  const [step, setStep] = useState(1); // 1=calendar, 2=details, 3=payment, 4=confirmation
  const [bookingData, setBookingData] = useState<BookingData>(initialBookingData);

  const currentTherapist = therapists.find((t) => t.id === activeTab)!;

  const handleDateTimeSelect = (date: Date, time: string) => {
    setBookingData((prev) => ({
      ...prev,
      therapist: activeTab,
      therapistName: currentTherapist.name,
      date,
      time,
    }));
    setStep(2);
  };

  const handleDetailsSubmit = (details: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    customerAddress: string;
  }) => {
    setBookingData((prev) => ({ ...prev, ...details }));
    setStep(3);
  };

  const handlePaymentSuccess = (bookingId: string) => {
    setBookingData((prev) => ({ ...prev, bookingId }));
    setStep(4);
  };

  const handleReset = () => {
    setBookingData(initialBookingData);
    setStep(1);
  };

  const handleBack = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    handleReset();
  };

  return (
    <section id="booking" className="section-padding bg-gradient-to-b from-muted/30 to-background">
      <div className="container-wide mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-up">
            <CalendarDays size={16} />
            Book Your Session
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6 animate-fade-up delay-100">
            Schedule an Appointment
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl animate-fade-up delay-200">
            Choose your preferred therapist and book a time that works for you.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="max-w-5xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 md:gap-4">
            {["Select Time", "Your Details", "Payment", "Confirmed"].map((label, i) => (
              <div key={label} className="flex items-center gap-2 md:gap-4">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                      step > i + 1
                        ? "bg-primary text-primary-foreground"
                        : step === i + 1
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step > i + 1 ? "✓" : i + 1}
                  </div>
                  <span className={`hidden md:block text-sm font-medium ${step >= i + 1 ? "text-foreground" : "text-muted-foreground"}`}>
                    {label}
                  </span>
                </div>
                {i < 3 && <div className={`w-8 md:w-16 h-0.5 ${step > i + 1 ? "bg-primary" : "bg-border"}`} />}
              </div>
            ))}
          </div>
        </div>

        {/* Booking Content */}
        <div className="max-w-5xl mx-auto animate-fade-up delay-300">
          {step === 1 ? (
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-10 h-auto p-2 bg-card border border-border/50 rounded-2xl">
                {therapists.map((therapist) => (
                  <TabsTrigger
                    key={therapist.id}
                    value={therapist.id}
                    className="flex items-center gap-4 py-5 px-6 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300"
                  >
                    <img
                      src={therapist.image}
                      alt={therapist.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-current/20"
                    />
                    <div className="text-left">
                      <span className="block font-semibold text-base">Book {therapist.name.split(" ")[0]}</span>
                      <span className="block text-xs opacity-70">{therapist.title}</span>
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>

              {therapists.map((therapist) => (
                <TabsContent key={therapist.id} value={therapist.id}>
                  <BookingCalendarStep
                    therapistName={therapist.name}
                    therapistId={therapist.id}
                    onSelect={handleDateTimeSelect}
                  />
                </TabsContent>
              ))}
            </Tabs>
          ) : step === 2 ? (
            <BookingDetailsStep
              bookingData={bookingData}
              onSubmit={handleDetailsSubmit}
              onBack={handleBack}
            />
          ) : step === 3 ? (
            <BookingPaymentStep
              bookingData={bookingData}
              therapist={currentTherapist}
              onSuccess={handlePaymentSuccess}
              onBack={handleBack}
            />
          ) : (
            <BookingConfirmationStep
              bookingData={bookingData}
              therapist={currentTherapist}
              onReset={handleReset}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Booking;
