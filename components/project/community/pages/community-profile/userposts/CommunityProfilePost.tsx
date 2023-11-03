import React from "react";
import BlockDiv from "@/components/common/Block/BlockDiv";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import { useContext, useEffect, useState } from "react";
import _ from "lodash";

const Post = () => {
  const { readyDatasrc } = useContext(WidgetWrapperContext);

  const staticItem1 = _.values(readyDatasrc[0]);

  const [commentIndex, setCommentIndex] = useState<number>(99999);
  const [comment, setComment] = useState<boolean[]>(
    new Array(staticItem1?.length).fill(false)
  );

  useEffect(() => {
    let newArray: boolean[] = new Array(staticItem1?.length).fill(false);
    newArray[commentIndex] = true;
    setComment(newArray);
  }, [commentIndex]);

  return (
    <BlockDiv customClassName={"w-full flex flex-col gap-[10px]"}>
      {staticItem1?.map((item: any, index: number) => {
        return (
          <>
            <BlockDiv
              key={index}
              customClassName="w-full flex flex-col bg-white rounded-[10px] "
            >
              <BlockDiv customClassName="w-full p-5 flex flex-col gap-[10px]">
                <BlockDiv customClassName="flex items-center justify-between">
                  <BlockDiv customClassName="flex gap-[10px] ">
                    <BlockDiv customClassName="w-10 h-10 rounded-full overflow-hidden ">
                      <RenderAtom
                        renderType="image"
                        item={{ value: item?.profileImage }}
                        customClassName="w-full h-full object-cover"
                      />
                    </BlockDiv>
                    <BlockDiv customClassName="relative h-full flex flex-col justify-start ">
                      <RenderAtom
                        renderType="text"
                        item={{ value: item?.name }}
                        customClassName="text-[16px] font-bold text-[#585858]"
                      />
                      <RenderAtom
                        renderType="text"
                        item={{ value: item?.createdDate }}
                        customClassName="text-[14px] text-[#A0A0A0] "
                      />
                    </BlockDiv>
                    <BlockDiv customClassName="flex items-start">
                      <BlockDiv customClassName="flex gap-[6px] items-center">
                        <BlockDiv customClassName="bg-[#00ADF1] rounded-full w-4 h-4 flex items-center justify-center ">
                          <RenderAtom
                            renderType="icon"
                            item={{ value: item?.role.icon }}
                            customClassName="text-white text-[10px]"
                          />
                        </BlockDiv>
                        <RenderAtom
                          renderType="text"
                          item={{ value: item?.role.who }}
                          customClassName="text-[14px] text-[#A0A0A0] "
                        />
                      </BlockDiv>
                    </BlockDiv>
                  </BlockDiv>
                  <BlockDiv customClassName="group active:bg-[#F3F4F6] w-6 h-6 rounded-full flex items-center justify-center gap-[3px] cursor-pointer">
                    <BlockDiv customClassName="w-[3px] h-[3px] rounded-full bg-[#585858] group-active:bg-[#0165E0] "></BlockDiv>
                    <BlockDiv customClassName="w-[3px] h-[3px] rounded-full bg-[#585858] group-active:bg-[#0165E0] "></BlockDiv>
                    <BlockDiv customClassName="w-[3px] h-[3px] rounded-full bg-[#585858] group-active:bg-[#0165E0] "></BlockDiv>
                  </BlockDiv>
                </BlockDiv>
                <BlockDiv>
                  <RenderAtom
                    renderType="text"
                    item={{ value: item?.title }}
                    customClassName="text-[14px] text-[#585858] "
                  />
                </BlockDiv>
              </BlockDiv>
              <BlockDiv customClassName="w-full pb-5">
                <RenderAtom renderType="image" item={{ value: item?.image }} />
              </BlockDiv>
              <BlockDiv customClassName="p-5 pt-0 flex flex-col gap-5">
                <BlockDiv customClassName="flex items-center justify-between">
                  <BlockDiv customClassName="flex items-center gap-[10px] px-[10px] py-[6px] rounded-[10px] bg-[#E6F0FC] cursor-pointer">
                    <RenderAtom
                      renderType="icon"
                      item={{ value: item?.reaction.icon }}
                      customClassName="text-[#0165E0] text-[16px] "
                    />
                    <RenderAtom
                      renderType="text"
                      item={{ value: item?.reaction.count }}
                      customClassName="text-[#0165E0] text-[14px]"
                    />
                  </BlockDiv>
                  <BlockDiv
                    customClassName="flex items-center gap-[10px] px-[10px] py-[6px] text-[#A0A0A0] cursor-pointer"
                    onClick={() => {
                      setCommentIndex(index);
                    }}
                  >
                    <RenderAtom
                      renderType="icon"
                      item={{ value: item?.comment.icon }}
                      customClassName="text-[16px]"
                    />
                    <RenderAtom
                      renderType="text"
                      item={{ value: item?.comment.count }}
                      customClassName="text-[14px]"
                    />
                  </BlockDiv>
                </BlockDiv>
                <BlockDiv
                  customClassName={`${
                    comment[index] ? "flex" : "hidden"
                  } flex-col`}
                >
                  <BlockDiv customClassName="relative border border-[#E1E1E1] rounded-[10px] py-1 px-2 pr-4 flex justify-between items-center">
                    <RenderAtom
                      renderType="input"
                      customProps={{
                        placeholder: item?.input.placeHolder,
                      }}
                      customClassName="focus:ring-0 border-0 placeholder:text-[#3C3C43]/60"
                    />
                    <RenderAtom
                      renderType="icon"
                      item={{ value: item?.input.icon }}
                      customClassName="text-[#0165E0] text-[22px] cursor-pointer"
                    />
                  </BlockDiv>
                  <BlockDiv customClassName="flex flex-col divide-y divide-[#E1E1E1]">
                    {item?.commentWriter.map((item: any, index: number) => {
                      return (
                        <>
                          <BlockDiv
                            key={index}
                            customClassName="py-5 flex flex-col"
                          >
                            <BlockDiv customClassName="flex items-start justify-between">
                              <BlockDiv customClassName="flex gap-[10px] items-start">
                                <BlockDiv customClassName="w-10 h-10 rounded-full overflow-hidden ">
                                  <RenderAtom
                                    renderType="image"
                                    item={{
                                      value: item?.profileImage,
                                    }}
                                    customClassName="w-full h-full object-cover"
                                  />
                                </BlockDiv>
                                <BlockDiv customClassName="flex flex-col">
                                  <RenderAtom
                                    renderType="text"
                                    item={{ value: item?.name }}
                                    customClassName="text-[#585858] text-[14px] font-medium "
                                  />
                                  <BlockDiv customClassName="w-[644px]">
                                    <RenderAtom
                                      renderType="text"
                                      item={{ value: item?.comment }}
                                      customClassName="text-[#585858] text-[14px] "
                                    />
                                  </BlockDiv>
                                  <BlockDiv customClassName="flex items-center gap-5">
                                    <RenderAtom
                                      renderType="text"
                                      item={{ value: item?.date }}
                                      customClassName="text-[#A0A0A0] text-[12px] "
                                    />
                                    <RenderAtom
                                      renderType="text"
                                      item={{ value: item?.reply }}
                                      customClassName="text-[12px] font-bold text-[#585858] "
                                    />
                                  </BlockDiv>
                                  <BlockDiv
                                    customClassName={`${
                                      item?.replied ? "block" : "hidden"
                                    } cursor-pointer `}
                                  >
                                    <RenderAtom
                                      renderType="text"
                                      item={{
                                        value: `Өмнөх ${item?.replied?.length} сэтгэгдэл харах...`,
                                      }}
                                      customClassName="text-[14px] text-[#585858] font-medium"
                                    />
                                  </BlockDiv>
                                  <BlockDiv customClassName="flex flex-col gap-[10px]">
                                    {item?.replied?.map(
                                      (item: any, index: number) => {
                                        return (
                                          <>
                                            <BlockDiv
                                              key={index}
                                              customClassName="flex items-start gap-[10px]"
                                            >
                                              <BlockDiv customClassName="w-6 h-6 rounded-full overflow-hidden ">
                                                <RenderAtom
                                                  renderType="image"
                                                  item={{
                                                    value: item?.profileImage,
                                                  }}
                                                  customClassName="w-full h-full object-cover"
                                                />
                                              </BlockDiv>
                                              <BlockDiv customClassName=" h-full flex flex-col justify-start ">
                                                <RenderAtom
                                                  renderType="text"
                                                  item={{
                                                    value: item?.name,
                                                  }}
                                                  customClassName="text-[15px] font-semibold text-[#585858]"
                                                />
                                                <BlockDiv customClassName="w-[540px]">
                                                  <RenderAtom
                                                    renderType="text"
                                                    item={{
                                                      value: item?.comment,
                                                    }}
                                                  />
                                                </BlockDiv>
                                              </BlockDiv>
                                            </BlockDiv>
                                          </>
                                        );
                                      }
                                    )}
                                  </BlockDiv>
                                </BlockDiv>
                              </BlockDiv>
                              <BlockDiv customClassName="group active:bg-[#F3F4F6] w-6 h-6 rounded-full flex items-center justify-center gap-[3px] cursor-pointer">
                                <BlockDiv customClassName="w-[3px] h-[3px] rounded-full bg-[#585858] group-active:bg-[#0165E0] "></BlockDiv>
                                <BlockDiv customClassName="w-[3px] h-[3px] rounded-full bg-[#585858] group-active:bg-[#0165E0] "></BlockDiv>
                                <BlockDiv customClassName="w-[3px] h-[3px] rounded-full bg-[#585858] group-active:bg-[#0165E0] "></BlockDiv>
                              </BlockDiv>
                            </BlockDiv>
                          </BlockDiv>
                        </>
                      );
                    })}
                  </BlockDiv>
                </BlockDiv>
              </BlockDiv>
            </BlockDiv>
          </>
        );
      })}
    </BlockDiv>
  );
};

export default Post;
