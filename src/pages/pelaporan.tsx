import React from 'react';
import { withAuth } from "~/utils/withAuth";

const Pelaporan = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-white">Coming Soon</h1>
      <p className="mt-4 text-lg text-white text-center">This page is under construction. Please check back later.</p>
    </div>
  );
};

export default withAuth(Pelaporan, ["/pelaporan"]);