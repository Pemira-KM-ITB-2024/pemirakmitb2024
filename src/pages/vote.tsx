import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
import { dynamicAuth } from "../utils/dynamicAuth";
import { useForm } from "react-hook-form";
import Image from "next/image";
import VoteCard from "~/components/voteCard";
import { header } from "~/styles/fonts";
import Swal from "sweetalert2";

interface FormData {
  voteK3M: "true" | "false";
  voteMWAWM: "true" | "false";
  isRead: "true" | "false";
}

const Vote = () => {
  const { data } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [hasVoted, setHasVoted] = useState(false);
  const [userJurusan, setUserJurusan] = useState<string | null>(null);
  const [nimStartsWith, setNimStartsWith] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { handleSubmit, setValue, watch } = useForm<FormData>({
    defaultValues: { voteK3M: "true", voteMWAWM: "true", isRead: "false" },
  });

  const voteK3MValue = watch("voteK3M");
  const voteMWAWMValue = watch("voteMWAWM");
  const isReadValue = watch("isRead");

  useEffect(() => {
    const checkUserExists = async () => {
      if (data?.user?.email) {
        try {
          setIsLoading(true);
          const response = await fetch(`/api/getUser?email=${data.user.email}`);
          if (response.ok) {
            const user = await response.json();
            setHasVoted(user.hasVoted as boolean);
            setUserJurusan(user.jurusan as string);
            const nim = extractNumberFromEmail(data.user.email);
            setNimStartsWith(nim ? nim.charAt(0) : null);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    void checkUserExists();
  }, [data?.user?.email, router]);

  const extractNumberFromEmail = (email: string) => {
    const match = email.match(/^(\d+)@mahasiswa\.itb\.ac\.id$/);
    return match ? match[1] : null;
  };

  const onSubmit = async (formData: FormData) => {
    if (!data?.user?.email) return;

    if (formData.isRead !== "true") {
      toast.error(
        "Tolong konfirmasi bahwa anda telah membaca pakta kejujuran terlebih dahulu",
        {
          position: "top-center",
          autoClose: 3000,
          toastId: "read-error",
          pauseOnHover: false,
          closeOnClick: true,
          transition: Bounce,
          theme: "colored",
        },
      );
      return;
    }

    const email = data.user.email;
    const voteK3MIsOne = formData.voteK3M === "true";
    const voteMWAWMIsOne = formData.voteMWAWM === "true";

    Swal.fire({
      title: "Apakah Anda yakin mengirimkan suara Anda?",
      showCancelButton: true,
      confirmButtonColor: "#FA3A91",
      cancelButtonColor: "#FFFFFF20",
      confirmButtonText: "Kirim!",
      cancelButtonText: "Batalkan",
      background: "#3957D1B2",
      color: "white",
      reverseButtons: true,
      customClass: {
        popup: "border border-[#5A8AF9]",
      },
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            setIsLoading(true);

            const response = await fetch("/api/vote", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email,
                isOneK3M: voteK3MIsOne,
                isOneMWAWM: voteMWAWMIsOne,
              }),
            });

            if (response.ok) {
              toast.success("Vote Anda telah terekam!", {
                position: "top-center",
                autoClose: 3000,
                toastId: "vote-success",
                pauseOnHover: false,
                closeOnClick: true,
                transition: Bounce,
                theme: "colored",
              });
              void router.push("/");
            } else {
              toast.error("Vote failed!", {
                position: "top-center",
                autoClose: 3000,
                toastId: "vote-error",
                pauseOnHover: false,
                closeOnClick: true,
                transition: Bounce,
                theme: "colored",
              });
            }
          } catch (error) {
            toast.error("Internal server error", {
              position: "top-center",
              autoClose: 3000,
              toastId: "vote-error",
              pauseOnHover: false,
              closeOnClick: true,
              transition: Bounce,
              theme: "colored",
            });
          } finally {
            setIsLoading(false);
          }
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleVoteClick = (
    voteType: "voteK3M" | "voteMWAWM",
    value: "true" | "false",
  ) => {
    setValue(voteType, value);
  };

  const toggleIsRead = () => {
    setValue("isRead", isReadValue === "true" ? "false" : "true");
  };

  if (isLoading) {
    return (
      <div className=" font-bold flex h-full min-h-screen flex-col items-center justify-center text-4xl text-white">
        Loading...
      </div>
    );
  }
  console.log(nimStartsWith, userJurusan);
  const canVoteK3M = nimStartsWith === "1" && userJurusan !== "Pascasarjana";

  return (
    <>
      {!hasVoted ? (
        <div className="mb-[100px] flex h-full min-h-screen flex-col items-center justify-center gap-8 p-5 pt-10 md:mb-[300px] md:gap-[100px]">
          <>
            {windowWidth > 768 ? (
              <Image
                src={"/Surat Suara-warp.svg"}
                alt="title"
                width={1000}
                height={100}
              />
            ) : (
              <Image
                src={"/Surat Suara-warp mobile.svg"}
                alt="title"
                width={200}
                height={100}
              />
            )}
          </>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex h-full flex-col items-center gap-[100px]"
          >
            {canVoteK3M && (
              <div className="flex h-full flex-col items-center justify-center gap-5 md:gap-10">
                <Image
                  src={"/K3M-warp.svg"}
                  alt="title"
                  width={windowWidth > 768 ? 600 : 400}
                  height={100}
                />
                <div className="mt-2 md:mt-12 flex flex-col gap-10 md:flex-row">
                  <VoteCard
                    bgColor="#FA3A91"
                    textColor="#FFE859"
                    imgUrl="/k3m.jpg"
                    onClick={() => handleVoteClick("voteK3M", "true")}
                    clicked={voteK3MValue === "true"}
                    name="Farell Faiz Firmansyah"
                    faculty="GD'21"
                  />
                  <VoteCard
                    imgUrl="/kotakKosong.png"
                    bgColor="#BEEF62"
                    textColor="#FFFFFF"
                    name="Kotak Kosong"
                    onClick={() => handleVoteClick("voteK3M", "false")}
                    clicked={voteK3MValue === "false"}
                  />
                </div>
              </div>
            )}
            <div className="flex h-full flex-col items-center justify-center gap-10">
              <Image
                src={"/MWA-WM-warp.svg"}
                alt="title"
                width={windowWidth > 768 ? 800 : 600}
                height={100}
              />
              <div className="mt-2 md:mt-12 flex flex-col gap-10 md:flex-row">
                <VoteCard
                  bgColor="#BEEF62"
                  textColor="#FA3A91"
                  imgUrl="/mwam.jpg"
                  onClick={() => handleVoteClick("voteMWAWM", "true")}
                  clicked={voteMWAWMValue === "true"}
                  name="Putri Dzakiyah Suharyono"
                  faculty="MK'25"
                />
                <VoteCard
                  imgUrl="/kotakKosong.png"
                  bgColor="#FFE859"
                  textColor="#FFFFFF"
                  name="Kotak Kosong"
                  onClick={() => handleVoteClick("voteMWAWM", "false")}
                  clicked={voteMWAWMValue === "false"}
                />
              </div>
            </div>

            {/* Replace button with checkbox */}
            <div className="mt-6 flex items-center gap-3">
              <input
                type="checkbox"
                id="readCheckbox"
                checked={isReadValue === "true"}
                onChange={toggleIsRead}
                className="h-5 w-5 accent-[#FA3A91]"
              />
              <label htmlFor="readCheckbox" className="w-[80vw] font-bold text-lg text-white">
                Saya yakin dengan pilihan saya dan memahami bahwa suara yang saya berikan bersifat final. Saya telah mempertimbangkan dengan saksama sebelum memberikan suara dalam Pemira KM ITB 2024/2025
              </label>
            </div>

            <button
              type="submit"
              className={`${
                header.variable
              } mt-6 rounded-full bg-[#FFE859] px-6 py-2 text-[30px] font-bold text-[#FA3A91] ${
                isReadValue !== "true" ? "cursor-not-allowed opacity-50" : ""
              }`}
              disabled={isReadValue !== "true"}
            >
              KIRIM!
            </button>
          </form>
        </div>
      ) : (
        <div className="flex min-h-screen flex-col items-center justify-start gap-6 p-5 pt-10 md:pb-[150px]">
          <>
            {windowWidth > 768 ? (
              <Image
                src={"/Surat Suara-warp.svg"}
                alt="title"
                width={1000}
                height={100}
              />
            ) : (
              <Image
                src={"/Surat Suara-warp mobile.svg"}
                alt="title"
                width={200}
                height={100}
              />
            )}
          </>
          <Image
            src={"/paku.svg"}
            alt="paku"
            width={300}
            height={100}
            className="scale-[150%]"
          />
          <p
            className={`${header.variable} mb-12 text-center text-[30px] font-bold text-white md:text-[50px]`}
          >
            Terima kasih sudah memberikan suara Anda!
          </p>
          <p
            className={`${header.variable} mb-12 text-center text-2xl font-light text-white`}
          >
            Hasil perhitungan suara akan diumumkan: 11 Maret 2025
          </p>
        </div>
      )}
    </>
  );
};

export default dynamicAuth(Vote);