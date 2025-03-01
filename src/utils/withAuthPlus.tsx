import { useEffect } from "react";
import { Bounce, toast } from "react-toastify";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const allowedNumbers = ["13523003", "18223080", "13523036", "13523033", "15823040", "18235021", "18223040"]; // Add your allowed numbers here

function isEmailAllowed(email: string): boolean {
  const regex = new RegExp(`(${allowedNumbers.join("|")})`);
  return regex.test(email);
}

export function withAuthPlus<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  restrictedRoutes: string[],
) {
  return function ProtectedRoute(props: P) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === "unauthenticated" && restrictedRoutes.includes(router.pathname)) {
        toast.error("Silakan login terlebih dahulu!", {
          position: "top-center",
          autoClose: 3000,
          toastId: "auth-warning",
          pauseOnHover: false,
          closeOnClick: true,
          transition: Bounce,
          theme: "colored",
        });
        void router.push("/");
      } else if (status === "authenticated" && !isEmailAllowed(session?.user?.email ?? "")) {
        toast.error("Anda tidak memiliki akses ke halaman ini!", {
          position: "top-center",
          autoClose: 3000,
          toastId: "auth-warning",
          pauseOnHover: false,
          closeOnClick: true,
          transition: Bounce,
          theme: "colored",
        });
        void router.push("/");
      }
    }, [status, session, router]);

    if (status === "loading") {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} session={session} />;
  };
}