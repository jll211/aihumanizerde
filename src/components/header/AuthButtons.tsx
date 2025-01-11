import { Button } from "@/components/ui/button";
import { LogOut, LogIn, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface AuthButtonsProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

const AuthButtons = ({ isAuthenticated, setIsAuthenticated }: AuthButtonsProps) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log("Logging out...");
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    navigate("/"); // Redirect to homepage after logout
  };

  return (
    <div className="flex gap-4">
      {isAuthenticated ? (
        <Button
          variant="ghost"
          className="text-gray-400 hover:text-white"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 mr-2" />
          Abmelden
        </Button>
      ) : (
        <>
          <Button
            variant="ghost"
            className="text-gray-400 hover:text-white"
            onClick={() => navigate("/auth")}
          >
            <LogIn className="h-5 w-5 mr-2" />
            Login
          </Button>
          <Button
            variant="ghost"
            className="text-gray-400 hover:text-white"
            onClick={() => navigate("/register")}
          >
            <UserPlus className="h-5 w-5 mr-2" />
            Registrieren
          </Button>
        </>
      )}
    </div>
  );
};

export default AuthButtons;