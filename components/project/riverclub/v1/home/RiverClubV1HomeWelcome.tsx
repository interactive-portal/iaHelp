import React, { useState, useContext, useEffect } from "react";
import BlockDiv from "@/components/common/Block/BlockDiv";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import { useRouter } from "next/router";
import _ from "lodash";
import BlockSlider from "@/components/common/Block/BlockSlider";
<<<<<<< HEAD
import RiverLoginModal from "./RiverLoginModal";
import { notification } from "antd";
=======
>>>>>>> 6e34a3be2978abe8d7b10e02d9fdf2079c7909ea

const RiverClubV1HomeWelcome = () => {
  const { query } = useRouter();
  const currentLanguage = Array.isArray(query.id)
    ? query.id.join("")
    : query.id || "mn";

  const [language, setLanguage] = useState(currentLanguage);

  const { readyDatasrc } = useContext(WidgetWrapperContext);

  useEffect(() => {
    setLanguage(currentLanguage);
  }, [currentLanguage]);

  const staticItem = language === "mn" ? readyDatasrc[1] : readyDatasrc[0];

<<<<<<< HEAD
  const clickCamera = (e: any) => {
    setOpenModal(true);
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
        console.log("res");
      } else {
        notification.info({
          message: "Та бүртгэлгүй байгаа тул бүртгэлээ хийнэ үү.",
        });
      }

      setOpenModal(false);

      // if (res != null) {
      //   setImageToken(res.image);
      //   setOpenModal(false);
      //   // [image] = res.image;
      //   // [value] = res.value;
      // } else {
      //   alert(res.message);
      // }
    };

    ws.onerror = function (event) {
      // alert(event.data);
    };

    ws.onclose = function () {
      console.log("Connection is closed");
      // }
    };
  };

=======
>>>>>>> 6e34a3be2978abe8d7b10e02d9fdf2079c7909ea
  return (
    <BlockDiv className="arrowCustomStyle">
      <BlockSlider
        divNumber="RiverHomeSliderBlock"
        customProps={{
          reactSlickSettings: {
            arrows: true,
            dots: false,
            variableWidth: false,
            infinite: false,
            swipeToSlide: true,
          },
          arrowClassName: "bg-transparent",
        }}
      >
        {/* {_.map(staticItem?.mainimage, (item: any, index: number) => {
          return <RiverHomeBanner item={staticItem} />;
        })} */}
      </BlockSlider>
    </BlockDiv>
  );
};

export default RiverClubV1HomeWelcome;

const RiverHomeBanner = ({ item }: any) => {
  return (
    <BlockDiv className="h-[570px] flex items-center justify-center relative bg-gray-200">
      <RenderAtom
        item={item?.mainimage[0]}
        renderType="image"
        customClassName="w-[1080px] h-full absolute top-0 left-0"
      />
      <BlockDiv className="z-20 w-full flex items-center justify-center flex-col h-max px-[216px]">
        <RenderAtom
          item={item?.title}
          renderType="title"
          className={`text-[52px] font-[700] mb-[50px] text-white text-center font-roboto uppercase leading-[50px]`}
        />
        <RenderAtom
          item={item?.description}
          renderType="text"
          className={`text-white font-[400] text-[26px] text-center mb-[74px]`}
        />
        <RenderAtom
          item={{
            value: item?.button,
            positionnemgoo: {
              url: {
                path: `/bioinput`,
              },
            },
          }}
          renderType="button"
          className={`bg-[#BAD405] rounded-[8px] px-[42px] py-[35px] text-black uppercase text-[16px] font-[700] mb-[30px]`}
        />
        {/* <BlockDiv className="flex gap-[9px]">
          <BlockDiv className="w-[10px] h-[10px] rounded-full border border-white" />
          <BlockDiv className="w-[10px] h-[10px] rounded-full border border-white bg-gray-200" />
          <BlockDiv className="w-[10px] h-[10px] rounded-full border border-white" />
        </BlockDiv> */}
      </BlockDiv>
    </BlockDiv>
  );
};
