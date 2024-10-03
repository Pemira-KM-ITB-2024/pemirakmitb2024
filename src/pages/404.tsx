import { Separator } from "~/components/ui/separator";

const Error = () => {
  return (
    <div className="flex items-center justify-center text-xl text-navy flex-1 bg-cream">
      <div className="flex h-10 items-center gap-4">
        <h1>404</h1>
        <Separator orientation="vertical" className="bg-navy" />
        <h1>Halaman Tidak Ditemukan</h1>
      </div>
    </div>
  );
};

export default Error;
