import React, { useContext, useState } from "react";
import { useSession } from "next-auth/react";
import { useCloud } from "hooks/use-cloud";
import _ from "lodash";
import useSWR from "swr";
import { Badge, Popover } from "antd";
import Link from "next/link";
import NationHeaderUserMenuList from "./nationHeaderUserMenuList";
import LeftSideMenu from "./leftSideMenu";
import RightSideUsers from "./rightSideUsers";
import { useToggle } from "react-use";
import info from "@/config/portalinfo.json";
import BlockDiv from "@/components/common/Block/BlockDiv";
import RenderAtom from "@/components/common/Atom/RenderAtom";

export default function NationHeader(options: any) {
  const { data: session, status }: any = useSession();
  const cloudContext = useCloud();
  const metaNameV2 = cloudContext.hostObject.metaNameV2;
  const pageName =
    cloudContext?.cloudURL?.query?.page?.split("/")[0] || "community";
  const optionTitle = options?.options;
  const portalConfig = _.find(info.domain, { domain: optionTitle });

  const myCriteria = {
    webUrl: [
      {
        operator: "like",
        operand: pageName + "%",
      },
    ],
  };
  const criteria = JSON.stringify(myCriteria);

  const { data } = useSWR(
    `/api/get-data?metaid=1681870962293185&metaNameV2=${metaNameV2}&criteria=${criteria}`
  );

  const subMenuData = _.values(data?.result);
  const activeMenu = cloudContext?.cloudURL?.query?.page || "community/home";
  const headertitle = data?.result[0].categoryname || "Community Nation";
  // left sidebar
  const leftSidebarWidth = "85px";
  const leftButtonMarginTop = "mt-[250px]";
  const [isOpenLeftSidebar, setIsOpenLeftSidebar] = useToggle(false);
  // right sidebar
  const rightSidebarWidth = "300px";
  const rightButtonMarginTop = "mt-[250px]";
  const [isOpenRightSidebar, setIsOpenRightSidebar] = useToggle(false);

  const [isOpenRightChat, setIsOpenRightChat] = useToggle(false);

  return (
    <BlockDiv customClassName="flex flex-row h-[70px] md:h-[100px] w-full">
      <BlockDiv customClassName="hidden lg:flex-none lg:block h-[100px] w-[85px] bg-[#5A6785] px-[10px] py-[15px]">
        <Link href={"nation?page=community/home"}>
          <RenderAtom
            item={{
              value:
                "https://res.cloudinary.com/dzih5nqhg/image/upload/v1680853176/Community/logos_m0eilq.png",
            }}
            renderType="image"
            className={"w-auto"}
          />
        </Link>
      </BlockDiv>
      <BlockDiv
        customClassName="hidden lg:flex flex-row sticky z-50 h-[100px] top-0 w-full bg-white py-[10px] px-[20px]"
        data-dataview="1681870962293185"
      >
        <BlockDiv customClassName="flex flex-col w-full 2xl:w-8/12">
          <RenderAtom
            item={{ value: portalConfig?.title || "Community Nation" }}
            renderType="text"
            customClassName={"text-[#585858] text-[24px] font-medium"}
          />

          <BlockDiv customClassName="flex flex-row items-center w-full justify-between h-full">
            <BlockDiv customClassName="flex flex-row w-full items-center gap-x-2">
              {subMenuData.map((row: any, index: number) => {
                return (
                  <Link key={index} href={`nation?page=${row.weburl}`}>
                    <BlockDiv
                      customClassName={`py-1 border-b-2 group ${
                        activeMenu.startsWith(row.weburl)
                          ? "border-[#0165E0]"
                          : "border-white hover:rounded-[10px] hover:bg-[#F3F4F6]"
                      }`}
                    >
                      <RenderAtom
                        item={{ value: row.name }}
                        renderType="title"
                        customClassName={`text-[16px] cursor-pointer break-normal px-4 ${
                          activeMenu.startsWith(row.weburl)
                            ? "text-[#0165E0] font-bold"
                            : "text-[#67748E] font-normal"
                        }`}
                      />
                    </BlockDiv>
                  </Link>
                );
              })}
            </BlockDiv>
          </BlockDiv>
        </BlockDiv>
        <BlockDiv customClassName="flex flex-row 2xl:w-4/12 justify-end items-center space-x-[40px]">
          <BlockDiv customClassName="relative xl:block hidden w-full h-[36px]">
            <input
              placeholder="Хайх... "
              className="w-full h-full pl-[10px] rounded-xl bg-[#F3F4F6] border-none absolute z-0 hidden 2xl:block"
            />
            <RenderAtom
              item={{ value: "fa-regular fa-magnifying-glass" }}
              renderType="icon"
              customClassName={
                "text-xl text-[#67748E] absolute z-5 top-1/2 -translate-y-1/2 right-[10px]"
              }
            />
          </BlockDiv>
          <Badge color="red" count={7} size="small" className="hidden xl:block">
            <RenderAtom
              item={{ value: "fa-regular fa-bell" }}
              renderType="icon"
              customClassName={"text-xl text-[#67748E] cursor-pointer"}
            />
          </Badge>
          {session ? (
            <BlockDiv customClassName="flex justify-center items-center gap-x-[10px]">
              <BlockDiv customClassName="flex-none flex-col text-right justify-end items-right">
                <RenderAtom
                  renderType="text"
                  item={{ value: session?.username }}
                  customClassName={
                    "text-[#585858] text-[16px] font-medium text-right"
                  }
                />
                <RenderAtom
                  renderType="text"
                  item={{ value: "Голомт банк" }}
                  customClassName={
                    "text-[#67748E] text-[14px] text-right break-normal"
                  }
                />
              </BlockDiv>
              <Popover
                content={NationHeaderUserMenuList}
                trigger="click"
                placement="bottomRight"
              >
                <RenderAtom
                  renderType="image"
                  item={{
                    value:
                      session?.profileImg ||
                      "https://res.cloudinary.com/dzih5nqhg/image/upload/v1673497491/Community/Image_ujrlea.png",
                  }}
                  customClassName={
                    "rounded-full h-[40px] w-[40px] cursor-pointer"
                  }
                />
              </Popover>
            </BlockDiv>
          ) : (
            <RenderAtom
              item={{ value: "Нэвтрэх" }}
              renderType="button"
              customClassName={
                "text-[#585858] text-[16px] font-medium text-right hover:bg-gray-100 rounded-lg"
              }
            />
          )}
        </BlockDiv>
      </BlockDiv>

      {/* mobile vyed haragdah */}
      <BlockDiv customClassName="flex lg:hidden flex-row justify-between w-full p-5 items-center">
        <RenderAtom
          renderType="image"
          item={{
            value:
              "https://res.cloudinary.com/dzih5nqhg/image/upload/v1675321252/Community/Frame_36458_wgrpnw.png",
          }}
          customClassName={"flex w-[40px] h-[40px] object-cover cursor-pointer"}
          onClick={() => {
            setIsOpenLeftSidebar(true);
          }}
        />
        <RenderAtom
          renderType="text"
          item={{ value: headertitle }}
          customClassName={"flex text-[#585858] text-[18px] font-medium"}
        />
        <RenderAtom
          renderType="icon"
          item={{ value: "fa-regular fa-bars" }}
          customClassName={"flex text-[24px] leading-[24px] cursor-pointer"}
          onClick={() => {
            setIsOpenRightSidebar(true);
          }}
        />
      </BlockDiv>
      {/* mobile menu */}

      {/* left side menu start */}
      <BlockDiv
        customClassName={`w-[${leftSidebarWidth}] z-40 h-screen fixed top-0 left-0 bottom-0 lg:relative bg-gray-100 shadow-lg md:h-full flex-col justify-between lg:hidden transition duration-150 ease-in-out`}
        customStyle={{
          transform: isOpenLeftSidebar
            ? "translateX(0px)"
            : `translateX(-${leftSidebarWidth})`,
        }}
        divNumber="MobileView"
      >
        {/* Хаах товч - Чих */}
        <RenderAtom
          item={{ value: <i className="fal fa-xmark text-white"></i> }}
          renderType="button"
          customClassName={`h-10 w-10 bg-[#5A6785] absolute right-0 ${leftButtonMarginTop} -mr-10 flex items-center shadow rounded-tr rounded-br justify-center cursor-pointer text-white ${
            isOpenLeftSidebar ? "" : "hidden"
          }`}
          onClick={() => {
            setIsOpenLeftSidebar(false);
          }}
        />
        <BlockDiv customClassName="w-full flex flex-row justify-between">
          <BlockDiv customClassName="flex-none md:block h-[100px] w-[85px] bg-[#5A6785] px-[10px] py-[15px]">
            <Link href={"nation?page=community/home"}>
              <RenderAtom
                item={{
                  value:
                    "https://res.cloudinary.com/dzih5nqhg/image/upload/v1680853176/Community/logos_m0eilq.png",
                }}
                renderType="image"
              />
            </Link>
          </BlockDiv>
        </BlockDiv>
        <LeftSideMenu />
      </BlockDiv>
      {/* left side menu end */}

      {/* right side bar start */}
      <BlockDiv
        customClassName={`w-[${rightSidebarWidth}] z-40 h-screen fixed top-0 right-0 bottom-0 lg:relative bg-white shadow-lg md:h-full flex-col justify-between lg:hidden transition duration-150 ease-in`}
        customStyle={{
          transform: isOpenRightSidebar
            ? "translateX(0px)"
            : `translateX(${rightSidebarWidth})`,
        }}
        divNumber="MobileView"
      >
        {/* Хаах товч - Чих */}
        <RenderAtom
          item={{ value: <i className="fal fa-xmark text-white"></i> }}
          renderType="button"
          customClassName={`h-10 w-10 bg-[#5A6785] absolute left-0 ${rightButtonMarginTop} -ml-10 flex items-center shadow rounded-tl rounded-bl justify-center cursor-pointer text-white ${
            isOpenRightSidebar ? "" : "hidden"
          }`}
          onClick={() => {
            setIsOpenRightSidebar(false);
          }}
        />
        <MobileMenu menuData={subMenuData} activeMenu={activeMenu} />
      </BlockDiv>
      {/* right side bar end */}

      {/* right side chat start */}
      <BlockDiv
        customClassName={`w-[85px] z-40 h-screen fixed top-0 right-0 bottom-0 lg:relative bg-white shadow-lg md:h-full flex-col justify-between lg:hidden transition duration-150 ease-in`}
        customStyle={{
          transform: isOpenRightChat ? "translateX(0px)" : `translateX(85px)`,
        }}
        divNumber="MobileView"
      >
        {/* Хаах товч - Чих */}
        <RenderAtom
          item={{ value: <i className="fal fa-xmark text-white"></i> }}
          renderType="button"
          customClassName={`h-10 w-10 bg-[#5A6785] absolute left-0 ${rightButtonMarginTop} -ml-10 flex items-center shadow rounded-tl rounded-bl justify-center cursor-pointer text-white ${
            isOpenRightChat ? "" : "hidden"
          }`}
          onClick={() => {
            setIsOpenRightChat(false);
          }}
        />
        <RightSideUsers />
      </BlockDiv>
      {/* right side chat end */}

      {/* chat mobile button */}
      <BlockDiv customClassName="absolute bottom-5 right-5 lg:hidden z-20 ">
        <BlockDiv customClassName="flex justify-center items-center cursor-pointer bg-[#FF1564] rounded-full h-[50px] w-[50px]">
          <RenderAtom
            renderType="image"
            item={{
              value:
                "https://res.cloudinary.com/dzih5nqhg/image/upload/v1685417565/Community/14_wpl1ih.png",
            }}
            customClassName={"items-center justify-center w-[25px] h-[25px]"}
            onClick={() => {
              setIsOpenRightChat(true);
            }}
          />
        </BlockDiv>
      </BlockDiv>

      {/* chat mobile button end*/}
    </BlockDiv>
  );
}

const MobileMenu = ({
  menuData,
  activeMenu,
}: {
  menuData: any;
  activeMenu: string;
}) => {
  const { data: session, status }: any = useSession();

  const Icons = [
    { icon: "fa-house" },
    { icon: "fa-address-card" },
    { icon: "fa-messages" },
    { icon: "fa-user-group" },
    { icon: "fa-calendar-days" },
    { icon: "fa-newspaper" },
    { icon: "fa-graduation-cap" },
    { icon: "fa-chart-line-up" },
    { icon: "fa-laptop" },
    { icon: "fa-trash" },
    { icon: "fa-check" },
  ];

  return (
    <BlockDiv customClassName="flex flex-col h-screen w-full p-5">
      {/* profile */}
      <BlockDiv customClassName="flex gap-x-[10px] border-b pb-5">
        <Popover
          content={NationHeaderUserMenuList}
          trigger="click"
          placement="bottomRight"
        >
          <RenderAtom
            renderType="image"
            item={{
              value:
                session?.profileImg ||
                "https://res.cloudinary.com/dzih5nqhg/image/upload/v1673497491/Community/Image_ujrlea.png",
            }}
            customClassName={"rounded-full h-[40px] w-[40px] cursor-pointer"}
          />
        </Popover>
        <BlockDiv customClassName="flex flex-col text-left justify-start items-left">
          <RenderAtom
            renderType="text"
            item={{ value: session?.username || "Ж.Гэндэнсүрэн" }}
            customClassName={"text-[#585858] text-[16px] font-medium"}
          />
          <RenderAtom
            renderType="text"
            item={{ value: "Голомт банк" }}
            customClassName={"text-[#67748E] text-[14px]"}
          />
        </BlockDiv>
      </BlockDiv>
      {/* Menu */}
      <BlockDiv customClassName="flex flex-col w-full py-[10px] space-y-[10px]">
        <RenderAtom
          renderType="text"
          item={{ value: "Цэс" }}
          customClassName={"text-[18px] text-[#3C3C3C] font-bold"}
        />
        {/* search */}
        <BlockDiv customClassName="relative w-full h-[36px]">
          <input
            placeholder="Хайх... "
            className="w-full h-full pl-[10px] rounded-[10px] bg-white border border-[#E1E1E1] absolute z-0 focus:border-1 active:border-1"
          />
          <RenderAtom
            item={{ value: "fa-regular fa-magnifying-glass" }}
            renderType="icon"
            customClassName={
              "text-[16px] text-[#67748E] absolute z-5 top-1/2 -translate-y-1/2 right-[10px]"
            }
          />
        </BlockDiv>

        {menuData.map((row: any, index: number) => {
          return (
            <Link key={index} href={`nation?page=${row.weburl}`}>
              <BlockDiv
                customClassName={`flex flex-row space-x-[10px] group  ${
                  activeMenu.startsWith(row.weburl)
                    ? "text-[#0165E0] font-medium"
                    : "text-[#585858] font-normal"
                }`}
              >
                <RenderAtom
                  item={{ value: `fa-light fa-sharp ${Icons[index].icon}` }}
                  renderType="icon"
                  customClassName="text-[14px] w-[16px] h-[16px] cursor-pointer break-normal font-medium mt-[1px]"
                />
                <RenderAtom
                  item={{ value: row.name }}
                  renderType="text"
                  customClassName="text-[16px] cursor-pointer break-normal"
                />
              </BlockDiv>
            </Link>
          );
        })}
      </BlockDiv>
    </BlockDiv>
  );
};

const dataSrc = [
  {
    igmSrc: "",
    title: "",
    domain: "hr",
  },
  {
    igmSrc: "",
    title: "",
    domain: "help",
  },
  {
    igmSrc: "",
    title: "",
    domain: "developer",
  },
  {
    igmSrc: "",
    title: "",
    domain: "hr",
  },
];
