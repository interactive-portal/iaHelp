import BlockDiv from "@/components/common/block/blockDiv";
import { useRouter } from "next/router";
import RenderAtom from "@/components/common/atom/renderAtom";
import { Rate } from "antd";
import { FC } from "react";
import _ from "lodash";
import Subscribe from "@/components/common/footer/subscribe";

type PropsType = {
  data?: any;
  options?: any;
};

const HelpGrid: FC<PropsType> = ({ data, options }) => {
  const router = useRouter();

  if (_.isEmpty(data)) {
    return;
  }
  return (
    <>
      <BlockDiv
        customClassName="grid xs:grid-cols-1 sm:grid-cols-2 gap-4 lg:grid-cols-4 xs:px-2 md:px-1"
        divNumber="DivGrid"
      >
        {data.slice(0, options?.viewPerCount).map((item: any, index: any) => {
          const ddd =
            process.env.IMAGEROOTURL || "https://cloudnew.veritech.mn/app/";

          let imgSrc = item?.position2?.value;
          if (imgSrc?.startsWith("storage/")) {
            imgSrc = `${ddd}${imgSrc}`;
          }
          return (
            <div
              className={` transition-all animate-fade-in-up`}
              key={item?.id || index}
            >
              <div className=" bg-cover rounded-lg relative">
                {item?.typeid == "16626898597719" && (
                  <div
                    className="absolute left-[36%] top-[30%] w-[83px] h-[83px] rounded-full bg-white/40 flex items-center justify-center
						cursor-pointer z-10
						"
                    onClick={() =>
                      router.push({
                        pathname: "/video/detail",
                        query: {
                          filterid: item?.id,
                        },
                      })
                    }
                  >
                    <i className="fa-duotone fa-play fa-2xl text-white"></i>
                  </div>
                )}

                <RenderAtom
                  item={
                    (item?.position2?.value !== "" && {
                      value: imgSrc,
                    }) || {
                      value: settings?.defaultImage,
                    }
                  }
                  renderType="image"
                  customClassName="rounded-t-lg min-h-[185px] h-[185px] brightness-90"
                ></RenderAtom>

                {item?.position30 && (
                  <RenderAtom
                    item={item?.position30}
                    renderType="text"
                    customClassName={
                      "absolute text-black top-6 right-0 bg-white px-4 py-1 font-semibold text-[#585858]"
                    }
                    customStyle={{
                      borderRadius: "20px 0px 0px 20px",
                    }}
                  />
                )}
              </div>
              <BlockDiv
                customClassName="pb-2 px-4 pt-5 bg-white border-b-lg border-gray-300 shadow-xl rounded-b-lg max-h-auto"
                divNumber={"BlogCardContainerDiv"}
                customStyle={{
                  minHeight: "125px",
                }}
              >
                <RenderAtom
                  item={item?.position40 || { value: "Ангилал оруулна уу" }}
                  renderType="text"
                  customClassName="text-sm text-start"
                  customStyle={{ color: "#A0A0A0 " }}
                  customProps={{
                    truncateRow: 3,
                  }}
                  customDivNumber={"BlogTitle"}
                />
                <div className="text-start">
                  <span className="py-2 text-start">
                    <Rate
                      allowHalf
                      value={Number(item?.stars || 4)}
                      disabled
                      className="text-sm m2-4"
                      style={{ color: "#FFBB00" }}
                    />
                    <span className="text-[#A0A0A0] pl-2 xl:text-[12px] lg:text-[10px]">
                      ({item?.stars || 5})
                    </span>
                    <span className="text-[#A0A0A0] ml-4 text-[12px]">
                      <i className="fa-light fa-eye text-[12px] mr-1"></i>
                      {item?.seencnt}
                    </span>
                  </span>
                </div>

                <RenderAtom
                  item={item?.position1 || { value: "гарчиг оруулах" }}
                  renderType="text"
                  customClassName="text-[#585858] font-bold text-[16px] hover:text-blue-400 my-1 flex h-[30px] items-center"
                  customStyle={{ lineHeight: "20px" }}
                  customProps={{
                    truncateRow: 2,
                  }}
                />
              </BlockDiv>
            </div>
          );
        })}
      </BlockDiv>
      <div className="pt-6">
        <Subscribe />
      </div>
    </>
  );
};

export default HelpGrid;
