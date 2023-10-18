import Error from "next/error";

// import { getLayout } from "@/lib/serverFunctions";
import _ from "lodash";
// import preparePageList from "@/utils/preparePage";
// import Section from "@/components/pageRender/section";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { preparePageObject } from "@/util/prepareDetect";
import RenderBody from "@/middleware/components/renderBody";
// import nextI18NextConfig from '../next-i18next.config.js'
export default function Page(props: any) {
  const { mergedPageNemgoo } = props;

  return (
    <>
      <RenderBody {...props} />
      {/* lang */}
    </>
  );
}

export async function getServerSideProps(context: any) {
  const pathname = _.join(context?.params.slug, "/");
  console.log("children :>>  :>> ", context?.params);
  const locale = context?.locale || "mn";
  const config = {
    i18n: {
      defaultLocale: locale,
      locales: ["mn", "en"],
      ns: ["translate", "common"],
      defaultNS: "translate",
    },
  };

  const hostObjectV2 = {
    domainType: process.env.HOSTOBJECTV2_DOMAINTYPE || "DEFAULT",
    metaNameV2: process.env.HOSTOBJECTV2_METANAMEV2 || "PROD",
    pageDomain: "help", //эхний үгийг авна.
    pageSlug: pathname || "home", //дараагийн үгүүдийг /-ээр нийлүүлнэ. тэгээд -neo гэснээс хойшхийг устгана.
  };

  //   const pageObject: any = {};
  const pageObject: any = await preparePageObject(hostObjectV2);

  // console.log("pathname :>> ", pathname);
  //   console.log("pageObjectpageObject :>> ", pageObject);

  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );
  //   console.log("pageObject pageObject :>> ", hostObjectV2);

  return {
    props: {
      hostObject: hostObjectV2,
      ...pageObject,
      //   master:{pageObject},
      notFound: pageObject?.notFound || "false",
      //   ...(await serverSideTranslations(
      //     locale,
      //     ["translate", "common"],
      //     config
      //   )),
    }, // will be passed to the page component as props
  };
}
