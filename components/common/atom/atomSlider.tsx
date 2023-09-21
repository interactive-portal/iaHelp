import WidgetWrapperContext from "@/components/widget/WidgetWrapper";
import { FC, useContext } from "react";
import {
  A11y,
  FreeMode,
  Navigation,
  Pagination,
  Scrollbar,
  Autoplay,
} from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { Swiper } from "swiper/react";
// import useSwiperRef from "../useSwiperRef";
import useSwiperRef from "./useSwiperRef";

import { twMergeUtil } from "@/utils/widgetHelper";
import { toBoolean } from "@/utils/helper";
import BlockDiv from "../block/blockDiv";
import { twMerge } from "tailwind-merge";

// SwiperCore.use([Navigation]);

// Demo
// https://swiperjs.com/demos
// API
// https://swiperjs.com/swiper-api
// React Usage
// https://swiperjs.com/react#usage

type PropsType = {
  type?: "1" | "2" | "3" | "4";
  color?: string;
  theme?: any;
  customStyle?: any;
  customClassName?: string;
  arrow?: any;
  children?: any;
};

const AtomSliderV2: FC<PropsType> = ({
  type = "primary",
  color = "cozy",
  theme,
  customClassName = "",
  customStyle = {},
  arrow = {
    className: "",
    left: {
      className: "left-10",
      icon: "far fa-chevron-left",
    },
    right: {
      className: "right-10",
      icon: "far fa-chevron-right",
    },
    arrowWrapper: {
      className: "",
    },
  },
  children,
  ...props
}) => {
  const { widgetnemgooReady } = useContext(WidgetWrapperContext);
  const myProps: any = { ...props };

  // console.log("🚀 ~ Swipper ~ myProps myProps", myProps);

  const arrowClass = twMergeUtil(
    theme,
    "cursor-pointer absolute my-auto inset-y-1/2 z-30 flex items-center justify-center rounded-full hover:bg-opacity-50 hover:bg-gray-400 text-white text-xl w-10 h-10",
    arrow?.className
  );
  const arrowStyle = { ...arrow?.style };

  const pagination: any = {
    clickable: true,
    type: "bullets",
    renderBullet: (index: number, className: any) => {
      return `<span index-number="${index}" class="${className} cursor-pointer text-gray-700 mx-3"><i class="fas fa-circle"></i></span>`;
    },
  };

  const [nextEl, nextElRef]: any = useSwiperRef();
  const [prevEl, prevElRef]: any = useSwiperRef();

  return (
    <>
      <BlockDiv
        customClassName={`relative ${customClassName}`}
        divNumber="Swiper-Wrapper"
      >
        <Swiper
          modules={[
            FreeMode,
            Navigation,
            Pagination,
            Scrollbar,
            A11y,
            Autoplay,
          ]}
          loop={true}
          pagination={pagination}
          navigation={{
            prevEl,
            nextEl,
          }}
          autoplay={false}
          scrollbar={{ draggable: true }}
          spaceBetween={10}
          centeredSlides={false}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 30,
            },
          }}
          // onSwiper={(swiper) => console.log(swiper)}
          // onSlideChange={() => console.log("slide change")}
          className={twMerge(
            `${myProps?.className || ""} ${
              widgetnemgooReady?.design?.["AtomSliderV2-Swiper"]?.className ||
              widgetnemgooReady?.["AtomSliderV2-Swiper"]?.className ||
              ""
            }`
          )}
          style={myProps?.style}
          div-name="AtomSliderV2-Swiper"
          {...props}
          {...myProps?.props}
        >
          {children}
        </Swiper>
        {toBoolean(
          myProps?.navigation === undefined ? true : myProps?.navigation
        ) && (
          <BlockDiv
            customClassName={`absolute inset-y-1/2 container mx-auto`}
            divNumber="Arrow-Wrapper-Outside"
          >
            <BlockDiv
              customClassName={`relative w-full ${
                arrow?.arrowWrapper?.className || ""
              }`}
              customStyle={{ ...arrow?.arrowWrapper?.style }}
              divNumber="Arrow-Wrapper"
            >
              <div
                ref={prevElRef}
                className={`${arrowClass} ${
                  arrow?.left?.className || "left-10"
                }`}
                style={{ ...arrowStyle, ...arrow?.left?.style }}
              >
                <i className={arrow?.left?.icon || "far fa-chevron-left"}></i>
              </div>
              <div
                ref={nextElRef}
                className={`${arrowClass} ${
                  arrow?.right?.className || "right-10"
                }`}
                style={{ ...arrowStyle, ...arrow?.right?.style }}
              >
                <i className={arrow?.right?.icon || "far fa-chevron-right"}></i>
              </div>
            </BlockDiv>
          </BlockDiv>
        )}
      </BlockDiv>

      {/* <style>
        {`
          .swiper-pagination-bullet-active {
            opacity:1 !important;
          }
          .swiper-pagination-bullet {
            opacity:0.4;
          }
          .swiper-pagination {
            position: absolute;
            bottom: 20px;
            z-index: 5000;
            margin: 0 auto;
            transform: translate(-50%, 0);
            left: 50%;
          }
		  .swiper-slide {
			width: unset;
		}
        `}
      </style> */}
    </>
  );
};

export default AtomSliderV2;
