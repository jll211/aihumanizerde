import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Button } from "../ui/button";

interface SignupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSignup: () => void;
}

export const SignupDialog = ({
  open,
  onOpenChange,
  onSignup,
}: SignupDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Kostenlose Transformation verbraucht</DialogTitle>
          <DialogDescription>
            Du hast deine kostenlose Transformation bereits verwendet. Registriere
            dich jetzt, um unbegrenzt Texte zu humanisieren!
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center mt-4">
          <Button
            onClick={onSignup}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Jetzt registrieren
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};