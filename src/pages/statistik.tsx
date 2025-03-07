import React, { useState, useEffect } from "react";
import { fakultas, programStudi } from "../lib/constant/jurusan";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const Statistik: React.FC = () => {
  const [selectedJurusan, setSelectedJurusan] = useState<string>("");
  const [selectedFakultas, setSelectedFakultas] = useState<string>("");
  const [selectedHimpunan, setSelectedHimpunan] = useState<string>("");
  const [selectedAngkatan, setSelectedAngkatan] = useState<string>("");
  const [voterCount, setVoterCount] = useState<number>(0);

  const jurusanOptions = Array.from(
    new Set(programStudi.map((ps) => ps.nama).concat(["Pascasarjana"])),
  );
  const fakultasOptions = Array.from(new Set(fakultas.map((f) => f.kode)));
  const himpunanOptions = Array.from(
    new Set(programStudi.map((ps) => ps.himpunan).filter((h) => h !== "")),
  );

  const angkatanOptions = ["20", "21", "22", "23", "24", "Other"];


  useEffect(() => {
    const fetchVoters = async () => {
      const params = new URLSearchParams();
      if (selectedJurusan) params.append("jurusan", selectedJurusan);
      if (selectedFakultas) params.append("fakultas", selectedFakultas);
      if (selectedHimpunan) params.append("himpunan", selectedHimpunan);
      if (selectedAngkatan) params.append("angkatan", selectedAngkatan);


      const queryString = params.toString();
      const url = queryString ? `/api/getVotersByJurusan?${queryString}` : `/api/getAllVoters`;

      try {
        const res = await fetch(url);
        const data = await res.json();
        if (Array.isArray(data)) {
          setVoterCount(data.length);
        } else if (data.count !== undefined) {
          setVoterCount(data.count as number);
        } else {
          setVoterCount(0);
        }
      } catch (error) {
        console.error("Error fetching voters:", error);
        setVoterCount(0);
      }
    };

    void fetchVoters();
  }, [selectedJurusan, selectedFakultas, selectedHimpunan, selectedAngkatan]);

  const data = {
    labels: ["Voters"],
    datasets: [
      {
        label: "Jumlah pemberi suara",
        data: [voterCount],
        backgroundColor: ["#FA3A91"],
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
          stepSize: 1,
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
    <div className="my-24 mb-[200px] flex w-[80vw] flex-col text-white">
      <h1 className=" text-4xl font-bold">Statistik</h1>
      <div className="flex flex-col gap-12">
        <div className="mt-4 flex flex-col gap-4">
          <div>
            <label className="flex flex-row gap-2">
              Filter by Jurusan:
              <select
                className="text-black select-short"
                value={selectedJurusan}
                onChange={(e) => setSelectedJurusan(e.target.value)}
              >
                <option value="">All</option>
                {jurusanOptions.map((jurusan) => (
                  <option key={jurusan} value={jurusan}>
                    {jurusan}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <label className="flex flex-row gap-2">
              Filter by Fakultas:
              <select
                className="text-black select-short"
                value={selectedFakultas}
                onChange={(e) => setSelectedFakultas(e.target.value)}
              >
                <option value="">All</option>
                {fakultasOptions.map((fakultas) => (
                  <option key={fakultas} value={fakultas}>
                    {fakultas}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <label className="flex flex-row gap-2">
              Filter by Himpunan:
              <select
                className="text-black select-short"
                value={selectedHimpunan}
                onChange={(e) => setSelectedHimpunan(e.target.value)}
              >
                <option value="">All</option>
                {himpunanOptions.map((himpunan) => (
                  <option key={himpunan} value={himpunan}>
                    {himpunan}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <label className="flex flex-row gap-2">
              Filter by Angkatan:
              <select
                className="text-black select-short"
                value={selectedAngkatan}
                onChange={(e) => setSelectedAngkatan(e.target.value)}
              >
                <option value="">All</option>
                {angkatanOptions.map((angkatan) => (
                  <option key={angkatan} value={angkatan}>
                    {angkatan === "Other" ? angkatan : `20${angkatan}`}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-bold"><a className="font-medium">Jumlah pemberi suara: </a>{voterCount}</h2>
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Statistik;