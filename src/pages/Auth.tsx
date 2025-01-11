import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AuthError, AuthApiError } from "@supabase/supabase-js";
import { Loader2 } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          console.log("User already logged in, redirecting to homepage");
          navigate("/");
        }
      } catch (error) {
        console.error("Error checking session:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event, session);
        if (event === "SIGNED_IN") {
          console.log("User signed in, redirecting to homepage");
          toast({
            title: "Erfolgreich eingeloggt",
            description: "Willkommen zurück!",
          });
          navigate("/");
        } else if (event === "SIGNED_OUT") {
          setErrorMessage("");
        } else if (event === "USER_UPDATED") {
          const { error } = await supabase.auth.getSession();
          if (error) {
            setErrorMessage(getErrorMessage(error));
          }
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  const getErrorMessage = (error: AuthError) => {
    if (error instanceof AuthApiError) {
      switch (error.status) {
        case 400:
          return "Ungültige E-Mail oder Passwort. Bitte überprüfen Sie Ihre Eingaben.";
        case 422:
          return "Bitte bestätigen Sie Ihre E-Mail-Adresse.";
        case 401:
          return "Ungültige Anmeldedaten.";
        default:
          return error.message;
      }
    }
    return "Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted to-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 bg-background/80 backdrop-blur-sm p-8 rounded-xl border border-gray-800">
        <div className="text-center text-foreground">
          <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400">
            Willkommen zurück
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Melde dich an, um deine Texte zu humanisieren
          </p>
        </div>

        {errorMessage && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}
        
        <SupabaseAuth 
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#6366f1',
                  brandAccent: '#4f46e5',
                  inputText: 'white',
                }
              }
            },
            className: {
              container: 'space-y-4 text-foreground',
              button: 'w-full px-4 py-2 rounded-md',
              divider: 'my-4',
              input: 'text-white bg-background',
              label: 'text-foreground',
            }
          }}
          providers={["google"]}
          redirectTo={window.location.origin}
          view="sign_in"
        />
      </div>
    </div>
  );
};

export default Auth;