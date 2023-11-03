import RenderAtom from "@/components/common/Atom/RenderAtom";
import BlockDiv from "@/components/common/Block/BlockDiv";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import { useState, useContext } from "react";

export default function CommunityHomeSection07() {
  const { readyDatasrc } = useContext(WidgetWrapperContext);

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
      customClassName="bg-[#F3F4F6] flex flex-col px-5"
    >
      <BlockDiv customClassName="flex flex-col sm:mx-auto sm:container md:py-[60px] py-5 gap-5">
        <BlockDiv customClassName="flex flex-col w-full justify-center gap-5">
          <RenderAtom
            item={{ value: "Хэрэглэгч танд" }}
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
        </BlockDiv>

        <BlockDiv customClassName="flex flex-col space-y-5 items-center justify-center">
          <BlockDiv customClassName="w-full flex flex-row items-center gap-x-[30px]">
            {staticItem1.map((item: any, index: number) => {
              return (
                // eslint-disable-next-line react/jsx-key
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
            <BlockDiv customClassName="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-5 gap-5">
              {readyDatasrc.map((item: any, index: number) => {
                return (
                  <ItemCard
                    categoryname={item.itemcategoryname}
                    productName={item.itemname}
                    companyname={item.companyname}
                    price={item.salepricestring}
                    productImg={item.profilephoto}
                    key={index}
                  />
                );
              })}
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
                "flex text-[#FFAE00] lg:text-[16px] text-[12px] font-medium group-hover:text-white"
              }
            />
          </BlockDiv>
        </BlockDiv>
      </BlockDiv>
    </BlockDiv>
  );
}

const ItemCard = ({
  categoryname,
  productName,
  companyname,
  price,
  productImg,
}: {
  categoryname: string;
  productName: string;
  companyname: string;
  price: string;
  productImg: string;
}) => {
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
      customClassName={`rounded-lg bg-white h-[365px] shadow-cozysmall `}
      divNumber="CozyProductCardOuter"
    >
      <BlockDiv
        customClassName="relative h-full"
        divNumber="CozyProductCardInner"
      >
        {/* Зураг */}
        <RenderAtom
          item={{ value: productImg }}
          renderType="image"
          customClassName="max-w-[240px] max-h-[240px] border-[1px] border-red-200 rounded-xl object-contain object-center p-0 cursor-pointer"
        />
        <BlockDiv
          customClassName="p-3 flex flex-col gap-3"
          divNumber="CozyProductCardBody"
        >
          {/* Ангилал */}
          <RenderAtom
            item={{ value: categoryname }}
            renderType="text"
            customClassName="block font-normal"
            customStyle={{
              fontSize: "12px",
              lineHeight: "14px",
              color: "#A0A0A0",
            }}
          />
          {/* Гарчиг */}
          <RenderAtom
            item={{ value: productName }}
            renderType="title"
            customClassName="font-medium text-[14px] leading-[18px] text-[#585858] hover:text-{colorPrimary}"
            customProps={{
              truncateRow: 3,
            }}
          />
          {/* Компани */}
          <RenderAtom
            item={{ value: companyname }}
            renderType="text"
            customClassName="block font-normal"
            customStyle={{
              fontSize: "12px",
              lineHeight: "14px",
              color: "#A0A0A0",
            }}
          />
          {/* Тайлбар */}
        </BlockDiv>
        <BlockDiv
          customClassName="flex flex-row items-center justify-between absolute bottom-0 inset-x-0 p-3"
          divNumber="CozyProductCardBottom"
        >
          {/* Үнэ */}
          <RenderAtom
            item={{ value: price }}
            renderType="currency"
            customClassName="text-[#1FA37D] text-[16px] font-bold"
          />

          <RenderAtom
            item={{ value: "Сагс" }}
            renderType="button"
            customClassName={
              "text-[#E64442] lg:text-[16px] text-[12px] font-medium py-2 px-4 border border-[#E64442] rounded-[40px] hover:bg-[#E64442] hover:text-white"
            }
            customProps={{
              type: "icon",
              icon: "fa-regular fa-bag-shopping",
            }}
          />
        </BlockDiv>
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
