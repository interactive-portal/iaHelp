import useSWR from "swr";
import _ from "lodash";
import { useRouter } from "next/router";
import fetchJson, { jsonParse } from "@/utils/helper";
import { useEffect, useState } from "react";
import { config } from "process";

const useWidgetDataSWR = (listConfig?: any) => {
  const { locale } = useRouter();
  const options = jsonParse(listConfig?.widgetnemgoo);
  const [dataReady, setReadyData] = useState<any>();
  const widgetnemgooReady = listConfig?.widgetnemgooReady;
  const metadataid = listConfig?.metadataid;
  const criteriaNemgoo = widgetnemgooReady?.criteria;
  const metaName = widgetnemgooReady?.metaConfig?.host?.metaName || "metaDev";
  const myDebug = widgetnemgooReady?.metaConfig?.debug || "0";

  const myCriteria = JSON.stringify(criteriaNemgoo);
  const myPaging = {};
  // if (!metadataid) return [];
  //options?.data
  // console.log("locale :>> ", locale);

  const fetchData = async () => {
    if (metadataid) {
      const data = await fetchJson(
        `/api/get-data?metaid=${metadataid}&criteria=${myCriteria}&pagingwithoutaggregate=1&paging=${myPaging}&lang=${locale}`
      );
      setReadyData(data.result);
    } else {
      setReadyData(options?.data);
    }
    // console.log("fetchData fetchData", data);
  };
  // console.log("config :>> ", dataReady);

  useEffect(() => {
    if (!dataReady) fetchData();
  }, []);

  /* --------------------- Call useSWR -------------------- */
  let { error, mutate }: any = {};

  /* -------------------- prepare Data -------------------- */
  let aggregatecolumns: string = "";
  let paging: any = {};

  // let dataReady = data?.result;
  // if (dataReady) {
  //   aggregatecolumns = dataReady?.aggregatecolumns;
  //   paging = dataReady?.paging;
  //   dataReady = _.values(_.omit(dataReady, ["aggregatecolumns", "paging"]));
  // } else {
  //   dataReady = options?.data || [];
  // }

  /* ----------------------- return ----------------------- */
  return [dataReady, error, mutate, paging, aggregatecolumns];
};

export default useWidgetDataSWR;
