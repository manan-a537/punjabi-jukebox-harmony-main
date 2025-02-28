
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MicOff } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/90">
      <div className="text-center max-w-md px-4">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
            <MicOff className="h-12 w-12 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <p className="text-xl mb-6">Oops! This track doesn't exist</p>
        <p className="text-muted-foreground mb-8">
          We couldn't find the page you were looking for. Perhaps the beat dropped too hard.
        </p>
        <Button asChild size="lg" className="rounded-full px-8">
          <a href="/">Return to Home</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
