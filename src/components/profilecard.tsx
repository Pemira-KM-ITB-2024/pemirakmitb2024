import React from 'react'
import Image from 'next/image';
import ProfPict from "public/profil/profpict.png"
import { header } from "~/styles/fonts";

export const KProfileCard = () => {
  return (
    <div className='flex flex-row items-start justify-center gap-6 p-8'>
        <div className='relative w-80'>
            <div className='bg-[#3957D1] rounded-xl flex flex-col items-center justify-center aspect-square'>
                <div className='w-48 h-48 mb-4'>
                    <Image src={ProfPict} alt='profile picture' layout="responsive" width={192} height={192}/>
                </div>
                <h1 className={`${header.variable} text-2xl font-bold text-[#FA3A91] mb-4`}>
                    CALON
                </h1>
            </div>
            {/* placeholder sementara, akan dibuat carousel */}
            <button className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#BEEF62] rounded-full w-12 h-12 flex items-center justify-center text-2xl">&lt;</button>
            <button className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 bg-[#BEEF62] rounded-full w-12 h-12 flex items-center justify-center text-2xl">&gt;</button>
            
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
                <div className="bg-[#BEEF62] rounded-full w-16 h-16 flex items-center justify-center">
                    <span className="text-2xl font-bold">01</span>
                </div>
            </div>
        </div>    

        <div className='flex flex-col'>
            <div className='bg-[#3957D1] rounded-xl p-8 w-[800px]'>
                <div className="mb-2">
                    <div className={`${header.variable} text-4xl font-bold text-[#BEEF62] mb-2 text-center`}>
                        NAMA LENGKAP
                    </div>
                    <div className={`${header.variable} text-xl font-bold text-[#FFE859] mb-2 text-center`}>
                        STI'23
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <div className={`${header.variable} text-xl font-bold text-white mb-2 text-center`}>
                            VISI
                        </div>
                        <div className='rounded-3xl border-4 border-gray-400 p-4 bg-[#5A8AF9]'>
                            <p className={`${header.variable} font-semibold text-base text-white text-center`}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, qui corrupti? Eaque excepturi quibusdam 
                            </p>
                        </div>
                    </div>

                    <div>
                        <div className={`${header.variable} text-xl font-bold text-white mb-3 text-center`}>
                            MISI
                        </div>
                        <div className="space-y-4">
                            <div className='rounded-3xl border-4 border-gray-400 p-4 bg-[#5A8AF9]'>
                                <p className={`${header.variable} font-semibold text-base text-white text-center`}>
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo, itaque veniam. Reiciendis placeat
                                </p>
                            </div>
                            <div className='rounded-3xl border-4 border-gray-400 p-4 bg-[#5A8AF9]'>
                                <p className={`${header.variable} font-semibold text-base text-white text-center`}>
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo similique quasi dolor?
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Portfolio and Instagram section */}
            <div className="flex items-center justify-between px-4 mt-4">
                <button className="bg-[#FFE859] text-black px-12 py-2 rounded-full font-semibold flex-grow">
                    PORTOFOLIO
                </button>
                <div className="bg-[#FA3A91] p-2 rounded-lg ml-4">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                </div>
            </div>
        </div>
    </div>
  )
}

export const MProfileCard = () => {
    return (
        <div className='flex flex-row items-start justify-center gap-6 p-8'>
            <div className='relative w-80'>
                <div className='bg-[#FFA5B380] rounded-xl flex flex-col items-center justify-center aspect-square'>
                    <div className='w-48 h-48 mb-4'>
                        <Image src={ProfPict} alt='profile picture' layout="responsive" width={192} height={192}/>
                    </div>
                    <h1 className={`${header.variable} text-2xl font-bold text-[#3957D1] mb-4`}>
                        CALON
                    </h1>
                </div>
                {/* placeholder sementara, akan dibuat carousel */}
                <button className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FFE859] rounded-full w-12 h-12 flex items-center justify-center text-2xl">&lt;</button>
                <button className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 bg-[#FFE859] rounded-full w-12 h-12 flex items-center justify-center text-2xl">&gt;</button>
                
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
                    <div className="bg-[#FFE859] rounded-full w-16 h-16 flex items-center justify-center">
                        <span className="text-2xl font-bold">01</span>
                    </div>
                </div>
            </div>    
    
            <div className='flex flex-col'>
                <div className='bg-[#FFA5B380] rounded-xl p-8 w-[800px]'>
                    <div className="mb-2">
                        <div className={`${header.variable} text-4xl font-bold text-[#FFE859] mb-2 text-center`}>
                            NAMA LENGKAP
                        </div>
                        <div className={`${header.variable} text-xl font-bold text-[#BEEF62] mb-2 text-center`}>
                            STI'23
                        </div>
                    </div>
    
                    <div className="space-y-6">
                        <div>
                            <div className={`${header.variable} text-xl font-bold text-white mb-2 text-center`}>
                                VISI
                            </div>
                            <div className='rounded-3xl border-4 border-gray-400 p-4 bg-[#FFAAB7]'>
                                <p className={`${header.variable} font-semibold text-base text-white text-center`}>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, qui corrupti? Eaque excepturi quibusdam 
                                </p>
                            </div>
                        </div>
    
                        <div>
                            <div className={`${header.variable} text-xl font-bold text-white mb-3 text-center`}>
                                MISI
                            </div>
                            <div className="space-y-4">
                                <div className='rounded-3xl border-4 border-gray-400 p-4 bg-[#FFAAB7]'>
                                    <p className={`${header.variable} font-semibold text-base text-white text-center`}>
                                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo, itaque veniam. Reiciendis
                                    </p>
                                </div>
                                <div className='rounded-3xl border-4 border-gray-400 p-4 bg-[#FFAAB7]'>
                                    <p className={`${header.variable} font-semibold text-base text-white text-center`}>
                                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo similique quasi dolor? 
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    
                {/* Portfolio and Instagram section */}
                <div className="flex items-center justify-between px-4 mt-4">
                    <button className="bg-[#BEEF62] text-black px-12 py-2 rounded-full font-semibold flex-grow">
                        PORTOFOLIO
                    </button>
                    <div className="bg-[#3957D1] p-2 rounded-lg ml-4">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
      )
}