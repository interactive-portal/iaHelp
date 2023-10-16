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
          {/* <img
						className="absolute left-0 top-0 md:block object-center object-fill w-full lg:h-[650px] md:h-full"
						src={item?.mainimage}
						alt="randeer"
					/> */}
          {/* <img className="hidden md:block object-center object-fill w-full h-48 md:h-full" src="https://i.ibb.co/gWn4wjZ/Rectangle-32-1.png" alt="Background-img" /> */}
          {/* <img
						className="md:block lg:hidden hidden  w-full "
						src="https://tuk-cdn.s3.amazonaws.com/can-uploader/banner_11_ipad.png"
						alt="randeer"
					/>
					<img
						className="md:hidden w-full "
						src="https://tuk-cdn.s3.amazonaws.com/can-uploader/banner_11_mobile.png"
						alt="randeer"
					/> */}
          <div className="max-w-lpcontainer flex md:flex-col-reverse mx-auto h-full w-full">
            <div className=" flex flex-col w-[630px] h-[55%] justify-evenly lg:mb-14 xs:mb-0">
              <RenderAtom
                item={item?.position1}
                renderType="title"
                customClassName={
                  "lg:text-[50px] xs:text-xl font-semibold whitespace-normal"
                }
                customStyle={{ color: "white" }}
                customProps={{
                  truncateRows: 2,
                }}
              />
              <RenderAtom
                item={item?.position3}
                renderType="text"
                customClassName={"text-white"}
              />
              <RenderAtom
                item={item?.position10}
                renderType="button"
                customClassName={
                  "bg-white text-[#0C529D] px-4  rounded-[30px] font-bold text-lg"
                }
              />
            </div>
          </div>
        </BlockDiv>
      </div>
    </>
  );
};

export default Banner4;
