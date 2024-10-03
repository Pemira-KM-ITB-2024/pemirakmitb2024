import { useMediaQuery } from "~/hook/useMediaQuery";
import { header } from "~/styles/fonts";

const Timeline = () => {
  const timeline = [
    {
      date: "22 Februari 2024",
      event: "Pengembelian Berkas PEMIRA KM ITB2023/2024",
    },
    {
      date: "23 Februari 2024",
      event: "Gelar Witjara : Era Digital Sebagai Warna Baroe Kemahasiswaan",
    },
    {
      date: "24 Februari 2024",
      event: "Pembekalan Calon K3M dan Calon MWA-WM ITB",
    },
    {
      date: "26 Februari 2024",
      event: "Hearing Zona Timur",
    },
    {
      date: "28 Februari 2024",
      event: "Hearing Zona Barat",
    },
    {
      date: "1 Maret 2024",
      event: "Hearing Zona Cirebon",
    },
    {
      date: "4 Maret 2024",
      event: "Hearing Zona HMJ Jatinangor",
    },
    {
      date: "5 Maret 2024",
      event: "Hearing Zona Tengah",
    },
    {
      date: "6 Maret 2024",
      event: "Hearing Zona TPB",
    },
    {
      date: "10 Maret 2024",
      event: "Debat dan Uji Panelis",
    },
    {
      date: "13-15, 18-20 Maret 2024",
      event: "Pemungutan Suara",
    },
    {
      date: "22 Maret 2024",
      event: "Pesta Demokrasi dan Pengumuman",
    },
  ];
  return (
    <div className="relative w-1 bg-teal-4 md:h-1 md:w-full">
      {timeline.map((t, i) => (
        <Card key={i} index={i} date={t.date} event={t.event} />
      ))}
    </div>
  );
};

const Card = ({
  index = 0,
  date,
  event,
}: {
  index?: number;
  date?: string;
  event?: string;
}) => {
  const isDekstop = useMediaQuery("(min-width: 768px)");
  const textColor = index % 2 === 0 ? "text-teal-2" : "text-red-3";
  const top = isDekstop
    ? index % 2 === 0
      ? "6vh"
      : "-6vh"
    : `${(100 / 11) * index}%`;
  const translate_y = isDekstop ? (index % 2 === 0 ? "10%" : "-110%") : "-50%";
  const left = isDekstop
    ? `${(100 / 11) * index}%`
    : index % 2 === 0
      ? "-3rem"
      : "3rem";
  const anchorY = isDekstop
    ? index % 2 === 0
      ? "-top-4 -translate-y-full"
      : "-bottom-4 translate-y-full"
    : index % 2 === 0 ? "-right-2 translate-x-full" : "-translate-x-full -left-2";
  const after = `after:absolute after:w-3 after:h-3 after:rounded-full after:bg-teal-4 ${
    index % 2 === 0
      ? " md:after:bottom-0 md:after:translate-y-[calc(50%-2px)] "
      : "md:after:top-0 md:after:-translate-y-[calc(50%+2px)] "
  } md:after:left-1/2 md:after:-translate-x-1/2 ${
    !isDekstop && index % 2 === 0
      ? "after:-translate-y-1/2 after:top-1/2  after:left-0"
      : "after:right-0 after:bottom-1/2 after:translate-y-1/2"
  }`;
  const anchorH = isDekstop
    ? index % 2 === 0
      ? "md:h-[calc(6vh+10%-2px-1rem)]"
      : "md:h-[calc(6vh+10%+4px-1rem)]"
    : "";
  
  const textAllign = isDekstop
    ? "text-center"
    : index % 2 === 0
      ? "text-right"
      : "text-left";

  return (
    <div
      className={`absolute w-min ${textAllign} md:py-3`}
      style={{
        top: top,
        left: left,
        transform: `translate(${
          isDekstop ? "-50%" : index % 2 === 0 ? "-100%" : "0%"
        }, ${translate_y})`,
      }}
    >
      <h1
        className={`${header.className} ${textColor} w-max max-w-[32.5vw] text-base md:text-xl`}
      >
        {date}
      </h1>
      <h3 className="text-xs text-navy">{event}</h3>
      <div
        className={`absolute h-1 w-10 md:w-1 ${anchorH} bg-teal-4 ${anchorY} ${
          isDekstop ? "left-1/2" : "top-1/2"
        } ${after}`}
      ></div>
    </div>
  );
};

export default Timeline;
