import { useState, FC } from "react";
import _ from "lodash";
import dynamic from "next/dynamic";
import RenderAtom from "../atom/renderAtom";
import { jsonParse } from "@/utils/helper";
import useWidgetData from "@/components/widget/useData";
import Image from "next/image";
import InteractiveJoin from "@/components/project/interactivev2/interactive-home/InteractiveJoin";
import Subscribe from "./subscribe";

type PropsType = {
  data: any;
};
const Footer: FC<PropsType> = ({ data }) => {
  let headDataSrc =
    data?.layout?.readyMergedLayoutConfig?.meta_hdr_bp_layout_section || {};
  let headerSection: any = [];

  headerSection.push(_.find(headDataSrc, ["code", "104"]));
  const nemgoo = jsonParse(headerSection[0]?.widgetnemgoo) || {};
  const ddddd = _.values(nemgoo?.data) || [];

  const staticItem1: any = ddddd[0] || [];
  const staticItem2: any = ddddd[1] || [];
  const staticItem3: any = ddddd[2] || [];
  const staticItem4 = [
    "fa-brands fa-google",
    "fa-brands fa-facebook-f",
    "fa-brands fa-instagram",
    "fa-brands fa-twitter",
  ];
  const subData = {
    title: "Бидэнтэй <b className='text-[#0C529D]'>нэгдээрэй</b>",
    description:
      "Та өөрийн имэйл хаягаа бүртгүүлэн хүссэн мэдээллээ цаг тухайд нь аваарай.",
    placeholder: "Таны и-мэйл хаяг",
    button: "Бүртгүүлэх",
  };
  // console.log("dddddd nemgoo ", subData);
  // tur ashiglav
  return (
    <>
      <Subscribe />
      <div className=" w-full md:h-[450px] sm:h-auto xs:h-auto bg-[url('https://res.cloudinary.com/dzih5nqhg/image/upload/v1673252763/Community/Group_21981_lnb5lh.png')]">
        <div className="mx-auto container w-full md:flex flex-row justify-between pt-20 sm:py-16 xs:py-14 overflow-x-auto">
          {/* col-1 */}
          <div>
            <Image
              src={staticItem3[0]?.logo}
              width={200}
              quality={100}
              height={40}
              alt="footer"
            />
            <div className="pt-8">
              <RenderAtom
                item={{ value: staticItem3[0]?.locationDes }}
                renderType="text"
                customClassName={"text-[14px] text-white "}
              />
            </div>
          </div>
          {/* col-2 */}
          <div>
            <RenderAtom
              item={{ value: "Бидэнтэй танилцах" }}
              renderType="title"
              customClassName={"text-[20px] xs:pt-10 sm:pt-10  text-white"}
            />
            <div className="flex flex-col pt-10 xs:pt-2 sm:pt-2 gap-y-2">
              {staticItem1?.map((item: any, index: number) => {
                return (
                  // eslint-disable-next-line react/jsx-key
                  <RenderAtom
                    item={{ value: item?.title }}
                    renderType="text"
                    customClassName="text-[14px] text-white cursor-pointer hover:text-gray-200"
                    key={item?.id || index}
                  />
                );
              })}
            </div>
          </div>
          {/* col-3 */}
          <div>
            <RenderAtom
              item={{ value: "Тусламж" }}
              renderType="title"
              customClassName={"text-[20px] xs:pt-10 sm:pt-10 text-white"}
            />
            <div className="flex flex-col pt-10 xs:pt-2 sm:pt-2 gap-y-2">
              {staticItem2?.map((item: any, index: number) => {
                return (
                  // eslint-disable-next-line react/jsx-key
                  <RenderAtom
                    item={{ value: item?.title }}
                    renderType="text"
                    customClassName="text-[14px] text-white cursor-pointer hover:text-gray-200"
                    key={item?.id || index}
                  />
                );
              })}
            </div>
          </div>
          {/* col-4 */}
          <div>
            <RenderAtom
              item={{ value: "Гар утсан дээрхи Апп" }}
              renderType="title"
              customClassName={"text-[20px] xs:pt-10 sm:pt-10 text-white"}
            />
            <div className="flex flex-row justify-center gap-x-[28px] pt-[30px]">
              <RenderAtom
                item={{
                  value:
                    "https://res.cloudinary.com/dhxf8xlsi/image/upload/v1674702539/IntractiveV2/image_44091_v2qgkl.png",
                }}
                renderType="image"
                customClassName={"w-auto h-[50px]"}
              />
              <RenderAtom
                item={{
                  value:
                    "https://res.cloudinary.com/dhxf8xlsi/image/upload/v1674702539/IntractiveV2/image_44090_siayaj.png",
                }}
                renderType="image"
                customClassName={"w-auto h-[50px]"}
              />
            </div>
            <div className="flex flex-row pt-10 gap-x-4">
              {staticItem4?.map((item: any, index: number) => {
                return (
                  // eslint-disable-next-line react/jsx-key
                  <div
                    className="w-[50px] h-[50px] flex items-center justify-center rounded-full border border-white"
                    key={item?.id || index}>
                    <RenderAtom
                      item={{ value: item }}
                      renderType="icon"
                      customClassName={"text-2xl text-white"}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
