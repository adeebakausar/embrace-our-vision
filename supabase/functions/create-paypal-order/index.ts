import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const PAYPAL_CLIENT_ID = Deno.env.get("PAYPAL_CLIENT_ID");
    const PAYPAL_SECRET = Deno.env.get("PAYPAL_SECRET");
    const PAYPAL_MODE = Deno.env.get("PAYPAL_MODE") || "sandbox";
    
    const baseUrl = PAYPAL_MODE === "live" 
      ? "https://api-m.paypal.com" 
      : "https://api-m.sandbox.paypal.com";

    if (!PAYPAL_CLIENT_ID || !PAYPAL_SECRET) {
      // Return without approval URL so the frontend falls back to direct confirmation
      return new Response(
        JSON.stringify({ error: "PayPal not configured", approvalUrl: null }),
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
