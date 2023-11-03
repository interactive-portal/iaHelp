import React from "react";
import BlockDiv from "@/components/common/Block/BlockDiv";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import { useContext, useEffect, useState } from "react";
import _ from "lodash";

const JobsSidebar = () => {
  const { readyDatasrc } = useContext(WidgetWrapperContext);

  const staticItem1 = readyDatasrc[0];
  const staticItem2 = _.values(readyDatasrc[1]);
  const staticItem3 = _.values(readyDatasrc[2]);
  const staticItem4 = _.values(readyDatasrc[3]);
  const staticItem5 = readyDatasrc[4];

  const catLenght = staticItem2.length;
  const typeLenght = catLenght * staticItem3.length;
  const optionLength = typeLenght * staticItem4.length;

  const oneCatLength = staticItem3.length * staticItem4.length;

  const [cat, setCat] = useState(new Array(catLenght).fill(false));
  const [catIndex, setCatIndex] = useState(999);

  const [type, setType] = useState(new Array(typeLenght).fill(false));
  const [typeIndex, setTypeIndex] = useState(999);

  const [option, setOption] = useState(new Array(optionLength).fill(false));
  const [optionIndex, setOptionIndex] = useState(999);

  const [bottom, setBottom] = useState(
    new Array(staticItem5.buttons.length).fill(false)
  );
  const [bottomIndex, setBottomIndex] = useState(999);

  useEffect(() => {
    let newArr = new Array(catLenght).fill(false);
    if (cat[catIndex] === true) {
      setCat(newArr);
    } else {
      newArr[catIndex] = true;
      setCat(newArr);
    }
  }, [catIndex]);

  useEffect(() => {
    let newArr = new Array(typeLenght).fill(false);
    newArr[typeIndex] = true;
    setType(newArr);
  }, [typeIndex]);

  useEffect(() => {
    let newArr = new Array(optionLength).fill(false);
    newArr[optionIndex] = true;
    setOption(newArr);
  }, [optionIndex]);

  useEffect(() => {
    let newArr = new Array(staticItem5.buttons.length).fill(false);
    newArr[bottomIndex] = true;
    setBottom(newArr);
  }, [bottomIndex]);

  return (
    <>
      <BlockDiv
        customClassName={
          "w-full flex flex-col gap-[10px] bg-white rounded-[10px] py-5"
        }
      >
        <BlockDiv customClassName="w-full px-5">
          <RenderAtom
            renderType="text"
            item={staticItem1.position1}
            customClassName="text-[#3C3C3C] text-[18px] font-medium"
          />
        </BlockDiv>
        <BlockDiv customClassName="w-full px-5">
          <BlockDiv customClassName="w-full rounded-[10px] px-[10px] border-[1.5px] border-[#E1E1E1] flex justify-between items-center overflow:hidden">
            <RenderAtom
              renderType="input"
              customProps={{ placeholder: staticItem1?.input.placeholder }}
              customClassName="focus:ring-0 border-0 placeholder:text-[#3C3C43]/60 rounded-[10px]"
            />
            <RenderAtom
              renderType="icon"
              item={{ value: staticItem1?.input.icon }}
              customClassName="cursor-pointer"
            />
          </BlockDiv>
        </BlockDiv>
        <BlockDiv customClassName="px-[10px] flex flex-col gap-1 w-full">
          {staticItem2?.map((item: any, index1: number) => {
            return (
              <>
                <BlockDiv key={index1} customClassName="flex flex-col">
                  <BlockDiv customClassName="p-[10px] flex justify-between items-center">
                    <BlockDiv customClassName="flex gap-[10px] items-center">
                      <RenderAtom
                        renderType="icon"
                        item={{ value: item?.mainIcon }}
                        customClassName={`${
                          cat[index1] ? "text-[#0165E0]" : "text-[#585858]"
                        } text-[18px]`}
                      />
                      <RenderAtom
                        renderType="text"
                        item={{ value: item?.title }}
                        customClassName="text-[14px] text-[#585858] font-medium"
                      />
                    </BlockDiv>
                    <BlockDiv
                      customClassName="w-10 h-5 flex justify-center items-center cursor-pointer text-[10px]"
                      onClick={() => {
                        setCatIndex(index1);
                      }}
                    >
                      <RenderAtom
                        renderType="icon"
                        item={{
                          value: cat[index1] ? item?.icon[1] : item?.icon[0],
                        }}
                      />
                    </BlockDiv>
                  </BlockDiv>
                  <BlockDiv
                    customClassName={`${
                      cat[index1] ? "flex" : "hidden"
                    } flex-col pl-[30px] pr-[10px] gap-5`}
                  >
                    {staticItem3?.map((item: any, index2: number) => {
                      return (
                        <>
                          <BlockDiv
                            key={index2}
                            customClassName="flex flex-col"
                          >
                            <BlockDiv customClassName="flex justify-between items-center">
                              <RenderAtom
                                renderType="text"
                                item={{ value: item?.title }}
                                customClassName="text-[14px] text-[#585858] font-medium"
                              />
                              <BlockDiv
                                customClassName="w-10 h-5 flex justify-center items-center cursor-pointer text-[10px]"
                                onClick={() => {
                                  setTypeIndex(index1 * typeLenght + index2);
                                }}
                              >
                                <RenderAtom
                                  renderType="icon"
                                  item={{
                                    value: type[index1 * typeLenght + index2]
                                      ? item?.icon[1]
                                      : item?.icon[0],
                                  }}
                                />
                              </BlockDiv>
                            </BlockDiv>
                            <BlockDiv
                              customClassName={`${
                                type[index1 * typeLenght + index2]
                                  ? "flex"
                                  : "hidden"
                              } flex-col pl-5 gap-[10px] py-[10px]`}
                            >
                              {staticItem4?.map((item: any, index3: number) => {
                                return (
                                  <>
                                    <BlockDiv
                                      key={index3}
                                      customClassName="flex justify-between items-center"
                                    >
                                      <BlockDiv customClassName="flex gap-[10px] items-center">
                                        <BlockDiv
                                          customClassName={`${
                                            option[
                                              index1 * oneCatLength +
                                                (index2 * staticItem4.length +
                                                  index3)
                                            ]
                                              ? "bg-[#0165E0] border-[#0165E0]"
                                              : "border-[#585858]"
                                          } flex justify-center items-center border rounded w-[14px] h-[14px]`}
                                          onClick={() => {
                                            setOptionIndex(
                                              index1 * oneCatLength +
                                                (index2 * staticItem4.length +
                                                  index3)
                                            );
                                          }}
                                        >
                                          <RenderAtom
                                            renderType="icon"
                                            item={{
                                              value: item?.icon,
                                            }}
                                            customClassName="text-[11px] text-white"
                                          />
                                        </BlockDiv>
                                        <RenderAtom
                                          renderType="text"
                                          item={{ value: item?.title }}
                                          customClassName="text-[14px] text-[#67748E]"
                                        />
                                      </BlockDiv>
                                      <BlockDiv customClassName="px-1 border border-[#E1E1E1] rounded-[5px]">
                                        <RenderAtom
                                          renderType="text"
                                          item={{ value: item?.count }}
                                          customClassName="text-[#67748E] text-[12px] "
                                        />
                                      </BlockDiv>
                                    </BlockDiv>
                                  </>
                                );
                              })}
                            </BlockDiv>
                          </BlockDiv>
                        </>
                      );
                    })}
                  </BlockDiv>
                </BlockDiv>
              </>
            );
          })}
        </BlockDiv>
      </BlockDiv>
    </>
  );
};

export default JobsSidebar;
