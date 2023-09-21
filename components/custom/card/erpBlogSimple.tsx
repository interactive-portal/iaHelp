import React, { useContext } from "react";

import { useRouter } from "next/router";
import RenderAtom from "@/components/common/atom/renderAtom";
import WidgetWrapperContext from "@/components/widget/WidgetWrapper";
import _, { filter } from "lodash";
import parseHtml from "html-react-parser";
import { decode } from "html-entities";
import ErpCardList from "./erpCardList";
import { wordToImage } from "@/utils/helper";

export default function ErpBlogSimple() {
  const { readyDatasrc } = useContext(WidgetWrapperContext);
  const router = useRouter();
  const filterId = router.query?.id;
  const filterData = _.filter(readyDatasrc, {
    id: _.toNumber(filterId),
  });
  const staticItem1 = filterData[0];
  const body: string = staticItem1?.body;
  const ddd = process.env.IMAGEROOTURL || "https://dev.veritech.mn/";

  var imgUrlReplaceData = body?.replaceAll(
    "storage/uploads",
    ddd + "storage/uploads"
  );

  // console.log("imxxg", imgUrlReplace);

  return (
    <>
      <div className="md:container xs:w-full md:mb-16 md:my-10 xs:mb-6 xs:my-6 mx-auto md:px-6 xs:p-2 newsContent">
        <div className="flex flex-wrap gap-y-2">
          <div className="md:w-3/4 w-full pb-4 md:pb-0 md:pr-6 xs:p-0">
            <div className="bg-white  w-full md:p-8 xs:p-4 space-y-5 rounded-xl shadow-[0_2px_14px_rgba(0,0,0,0.06)]">
              <span className="text-sm font-normal leading-4 text-[#A0A0A0]  md:py-2 xs:p-0">
                {staticItem1?.subtitle}
              </span>
              <h3 className="text-2xl leading-7 font-semibold text-[#585858]">
                {staticItem1?.title}
              </h3>
              <div className="flex flex-col mt-2 ">
                {parseHtml(decode(imgUrlReplaceData))}
              </div>
            </div>
          </div>
          <div className="md:w-1/4 w-full">
            <ErpCardList pDataSrc={readyDatasrc} />
          </div>
        </div>
      </div>
    </>
  );
}
