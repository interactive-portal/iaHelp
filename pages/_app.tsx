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
import { CloudStore } from "@/components/common/engineBox/Context/CloudContext";
import RouteLoader from "@/components/routeLoader";
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
      <RouteLoader />
      <SessionProvider
        session={pageProps.session}
        // basePath="https://www.motoddd.mn/api/auth"
        // clientMaxAge={0}
        refetchInterval={15 * 60 * 60} //15 минут тутамд user login шалгана.
        refetchOnWindowFocus={false} //цонх focus-лах үед refetch хийх эсэх
      >
        <SWRConfig
          value={{
            refreshInterval: 0,
            fetcher: (resource, init) =>
              fetch(resource, init).then((res) => res.json()),
          }}
        >
          <CloudStore>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </CloudStore>
        </SWRConfig>
      </SessionProvider>
    </>
  );
}

export default appWithTranslation(App);
