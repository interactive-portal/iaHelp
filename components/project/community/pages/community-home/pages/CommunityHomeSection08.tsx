import { useState, useContext } from "react";
// import CommunityDiscussionPost from "../../Discussion/CommunityDiscussionPost";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import BlockDiv from "@/components/common/Block/BlockDiv";
import RenderAtom from "@/components/common/Atom/RenderAtom";

export default function CommunityHomeSection08() {
  const { readyDatasrc } = useContext(WidgetWrapperContext);

  const staticItem1 = [
    { title: "Онцлох" },
    { title: "Шинэ" },
    { title: "Сүүлд нэмэгдсэн" },
  ];

  const [active, setActive] = useState(0);

  return (
    <BlockDiv
      divNumber="ProlianceHero03Outer"
      customClassName="bg-[#F3F4F6] flex flex-col px-5"
    >
      <BlockDiv customClassName="flex flex-col sm:mx-auto sm:container md:py-[60px] py-5 gap-5">
        <RenderAtom
          item={{ value: "Хэлэлцүүлэг" }}
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
            "md:text-[16px] text-[14px] text-[#67748E] text-center"
          }
        />

        <BlockDiv customClassName="flex flex-col space-y-5 items-center justify-center">
          <BlockDiv customClassName="w-full flex flex-row items-center gap-x-[30px]">
            {staticItem1.map((item: any, index: number) => {
              return (
                <BlockDiv
                  customClassName={`border-b-[2px] md:pb-[10px] pb-[5px] ${
                    active == index ? "border-[#0165E0]" : "border-b-[#F3F4F6]"
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
            <BlockDiv customClassName="grid grid-cols-1 xl:grid-cols-2 xl:gap-x-5 gap-5">
              {readyDatasrc.map((item: any, index: number) => {
                return (
                  <></>
                  // <CommunityDiscussionPost
                  //   key={index}
                  //   item={item}
                  //   index={index}
                  // />
                );
              })}
            </BlockDiv>
          )}

          {active == 1 && <EmptySection />}
          {active == 2 && <EmptySection />}
        </BlockDiv>

        <BlockDiv customClassName="flex py-[10px] w-full justify-between ">
          <RenderAtom
            item={{ value: "Дахин харуулахгүй" }}
            renderType="text"
            customClassName={
              "text-[#585858] lg:text-[16px] text-[14px] font-medium"
            }
          />
          <BlockDiv customClassName="flex justify-center items-center py-2 px-4 border border-[#FFAE00] rounded-[10px] space-x-3 group cursor-pointer hover:bg-[#FFAE00]">
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
