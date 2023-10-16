import _ from "lodash";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { createContext, useEffect, useMemo, useState } from "react";

import { useSession } from "next-auth/react";

import toBoolean from "@/lib/booleanFunction";
// import useWidgetHookForm from "@/middleware/components/dataHook/useWidgetHookForm";
import { useCloud } from "hooks/use-cloud";
import { usePage } from "hooks/use-page";
import { useUpdateEffect } from "react-use";
import { positionToPath, renderPositionType } from "@/util/helper";
import {
  prepareDefaultReady,
  prepareDefaults,
  preparePositionAllArray,
  runWidgetDebug,
} from "@/util/widgetHelper";
import WidgetBlocker from "./WidgetBlocker";
import WidgetFold from "./WidgetFold";
import useWidgetHookForm from "@/middleware/dataHook/useWidgetHookForm";

type PropsContextType = {
  config?: any;
  readyDatasrc?: any;
  nemgooDatasrc?: any;
  headerData?: any;
  isDataLoading?: boolean;
  customerReady?: any;
  customerReady2?: any;
  customerReadyFull?: any;
  themeConfigs?: any;
  paging?: any;
  aggregatecolumns?: string;
  defaultValue?: any;
  defaultReady?: any;
  dataMutate?: any;
  onReadyDatasrcSearch?: any;
  widgetnemgooReady?: any;
  setVirtualWidgetnemgooReady?: any;
  positionConfig?: any;
  metaConfig?: any;
  gridJsonConfig?: any;
  pathConfig?: any;
  renderPositionType?: any;
  Title?: any;
  isWorking?: boolean;
  setIsWorking?: any;
  hookForm?: any;
  infinite?: any;
};

const WidgetWrapperContext = createContext<PropsContextType>({});

export const WidgetUniversalWrapper = ({
  config,
  datasrc,
  headerData = {},
  widgetnemgooReady = {},
  themeConfigs = {},
  setVirtualWidgetnemgooReady,
  dataMutate,
  paging,
  aggregatecolumns,
  infinite,
  children,
}: {
  config?: any;
  datasrc?: Array<any>;
  headerData?: Object | null;
  widgetnemgooReady?: any;
  themeConfigs?: any;
  setVirtualWidgetnemgooReady?: any;
  dataMutate?: any;
  fillItem?: any;
  paging?: any;
  aggregatecolumns?: string;
  infinite?: any;
  children?: any;
}) => {
  // const cloudContext = useCloudEngine();
  const cloudContext = useCloud();
  const router = useRouter();
  const { data: session, status }: any = useSession();

  /* ------------------------------------------------------ */
  /*                  CUSTOMER БЭЛДЭХ ХЭСЭГ                 */
  /* ------------------------------------------------------ */

  const customerReady = cloudContext?.customerReady; //яваандаа хэрэггүй болно.
  const customerReady2 = cloudContext?.customerReady2;
  const customerReadyFull = cloudContext?.customerReadyFull;

  // theme
  const isDefaultTheme: boolean =
    toBoolean(widgetnemgooReady?.isDefaultTheme) || false;
  const globalThemeNemgoo = cloudContext?.masterPageNemgooConfig?.theme;
  const globalDesignNemgoo = cloudContext?.masterPageNemgooConfig?.design;
  const widgetDesignNemgoo = widgetnemgooReady?.design;

  const positionConfig = positionToPath(config.bpsectiondtl);
  const metaConfig = config?.metaConfig || {};
  // console.log("🚀 ~ config.widgetcode:", config.widgetcode);
  const { gridJsonConfig, pathConfig } = metaConfig;
  const [isWorking, setIsWorking] = useState(false); //button байлаа гэхэд дарахаар ажиллаж буй төлөвт орох
  const [isDataLoading, setIsDataLoading] = useState(true); //Data авчирч буйг мэдээлэх

  // if (!_.isEmpty(widgetnemgooReady?.empty)) {
  //   console.log("🚀 ~ isDataLoading:", {
  //     isDataLoading,
  //     sss: widgetnemgooReady?.empty,
  //     datasrc,
  //   });
  // }

  /* ------------------------------------------------------ */
  /*              PREPARE WIDGET DATA POSITION              */
  /* ------------------------------------------------------ */
  /* ------------ also filernemgoo, valuenemgoo ----------- */

  //datasrc - undefined байвал loading pulse харуулна.
  useEffect(() => {
    if (datasrc) {
      setIsDataLoading(false);
    }
  }, [datasrc]);

  const readyDatasrcTemp = useMemo(() => {
    const myDataList = preparePositionAllArray(datasrc, positionConfig); //position-уудыг тавьж өгөх
    return _.orderBy(myDataList, (item) => parseInt(item.ordernumber)); //ordernumber талбараар эрэмбэлэх
  }, [datasrc]);

  //! Хумих дээр асуудал үүсээд байсан тул comment болгов.
  useUpdateEffect(() => {
    if (!_.isEqual(readyDatasrc, readyDatasrcTemp)) {
      setReadyDatasrc(readyDatasrcTemp || []);
    }
  }, [readyDatasrcTemp]);

  //Prepare ReadyDatasrc
  const [readyDatasrc, setReadyDatasrc]: any = useState(readyDatasrcTemp || []);

  //Make Filter, Search

  //Widget-ийн дата-д Хайх зэргээр Filter тавьж шүүх үед ажиллана.
  const onReadyDatasrcSearch = ({
    pathName,
    value,
  }: {
    pathName: any;
    value: any;
  }) => {
    const searchedRows =
      _.filter(readyDatasrcTemp, (item: any) => {
        return _.includes(_.lowerCase(item?.[pathName]), _.lowerCase(value));
      }) || [];
    setReadyDatasrc(searchedRows);
  };

  //Widget-ийн дата-д Fold тавьж хумих үед ажиллана.
  const onReadyDatasrcFold = ({
    isFold = false,
    truncateRow = 7,
  }: {
    isFold: boolean;
    truncateRow: number | string;
  }) => {
    // console.log("ddddddd", { isFold, truncateRow });

    const foldedRows = _.slice(
      readyDatasrcTemp,
      0,
      isFold ? Number(truncateRow) : readyDatasrcTemp.length
    );

    // console.log("ddddddd foldedRows", foldedRows);

    setReadyDatasrc((prevState: any) => {
      // return [..._.slice(prevState, 0, 3)];
      return [...foldedRows];
    });
  };

  /* ------------------------------------------------------ */
  /*                         GLOBAL                         */
  /* ------------------------------------------------------ */
  //context руу Widget-ийн mutate зэрэг чухал зүйлсийг хадгална. Бусад widget тэрийг нь дуудах хэрэгцээ гарч байна.
  const widgetId = config?.id;
  const pageContext = usePage();
  const widgetNemgooGlobal = widgetnemgooReady?.global || {
    data: false,
    dataMutate: false,
  };

  useEffect(() => {
    if (widgetNemgooGlobal?.data) {
      const myIndex = widgetNemgooGlobal?.indexFromReadyDatasrc
        ? _.get(readyDatasrc, widgetNemgooGlobal?.indexFromReadyDatasrc)
        : widgetId;

      if (
        !_.isEqual(readyDatasrc, pageContext.kkk[myIndex]?.readyDatasrc) &&
        pageContext.kkk[myIndex]?.dataMutate === undefined &&
        dataMutate !== undefined
        // !_.isEqual(dataMutate, pageContext.kkk[myIndex]?.dataMutate)
      ) {
        pageContext.setKkk((prevState: any) => ({
          ...prevState,
          [myIndex]: {
            ...pageContext.kkk[myIndex],
            readyDatasrc: readyDatasrc || [],
            headerData: headerData || {},
            dataMutate: dataMutate || {},
          },
        }));
      } else if (
        !_.isEqual(readyDatasrc, pageContext.kkk[myIndex]?.readyDatasrc)
      ) {
        pageContext.setKkk((prevState: any) => ({
          ...prevState,
          [myIndex]: {
            ...pageContext.kkk[myIndex],
            readyDatasrc: readyDatasrc || [],
            headerData: headerData || {},
            dataMutate: dataMutate || {},
          },
        }));
      } else if (
        pageContext.kkk[myIndex]?.dataMutate === undefined &&
        dataMutate !== undefined
      ) {
        pageContext.setKkk((prevState: any) => ({
          ...prevState,
          [myIndex]: {
            ...pageContext.kkk[myIndex],
            readyDatasrc: readyDatasrc || [],
            headerData: headerData || {},
            dataMutate: dataMutate || {},
          },
        }));
      }
    }
  }, [
    dataMutate,
    readyDatasrc,
    headerData,
    session?.readyProfile?.profileLastReady,
  ]);

  /* ------------------------------------------------------ */
  /*                      NEMGOODATASRC                     */
  /* ------------------------------------------------------ */
  // const nemgooDatasrc = (widgetnemgooReady?.data || []).map((item: any) => {
  //   return preparePositions(item, positionConfig);
  // });
  const nemgooDatasrc = preparePositionAllArray(
    widgetnemgooReady?.data,
    positionConfig
  );

  //

  /* ------------------------------------------------------ */
  /*                DEBUG-ТАЙ ХОЛБООТОЙ ХЭСЭГ               */
  /* ------------------------------------------------------ */

  runWidgetDebug(widgetnemgooReady, config, readyDatasrc);

  /* ------------------------------------------------------ */
  /*            DEFAULT VALUE-ТАЙ ХОЛБООТОЙ ХЭСЭГ           */
  /* ------------------------------------------------------ */
  const defaultValue = prepareDefaults(widgetnemgooReady, router);
  const defaultReady = prepareDefaultReady(widgetnemgooReady, router);

  /* ------------------------------------------------------ */
  /*               RESPONSIVE ХОЛБООТОЙ ХЭСЭГ               */
  /* ------------------------------------------------------ */
  // const [isOpen, setIsOpen] = useState<boolean>(true);
  // const responsiveNemgoo = widgetnemgooReady?.responsive || {};

  /* ------------------------------------------------------ */
  /*               HOOKFORM БОЛОВСРУУЛАХ ХЭСЭГ              */
  /* ------------------------------------------------------ */

  const { hookForm } = useWidgetHookForm(widgetnemgooReady?.hookForm);

  /* ------------------------------------------------------ */
  /*                   WIDGET ДУУДАХ ХЭСЭГ                  */
  /* ------------------------------------------------------ */
  // console.log("WidgetUniversalWrapper config", config);

  // const RenderComponent: any = useMemo(
  //   () =>
  //     dynamic(
  //       () =>
  //         import(
  //           `@/components/${config.componentpath.toLowerCase()}/${
  //             config.widgetcode
  //           }`
  //         ),
  //       {
  //         // ssr: false,
  //         // suspense: true,
  //         // loading: () => <></>,
  //         // loading: () => (
  //         //   <>
  //         //     <div className="w-full max-w-[250px] ">
  //         //       <div className=" rounded bg-blue-400 text-[#f3f4f6]">
  //         //         Widget path buruu
  //         //         {config.componentpath}
  //         //         <br />
  //         //         {config.widgetcode}
  //         //         <br />
  //         //       </div>
  //         //     </div>
  //         //   </>
  //         // ),
  //       }
  //     ),
  //   // [config, datasrc, widgetnemgooReady, dataMutate, paging, aggregatecolumns]
  //   // [datasrc]
  //   []
  // );

  const DynamicWidget = dynamic(
    () =>
      import(
        `@/components/${config.componentpath.toLowerCase()}/${
          config.widgetcode
        }`
      ),
    {
      loading: () => (
        <p>
          {" "}
          <span className="flex flex-col">
            path:{config.componentpath.toLowerCase()}
            name:{config.widgetcode}
          </span>
        </p>
      ),
    }
  );

  return (
    <WidgetWrapperContext.Provider
      value={{
        config,
        readyDatasrc,
        headerData,
        nemgooDatasrc,
        isDataLoading,
        customerReady,
        customerReady2,
        customerReadyFull,
        themeConfigs,
        paging,
        aggregatecolumns,
        defaultValue,
        defaultReady,
        onReadyDatasrcSearch,
        dataMutate,
        widgetnemgooReady,
        setVirtualWidgetnemgooReady,
        positionConfig,
        metaConfig,
        gridJsonConfig,
        pathConfig,
        renderPositionType,
        isWorking,
        setIsWorking,
        hookForm,
        infinite,
      }}
    >
      <WidgetBlocker
        widgetnemgooReady={widgetnemgooReady}
        gridJsonConfig={gridJsonConfig}
        onReadyDatasrcSearch={onReadyDatasrcSearch}
        readyDatasrc={readyDatasrc}
        headerData={headerData}
        nemgooDatasrc={nemgooDatasrc}
        isDataLoading={isDataLoading}
      >
        <DynamicWidget />

        {/* <WidgetFold
          foldObject={widgetnemgooReady?.fold}
          onReadyDatasrcFold={onReadyDatasrcFold}
        /> */}
        {children}
      </WidgetBlocker>
    </WidgetWrapperContext.Provider>
  );
};

export default WidgetWrapperContext;
