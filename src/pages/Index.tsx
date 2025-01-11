import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header/Header";
import MainContent from "../components/home/MainContent";
import Features from "../components/Features";
import StyleAnalyzer from "../components/StyleAnalyzer";
import CTAButton from "../components/CTAButton";
import Discover from "../components/Discover";
import { useAuth } from "../providers/AuthProvider";

const Index = () => {
  const navigate = useNavigate();
  const { session, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !session) {
      console.log("No session found, redirecting to auth page");
      navigate("/auth");
    }
  }, [session, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background">
      <Header 
        isAuthenticated={!!session} 
        setIsAuthenticated={(value) => {
          if (!value) {
            supabase.auth.signOut();
          }
        }}
      />
      
      <MainContent />

      <div className="py-20">
        <Features />
      </div>

      <div className="py-20">
        <Discover />
      </div>

      <div className="py-20">
        <StyleAnalyzer />
      </div>

      <CTAButton />
    </div>
  );
};

export default Index;