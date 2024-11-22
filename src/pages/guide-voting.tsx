import GuideVote from "~/components/voting";
import FaQ from "~/components/faq";
import dynamic from "next/dynamic";

const DynamicMapComponent = dynamic(() => import('@/lokasi-voting'), { ssr: false });

const GuideVoting = () => {
  return (
    <div className="voting-bg flex flex-col items-center justify-center gap-20">
      <GuideVote />
      <DynamicMapComponent />
      <FaQ />
    </div>
  );
};

export default GuideVoting;
