import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        console.log("User already logged in, redirecting to homepage");
        navigate("/");
      }
    };
    
    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event, !!session);
        if (event === "SIGNED_IN") {
          console.log("User signed in, redirecting to homepage");
          navigate("/");
          toast({
            title: "Erfolgreich eingeloggt",
            description: "Willkommen zurück!",
          });
        } else if (event === "SIGNED_OUT") {
          console.log("User signed out, staying on homepage");
          navigate("/");
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 bg-background/80 backdrop-blur-sm p-8 rounded-xl border border-gray-800">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400">
            Willkommen zurück
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Melde dich an, um deine Texte zu humanisieren
          </p>
          <p className="mt-4 text-sm text-gray-400">
            Neu hier?{" "}
            <Link to="/register" className="text-blue-400 hover:text-blue-300">
              Jetzt registrieren
            </Link>
          </p>
        </div>
        
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
              container: 'space-y-4',
              button: 'w-full px-4 py-2 rounded-md',
              divider: 'my-4',
              input: 'text-white bg-background',
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