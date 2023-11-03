import React from "react";
import BlockDiv from "@/components/common/Block/BlockDiv";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import { useContext, useEffect, useState } from "react";
import _ from "lodash";

const JobsBody = () => {
  const { readyDatasrc } = useContext(WidgetWrapperContext);

  const staticItem1 = _.values(readyDatasrc[0]);

  const [bottom, setBottom] = useState(
    new Array(staticItem1[0].buttons.length).fill(false)
  );
  const [bottomIndex, setBottomIndex] = useState(999);

  useEffect(() => {
    let newArr = new Array(staticItem1[0].buttons.length).fill(false);
    newArr[bottomIndex] = true;
    setBottom(newArr);
  }, [bottomIndex]);

  return (
    <>
      <BlockDiv customClassName={"w-full flex flex-col gap-5"}>
        {staticItem1.map((item: any, index: number) => {
          return (
            <>
              <BlockDiv customClassName="bg-white p-5 flex flex-col gap-[10px] rounded-[10px]">
                <BlockDiv customClassName="flex items-center justify-between">
                  <BlockDiv customClassName="flex items-center gap-[10px]">
                    <BlockDiv customClassName="w-[50px] h-[50px] flex justify-center items-center rounded-full bg-[#E6F0FC]">
                      <RenderAtom
                        renderType="icon"
                        item={{ value: item?.profileImg }}
                        customClassName="text-[24px] text-[#0165E0] "
                      />
                    </BlockDiv>
                    <BlockDiv customClassName="flex flex-col gap-[7px]">
                      <RenderAtom
                        renderType="text"
                        item={{ value: item?.title }}
                        customClassName="text-[16px] text-[#585858] leading-[16px] font-bold "
                      />
                      <BlockDiv customClassName="flex gap-[7px] items-center">
                        <RenderAtom
                          renderType="text"
                          item={{ value: item?.fromDate }}
                          customClassName="leading-[16px] text-[#A0A0A0]"
                        />
                        <RenderAtom
                          renderType="icon"
                          item={{ value: item?.dateIcon }}
                          customClassName="text-[#A0A0A0] text-[12px] "
                        />
                        <RenderAtom
                          renderType="text"
                          item={{ value: item?.toDate }}
                          customClassName="leading-[16px] text-[#FFAE00]"
                        />
                      </BlockDiv>
                    </BlockDiv>
                  </BlockDiv>
                  <BlockDiv
                    customClassName={`px-[15px] py-[10px] ${
                      item?.condition === "Гүйцэтгэж байгаа"
                        ? "bg-[#FFAE00]/10 text-[#FFAE00]"
                        : item?.condition === "Шинэ"
                        ? "bg-[#10CE00]/10 text-[#10CE00]"
                        : item?.condition === "Шийдвэрлэсэн"
                        ? "bg-[#26A0C7]/10 text-[#26A0C7]"
                        : item?.condition === "Шалгаж байгаа"
                        ? "bg-[#2F61D5]/10 text-[#2F61D5]"
                        : item?.condition === "Хүлээж авсан"
                        ? "bg-[#FF7A00]/10 text-[#FF7A00]"
                        : item?.condition === "Төлбөр төлсөн"
                        ? "bg-[#0C8AFF]/10 text-[#0C8AFF]"
                        : item?.condition === "Хаагдсан"
                        ? "bg-[#C36BF2]/10 text-[#C36BF2]"
                        : item?.condition === "Буцаасан"
                        ? "bg-[#31A24C]/10 text-[#31A24C]"
                        : "bg-[#FF3F57]/10 text-[#FF3F57]"
                    } rounded-[10px]`}
                  >
                    <RenderAtom
                      renderType="text"
                      item={{ value: item?.condition }}
                      customClassName="text-[14px] leading-[16px] font-bold"
                    />
                  </BlockDiv>
                </BlockDiv>
                <BlockDiv customClassName="w-full flex items-center justify-between">
                  <BlockDiv customClassName="w-[80%]">
                    <RenderAtom
                      renderType="text"
                      customClassName="text-[#585858] leading-[22px]"
                      item={{ value: item?.desc }}
                    />
                  </BlockDiv>
                  <BlockDiv customClassName="p-[10px] bg-[#F3F4F6] flex flex-col gap-[7px] rounded-[10px]">
                    <RenderAtom
                      renderType="text"
                      item={{ value: item?.rating.title }}
                      customClassName="text-[#A0A0A0] leading-[16px]"
                    />
                    <RenderAtom
                      renderType="text"
                      item={{ value: item?.rating.price }}
                      customClassName="text-[16px] font-bold text-[#585858] "
                    />
                  </BlockDiv>
                </BlockDiv>
                <BlockDiv customClassName="flex items-center justify-between">
                  <BlockDiv customClassName="flex items-center gap-[10px]">
                    {item?.buttons.map((item: any, index: number) => {
                      return (
                        <>
                          <BlockDiv
                            customClassName={`${
                              bottom[index]
                                ? "bg-[#E6F0FC] text-[#0165E0]"
                                : "bg-[#F3F4F6] text-[#67748E] "
                            } px-[10px] py-[6px] rounded-[10px]`}
                            onClick={() => {
                              setBottomIndex(index);
                            }}
                          >
                            <RenderAtom
                              renderType="text"
                              item={{ value: item }}
                              customClassName="font-medium leading-[16px]"
                            />
                          </BlockDiv>
                        </>
                      );
                    })}
                  </BlockDiv>
                  <BlockDiv customClassName="flex gap-[22px] items-center">
                    <BlockDiv customClassName="flex items-center gap-[10px]">
                      <RenderAtom
                        renderType="icon"
                        item={{ value: item?.view.icon }}
                        customClassName="text-[17px] text-[#A0A0A0]"
                      />
                      <RenderAtom
                        renderType="text"
                        item={{ value: item?.view.total }}
                        customClassName="font-medium text-[#A0A0A0]"
                      />
                    </BlockDiv>
                    <BlockDiv customClassName="flex flex-col gap-[3.5px]">
                      <BlockDiv customClassName="bg-[#A0A0A0] w-[3.33px] h-[3.33px] rounded-full "></BlockDiv>
                      <BlockDiv customClassName="bg-[#A0A0A0] w-[3.33px] h-[3.33px] rounded-full "></BlockDiv>
                      <BlockDiv customClassName="bg-[#A0A0A0] w-[3.33px] h-[3.33px] rounded-full "></BlockDiv>
                    </BlockDiv>
                  </BlockDiv>
                </BlockDiv>
              </BlockDiv>
            </>
          );
        })}
      </BlockDiv>
    </>
  );
};

export default JobsBody;
