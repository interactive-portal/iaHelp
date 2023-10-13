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
  console.log("myMetaTypeId :>> ", myMetaTypeId);
  return (
    <>
      <pre>{JSON.stringify(listConfig, null, 4)}</pre>
    </>
  );

  switch (myMetaTypeId) {
    case "200101010000016": //MetaGroup гэсэн төрөлтэй
      return <RenderWidgetUniversal listConfig={listConfig} />; //belong Jargal
    // case "200101010000011": //BusinessProcess гэсэн төрөлтэй
    //   switch (myActionType) {
    //     case "universalInsert":
    //       console.log("Universal Insert ажиллаж байна. dddd");
    //       return <WidgetInsertProcess listConfig={listConfig} />; //belong Jargal
    //     // case "create":
    //     //   return null;
    //     // case "exist":
    //     //   return null;
    //     // case "console":
    //     //   return null;
    //     // case "update":
    //     //   return null;
    //     case "get":
    //       return <RenderWidgetGetProcess listConfig={listConfig} />; //belong Jargal
    //     // case "consolidate":

    //     //   return null;
    //     // case "view":
    //     //   return (
    //     //     <WidgetViewProcess key={item?.id || index} listConfig={sectionItem} />
    //     //   );
    //     // case "list":
    //     //   return null;
    //     // case "delete":
    //     //   return null;

    //     default: //belong Toogii, Ulaankhuu
    //       return (
    //         <div
    //           className={`w-full h-full new item  ${
    //             widgetnemgooReady?.className || ""
    //           }`}
    //         >
    //           <RenderWidgetProcess
    //             listConfig={listConfig}
    //             headerType={widgetConfigNemgoo}
    //           />
    //         </div>
    //       );
    //   }
  }
  //     default:
  //       //metatypeid байхгүй буюу Meta холбоогүй үед..
  //       return <WidgetNoMeta listConfig={listConfig} />; //belong Jargal
  //   }
}
