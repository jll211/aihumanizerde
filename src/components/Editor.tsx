import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useToast } from "./ui/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { TextTypeSelector, TextType } from "./editor/TextTypeSelector";
import { InputSection } from "./editor/InputSection";
import { OutputSection } from "./editor/OutputSection";
import { ActionButton } from "./editor/ActionButton";
import { SignupDialog } from "./editor/SignupDialog";

const Editor = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedType, setSelectedType] = useState<TextType>("standard");
  const [showSignupDialog, setShowSignupDialog] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const [session, setSession] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(!!session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSignup = () => {
    navigate("/register");
  };

const checkFreeTransformation = async () => {
  try {
    const { data: ipData, error: ipError } = await supabase.functions.invoke(
      "get-client-ip"
    );

    if (ipError) throw ipError;

    const clientIP = ipData.ip;
    console.log("Client IP:", clientIP);

    const { data: existingTransformation, error: queryError } = await supabase
      .from("free_transformations")
      .select("id")
      .eq("ip_address", clientIP)
      .maybeSingle();

    if (queryError) {
      console.error("Error querying free transformations:", queryError);
      throw queryError;
    }

    if (existingTransformation) {
      console.log("IP has already used free transformation");
      return false;
    }

    const { error: insertError } = await supabase
      .from("free_transformations")
      .insert({ ip_address: clientIP } as any);

    if (insertError) throw insertError;

    console.log("New IP recorded for free transformation");
    return true;
  } catch (error) {
    console.error("Error checking free transformation:", error);
    return false;
  }
};

  const handleHumanize = async () => {
    if (!input.trim()) {
      toast({
        title: "Fehler",
        description: "Bitte gib einen Text ein.",
        variant: "destructive",
      });
      return;
    }

    if (!session) {
      const canUseFreeTrial = await checkFreeTransformation();
      if (!canUseFreeTrial) {
        setShowSignupDialog(true);
        return;
      }
    }

    setIsLoading(true);
    try {
      console.log("Sending request to humanize function...");
      const { data, error } = await supabase.functions.invoke("humanize", {
        body: {
          text: input,
          type: selectedType,
        },
      });

      if (error) {
        console.error("Supabase function error:", error);
        throw error;
      }

      console.log("Received response:", data);

      if (data && typeof data.humanizedText === "string") {
        setOutput(data.humanizedText);

        toast({
          title: "Erfolg!",
          description: "Dein Text wurde erfolgreich humanisiert.",
        });
      } else {
        console.error("Invalid response format:", data);
        throw new Error("Invalid response format from server");
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Fehler",
        description:
          "Konnte den Text nicht humanisieren. Bitte versuche es später erneut.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto p-6"
      >
        <TextTypeSelector
          selectedType={selectedType}
          onTypeSelect={setSelectedType}
        />

        <div className="grid md:grid-cols-2 gap-8">
          <InputSection value={input} onChange={handleInputChange} />
          <OutputSection output={output} />
        </div>

        <ActionButton onClick={handleHumanize} isLoading={isLoading} />
      </motion.div>

      <SignupDialog
        open={showSignupDialog}
        onOpenChange={setShowSignupDialog}
        onSignup={handleSignup}
      />
    </>
  );
};

export default Editor;
