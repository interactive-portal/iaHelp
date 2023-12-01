import React from "react";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import BlockDiv from "@/components/common/Block/BlockDiv";
import { useContext } from "react";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import _, { set } from "lodash";
import { useState } from "react";
import { useRouter } from "next/router";
import useCallProcess from "@/middleware/dataHook/useCallProcess";
import RiverLoginModal from "../home/RiverLoginModal";
import { notification } from "antd";
import Cookies from "js-cookie";
import axios from "axios";
import { Modal, DatePicker, DatePickerProps } from "antd";
import ReportTemplate from "@/middleware/ReportTemplate/ReportTemplate";
import Payment from "../payment/payment";

const RiverClubV1PlanPrice = () => {
  const { readyDatasrc } = useContext(WidgetWrapperContext);

  // console.log("readydata", readyDatasrc);

  Cookies.set("customer", { CustomerId: "170130843295810" });

  const { callProcess, isProcessWorking } = useCallProcess();
  const [selectDateModal, setSelectDateModal] = useState(false);

  const customer = Cookies.getJSON("customer");

  const groupByData = _.chain(readyDatasrc)
    .groupBy("classificationname")
    .map((value, key, wrapped) => {
      return { [key]: value };
    })
    .value();

  const upperData = _.values(groupByData).filter(
    (item, key, index) =>
      _.keys(item)[0] == "Алтан" ||
      _.keys(item)[0] == "Гэр бүл" ||
      _.keys(item)[0] == "Платинум"
  );

  const bottomData = _.values(groupByData).filter(
    (item, key, index) =>
      _.keys(item)[0] != "Алтан" &&
      _.keys(item)[0] != "Гэр бүл" &&
      _.keys(item)[0] != "Платинум"
  );

  const { query } = useRouter();
  const currentLanguage = Array.isArray(query.id)
    ? query.id.join("")
    : query.id || "mn";

  const [language, setLanguage] = React.useState(currentLanguage);

  React.useEffect(() => {
    setLanguage(currentLanguage);
  }, [currentLanguage]);

  const [activeIndex, setactiveIndex] = useState<any>(0);
  const [openLogin, setOpenLogin] = useState(false);
  const [datePicker, setDatePicker] = useState(true);
  const [startDate, setStartDate] = useState<any>();
  const [selectedItem, setSelectItem] = useState<any>();
  const [templateId, setTemplateId] = useState<any>();
  const [contractId, setContractId] = useState<any>();

  const { nemgooDatasrc } = useContext(WidgetWrapperContext);
  const data = language === "mn" ? nemgooDatasrc[1] : nemgooDatasrc[0];

  const dateFormat = "YYYY-MM-DD";

  // багцыг select хийх эсвэл login хийх
  const selectItem = async (e: any, item: any) => {
    setTemplateId(null);
    setSelectItem(_.values(item)?.[0]?.[activeIndex]);
    if (customer) {
      setSelectDateModal(true);
      setDatePicker(true);
    } else {
      setOpenLogin(true);
    }
  };

  // эхлэх өдөр сонгох
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    setStartDate(dateString);
  };

  // гэрээ байгуулах
  const createContract = async () => {
    const item = selectedItem;
    var inputDate = item?.enddate;

    var inputDate: any = item?.enddate;

    var dateParts = inputDate.split("-");

    // Extract the year, month, and day
    var year = parseInt("20" + dateParts[2], 10);
    var month: any = parseInt(dateParts[1], 10) - 1; // Subtracting 1 because months are zero-based
    var day: any = parseInt(dateParts[0], 10);

    var convertedDate = new Date(year, month, day);

    year = convertedDate.getFullYear();
    month = ("0" + (convertedDate.getMonth() + 1)).slice(-2); // Adding 1 because months are zero-based
    day = ("0" + convertedDate.getDate()).slice(-2);

    var result = year + "-" + month + "-" + day;

    const param = {
      contentTypeId: item?.contracttypeid,
      contractTotalAmount: item?.saleprice,
      customerId: customer?.CustomerId,
      durationTypeId: item?.monthid,
      startDate: startDate,
      endDate: result,
      itemId: item?.id,
      price: item?.saleprice,
      amount: item?.saleprice,
    };

    const res = await axios.post(`/api/post-process`, {
      processcode: "fitKioskCreateContract_DV_001",
      parameters: param,
    });

    if (res?.data?.status == "success") {
      setTemplateId(res?.data?.result?.templateId);
      setContractId(res?.data?.result?.id);
    }
  };

  // reportTemplate дуудах
  const printOptions = {
    lang: {
      mn: "",
      en: "",
    },
    ishtml: 1,
    print_options: {
      numberOfCopies: "1",
      isPrintNewPage: "1",
      isSettingsDialog: "0",
      isShowPreview: "1",
      isPrintPageBottom: "0",
      isPrintPageRight: "0",
      pageOrientation: "portrait",
      isPrintSaveTemplate: "1",
      paperInput: "portrait",
      pageSize: "a4",
      printType: "1col",
      templatemetaid: templateId,
      templateIds: templateId,
    },
  };
  const [activeCheck, setActiveCheck] = useState(false);

  const template = (
    <div>
      <ReportTemplate
        options={printOptions}
        data={{ contractId: contractId }}
      />
    </div>
  );

  // гэрээний нөхцөлийг шалгах
  const checkContract = async () => {
    if (activeCheck) {
      const res = await axios.post(`/api/post-process`, {
        processcode: "fitKioskContractIsConfirm_DV_001",
        parameters: {
          id: contractId,
          isComfirm: activeCheck ? "1" : "0",
        },
      });
      if (res?.data?.status == "success") {
        if (res?.data?.result?.isComfirm == "0") {
        } else {
          setSelectDateModal(false);
        }
      }
      console.log("res", res);
    } else {
      notification.info({
        message: "Үйлчилгээний нөхөцлийг зөвшөөрч гэрээ байгуулах боломжтой",
      });
    }
  };

  const checkPayment = () => {
    Payment(100, 70105432, "khanbank", function (item: any) {
      console.log("item", item);
    });
  };

  const templateContent = (
    <div className="flex items-center justify-center h-full mx-auto relative max-w-[960px] overflow-hidden">
      <div
        className=" h-[900px]  overflow-y-scroll "
        style={{
          background: "white",
        }}
      >
        {template}
      </div>
      <div></div>
      <div className="absolute bottom-10 right-0 w-full ">
        <div
          className="px-[64px] flex items-center mb-8"
          onClick={() => setActiveCheck(!activeCheck)}
        >
          <div
            className={`w-[30px] h-[30px] rounded-lg flex items-center justify-center ${
              activeCheck ? "bg-blue-300" : "bg-white"
            } `}
          >
            {activeCheck ? (
              <i className="fa-solid fa-check fa-xl text-white"></i>
            ) : (
              ""
            )}
          </div>
          <p className="text-white text-[20px] ml-4">
            Үйлчилгээний нөхцөлийг хүлээн зөвшөөрч байна
          </p>
        </div>
        <div className="flex justify-between gap-[16px] px-[64px]">
          <div
            className="w-full bg-[#272A32] text-[#C4C4C4] text-[20px] text-center uppercase rounded font-medium py-2"
            onClick={() => setSelectDateModal(false)}
          >
            Болих
          </div>
          <div
            className="w-full  text-[20px] text-center uppercase rounded font-medium py-2"
            style={{
              color: "var(--202020, #202020)",
              background: "var(--green-main, #BAD405)",
            }}
            onClick={() => checkPayment()}
          >
            Цааш
          </div>
        </div>
      </div>
    </div>
  );

  // Огноо сонгох modal
  const ModalContent = (
    <div className="flex items-center justify-center h-full mx-auto">
      <div
        className="w-[424px] h-[600px] box-border relative"
        style={{
          background: "var(--202020, #202020)",
        }}
      >
        <div className="p-[64px]">
          <DatePicker
            className="w-full"
            // placement="bottomLeft"
            format={dateFormat}
            open={datePicker}
            onSelect={() => setDatePicker(false)}
            onOpenChange={() => setDatePicker(!datePicker)}
            onChange={onChange}
            style={{
              color: "white",
              background: "var(--202020, #202020)",
            }}
            popupStyle={{
              inset: "837.5px auto auto 400px !important",
              background: "var(--202020, #202020)",
            }}
          />
        </div>
        <div className="absolute bottom-10 right-0 w-full flex gap-[16px] px-[64px]">
          <div
            className="w-full bg-[#272A32] text-[#C4C4C4] text-[20px] text-center uppercase rounded font-medium py-2"
            onClick={() => {
              setSelectDateModal(false), Cookies.remove("customer");
            }}
          >
            Болих
          </div>
          <div
            className="w-full  text-[20px] text-center uppercase rounded font-medium py-2"
            style={{
              color: "var(--202020, #202020)",
              background: "var(--green-main, #BAD405)",
            }}
            onClick={() => createContract()}
          >
            Цааш
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <BlockDiv className="mx-[20px] flex flex-col mb-[30px]">
      <UpperSection
        item={upperData}
        dark={true}
        setactiveIndex={setactiveIndex}
        selectItem={selectItem}
      />
      <BottomSection
        item={bottomData}
        dark={false}
        setactiveIndex={setactiveIndex}
        selectItem={selectItem}
      />
      <RiverLoginModal openModal={openLogin} setOpenModal={setOpenLogin} />
      <Modal
        open={selectDateModal}
        footer={false}
        onCancel={() => setSelectDateModal(false)}
        destroyOnClose
      >
        {templateId ? templateContent : ModalContent}
      </Modal>
      <style>
        {`
          .ant-picker-input >input{
            color:white !important;
          }
            .checkbox-round {
              border-radius:10px
          }
          .ant-modal-body {
            overflow:hidden;
          }
          `}
      </style>
    </BlockDiv>
  );
};

const UpperSection = ({ item, dark, setactiveIndex, selectItem }: any) => {
  return (
    <BlockDiv className="bg-black w-full flex flex-col items-center justify-center mb-[28px]">
      <RenderAtom
        item={{
          value:
            "Танд асуух зүйл гарвал үйлчилгээний ажилтан танд туслахад бэлэн.",
        }}
        renderType="text"
        className={`text-white text-start w-full font-normal text-[16px] mt-[7px]`}
      />
      <BlockDiv className="my-[63px] mx-[85px] grid grid-cols-3 items-center gap-x-[88px]">
        {_.values(item)?.map((obj: any, index: number) => {
          return (
            <Card
              item={obj}
              dark={dark}
              key={index}
              setactiveIndex={setactiveIndex}
              selectItem={selectItem}
            />
          );
        })}
      </BlockDiv>
    </BlockDiv>
  );
};

const Card = ({
  item,
  callProcess,
  myResult,
  dark,
  setactiveIndex,
  selectItem,
}: any) => {
  const title = _.keys(item)[0];
  const readyData = _.values(item)[0];

  // const kFormatter = (num: number) => {
  //   return Math.abs(num) > 999
  //     ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
  //     : Math.sign(num) * Math.abs(num);
  // };

  // const

  return (
    <BlockDiv className="flex flex-col items-start h-[500px]">
      <RenderAtom
        item={{ value: "ЭРЭЛТТЭЙ" }}
        renderType="title"
        className={`font-normal text-[12px] uppercase ${
          dark ? "text-white" : "text-black"
        }`}
      />
      <RenderAtom
        item={{ value: title }}
        renderType="title"
        className={`font-[700] text-[28px] uppercase ${
          dark ? "text-white" : "text-black"
        }`}
      />
      <BlockDiv className="flex flex-col items-start justify-center mt-[10px] min-h-[120px]">
        <CardItem
          readyData={readyData}
          dark={dark}
          setactiveIndex={setactiveIndex}
        />
      </BlockDiv>
      {/* Includes */}
      <BlockDiv className="flex flex-col gap-y-[4px] h-[70px] justify-end mt-[30px] align-text-top">
        {_.map([""], (innerItem: any, index: number) => {
          return (
            <BlockDiv className="flex items-center" key={index}>
              <div className="">
                <i
                  className={`fa-solid fa-check w-[18px] fa-xs  h-[18px] mr-[8px] p-[3px] flex items-center justify-center  rounded-full ${
                    dark ? "text-black bg-[#B3B3B3]" : "bg-[#B3B3B3] text-black"
                  }`}
                  style={{
                    display: "flex !important",
                  }}
                />
              </div>
              <RenderAtom
                item={{ value: "ФИТНЕСС" }}
                renderType="text"
                className={`font-medium text-[12px] ${
                  dark ? "text-[#B3B3B3]" : "text-black"
                }`}
              />
            </BlockDiv>
          );
        })}
        <style>
          {`
            .fa-check{
              display:flex !important
            }
            `}
        </style>
      </BlockDiv>
      {/* includes done here */}
      <RenderAtom
        item={{
          value: "Цагийн хязгааргүй фитнес болон бассейнээр үйлчлүүлнэ. ",
        }}
        renderType="text"
        className={`font-medium text-[12px] mt-[36px] h-[70px] ${
          dark ? "text-[#B3B3B3]" : "text-black"
        }`}
      />
      <RenderAtom
        item={{
          value: "Багц сонгох",
        }}
        renderType="button"
        className={`font-[700] text-[16px] text-black py-[23px] px-[54px] bg-[#BAD405] uppercase mt-[16px] rounded-[8px]`}
        onClick={(e: any) => selectItem(e, item)}
      />
    </BlockDiv>
  );
};

const CardItem = ({ readyData, dark, kFormatter, setactiveIndex }: any) => {
  const [active, setActive] = useState(0);

  return (
    <>
      {readyData?.map((obj: any, index: number) => {
        return (
          <RenderAtom
            key={index}
            item={`<sup className="text-[16px] font-normal">₮</sup>${Number(
              obj?.saleprice
            )} <span className="text-[16px]"> / ${obj?.monthname}</span>`}
            renderType="title"
            className={`text-[36px] cursor-pointer font-medium flex items-center leading-[24px] ${
              obj?.priceSeason && obj?.priceHalfYear
                ? "flex"
                : `items-center justify-center`
            }
      ${
        active === index
          ? `${dark ? "text-white" : "text-black"}`
          : "text-[#B3B3B3]"
      }
      `}
            onClick={() => {
              setActive(index);
              setactiveIndex(index);
            }}
          />
        );
      })}
    </>
  );
};

const BottomSection = ({ item, dark, setactiveIndex, selectItem }: any) => {
  return (
    <BlockDiv className="bg-white px-[25px] p-4 mb-36">
      <BlockDiv className="grid grid-cols-4 gap-[4px] items-center">
        {_.values(item).map((item: any, index: number) => {
          return (
            <Card
              item={item}
              key={index}
              dark={dark}
              setactiveIndex={setactiveIndex}
              selectItem={selectItem}
            />
          );
        })}
      </BlockDiv>
    </BlockDiv>
  );
};

export default RiverClubV1PlanPrice;
