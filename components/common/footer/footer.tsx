import { useState, FC } from "react";
import _ from "lodash";
import dynamic from "next/dynamic";
import RenderAtom from "../atom/renderAtom";
import { jsonParse } from "@/utils/helper";
import useWidgetData from "@/components/widget/useData";
import Image from "next/image";
import InteractiveJoin from "@/components/project/interactivev2/interactive-home/InteractiveJoin";
import Subscribe from "./subscribe";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

type PropsType = {
  data: any;
};
const Footer: FC<PropsType> = ({ data }) => {
  const router = useRouter();
  let headDataSrc =
    data?.layout?.readyMergedLayoutConfig?.meta_hdr_bp_layout_section || {};
  let headerSection: any = [];
  const { t } = useTranslation("translate");
  headerSection.push(_.find(headDataSrc, ["code", "104"]));
  const nemgoo = jsonParse(headerSection[0]?.widgetnemgoo) || {};
  const ddddd = _.values(nemgoo?.data) || [];
  const options = nemgoo?.options || [];

  const staticItem1: any = ddddd[0] || [];
  const staticItem2: any = ddddd[1] || [];
  const staticItem3: any = ddddd[2] || [];
  const staticItem4 = [
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
  // tur ashiglav

  switch (options) {
    case "1":
      return (
        <>
          <div className="w-full md:max-h-[450px] sm:h-auto xs:h-auto bg-[#4A86FF]">
            <div className="mx-auto container w-full md:flex flex-row justify-between overflow-x-auto pt-10">
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
              <div className="md:w-1/2 items-center justify-center">
                <div className="flex flex-col pt-8 xs:pt-2 sm:pt-2 gap-y-2">
                  {staticItem2?.map((row: any, index: number) => {
                    return (
                      <div key={index} className="flex items-center gap-6">
                        <div className="flex-none">
                          <RenderAtom
                            renderType="image"
                            item={{ value: row.iconImage }}
                            customClassName={
                              "w-full max-w-[60px] h-auto object-contain"
                            }
                          />
                        </div>
                        <RenderAtom
                          renderType="text"
                          item={{ value: row.desc }}
                          customClassName="break-words font-bold text-xl leading-6 text-[14px] text-white"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div>
                <div className="gap-x-4 flex flex-col xs:pt-2 sm:pt-2 gap-y-2">
                  {staticItem4?.map((item: any, index: number) => {
                    return (
                      // eslint-disable-next-line react/jsx-key
                      <div
                        className="w-[50px] h-[50px] flex items-center justify-center rounded-full border border-white p-2"
                        key={item?.id || index}
                      >
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
            <div className="mx-auto container py-5">
              <div className="border-t-4 border-[#FF9339] w-full justify-between pb-10">
                <div className="pt-5 text-center">
                  <span className="flex flex-col mx-auto gap-y-2 text-[18px] font-medium text-white">
                    Privacy | Terms | © 2023
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      );

    default:
      return (
        <>
          <Subscribe />
          <div className=" w-full md:h-[450px] sm:h-auto xs:h-auto bg-[url('https://res.cloudinary.com/dzih5nqhg/image/upload/v1673252763/Community/Group_21981_lnb5lh.png')]">
            <div className="mx-auto container w-full md:flex flex-row justify-between pt-20 sm:py-16 xs:py-14 overflow-x-auto">
              {/* col-1 */}
              <div className="md:w-72 xs:w-full text-white">
                <Image
                  src={staticItem3[0]?.logo}
                  width={200}
                  quality={100}
                  height={40}
                  alt="footer"
                />
                <div className="pt-8">
                  <RenderAtom
                    item={{ value: t(staticItem3[0]?.locationDes) }}
                    renderType="text"
                    customClassName={"text-[14px] text-white "}
                  />
                  {/* {t(staticItem3[0]?.locationDes)} */}
                </div>
              </div>
              {/* col-2 */}
              <div>
                <RenderAtom
                  item={{ value: t("WPD_0064") }}
                  renderType="title"
                  customClassName={"text-[20px] xs:pt-10 sm:pt-10  text-white"}
                />
                <div className="flex flex-col pt-10 xs:pt-2 sm:pt-2 gap-y-2">
                  {staticItem1?.map((item: any, index: number) => {
                    return (
                      // eslint-disable-next-line react/jsx-key
                      <div
                        key={index}
                        onClick={() =>
                          router.push(`${item?.link}`, undefined, {
                            shallow: false,
                          })
                        }
                      >
                        <RenderAtom
                          item={{ value: t(item?.title) }}
                          renderType="text"
                          customClassName="text-[14px] text-white cursor-pointer hover:text-gray-200"
                          key={item?.id || index}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* col-3 */}
              <div className="md:block xs:hidden">
                <RenderAtom
                  item={{ value: t("WPD_0068") }}
                  renderType="title"
                  customClassName={"text-[20px] xs:pt-10 sm:pt-10 text-white"}
                />
                <div className="flex flex-col pt-10 xs:pt-2 sm:pt-2 gap-y-2">
                  {staticItem2?.map((item: any, index: number) => {
                    return (
                      <RenderAtom
                        item={{ value: t(item?.title) }}
                        renderType="text"
                        customClassName="text-[14px] text-white cursor-pointer hover:text-gray-200"
                        key={item?.id || index}
                      />
                    );
                  })}
                </div>
              </div>
              {/* col-4 */}
              <div className="md:block xs:hidden">
                <RenderAtom
                  item={{ value: t("WPD_0072") }}
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
                        key={item?.id || index}
                      >
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
  }
};

export default Footer;
