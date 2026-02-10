import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Read PayPal credentials from settings table
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: settings } = await supabase
      .from("settings")
      .select("key, value")
      .in("key", ["paypal_client_id", "paypal_secret"]);

    const PAYPAL_CLIENT_ID = settings?.find((s: any) => s.key === "paypal_client_id")?.value;
    const PAYPAL_SECRET = settings?.find((s: any) => s.key === "paypal_secret")?.value;

    const baseUrl = "https://api-m.sandbox.paypal.com"; // Change to api-m.paypal.com for live

    if (!PAYPAL_CLIENT_ID || !PAYPAL_SECRET) {
      return new Response(
        JSON.stringify({ error: "PayPal not configured. Please add your PayPal credentials in Settings.", approvalUrl: null }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { bookingId, amount, currency, description, customerEmail, customerName } = await req.json();

    // Get access token
    const tokenRes = await fetch(`${baseUrl}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${btoa(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`)}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });
    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    // Determine return URLs
    const origin = req.headers.get("origin") || "https://embrace-our-vision.lovable.app";
    const returnUrl = `${origin}/?booking_success=${bookingId}`;
    const cancelUrl = `${origin}/?booking_cancelled=${bookingId}`;

    // Create order
    const orderRes = await fetch(`${baseUrl}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            reference_id: bookingId,
            description,
            amount: {
              currency_code: currency,
              value: amount,
            },
          },
        ],
        payment_source: {
          paypal: {
            experience_context: {
              return_url: returnUrl,
              cancel_url: cancelUrl,
              brand_name: "Intune Mindset",
              user_action: "PAY_NOW",
            },
          },
        },
      }),
    });

    const orderData = await orderRes.json();

    const approvalUrl = orderData.links?.find(
      (link: any) => link.rel === "payer-action" || link.rel === "approve"
    )?.href;

    return new Response(
      JSON.stringify({ orderId: orderData.id, approvalUrl }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("PayPal error:", error);
    return new Response(
      JSON.stringify({ error: error.message, approvalUrl: null }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
