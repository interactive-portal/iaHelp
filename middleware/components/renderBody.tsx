import _ from "lodash";
import RenderSections from "./renderSections";

const RenderBody = ({
  hostObject,
  readyMergedPageConfig,
  meta_bp_layout_section,
  mergedPageNemgoo,
  masterPageNemgooConfig,
  ouchError,
  pageHeadMeta,
}: {
  hostObject?: object;
  readyMergedPageConfig?: any;
  meta_bp_layout_section?: any;
  mergedPageNemgoo?: any;
  masterPageNemgooConfig?: any;
  layoutConfig?: any;
  ouchError?: any;
  pageHeadMeta?: any;
}) => {
  //   useCloudRender({
  //     readyMergedPageConfig,
  //     masterPageNemgooConfig,
  //     hostObject,
  //     pageHeadMeta,
  //   });

  // console.log("object :>> ", hostObject);
  if (ouchError) return "no data";

  const bodyDefault = masterPageNemgooConfig?.bodyDefault || {};
  const readyPagenemgoo = readyMergedPageConfig?.readyPagenemgoo;
  const widgetList = _.find(mergedPageNemgoo, { sectionCode: "body" });
  // console.log("widgetList :>> ", widgetList.children);
  // console.log("mergedPageNemgoo :>> ", masterPageNemgooConfig);

  return (
    <main className={bodyDefault?.className || "main"}>
      <RenderSections
        mergedLayout={widgetList.children}
        rawWidgetList={meta_bp_layout_section}
        customClassName="h-full"
      />
    </main>
  );
};

export default RenderBody;
