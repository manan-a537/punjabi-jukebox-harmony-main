import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();

  return (
    <div className="absolute top-4 right-4 z-50 flex items-center space-x-2">
      <Button
        variant="ghost"
        onClick={() => navigate("/login")}
        className="text-muted-foreground hover:text-foreground"
      >
        Log in
      </Button>
      <Button
        onClick={() => navigate("/signup")}
        className="bg-primary text-primary-foreground hover:bg-primary/90"
      >
        Sign up
      </Button>
    </div>
  );
} 