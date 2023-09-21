import { useContext } from "react";
import WidgetWrapperContext from "@/components/widget/WidgetWrapper";
import RenderAtom from "@/components/common/atom/renderAtom";
import _ from "lodash";
import { title } from "process";
import { useTranslation } from "next-i18next";

export default function InteractiveCompanyValuables() {
  const { readyDatasrc } = useContext(WidgetWrapperContext);
  const { t } = useTranslation("translate");
  return (
    <div className="container mx-auto gap-x-5 relative py-[80px]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-9">
        {readyDatasrc?.map((item: any, index: number) => {
          return (
            <Card
              title={item?.title}
              description={item?.description}
              logo={item?.imgurl}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
}

const Card = ({
  title,
  logo,
  description,
}: {
  title: string;
  logo: string;
  description: string;
}) => {
  const { t } = useTranslation("translate");
  return (
    <div className="flex flex-col w-full rounded-[10px] shadow-[0_1px_3px_0_rgba(0,0,0,0.25)] gap-4 p-7">
      <RenderAtom
        renderType="image"
        item={{ value: logo }}
        customClassName={"w-[60px] h-auto object-cover"}
      />
      <RenderAtom
        renderType="text"
        item={{ value: t(title) }}
        customClassName={"text-[20px] font-semibold text-black"}
      />
      <RenderAtom
        renderType="text"
        item={{ value: t(description) }}
        customClassName={"text-[16px] font-normal text-[#3C3C3C]"}
      />
    </div>
  );
};
