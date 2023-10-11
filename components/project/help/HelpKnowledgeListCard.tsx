import { useContext, useState } from "react";
import { Tabs } from "antd";
import _ from "lodash";
import WidgetWrapperContext from "@/components/widget/WidgetWrapper";
import RenderAtom from "@/components/common/atom/renderAtom";
import Horizantal from "./horicantal";

const HelpKnowledgeListCard = () => {
  const { widgetnemgooReady, readyDatasrc } = useContext(WidgetWrapperContext);
  const { cardType, viewList } = widgetnemgooReady?.options;

  console.log('cardType :>> ', cardType);
  console.log('readyDatasrc :>> ', readyDatasrc);

  const cardContent = (item: any, index: number) => {
    switch (cardType) {
      case "horizantal":
        return <Horizantal item={item} index={index} />;
    }
  };
  

  return (
    <div className="pl-5 pr-10 sm:pr-5 md:pr-5">
      <div className="w-full flex justify-between items-center py-[10px]">
        <RenderAtom
          item={{ value: readyDatasrc[0]?.parentname }}
          renderType="title"
          customClassName={"text-[#585858] font-medium text-[20px]"}
        />
        <Tabs
          className="z-10"
          defaultActiveKey="1"
          items={[
            {
              label: `Онцлох`,
              key: "1",
            },
            {
              label: `Эрэлттэй`,
              key: "2",
            },
            {
              label: `Шинээр нэмэгдсэн`,
              key: "3",
            },
          ]}
        />
      </div>
      <div
        className={`grid 2xl:grid-cols-6 xl:grid-cols-5  lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-4 pt-2 pb-10`}>
        {readyDatasrc?.map((item: any, index: number) => {
          return cardContent(item, index);
        })}
      </div>
      <style>
        {`
			.ant-tabs-top > .ant-tabs-nav::before {
				border-bottom:none;
			}
      .ant-tabs-top > .ant-tabs-nav {
        margin:0;
      }
      .ant-tabs-tab {
        padding:6px 0;
      }
		`}
      </style>
    </div>
  );
};

export default HelpKnowledgeListCard;
