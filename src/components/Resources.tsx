import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, BookOpen, Mail, Download, ArrowRight, Sparkles } from "lucide-react";

const Resources = () => {
  const resources = [
    {
      icon: FileText,
      title: "PTSD/Trauma Checklist",
      description: "A comprehensive self-assessment tool to help identify and understand trauma symptoms.",
      type: "Free Download",
      badge: "Popular",
    },
    {
      icon: BookOpen,
      title: "Journaling Tools",
      description: "Guided journaling prompts and templates designed for meaningful self-reflection.",
      type: "Digital Resource",
      badge: null,
    },
    {
      icon: FileText,
      title: "Safety Plan Template",
      description: "Create your personalized safety plan with step-by-step guidance for crisis situations.",
      type: "Free Download",
      badge: "Essential",
    },
    {
      icon: Mail,
      title: "Monthly Newsletter",
      description: "Curated insights, practical tips, and resources delivered directly to your inbox.",
      type: "Email Subscription",
      badge: null,
    },
  ];

  return (
    <section id="resources" className="section-padding bg-muted/30">
      <div className="container-wide mx-auto">
        {/* Header - Centered */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-up">
            <Sparkles size={16} />
            Free Resources
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6 animate-fade-up delay-100">
            Tools to Support Your{" "}
            <span className="text-primary italic">Healing Journey</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl animate-fade-up delay-200">
            We believe in empowering you with resources beyond our sessions. Access our curated collection of free tools and guides.
          </p>
        </div>

        {/* Resources Grid - Centered */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {resources.map((resource, index) => (
            <div
              key={index}
              className="group relative bg-card rounded-2xl p-6 border border-border/50 hover:border-primary/30 hover:shadow-card transition-all duration-300 cursor-pointer animate-fade-up flex flex-col"
              style={{ animationDelay: `${(index + 3) * 100}ms` }}
            >
              {/* Badge */}
              {resource.badge && (
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                    {resource.badge}
                  </span>
                </div>
              )}

              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                <resource.icon className="text-primary" size={26} />
              </div>

              {/* Type Label */}
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                {resource.type}
              </span>

              {/* Title */}
              <h3 className="font-display text-lg font-semibold text-foreground mt-2 mb-3 group-hover:text-primary transition-colors">
                {resource.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed flex-grow mb-5">
                {resource.description}
              </p>

              {/* Action Link */}
              <div className="flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all mt-auto">
                {resource.type === "Email Subscription" ? (
                  <>Subscribe <Mail size={16} /></>
                ) : (
                  <>Download <Download size={16} /></>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center animate-fade-up" style={{ animationDelay: "700ms" }}>
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 p-8 bg-card rounded-3xl border border-border/50 shadow-soft">
            <div className="text-center sm:text-left">
              <p className="font-display text-xl font-semibold text-foreground mb-1">
                Need personalized support?
              </p>
              <p className="text-muted-foreground">
                Book a session with our experienced therapists.
              </p>
            </div>
            <Button size="lg" asChild>
              <Link to="/services/counselling">
                Book a Session
                <ArrowRight size={18} />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resources;
