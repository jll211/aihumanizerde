import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { getErrorMessage } from "@/utils/auth/errorHandling";

interface AuthStateHandlerProps {
  setErrorMessage: (message: string) => void;
}

export const AuthStateHandler = ({ setErrorMessage }: AuthStateHandlerProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event, session);
        
        if (event === "SIGNED_IN") {
          try {
            if (!session?.user?.id) {
              console.error("No user ID in session");
              throw new Error("No user ID found in session");
            }

            console.log("Checking if profile exists for user:", session.user.id);
            const { data: profile, error: profileError } = await supabase
              .from('profiles')
              .select()
              .eq('id', session.user.id)
              .single();

            if (profileError) {
              console.error("Profile check error:", profileError);
              throw profileError;
            }

            if (!profile) {
              console.log("Creating new profile for user:", session.user.id);
              const { error: insertError } = await supabase
                .from('profiles')
                .insert({
                  id: session.user.id,
                  username: session.user.email,
                  updated_at: new Date().toISOString()
                });

              if (insertError) {
                console.error("Profile creation error:", insertError);
                throw insertError;
              }
            }

            console.log("Sign in process completed successfully");
            toast({
              title: "Erfolgreich registriert",
              description: "Willkommen bei unserem Service!",
            });
            navigate("/");
          } catch (error) {
            console.error("Error during sign in process:", error);
            const errorMsg = error instanceof Error ? error.message : "Ein unerwarteter Fehler ist aufgetreten";
            setErrorMessage(`Fehler bei der Registrierung: ${errorMsg}`);
            await supabase.auth.signOut();
          }
        } else if (event === "SIGNED_OUT") {
          console.log("User signed out");
          setErrorMessage("");
        } else if (event === "USER_UPDATED") {
          console.log("User updated");
          const { error } = await supabase.auth.getSession();
          if (error) {
            console.error("Session error:", error);
            setErrorMessage(getErrorMessage(error));
          }
        }
      }
    );

    return () => {
      console.log("Cleaning up auth subscription");
      subscription.unsubscribe();
    };
  }, [navigate, toast, setErrorMessage]);

  return null;
};