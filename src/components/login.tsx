import { signIn, useSession } from "next-auth/react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Link from "next/link";
import { signOut } from "next-auth/react";

interface LoginButtonProps {
  isDropdownOpen: boolean;
  setIsDropdownOpen: (isOpen: boolean) => void;
  closeMenu: () => void;
}

export default function LoginButton({
  isDropdownOpen,
  setIsDropdownOpen,
  closeMenu,
}: LoginButtonProps) {
  const { data: session } = useSession();

  const extractNumberFromEmail = (email: string) => {
    const match = email.match(/^(\d+)@mahasiswa\.itb\.ac\.id$/);
    return match ? match[1] : null;
  };
  
  const handleSignOut = async () => {
    await fetch("/api/auth/signout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    await signOut({ callbackUrl: "/" });
  };
  
  const userNumber = session?.user?.email
    ? extractNumberFromEmail(session.user.email)
    : null;

  return (
    <div className="relative">
      {session ? (
        <>
          <div className="flex h-[80%] items-center rounded-xl bg-[#FA3A91]">
            <Link href="/vote">
              <button
                className="py-2  pl-4 pr-2 font-bold text-white hover:text-[#d8d8d8]"
                onClick={closeMenu}
              >
                Vote
              </button>
            </Link>
            <button
              className="flex h-full border-l-2 border-white pl-2 pr-4 font-bold text-white hover:text-[#d8d8d8]"
              onClick={() => {
                setIsDropdownOpen(!isDropdownOpen);
                closeMenu();
              }}
            >
              {isDropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </button>
          </div>
          {isDropdownOpen && (
            <div className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white shadow-lg">
              <Link href="/profil">
                <p className="block rounded-md px-4 py-2 text-gray-800 hover:bg-gray-200">
                  Profile
                </p>
              </Link>
              <button
                className="block w-full rounded-md px-4 py-2 text-left text-gray-800 hover:bg-gray-200"
                onClick={handleSignOut}
              >
                Sign out
              </button>
            </div>
          )}
        </>
      ) : (
        <button
          className="rounded-xl bg-[#FA3A91] px-4 py-2 font-bold text-white hover:text-[#d8d8d8]"
          onClick={() => signIn("azure-ad")}
        >
          Sign in
        </button>
      )}
    </div>
  );
}
