import { useState } from "react";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { SessionCheck } from "@/components/auth/SessionCheck";
import { AuthStateHandler } from "@/components/auth/AuthStateHandler";
import { ErrorDisplay } from "@/components/auth/ErrorDisplay";
import { LoadingSpinner } from "@/components/auth/LoadingSpinner";

const Register = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background flex items-center justify-center p-4">
      <SessionCheck setIsLoading={setIsLoading} setErrorMessage={setErrorMessage} />
      <AuthStateHandler setErrorMessage={setErrorMessage} />
      
      <div className="w-full max-w-md space-y-8 bg-background/80 backdrop-blur-sm p-8 rounded-xl border border-gray-800">
        <div className="text-center text-foreground">
          <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400">
            Jetzt registrieren
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Erstelle ein Konto und transformiere unbegrenzt Texte
          </p>
        </div>

        <ErrorDisplay message={errorMessage} />
        
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
                  inputBackground: 'transparent',
                  inputBorder: '#374151',
                  inputLabelText: 'white',
                  inputPlaceholder: '#9CA3AF',
                }
              }
            },
            className: {
              container: 'space-y-4 text-foreground',
              button: 'w-full px-4 py-2 rounded-md',
              divider: 'my-4',
              input: 'text-white bg-transparent border-gray-700',
              label: 'text-white',
              message: 'text-red-400',
              anchor: 'text-blue-400 hover:text-blue-300',
            }
          }}
          providers={["google"]}
          redirectTo={window.location.origin}
          view="sign_up"
        />
      </div>
    </div>
  );
};

export default Register;