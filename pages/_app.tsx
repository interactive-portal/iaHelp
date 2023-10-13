import "@/styles/globals.css";
// import "public/icon/css/all.css";
// import { roboto } from "@/fonts";
// import Layout from "@/components/layout";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { SWRConfig } from "swr";
import { appWithTranslation } from "next-i18next";
import Layout from "@/components/layout";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress
        color="#0346F2"
        startPosition={0.1}
        stopDelayMs={60}
        height={5}
        // showOnShallow={true}
      />
      <span className="bg-blue-400 col-span-12 container "></span>
      {/* <SessionProvider
        session={pageProps.session}
        // basePath="https://www.motoddd.mn/api/auth"
        // clientMaxAge={0}
        refetchInterval={15 * 60 * 60} //15 минут тутамд user login шалгана.
        refetchOnWindowFocus={false} //цонх focus-лах үед refetch хийх эсэх
      > */}
      <SWRConfig
        value={{
          refreshInterval: 0,
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
        }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SWRConfig>
      {/* </SessionProvider> */}
    </>
  );
}

export default appWithTranslation(App);
