import { useState, useContext } from "react";
import _ from "lodash";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import BlockDiv from "@/components/common/Block/BlockDiv";
import RenderAtom from "@/components/common/Atom/RenderAtom";

export default function CommunityHomeSection06() {
  const { readyDatasrc } = useContext(WidgetWrapperContext);

  const staticItem1 = [
    { title: "Онцлох" },
    { title: "Шинэ" },
    { title: "Сүүлд үзсэн" },
  ];

  const groupData = _.values(readyDatasrc[0]?.groups);
  const [active, setActive] = useState(0);

  return (
    <BlockDiv
      divNumber="CommunityHomeSection06Outer"
      customClassName="bg-white flex flex-col px-5"
    >
      <BlockDiv customClassName="flex flex-col sm:mx-auto sm:container md:py-[60px] py-5 gap-5">
        <BlockDiv customClassName="flex flex-col w-full justify-center gap-5">
          <RenderAtom
            item={{ value: "Санал болгох групп" }}
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
              "md:text-[16px] text-[12px] text-[#67748E] text-center"
            }
          />
        </BlockDiv>

        <BlockDiv customClassName="flex flex-col space-y-5 items-center justify-center">
          <BlockDiv customClassName="w-full flex flex-row items-center gap-x-[30px]">
            {staticItem1.map((item: any, index: number) => {
              return (
                // eslint-disable-next-line react/jsx-key
                <BlockDiv
                  customClassName={`border-b-[2px] md:pb-[10px] pb-[5px] ${
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
            <BlockDiv customClassName="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:gap-x-5 gap-5 py-1">
              {readyDatasrc.map((item: any, index: number) => {
                return <GroupCard data={item} key={index} index={index} />;
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

          {active == 2 && (
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

        <BlockDiv customClassName="flex py-[10px] w-full justify-between">
          <RenderAtom
            item={{ value: "Дахин харуулахгүй" }}
            renderType="text"
            customClassName={
              "text-[#585858] lg:text-[16px] text-[14px] font-medium"
            }
          />
          <BlockDiv customClassName="flex justify-center items-center py-2 px-4 border border-[#FFAE00] rounded-[10px] space-x-3 group hover:bg-[#FFAE00] cursor-pointer">
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
                "flex text-[#FFAE00] group-hover:text-white lg:text-[16px] text-[12px] font-medium "
              }
            />
          </BlockDiv>
        </BlockDiv>
      </BlockDiv>
    </BlockDiv>
  );
}

const GroupCard = (data: any, index: number) => {
  const item = data?.data;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onShowModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <BlockDiv
      key={index || ""}
      customClassName="flex flex-col items-center text-center bg-white group delay-150 duration-300 ease-in-out rounded-xl shadow"
    >
      <BlockDiv customClassName="w-full h-[90px] rounded-t-lg">
        <RenderAtom
          item={{ value: item?.profilepicture }}
          renderType="image"
          customClassName={"w-full h-full object-cover object-top rounded-t-lg"}
        />
      </BlockDiv>
      <BlockDiv customClassName="relative flex w-full h-[230px] flex-col gap-y-[19px] pt-[54px] ">
        <BlockDiv customClassName="z-5 absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[95px] h-[95px]">
          <BlockDiv customClassName="bg-center rounded-full flex items-center justify-center w-[93px] h-[93px] bg-cover group-hover:bg-[url('https://res.cloudinary.com/dzih5nqhg/image/upload/v1674110690/Community/Vector_evuhhm.png')] bg-[url('https://res.cloudinary.com/dzih5nqhg/image/upload/v1674110690/Community/Vector_1_xti5b3.png')]">
            {/* <RenderAtom
                        item={{ value: `${circleBorder}` }}
                        renderType="image"
                        customClassName={` absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2`} /> */}
            <RenderAtom
              item={{ value: item?.profilephoto }}
              renderType="image"
              customClassName={
                "w-[80px] h-[80px] object-cover object-center border-[4px] border-[#FFFFFF] p-1 shadow-xl rounded-full group-hover:bg-[#FFAE00] bg-white z-0"
              }
            />
          </BlockDiv>
        </BlockDiv>
        <RenderAtom
          item={item?.position1}
          renderType="title"
          customClassName={"text-[14px] text-[#585858]"}
        />
        <RenderAtom
          item={{ value: item?.typename }}
          renderType="text"
          customClassName={"text-[12px] text-[#A0A0A0]"}
        />

        {/* members start */}

        <BlockDiv customClassName="relative flex flex-row justify-center ml-[40px]">
          <BlockDiv customClassName="flex flex-row relative">
            <BlockDiv customClassName="absolute w-[30px] h-[30px] right-[0px] rounded-full border-[2px] border-white shadow-xl z-1">
              <RenderAtom
                item={{
                  value:
                    "https://res.cloudinary.com/dzih5nqhg/image/upload/v1672196743/Mdm/Mdm02Person_i2hqnu.jpg",
                }}
                renderType="image"
                customClassName={
                  "w-full h-full rounded-full object-cover object-center"
                }
              />
            </BlockDiv>
            <BlockDiv customClassName="absolute w-[30px] h-[30px] right-[20px] rounded-full border-[2px] border-white shadow-xl z-2">
              <RenderAtom
                item={{
                  value:
                    "https://res.cloudinary.com/dzih5nqhg/image/upload/v1674119133/cld-sample.jpg",
                }}
                renderType="image"
                customClassName={
                  "w-full h-full rounded-full object-cover object-center"
                }
              />
            </BlockDiv>
            <BlockDiv customClassName="absolute w-[30px] h-[30px] right-[40px] rounded-full border-[2px] border-white shadow-xl z-3">
              <RenderAtom
                item={{
                  value:
                    "https://res.cloudinary.com/dzih5nqhg/image/upload/v1672196744/Mdm/Mdm02Person04_okopnb.jpg",
                }}
                renderType="image"
                customClassName={
                  "w-full h-full rounded-full object-cover object-center"
                }
              />
            </BlockDiv>
          </BlockDiv>
          <RenderAtom
            item={{ value: ` • ${item?.membercount}` }}
            customClassName="left-[20px] text-[#A0A0A0] text-[18px] ml-2"
          />
        </BlockDiv>
        {/* members end */}

        <BlockDiv customClassName="absolute bottom-[10px] px-[10px] w-full">
          <RenderAtom
            onClick={onShowModal}
            item={{ value: "Элсэх" }}
            renderType="button"
            customClassName={
              "text-[14px] group-hover:text-white text-gray-800 font-medium bg-[#F2F2F2] group-hover:bg-[#FFAE00] rounded-lg py-3 w-full"
            }
          />
        </BlockDiv>
      </BlockDiv>
    </BlockDiv>
  );
};
