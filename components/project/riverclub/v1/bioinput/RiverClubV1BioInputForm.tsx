import React, { useState } from "react";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import BlockDiv from "@/components/common/Block/BlockDiv";
import { useContext } from "react";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import _ from "lodash";
import RenderWidgetProcess from "@/middleware/components/WidgetForm/RenderWidgetProcess";
import useSWR from "swr";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import Text from "./atom/text";
import Combo from "./atom/combo";
import Number from "./atom/number";
import Date from "./atom/date";
import Email from "./atom/email";
import fetchJson from "@/util/helper";
import axios from "axios";
import { Modal, notification } from "antd";
import Cookies from "js-cookie";
import RiverLoginModal from "../home/RiverLoginModal";

const RiverClubV1BioInputForm = () => {
  const { config, headerData, positionConfig, metaConfig } =
    useContext(WidgetWrapperContext);
  const [imageToken, setImageToken] = useState<any>();
  const [value, setValue] = useState<any>();

  const [openModal, setOpenModal] = useState(false);
  const [dialog, setDialog] = useState(false);

  const [openLogin, setOpenLogin] = useState(false);

  const methods = useForm();

  const sectionconfig = {
    widgetnemgooReady: {
      labelPosition: "top",
    },
  };

  const onSubmit = async (data: any) => {
    const param = {
      ...data,
      image: imageToken,
      value: value,
    };

    const res = await axios.post(`/api/post-process`, {
      processcode: "fitCrmCustomerKiosk_DV_001",
      parameters: param,
    });

    if (res.data?.status == "success") {
      setDialog(true);
    }

    // console.log("tabnamemseseses");
  };

  const clickCamera = (e: any) => {
    setOpenModal(true);
    e.preventDefault();
    var ws = new WebSocket("ws://localhost:5021/FaceCamera");

    ws.onopen = function () {
      ws.send('{"action":"GetImage"}');
    };

    ws.onmessage = function (event) {
      var res = JSON.parse(event.data);
      setOpenModal(false);

      console.log("response", res);

      if (res?.result.Image != null) {
        setImageToken(res?.result.image);
        setValue(res?.result?.value);
        setOpenModal(false);
        ws.send('{"action":"Close"}');
        // [image] = res.image;
        // [value] = res.value;
      } else {
        // alert(res.message);
      }
    };

    ws.onerror = function (event) {
      // alert(event.data);
    };

    ws.onclose = function () {
      // console.log("Connection is closed");
      // }
    };
  };

  // const loginCameraFunction = (e: any) => {
  //   setOpenModal(true);
  //   e.preventDefault();
  //   var ws = new WebSocket("ws://localhost:5021/FaceCamera");

  //   ws.onopen = function () {
  //     ws.send('{"action":"GetPerson"}');
  //   };

  //   ws.onmessage = function (event) {
  //     var res = JSON.parse(event.data);

  //     if (res?.result) {
  //       ws.send('{"action":"Close"}');
  //       Cookies.set("customer", JSON.stringify(res?.result));
  //       notification.success({
  //         message: "Амжилттай нэвтэрлээ",
  //       });

  //       console.log("res", res);
  //     } else {
  //       ws.send('{"action":"Close"}');
  //       // setNeedSignUp(true);
  //     }

  //     setOpenModal(false);
  //   };

  //   ws.onerror = function (event) {
  //     // alert(event.data);
  //   };

  //   ws.onclose = function () {
  //     console.log("Connection is closed");
  //     // setNeedSignUp(true);

  //     // }
  //   };
  // };

  return (
    <BlockDiv className="bg-[#CACACA] px-8  py-2">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-10">
            {formInput?.map((obj: any, index: number) => {
              switch (obj?.type) {
                case "text":
                  return <Text key={index} obj={obj} />;
                case "combo":
                  return <Combo key={index} obj={obj} />;
                case "number":
                  return <Number key={index} obj={obj} />;
                case "date":
                  return <Date key={index} obj={obj} />;
                case "email":
                  return <Email key={index} obj={obj} />;
              }
            })}
            <div></div>
            <div className="">
              <span>
                Царайгаа таниулснаар таны бүртгэл дуусна. Цаашдаа клуб
                нэвтрэхдээ царай таниулж нэвтрэх тул зааврыг анхааралтай
                дагаарай.
              </span>
              <div
                className="flex items-center gap-4 cursor-pointer"
                onClick={(e) => clickCamera(e)}
              >
                <input type="checkbox" />
                <div className="bg-[#050505] text-white text-[13px] leading-[19px] uppercase px-[22px] py-[5px]">
                  Царайгаа таниулах
                </div>
                <img src="/images/Face_ID.png" />
              </div>
            </div>
          </div>
          <div className="flex items-end justify-end mt-6">
            <button
              type="submit"
              className="p-3 bg-black text-white flex items-center justify-center text-[18px] w-[200px] rounded"
            >
              Хадгалах
            </button>
          </div>
        </form>
      </FormProvider>
      <Modal
        open={openModal}
        width={1080}
        onCancel={() => setOpenModal(false)}
        footer={false}
      >
        <div className="w-full h-full pt-[150px]">
          <div className="max-w-[640px] mx-auto h-[480px] bg-black/70 rounded-lg flex items-center justify-center">
            <img src="/images/Face_id_white.png" />
          </div>
        </div>
      </Modal>
      <Modal
        open={dialog}
        width={650}
        onCancel={() => setDialog(false)}
        footer={false}
      >
        <div className="flex flex-col justify-center items-center w-full h-full gap-[10px]">
          <div
            className="w-[600px] h-auto bg-white rounded-lg p-[40px]"
            style={{
              background: "var(--202020, #202020)",
            }}
          >
            <p className="text-[30px] font-semibold text-[#BAD405]">
              Бүртгэл амжилттай
            </p>
            <div className="p-[32px] border border-[#DEDEDE] rounded-lg my-[20px]">
              <p className="text-[24px] font-semibold text-[#BAD405]">
                Санамж:
              </p>
              <p className="text-[#FFFFFF] text-[18px]">
                Хэрэглэгчээр нэвтэрч үргэлжлүүлнэ үү
              </p>
            </div>
            <div className="flex justify-center">
              <div
                className="w-[210px] h-[60px] bg-[#BAD405] cursor-pointer flex items-center justify-center rounded-[8px] font-semibold text-[20px]"
                onClick={() => {
                  setDialog(false);
                  setOpenLogin(true);
                }}
              >
                Нэвтрэх
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <RiverLoginModal openModal={openLogin} setOpenModal={setOpenLogin} />
      <style>
        {`
		:where(.css-dev-only-do-not-override-3mqfnx).ant-modal .ant-modal-content {
			padding:0px;
			border-radius:0px;
		}
		.ant-modal, .ant-modal-content {
			height: 100vh;
			width: 1080px;
			margin: 0;
			top: 0;
			bottom:0;
			border:none;
			padding:0px;
      background:#00000080 !important
		   }
		   .ant-modal-body {
			height: 100%;
		   }
		`}
      </style>
    </BlockDiv>
  );
};

const formInput = [
  {
    labelname: "Овог",
    pathname: "lastName",
    type: "text",
  },
  {
    labelname: "Нэр",
    pathname: "customerName",
    type: "text",
  },
  {
    labelname: "Регистр",
    pathname: "positionName",
    type: "text",
  },
  {
    labelname: "Төрсөн огноо",
    pathname: "dateOfBirth",
    type: "date",
  },
  {
    labelname: "Хүйс",
    pathname: "gender",
    type: "combo",
    name: "name",
    lookupId: "1586482848531",
  },
  {
    labelname: "Утас",
    pathname: "phoneNumber",
    type: "number",
  },
  {
    labelname: "N-мэйл",
    pathname: "EMAIL",
    type: "email",
  },
  {
    labelname: "Хот",
    pathname: "cityId",
    type: "combo",
    lookupId: "1586494411842",
    name: "cityname",
  },
  {
    labelname: "Дүүрэг",
    pathname: "districtId",
    type: "combo",
    lookupId: "144436175673444",
    criteriaPath: "cityId",
    name: "name",
  },
  {
    labelname: "Гудамж",
    pathname: "streetId",
    type: "combo",
    lookupId: "1586494411983",
    criteriaPath: "districtId",
    name: "streetname",
  },
  // {
  //   labelname: "Овог",
  //   pathname: "districtId",
  //   type: "combo",
  // },
];

export default RiverClubV1BioInputForm;
