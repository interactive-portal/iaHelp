import React from "react";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import BlockDiv from "@/components/common/Block/BlockDiv";
import { useContext } from "react";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import _, { set } from "lodash";
import { useState } from "react";
import { useRouter } from "next/router";
import useCallProcess from "@/middleware/dataHook/useCallProcess";
import { listToTree } from "@/util/helper";
import index from "@/pages/nation";
import RiverLoginModal from "../home/RiverLoginModal";
import { notification } from "antd";

const RiverClubV1PlanPrice = () => {
  const { readyDatasrc } = useContext(WidgetWrapperContext);

  // console.log("readydata", readyDatasrc);

  const { callProcess, isProcessWorking } = useCallProcess();

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

  const [activeItem, setActiveItem] = useState<any>();
  const [openLogin, setOpenLogin] = useState(false);

  console.log("activeItem", activeItem);

  const { nemgooDatasrc } = useContext(WidgetWrapperContext);
  const data = language === "mn" ? nemgooDatasrc[1] : nemgooDatasrc[0];
  const staticItem = data?.[0];

  const clickCamera = (e: any) => {
    setOpenLogin(true);
    e.preventDefault();
    // [camera].click() {
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

  return (
    <BlockDiv className="mx-[20px] flex flex-col mb-[30px]">
      <UpperSection
        item={upperData}
        dark={true}
        setActiveItem={setActiveItem}
      />
      <BottomSection
        item={bottomData}
        dark={false}
        setActiveItem={setActiveItem}
      />
      <RiverLoginModal openModal={openLogin} setOpenModal={setOpenLogin} />
    </BlockDiv>
  );
};

const UpperSection = ({ item, dark, setActiveItem }: any) => {
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
              setActiveItem={setActiveItem}
            />
          );
        })}
      </BlockDiv>
    </BlockDiv>
  );
};

const Card = ({ item, callProcess, myResult, dark, setActiveItem }: any) => {
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
          setActiveItem={setActiveItem}
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
        // onClick={() => {}}
      />
    </BlockDiv>
  );
};

const CardItem = ({ readyData, dark, kFormatter, setActiveItem }: any) => {
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
              setActiveItem(obj);
            }}
          />
        );
      })}
    </>
  );
};

const BottomSection = ({ item, dark, setActiveItem }: any) => {
  return (
    <BlockDiv className="bg-white px-[25px] p-4 mb-36">
      <BlockDiv className="grid grid-cols-4 gap-[4px] items-center">
        {_.values(item).map((item: any, index: number) => {
          return (
            <Card
              item={item}
              key={index}
              dark={dark}
              setActiveItem={setActiveItem}
            />
          );
        })}
      </BlockDiv>
    </BlockDiv>
  );
};

export default RiverClubV1PlanPrice;
