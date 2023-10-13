import { Modal } from "antd";
import BlockDiv from "./BlockDiv";
import RenderAtom from "../Atom/RenderAtom";

export default function BlockModal2({
  isShowModal = false,
  setIsShowModal = null,
  defultClassName = "BlockModal2",
  width = "650",
  children = <></>,
}: {
  isShowModal: boolean;
  setIsShowModal: any;
  defultClassName?: string;
  width?: number | string;
  children?: any;
}) {
  return (
    <Modal
      open={isShowModal}
      onOk={() => setIsShowModal(false)}
      onCancel={() => setIsShowModal(false)}
      footer={null}
      className={defultClassName}
      width={Number(width) || 650}
      closable={false}
    >
      <BlockDiv className="relative" divNumber="BlockModal2Outer">
        {children}

        <CloseButton setIsShowModal={setIsShowModal} />
      </BlockDiv>

      <style>
        {`
          .${defultClassName} .ant-modal-content {
            padding: 0 !important;
            border-radius: 10px !important;
          }

          .${defultClassName} .ant-modal-content .ant-modal-body {
            padding: 0 !important;
          }

          .${defultClassName} .ant-modal-footer {
            display: hidden;
          }
        `}
      </style>
    </Modal>
  );
}

const CloseButton = ({ setIsShowModal }: { setIsShowModal?: any }) => {
  return (
    <RenderAtom
      item={{ value: "far fa-times" }}
      renderType="icon"
      customClassName="absolute top-0 -right-8 cursor-pointer text-3xl text-white hover:brightness-90"
      onClick={() => setIsShowModal(false)}
    />
  );
};
