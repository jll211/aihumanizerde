import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const TEXT_TYPES = {
  standard: "Standard",
  blog: "Blogartikel",
  social: "Social Media Post",
  academic: "Akademischer Text",
  business: "Geschäftliche E-Mail",
} as const;

export type TextType = keyof typeof TEXT_TYPES;

interface TextTypeSelectorProps {
  selectedType: TextType;
  onTypeSelect: (type: TextType) => void;
}

export const TextTypeSelector = ({
  selectedType,
  onTypeSelect,
}: TextTypeSelectorProps) => {
  return (
    <div className="mb-6 flex justify-start">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-48 bg-background border-gray-800">
            {TEXT_TYPES[selectedType]}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48 bg-background border-gray-800">
          {Object.entries(TEXT_TYPES).map(([key, value]) => (
            <DropdownMenuItem
              key={key}
              onClick={() => onTypeSelect(key as TextType)}
              className="cursor-pointer"
            >
              {value}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};