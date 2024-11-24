import { type ReactNode } from "react";
import Head from "next/head";
import Navbar from "./navbar";
import Footer from "./footer";
import { body } from "@fonts";
import FadeIn from "./fade-in";
import { Toaster } from "./ui/sonner";

const Layout = ({ children }: { children?: ReactNode }) => (
  <FadeIn>
    <Navbar />
    <div className={`${body.className} flex min-h-dvh flex-col text-black`}>
      <Head>
        <title>PEMIRA KM ITB</title>
        <meta
          name="description"
          content="Website Pemilu Raya KM ITB 2024/2025"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster richColors />
      <main className="flex min-h-dvh flex-1 flex-col overflow-hidden"
      style={{
        backgroundImage: "url(/background-pemira-1.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      >
        {children}
        <Footer/>
      </main>
    </div>
  </FadeIn>
);

export default Layout;
