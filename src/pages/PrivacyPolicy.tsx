import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <section className="section-padding bg-background">
          <div className="container-narrow mx-auto">
            <div className="text-center mb-12">
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
                Privacy Policy
              </h1>
              <p className="text-muted-foreground">
                Last updated: January 2026
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="space-y-8 text-muted-foreground">
                <section>
                  <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                    1. Introduction
                  </h2>
                  <p>
                    Intune Mindset ("we," "our," or "us") is committed to protecting your privacy. 
                    This Privacy Policy explains how we collect, use, disclose, and safeguard your 
                    information when you visit our website or use our counselling services.
                  </p>
                </section>

                <section>
                  <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                    2. Information We Collect
                  </h2>
                  <p className="mb-4">We may collect information about you in a variety of ways, including:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong className="text-foreground">Personal Data:</strong> Name, email address, 
                      phone number, and other contact information you provide when booking appointments 
                      or contacting us.
                    </li>
                    <li>
                      <strong className="text-foreground">Health Information:</strong> Information 
                      related to your mental health that you share during counselling sessions.
                    </li>
                    <li>
                      <strong className="text-foreground">Usage Data:</strong> Information about how 
                      you use our website, including IP address, browser type, and pages visited.
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                    3. How We Use Your Information
                  </h2>
                  <p className="mb-4">We use the information we collect to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide and manage our counselling services</li>
                    <li>Schedule and manage appointments</li>
                    <li>Communicate with you about your care</li>
                    <li>Improve our website and services</li>
                    <li>Comply with legal and professional obligations</li>
                  </ul>
                </section>

                <section>
                  <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                    4. Confidentiality
                  </h2>
                  <p>
                    All information shared during counselling sessions is strictly confidential 
                    and protected under professional ethical guidelines. We adhere to the ethical 
                    standards set by PACFA (Psychotherapy and Counselling Federation of Australia) 
                    and ANZAP (Australian and New Zealand Association of Psychotherapists).
                  </p>
                  <p className="mt-4">
                    Confidentiality may only be breached in exceptional circumstances, such as:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Risk of harm to yourself or others</li>
                    <li>Legal requirements or court orders</li>
                    <li>With your written consent</li>
                  </ul>
                </section>

                <section>
                  <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                    5. Data Security
                  </h2>
                  <p>
                    We implement appropriate technical and organizational measures to protect 
                    your personal information against unauthorized access, alteration, disclosure, 
                    or destruction. However, no method of transmission over the Internet is 100% 
                    secure.
                  </p>
                </section>

                <section>
                  <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                    6. Your Rights
                  </h2>
                  <p className="mb-4">You have the right to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Access your personal information</li>
                    <li>Request correction of inaccurate data</li>
                    <li>Request deletion of your data (subject to legal requirements)</li>
                    <li>Withdraw consent for data processing</li>
                  </ul>
                </section>

                <section>
                  <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                    7. Contact Us
                  </h2>
                  <p>
                    If you have questions about this Privacy Policy or wish to exercise your 
                    rights, please contact us at:
                  </p>
                  <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                    <p className="text-foreground font-medium">Intune Mindset</p>
                    <p>Email: <a href="mailto:intunemindset@gmail.com" className="text-primary hover:underline">intunemindset@gmail.com</a></p>
                  </div>
                </section>

                <section>
                  <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                    8. Changes to This Policy
                  </h2>
                  <p>
                    We may update this Privacy Policy from time to time. We will notify you of 
                    any changes by posting the new Privacy Policy on this page and updating the 
                    "Last updated" date.
                  </p>
                </section>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
