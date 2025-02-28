
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

const SectionHeader = ({ 
  title, 
  description, 
  action,
  className
}: SectionHeaderProps) => {
  return (
    <div 
      className={cn(
        "flex flex-col md:flex-row md:items-end justify-between mb-6",
        className
      )}
    >
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        {description && (
          <p className="text-muted-foreground mt-1 text-sm">{description}</p>
        )}
      </div>
      
      {action && (
        <div className="mt-3 md:mt-0">
          {action}
        </div>
      )}
    </div>
  );
};

export default SectionHeader;
