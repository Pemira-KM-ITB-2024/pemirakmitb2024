import React from "react";
import { withAuth } from "~/utils/withAuth";
import { getSession } from "next-auth/react";
import type { GetServerSidePropsContext } from "next";

interface Session {
  user: {
    name: string;
    email: string;
  };
}

const Profil = ({ session }: { session: Session }) => {
  const { user } = session;

  const extractNumberFromEmail = (email: string) => {
    const match = email.match(/^(\d+)@mahasiswa\.itb\.ac\.id$/);
    return match ? match[1] : null;
  };

  return (
    <div className="relative min-h-screen w-full overflow-auto bg-[url('/guidevoting/background.png')] bg-cover bg-center lg:overflow-hidden lg:bg-500">
      <div className="flex flex-col items-center justify-center min-h-screen text-white">
        <h1 className="text-4xl font-bold mb-8">Profil Mahasiswa</h1>
        <p className="text-2xl mb-4">Name: {user.name}</p>
        <p className="text-2xl mb-4">Email: {user.email}</p>
        <p className="text-2xl">NIM: {extractNumberFromEmail(user.email)}</p>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
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