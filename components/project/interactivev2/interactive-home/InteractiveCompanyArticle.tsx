import { useContext, useState } from "react";
import WidgetWrapperContext from "@/components/widget/WidgetWrapper";
import RenderAtom from "@/components/common/atom/renderAtom";
import ErpArticle from "@/components/custom/article/erpArticle";
import _ from "lodash";
import { useTranslation } from "next-i18next";

export default function InteractiveCompanyArticle() {
  const { readyDatasrc } = useContext(WidgetWrapperContext);

  const staticItem1 = readyDatasrc[0];
  const staticItem2 = readyDatasrc[1];
  const { t } = useTranslation("translate");
  return (
    <div className="flex container mx-auto flex-col lg:flex-row w-full gap-5 lg:gap-24 items-center justify-start">
      <div className="flex">
        <RenderAtom
          renderType="image"
          item={{
            value:
              "https://res.cloudinary.com/dzih5nqhg/image/upload/v1689839650/image_44342_ur9sr2.png",
          }}
          customClassName={"w-full lg:min-w-[570px] h-auto object-cover"}
        />
      </div>
      <div className="flex flex-col items-start justify-start gap-5">
        <div className="flex flex-col gap-4">
          <RenderAtom
            renderType="title"
            item={{ value: t(staticItem1?.title) }}
            customClassName={"text-[30px] font-semibold"}
          />
          <RenderAtom
            renderType="text"
            item={{ value: t(staticItem1?.description) }}
            customClassName={"text-lg leading-[26px]"}
          />
        </div>
        <div className="flex flex-col gap-4">
          <RenderAtom
            renderType="title"
            item={{ value: t(staticItem2?.title) }}
            customClassName={"text-[30px] font-semibold"}
          />
          <RenderAtom
            renderType="text"
            item={{ value: t(staticItem2?.description) }}
            customClassName={"text-lg leading-[26px]"}
          />
        </div>
      </div>
    </div>
  );
}
