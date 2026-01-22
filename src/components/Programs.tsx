import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Flame, 
  Brain, 
  Activity, 
  Sparkles, 
  CloudRain, 
  Shield, 
  BookOpen,
  LifeBuoy,
  ArrowRight,
  Compass
} from "lucide-react";

const Programs = () => {
  const programs = [
    {
      icon: Flame,
      title: "Anger Management",
      description: "Structured therapeutic interventions designed to help individuals understand and manage anger responses effectively.",
      color: "from-amber-500/20 to-orange-500/10",
      iconBg: "bg-amber-500/20",
      iconColor: "text-amber-600",
    },
    {
      icon: Brain,
      title: "Anxiety & Panic",
      description: "Learn to recognize the signs of anxiety and develop proven strategies to regain calm and control.",
      color: "from-sky-500/20 to-blue-500/10",
      iconBg: "bg-sky-500/20",
      iconColor: "text-sky-600",
    },
    {
      icon: Activity,
      title: "Bipolar Support",
      description: "Understanding that bipolar disorder is serious but treatable, with clear guidance for stability.",
      color: "from-emerald-500/20 to-teal-500/10",
      iconBg: "bg-emerald-500/20",
      iconColor: "text-emerald-600",
    },
    {
      icon: Sparkles,
      title: "Self-Esteem Building",
      description: "Build self-worth, value your strengths, and develop confidence through evidence-based methods.",
      color: "from-violet-500/20 to-purple-500/10",
      iconBg: "bg-violet-500/20",
      iconColor: "text-violet-600",
    },
    {
      icon: CloudRain,
      title: "Grief & Loss",
      description: "Navigate the natural human response to loss with professional support and practical tools.",
      color: "from-rose-500/20 to-pink-500/10",
      iconBg: "bg-rose-500/20",
      iconColor: "text-rose-600",
    },
    {
      icon: Shield,
      title: "Trauma & PTSD",
      description: "Specialized trauma-informed care to help process difficult experiences and move toward healing.",
      color: "from-indigo-500/20 to-blue-500/10",
      iconBg: "bg-indigo-500/20",
      iconColor: "text-indigo-600",
    },
    {
      icon: BookOpen,
      title: "Journaling Practice",
      description: "A powerful practice that helps untangle chaos and find clarity through guided reflection.",
      color: "from-teal-500/20 to-cyan-500/10",
      iconBg: "bg-teal-500/20",
      iconColor: "text-teal-600",
    },
    {
      icon: LifeBuoy,
      title: "Suicide Prevention",
      description: "Help is available. Resources and support for those in crisis and their loved ones.",
      color: "from-orange-500/20 to-red-500/10",
      iconBg: "bg-orange-500/20",
      iconColor: "text-orange-600",
    },
  ];

  return (
    <section id="programs" className="section-padding bg-gradient-to-b from-background to-muted/30">
      <div className="container-wide mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-up">
            <Compass size={16} />
            Therapeutic Programs
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6 animate-fade-up delay-100">
            Structured Pathways to{" "}
            <span className="text-primary italic">Healing</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl animate-fade-up delay-200">
            Explore our comprehensive range of step-by-step therapeutic programs designed to address specific challenges and support your mental health journey.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {programs.map((program, index) => (
            <div
              key={index}
              className={`group relative rounded-2xl p-6 bg-gradient-to-br ${program.color} border border-border/30 backdrop-blur-sm transition-all duration-300 hover:shadow-card hover:-translate-y-1 cursor-pointer animate-fade-up`}
              style={{ animationDelay: `${(index + 3) * 50}ms` }}
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl ${program.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <program.icon className={program.iconColor} size={28} />
              </div>
              
              <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                {program.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground mb-4">
                {program.description}
              </p>

              {/* Learn More Link */}
              <div className="flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                Learn More <ArrowRight size={14} />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center animate-fade-up" style={{ animationDelay: "600ms" }}>
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 p-8 bg-card rounded-3xl border border-border/50 shadow-soft">
            <div className="text-left">
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                Not sure which program is right for you?
              </h3>
              <p className="text-muted-foreground">
                Book a consultation to discuss your needs with one of our therapists.
              </p>
            </div>
            <Button size="lg" asChild>
              <Link to="/services/counselling">
                Book Consultation
                <ArrowRight size={18} />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Programs;
