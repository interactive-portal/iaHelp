import { FC } from "react";
import _ from "lodash";
import { jsonParse } from "@/utils/helper";
import RenderAtom from "@/components/common/atom/renderAtom";
import Image from "next/image";
import { useRouter } from "next/router";
import moment from "moment";
import AtomImage from "@/components/common/atom/atomImage";
type PropsType = {
  options?: any;
  data?: any;
};

const CardItem: FC<PropsType> = ({ options, data }) => {
  const router = useRouter();

  const onClickOther = async (e: any, item: any) => {
    e.preventDefault();
    const href = `${options?.custom?.jumpUrl}?id=` + item?.id;
    router.push(href, undefined, { shallow: false });
  };

  const settings = options?.custom;

  const content = () => {
    switch (settings?.style) {
      case "news":
        return (
          <div className=" transition-all animate-fade-in-up">
            {data?.position2 && (
              <div className="  rounded-[20px] rounded-b-none relative bg-[#f3f4f4] border border-[#e8ebeb] border-b-0 h-[120px] md:h-[200px]">
                {/* <Image
                src={`https://dev.veritech.mn/${data?.imgurl}`}
                alt="news"
                fill
                quality={75}
                className=" rounded-[20px] rounded-b-none"
              /> */}
                <AtomImage
                  item={{
                    value:
                      data?.position2?.value ||
                      data?.imgurl ||
                      "https://dev.veritech.mn/storage/uploads/process/202306/metavalue/file/file_1686291399843426.png",
                  }}
                  alt="banner image"
                  // options={"fill":true})}
                  customClassName="rounded-[20px] rounded-b-none"
                />
              </div>
            )}
            <div className="flex flex-col text-start p-5 bg-white border-gray-300 shadow-lg rounded-b-[20px] max-h-auto h-[210px] overflow-hidden">
              <span className="font-normal text-[18px]  text-[#009BDE] cursor-pointer">
                {" "}
                {moment(data?.createddate).format("YYYY-MM-DD")}
              </span>
              <RenderAtom
                item={data?.position1 || { value: data?.title || "title" }}
                renderType="title"
                customClassName={
                  "font-bolf text-[18px] leading-[20px] h-[40px] pb-0 pt-1 text-[#2C2C51] cursor-pointer hover:text-interactive"
                }
                customProps={{
                  truncateRow: 2,
                }}
                onClick={(e: any) => onClickOther(e, data)}
              />
              <RenderAtom
                item={data?.position3 || { value: data?.body || "body" }}
                renderType="text"
                customClassName={
                  " text-[16px] text-[#3C3C3C]  leading-[28px] font-normal line-clamp-5 mt-3 newsContent"
                }
                customProps={{
                  truncateRow: 3,
                }}
              />
              <style>
                {`
                .newsContent img {
                  display:none;
                }
              `}
              </style>
            </div>
          </div>
        );

      case "masonrySlider":
        return (
          <div className=" transition-all animate-fade-in-up asdfvg">
            {data?.position2 && data?.imgurl && (
              <div className="  rounded-[20px] rounded-b-none relative bg-[#f3f4f4] border border-[#e8ebeb] border-b-0 h-[120px] md:h-[200px]">
                <AtomImage
                  item={
                    data?.position2 || {
                      value: data?.imgurl,
                    }
                  }
                  alt="banner image"
                  customClassName="rounded-[20px] rounded-b-none"
                />
              </div>
            )}
            <div className="flex flex-col text-start p-5 bg-white border-gray-300 shadow-lg rounded-b-[20px] max-h-auto h-[210px] overflow-hidden">
              <span className="font-normal text-[18px]  text-[#009BDE] cursor-pointer">
                {" "}
                {moment(data?.createddate).format("YYYY-MM-DD")}
              </span>
              <RenderAtom
                item={data?.position1 || { value: data?.title || "title" }}
                renderType="title"
                customClassName={
                  "font-bolf text-[18px] leading-[20px] h-[40px] pb-0 pt-1 text-[#2C2C51] cursor-pointer hover:text-interactive"
                }
                customProps={{
                  truncateRow: 2,
                }}
                onClick={(e: any) => onClickOther(e, data)}
              />
              <RenderAtom
                item={data?.position3 || { value: data?.body || "body" }}
                renderType="text"
                customClassName={
                  " text-[16px] text-[#3C3C3C]  leading-[28px] font-normal line-clamp-5 mt-3 newsContent"
                }
                customProps={{
                  truncateRow: 3,
                }}
              />
            </div>
          </div>
        );
      default:
        return (
          <div className="p-[20px] rounded-lg cursor-pointer hover:shadow-lg">
            <RenderAtom
              item={{
                value: "fa-regular fa-chart-line",
              }}
              renderType="icon"
              customClassName={
                "rounded-full w-[50px] h-[50px] bg-[#005FCC]/20 fa-xl justify-center items-center text-[#005FCC] mr-4"
              }
              customStyle={{
                display: "flex",
              }}
            />
            <RenderAtom
              item={data?.position1 || { value: data?.title || "title" }}
              renderType="title"
              customClassName={
                "font-bold text-[20px] py-2 text-[#2C2C51] cursor-pointer"
              }
            />
            <RenderAtom
              item={data?.position3}
              renderType="text"
              customClassName={
                " text-[18px] text-[#7B7B93] leading-[18px] py-6"
              }
            />
          </div>
        );
    }
  };

  return <>{content()}</>;
};

export default CardItem;
