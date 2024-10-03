import { type SubmitHandler, useForm } from "react-hook-form";
import Bg from "~/components/background";
import { header } from "~/styles/fonts";
import { toast } from "sonner";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getCsrfToken, signIn } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import Head from "next/head";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';

type FormValues = {
  username: string;
  password: string;
};

const Login = ({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { isDirty, isValid, isSubmitting },
  } = useForm<FormValues>({
    mode: "onSubmit",
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleLoggedIn = () => {
    toast.success("Logged in", { duration: 2000 });
  };

  const onSubmit: SubmitHandler<FormValues> = async (data, e) => {
    e?.preventDefault();
    const res = await signIn("credentials", {
      username: data.username,
      password: data.password,
      crsfToken: csrfToken,
      callbackUrl: "/admin",
    });

    if (res?.error) {
      toast.error(res.error, { duration: 2000 });
      reset({ username: "", password: "" });
      return;
    }
    handleLoggedIn();
  };

  return (
    <div className="dusty-bg flex min-h-[calc(100dvh-4rem)] flex-col items-center justify-center">
      <Head>
        <title>PEMIRA - Admin Login</title>
      </Head>
      <Bg />
      <form
        onSubmit={(e) => handleSubmit(onSubmit)(e)}
        className="flex w-[75vw] max-w-96 flex-col items-center gap-4 rounded-xl bg-teal-2/70 py-8 shadow-md shadow-teal-3/75 drop-shadow-2xl md:gap-6 md:py-10"
      >
        <h1 className={`${header.className} text-custom`}>Admin - Login</h1>
        <div className="w-60 space-y-4 *:w-full">
          <input
            name="csrfToken"
            type="hidden"
            defaultValue={csrfToken ?? ""}
          />
          <input
            type="text"
            placeholder="username"
            className=" rounded-lg border-2 bg-teal-3/90 px-4 py-2 text-brown-1 outline-1 outline-brown-1 placeholder:text-brown-1 "
            {...register("username", { required: "This is required" })}
          />
          <div className="relative flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="password"
              className=" rounded-lg border-2 bg-teal-3/90 px-4 py-2 w-full text-brown-1 outline-1 outline-brown-1 placeholder:text-brown-1 "
              {...register("password", { required: "This is required" })}
            />
            {showPassword ? (
              <FaEye
                className="absolute right-3 text-brown-1 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <FaEyeSlash
                className="absolute right-3 text-brown-1 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>
        </div>
        <button
          type="submit"
          disabled={!isDirty || isSubmitting || !isValid}
          className="rounded border bg-blue-4 px-5 py-1.5 text-brown-1 hover:bg-teal-3/90 disabled:cursor-not-allowed disabled:bg-blue-4/90 disabled:text-red-3 disabled:line-through disabled:transition-colors "
        >
          {isSubmitting ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const csrfToken = await getCsrfToken(context);
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session?.user.role === "Administrator") {
    return {
      redirect: {
        destination: "/admin",
        permanent: false,
      },
    };
  }

  if (session?.user.role === "Voting") {
    return {
      redirect: {
        destination: "/voting",
        permanent: false,
      },
    };
  }

  return {
    props: { csrfToken: csrfToken ?? null },
  };
};

export default Login;
