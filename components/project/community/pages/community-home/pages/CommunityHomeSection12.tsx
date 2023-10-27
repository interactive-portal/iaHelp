import RenderAtom from "@/components/common/Atom/RenderAtom";
import BlockDiv from "@/components/common/Block/BlockDiv";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import { useState, useContext } from "react";
import { Tabs, TabsProps } from "antd";

export default function CommunityHomeSection12() {
  const { readyDatasrc } = useContext(WidgetWrapperContext);
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Онцлох`,
    },
    {
      key: "2",
      label: `Эрэлттэй`,
    },
    {
      key: "3",
      label: `Шинээр нэмэгдсэн`,
    },
  ];

  return (
    <BlockDiv
      divNumber="ProlianceHero03Outer"
      customClassName="bg-[#F3F4F6] flex flex-col px-5"
    >
      <BlockDiv customClassName="flex flex-col sm:mx-auto sm:container md:py-10 py-5 items-center gap-[20px]">
        <RenderAtom
          item={{ value: "Байгууллагууд" }}
          renderType="text"
          customClassName={
            "lg:text-[40px] text-[20px] text-[#585858] font-bold"
          }
        />
        <RenderAtom
          item={{
            value:
              "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus",
          }}
          renderType="text"
          customClassName={
            "md:text-[16px] text-[14px] text-[#67748E] text-center max-w-[760px]"
          }
        />
        <Tabs
          defaultActiveKey="1"
          items={items}
          className="border-none xs:px-2 float-left w-full"
        />
        <BlockDiv customClassName="grid grid-cols-6 gap-[20px]">
          <MemberCard
            name="Оргил хүнсний сүлжээ"
            imgUrl="https://res.cloudinary.com/dzih5nqhg/image/upload/v1694997926/sprite_1_ecqbg9.png"
          />
          <MemberCard
            name="Good Price"
            imgUrl="https://res.cloudinary.com/dzih5nqhg/image/upload/v1653451005/cloud/item/Good_price_cl8hfn.png"
          />
          <MemberCard
            name="MSM ХХК"
            imgUrl="https://res.cloudinary.com/dzih5nqhg/image/upload/v1698371181/image_44188_pohqlu.png"
          />
          <MemberCard
            name="Тоёото - Таван богд"
            imgUrl="https://res.cloudinary.com/dzih5nqhg/image/upload/v1661222348/cloud/item/image_44183_racu7d.png"
          />
          <MemberCard
            name="Хас банк"
            imgUrl="https://res.cloudinary.com/dzih5nqhg/image/upload/v1698370973/%D0%A5%D0%B0%D1%81-%D0%B1%D0%B0%D0%BD%D0%BA_edgy76.png"
          />
          <MemberCard
            name="Некст групп"
            imgUrl="https://res.cloudinary.com/dzih5nqhg/image/upload/v1698371010/Next_logo_3_1_oki95l.png"
          />
          {/* nemeh card */}
        </BlockDiv>
        <BlockDiv customClassName="flex py-5 w-full justify-center ">
          <BlockDiv customClassName="flex justify-center items-center px-[20px] py-[15px] bg-[#699BF7] rounded-[30px] space-x-3">
            <RenderAtom
              item={{ value: "Бүгдийг үзэх" }}
              renderType="text"
              customClassName={
                "text-white lg:text-[16px] text-[12px] font-medium "
              }
            />
            <i className="fa-regular fa-arrow-right flex text-white lg:text-[16px] text-[12px] font-medium" />
            {/* <RenderAtom
              item={{ value: "fa-regular fa-arrow-right" }}
              renderType="icon"
              customClassName={
                "flex text-white lg:text-[16px] text-[12px] font-medium "
              }
            /> */}
          </BlockDiv>
        </BlockDiv>
      </BlockDiv>
    </BlockDiv>
  );
}

const MemberCard = ({ imgUrl, name }: { imgUrl: string; name: string }) => {
  return (
    <BlockDiv
      customClassName="flex flex-col bg-white rounded-[10px] gap-[10px] items-center justify-between p-[30px] h-[278px] cursor-pointer"
      divNumber="UserCardOuter"
    >
      <div className="flex items-center justify-center min-h-[120px]">
        <RenderAtom
          renderType="image"
          item={{ value: imgUrl }}
          customClassName="flex w-[130px] items-center justify-center"
        />
      </div>
      <RenderAtom
        renderType="text"
        item={{ value: name }}
        customClassName={
          "text-[#585858] text-[16px] font-bold text-center justify-end"
        }
      />
      <RenderAtom
        renderType="text"
        item={{ value: "15 хичээл" }}
        customClassName={
          "text-[#67748E] text-[16px] font-normal text-center justify-end"
        }
      />
    </BlockDiv>
  );
};
