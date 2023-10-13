import _ from "lodash";
import { useRouter } from "next/router";

import DebugWidget from "@components/cloud/Custom/Default/DebugWidget";
import { WidgetUniversalWrapper } from "@engineBox/Wrapper/WidgetUniversalWrapper";
import { prepareRawUrlQueryToCriteria } from "@engineBox/util/urlHelper";
import { toBoolean } from "util/helper";
import useCallExternalAPI from "../dataHook/useCallExternalAPI";
import useCallListMetaverse from "../dataHook/useCallListMetaverse";
import { useEffect, useState } from "react";

const WidgetNoMeta = ({ listConfig }: { listConfig: any }) => {
  // if (_.isEmpty(listConfig)) return null;
  // console.log("killer", listConfig);

  const widgetnemgooReady = listConfig.widgetnemgooReady;
  const ghost = toBoolean(widgetnemgooReady?.ghost || "0");
  const isLoading = widgetnemgooReady?.isLoading || null;
  const router = useRouter();

  let rawCriteria = "";
  if (!toBoolean(widgetnemgooReady?.ignorecriteria || false)) {
    rawCriteria = prepareRawUrlQueryToCriteria(router.query);
  }

  // externalAPI
  const [dataSrcExternalApi] = useCallExternalAPI({
    externalApiNemgoo: widgetnemgooReady?.externalApi,
  });

  // metaverse
  const {
    dataSrcMetaverse,
    pagingMetaverse,
    detailMetaverse,
    errorAPI,
    mutateAPI,
  } = useCallListMetaverse({
    metaverseNemgoo: widgetnemgooReady?.metaverse,
  });

  // console.log("🚀 ~ WidgetNoMeta ~ dataSrcMetaverse:", dataSrcMetaverse);
  // const dataSrcMetaverse: any = [];

  const datasrc = !_.isEmpty(dataSrcExternalApi)
    ? dataSrcExternalApi
    : !_.isEmpty(dataSrcMetaverse)
      ? dataSrcMetaverse
      : widgetnemgooReady?.data || [];

  // console.log("🚀 ~ WidgetNoMeta ~ datasrc haha:", datasrc);

  /* ------------------------------------------------------ */
  /*                          NEXT                          */
  /* ------------------------------------------------------ */
  const metaConfig = {
    gridJsonConfig: {},
    pathConfig: [],
  };

  const configReady = {
    ...listConfig,
    metaConfig,
    widgetnemgooReady: widgetnemgooReady,
    bpsectiondtl: _.values(listConfig.bpsectiondtl),
  };
  // console.log("🚀 ~ configReady", configReady);

  //jagaa - url-д layout=raw гэсэн байвал бүх widget-ийг хэвлэхгүй
  if (router?.query?.layout === "raw") {
    return (
      <DebugWidget
        listConfig={listConfig}
        config={configReady}
        widgetnemgooReady={widgetnemgooReady}
        datasrc={datasrc}
      />
    );
  }

  return (
    <WidgetUniversalWrapper
      config={configReady}
      widgetnemgooReady={widgetnemgooReady}
      datasrc={datasrc}
      dataMutate={mutateAPI}
    />
  );
};

export default WidgetNoMeta;
