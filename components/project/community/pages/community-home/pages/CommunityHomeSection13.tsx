import { useState, useContext } from "react";
import { Tabs } from "antd";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import BlockDiv from "@/components/common/Block/BlockDiv";
import RenderAtom from "@/components/common/Atom/RenderAtom";

export default function CommunityHomeSection13() {
  const { readyDatasrc } = useContext(WidgetWrapperContext);

  const onChange = (key: string) => {
    console.log(key);
  };
  const staticItem1 = [
    { title: "Онцлох" },
    { title: "Эрэлттэй" },
    { title: "Нэмэгдсэн" },
    { title: "Хямдралтай" },
  ];

  const [active, setActive] = useState(0);

  return (
    <BlockDiv
      divNumber="ProlianceHero03Outer"
      customClassName="bg-white flex flex-col px-5"
    >
      <BlockDiv customClassName="flex flex-col sm:mx-auto sm:container md:py-[60px] py-5 gap-5">
        <BlockDiv customClassName="flex flex-col w-full justify-center gap-5">
          <RenderAtom
            item={{ value: "Нийтлэг үйлчилгээ" }}
            renderType="text"
            customClassName={
              "lg:text-[34px] text-[20px] text-[#585858] font-medium text-center"
            }
          />
          <RenderAtom
            item={{
              value:
                "Хэрэглэгч та бизнесийн олон төрлийн үйлчилгээг дижитал хэлбэрээр хялбар авах боломжтой бөгөөд цахим шилжилт хийсэн бизнесүүдийн үйлчилгээний сангаас сонголтоо хийн үйлчлүүлнэ үү.",
            }}
            renderType="text"
            customClassName={
              "sm:text-[16px] text-[12px] text-[#67748E] text-center"
            }
          />
        </BlockDiv>
        <BlockDiv customClassName="flex flex-col space-y-5 items-center justify-center">
          <BlockDiv customClassName="w-full flex flex-row items-center gap-x-[30px]">
            {staticItem1.map((item: any, index: number) => {
              return (
                // eslint-disable-next-line react/jsx-key
                <BlockDiv
                  customClassName={`border-b-[2px] pb-[5px] md:pb-[10px] ${
                    active == index ? "border-[#0165E0]" : "border-b-white"
                  }`}
                  key={item?.id || index}
                >
                  <RenderAtom
                    item={{ value: item?.title }}
                    renderType="text"
                    onClick={() => setActive(index)}
                    customClassName={`text-[14px] md:text-[16px] cursor-pointer ${
                      active == index
                        ? "font-bold text-[#0165E0]"
                        : "text-[#585858] font-medium"
                    }`}
                  />
                </BlockDiv>
              );
            })}
          </BlockDiv>

          {active == 0 && (
            <BlockDiv customClassName="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-5 gap-5">
              <MemberCard
                longDescr="Голомт банкны харилцагчид Veritech Cloud ERP системийн эхний хэрэглэгчид"
                imgUrl="https://res.cloudinary.com/dzih5nqhg/image/upload/v1666839526/interactive.mn/infor/About/Soma-onstage-2020-6_nngpzo.jpg"
                date="2021.12.23"
              />
              <MemberCard
                longDescr="Голомт банкны харилцагчид Veritech Cloud ERP системийн эхний хэрэглэгчид"
                imgUrl="https://res.cloudinary.com/dzih5nqhg/image/upload/v1666776317/interactive.mn/infor/Services/Hero_632984_infor_concierge_support_1600x800_gtt6qy.jpg"
                date="2021.12.23"
              />
              <MemberCard
                longDescr="Голомт банкны харилцагчид Veritech Cloud ERP системийн эхний хэрэглэгчид"
                imgUrl="https://res.cloudinary.com/dzih5nqhg/image/upload/v1673497491/Community/Image_ujrlea.png"
                date="2021.12.23"
              />
            </BlockDiv>
          )}

          {active == 1 && <EmptySection />}
          {active == 2 && <EmptySection />}
          {active == 3 && <EmptySection />}
        </BlockDiv>

        <BlockDiv customClassName="flex py-[10px] w-full justify-between ">
          <RenderAtom
            item={{ value: "Дахин харуулахгүй" }}
            renderType="text"
            customClassName={
              "text-[#585858] lg:text-[16px] text-[14px] font-medium"
            }
          />
          <BlockDiv customClassName="flex justify-center items-center py-2 px-4 border border-[#FFAE00] rounded-[10px] space-x-3 cursor-pointer hover:bg-[#FFAE00] group">
            <RenderAtom
              item={{ value: "Бүгдийг үзэх" }}
              renderType="text"
              customClassName={
                "text-[#FFAE00] lg:text-[16px] text-[12px] font-medium group-hover:text-white"
              }
            />
            <RenderAtom
              item={{ value: "fa-regular fa-arrow-right" }}
              renderType="icon"
              customClassName={
                "flex text-[#FFAE00] lg:text-[16px] text-[12px] font-medium group-hover:text-white"
              }
            />
          </BlockDiv>
        </BlockDiv>
      </BlockDiv>
    </BlockDiv>
  );
}

const MemberCard = ({
  imgUrl,
  longDescr,
  date,
}: {
  imgUrl: string;
  longDescr: string;
  date: string;
}) => {
  return (
    <BlockDiv
      customClassName="flex flex-col bg-white rounded-[20px] max-w-[410px]"
      divNumber="UserCardOuter"
    >
      <RenderAtom
        renderType="image"
        item={{ value: imgUrl }}
        customClassName="flex w-auto max-w-[410px] h-[230px] rounded-t-[20px]"
      />
      <BlockDiv customClassName="flex flex-col bg-[#F3F4F6] rounded-b-[20px] gap-1 p-5">
        <RenderAtom
          renderType="text"
          item={{ value: date }}
          customClassName={"text-[#009BDE] font-bold text-[16px]"}
        />
        <RenderAtom
          renderType="text"
          item={{ value: longDescr }}
          customClassName={"text-[#2C2C51] text-[18px]"}
        />
      </BlockDiv>
    </BlockDiv>
  );
};

const EmptySection = () => {
  return (
    <BlockDiv customClassName="flex w-full bg-gray-200 rounded-[10px] p-5">
      <RenderAtom
        renderType="text"
        item={{ value: "Хоосон байна" }}
        customClassName={"flex justify-center text-center text-[#585858]"}
      />
    </BlockDiv>
  );
};
