import { SessionProvider } from "next-auth/react";
import { type AppProps } from "next/app";

import "~/styles/globals.css";
import Layout from "@/layout";
import type { ReactElement, ReactNode } from "react";
import { type NextPage } from "next";

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const Pemira = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
  if (Component.getLayout) {
    return Component.getLayout(
      <SessionProvider session={session} refetchOnWindowFocus>
        <Component {...pageProps} />
      </SessionProvider>,
    );
  }

  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
};

export default Pemira;