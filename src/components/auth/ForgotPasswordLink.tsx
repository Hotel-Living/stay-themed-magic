
import { Link } from "react-router-dom";

export function ForgotPasswordLink() {
  return (
    <Link 
      to="/forgot-password" 
      className="text-xs text-fuchsia-400 hover:text-fuchsia-300 transition"
    >
      Forgot password?
    </Link>
  );
}
