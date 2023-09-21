// "use client";

import { useContext, FC, useRef } from "react";
import WidgetWrapperContext from "@/components/widget/WidgetWrapper";
import RenderAtom from "@/components/common/atom/renderAtom";
import _ from "lodash";
import { twMerge } from "tailwind-merge";
import { useWindowScroll } from "react-use";
import AtomLink from "@/components/common/atom/atomLink";
import ErpMenu from "../menu/erpMenu";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import MobileMenu from "../menu/mobileMenu";
import LangSwicher from "./langSwicher";
import { useRouter } from "next/router";

type PropsType = {
  config?: any;
  dataSrc?: any;
  options?: any;
  position?: any;
};

const ErpHeader: FC<PropsType> = ({ config, dataSrc, options, position }) => {
  const { x, y } = useWindowScroll();
  const [show, setShow] = useState(false);
  const { locale } = useRouter();
  // console.log("objecreadyDatasrct :>> ", dataSrc);
// 
  let colorText: string = `${y > 100 ? "white" : "white"}`;
  const headerEffect: string = `${
    y > 100
      ? "bg-[#3C3C3C] text-white "
      : "bg-gradient-to-b from-black/50 to-none"
  }`;
  return (
    <div
      className={` h-[80px] w-full transition duration-300 ease-in-out  text-${colorText}  ${options?.widgetClassName} sticky ${headerEffect}`}
      style={options?.style}>
      <div className="max-w-8xl mx-auto flex h-full w-full flex-row items-center justify-between md:px-0 xs:px-2">
        <div className="">
          <Link href="/">
            <Image
              src={y > 500 ? `/logo_${locale}.svg` : `/logo_${locale}.svg`}
              alt=""
              width={230}
              height={40}
            />
          </Link>
        </div>
        {/* desktop  menu */}
        <div className="bg-citizen-dark-500 md:flex sm:hidden xs:hidden md:mx-5 flex-row gap-x-[33px] ">
          <ErpMenu data={dataSrc} colorCustom={colorText} />
          <LangSwicher />
        </div>
        <span
          className="md:hidden xs:flex text-xl "
          onClick={() => setShow(true)}>
          <i className="fa-regular fa-bars "></i>
        </span>
      </div>
      {show && <MobileMenu data={dataSrc} setShow={setShow} />}

      <span className="hidden xs:col-span-12 pt-16 mt-16 xs:col-start-0 md:col-start-3 pt-6 md:col-span-9 md:col-span-6 md:py-16 xs:py-8  lg:w-1/2 pr-16 min-h-[650px] md:w-1/4 xs:w-full pb-6 md:pb-0 bg-[#ECEFF8] md:pr-6 md:w-3/4 xs:w-full">
        <div className="py-20 px-6 2xl:container 2xl:mx-auto md:py-16 xs:py-8 pt-4 mt-4 md:col-start-2 md:col-span-10  md:col-span-12">
          <div className="flex flex-wrap justify-between leading-[44px]">
            <div className="lg:w-1/3 flex flex-col lg:items-center lg:justify-center">
              <h1 className="md:text-5xl text-2xl lg:text-4xl xl:text-5xl py-16  font-semibold leading-tight leading-[46px] py-[60px]  text-gray-800"></h1>
            </div>
            <span className="sm:pt-16 xs:pt-2 pb-16"></span>
            <div className="xl:w-1/2 lg:w-7/12 w-full grid sm:grid-cols-2 md:px-14 xs:px-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 sm:justify-center sm:items-center  bg-[#181B34] lg:mt-0 mt-8 smcontainer"></div>
          </div>
        </div>
      </span>
    </div>
  );
};

export default ErpHeader;
