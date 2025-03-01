import { Separator } from "~/components/ui/separator";

const Error = () => {
  return (
    <div className="flex items-center justify-center text-xl text-navy flex-1">
      <div className="text-4xl font-semibold flex h-10 items-center gap-4 text-white">
        <h1>Maaf</h1>
        <Separator orientation="vertical" className="bg-white" />
        <h1>Halaman Tidak Ditemukan</h1>
      </div>
    </div>
  );
};

export default Error;
