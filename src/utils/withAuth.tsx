import { useEffect } from "react";
import { Bounce, toast } from "react-toastify";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export function withAuth<P extends object>(
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
        return;
      }

      if (router.pathname === "/vote" && session?.user?.email) {
        if (!session.user.email.endsWith('@mahasiswa.itb.ac.id')) {
          toast.error("Unauthorized email domain", {
            position: "top-center",
            autoClose: 3000,
            toastId: "domain-error",
            pauseOnHover: false,
            closeOnClick: true,
            transition: Bounce,
            theme: "colored",
          });
          void router.push("/");
          return;
        }
      }
    }, [status, session, router]);

    if (status === "loading") {
      return <div>Loading...</div>;
    }

    // Wrap API calls with security headers
    const secureApiCall = async (url: string, options: RequestInit = {}) => {

      const csrfResponse = await fetch('/api/auth/csrf');
      const { csrfToken } = await csrfResponse.json();
      
      const headers = {
        ...options.headers,
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken,
      };

      return fetch(url, {
        ...options,
        headers,
        credentials: 'include',
      });
    };

    // Pass the secure API call function to the wrapped component
    const enhancedProps = {
      ...props,
      session,
      secureApiCall,
    };

    return <WrappedComponent {...enhancedProps} />;
  };
}