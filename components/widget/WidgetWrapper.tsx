import { createContext, useMemo } from "react";
import dynamic from "next/dynamic";
import _ from "lodash";
import {
  preparePositionAllArray,
  preparePositions,
} from "@/utils/widgetHelper";
import { jsonParse } from "@/utils/helper";
type PropsContextType = {
  config?: any;
  readyDatasrc?: any;
  customerReady?: any;
  widgetnemgooReady?: any;
  positionConfig?: any;
};

const WidgetWrapperContext = createContext<PropsContextType>({});

export const WidgetWrapper = ({
  config,
  datasrc = [],
  widgetnemgooReady,
  positionConfig,
  setVirtualWidgetnemgooReady,
  dataMutate,
  paging,
  aggregatecolumns,
  children,
}: {
  config?: any;
  datasrc?: Array<any>;
  headerData?: Object | null;
  widgetnemgooReady?: any;
  positionConfig?: any;
  setVirtualWidgetnemgooReady?: any;
  dataMutate?: any;
  fillItem?: any;
  paging?: any;
  aggregatecolumns?: string;
  children?: any;
}) => {
  const readyDatasrcTemp = useMemo(
    () => preparePositionAllArray(datasrc, positionConfig),
    [datasrc]
  );
  // console.log("object positionConfig :>> ", datasrc);

  const readyDatasrc = readyDatasrcTemp;
  const RenderComponent: any = useMemo(
    () =>
      dynamic(
        () =>
          import(
            `../../components/${config.componentpath.toLowerCase()}/${
              config.widgetcode
            }`
          ),
        {
          loading: () => <span></span>,
        }
      ),

    []
  );

  const otherStyle = jsonParse(config.widgetnemgoo);
  return (
    <div
      className={`
       ${widgetnemgooReady?.design?.className || ""}
        ${otherStyle?.sectionClassName}`}
      style={widgetnemgooReady?.design?.style || widgetnemgooReady?.style}
      attr-data={config.widgetcode}
      attr-code={config.code}>
      <WidgetWrapperContext.Provider
        value={{
          config,
          readyDatasrc,
          widgetnemgooReady,
          positionConfig,
        }}>
        <RenderComponent />
      </WidgetWrapperContext.Provider>
    </div>
  );
};

export default WidgetWrapperContext;
