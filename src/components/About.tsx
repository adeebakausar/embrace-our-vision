import { CheckCircle, Heart, Award, Users, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const About = () => {
  const values = [
    { icon: Heart, text: "Safe, ethical, and compassionate care" },
    { icon: Award, text: "Evidence-based therapeutic approaches" },
    { icon: Sparkles, text: "Reading the story beneath the symptoms" },
    { icon: Users, text: "Personalized treatment plans" },
  ];

  const stats = [
    { value: "55+", label: "Years Combined Experience" },
    { value: "1000+", label: "Clients Supported" },
    { value: "2", label: "Expert Therapists" },
  ];

  return (
    <section id="about" className="section-padding bg-gradient-to-b from-muted/30 to-background overflow-hidden">
      <div className="container-wide mx-auto">
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-up">
            <Heart size={16} />
            About Intune Mindset
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6 animate-fade-up delay-100">
            No Fluff, No Guesswork—{" "}
            <span className="text-primary italic">Clinically Grounded</span> Care
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl animate-fade-up delay-200">
            At Intune Mindset, we believe in getting to the heart of what matters. Our approach combines decades of clinical experience with genuine human connection.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto mb-20 animate-fade-up delay-300">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center p-6 bg-card rounded-2xl border border-border/50 shadow-soft"
            >
              <p className="font-display text-4xl md:text-5xl font-bold text-primary mb-2">
                {stat.value}
              </p>
              <p className="text-muted-foreground text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="animate-fade-up delay-400">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6">
              Our Philosophy
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              We specialize in psychoanalytic psychotherapy, offering deep, meaningful work that goes beyond surface-level solutions. Whether you're dealing with anxiety, trauma, grief, or seeking personal growth, we're here to walk alongside you.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Our therapeutic approach is grounded in the belief that understanding the root causes of emotional difficulties leads to lasting change. We create a confidential, judgment-free space where you can explore your thoughts and feelings safely.
            </p>

            {/* Values Grid */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {values.map((value, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border/50 hover:border-primary/30 hover:shadow-soft transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <value.icon className="text-primary" size={20} />
                  </div>
                  <span className="text-foreground text-sm font-medium mt-2">{value.text}</span>
                </div>
              ))}
            </div>

            <Button size="lg" asChild>
              <Link to="/therapists">
                Meet Our Therapists
              </Link>
            </Button>
          </div>

          {/* Right Visual */}
          <div className="relative animate-fade-up delay-500">
            <div className="relative">
              {/* Background decorative elements */}
              <div className="absolute -top-8 -right-8 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-secondary/50 rounded-full blur-2xl" />
              
              {/* Main card */}
              <div className="relative bg-card rounded-3xl p-8 border border-border/50 shadow-elevated">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Award className="text-primary" size={40} />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    Professional Accreditations
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Registered with leading professional bodies
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl">
                    <CheckCircle className="text-primary flex-shrink-0" size={20} />
                    <div>
                      <p className="font-medium text-foreground text-sm">PACFA Registered</p>
                      <p className="text-muted-foreground text-xs">Psychotherapy & Counselling Federation of Australia</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl">
                    <CheckCircle className="text-primary flex-shrink-0" size={20} />
                    <div>
                      <p className="font-medium text-foreground text-sm">ANZAP Members</p>
                      <p className="text-muted-foreground text-xs">Australian & New Zealand Association of Psychotherapists</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
