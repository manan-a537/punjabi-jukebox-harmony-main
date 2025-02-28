
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  onPlay?: () => void;
  className?: string;
}

const Hero = ({ 
  title, 
  subtitle, 
  description, 
  image,
  onPlay,
  className
}: HeroProps) => {
  return (
    <div 
      className={cn(
        "relative w-full rounded-2xl overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background/95 z-10" />
      
      {image && (
        <div className="absolute inset-0 z-0">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="relative z-20 p-8 md:p-12 flex flex-col items-start">
        {subtitle && (
          <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary mb-4 backdrop-blur-sm">
            {subtitle}
          </div>
        )}
        
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 max-w-2xl">
          {title}
        </h1>
        
        {description && (
          <p className="text-white/80 max-w-lg mb-6 text-sm md:text-base">
            {description}
          </p>
        )}
        
        {onPlay && (
          <button 
            onClick={onPlay}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium transition-transform hover:scale-105"
          >
            <Play className="h-5 w-5 ml-0.5" />
            Play Now
          </button>
        )}
      </div>
    </div>
  );
};

export default Hero;
