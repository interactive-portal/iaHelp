import { useState, useContext } from "react";
import { Rate } from "antd";
import _ from "lodash";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import BlockDiv from "@/components/common/Block/BlockDiv";
import RenderAtom from "@/components/common/Atom/RenderAtom";
export default function CommunityHomeSection03() {
  const { readyDatasrc } = useContext(WidgetWrapperContext);

  const groupBy = _.chain(readyDatasrc)
    .groupBy("categoryname")
    .map((row, key) => ({
      categoryName: key,
      data: row,
    }))
    .value();

  const [active, setActive] = useState(groupBy[0]?.categoryName);

  return (
    <BlockDiv
      divNumber="ProlianceHero03Outer"
      customClassName="bg-[#F3F4F6] flex flex-col"
    >
      <BlockDiv customClassName="flex flex-col sm:mx-auto sm:container md:py-[60px] py-5 gap-5">
        <BlockDiv customClassName="flex flex-col items-center w-full gap-5">
          <RenderAtom
            item={{ value: "Онлайн хичээл" }}
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
              "sm:text-[16px] text-[12px] text-[#67748E] sm:w-2/3 text-center"
            }
          />
        </BlockDiv>

        <BlockDiv customClassName="flex flex-col space-y-5 items-center justify-center">
          <BlockDiv customClassName="w-full flex flex-row items-center gap-x-[30px]">
            {groupBy.map((item: any, index: number) => {
              return (
                // eslint-disable-next-line react/jsx-key
                <BlockDiv
                  customClassName={`border-b-[2px] pb-[10px] ${
                    active == item?.categoryName
                      ? "border-[#0165E0]"
                      : "border-b-white"
                  }`}
                  key={item?.id || index}
                >
                  <RenderAtom
                    item={{ value: item?.categoryName }}
                    renderType="text"
                    onClick={() => setActive(item?.categoryName)}
                    customClassName={`text-[16px] cursor-pointer ${
                      active == item?.categoryName
                        ? "font-bold text-[#0165E0]"
                        : "text-[#585858] font-medium"
                    }`}
                  />
                </BlockDiv>
              );
            })}
          </BlockDiv>
          <BlockDiv customClassName="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 xl:gap-x-5 gap-5">
            {groupBy
              ?.filter((data: any) => data?.categoryName == active)
              .map((item: any, index: number) => {
                return item?.data.map((row: any, index: number) => {
                  return (
                    <Card
                      index={index}
                      lessonName={row.name}
                      teacher={row.author}
                      mainImage={row.mainimage}
                      rate={row.rating}
                      count={row.seencnt}
                    />
                  );
                });
              })}
          </BlockDiv>
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
  teacher,
  lessonName,
  mainImage,
  rate,
  count,
  index,
}: {
  teacher: string;
  lessonName: string;
  mainImage: string;
  rate: number;
  count: string;
  index: number;
}) => {
  return (
    <BlockDiv
      key={index || ""}
      customClassName="flex flex-col bg-white rounded-[10px] w-[305px] h-[305px]"
    >
      <RenderAtom
        renderType="image"
        customClassName={"h-[180px] w-full rounded-t-[10px]"}
        item={{
          value:
            mainImage ||
            "https://res.cloudinary.com/dzih5nqhg/image/upload/v1673497491/Community/Image_ujrlea.png",
        }}
      />
      <BlockDiv customClassName="flex flex-col p-[15px] gap-[10px]">
        <RenderAtom
          renderType="text"
          item={{ value: teacher }}
          customClassName={"text-[#a0a0a0] text-[14px]"}
        />
        <BlockDiv customClassName="flex flex-row items-center text-center gap-1">
          <Rate allowHalf disabled={true} defaultValue={4.5} />
          <RenderAtom
            renderType="text"
            item={{ value: `(${rate}) ${count}` }}
            customClassName="flex text-[14px] text-[#A0A0A0] text-center items-center"
          />
        </BlockDiv>
        <RenderAtom
          renderType="text"
          item={{ value: lessonName }}
          customClassName="text-[#585858] text-[16px] font-semibold"
        />
      </BlockDiv>
    </BlockDiv>
  );
};
