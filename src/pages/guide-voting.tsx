import GuideVote from "~/components/voting";
import Layout from '~/components/layout';
import Bg from "~/components/background";
import FaQ from "~/components/faq";
import dynamic from "next/dynamic";

const DynamicMapComponent = dynamic(() => import('@/lokasi-voting'), { ssr: false });

const GuideVoting = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-20 py-10 md:py-16">
      <GuideVote />
      <DynamicMapComponent />
      <FaQ />
    </div>
  );
};

export default GuideVoting;
