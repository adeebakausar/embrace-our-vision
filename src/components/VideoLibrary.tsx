import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Play, Lock, CheckCircle, Clock, Video, ArrowRight } from "lucide-react";

const VideoLibrary = () => {
  const freeVideos = [
    "Introduction to Mindfulness",
    "Understanding Anxiety",
    "Breathing Techniques 101",
  ];

  const premiumFeatures = [
    "20+ in-depth video sessions",
    "Guided meditation exercises",
    "Exclusive therapeutic techniques",
  ];

  return (
    <section id="video-library" className="section-padding bg-background">
      <div className="container-wide mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-up">
            <Video size={16} />
            Video Resources
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6 animate-fade-up delay-100">
            Video Library
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl animate-fade-up delay-200">
            Access expert-led video content designed to support your mental health journey.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Videos Card */}
          <div className="group bg-card rounded-3xl border border-border/50 overflow-hidden hover:shadow-elevated transition-all duration-500 animate-fade-up delay-300">
            <div className="p-8 lg:p-10">
              <div className="flex items-start justify-between mb-8">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-8 h-8 text-primary" />
                </div>
                <span className="px-4 py-1.5 bg-secondary text-foreground text-xs font-semibold rounded-full">
                  Free Access
                </span>
              </div>
              
              <h3 className="font-display text-2xl font-semibold text-foreground mb-4">
                Free Intro Videos
              </h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Get started with our introductory content—no signup required. Perfect for exploring our therapeutic approach.
              </p>
              
              <div className="space-y-3 mb-8">
                {freeVideos.map((video, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{video}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8 pb-8 border-b border-border/50">
                <Clock size={16} />
                <span>~30 minutes of content</span>
              </div>
              
              <Button variant="outline" size="lg" className="w-full">
                Watch Free Videos
                <Play size={18} />
              </Button>
            </div>
          </div>

          {/* Premium Card */}
          <div className="group bg-primary rounded-3xl overflow-hidden shadow-elevated hover:shadow-2xl transition-all duration-500 animate-fade-up delay-400">
            <div className="p-8 lg:p-10">
              <div className="flex items-start justify-between mb-8">
                <div className="w-16 h-16 rounded-2xl bg-primary-foreground/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Lock className="w-8 h-8 text-primary-foreground" />
                </div>
                <span className="px-4 py-1.5 bg-primary-foreground/20 text-primary-foreground text-xs font-semibold rounded-full">
                  Premium
                </span>
              </div>
              
              <h3 className="font-display text-2xl font-semibold text-primary-foreground mb-4">
                Full Library Access
              </h3>
              <p className="text-primary-foreground/80 mb-8 leading-relaxed">
                Unlock our complete collection of therapeutic videos, guided exercises, and expert insights.
              </p>
              
              <div className="space-y-3 mb-8">
                {premiumFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary-foreground/80 flex-shrink-0" />
                    <span className="text-primary-foreground/90">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 text-sm text-primary-foreground/70 mb-8 pb-8 border-b border-primary-foreground/20">
                <Clock size={16} />
                <span>5+ hours of premium content</span>
              </div>
              
              <Button 
                size="lg" 
                className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              >
                Get Full Access
                <ArrowRight size={18} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoLibrary;
