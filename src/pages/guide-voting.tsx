import GuideVote from "~/components/voting";
import Bg from "~/components/background";
import FaQ from "~/components/faq";
import dynamic from "next/dynamic";

const DynamicMapComponent = dynamic(() => import('@/lokasi-voting'), { ssr: false });

const GuideVoting = () => {
  return (
    <div className="dusty-bg flex flex-col items-center justify-center gap-20 py-10 md:py-16">
      <Bg />
      <GuideVote />
      <DynamicMapComponent />
      <FaQ />
    </div>
  );
};

export default GuideVoting;
