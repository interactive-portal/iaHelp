import BlockDiv from "@/components/common/block/blockDiv";
import WidgetWrapperContext from "@/components/widget/WidgetWrapper";
import { listToTree, prepareIsOpen } from "@/utils/helper";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import TreeMain from "../Tree/TreeMain";
import _ from "lodash";
import Link from "next/link";
import { Empty } from "antd";
import Search from "./search";

export default function TreeMenu() {
  const router = useRouter();
  const { config, readyDatasrc, widgetnemgooReady, positionConfig } =
    useContext(WidgetWrapperContext);
  const [datas, setDatas] = useState<any>(readyDatasrc);
  const [selectedId, setSelectedId] = useState<any>(
    router.query?.id || "16861245454069"
  );

  useEffect(() => {
    if (!datas) {
      setDatas(readyDatasrc);
    }
  }, []);

  if (_.isEmpty(readyDatasrc)) return <>no menu</>;

  const treeReadyDatasrc: any = prepareIsOpen(
    listToTree(readyDatasrc, {
      idKey: widgetnemgooReady?.listconfig?.filedid || "id",
      parentKey: widgetnemgooReady?.listconfig?.fieldparentid || "parentid",
      childrenKey: "children",
    }),
    selectedId,
    positionConfig
  )[0];

  return (
    <>
      <BlockDiv
        customClassName="p-0  rounded-[10px] px-2 py-2"
        divNumber="TreeMenuDiv">
        <h2 className="pb-3 text-xl">Шүүлт</h2>
        <div className="h-full mt-2">
          <Search />
          <div className="overflow-y-auto p-4 rounded-[10px] shadow-xl bg-white scrollbar-thumb-gray-500 scrollbar-track-gray-200 scrollbar-thin hover:scrollbar-thumb-gray-700 scrollbar-thumb-rounded-full">
            <div className="w-full ">
              <h2 className="pb-4 font-medium">Ангилал</h2>
              <TreeMain
                rawDatasrc={treeReadyDatasrc}
                data={readyDatasrc}
                color="#699BF7"
                customClassName="w-full"
                defaultSelectedId={selectedId}
                indent={5}
                itemStyle={widgetnemgooReady?.itemStyle}
              />
              {/* <Menu
                  mode="inline"
                  openKeys={openKeys}
                  onOpenChange={onOpenChange}
                  style={{ width: "100%" }}
                  items={treeReadyDatasrc}
                /> */}
            </div>
          </div>
        </div>
      </BlockDiv>
    </>
  );
}
