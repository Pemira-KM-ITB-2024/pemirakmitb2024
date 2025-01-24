import { signIn, signOut, useSession } from "next-auth/react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Link from "next/link";

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

  const userNumber = session?.user?.email ? extractNumberFromEmail(session.user.email) : null;

  return (
    <div className="relative">
      {session ? (
        <>
          <div className="flex items-center h-[80%] rounded-xl bg-[#FA3A91]" >
            <Link href="/vote">
              <button
                className="font-bold  text-white pl-4 pr-2 py-2 hover:text-[#d8d8d8]"
                onClick={closeMenu}
              >
                Vote
              </button>
            </Link>
            <button
              className="flex h-full font-bold text-white border-l-2 border-white pl-2 pr-4 hover:text-[#d8d8d8]"
              onClick={() => {
                setIsDropdownOpen(!isDropdownOpen);
                closeMenu();
              }}
            >
              {isDropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </button>
          </div>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
              <Link href="/profile">
                <p className="block px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-md">Profile</p>
              </Link>
              <button
                className="block w-full text-left px-4 py-2 text-gray-800 rounded-md hover:bg-gray-200"
                onClick={() => signOut()}
              >
                Sign out
              </button>
            </div>
          )}
        </>
      ) : (
        <button
          className="font-bold bg-[#FA3A91] rounded-xl text-white px-4 py-2 hover:text-[#d8d8d8]"
          onClick={() => signIn("azure-ad")}
        >
          Sign in
        </button>
      )}
    </div>
  );
}