import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Heart } from "lucide-react";

const CTA = () => {
  return (
    <section className="section-padding bg-primary relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary-foreground/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary-foreground/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
      
      <div className="container-narrow mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/20 text-primary-foreground text-sm font-medium mb-8 animate-fade-up">
          <Heart size={16} />
          Start Your Journey
        </div>
        
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-primary-foreground mb-6 animate-fade-up delay-100">
          Ready to Begin Your{" "}
          <span className="italic">Healing Journey?</span>
        </h2>
        <p className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto mb-12 animate-fade-up delay-200">
          Take the first step today. Our compassionate team is here to support you every step of the way.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-up delay-300">
          <Button 
            size="xl"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            asChild
          >
            <Link to="/services/counselling">
              Book Your Session
              <ArrowRight size={20} />
            </Link>
          </Button>
          <Button 
            variant="outline" 
            size="xl"
            className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:border-primary-foreground"
            asChild
          >
            <Link to="/contact">
              Contact Us
            </Link>
          </Button>
        </div>

        {/* Contact Info */}
        <div className="animate-fade-up delay-400">
          <a 
            href="mailto:intunemindset@gmail.com" 
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 transition-colors"
          >
            <Mail size={20} />
            <span className="font-medium">intunemindset@gmail.com</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTA;
