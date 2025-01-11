import Logo from "../Logo";
import AuthButtons from "./AuthButtons";

interface HeaderProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

const Header = ({ isAuthenticated, setIsAuthenticated }: HeaderProps) => {
  return (
    <div className="p-6 flex justify-between items-center">
      <Logo />
      <AuthButtons 
        isAuthenticated={isAuthenticated} 
        setIsAuthenticated={setIsAuthenticated} 
      />
    </div>
  );
};

export default Header;