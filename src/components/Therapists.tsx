import { Link } from "react-router-dom";
import sandraImage from "@/assets/sandra-russet-silk.webp";
import brettImage from "@/assets/brett-boyland.jpg";
import { CheckCircle, Award, Clock, ArrowRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const Therapists = () => {
  const therapists = [
    {
      name: "Sandra Russet-Silk",
      title: "Psychoanalytic Psychotherapist",
      image: sandraImage,
      bio: "Sandra brings over three decades of clinical experience, specializing in deep insight work and helping clients recognize patterns that shape their lives.",
      credentials: "Clinical Member of ANZAP and PACFA Professional Body",
      experience: "30+ years",
      specialties: ["Psychoanalytic Therapy", "Deep Insight Work", "Pattern Recognition", "Long-term Therapy"],
      bookingLink: "/services/counselling",
    },
    {
      name: "Brett Boyland",
      title: "Master of Counselling",
      image: brettImage,
      bio: "Brett combines 25+ years of counselling experience with a practical, evidence-based approach that empowers clients with actionable tools for lasting change.",
      credentials: "Clinical Member of PACFA Professional Body",
      experience: "25+ years",
      specialties: ["Evidence-Based Practice", "Practical Tools", "Solution-Focused Therapy", "Skills Development"],
      bookingLink: "/services/counselling",
    },
  ];

  return (
    <section id="therapists" className="section-padding bg-gradient-to-b from-background to-muted/30">
      <div className="container-wide mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-up">
            <Users size={16} />
            Our Team
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6 animate-fade-up delay-100">
            Meet Your{" "}
            <span className="text-primary italic">Therapists</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl animate-fade-up delay-200">
            Your sessions are supported by long-standing professionals committed to safe, ethical, and compassionate care with over 55 years of combined experience.
          </p>
        </div>

        {/* Therapist Cards */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {therapists.map((therapist, index) => (
            <div
              key={index}
              className="group bg-card rounded-3xl overflow-hidden border border-border/50 hover:shadow-elevated transition-all duration-500 animate-fade-up"
              style={{ animationDelay: `${(index + 3) * 100}ms` }}
            >
              {/* Image Section */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={therapist.image}
                  alt={therapist.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Experience Badge */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2 px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full">
                  <Clock size={16} className="text-primary" />
                  <span className="text-sm font-semibold text-foreground">{therapist.experience} Experience</span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8">
                <h3 className="font-display text-2xl font-semibold text-foreground mb-1">
                  {therapist.name}
                </h3>
                <p className="text-primary font-medium mb-4">
                  {therapist.title}
                </p>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {therapist.bio}
                </p>

                {/* Credential */}
                <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-xl mb-6">
                  <Award className="text-primary flex-shrink-0 mt-0.5" size={20} />
                  <p className="text-sm text-foreground">{therapist.credentials}</p>
                </div>

                {/* Specialties */}
                <div className="mb-6">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Specialties
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {therapist.specialties.map((specialty, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-primary/10 text-primary text-xs font-medium rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <Button className="w-full" size="lg" asChild>
                  <Link to={therapist.bookingLink}>
                    Book with {therapist.name.split(" ")[0]}
                    <ArrowRight size={18} />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-16 text-center animate-fade-up" style={{ animationDelay: "500ms" }}>
          <div className="inline-flex flex-wrap items-center justify-center gap-8 p-6 bg-card rounded-2xl border border-border/50">
            <div className="flex items-center gap-2">
              <CheckCircle className="text-primary" size={20} />
              <span className="text-foreground font-medium">PACFA Registered</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="text-primary" size={20} />
              <span className="text-foreground font-medium">ANZAP Members</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="text-primary" size={20} />
              <span className="text-foreground font-medium">Confidential & Ethical</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Therapists;
