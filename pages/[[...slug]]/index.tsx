import Error from "next/error";

import { getLayout } from "@/lib/serverFunctions";
import _ from "lodash";
import preparePageList from "@/utils/preparePage";
import Section from "@/components/pageRender/section";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
// import nextI18NextConfig from '../next-i18next.config.js'
export default function Page(props: any) {
  return <Section configList={props?.layout} />;
}

export async function getServerSideProps(context: any) {
  const pathname = _.join(context?.params.slug, "/");
  const pageConfig = await getLayout(pathname || "home");
  if (pageConfig?.status == "notFound") {
    return {
      props: {
        layout: {},
        notFound: true,
      },
    };
  }

  const locale = context.locale || "mn";
  const config = {
    i18n: {
      defaultLocale: locale,
      locales: ["mn", "en"],
      ns: ["translate", "common"],
      defaultNS: "translate",
    },
  };

  const pageObject: any = preparePageList(pageConfig?.result) || {};

  // context.res.setHeader(
  //   "Cache-Control",
  //   "public, s-maxage=10, stale-while-revalidate=59"
  // );
  // console.log("object :>> ", context.res);

  return {
    props: {
      layout: { ...pageObject },
      notFound: false,
      ...(await serverSideTranslations(
        locale,
        ["translate", "common"],
        config
      )),
    }, // will be passed to the page component as props
  };
}
