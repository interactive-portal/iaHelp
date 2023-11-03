import Link from "next/link";
import useSWR from "swr";
import { useCloud } from "hooks/use-cloud";
import { useState } from "react";
import BlockDiv from "@/components/common/Block/BlockDiv";
import RenderAtom from "@/components/common/Atom/RenderAtom";

export default function LeftSideMenu() {
  const cloudContext = useCloud();
  const metaNameV2 = cloudContext.hostObject.metaNameV2;
  const { data } = useSWR(
    `/api/get-data-v2?metaid=1681870700394891&metaNameV2=${metaNameV2}`
  );

  //   console.log("useswr check:::>>", data);
  //  {
  //   id: "1",
  //   name: "Community nation",
  //   icon: null,
  //   colorcode: "#5A6785",
  //   weburl: "nation?page=community/home",
  // },
  const menu = [
    {
      id: "2",
      name: "Social",
      icon: "far fa-globe",
      colorcode: "#FF7E79",
      weburl: "nation?page=social/home",
    },
    {
      id: "3",
      name: "Cozy",
      icon: "far fa-shopping-bag",
      colorcode: "#FF8E50",
      weburl: "nation?page=cozy/home",
    },
    {
      id: "4",
      name: "Дэмжлэг үйлчилгээ",
      icon: "far fa-info-circle",
      colorcode: "#FEC345",
      weburl: "nation?page=help/home",
    },
    {
      id: "5",
      name: "Хөгжүүлэгч",
      icon: "far fa-code",
      colorcode: "#39E0CF",
      weburl: "nation?page=developer/home",
    },
    {
      id: "6",
      name: "Өгөгдлийн статистик",
      icon: "far fa-chart-line",
      colorcode: "#48C7F4",
      weburl: "nation?page=datastatistic/home",
    },
  ];

  return (
    <BlockDiv customClassName="flex flex-col w-[85px] h-screen bg-[#E8EBF0]">
      {/* <BlockDiv customClassName="h-[100px] w-[85px] bg-[#5A6785] px-[10px] py-[15px]">
        <Link href={"nation?page=community/home"}>
        <RenderAtom
          item={{
            value:
              "https://res.cloudinary.com/dzih5nqhg/image/upload/v1680853176/Community/logos_m0eilq.png",
          }}
          renderType="image"
          />
        </Link>
      </BlockDiv> */}
      {menu?.map((item: any, index: number) => {
        return (
          <MenuItem
            key={index}
            icon={item.icon}
            title={item.name}
            color={`text-[${item.colorcode}] text-xl`}
            url={item.weburl}
            id={item.id}
          />
        );
      })}
    </BlockDiv>
  );
}

const MenuItem = ({
  icon,
  title,
  color,
  url,
  id,
}: {
  icon: string;
  title: string;
  color: string;
  url: string;
  id: string;
}) => {
  const cloudContext = useCloud();
  const metaNameV2 =
    cloudContext?.hostObject?.pageSlug?.split("/")[0] || "community";
  const activePage = url.split("=")[1].split("/")[0] || "community";

  return (
    <Link href={url}>
      <BlockDiv
        customClassName={`flex flex-col items-center text-center border-b-2 border-[#D2D2D2] hover:bg-[#6E7E9F] hover:text-white p-4 w-full group ${
          activePage == metaNameV2 && "bg-[#6E7E9F]"
        }`}
      >
        <RenderAtom
          item={{ value: `fa-sharp fa-regular ${icon} ` }}
          renderType={"icon"}
          customClassName={color}
        />
        <RenderAtom
          item={{ value: title }}
          renderType={"text"}
          customClassName={` ${
            activePage == metaNameV2 ? "text-white" : "text-[#67748E]"
          } group-hover:text-white text-[11px] font-medium`}
        />
      </BlockDiv>
    </Link>
  );
};
