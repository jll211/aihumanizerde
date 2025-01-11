import { Loader2 } from "lucide-react";

export const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted to-background">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
);