import React, { useContext } from "react";
import { Pagination, Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/free-mode";

import RenderAtom from "@/components/common/atom/renderAtom";
import BlockDiv from "@/components/common/block/blockDiv";
import WidgetWrapperContext from "@/components/widget/WidgetWrapper";
import Link from "next/link";
import { useTranslation } from "next-i18next";

export default function ErpSliderBanner() {
  const { readyDatasrc, widgetnemgooReady } = useContext(WidgetWrapperContext);
  const { t } = useTranslation("translate");
  const paginationOption = widgetnemgooReady?.options?.pagination;
  const navigationButton = widgetnemgooReady?.options?.navigation;
  const options = widgetnemgooReady?.options;
  const sliderButtonKey = widgetnemgooReady?.options?.sliderButtonKey;

  // console.log("readyDatasrc :>> ", readyDatasrc);

  const renderContent = (bannerType: string, data: any) => {
    switch (bannerType) {
      case "Left":
        return (
          <LeftSlide
            background={data.backgroundimage}
            image=""
            title={data.title}
            logo={data.logo}
            button={data.button}
            description={data.description}
            date={data.date}
            location={data.location}
            url={data.url}
            topBanner={data.topBanner}
            options={options}
          />
        );
      case "Center":
        return (
          <CenterSlide
            background={data.backgroundimage}
            image=""
            title={data.title}
            logo={data.logo}
            button={data.button}
            description={data.description}
            date={data.date}
            location={data.location}
            url={data.url}
            options={options}
          />
        );

      case "Right":
        return (
          <RightSlide
            background={data.backgroundImage}
            image=""
            title={data.title}
            logo={data.logo}
            button={data.button}
            description={data.description}
            date={data.date}
            location={data.location}
            url={data.url}
            options={options}
          />
        );
      default:
        return <span>no more</span>;
    }
  };

  const renderNavigationButton = () => {
    switch (navigationButton) {
      case "bottomRight":
        return (
          <BlockDiv customClassName="flex flex-row absolute bottom-0 right-4 md:right-[16%] gap-4  md:gap-[60px] py-5 md:py-[100px]">
            <BlockDiv
              customClassName={`flex justify-center items-center bg-white hover:bg-white/80 w-[40px] h-[40px] md:w-[80px] md:h-[80px] rounded-full z-20 ${
                sliderButtonKey?.prev
                  ? `${sliderButtonKey?.prev}`
                  : "prevBanner"
              }`}>
              <RenderAtom
                renderType="icon"
                item={{ value: "fa-regular fa-arrow-left" }}
                customClassName="text-sm md:text-2xl text-black"
              />
            </BlockDiv>
            <BlockDiv
              customClassName={`flex justify-center items-center bg-white hover:bg-white/80 w-[40px] h-[40px] md:w-[80px] md:h-[80px] rounded-full z-20  ${
                sliderButtonKey?.next
                  ? `${sliderButtonKey?.next}`
                  : "nextBanner"
              }`}>
              <RenderAtom
                renderType="icon"
                item={{ value: "fa-regular fa-arrow-right" }}
                customClassName="text-sm md:text-2xl text-black"
              />
            </BlockDiv>
          </BlockDiv>
        );
      default:
        return (
          <>
            <BlockDiv
              customClassName={`absolute top-1/2 left-0 md:left-5 flex z-20${
                sliderButtonKey?.prev
                  ? `${sliderButtonKey?.prev}`
                  : "prevBanner"
              }`}>
              <RenderAtom
                renderType="icon"
                item={{ value: "fa-solid fa-angle-left" }}
                customClassName="text-lg bg-black/50 text-white p-2"
              />
            </BlockDiv>
            <BlockDiv
              customClassName={`absolute top-1/2 right-0 md:right-5 flex z-20${
                sliderButtonKey?.next
                  ? `${sliderButtonKey?.next}`
                  : "nextBanner"
              }`}>
              <RenderAtom
                renderType="icon"
                item={{ value: "fa-solid fa-angle-right" }}
                customClassName="text-lg bg-black/50 text-white p-2"
              />
            </BlockDiv>
          </>
        );
    }
  };

  return (
    <div className="relative w-full">
      {renderNavigationButton()}
      <Swiper
        slidesPerView={1}
        loop
        pagination={{
          clickable: paginationOption?.show || true,
        }}
        navigation={{
          nextEl: sliderButtonKey?.next
            ? `.${sliderButtonKey.next}`
            : ".nextBanner",
          prevEl: sliderButtonKey?.prev
            ? `.${sliderButtonKey.prev}`
            : ".prevBanner",
        }}
        // autoplay={{
        //   delay: 9000,
        //   disableOnInteraction: false,
        // }}
        // navigation={true}
        // autoHeight={true}
        height={600}
        modules={[Autoplay, Navigation, Pagination]}
        className="mySwiper">
        {readyDatasrc.map((item: any, index: number) => {
          return (
            <SwiperSlide key={index}>
              {renderContent(item.textalign, item)}
            </SwiperSlide>
          );
        })}
      </Swiper>
      <style>
        {`
        .swiper-pagination-bullet {
          background-color:white;
        }
        `}
      </style>
    </div>
  );
}

const LeftSlide = ({
  title,
  background,
  logo,
  description,
  button,
  location,
  date,
  url,
  topBanner,
  image,
  options,
}: {
  title: string;
  background: string;
  logo: string;
  description: string;
  button: string;
  location: string;
  date: string;
  image: string;
  topBanner: string;
  url: string;
  options: any;
}) => {
  const { t } = useTranslation("translate");
  return (
    <div
      className="flex  w-full md:h-[600px] h-auto relative"
      style={{
        backgroundImage: `url('https://dev.veritech.mn/${background}')`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}>
      <div className="flex flex-col md:flex-row container mx-auto justify-between  md:pt-[150px] md:pb-[120px] xs:pt-16">
        <div className="flex flex-col w-full md:w-[50%] justify-center gap-10 transition duration-150 ease-in-out">
          <div className="emergeny">
            {logo && (
              <RenderAtom
                renderType="image"
                item={{ value: logo }}
                customClassName="w-[200px] md:w-[157px] h-auto"
              />
            )}
          </div>
          <div className="flex flex-col emergeny2 gap-5">
            <RenderAtom
              renderType="text"
              item={{ value: t(title) }}
              customClassName={` ${
                options?.titleClassName
                  ? options?.titleClassName
                  : "xs:text-[24px] md:text-[40px]  font-[300] text-white uppercase md:leading-[46px] xs:leading-[26px]"
              }`}
            />
            {description && (
              <RenderAtom
                renderType="text"
                item={{ value: t(description) }}
                customClassName={`${
                  options?.escrClassName
                    ? options?.escrClassName
                    : "text-[18px] text-white mt-4"
                } flex font-normal`}
              />
            )}
          </div>
          <div className="flex justify-start gap-16 emergeny2">
            {location && (
              <span className="text-white">
                <i className="fa-regular fa-location-dot" /> {location}
              </span>
            )}
            {date && (
              <span className="text-white">
                <i className="fa-regular fa-clock" /> {date}
              </span>
            )}
          </div>
          {button && (
            <div className="md:flex flex-row gap-5 emergeny3 xs:hidden ">
              <Link href={url}>
                <button
                  className={`${
                    options?.buttonClassName
                      ? options?.buttonClassName
                      : "bg-transparent text-white  border-2 border-white rounded-full hover:bg-black/20 px-8 py-3 w-full max-w-[250px]"
                  }`}>
                  {t(button)}
                  {/* {t(row.title)} */}
                </button>
              </Link>
            </div>
          )}
          <style>
            {`
            .emergeny {
              opacity: 1;
              transform: translateX(-90px);
              animation: emerge 0.3s forwards;
            }
              .emergeny2 {
              opacity: 1;
              transform: translateX(-90px);
              animation: emerge 0.5s forwards;
            }
          .emergeny3 {
              opacity: 1;
              transform: translateX(-90px);
              animation: emerge 0.7s forwards;
            }

            @keyframes emerge {
              from {
                opacity: 1;
                transform: translateX(90px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            `}
          </style>
        </div>
      </div>
      {topBanner && (
        <div className="w-[260px] h-[200px] bg-gradient-to-r from-[#FE805A] to-[#FBAD50] text-white text-lg md:text-[46px] leading-none font-semibold  md:absolute md:flex xs:hidden top-0 px-[30px] py-[46px] rounded-b-[20px] right-[16%]">
          <RenderAtom renderType="text" item={{ value: t(topBanner) }} />
        </div>
      )}
    </div>
  );
};

const CenterSlide = ({
  title,
  background,
  logo,
  description,
  button,
  location,
  date,
  url,
  image,
  options,
}: {
  title: string;
  background: string;
  logo: string;
  description: string;
  button: string;
  location: string;
  date: string;
  image: string;
  url: string;
  options: any;
}) => {
  const { t } = useTranslation("translate");
  return (
    <div
      className="flex w-full h-auto md:min-h-[600px]"
      style={{
        backgroundImage: `url('https://dev.veritech.mn/${background}')`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}>
      <div className="flex flex-col container mx-auto text-white justify-center items-center text-center py-[80px] md:py-[200px] gap-5">
        <RenderAtom renderType="image" item={{ value: logo }} />
        <RenderAtom
          renderType="text"
          item={{ value: title }}
          customClassName="text-[30px] md:text-[40px] animate-fade-in-up transition-all duration-300 text-center"
        />
        {description && (
          <RenderAtom
            renderType="text"
            item={{ value: description }}
            customClassName="text-[18px] text-white line-clamp-3"
          />
        )}
        <div className="flex justify-between gap-5 animate-fade-in-up transition-all duration-700">
          {location && (
            <span>
              <i className="fa-regular fa-location-dot" /> {location}
            </span>
          )}
          {date && (
            <span>
              <i className="fa-regular fa-clock" /> {date}
            </span>
          )}
        </div>
        {button && (
          <div className="flex flex-row gap-5">
            <Link href={url} target="_blank">
              <button className="bg-red-500 rounded-md px-5 py-3 w-full max-w-[200px]">
                {t(button)}
              </button>
            </Link>
            <button className="bg-transparent border-2 border-white rounded-full hover:bg-black/20 px-5 py-3 w-full max-w-[200px]">
              {t(button)}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const RightSlide = ({
  title,
  background,
  logo,
  description,
  button,
  location,
  date,
  url,
  image,
  options,
}: {
  title: string;
  background: string;
  logo: string;
  description: string;
  button: string;
  location: string;
  date: string;
  image: string;
  url: string;
  options: any;
}) => {
  const { t } = useTranslation("translate");
  return (
    <div
      className="flex  w-full h-auto md:min-h-[600px]"
      style={{
        backgroundImage: `url('${background}')`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}>
      <div className="flex flex-col md:flex-row container mx-auto text-white justify-between py-[100px] md:py-[200px]">
        <div className="flex flex-col w-full md:w-1/2 justify-center gap-5 animate-fade-in-up transition-all duration-300"></div>
        <div className="flex flex-col w-full md:w-1/2 justify-center gap-5 animate-fade-in-up transition-all duration-300">
          {logo && (
            <RenderAtom
              renderType="image"
              item={{ value: logo }}
              customClassName="w-[200px] md:w-[157px] h-auto"
            />
          )}
          <RenderAtom
            renderType="text"
            item={{ value: title }}
            customClassName="text-[30px] md:text-[40px] uppercase"
          />
          {description && (
            <RenderAtom
              renderType="text"
              item={{ value: description }}
              customClassName="text-[18px] text-white line-clamp-3"
            />
          )}
          {location ||
            (date && (
              <div className="flex justify-between animate-fade-in-up transition-all duration-700">
                <span>
                  <i className="fa-regular fa-location-dot" /> {location}
                </span>
                <span>
                  <i className="fa-regular fa-clock" /> {date}
                </span>
              </div>
            ))}
          {button && (
            <button className="bg-transparent border-2 border-white rounded-full hover:bg-black/20 px-5 py-3 w-full max-w-[200px]">
              {t("WPD_0001")}
            </button>
          )}
          {/* bb */}
        </div>
      </div>
    </div>
  );
};
