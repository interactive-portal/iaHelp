import { FC } from "react";
import { Modal } from "antd";

type PropsType = {
  openModal: any;
  setOpenModal: any;
};

const RiverLoginModal: FC<PropsType> = ({ openModal, setOpenModal }) => {
  return (
    <>
      <Modal
        open={openModal}
        width={1080}
        onCancel={() => setOpenModal(false)}
        footer={false}
      >
        <div className="w-full h-full bg-black/50 pt-[150px] flex justify-center">
          <div className="w-[640px] h-[480px] bg-black rounded-lg"></div>
          <div className="fixed bottom-4 max-w-[640px] mx-auto">
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
