import BlockDiv from "@/components/common/Block/BlockDiv";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import TreeMain from "@/components/custom/tree/TreeMain";
// import { AtomSearch } from "@components/common/Atom";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { listToTree, prepareIsOpen } from "util/helper";

export default function TreeMenu() {
  const {
    config,
    readyDatasrc,
    widgetnemgooReady,
    positionConfig,
    metaConfig,
    gridJsonConfig,
    themeConfigs,
    pathConfig,
  } = useContext(WidgetWrapperContext);
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<any>(
    router.query?.[widgetnemgooReady?.listconfig?.fieldid || "item"]
  );

  const treeReadyDatasrc: any = listToTree(readyDatasrc, {
    idKey: "id",
    parentKey: "parentid",
    childrenKey: "children",
  });
  if (readyDatasrc.length !== 0) {
    if (selectedId == undefined) {
      if (treeReadyDatasrc.length === 0) {
        setSelectedId(
          readyDatasrc[0]?.id ||
            readyDatasrc[0]?.[widgetnemgooReady?.listconfig?.fieldid || "item"]
        );
      } else {
        setSelectedId(
          treeReadyDatasrc[0]?.id ||
            treeReadyDatasrc[0]?.[
              widgetnemgooReady?.listconfig?.fieldid || "item"
            ]
        );
      }
    }
  }

  return (
    <>
      <BlockDiv
        customClassName="p-0 rounded-[10px] px-2 py-2"
        divNumber="TreeMenuDiv"
      >
        <div className="h-full ">
          <span className="">{/* <AtomSearch item={readyDatasrc} /> */}</span>

          <div className="overflow-y-auto scrollbar-thumb-gray-500 scrollbar-track-gray-200 scrollbar-thin hover:scrollbar-thumb-gray-700 scrollbar-thumb-rounded-full">
            <div className="w-full ">
              <TreeMain
                rawDatasrc={
                  treeReadyDatasrc.length > 0 ? treeReadyDatasrc : readyDatasrc
                }
                color="#699BF7"
                customClassName="w-full"
                defaultSelectedId={selectedId}
                indent={5}
                itemStyle={widgetnemgooReady?.itemStyle}
              />
            </div>
          </div>
        </div>
      </BlockDiv>
    </>
  );
}

// "className": "h-auto col-span-12 md:min-w-[380px] md:max-w-[420px]",
// "style":{
//     "minWidth":"380px"
//   },