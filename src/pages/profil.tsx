import React, { useEffect, useState } from "react";
import { withAuth } from "~/utils/withAuth";
import { getSession } from "next-auth/react";
import type { GetServerSidePropsContext } from "next";
interface user {
  name: string;
  email: string;
  jurusan: string;
}

interface Session {
  user: {
    name: string;
    email: string;
  };
}
const Profil = ({ session }: { session: Session }) => {
  const { user } = session;

  const [userData, setUserData] = useState<user>();

  const extractNumberFromEmail = (email: string) => {
    const match = email.match(/^(\d+)@mahasiswa\.itb\.ac\.id$/);
    return match ? match[1] : null;
  };

  useEffect(() => {
    const checkUserExists = async () => {
      if (user.email) {
        try {
          const response = await fetch(`/api/getUser?email=${user.email}`);
          if (response.ok) {
            const user = await response.json();
            setUserData(user as user);
          }
        } catch (error) {
          console.error(error);
        } finally {
        }
      }
    };

    void checkUserExists();
  }, [user.email]);

  return (
    <div className="relative min-h-screen w-full overflow-auto bg-[url('/guidevoting/background.png')] bg-cover bg-center lg:overflow-hidden lg:bg-500">
      <div className="flex min-h-screen flex-col items-center justify-center text-white">
        <h1 className="mb-8 text-4xl font-bold">Profil Mahasiswa</h1>
        <p className="mb-4 text-2xl">Name: {user?.name}</p>
        <p className="mb-4 text-2xl">Email: {user?.email}</p>
        <p className="mb-4 text-2xl">
          NIM: {extractNumberFromEmail(user.email)}
        </p>
        <p className="text-2xl">Jurusan: {userData?.jurusan}</p>
      </div>
    </div>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

export default withAuth(Profil, ["/profil"]);
