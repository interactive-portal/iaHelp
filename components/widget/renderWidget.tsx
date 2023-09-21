import { createContext, FC, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { WidgetWrapper } from "./WidgetWrapper";
import _ from "lodash";
import { getDataView } from "@/lib/serverFunctions";
import useWidgetData from "./useData";

const RenderWidget = ({ listConfig }: { listConfig: any }) => {
  /* ----------------------- consts ----------------------- */

  // if (_.isEmpty(listConfig)) return null;

  const widgetnemgooReady = listConfig?.widgetnemgooReady;

  const [dataSrc, dataError, dataMutate, paging, aggregatecolumns] =
    useWidgetData(listConfig);

  // console.log("datasrc", dataSrc);
  const configReady = {
    ...listConfig,
    metaConfig: [],
    widgetnemgooReady: widgetnemgooReady,
    bpsectiondtl: _.values(listConfig.bpsectiondtl),
  };
  return (
    <WidgetWrapper
      config={configReady}
      widgetnemgooReady={widgetnemgooReady}
      setVirtualWidgetnemgooReady={widgetnemgooReady}
      datasrc={dataSrc}
      positionConfig={_.values(listConfig.bpsectiondtl)}
      headerData={null}
      dataMutate={dataMutate}
      paging={paging}
      aggregatecolumns={aggregatecolumns}
    />
  );
};

export default RenderWidget;
