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
import SurveyMenu from "../menu/surveyMobile"

// import { Modal, Popover } from "antd";
// import { signOut, useSession } from "next-auth/react";

type PropsType = {
  config?: any;
  dataSrc?: any;
  options?: any;
  position?: any;
};

const FeadbackHeader: FC<PropsType> = ({ config, dataSrc, options, position }) => {
    
  const { x, y } = useWindowScroll();
  const [show, setShow] = useState(false);
  let colorText: string = `${y > 100 ? "black" : "black"}`;
  let linkStyle: string = "w-6/12";
  const headerEffect: string = `${
    y > 100
      ? "bg-[#FFFFFF] text-black "
      : "bg-gradient-to-b"
  }`;
  return (
        <div className={` h-[80px] w-full transition duration-300 ease-in-out  text-${colorText}  ${options?.widgetClassName} sticky ${headerEffect}`}
            style={options?.style}>
            <div className="container mx-auto flex h-full w-full flex-row items-center justify-between">
            <div className="">
                <Link href="/">
                <Image
                    src={y > 500 ? "/feedbackLogo.svg" : "/feedbackLogo.svg"}
                    alt=""
                    width={178}
                    height={52}
                />
                </Link>
            </div>
            {/* desktop  menu */}
            <div className="bg-citizen-dark-500 md:flex sm:hidden xs:hidden md:mx-5 flex-row gap-x-[30px] w-9/12">
                <ErpMenu data={dataSrc} colorCustom={colorText}  linkStyle={linkStyle}/>
                <div className="flex flex-row items-center gap-6 ml-auto w-9/12">
                    <div className="w-full  relative">
                        <div className="text-gray-500 absolute mr-4 inset-0 m-auto w-4 h-4">
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon icon-tabler icon-tabler-search"
                                width={16}
                                height={16}
                                viewBox="0 0 24 24"
                                strokeWidth={1}
                                stroke="#A0AEC0"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <circle cx={10} cy={10} r={7} />
                                <line x1={21} y1={21} x2={15} y2={15} />
                            </svg>
                        </div>
                        <input
                        className="bg-gray-100 focus:outline-none rounded-[8px] w-full text-sm text-gray-500  px-8 py-2"
                        type="text"
                        placeholder="Хайх..."
                        />
                    </div>
                    <div className="relative">
                        <div className="flex items-center relative">
                            <button className="bg-[#4A86FF] hover:bg-[#819dd5] text-white font-bold py-2 px-5 rounded-[30px] text-[18px] md:w-[135px]">Нэвтрэх</button>
                        </div>
                    </div>
                </div>
            </div>
            <span
                className="md:hidden xs:flex text-xl "
                onClick={() => setShow(true)}>
                <i className="fa-regular fa-bars "></i>
            </span>
            </div>
            {show && <SurveyMenu data={dataSrc} setShow={setShow} />}
        </div>
  );
};

export default FeadbackHeader;
