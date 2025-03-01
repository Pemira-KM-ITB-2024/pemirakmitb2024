/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useState } from "react";
import { withAuthPlus } from "../utils/withAuthPlus";
import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
);

const prisma = new PrismaClient();

interface Session {
  user: {
    name: string;
    email: string;
  };
}

interface AdminPageProps {
  session: Session;
  voteResultsK3M: {
    optionOneVotes: number;
    optionTwoVotes: number;
  };
  voteResultsMWAWM: {
    optionOneVotes: number;
    optionTwoVotes: number;
  };
}

const AdminPage = ({
  session,
  voteResultsK3M,
  voteResultsMWAWM,
}: AdminPageProps) => {
  const { user } = session;
  const [selectedVote, setSelectedVote] = useState("K3M");

  const extractNumberFromEmail = (email: string) => {
    const match = email.match(/^(\d+)@mahasiswa\.itb\.ac\.id$/);
    return match ? match[1] : null;
  };

  const dataK3M = {
    labels: ["Calon 1", "Suara Kosong"],
    datasets: [
      {
        label: "Votes",
        data: [voteResultsK3M.optionOneVotes, voteResultsK3M.optionTwoVotes],
        backgroundColor: ["#FA3A91", "#FFE859"],
      },
    ],
  };

  const dataMWAWM = {
    labels: ["Calon 1", "Suara Kosong"],
    datasets: [
      {
        label: "Votes",
        data: [
          voteResultsMWAWM.optionOneVotes,
          voteResultsMWAWM.optionTwoVotes,
        ],
        backgroundColor: ["#00BFFF", "#BEEF62"],
      },
    ],
  };

  const options = {
    scales: {
      x: {
        ticks: {
          color: "#FFFFFF",
          font: {
            weight: "bold" as const,
            size: 16,
          },
        },
      },
      y: {
        ticks: {
          stepSize: 1000,
          beginAtZero: true,
          color: "#FFFFFF",
          font: {
            weight: "bold" as const,
            size: 16,
          },
          callback: function (tickValue: string | number) {
            if (typeof tickValue === "number") {
              return tickValue.toLocaleString();
            }
            return tickValue;
          },
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#FFFFFF",
          font: {
            weight: "bold" as const,
          },
        },
      },
      tooltip: {
        titleColor: "#FFFFFF",
        bodyColor: "#FFFFFF",
      },
    },
  };

  return (
    <div className="m-12 mb-48 min-h-screen font-medium text-white">
      <h1 className="text-[54px] font-bold">Welcome to the Admin Page</h1>
      <p>Nama: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>NIM: {extractNumberFromEmail(user.email)}</p>
      <div className="mt-8">
        <h2 className="text-4xl font-bold">Voting Results</h2>
        <div className="my-4">
          <label htmlFor="voteType" className="mr-2">
            Select Vote Type:
          </label>
          <select
            id="voteType"
            value={selectedVote}
            onChange={(e) => setSelectedVote(e.target.value)}
            className="rounded bg-gray-800 p-2 text-white"
          >
            <option value="K3M">K3M</option>
            <option value="MWAWM">MWAWM</option>
          </select>
        </div>
        {selectedVote === "K3M" ? (
          <Bar data={dataK3M} options={options} />
        ) : (
          <Bar data={dataMWAWM} options={options} />
        )}
      </div>
      <div className="mt-24 flex flex-col items-center">
        <h2 className="text-4xl font-bold">Voting Statistics</h2>
        <p className="mt-6 text-xl">Coming Soon</p>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  const votesK3M = await prisma.voteK3M.findMany();
  const optionOneVotesK3M = votesK3M.filter((vote) => vote.isOne).length;
  const optionTwoVotesK3M = votesK3M.filter((vote) => !vote.isOne).length;

  const votesMWAWM = await prisma.voteMWAWM.findMany();
  const optionOneVotesMWAWM = votesMWAWM.filter((vote) => vote.isOne).length;
  const optionTwoVotesMWAWM = votesMWAWM.filter((vote) => !vote.isOne).length;

  return {
    props: {
      session,
      voteResultsK3M: {
        optionOneVotes: optionOneVotesK3M,
        optionTwoVotes: optionTwoVotesK3M,
      },
      voteResultsMWAWM: {
        optionOneVotes: optionOneVotesMWAWM,
        optionTwoVotes: optionTwoVotesMWAWM,
      },
    },
  };
};

export default withAuthPlus(AdminPage, ["/admin"]);
