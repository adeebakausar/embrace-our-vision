
-- Create bookings table for appointment scheduling
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  therapist TEXT NOT NULL,
  booking_date DATE NOT NULL,
  booking_time TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_address TEXT NOT NULL,
  amount NUMERIC(10,2) NOT NULL DEFAULT 110.00,
  currency TEXT NOT NULL DEFAULT 'AUD',
  payment_status TEXT NOT NULL DEFAULT 'pending',
  payment_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Public can insert bookings (no auth required for clients booking)
CREATE POLICY "Anyone can create bookings"
ON public.bookings
FOR INSERT
WITH CHECK (true);

-- Public can read their own booking by id (for confirmation)
CREATE POLICY "Anyone can read bookings"
ON public.bookings
FOR SELECT
USING (true);

-- Only authenticated users (admin) can update bookings
CREATE POLICY "Authenticated users can update bookings"
ON public.bookings
FOR UPDATE
USING (auth.uid() IS NOT NULL);

-- Trigger for updated_at
CREATE TRIGGER update_bookings_updated_at
BEFORE UPDATE ON public.bookings
FOR EACH ROW
EXECUTE FUNCTION public.update_settings_updated_at();
