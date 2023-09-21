import WidgetWrapperContext from "@/components/widget/WidgetWrapper";
import React, { useContext } from "react";

export default function ErpGrid() {
  const {
    config,
    readyDatasrc,
    // positionConfig,
    // metaConfig,
    // gridJsonConfig,
    // pathConfig,
    widgetnemgooReady,
  } = useContext(WidgetWrapperContext);

  const options = widgetnemgooReady?.options;

  return <div>ErpGrid</div>;
}
