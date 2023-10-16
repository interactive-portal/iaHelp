import _ from "lodash";
import RenderWidgetUniversal from "./WidgetStandart/RenderWidgetUniversal";

export default function SectionWidgetChoose({
  listConfig,
}: {
  listConfig: any;
}) {
  const widgetnemgooReady = listConfig.widgetnemgooReady;
  if (widgetnemgooReady?.isShow === "0") return null;

  const widgetConfigNemgoo = widgetnemgooReady?.widget;
  const myMetaTypeId = widgetConfigNemgoo?.metatypeid || listConfig.metatypeid;
  const myActionType = widgetConfigNemgoo?.actiontype || listConfig.actiontype;
  // console.log("myMetaTypeId :>> ", myMetaTypeId);

  var itemSection = _.omit(listConfig, ["otherattr", "widgetnemgoo"]);
  // console.log("sssss :>> ", itemSection);
  // return (
  //   <div className="h-96">
  //     <pre>{JSON.stringify(itemSection, null, 2)}</pre>
  //   </div>
  // );

  return (
    <div data-widgetName={itemSection?.widgetcode}>
      <RenderWidgetUniversal listConfig={itemSection} />
    </div>
  );

  switch (myMetaTypeId) {
    case "200101010000016": //MetaGroup гэсэн төрөлтэй
      return <RenderWidgetUniversal listConfig={itemSection} />; //belong Jargal
    default: //belong Toogii, Ulaankhuu
      return (
        <div
          className={`w-full h-full new item  ${
            widgetnemgooReady?.className || ""
          }`}
        >
          test
        </div>
      );
  }
  //     default:
  //       //metatypeid байхгүй буюу Meta холбоогүй үед..
  //       return <WidgetNoMeta listConfig={listConfig} />; //belong Jargal
  //   }
}
