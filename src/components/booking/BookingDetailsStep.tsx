import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, User, Mail, Phone, MapPin } from "lucide-react";
import { format } from "date-fns";
import type { BookingData } from "../Booking";

interface BookingDetailsStepProps {
  bookingData: BookingData;
  onSubmit: (details: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    customerAddress: string;
  }) => void;
  onBack: () => void;
}

const BookingDetailsStep = ({ bookingData, onSubmit, onBack }: BookingDetailsStepProps) => {
  const [name, setName] = useState(bookingData.customerName);
  const [email, setEmail] = useState(bookingData.customerEmail);
  const [phone, setPhone] = useState(bookingData.customerPhone);
  const [address, setAddress] = useState(bookingData.customerAddress);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Valid email is required";
    if (!phone.trim() || phone.trim().length < 8) newErrors.phone = "Valid phone number is required";
    if (!address.trim()) newErrors.address = "Address is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        customerName: name.trim(),
        customerEmail: email.trim(),
        customerPhone: phone.trim(),
        customerAddress: address.trim(),
      });
    }
  };

  return (
    <div className="bg-card rounded-3xl border border-border/50 overflow-hidden shadow-soft">
      <div className="p-6 md:p-10">
        {/* Booking Summary */}
        <div className="bg-muted/30 rounded-2xl p-5 mb-8 border border-border/30">
          <p className="text-sm text-muted-foreground mb-1">Your appointment</p>
          <p className="font-display text-lg font-semibold text-foreground">
            {bookingData.therapistName}
          </p>
          <p className="text-primary font-medium">
            {bookingData.date && format(bookingData.date, "EEEE, MMMM d, yyyy")} at {bookingData.time}
          </p>
        </div>

        <h3 className="font-display text-2xl font-semibold text-foreground mb-2">
          Your Details
        </h3>
        <p className="text-muted-foreground mb-8">
          Please provide your contact information to complete the booking.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <User size={14} className="text-primary" /> Full Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="h-12 rounded-xl"
            />
            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail size={14} className="text-primary" /> Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="h-12 rounded-xl"
            />
            {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone size={14} className="text-primary" /> Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+61 400 000 000"
              className="h-12 rounded-xl"
            />
            {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="flex items-center gap-2">
              <MapPin size={14} className="text-primary" /> Address
            </Label>
            <Input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Your address"
              className="h-12 rounded-xl"
            />
            {errors.address && <p className="text-sm text-destructive">{errors.address}</p>}
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="button" variant="outline" onClick={onBack} className="gap-2">
              <ArrowLeft size={16} /> Back
            </Button>
            <Button type="submit" className="flex-1 gap-2">
              Continue to Payment <ArrowRight size={16} />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingDetailsStep;
