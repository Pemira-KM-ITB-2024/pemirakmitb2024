import { useState } from "react";
import PieCount from "~/components/charts/pieChart";
import QuickCount from "~/components/charts/quickcount";
import { header } from "~/styles/fonts";
import { api } from "~/utils/api";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

const DATAS = [
  {
    value: "1",
    label: "Zona GKU Barat",
  },
  {
    value: "2",
    label: "Zona GKU Timur",
  },
  {
    value: "3",
    label: "Zona Labtek X & XI",
  },
  {
    value: "4",
    label: "Zona Aula Timur",
  },
  {
    value: "5",
    label: "Zona Labtek I",
  },
  {
    value: "6",
    label: "Zona Gedung Energi",
  },
  {
    value: "7",
    label: "Zona Labtek Kembar",
  },
  {
    value: "8",
    label: "Zona Gedung SBM",
  },
  {
    value: "9",
    label: "Zona Sunken Court",
  },
  {
    value: "10",
    label: "Zona GKU 2",
  },
  {
    value: "11",
    label: "Zona Koica",
  },
  {
    value: "12",
    label: "Zona Asrama",
  },
  {
    value: "13",
    label: "Zona Gedung C",
  },
  {
    value: "14",
    label: "Zona Cirebon",
  },
];

const Count = () => {
  const [query, setQuery] = useState("all");
  const [pil, setPil] = useState("1");
  const data = api.count.getQuickCount.useQuery({
    tps: query === "" || query === "all" ? undefined : query,
  }).data;
  const dataPerCalon = [
    {
      name: "Nabiel",
      "Pilihan 1": data?.pil_1.nabiel,
      "Pilihan 2": data?.pil_2.nabiel,
      "Pilihan 3": data?.pil_3.nabiel,
      "Pilihan 4": data?.pil_4.nabiel,
    },
    {
      name: "Fidela",
      "Pilihan 1": data?.pil_1.fidela,
      "Pilihan 2": data?.pil_2.fidela,
      "Pilihan 3": data?.pil_3.fidela,
      "Pilihan 4": data?.pil_4.fidela,
    },
    {
      name: "Daniel",
      "Pilihan 1": data?.pil_1.daniel,
      "Pilihan 2": data?.pil_2.daniel,
      "Pilihan 3": data?.pil_3.daniel,
      "Pilihan 4": data?.pil_4.daniel,
    },
    {
      name: "Kotak Kosong",
      "Pilihan 1": data?.pil_1.kotakKosong,
      "Pilihan 2": data?.pil_2.kotakKosong,
      "Pilihan 3": data?.pil_3.kotakKosong,
      "Pilihan 4": data?.pil_4.kotakKosong,
    },
  ];
  const dataPerCalonPie = () => {
    let pil_ = null;

    if (pil === "1") {
      pil_ = data?.pil_1;
    } else if (pil === "2") {
      pil_ = data?.pil_2;
    } else if (pil === "3") {
      pil_ = data?.pil_3;
    } else {
      pil_ = data?.pil_4;
    }

    return [
      {
        name: "Nabiel",
        value:
          Math.round(((pil_?.nabiel ?? 0) / (pil_?.total ?? 1)) * 10000) /
            100 ?? 0,
        real: pil_?.nabiel ?? 0,
      },
      {
        name: "Fidela",
        value:
          Math.round(((pil_?.fidela ?? 0) / (pil_?.total ?? 1)) * 10000) /
            100 ?? 0,
        real: pil_?.fidela ?? 0,
      },
      {
        name: "Daniel",
        value:
          Math.round(((pil_?.daniel ?? 0) / (pil_?.total ?? 1)) * 10000) /
            100 ?? 0,
        real: pil_?.daniel ?? 0,
      },
      {
        name: "Kotak Kosong",
        value:
          Math.round(((pil_?.kotakKosong ?? 0) / (pil_?.total ?? 1)) * 10000) /
            100 ?? 0,
        real: pil_?.kotakKosong ?? 0,
      },
    ];
  };

  return (
    <div className="flex flex-1 flex-col items-center bg-cream pb-10 text-xl text-navy md:justify-center">
      <h1
        className={`text-custom mb-6 mt-10 px-8 text-3xl md:m-0 md:mb-10 md:text-4xl ${header.className}`}
      >
        Perolehan Suara Sementara
      </h1>
      <div className="flex flex-col items-center gap-6 md:gap-20 md:flex-row md:items-start">
        <div className="flex h-[45vh] w-[80vw] flex-col items-center md:h-[60vh] md:w-[25vw]">
          <Select onValueChange={setPil} defaultValue="1">
            <SelectTrigger className="w-[200px] border-2 border-red-4 bg-cream shadow">
              <SelectValue placeholder="Pilihan ke-" />
            </SelectTrigger>
            <SelectContent className="border-2 border-red-4 bg-cream">
              <SelectGroup>
                <SelectItem value="1">Pilihan 1</SelectItem>
                <SelectItem value="2">Pilihan 2</SelectItem>
                <SelectItem value="3">Pilihan 3</SelectItem>
                <SelectItem value="4">Pilihan 4</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <PieCount data={dataPerCalonPie()} />
        </div>
        <h1
          className={`text-custom px-8 mt-10 text-3xl md:hidden ${header.className}`}
        >
          Perolehan Suara Per-Zona
        </h1>
        <div className="flex w-[90vw] flex-1 flex-col items-center gap-4 md:h-[65vh] md:w-[50vw]">
          <TPS query={query} setQuery={setQuery} />
          <div className="flex w-full">
            <div className="pl-[10%] font-mono text-base">{`Suara masuk: ${
              data?.pil_1.total ?? "Memuat..."
            }`}</div>
          </div>
          <QuickCount data={dataPerCalon} />
        </div>
      </div>
    </div>
  );
};

const TPS = ({
  query,
  setQuery,
}: {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <Select onValueChange={setQuery} defaultValue={query}>
      <SelectTrigger className="w-[200px] border-2 border-red-4 bg-cream shadow">
        <SelectValue placeholder="Pilih Zona" className="bg-cream" />
      </SelectTrigger>
      <SelectContent className="border-2 border-red-4 bg-cream">
        <SelectGroup>
          <SelectItem value="all">Semua Zona</SelectItem>
          <SelectLabel>Ganesha</SelectLabel>
          {DATAS.filter((_, i) => i < 9).map((data) => (
            <SelectItem key={data.value} value={data.value}>
              {data.label}
            </SelectItem>
          ))}
          <SelectLabel>Jatinangor</SelectLabel>
          {DATAS.filter((_, i) => i >= 9 && i < 13).map((data) => (
            <SelectItem key={data.value} value={data.value}>
              {data.label}
            </SelectItem>
          ))}
          <SelectLabel>Cirebon</SelectLabel>
          {DATAS.filter((_, i) => i >= 13).map((data) => (
            <SelectItem key={data.value} value={data.value}>
              {data.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default Count;
