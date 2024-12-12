import Image from "next/image";
import dynamic from "next/dynamic";
import { body, header } from "@fonts";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { SpecialZoomLevel } from "@react-pdf-viewer/core"; // Import the zoom level constants
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const Countdown = dynamic(() => import("~/components/countdown"), {
  ssr: false,
});

export default function Forsos() {
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: (defaultTabs) => [],
  });

  return (
    <div className="relative z-0 flex flex-col items-center justify-center w-full overflow-hidden mb-[20vw]">
      <div className={`${header.className} w-[80%] flex text-center items-center justify-center mt-[100px] font-bold text-3xl md:text-5xl text-[#FA3A91]`}>
        MATERI FORSOS
      </div>
      <div className="w-[80%] h-[80vw] md:h-[40vw] border border-gray-200 shadow-lg mt-12">
        {/* PDF Viewer */}
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <div className="w-full h-full">
            <Viewer
              fileUrl="/forsos/forsos.pdf"
              plugins={[defaultLayoutPluginInstance]}
              defaultScale={SpecialZoomLevel.PageWidth} // Set initial zoom to page width
            />
          </div>
        </Worker>
      </div>
    </div>
  );
}
