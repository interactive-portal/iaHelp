import { WidgetUniversalWrapper } from "@engineBox/Wrapper/WidgetUniversalWrapper";
import RenderNotice from "@/components/common/Notice/RenderNotice";
import { useCloud } from "hooks/use-cloud";
import _ from "lodash";
import useWidgetConfigSWR from "middleware/components/dataHook/useWidgetConfigSWR";
import useWidgetDataSWR from "middleware/components/dataHook/useWidgetDataSWR";
import { useRouter } from "next/router";
import { useState } from "react";
import { toBoolean } from "util/helper";
import useWidgetDataSWRInfinite from "../dataHook/useWidgetDataSWRInfinite";

export default function RenderWidgetUniversal({
  listConfig,
}: {
  listConfig: any;
}) {
  const cloudContext = useCloud();
  const router = useRouter();

  /* ----------------------- consts ----------------------- */
  const widgetnemgooReady = listConfig.widgetnemgooReady;
  const ghost =
    toBoolean(widgetnemgooReady?.ghost || "0") ||
    toBoolean(cloudContext?.cloudURL?.query?.silent || "0");
  const skeletonNemgoo = widgetnemgooReady?.skeleton || {};
  const [virtualWidgetnemgooReady, setVirtualWidgetnemgooReady] =
    useState(widgetnemgooReady);
  const apiConfigNemgoo = widgetnemgooReady?.apiConfig; //"infinite": "1",

  /* --------------------- data useSWR -------------------- */
  const [dataSrc, dataError, dataMutate, paging, aggregatecolumns, infinite] =
    toBoolean(apiConfigNemgoo?.infinite || false)
      ? useWidgetDataSWRInfinite({
          metadataid: listConfig.metadataid,
          metadatacode: listConfig.metadatode,
          virtualWidgetnemgooReady,
        })
      : useWidgetDataSWR({
          metadataid: listConfig.metadataid,
          metadatacode: listConfig.metadatode,
          virtualWidgetnemgooReady,
        });

  const themeConfigs = {};

  /* -------------------- config useSWR ------------------- */
  // const metaConfigAll = { haha: "" };
  // const metaConfigError = null;
  // const metaConfigMutate = null;
  const [metaConfigAll, metaConfigError, metaConfigMutate = {}] =
    useWidgetConfigSWR({
      metadataid: listConfig.metadataid,
      metadatacode: listConfig.metadatacode,
      widgetnemgooReady: virtualWidgetnemgooReady,
    });
  // const [metaConfigAll, metaConfigError, metaConfigMutate = {}] = [{}, {}, {}];

  //datasrc
  if (dataError) return <div>Meta дата дуудаж чадсангүй. Алдаа өгч байна.</div>;

  if (!ghost) {
    // Энийг түрдээ RenderAtom руу хийгээд үзье
    // if (!dataSrc) {
    //   return (
    //     <RenderNotice
    //       renderType={skeletonNemgoo?.type || "skeleton"}
    //       customProps={{
    //         type: "SkeletonSimple",
    //         title: { title: "loading data" },
    //         fillColor: "#e5e7eb",
    //         ...skeletonNemgoo?.props,
    //       }}
    //     />
    //   );
    // }

    if (metaConfigError) {
      return (
        <>
          {/* Яг энд Next13-ын алдаа гарч буй. Явсаар байгаад RenderAtom дотор dynamic дуудахдаа suspense:true гээд зүгээр болсон. */}
          <RenderNotice
            renderType="error"
            customProps={{
              title: { title: "can't load meta config" },
              customClassName: "max-w-xs",
            }}
          />
        </>
      );
    }

    if (!metaConfigAll) {
      return (
        <>
          {/* <RenderNotice
          renderType="skeleton"
          customProps={{
            type: "SkeletonSimple",
            title: { title: "loading metaConfig" },
          }}
          /> */}
        </>
      );
    }
  }

  const configReady = {
    ...listConfig,
    metaConfig: metaConfigAll,
    widgetnemgooReady: widgetnemgooReady,
    bpsectiondtl: _.values(listConfig.bpsectiondtl),
  };

  return (
    <WidgetUniversalWrapper
      config={configReady}
      widgetnemgooReady={virtualWidgetnemgooReady}
      themeConfigs={themeConfigs}
      setVirtualWidgetnemgooReady={setVirtualWidgetnemgooReady}
      datasrc={dataSrc}
      headerData={null}
      dataMutate={dataMutate}
      paging={paging}
      aggregatecolumns={aggregatecolumns}
      infinite={infinite}
    />
  );
}
