import React from "react";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import BlockDiv from "@/components/common/Block/BlockDiv";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import { useContext, useState, useEffect } from "react";
import { useToggle } from "react-use";
import { useRouter } from "next/router";
// import BlockModal2 from "@components/common/Block/BlockModal2";

type RiverClubV1HomePurchaseProps = {
  item: any;
  modalTop: any;
  QRpay: any;
  purchaseAgeBtn: any;
};

const RiverClubV1HomePurchase = ({
  item,
  modalTop,
  QRpay,
  purchaseAgeBtn,
}: RiverClubV1HomePurchaseProps) => {
  const { query } = useRouter();
  const currentLanguage = Array.isArray(query.id)
    ? query.id.join("")
    : query.id || "mn";

  const [language, setLanguage] = useState(currentLanguage);

  useEffect(() => {
    setLanguage(currentLanguage);
  }, [currentLanguage]);
  const { readyDatasrc } = useContext(WidgetWrapperContext);

  const data = language === "mn" ? readyDatasrc[1] : readyDatasrc[0];

  const staticItem = data[0];
  const staticItem2 = data[1];
  const staticItem3 = data[2];
  const staticItem4 = data[3];

  const [showModal, setShowModal] = useToggle(false);

  return (
    <BlockDiv className="flex items-center justify-center w-max">
      <BlockDiv className="mx-[112px] my-[26px] bg-white py-[25px] px-[40px] flex items-center justify-between gap-x-[120px]">
        <BlockDiv className="flex flex-col gap-y-[18px]">
          <RenderAtom
            item={staticItem?.title || item?.title}
            renderType="title"
            className={`uppercase text-[20px] font-[400]`}
          />
          <RenderAtom
            item={staticItem?.description || item?.description}
            renderType="text"
            className={`uppercase text-[16px] font-[400] w-[434px]`}
          />
        </BlockDiv>
        <BlockDiv className="flex relative flex-col gap-y-[12px]">
          <BlockDiv className="py-[30px] px-[12px] bg-[#BAD405] rounded-[11px] flex flex-col items-center justify-center">
            <RenderAtom
              item={staticItem?.button || item?.button}
              renderType="button"
              className={`h-max font-[400] text-[16px] w-max text-black/40 leading-[0px] -mb-[2px]`}
              onClick={() => setShowModal(true)}
            />
            <RenderAtom
              item={staticItem?.button || item?.button}
              renderType="button"
              className={`h-max font-[700] text-[17px] w-max text-black leading-[0px]`}
              onClick={() => setShowModal(true)}
            />
            <RenderAtom
              item={staticItem?.button || item?.button}
              renderType="button"
              className={`h-max font-[400] text-[16px] w-max text-black/40 leading-[0px] -mt-[2px]`}
              onClick={() => setShowModal(true)}
            />
          </BlockDiv>
          {/* <BlockModal2 isShowModal={showModal} setIsShowModal={setShowModal}>
            <PurchaseOneTimeTicket
              modalTop={staticItem2 || modalTop}
              purchaseAgeBtn={staticItem3 || purchaseAgeBtn}
              QRpay={staticItem4 || QRpay}
            />
          </BlockModal2> */}
          <BlockDiv>
            <RenderAtom
              item={staticItem?.count || item?.count}
              renderType="text"
              className={`text-[13px] font-[400] text-center tracking-widest`}
            />
          </BlockDiv>
        </BlockDiv>
      </BlockDiv>
    </BlockDiv>
  );
};

export default RiverClubV1HomePurchase;

const PurchaseOneTimeTicket = ({ modalTop, purchaseAgeBtn, QRpay }: any) => {
  return (
    <BlockDiv className="bg-[#373737] p-6 mt-[25vh]">
      <ModalTop item={modalTop} />
      <PurchaseOneTimeTicketAgeButton item={purchaseAgeBtn} />
      <RenderAtom
        item=""
        renderType="line"
        className={`bg-white w-full h-[1px] my-[20px]`}
      />
      <QRPay item={QRpay} />
    </BlockDiv>
  );
};

export const ModalTop = ({ item }: any) => {
  return (
    <BlockDiv className="z-10">
      <RenderAtom
        item={item?.title}
        renderType="title"
        className={`text-[#BAD405] font-bold text-[22px] mb-[33px]`}
      />
      <RenderAtom
        item={item?.description}
        renderType="text"
        className={`text-white mx-[20px] text-lg font-normal list-item list-disc`}
      />
    </BlockDiv>
  );
};

const PurchaseOneTimeTicketAgeButton = ({ item }: any) => {
  return (
    <BlockDiv className="w-max mx-auto flex items-center justify-center gap-4 my-6 z-10">
      <RenderAtom
        item={item?.button?.button1}
        renderType="button"
        className={`text-[#BBD540] bg-[#424242] font-bold text-[16px] rounded-[8px] px-[50px] py-[25px]`}
      />
      <RenderAtom
        item={item?.button?.button2}
        renderType="button"
        className={`bg-[#BBD540] text-black font-bold text-[16px] rounded-[8px] px-[50px] py-[25px]`}
      />
    </BlockDiv>
  );
};

export const QRPay = ({ item }: any) => {
  return (
    <BlockDiv className="flex items-center justify-center gap-16 w-full">
      <BlockDiv className="flex flex-col items-center h-full justify-between gap-10">
        <BlockDiv className="flex items-end justify-center gap-10">
          <RenderAtom
            item={item?.total}
            renderType="title"
            className={`font-bold text-[26px] text-white`}
          />
          <RenderAtom
            item={`${item?.price}k`}
            renderType="title"
            className={`font-bold text-[26px] text-white`}
          />
        </BlockDiv>
        <BlockDiv className="flex flex-col gap-4">
          <RenderAtom
            item={item?.button?.button1}
            renderType="button"
            className={`text-black font-bold text-[16px] px-[40px] py-[20px] bg-[#BAD405] rounded-[8px]`}
          />
          <RenderAtom
            item={item?.button?.button2}
            renderType="button"
            className={`text-black font-bold text-[16px] px-[40px] py-[20px] bg-[#BAD405] rounded-[8px]`}
          />
        </BlockDiv>
      </BlockDiv>
      <BlockDiv className="flex items-center justify-center w-max h-max">
        <RenderAtom item={item?.qr} renderType="image" className={``} />
      </BlockDiv>
    </BlockDiv>
  );
};
