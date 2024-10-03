import { signOut } from "next-auth/react";
import { useEffect } from "react";

const Logout = () => {
  useEffect(() => {
    void signOut({ callbackUrl: "/api/auth/signout" });
  }, []);

  return (
    <div className="flex items-center justify-center text-xl text-navy flex-1 bg-cream">
      Logging Out...
    </div>
  );
};

export default Logout;