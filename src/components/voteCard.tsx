import Image from "next/image";
import React from "react";
import { FaCheck } from "react-icons/fa";
import { header } from "~/styles/fonts";

type Props = {
  imgUrl: string;
  onClick: () => void;
  bgColor: string;
  textColor: string;
  name?: string;
  faculty?: string;
  clicked: boolean;
};

const VoteCard = (props: Props) => {
  return (
    <div
      onClick={props.onClick}
      className={`relative ${
        props.clicked ? "scale-105  border-[#3A71F0]" : "border-transparent"
      } flex min-h-[400px] w-full max-w-[500px] cursor-pointer flex-col items-center justify-between rounded-lg border-[5px] p-4 duration-200 hover:scale-105 hover:border-[#3A71F0]`}
      style={{ backgroundColor: props.bgColor }}
    >
      <Image
        src={props.imgUrl}
        alt={props.imgUrl}
        width={300}
        height={400}
        className="rounded-lg object-cover"
      />
      <div className="flex flex-col items-center justify-center text-center">
        <p
          className={`${header.variable} text-2xl font-bold text-[${props.textColor}] xl:mb-0`}
        >
          {props.name ? props.name : ""}
        </p>
        <p
          className={`${header.variable} text-2xl text-[${props.textColor}] xl:mb-0`}
        >
          {props.faculty ? props.faculty : ""}
        </p>
      </div>
      {props.clicked && (
        <div className="full text- absolute bottom-0 left-1/2 flex aspect-square w-fit -translate-x-[50%] translate-y-[50%] flex-col items-center justify-center rounded-full bg-[#3A71F0] p-2 text-center text-[20px] text-white">
          <FaCheck />
        </div>
      )}
    </div>
  );
};

export default VoteCard;
