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

const RiverClubV1PlanPrice = () => {
  const { readyDatasrc } = useContext(WidgetWrapperContext);

  // console.log("readydata", readyDatasrc);

  const { callProcess, isProcessWorking } = useCallProcess();
  const [selectDateModal, setSelectDateModal] = useState(false);

  Cookies.set("customer", { CustomerId: "170130843295810" });

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

  const { nemgooDatasrc } = useContext(WidgetWrapperContext);
  const data = language === "mn" ? nemgooDatasrc[1] : nemgooDatasrc[0];

  const dateFormat = "YYYY-MM-DD";

  //login camera нээх command
  const clickCamera = (e: any) => {
    setOpenLogin(true);
    e.preventDefault();
    var ws = new WebSocket("ws://localhost:5021/FaceCamera");

    ws.onopen = function () {
      ws.send('{"action":"GetPerson"}');
    };

    console.log("first", ws);

    ws.onmessage = function (event) {
      var res = JSON.parse(event.data);

      if (res) {
        ws.send('{"action":"Close"}');
      } else {
        notification.info({
          message: "Та бүртгэлгүй байгаа тул бүртгэлээ хийнэ үү.",
        });
      }

      setOpenLogin(false);
    };

    ws.onerror = function (event) {
      // alert(event.data);
    };

    ws.onclose = function () {
      console.log("Connection is closed");
      // }
    };
  };

  // багцыг select хийх эсвэл login хийх
  const selectItem = async (e: any, item: any) => {
    setSelectItem(_.values(item)?.[0]?.[activeIndex]);
    console.log("first", _.values(item)?.[0]?.[activeIndex]);
    if (customer) {
      setSelectDateModal(true);
      setDatePicker(true);
    } else {
      clickCamera(e);
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
    console.log("res", res);

    if (res?.data?.status == "success") {
      setTemplateId(res?.data?.result?.templateId);
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
      templatemetaid: "1663908042127021",
      templateIds: "1663908042127021",
    },
  };

  console.log("template", templateId);

  const template = (
    <div>
      <ReportTemplate options={printOptions} />
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
        // style={{
        //   height: "600px",
        // }}
        destroyOnClose
      >
        <div className="flex items-center justify-center w-[960px] mx-auto ">
          <div
            className="box-border relative "
            style={{
              background: "white",
            }}
          >
            <div className="p-[64px]">
              {template}
              {/* {templateId ? (
                template
              ) : (
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
              )} */}
            </div>
            <div className="absolute bottom-10 right-0 w-full flex gap-[16px] px-[64px]">
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
                onClick={() => createContract()}
              >
                Цааш
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <style>
        {`
          .ant-picker-input >input{
            color:white !important;
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
