import { AuthError, AuthApiError } from "@supabase/supabase-js";

export const getErrorMessage = (error: AuthError) => {
  console.error("Authentication error:", error);
  
  if (error instanceof AuthApiError) {
    switch (error.status) {
      case 400:
        if (error.message.includes("Email not confirmed")) {
          return "Bitte bestätigen Sie zuerst Ihre E-Mail-Adresse.";
        }
        if (error.message.includes("Password")) {
          return "Das Passwort muss mindestens 6 Zeichen lang sein.";
        }
        if (error.message.includes("User already registered")) {
          return "Diese E-Mail-Adresse wird bereits verwendet.";
        }
        return "Ungültige Eingaben. Bitte überprüfen Sie Ihre Daten.";
      case 422:
        return "Diese E-Mail-Adresse wird bereits verwendet.";
      case 500:
        if (error.message.includes("Database error")) {
          console.error("Database error details:", error);
          return "Ein Fehler ist bei der Profilserstellung aufgetreten. Bitte versuchen Sie es später erneut.";
        }
        return "Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.";
      default:
        if (error.message.includes("Database error")) {
          console.error("Database error details:", error);
          return "Ein Fehler ist bei der Profilserstellung aufgetreten. Bitte versuchen Sie es später erneut.";
        }
        return "Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.";
    }
  }
  return "Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.";
};