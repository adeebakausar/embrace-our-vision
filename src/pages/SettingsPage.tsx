import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, CreditCard, Save, CheckCircle, AlertCircle, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const SettingsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showClientId, setShowClientId] = useState(false);
  const [showSecret, setShowSecret] = useState(false);

  // Form state
  const [paypalClientId, setPaypalClientId] = useState("");
  const [paypalSecret, setPaypalSecret] = useState("");

  // Load existing settings
  useEffect(() => {
    const loadSettings = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("settings")
          .select("key, value");

        if (error) throw error;

        data?.forEach((setting) => {
          switch (setting.key) {
            case "paypal_client_id":
              setPaypalClientId(setting.value || "");
              break;
            case "paypal_secret":
              setPaypalSecret(setting.value || "");
              break;
          }
        });
      } catch (error) {
        console.error("Error loading settings:", error);
        toast.error("Failed to load settings");
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, []);

  const handleSavePayPalSettings = async () => {
    if (!paypalClientId.trim() || !paypalSecret.trim()) {
      toast.error("Please enter both your PayPal Client ID and Secret");
      return;
    }

    setIsSaving(true);
    try {
      // Upsert PayPal Client ID
      const { error: clientIdError } = await supabase
        .from("settings")
        .upsert(
          { key: "paypal_client_id", value: paypalClientId.trim() },
          { onConflict: "key" }
        );
      if (clientIdError) throw clientIdError;

      // Upsert PayPal Secret
      const { error: secretError } = await supabase
        .from("settings")
        .upsert(
          { key: "paypal_secret", value: paypalSecret.trim() },
          { onConflict: "key" }
        );
      if (secretError) throw secretError;

      toast.success("PayPal settings saved successfully!");
    } catch (error) {
      console.error("Error saving PayPal settings:", error);
      toast.error("Failed to save PayPal settings");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <section className="section-padding bg-gradient-to-b from-primary/5 to-background">
          <div className="container-wide mx-auto">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors"
            >
              <ArrowLeft size={18} />
              Back to Home
            </Link>

            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Settings className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
                    Settings
                  </h1>
                  <p className="text-muted-foreground">
                    Configure your PayPal payment integration
                  </p>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-primary" />
                    PayPal Payment Integration
                  </CardTitle>
                  <CardDescription>
                    Connect your PayPal business account to accept payments for counselling sessions.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-accent/50 border border-border rounded-lg p-4">
                    <h4 className="font-medium text-foreground text-sm mb-2 flex items-center gap-2">
                      <AlertCircle size={16} className="text-primary" />
                      Important Security Note
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Your PayPal credentials are stored securely and used only for processing session payments.
                      Never share these credentials publicly.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="paypal-client-id">PayPal Client ID</Label>
                      <div className="relative">
                        <Input
                          id="paypal-client-id"
                          type={showClientId ? "text" : "password"}
                          placeholder="Enter your PayPal Client ID"
                          value={paypalClientId}
                          onChange={(e) => setPaypalClientId(e.target.value)}
                          disabled={isLoading}
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowClientId(!showClientId)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showClientId ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="paypal-secret">PayPal Secret</Label>
                      <div className="relative">
                        <Input
                          id="paypal-secret"
                          type={showSecret ? "text" : "password"}
                          placeholder="Enter your PayPal Secret"
                          value={paypalSecret}
                          onChange={(e) => setPaypalSecret(e.target.value)}
                          disabled={isLoading}
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowSecret(!showSecret)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showSecret ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pt-4 border-t">
                    <Button
                      onClick={handleSavePayPalSettings}
                      disabled={isSaving || isLoading || !paypalClientId.trim() || !paypalSecret.trim()}
                    >
                      {isSaving ? (
                        <>Saving...</>
                      ) : (
                        <>
                          <Save size={18} />
                          Save PayPal Settings
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                      <CheckCircle size={16} className="text-primary" />
                      How to get your PayPal credentials
                    </h4>
                    <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                      <li>Go to developer.paypal.com and log in</li>
                      <li>Navigate to Apps & Credentials</li>
                      <li>Create a new app or select an existing one</li>
                      <li>Copy the Client ID and Secret from the app details</li>
                      <li>Use "Live" credentials for real payments</li>
                    </ol>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SettingsPage;
