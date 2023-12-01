import { FC, useEffect } from "react";
import { Modal, notification } from "antd";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

type PropsType = {
  openModal: any;
  setOpenModal: any;
  setNeedSignUp?: any;
  needSignUp?: any;
};

const RiverLoginModal: FC<PropsType> = ({
  openModal,
  setOpenModal,
  setNeedSignUp,
  needSignUp,
}) => {
  useEffect(() => {
    if (openModal) clickCamera();
  }, [openModal]);

  const clickCamera = () => {
    // setOpenModal(true);
    // e.preventDefault();
    var ws = new WebSocket("ws://localhost:5021/FaceCamera");

    ws.onopen = function () {
      ws.send('{"action":"GetPerson"}');
    };

    ws.onmessage = function (event) {
      var res = JSON.parse(event.data);

      if (res?.result) {
        ws.send('{"action":"Close"}');
        Cookies.set("customer", res?.result);
        notification.success({
          message: "Амжилттай нэвтэрлээ",
        });
        setOpenModal(false);
      } else {
        ws.send('{"action":"Close"}');
        setNeedSignUp(true);
      }

      setOpenModal(false);
    };

    ws.onerror = function (event) {
      // alert(event.data);
    };

    ws.onclose = function () {
      console.log("Connection is closed");
      // setNeedSignUp(true);

      // }
    };
  };

  const router = useRouter();
  const needSignUpModal = () => {
    return (
      <div className="">
        <p className="uppercase text-[34px] underline text-start text-white">
          Та бүртгэлгүй байгаа тул бүртгэлээ хийнэ үү.
        </p>
        <div className="bg-white px-[40px] py-[27px] flex mt-[20px] ">
          <div>
            <p className="text-[20px] text-black uppercase leading-[29px]">
              Ривер клубт тавтай морил
            </p>
            <p className="text-[16px] leading-[22px] text-black mt-[20px] mr-[50px]">
              Манай клубын олон төрлийн фитнесс, кардио, иог, бассейний
              хичээлүүдээс сонгон өөрийн төлөвлөгөөг гаргаарай.
            </p>
          </div>
          <div
            className="bg-[#BAD405] p-[10px] rounded-[10px] cursor-pointer"
            onClick={() => router.push("/bioinput")}
          >
            <p className="uppercase text-black font-bold text-[30px] leading-[28px]">
              гишүүн болох
            </p>
            <p className="text-[15px] leading-[35px] text-black text-right">
              онлайн бүртгэл
            </p>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      <Modal
        open={openModal}
        width={1080}
        onCancel={() => setOpenModal(false)}
        footer={false}
      >
        <div className="w-full h-full bg-black/50 pt-[150px] flex justify-center">
          <div className="w-[640px] h-[480px] bg-black/70 rounded-lg flex items-center justify-center">
            <img src="/images/Face_id_white.png" />
          </div>
          <div
            className={`fixed ${
              needSignUp ? "top-[350px]" : "-top-[400px]"
            }  max-w-[640px] mx-auto duration-75`}
          >
            {needSignUpModal()}
          </div>
          <div className="fixed bottom-4 max-w-[640px] mx-auto translate-y-[100%]">
            <p className="uppercase text-[34px] underline text-start text-white">
              клубын бүртгэл?
            </p>
            <div className="bg-white px-[40px] py-[27px] flex mt-[20px] ">
              <div>
                <p className="text-[20px] text-black uppercase leading-[29px]">
                  Ривер клубт тавтай морил
                </p>
                <p className="text-[16px] leading-[22px] text-black mt-[20px] mr-[50px]">
                  Манай клубын олон төрлийн фитнесс, кардио, иог, бассейний
                  хичээлүүдээс сонгон өөрийн төлөвлөгөөг гаргаарай.
                </p>
              </div>
              <div className="bg-[#BAD405] p-[10px] rounded-[10px] cursor-pointer">
                <p className="uppercase text-black font-bold text-[30px] leading-[28px]">
                  гишүүн болох
                </p>
                <p className="text-[15px] leading-[35px] text-black text-right">
                  онлайн бүртгэл
                </p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
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
      background:#00000080 !important;
		   }
		   .ant-modal-body {
			height: 100%;
		   }
		`}
      </style>
    </>
  );
};

export default RiverLoginModal;
