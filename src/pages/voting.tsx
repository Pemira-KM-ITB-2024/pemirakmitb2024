import { type ReactNode, useState, useRef, useEffect } from "react";
import Image from "next/image";
import { body, header } from "@fonts";
import { Progress } from "~/components/ui/progress";
import { cn } from "~/lib/utils";
import FirstPage from "~/components/voting/firstPage";
import ThirdPage from "~/components/voting/thirdPage";
import FadeIn from "~/components/fade-in";
import Head from "next/head";
import { type GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "~/server/auth";
import { api } from "~/utils/api";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from "~/components/ui/dialog";
import { toast } from "sonner";
import { Toaster } from "~/components/ui/sonner";
import { useDebounce } from "~/hook/useDebounce";
import { useSearchParams } from "next/navigation";
import { prisma } from "~/server/db";

const Voting = () => {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [mhsw, setMhsw] = useState({ nim: "", token: "" });
  const mahasiswa = useDebounce(mhsw, 500);
  const scrollRef = useRef<HTMLDivElement>(null);
  const backref = useRef<HTMLButtonElement>(null);
  const nextref = useRef<HTMLButtonElement>(null);
  const query = api.inputNim.isValid.useQuery({
    nim: mahasiswa.nim,
    token: mahasiswa.token,
  });
  const vote = api.inputNim.vote.useMutation({
    onSuccess: (data) => {
      toast.success("Berhasil memilih!", { position: "top-right" });
      setMhsw({ nim: "", token: "" });
      setTimeout(() => {
        window.location.href = "/voting";
      }, 1000);
    },
    onError: (error) => {
      toast.error(error.message, { position: "top-right", duration: 2000 });
    },
  });
  const searchParams = useSearchParams().get("k3m")?.split("-") ?? [];
  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <FadeIn>
      <Head>
        <title>PEMIRA - VOTING</title>
      </Head>
      <Toaster richColors />
      <div
        className={`${header.className} relative z-0 flex max-h-dvh min-h-dvh flex-col bg-cream px-12 pb-6 pt-8`}
      >
        <Dialog open={open}>
          <DialogContent className="bg-cream">
            <DialogHeader>
              <DialogTitle className={`${header.className} text-red-4`}>
                Input NIM dan Token
              </DialogTitle>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (mhsw.nim === "" || mhsw.token === "") {
                  toast.error("NIM dan Token tidak boleh kosong!");
                  return;
                }

                setIsLoading(true);

                if (query.data?.activated) {
                  setOpen(false);
                  toast.success("Berhasil masuk dengan NIM: " + mhsw.nim, {
                    position: "top-right",
                    description: "Silakan pilih kandidat!",
                    duration: 4000,
                  });
                } else if (query.data?.nim) {
                  toast.error("Mahasiswa belum diaktivasi!", {
                    position: "top-right",
                    duration: 2000,
                  });
                } else {
                  toast.error("NIM atau Token salah!", {
                    position: "top-right",
                    duration: 2000,
                  });
                }
                setIsLoading(false);
              }}
              className="px-6"
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                  <input
                    type="number"
                    placeholder="NIM"
                    value={mhsw.nim}
                    onChange={(e) => {
                      setMhsw({ ...mhsw, nim: e.target.value });
                    }}
                    className="rounded-md border-2 border-brown-3 p-2"
                  />
                  <input
                    type="text"
                    placeholder="TOKEN"
                    value={mhsw.token}
                    onChange={(e) => {
                      setMhsw({ ...mhsw, token: e.target.value.toUpperCase() });
                    }}
                    className="rounded-md border-2 border-brown-3 p-2"
                  />
                </div>
                <button
                  disabled={isLoading}
                  className="rounded-full border-[5px] border-brown-3 bg-brown-1 px-8 py-2 text-brown-5 drop-shadow-md transition-all hover:scale-[98%] hover:bg-brown-2/75 hover:drop-shadow-none disabled:cursor-not-allowed disabled:hover:scale-100"
                  type="submit"
                >
                  SUBMIT
                </button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
        <Image
          src="/bintang/5.png"
          alt="bintang"
          height={75}
          width={75}
          className="absolute left-4 top-0 z-[-1] rotate-[15deg]"
        />
        <div className="flex flex-1 flex-col gap-2">
          <h1
            className={`${header.className} text-5xl text-navy drop-shadow-[4px_4px_1px_rgba(0,0,0,.2)]`}
          >
            Voting
          </h1>
          <p
            className={`${body.className} mb-1 text-sm text-teal-1 drop-shadow-md`}
          >
            Untuk memilih, silakan klik kartu sesuai urutan pilihan (1 sampai
            4). Untuk mengulang, silakan tekan tombol RESET
          </p>
          <div className="flex items-center gap-4">
            <div
              className={`${body.className} text-nowrap text-red-3 `}
            >{`Step ${page}/2`}</div>
            <Progress
              className="h-[20px] w-full border-[3px] border-brown-3 bg-brown-1"
              value={50 * page}
            />
          </div>
          <div
            className="flex w-[calc(100vw-6rem)] flex-1 overflow-hidden rounded-lg pt-2"
            ref={scrollRef}
          >
            <div className="flex w-[calc(4*(100vw-6rem))] flex-1">
              <FirstPage />
              <ThirdPage />
            </div>
          </div>
          <div className="mt-2 flex justify-between">
            <button
              ref={backref}
              className={cn(
                "rounded-full border-[5px] border-brown-3 bg-brown-1 px-8 py-2 text-brown-5 drop-shadow-md transition-all hover:scale-[98%] hover:bg-brown-2/75 hover:drop-shadow-none disabled:cursor-not-allowed",
                page === 1 ? "invisible" : "visible",
              )}
              onClick={() => {
                scrollRef.current?.scrollTo({
                  left:
                    scrollRef.current?.scrollLeft -
                    scrollRef.current.clientWidth,
                  behavior: "smooth",
                });
                setPage(page - 1);
                if (backref.current) {
                  backref.current.disabled = true;
                  setTimeout(() => {
                    backref.current?.removeAttribute("disabled");
                  }, 800);
                }
              }}
            >
              Back
            </button>
            <button
              ref={nextref}
              className={cn(
                "rounded-full border-[5px] border-brown-3 bg-brown-1 px-8 py-2 text-brown-5 drop-shadow-md transition-all hover:scale-[98%] hover:bg-brown-2/75 hover:drop-shadow-none disabled:cursor-not-allowed",
                page > 4 ? "invisible" : "visible",
              )}
              onClick={() => {
                if (page === 2) {
                  vote.mutate({
                    nim: mahasiswa.nim,
                    pil_1: searchParams[1] ?? "",
                    pil_2: searchParams[2],
                    pil_3: searchParams[3],
                    pil_4: searchParams[4],
                  });
                  return;
                }
                scrollRef.current?.scrollTo({
                  left:
                    scrollRef.current?.scrollLeft +
                    scrollRef.current.clientWidth,
                  behavior: "smooth",
                });
                setPage(page + 1);
                if (nextref.current) {
                  nextref.current.disabled = true;
                  setTimeout(() => {
                    nextref.current?.removeAttribute("disabled");
                  }, 800);
                }
              }}
            >
              {page === 2 ? "Submit" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </FadeIn>
  );
};

export const getServerSideProps = (async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session || session?.user.role !== "Voting") {
    return {
      redirect: {
        destination: "/",
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

Voting.getLayout = (page: ReactNode) => page;
export default Voting;
