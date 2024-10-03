import { useState } from "react";
import {
  Cell,
  Pie,
  PieChart,
  Tooltip,
  Legend,
  LabelList,
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Label,
  Bar,
} from "recharts";
import Bg from "~/components/background";
import { CustomTooltip as CustomTooltipPie } from "~/components/charts/pieChart";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useMediaQuery } from "~/hook/useMediaQuery";
import { header } from "~/styles/fonts";
import { api } from "~/utils/api";

export const prodi = [
  { nim: 101, faculty: "Matematika" },
  { nim: 102, faculty: "Fisika" },
  { nim: 103, faculty: "Astronomi" },
  { nim: 104, faculty: "Mikrobiologi" },
  { nim: 105, faculty: "Kimia" },
  { nim: 106, faculty: "Biologi" },
  { nim: 107, faculty: "Sains dan Teknologi Farmasi" },
  { nim: 116, faculty: "Farmasi Klinik dan Komunitas" },
  { nim: 120, faculty: "Teknik Geologi" },
  { nim: 121, faculty: "Teknik Pertambangan" },
  { nim: 122, faculty: "Teknik Perminyakan" },
  { nim: 123, faculty: "Teknik Geofisika" },
  { nim: 125, faculty: "Teknik Metalurgi" },
  { nim: 128, faculty: "Meteorologi" },
  { nim: 129, faculty: "Oseanografi" },
  { nim: 130, faculty: "Teknik Kimia" },
  { nim: 131, faculty: "Teknik Mesin" },
  { nim: 132, faculty: "Teknik Elektro" },
  { nim: 133, faculty: "Teknik Fisika" },
  { nim: 134, faculty: "Teknik Industri" },
  { nim: 135, faculty: "Teknik Informatika" },
  { nim: 136, faculty: "Teknik Dirgantara" },
  { nim: 137, faculty: "Teknik Material" },
  { nim: 144, faculty: "MRI" },
  { nim: 145, faculty: "Teknik Bioenergi" },
  { nim: 150, faculty: "Teknik Sipil" },
  { nim: 151, faculty: "Teknik Geodesi" },
  { nim: 152, faculty: "Arsitektur" },
  { nim: 153, faculty: "Teknik Lingkungan" },
  { nim: 154, faculty: "PWK" },
  { nim: 155, faculty: "Teknik Kelautan" },
  { nim: 157, faculty: "RIL" },
  { nim: 160, faculty: "TPB FMIPA" },
  { nim: 161, faculty: "TPB SITH-S" },
  { nim: 198, faculty: "TPB SITH-R" },
  { nim: 162, faculty: "TPB SF" },
  { nim: 163, faculty: "TPB FITB" },
  { nim: 164, faculty: "TPB FTTM" },
  { nim: 165, faculty: "TPB STEI-R" },
  { nim: 196, faculty: "TPB STEI-K" },
  { nim: 166, faculty: "TPB FTSL" },
  { nim: 167, faculty: "TPB FTI" },
  { nim: 168, faculty: "TPB FSRD" },
  { nim: 169, faculty: "TPB FTMD" },
  { nim: 170, faculty: "Seni Rupa" },
  { nim: 172, faculty: "Kriya" },
  { nim: 173, faculty: "Desain Interior" },
  { nim: 174, faculty: "Desain Komunikasi Visual" },
  { nim: 175, faculty: "Desain Produk" },
  { nim: 179, faculty: "MKDU" },
  { nim: 180, faculty: "Teknik TL" },
  { nim: 181, faculty: "Teknik Telekomunikasi" },
  { nim: 182, faculty: "STI" },
  { nim: 190, faculty: "Manajemen" },
  { nim: 197, faculty: "TPB SBM" },
  { nim: 199, faculty: "TPB SAPPK" },
  { nim: 192, faculty: "Kewirausahaan" },
  { nim: 183, faculty: "Teknik Biomedis" },
  { nim: 158, faculty: "TPSDA" },
  { nim: 143, faculty: "Teknik Pangan" },
  { nim: 119, faculty: "Tek. Pasca Panen" },
  { nim: 115, faculty: "Rek. Kehutanan" },
  { nim: 114, faculty: "Rek. Pertanian" },
  { nim: 112, faculty: "Rek. Hayati" },
  { nim: 108, faculty: "Aktuaria" },
];
export const FACULTIES = [
  { faculty: "FTMD", nims: [131, 136, 169, 137] },
  { faculty: "FMIPA", nims: [101, 102, 103, 105, 160, 108] },
  { faculty: "SF", nims: [107, 116, 162] },
  { faculty: "SITH-S", nims: [106, 104, 161] },
  { faculty: "SITH-R", nims: [198, 112, 114, 115, 119] },
  { faculty: "FITB", nims: [120, 128, 129, 151, 163] },
  { faculty: "FTTM", nims: [121, 122, 123, 125, 164] },
  { faculty: "FTI", nims: [130, 133, 134, 143, 144, 167, 145] },
  { faculty: "STEI-R", nims: [132, 165, 180, 181, 183] },
  { faculty: "STEI-K", nims: [196, 135, 182] },
  { faculty: "FTSL", nims: [150, 153, 155, 157, 158, 166] },
  { faculty: "SAPPK", nims: [154, 152, 199] },
  { faculty: "FSRD", nims: [168, 170, 172, 173, 174, 175] },
  { faculty: "SBM", nims: [190, 192, 197] },
];

const prodis = [
  "Teknik Mesin",
  "Teknik Dirgantara",
  "Teknik Material",
  "TPB FTMD",
  "Matematika",
  "Fisika",
  "Kimia",
  "Astronomi",
  "Aktuaria",
  "TPB FMIPA",
  "Teknik Geologi",
  "Teknik Geodesi",
  "Oseanografi",
  "Meteorologi",
  "TPB FITB",
  "Teknik Pertambangan",
  "Teknik Perminyakan",
  "Teknik Geofisika",
  "Teknik Metalurgi",
  "TPB FTTM",
  "Teknik Sipil",
  "Teknik Kelautan",
  "Teknik Lingkungan",
  "RIL",
  "TPSDA",
  "TPB FTSL",
  "Sains dan Teknologi Farmasi",
  "Farmasi Klinik dan Komunitas",
  "TPB SF",
  "Mikrobiologi",
  "Biologi",
  "TPB SITH-S",
  "Rek. Kehutanan",
  "Rek. Hayati",
  "Rek. Pertanian",
  "Tek. Pasca Panen",
  "TPB SITH-R",
  "Teknik Industri",
  "MRI",
  "Teknik Fisika",
  "Teknik Kimia",
  "Teknik Pangan",
  "Teknik Bioenergi",
  "TPB FTI",
  "Teknik Elektro",
  "Teknik TL",
  "Teknik Biomedis",
  "Teknik Telekomunikasi",
  "TPB STEI-R",
  "Teknik Informatika",
  "STI",
  "TPB STEI-K",
  "Arsitektur",
  "PWK",
  "TPB SAPPK",
  "Desain Interior",
  "Desain Produk",
  "Desain Komunikasi Visual",
  "Seni Rupa",
  "Kriya",
  "TPB FSRD",
  "Manajemen",
  "Kewirausahaan",
  "TPB SBM",
];

const suara = [
  80, 32, 52, 81, 64, 61, 52, 30, 18, 102, 120, 94, 89, 71, 108, 110, 123, 60, 65, 71, 69, 52, 37, 28, 8, 68, 38, 22,
  26, 42, 36, 41, 17, 32, 28, 23, 37, 28, 17, 60, 72, 21, 11, 56, 41, 23, 11, 63, 108, 65, 43, 44, 61, 173, 82, 12, 36, 18,
  17, 38, 16, 57, 5, 37,
];

const Statistik = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [faculty, setFaculty] = useState("ftmd");
  const nims =
    FACULTIES.find((f) => f.faculty.toLowerCase() === faculty)?.nims ?? [];
  // const facultyData = api.stats.getFacultyVotes.useQuery({ nims });
  const data = api.stats.getCampusVotes.useQuery();
  const facultyData = prodis.map((prodi_, index) => ({
    prodi: prodi_,
    nim: prodi.find((f) => f.faculty === prodi_)?.nim.toString() ?? "",
    votes: suara[index] ?? 0,
  }))

  const prodiData = facultyData.filter((f) => nims.includes(parseInt(f.nim)));
  return (
    <div className="dusty-bg relative w-full flex-1 flex-col items-center justify-center">
      <Bg />
      <h1
        className={`${header.className} text-custom isolate pt-8 text-3xl md:pt-12 md:text-4xl`}
      >
        Statistik Data Pemilih
      </h1>
      <div className="isolate mt-10 flex flex-col px-8 md:flex-row md:px-16 ">
        <div className=" flex w-full flex-col items-center gap-6 md:h-full md:w-auto">
          <div className="flex w-full">
            <div className="font-mono text-base">{`Suara masuk: ${
              data?.data?.total ?? "Memuat..."
            }`}</div>
          </div>
          <CampusPie data={data} />
        </div>
        <div className="flex w-full flex-1 flex-col gap-4 pt-12 md:ml-[5vw] md:max-h-[65vh] md:pt-0">
          <h1
            className={`${header.className} text-custom text-3xl md:hidden md:text-4xl`}
          >
            Statistik Per Fakultas
          </h1>
          <SelectFaculty query={faculty} setQuery={setFaculty} />
          {isDesktop ? (
            <FacultyBarDekstop data={prodiData ?? []} />
          ) : (
            <FacultyBarMobile data={prodiData ?? []} />
          )}
        </div>
      </div>
    </div>
  );
};

const FacultyBarMobile = ({
  data,
}: {
  data: { prodi: string | undefined; nim: string; votes: number }[];
}) => {
  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart
        width={500}
        height={500}
        data={data}
        margin={{
          top: 20,
          right: 5,
          left: 5,
          bottom: 5,
        }}
        layout="vertical"
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#757272bb" />
        <XAxis
          stroke="black"
          fontFamily="Oxygen"
          fontWeight={600}
          type="number"
          fontSize={10}
        />
        <YAxis
          dataKey="prodi"
          stroke="black"
          fontFamily="Oxygen"
          fontWeight={600}
          fontSize={10}
          type="category"
        />
        <Tooltip content={CustomTooltip} />
        <Bar
          dataKey="votes"
          fill="#d2391a"
          name="Jumlah Suara"
          layout="vertical"
        >
          <LabelList
            dataKey="votes"
            position="right"
            fontSize={12}
            fontStyle="none"
            fontFamily="sans-serif"
            fontWeight={500}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

const FacultyBarDekstop = ({
  data,
}: {
  data: { prodi: string | undefined; nim: string; votes: number }[];
}) => {
  return (
    <ResponsiveContainer width="100%" height={450}>
      <BarChart
        width={500}
        height={500}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#757272bb" />
        <XAxis
          dataKey="prodi"
          stroke="black"
          fontFamily="Oxygen"
          fontWeight={600}
          fontSize={14}
        />
        <YAxis
          stroke="black"
          fontFamily="Oxygen"
          fontWeight={600}
          fontSize={14}
        >
          <Label
            value="Jumlah Suara"
            position="insideLeft"
            angle={-90}
            fontFamily="Poppins"
            fontWeight={500}
            fontSize={18}
          />
        </YAxis>
        <Tooltip content={CustomTooltip} />
        <Bar dataKey="votes" fill="#d2391a" name="Jumlah Suara">
          <LabelList
            dataKey="votes"
            position="top"
            fontSize={14}
            fontStyle="none"
            fontFamily="sans-serif"
            fontWeight={500}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

const CampusPie = ({
  data,
}: {
  data: {
    data: { jatinangor: number; ganesha: number; cirebon: number } | undefined;
  };
}) => {
  return (
    <PieChart width={250} height={300} className="h-fit">
      <Pie
        dataKey="value"
        data={[
          { name: "Ganesha", value: data?.data?.ganesha ?? 0 },
          { name: "Jatinangor", value: data?.data?.jatinangor ?? 0 },
          { name: "Cirebon", value: data?.data?.cirebon ?? 0 },
        ]}
        cx="50%"
        cy="50%"
        outerRadius={120}
        label={false}
      >
        {["#3997b1", "#d2391a", "#eda537"].map((color, index) => (
          <Cell key={`cell-${index}`} fill={color} />
        ))}
        <LabelList
          dataKey="value"
          position="inside"
          fontSize={16}
          fontVariant="small-caps"
          fontFamily="Oxygen"
          fontWeight={400}
          formatter={(value: string) => `${value}`}
        />
      </Pie>
      <Legend
        height={50}
        iconSize={12}
        iconType="circle"
        wrapperStyle={{
          bottom: -16,
          transform: "translateX(-50%)",
          fontSize: 16,
          width: "80%",
          left: "50%",
        }}
      />
      <Tooltip content={CustomTooltipPie} />
    </PieChart>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active) {
    return (
      <div className="rounded-md border border-red-5 bg-cream p-4 font-mono text-base font-normal text-red-4 shadow-md">
        <p className={`${header.className}`}>{`${label}`}</p>
        <div className="h-px w-full bg-black"></div>
        <p>{`${payload[0]?.name} : ${payload[0]?.value}`}</p>
      </div>
    );
  }

  return null;
};

const SelectFaculty = ({
  query,
  setQuery,
}: {
  query: string;
  setQuery: (prev: string) => void;
}) => {
  return (
    <Select defaultValue={query} value={query} onValueChange={setQuery}>
      <SelectTrigger className="ml-8 w-[200px] border-2 border-red-4 bg-cream shadow md:ml-20">
        <SelectValue placeholder="Pilih Fakultas" />
      </SelectTrigger>
      <SelectContent className="border-2 border-red-4 bg-cream">
        <SelectGroup>
          {FACULTIES.map(({ faculty, nims }) => (
            <SelectItem
              key={faculty}
              value={faculty.toLocaleLowerCase()}
              className="bg-cream"
            >
              {faculty}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default Statistik;
