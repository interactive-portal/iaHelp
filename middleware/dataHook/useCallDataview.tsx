import { useCloud } from "hooks/use-cloud";
import _ from "lodash";
import callApi from "./callApi";
import usePrepareStandard from "./usePrepareStandard";

const useCallDataview = () => {
  const cloudContext = useCloud();
  const metaNameV2 = cloudContext.hostObject.metaNameV2;
  const { standard } = usePrepareStandard();

  const callDataview = async ({
    // command = "PL_MDVIEW_005", //dataview дээр шаардлагагүй.
    metaid = "",
    metacode = "",
    paging = undefined,
    criteria = undefined,
    moreRequest = null,
    silent = false,
    setIsWorking = (isWorking: boolean) => {},
    event = {},
    resultConfig = {
      notification: {
        duration: 4.5,
        placement: "bottomRight",
      },
    },
    notificationMessage = "",
    notificationDescription = "",
    className = "",
    customProps = {}, //debug-тай холбоотой зүйлс байна.
  }: {
    metaid?: string;
    metacode?: string;
    paging?: any;
    criteria?: any;
    moreRequest?: any;
    silent?: boolean;
    setIsWorking?: any;
    event?: any;
    resultConfig?: any;
    notificationMessage?: string;
    notificationDescription?: string;
    className?: string;
    customProps?: any;
  }) => {
    setIsWorking(true);

    const myParams = {
      metaid,
      metacode,
      paging: JSON.stringify(paging),
      criteria: JSON.stringify(criteria),
      moreRequest: JSON.stringify(moreRequest),
      standard: JSON.stringify(standard),
      customProps: JSON.stringify(customProps),
      metaNameV2: metaNameV2,
    };

    // console.log("--------------useCallDataview myParams", myParams);

    const result: any = await callApi({
      api: `/api/get-data-v2?metaid=${myParams.metaid}&metacode=${myParams.metacode}&criteria=${myParams.criteria}&paging=${myParams.paging}&morerequest=${myParams.moreRequest}&standard=${myParams.standard}&customProps=${myParams.customProps}&metaNameV2=${myParams.metaNameV2}`,
      resultConfig: resultConfig,
      event: event,
      notificationMessage: notificationMessage,
      notificationDescription: notificationDescription,
      silent,
      // className: className,
    });

    // console.log("useCallDataview result", result);
    /* -------------------- prepare Data -------------------- */
    let aggregatecolumns: string = "";
    let resultPaging: any = {};

    let dataReady = result?.result;
    if (result?.result) {
      aggregatecolumns = result?.result?.aggregatecolumns;
      resultPaging = result?.result?.paging;
      dataReady = _.values(_.omit(dataReady, ["aggregatecolumns", "paging"]));
    }

    //CONFIG авчирч, position тавих ажил эхэлж байна. Дараа нь янзлах ажил гарч магадгүй.

    //! Энийг түр орхиё.

    // const parameters2 = JSON.stringify({
    //   id: metaid,
    // });

    // const result2 = await callApi({
    //   api: `/api/get-process-v2?command=META_DATA_MOBILE_004&parameter=${parameters2}&metaName=${metaName}`,
    //   silent: false,
    // });

    // console.log("XXXXXXXXXXXX", result2);

    // const bpsectiondtl = _.values(listConfig.bpsectiondtl);

    // const positionConfig = positionToPath(bpsectiondtl);

    // const readyDatasrc = useMemo(
    //   () =>
    //     (dataReady || []).map((item: any) => {
    //       return preparePositions(item, positionConfig);
    //     }),
    //   [dataReady]
    // );

    setIsWorking(false);

    return dataReady;
  };

  return { callDataview };
};

export default useCallDataview;
