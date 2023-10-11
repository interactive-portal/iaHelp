import { getDataView } from "@/lib/serverFunctions";
import { jsonParse } from "@/utils/helper";
import useWidgetDataSWR from "./useWidgetConfigSWR";

export default function useWidgetData(listConfig: any) {
  const options = jsonParse(listConfig?.widgetnemgoo);
  let dataReady: any = options?.data || [];
  let error: any;
  let mutate: any = {};
  let aggregatecolumns: string = "";
  let paging: any = {};
  // console.log("result widgetCode", listConfig);

  return useWidgetDataSWR(listConfig);

  /* ----------------------- return ----------------------- */
  return [dataReady, error, mutate, paging, aggregatecolumns];
}
