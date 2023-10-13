import { Modal } from "antd";
import { isValidElement } from "react";
import RenderAtom from "../Atom/RenderAtom";
import BlockDiv from "./BlockDiv";

export default function BlockModal1({
  formModalConfig,
  setFormModalConfig,
  customProps,
  children,
}: {
  formModalConfig?: any;
  setFormModalConfig?: any;
  customProps?: any;
  children?: any;
}) {
  return (
    <Modal
      open={formModalConfig?.isShowModal}
      width={620}
      bodyStyle={{ backgroundColor: "", padding: "0" }}
      centered
      footer={false}
      onCancel={() => {
        setFormModalConfig({ ...formModalConfig, isShowModal: false });
      }}
      closeIcon={<></>}
    >
      <BlockDiv
        customClassName="w-full h-full flex flex-col justify-between"
        divNumber="BlockModal1Outer"
      >
        <BlockDiv
          customClassName="pb-5 flex flex-row items-center"
          divNumber="Header"
        >
          <RenderAtom
            item={{ value: customProps?.title?.title }}
            renderType="title"
            customClassName={customProps?.title?.className}
          />

          <RenderAtom
            item={{ value: "fal fa-xmark" }}
            renderType="icon"
            customClassName="w-[32px] h-[32px] text-lg ml-auto bg-white rounded-full flex items-center justify-center"
            // class=""
            customStyle={{ boxShadow: "0px 2px 14px 0 rgba(0,0,0,0.1)" }}
            onClick={() => {
              setFormModalConfig({ ...formModalConfig, isShowModal: false });
            }}
          />
        </BlockDiv>

        <BlockDiv
          customClassName={`grow py-5 ${customProps?.body?.className}`}
          divNumber="Body"
        >
          {children}
        </BlockDiv>

        <BlockDiv
          customClassName="w-full flex flex-row gap-5 pt-5 items-center justify-between"
          divNumber="Footer"
        >
          <RenderAtom
            item={{
              value: "Устгах",
            }}
            renderType="button"
            customClassName="text-lg font-medium text-center capitalize text-[#a0a0a0] bg-transparent p-0"
          />
          <BlockDiv customClassName="flex flex-row items-center gap-2">
            {isValidElement(customProps?.reset) ? (
              customProps?.reset
            ) : (
              <RenderAtom
                {...customProps?.reset}
                item={
                  customProps?.reset?.item || {
                    value: customProps?.reset?.title,
                  }
                }
                renderType="button"
              />
            )}

            {isValidElement(customProps?.submit) ? (
              customProps?.submit
            ) : (
              <RenderAtom
                {...customProps?.submit}
                item={
                  customProps?.submit?.item || {
                    value: customProps?.submit?.title,
                  }
                }
                renderType="button"
              />
            )}
          </BlockDiv>
        </BlockDiv>
      </BlockDiv>
    </Modal>
  );
}
