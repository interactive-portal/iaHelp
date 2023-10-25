import { useContext } from "react";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import BlockDiv from "@/components/common/Block/BlockDiv";

const Banner4 = () => {
  const {
    config,
    readyDatasrc,
    positionConfig,
    metaConfig,
    gridJsonConfig,
    pathConfig,
    widgetnemgooReady,
  } = useContext(WidgetWrapperContext);

  const item = readyDatasrc[0];
  return (
    <>
      <div className="overflow-y-hidden w-full">
        <BlockDiv
          customClassName=" flex justify-center items-center md:justify-start w-full lg:h-[650px] bg-cover md:h-[300px] object-cover md:py-10 lg:py-0 md:px-4 lg:px-0"
          customStyle={{ backgroundImage: `url('${item?.mainimage}')` }}
          divNumber="LandingBannerDiv"
        >
          <div className="max-w-lpcontainer flex md:flex-col-reverse mx-auto h-full w-full">
            <div className=" flex flex-col w-[630px] h-full pt-[80px] justify-between lg:mb-14 xs:mb-0">
              <RenderAtom
                item={item?.position1}
                renderType="title"
                customClassName={
                  "text-[46px] font-semibold whitespace-normal leading-[52px]"
                }
                customStyle={{ color: "white" }}
                customProps={{
                  truncateRows: 2,
                }}
              />
              <RenderAtom
                item={item?.position3}
                renderType="text"
                customClassName={"text-white text-[18px] line-clamp-2"}
              />
              {item?.position10 && (
                <RenderAtom
                  item={item?.position10}
                  renderType="button"
                  customClassName={
                    "bg-white text-[#585858] px-4 rounded-[30px] font-roboto font-medium text-lg w-[178px] flex-row-reverse"
                  }
                  customProps={{
                    icon: "fa-solid fa-arrow-right ml-3 fa-sm relative top-[2px]",
                  }}
                />
              )}
            </div>
          </div>
        </BlockDiv>
      </div>
    </>
  );
};

export default Banner4;
