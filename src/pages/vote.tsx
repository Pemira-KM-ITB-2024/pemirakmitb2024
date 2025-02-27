import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
import { withAuth } from "~/utils/withAuth";
import { useForm } from "react-hook-form";

interface FormData {
  voteK3M: "true" | "false";
  voteMWAWM: "true" | "false";
}

const Vote = () => {
  const { data } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: { voteK3M: "true", voteMWAWM: "true" },
  });

  useEffect(() => {
    const checkUserExists = async () => {
      if (data?.user?.email) {
        try {
          setIsLoading(true);
          const response = await fetch(`/api/getUser?email=${data.user.email}`);
          if (response.ok) {
            const user = await response.json();
            if (user.hasVoted) {
              toast.error("Kamu sudah pernah vote!", {
                position: "top-center",
                autoClose: 3000,
                toastId: "vote-warning",
                pauseOnHover: false,
                closeOnClick: true,
                transition: Bounce,
                theme: "colored",
              });
              void router.push("/");
            }
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

  const onSubmit = async (formData: FormData) => {
    if (!data?.user?.email) return;
    const email = data.user.email;
    const voteK3MIsOne = formData.voteK3M === "true";
    const voteMWAWMIsOne = formData.voteMWAWM === "true";

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

      if (response) {
        toast.success("Votes recorded successfully!", {
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
  };

  if (isLoading) {
    return (
      <div className="flex h-full min-h-screen flex-col items-center justify-center text-6xl text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="mb-6 text-4xl font-bold text-white">Vote</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-8"
      >
        {/* VoteK3M Group*/}
        <fieldset className="flex flex-col items-start gap-2">
          <legend className="text-xl text-white">VoteK3M</legend>
          <label className="flex items-center gap-2 text-white">
            <input type="radio" value="true" {...register("voteK3M")} />
            Yes (isOne)
          </label>
          <label className="flex items-center gap-2 text-white">
            <input type="radio" value="false" {...register("voteK3M")} />
            No (isNotOne)
          </label>
        </fieldset>
        {/* VoteMWAWM Group */}
        <fieldset className="flex flex-col items-start gap-2">
          <legend className="text-xl text-white">VoteMWAWM</legend>
          <label className="flex items-center gap-2 text-white">
            <input type="radio" value="true" {...register("voteMWAWM")} />
            Yes (isOne)
          </label>
          <label className="flex items-center gap-2 text-white">
            <input type="radio" value="false" {...register("voteMWAWM")} />
            No (isNotOne)
          </label>
        </fieldset>
        <button
          type="submit"
          className="mt-6 rounded-lg bg-green-500 px-4 py-2 text-white"
        >
          Submit Votes
        </button>
      </form>
    </div>
  );
};

export default withAuth(Vote, ["/vote"]);
