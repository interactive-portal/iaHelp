import { useCloud } from "hooks/use-cloud";
import _ from "lodash";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import * as prepareSWR from "@/util/prepareSWR";
import usePrepareStandard from "./usePrepareStandard";
import { prepareQueryString } from "@/util/widgetHelper";

export default function useWidgetDataSWR({
  metadataid,
  metadatacode,
  virtualWidgetnemgooReady,
}: {
  metadataid?: string;
  metadatacode?: string;
  virtualWidgetnemgooReady?: any;
}) {
  const cloudContext = useCloud();
  const { standard } = usePrepareStandard();
  // console.log("🚀 ~ useWidgetDataSWR ~ standardf", standard);
  /* --------------------- metaNameV2 --------------------- */
  const metaNameV2 = cloudContext.hostObject.metaNameV2;

  const { data: session, status }: any = useSession();

  const criteriaNemgoo = virtualWidgetnemgooReady?.criteria;

  const dvOptions = {
    language: cloudContext.cloudURL.asPathDomain.locale || "mn",
    userSession: session?.dbsessionid || "",
  };

  /* ------------------------------------------------------ */
  /*                      EXTERNAL API                      */
  /* ------------------------------------------------------ */

  // WidgetNoMeta руу орж байгаа тул тэнд ажиллана.
  //! Яваандаа WidgetNoMeta-ийг устгаж, энд шингээнэ.

  /* ----------------- prepare Parameters ----------------- */
  const myCriteria = prepareSWR.prepareCriteriaWidget(
    criteriaNemgoo,
    metadataid
  );

  const myPaging = prepareSWR.preparePaging(criteriaNemgoo);
  const customProps = virtualWidgetnemgooReady?.apiConfig || {};

  /* ------------------------------------------------------ */
  /*                  PREPARE PARAMETERS V2                 */
  /* ------------------------------------------------------ */
  const myParametersV2 = prepareSWR.prepareParametersV2(
    virtualWidgetnemgooReady?.parameters
  );

  const myParams = {
    metaid: metadataid,
    metacode: metadatacode,
    paging: JSON.stringify(myParametersV2?.paging) || myPaging,
    criteria: JSON.stringify(myParametersV2?.criteria) || myCriteria,
    moreRequest: undefined,
    standard: JSON.stringify(standard),
    customProps: JSON.stringify(customProps),
    metaNameV2: metaNameV2,
  };

  /* ------------------------------------------------------ */
  /*                        CALL API                        */
  /* ------------------------------------------------------ */
  // let { data, error, mutate } = useSWR(
  //   `/api/get-data-v2?metaid=${myParams.metaid}&metacode=${myParams.metacode}&criteria=${myParams.criteria}&paging=${myParams.paging}&${dvOptions}&standard=${myParams.standard}&customProps=${myParams.customProps}&metaNameV2=${myParams.metaNameV2}`
  // );
  //jagaa fixed - remove dvOptions and debug
  let { data, error, mutate } = useSWR(
    `/api/get-data-v2?${prepareQueryString(myParams)}`
  );

  /* ------------------------------------------------------ */
  /*                      PREPARE DATA                      */
  /* ------------------------------------------------------ */
  let aggregatecolumns: string = "";
  let paging: any = {};

  let dataReady: any = data?.result;
  if (data?.result) {
    aggregatecolumns = data?.result?.aggregatecolumns;
    paging = data?.result?.paging;
    dataReady = _.values(_.omit(dataReady, ["aggregatecolumns", "paging"]));
  }

  /* ----------------------- return ----------------------- */
  return [dataReady, error, mutate, paging, aggregatecolumns, null];
}
