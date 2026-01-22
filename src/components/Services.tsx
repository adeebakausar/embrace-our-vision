import { Link } from "react-router-dom";
import { MessageCircle, Users, Brain, Shield, Heart, Sparkles, ArrowRight, Clock, Lock, FileText, Briefcase } from "lucide-react";

const Services = () => {
  const mainServices = [
    {
      icon: MessageCircle,
      title: "Counselling Sessions",
      price: "$110.00 AUD",
      duration: "50-60 mins",
      description: "One-on-one therapeutic sessions tailored to your unique needs. Book online or in-person appointments with our experienced practitioners.",
      features: ["Personalized treatment", "Online & in-person", "Both therapists available"],
      link: "/services/counselling",
      featured: true,
    },
    {
      icon: Users,
      title: "Professional Supervision",
      price: "$130.31 AUD",
      duration: "60 mins",
      description: "Clinical supervision for counsellors and therapists. Develop your practice with guidance from seasoned professionals.",
      features: ["PACFA accredited", "Case consultation", "Professional development"],
      link: "/services/supervision",
      featured: false,
    },
  ];

  const programs = [
    {
      icon: Brain,
      title: "Anxiety & Panic Management",
      description: "Learn to recognize anxiety signs and develop evidence-based coping strategies.",
      link: "/programs",
    },
    {
      icon: Shield,
      title: "Trauma & PTSD Support",
      description: "Specialized trauma-informed care to help you process difficult experiences.",
      link: "/programs",
    },
    {
      icon: Heart,
      title: "Grief & Loss Counselling",
      description: "Compassionate support through the natural human response to loss.",
      link: "/programs",
    },
    {
      icon: Sparkles,
      title: "Self-Esteem Building",
      description: "Develop self-worth and build confidence through structured programs.",
      link: "/programs",
    },
  ];

  const features = [
    { icon: Clock, title: "Flexible Scheduling", description: "Book sessions that fit your lifestyle" },
    { icon: Lock, title: "Complete Confidentiality", description: "Your privacy is our priority" },
    { icon: FileText, title: "Free Resources", description: "Access downloadable guides and tools" },
  ];

  return (
    <section id="services" className="section-padding bg-gradient-to-b from-background to-muted/30">
      <div className="container-wide mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-up">
            <Briefcase size={16} />
            Our Services
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6 animate-fade-up delay-100">
            Comprehensive Mental Health{" "}
            <span className="text-primary italic">Support</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl animate-fade-up delay-200">
            Evidence-based counselling, professional supervision, and practical step-by-step programs designed to help you achieve lasting change.
          </p>
        </div>

        {/* Main Services - Large Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {mainServices.map((service, index) => (
            <Link
              key={index}
              to={service.link}
              className={`group relative rounded-3xl p-8 transition-all duration-500 animate-fade-up ${
                service.featured
                  ? "bg-primary text-primary-foreground shadow-elevated hover:shadow-2xl"
                  : "bg-card border border-border/50 hover:shadow-elevated hover:border-primary/30"
              }`}
              style={{ animationDelay: `${(index + 2) * 100}ms` }}
            >
              {/* Badge */}
              {service.featured && (
                <span className="absolute top-6 right-6 px-4 py-1.5 bg-secondary text-foreground text-xs font-semibold rounded-full">
                  Most Popular
                </span>
              )}

              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                service.featured 
                  ? "bg-primary-foreground/20" 
                  : "bg-primary/10"
              }`}>
                <service.icon className={service.featured ? "text-primary-foreground" : "text-primary"} size={32} />
              </div>

              {/* Title & Description */}
              <h3 className={`font-display text-2xl font-semibold mb-3 ${
                service.featured ? "text-primary-foreground" : "text-foreground"
              }`}>
                {service.title}
              </h3>
              <p className={`mb-6 leading-relaxed ${
                service.featured ? "text-primary-foreground/80" : "text-muted-foreground"
              }`}>
                {service.description}
              </p>

              {/* Features List */}
              <ul className="space-y-2 mb-8">
                {service.features.map((feature, i) => (
                  <li key={i} className={`flex items-center gap-2 text-sm ${
                    service.featured ? "text-primary-foreground/80" : "text-muted-foreground"
                  }`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      service.featured ? "bg-primary-foreground" : "bg-primary"
                    }`} />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Price & Duration */}
              <div className="flex items-end justify-between pt-6 border-t border-current/10">
                <div>
                  <p className={`text-3xl font-bold ${
                    service.featured ? "text-primary-foreground" : "text-primary"
                  }`}>
                    {service.price}
                  </p>
                  <p className={`text-sm ${
                    service.featured ? "text-primary-foreground/60" : "text-muted-foreground"
                  }`}>
                    {service.duration} session
                  </p>
                </div>
                <span className={`flex items-center gap-2 font-medium group-hover:gap-3 transition-all ${
                  service.featured ? "text-primary-foreground" : "text-primary"
                }`}>
                  Learn More <ArrowRight size={18} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Programs Section */}
        <div className="mb-16">
          <h2 className="font-display text-2xl font-semibold text-foreground text-center mb-8 animate-fade-up">
            Specialized Programs
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {programs.map((program, index) => (
              <Link
                key={index}
                to={program.link}
                className="group bg-card rounded-2xl p-6 border border-border/50 hover:shadow-card hover:border-primary/30 transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${(index + 4) * 50}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <program.icon className="text-primary" size={24} />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {program.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {program.description}
                </p>
                <span className="flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                  View Program <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Features Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 py-8 px-10 bg-card rounded-3xl border border-border/50 shadow-soft animate-fade-up">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <feature.icon className="text-primary" size={22} />
              </div>
              <div>
                <p className="font-semibold text-foreground">{feature.title}</p>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
