import RenderAtom from "@/components/common/Atom/RenderAtom";
import BlockDiv from "@/components/common/Block/BlockDiv";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import { useContext, useState } from "react";

export default function CommunityHomeSection02() {
  const { readyDatasrc } = useContext(WidgetWrapperContext);

  const staticItem1 = [
    { title: "Эрэлттэй үйлчилгээ" },
    { title: "Санал болгож буй үйлчилгээ" },
  ];

  const [active, setActive] = useState(0);

  return (
    <BlockDiv
      divNumber="CommunityQiuckLinkOuter"
      customClassName="bg-white flex flex-col"
    >
      <BlockDiv customClassName="flex flex-col sm:mx-auto sm:container  xl:py-[60px] py-5 md:gap-5 gap-[10px] px-[10px]">
        <BlockDiv customClassName="flex flex-row md:flex-col w-full justify-between md:justify-center md:gap-5 gap-[10px]">
          <RenderAtom
            item={{ value: "Түргэн холбоос" }}
            renderType="text"
            customClassName={
              "lg:text-[34px] text-[20px] text-[#585858] font-medium text-center"
            }
          />
          <BlockDiv customClassName="flex md:hidden justify-center items-center space-x-3 hover:bg-[#FFAE00] group cursor-pointer">
            <RenderAtom
              item={{ value: "Бүгд(7)" }}
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
          <RenderAtom
            item={{
              value:
                "Хэрэглэгч та бизнесийн олон төрлийн үйлчилгээг дижитал хэлбэрээр хялбар авах боломжтой бөгөөд цахим шилжилт хийсэн бизнесүүдийн үйлчилгээний сангаас сонголтоо хийн үйлчлүүлнэ үү.",
            }}
            renderType="text"
            customClassName={
              "text-[16px] text-[#67748E] text-center hidden md:block"
            }
          />
        </BlockDiv>

        <BlockDiv customClassName="flex flex-col md:space-y-5 items-center justify-center">
          <BlockDiv customClassName="w-full hidden md:flex flex-row items-center gap-x-[30px]">
            {staticItem1.map((item: any, index: number) => {
              return (
                // eslint-disable-next-line react/jsx-key
                <BlockDiv
                  customClassName={`border-b-[2px] pb-[10px] ${
                    active == index ? "border-[#0165E0]" : "border-b-white"
                  }`}
                  key={item?.id || index}
                >
                  <RenderAtom
                    item={{ value: item?.title }}
                    renderType="text"
                    onClick={() => setActive(index)}
                    customClassName={`text-[16px] cursor-pointer ${
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
            <BlockDiv customClassName="grid grid-cols-1 xs:grid-cols-2 2xl:grid-cols-3 md:gap-x-5 gap-1 mt-0">
              {readyDatasrc.map((item: any, index: number) => {
                return (
                  <Card
                    icon={item.icon}
                    name={item.name}
                    category={item.category}
                    key={index}
                  />
                );
              })}
            </BlockDiv>
          )}

          {active == 1 && (
            <BlockDiv customClassName="flex w-full bg-gray-200 rounded-[10px] p-5">
              <RenderAtom
                renderType="text"
                item={{ value: "Хоосон байна" }}
                customClassName={
                  "flex justify-center text-center text-[#585858]"
                }
              />
            </BlockDiv>
          )}
        </BlockDiv>

        <BlockDiv customClassName="hidden md:flex py-[10px] w-full justify-between ">
          <RenderAtom
            item={{ value: "Дахин харуулахгүй" }}
            renderType="text"
            customClassName={
              "text-[#585858] lg:text-[16px] text-[14px] font-medium"
            }
          />
          <BlockDiv customClassName="flex justify-center items-center py-2 px-4 border border-[#FFAE00] rounded-[10px] space-x-3 hover:bg-[#FFAE00] group cursor-pointer">
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

const Card = ({
  icon,
  name,
  category,
}: {
  icon: string;
  name: string;
  category: string;
}) => {
  return (
    <BlockDiv customClassName="flex flex-row p-[10px] xl:p-5 bg-[#F3F4F6] rounded-[10px] gap-[10px] w-full md:w-[300px] 2xl:w-[360px] 3xl:w-[410px] items-center">
      <BlockDiv customClassName="flex rounded-full bg-[#E1EBFD] items-center justify-center w-[40px] h-[40px] md:w-[70px] md:h-[70px]">
        <RenderAtom
          renderType="icon"
          item={{ value: `fa-regular ${icon}` }}
          customClassName={"text-[#2F81E5] md:text-[26px] text-[16px]"}
        />
      </BlockDiv>
      <BlockDiv customClassName="flex flex-col">
        <RenderAtom
          renderType="text"
          item={{ value: category }}
          customClassName={"text-[#67748E] text-[14px] hidden md:block"}
        />
        <RenderAtom
          renderType="text"
          item={{ value: name }}
          customClassName={
            "text-[#585858] text-[14px] leading-[16px] text-center md:text-[16px] md:font-semibold break-words "
          }
        />
        <RenderAtom
          renderType="text"
          item={{ value: "Голомт банк" }}
          customClassName={"text-[#585858] text-[14px] hidden md:block"}
        />
      </BlockDiv>
    </BlockDiv>
  );
};
