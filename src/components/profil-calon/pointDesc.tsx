import { CardDescription } from "~/components/ui/card";
import { montserrat } from "~/styles/fonts";

type PointDescProps = {
  section: string;
  tipe: string;
  bgDesc: string;
  point: string;
  no?: number;
};

const PointDesc = ({ section, tipe, bgDesc, point }: PointDescProps) => {
  const fontColor = section === "k3m" ? "text-black" : "text-brown-2";

  if (tipe === "visi") {
    return (
      <CardDescription
        className={`w-full ${bgDesc} py-1 pl-2 text-xs text-black drop-shadow-lg md:text-sm ${fontColor} font-bold ${montserrat.className} rounded-lg text-center`}
      >
        {`"${point}"`}
      </CardDescription>
    );
  } else {
    return (
      <CardDescription
        className={`w-full ${bgDesc} py-1 pl-2 text-xs text-black drop-shadow-lg md:text-sm ${fontColor} font-semibold ${montserrat.className} rounded-lg`}
      >
        {`• ${point}`}
      </CardDescription>
    );
  }
};

export default PointDesc;
