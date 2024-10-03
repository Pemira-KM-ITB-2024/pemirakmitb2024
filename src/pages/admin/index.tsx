import FadeIn from "~/components/fade-in";
import TealStuff from "../../../public/ribbon/3.png";
import Head from "next/head";
import Image from "next/image";
import { body, header } from "@fonts";
import { type SubmitHandler, useForm } from "react-hook-form";
import { Separator } from "~/components/ui/separator";
import { type ReactNode, useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
} from "~/components/ui/dialog";
import { type GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "~/server/auth";
import { api } from "~/utils/api";
import { toast } from "sonner";
import { Toaster } from "~/components/ui/sonner";
import { prisma } from "~/server/db";

const Admin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState("");
  const [nim, setNim] = useState("");
  const [time, setTime] = useState(0);
  const changeState = api.inputNim.changeState.useMutation();
  const activateNIM = api.inputNim.changeToken.useMutation({
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(`Berhasil mendaftarkan NIM: ${data.nim}`);
      setTime(120);
      setNim(data.nim);
      setToken(data.token ?? "");
      setIsOpen(true);

      const interval = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);

      setTimeout(() => {
        clearInterval(interval);
        setIsOpen(false);
        changeState.mutate({ nim: data.nim, state: false });
      }, 120000);
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<{ nim: string }>();
  const onSubmit: SubmitHandler<{ nim: string }> = (data, e) => {
    e?.preventDefault();

    activateNIM.mutate({
      nim: data.nim,
    });

    reset();
  };

  return (
    <FadeIn>
      <Head>
        <title>ADMIN - PEMIRA ITB</title>
      </Head>
      <Toaster />
      <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-cream py-8">
        <div className="absolute z-0 h-screen w-full bg-[url('../../public/logo.png')] bg-contain bg-center bg-no-repeat opacity-10"></div>
        <div className="relative">
          <Image src={TealStuff} alt="Admin" height={80} />
          <h1
            className={`${header.className} absolute left-[50%] top-[35px] translate-x-[-50%] text-4xl text-brown-3 text-stroke-width-1 text-stroke-color-red-5`}
          >
            Admin
          </h1>
        </div>
        <div
          className={`${header.className} relative flex flex-1 flex-col items-center justify-center`}
        >
          <form
            className="relative z-[2] flex flex-col items-center gap-6 rounded-xl bg-brown-2/80 px-8 py-8 shadow-lg shadow-teal-3 drop-shadow-2xl"
            onSubmit={(e) => handleSubmit(onSubmit)(e)}
          >
            <h1 className="mb-2 text-4xl text-red-3 shadow-teal-4 drop-shadow-lg text-shadow text-stroke-width-1 text-stroke-color-brown-2">
              Aktivasi NIM
            </h1>
            <Separator className="h-[2px] bg-teal-3" />
            <div className="z-10">
              <input
                type="number"
                placeholder="NIM"
                className="justify-center rounded-xl border-2 border-teal-3/50 bg-brown-4/75 px-6 py-1 text-center text-2xl text-brown-2 placeholder-slate-300 outline-none transition-all text-stroke-width-1 text-stroke-color-navy placeholder:opacity-75 hover:bg-brown-4 focus:bg-brown-4"
                {...register("nim", {
                  required: "Masukin dulu NIM yaaa..",
                  maxLength: {
                    value: 8,
                    message: "NIMnya kepanjangan nih, coba dicek lagi",
                  },
                  minLength: {
                    value: 8,
                    message: "NIMnya kependekan nih, coba dicek lagi",
                  },
                })}
              />
              {errors.nim && (
                <p className={`${body.className} mt-1 text-sm`}>
                  {errors.nim.message}
                </p>
              )}
            </div>
            <button
              disabled={isSubmitting || !isValid || !isDirty}
              type="submit"
              className={
                isSubmitting || !isValid || !isDirty
                  ? `${body.className} z-10 w-full cursor-not-allowed rounded-full bg-teal-3 py-2 text-red-600 line-through outline outline-1 outline-navy transition-colors text-stroke-width-[.4px] text-stroke-color-navy`
                  : `${body.className} z-10 w-full rounded-full bg-teal-3/95 py-2 text-brown-2 outline outline-1 outline-navy transition-colors hover:bg-teal-3`
              }
            >
              {isSubmitting ? "SUBMITTING.." : "SUBMIT"}
            </button>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogContent
                className={`${body.className} border-[2.5px] border-brown-3/65 bg-teal-3 px-16 py-12`}
              >
                <DialogHeader className="flex flex-col items-center gap-3">
                  <DialogTitle>
                    <h1
                      className={`${header.className} w-full text-center text-3xl font-thin text-brown-3/85 text-stroke-width-1 text-stroke-color-red-5`}
                    >
                      {"Success"}
                    </h1>
                  </DialogTitle>
                  <div
                    className={`text-2xl text-red-700 text-stroke-width-[0.3px] text-stroke-color-navy`}
                  >
                    {`${Math.floor(time / 60)
                      .toString()
                      .padStart(2, "0")}:${(time % 60)
                      .toString()
                      .padStart(2, "0")}`}
                  </div>
                  <Separator className=" bg-brown-4" />
                </DialogHeader>
                <div className="grid grid-cols-10 px-4 text-2xl text-brown-3 text-stroke-width-1 text-stroke-color-teal-5">
                  <div className="col-span-3 md:col-span-2">NIM</div>
                  <div className="">:</div>
                  <div className=""></div>
                  <div className="col-span-5 md:col-span-6">{nim}</div>
                  <div className={`col-span-3 md:col-span-2`}>Token</div>
                  <div className="">:</div>
                  <div className=""></div>
                  <div className={`col-span-5 md:col-span-6`}>{token}</div>
                </div>
              </DialogContent>
            </Dialog>
          </form>
        </div>
        <div className="absolute left-20 top-28 h-40 w-10 rotate-45 bg-[url('../../public/bintang/13.png')] bg-contain bg-center bg-no-repeat md:left-48 md:w-20" />
        <div className="absolute bottom-32 left-56 h-24 w-12 rotate-[110deg] bg-[url('../../public/bintang/14.png')] bg-contain bg-center bg-no-repeat md:bottom-72 md:w-24" />
        <div className="absolute right-8 h-40 w-16 rotate-45 bg-[url('../../public/bintang/4.png')] bg-contain bg-center bg-no-repeat md:right-32 md:w-28" />
        <div className="absolute right-[34vw] top-[32vh] z-0 h-40 w-20 rotate-45 bg-[url('../../public/properti/bintang_1.png')] bg-contain bg-center bg-no-repeat md:top-[30vh] md:w-28" />
        <div className="absolute bottom-[20vh] left-[20vw] z-0 h-40 w-28 rotate-45 bg-[url('../../public/properti/bintang_2.png')] bg-contain bg-center bg-no-repeat md:left-[34vw]" />
        <div className="absolute right-24 top-24 h-40 w-16 bg-[url('../../public/bintang/15.png')] bg-contain bg-center bg-no-repeat" />
        <div className="absolute -bottom-40 -left-24 h-80 w-80 bg-[url('../../public/jengga/stack.png')] bg-contain bg-center bg-no-repeat md:bottom-[-6rem] md:left-[-4rem]" />
        <div className="absolute -bottom-10 -right-24 h-60 w-60 bg-[url('../../public/jengga/scatter.png')] bg-contain bg-center bg-no-repeat md:-bottom-6 md:-right-8" />
      </div>
    </FadeIn>
  );
};

Admin.getLayout = (page: ReactNode) => page;

export const getServerSideProps = (async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session || session?.user.role !== "Administrator") {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }
  
  const pw = await prisma.admin.findUnique({
    where: {
      username: session?.user.username,
    },
  });

  if (session.user.passwordHash !== pw?.passwordHash) {
    return {
      redirect: {
        destination: "/api/auth/signout",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session: {
        username: session.user.username ?? null,
      },
    },
  };
}) satisfies GetServerSideProps;
export default Admin;
