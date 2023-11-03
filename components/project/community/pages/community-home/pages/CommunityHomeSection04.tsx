import RenderAtom from "@/components/common/Atom/RenderAtom";
import BlockDiv from "@/components/common/Block/BlockDiv";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import { useState, useContext } from "react";

export default function CommunityHomeSection04() {
  const { readyDatasrc, widgetnemgooReady } = useContext(WidgetWrapperContext);
  const { backgroundImage } = widgetnemgooReady;
  const staticItem1 = [
    { title: "Онцлох" },
    { title: "Эрэлттэй" },
    { title: "Шинээр нэмэгдсэн" },
  ];

  const [active, setActive] = useState(0);

  return (
    <BlockDiv
      divNumber="ProlianceHero03Outer"
      customClassName="bg-white flex flex-col"
    >
      <BlockDiv customClassName="flex flex-col sm:mx-auto sm:container md:py-[60px] p-5 gap-5">
        <BlockDiv customClassName="flex flex-col w-full items-center gap-5">
          <RenderAtom
            item={{ value: "Нээлттэй ажлууд" }}
            renderType="text"
            customClassName={
              "lg:text-[34px] text-[20px] text-[#585858] font-medium"
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
            <BlockDiv customClassName="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 xl:gap-x-5 gap-5">
              {readyDatasrc.map((item: any, index: number) => {
                return (
                  <Card
                    jobCount={item.taskcount}
                    jobName={item.tendercategoryname}
                    imgurl={backgroundImage[index]}
                    key={index}
                  />
                );
              })}
            </BlockDiv>
          )}
          {active == 1 && (
            <BlockDiv customClassName="flex flex-col w-full p-5 rounded-[10px] bg-gray-100">
              <RenderAtom
                renderType="text"
                customClassName={"text-center text-[16px]"}
                item={{ value: "Дата хоосон байна." }}
              />
            </BlockDiv>
          )}
          {active == 2 && (
            <BlockDiv customClassName="flex flex-col w-full p-5 rounded-[10px] bg-gray-100">
              <RenderAtom
                renderType="text"
                customClassName={"text-center text-[16px]"}
                item={{ value: "Дата хоосон байна." }}
              />
            </BlockDiv>
          )}
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

const Card = ({
  jobName,
  jobCount,
  imgurl,
}: {
  jobName: string;
  jobCount: string;
  imgurl: string;
}) => {
  return (
    <BlockDiv
      customClassName={`flex flex-col rounded-[10px] w-full h-auto md:w-[305px] md:h-[305px] p-5 gap-[10px]`}
      customStyle={{
        backgroundImage: `url(${imgurl})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <RenderAtom
        renderType="text"
        item={{ value: jobName }}
        customClassName={"text-[#585858] font-semibold text-[22px]"}
      />
      <RenderAtom
        renderType="text"
        item={{ value: `${jobCount} ажил` }}
        customClassName={"text-[#67748E] text-[18px]"}
      />
    </BlockDiv>
  );
};
