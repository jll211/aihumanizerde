import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface SessionCheckProps {
  setIsLoading: (loading: boolean) => void;
  setErrorMessage: (message: string) => void;
}

export const SessionCheck = ({ setIsLoading, setErrorMessage }: SessionCheckProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        console.log("Checking session...");
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("Session check error:", sessionError);
          throw sessionError;
        }
        
        if (session) {
          console.log("User already logged in, redirecting to homepage");
          navigate("/");
        }
      } catch (error) {
        console.error("Error checking session:", error);
        setErrorMessage("Ein Fehler ist beim Prüfen der Session aufgetreten.");
      } finally {
        setIsLoading(false);
      }
    };
    
    checkSession();
  }, [navigate, setErrorMessage, setIsLoading]);

  return null;
};