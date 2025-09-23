import { User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../component/ui/button";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove token
    navigate("/login"); // redirect to login
  };

  return (
    <div className="flex justify-end items-center gap-3 py-5">
      <Link to="/login" className="font-semibold flex items-center gap-2">
        <User className="w-4 h-4" />
        Sign In
      </Link>
      <Button onClick={handleLogout} className="font-semibold cursor-pointer">
        Logout
      </Button>
    </div>
  );
};

export default Header;
