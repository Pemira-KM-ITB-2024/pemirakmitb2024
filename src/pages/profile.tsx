import React from "react";
import Image from "next/image";
import BintangPink from "public/profil/bintangpink.png";
import BintangKuning from "public/profil/bintangkuning.png"
import { KProfileCard, MProfileCard } from "../components/profilecard";
import { header } from "~/styles/fonts";

const Profile = () => {
  return (
    <div className="relative w-full min-h-screen bg-[url('/guidevoting/background.png')] bg-cover lg:bg-500 bg-center overflow-auto lg:overflow-hidden">
        <div className="lg:absolute lg:-top-56 lg:-left-40 lg:w-[450px] absolute w-[146px] left-[-60px] -top-16">
          <Image src={BintangPink} alt="Star" layout="responsive" />
        </div>
        <div className="lg:absolute lg:-top-32 lg:-right-34 lg:w-[450px] absolute w-[146px] right-[-42px] -top-16">
          <Image src={BintangKuning} alt="Star" layout="responsive" />
        </div>
        <div className="lg:flex lg:items-center lg:justify-center flex flex-row justify-center items-center mt-4 sm:mt-8 md:mt-16 lg:mt-32">
          <h1
            className={`${header.variable} text-4xl md:text-6xl lg:text-8xl font-bold text-[#FA3A91] [text-shadow:_4px_4px_0_rgb(0_0_0_/_80%)] -skew-x-12 mr-1 lg:mr-1`}
          >
            K
          </h1>
          <h1
            className={`${header.variable} text-4xl md:text-6xl lg:text-8xl font-bold text-[#FA3A91] [text-shadow:_4px_4px_0_rgb(0_0_0_/_80%)] skew-x-12 ml-1 lg:ml-1`}
          >
            3M
          </h1>
        </div>
        <div className="flex justify-center items-center gap-8 mt-8">
            < KProfileCard />
        </div>

        <div className="lg:flex lg:items-center lg:justify-center flex flex-row justify-center items-center mt-4 sm:mt-8 md:mt-16 lg:mt-32">
          <h1
            className={`${header.variable} text-4xl md:text-6xl lg:text-8xl font-bold text-[#FFE859] [text-shadow:_4px_4px_0_rgb(0_0_0_/_80%)] -skew-x-12 mr-1 lg:mr-1`}
          >
            MWA
          </h1>
          <h1
            className={`${header.variable} text-4xl md:text-6xl lg:text-8xl font-bold text-[#FFE859] [text-shadow:_4px_4px_0_rgb(0_0_0_/_80%)] skew-x-12 ml-1 lg:ml-1`}
          >
            -WM
          </h1>
        </div>
        <div className="flex justify-center items-center gap-8 mt-8 mb-[244px] z-10">
            < MProfileCard />
        </div>

    </div>
  );
};

export default Profile;
