import { useEffect, useState } from "react";
import RenderBody from "@/middleware/components/renderBody";
import _ from "lodash";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { FC } from "react";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import LeftSideMenu from "@/components/project/community/leftSideMenu";
import RightSideUsers from "@/components/project/community/rightSideUsers";
import NationHeader from "@/components/project/community/nationHeader";
import CommunityUnderDevelopment from "@/components/project/community/pages/community-group-detail/communityUnderDevelopment";
import { getCookie } from "cookies-next";
import BlockDiv from "@/components/common/Block/BlockDiv";
import RenderSections from "@/middleware/components/renderSections";
import { preparePageObject } from "@/util/prepareDetect";

type PropsType = {
  hostObject: object;
  readyMergedPageConfig: any;
  meta_bp_layout_section: any;
  mergedPageNemgoo: any;
  masterPageNemgooConfig: any;
  ouchError?: any;
};

const index: FC<PropsType> = ({
  hostObject,
  readyMergedPageConfig,
  meta_bp_layout_section: rawWidgetList,
  mergedPageNemgoo,
  masterPageNemgooConfig, //masterPage-ийн pageNemgoo-ийн config юм байна.
  ouchError,
}: {
  hostObject: object;
  readyMergedPageConfig: any;
  meta_bp_layout_section: any;
  mergedPageNemgoo: any;
  masterPageNemgooConfig: any;
  ouchError?: any;
}) => {
  const router = useRouter();
  const { query } = router;
  const { data: session } = useSession();
  const portalName = getCookie("authPortal");
  // const hasCookie = cookiesList.has("authPortal");
  // console.log("cook info :>> ", info);

  return (
    <BlockDiv customClassName="flex h-screen">
      <BlockDiv customClassName="flex-1 flex flex-col overflow-hidden">
        <header className="flex justify-between items-center">
          <NationHeader options={portalName} />
        </header>
        <BlockDiv customClassName="flex h-full">
          <nav className="hidden w-[85px] h-full lg:flex">
            <BlockDiv customClassName="w-full flex">
              <BlockDiv customClassName="w-full h-full flex items-center justify-center">
                <LeftSideMenu />
              </BlockDiv>
            </BlockDiv>
          </nav>
          <main
            className="flex flex-col w-full bg-white overflow-x-hidden overflow-y-auto mb-14"
            style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
          >
            <BlockDiv customClassName="flex w-full">
              <BlockDiv customClassName="flex flex-col w-full h-full">
                {_.isEmpty(readyMergedPageConfig) ? (
                  <CommunityUnderDevelopment />
                ) : (
                  <RenderBody
                    hostObject={hostObject}
                    readyMergedPageConfig={readyMergedPageConfig}
                    meta_bp_layout_section={rawWidgetList}
                    mergedPageNemgoo={mergedPageNemgoo}
                    masterPageNemgooConfig={masterPageNemgooConfig}
                    ouchError={ouchError}
                  />
                )}
              </BlockDiv>
            </BlockDiv>
            <style>
              {`
                ::-webkit-scrollbar {
                width: 5px;
                background:transparent;
              }

              ::-webkit-scrollbar-thumb {
                background: #f3755c;
                border-radius: 5px;
              }

              ::-webkit-scrollbar-thumb:hover {
                background: #f3755c82;
              }
              `}
            </style>
          </main>
          <nav className="hidden w-[85px] h-full lg:flex">
            <BlockDiv customClassName="w-full flex">
              <BlockDiv customClassName="w-full h-full flex items-center justify-center">
                <RightSideUsers />
              </BlockDiv>
            </BlockDiv>
          </nav>
        </BlockDiv>
      </BlockDiv>
    </BlockDiv>
  );
};

export const getServerSideProps: GetServerSideProps<{}> = async (
  context: any
) => {
  const { query } = context;
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: "/community",
  //       permanent: false,
  //     },
  //   };
  // }

  if (query?.dm) {
    context.res.setHeader("set-cookie", `authPortal=${query?.dm}`);
  }

  let pageSlug = context?.query?.page || "community/home";

  const hostObjectV2 = {
    domainType: process.env.HOSTOBJECTV2_DOMAINTYPE || "DEFAULT",
    metaNameV2: process.env.HOSTOBJECTV2_METANAMEV2 || "LOCAL",
    pageDomain: "nation", //эхний үгийг авна.
    pageSlug: pageSlug, //дараагийн үгүүдийг /-ээр нийлүүлнэ. тэгээд -neo гэснээс хойшхийг устгана.
  };

  //   console.log("hostObjectv2", hostObjectV2);

  const pageObject: any = await preparePageObject(hostObjectV2);

  // console.log("pageObject", hostObjectV2);

  /* ----------------------- return ----------------------- */
  return {
    props: {
      hostObject: hostObjectV2,
      ...pageObject,
    },
  };
};

export default index;

function preparePageObjectV2(hostObjectV2: {
  domainType: string;
  metaNameV2: string;
  pageDomain: string; //эхний үгийг авна.
  pageSlug: any;
}): any {
  throw new Error("Function not implemented.");
}
// function preparePageObjectV2(hostObjectV2: {
//   domainType: string;
//   metaNameV2: string;
//   pageDomain: string; //эхний үгийг авна.
//   pageSlug: any;
// }): any {
//   throw new Error("Function not implemented.");
// }
// function preparePageObjectV2(hostObjectV2: {
//   domainType: string;
//   metaNameV2: string;
//   pageDomain: string; //эхний үгийг авна.
//   pageSlug: any;
// }): any {
//   throw new Error("Function not implemented.");
// }
// page -cozy
// slug -home
//

// nation/cozy
// redirect → cozy/home?master=nation

// cozy?master=nation

// nation.veritech.mn/cozy
// nation.mn/cozy/product/detail?id=1548484354515

// localhost:3000/nation/cozy/product/detail?id=1548484354515
// redirect → cozy/product/detail?nation=true&id=1548484354515

// AtomLinkV2

// /product/detail?id=1548484354515
// domain - cozy

// nation.mn/cozy/product/detail?id=1548484354515

// domain - nation
// slug - cozy/product/detail
