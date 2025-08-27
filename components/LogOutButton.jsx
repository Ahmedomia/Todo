import { useUserStore } from "../store/userStore";
import { useNavigate } from "react-router-dom";

export default function LogOutButton({ children, className, onClick }) {
  const { setUser } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data from store
    setUser(null);
    
    // Clear token from localStorage
    localStorage.removeItem("token");
    
    // Call any additional onClick handler if provided
    if (onClick) {
      onClick();
    }
    
    // Navigate to login or home page
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className={className}
      type="button"
    >
      {children}
    </button>
  );
}