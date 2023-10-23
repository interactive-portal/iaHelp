// import ModalView from "@components/cloud/Custom/Modal/ModalView";
// import { AtomText } from "@components/common/Atom";
import AtomText from "@/components/common/Atom/atomText";
// import ModalLogin from "@components/Login/ModalLogin";
import axios from "axios";
import fetchJson from "lib/fetchJson";
import _ from "lodash";
import moment from "moment";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FC, useContext, useEffect, useRef, useState } from "react";

import useSWR from "swr";
import { Modal } from "antd";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import BlockDiv from "@/components/common/Block/BlockDiv";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import useCallProcess from "@/middleware/dataHook/useCallProcess";

type PropsType = {
  commentData?: any;
  setCommentCount?: any;
};

const helpComment: FC<PropsType> = ({ commentData, setCommentCount }: any) => {
  const { config, readyDatasrc, metaConfig, gridJsonConfig, pathConfig } =
    useContext(WidgetWrapperContext);
  const { data: session, status }: any = useSession();
  const { widgetnemgooReady, positionConfig } =
    useContext(WidgetWrapperContext);
  const router = useRouter();
  let selectedId = router.query?.filterid;

  const [commentList, setcommentList] = useState<any>(null);
  let structureId = widgetnemgooReady?.listconfig?.filterstructureid;
  const [profile, setProfile] = useState(session);
  const [comment, setComment] = useState<any>("");
  const { callProcess } = useCallProcess();

  const parameters = {
    filterRecordId: selectedId || widgetnemgooReady?.recordId,
    filterStructureId: "1479204227214",
  };

  const getComment = async () => {
    const data = await callProcess({
      command: "PRTL_MN_GET_COMMENT_004",
      parameter: parameters,
      moreRequest: null,
      resultConfig: null,
      silent: true,
    });
    setcommentList(data?.result?.ecmcommentdtl);
    if (setCommentCount) {
      setCommentCount(data?.result?.ecmcommentdtl.length);
    }
  };

  useEffect(() => {
    getComment();
  }, []);

  const handleFilterData = async (payload: any) => {
    await callProcess({
      command: "PRTL_MN_COMMENT_001",
      parameter: payload,
      moreRequest: null,
      resultConfig: null,
      silent: true,
    });
    getComment();
    setComment("");
  };

  let form = useRef<any>();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const form_data = new FormData(form.current);
    const payload: any = {};
    form_data.forEach(function (value: any, key: string) {
      payload[key] = value;
    });
    handleFilterData(payload);
  };
  let clecmcommentd: any = _.values(commentList);
  if (commentData) {
    clecmcommentd = commentData;
  }

  const handleUserComment = (e: any) => {
    setComment(e.target.value);
  };
  const EnterClick = (e: any) => {
    if (e.keyCode === 13 && e.shiftKey == false) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <BlockDiv customClassName="w-full" divNumber={"div100"}>
      {!profile && (
        <div className="py-2 text-center mt-2">
          <span
            onClick={() =>
              router.push(
                `https://customer.veritech.mn/login?domain=help&iscustomer=1&redirect_uri=https://help.veritech.mn`
              )
            }
            className="text-tiny cursor-pointer hover:text-blue-400 font-medium"
          >
            Та хэрэглэгчээр нэвтэрч орно уу
          </span>{" "}
        </div>
      )}

      {clecmcommentd.length > 0 && (
        <div className="chat-container pb-2 mt-2 max-h-112 overflow-y-auto mb-2 scrollbar-thumb-gray-300  scrollbar-track-gray-200 scrollbar-thin hover:scrollbar-thumb-gray-300 -dark scrollbar-thumb-rounded-full lg:max-h-sm h-full">
          <div className="  lg:max-h-sm h-full mt-2">
            {clecmcommentd.map((item: any, index: number) => {
              return (
                <BlockDiv
                  key={item?.id || index}
                  customClassName="bg-transparent rounded-lg mt-2 border-b"
                >
                  <div className="flex justify-between py-2 px-2 items-center">
                    <div className="flex">
                      <div
                        className=""
                        style={{
                          minWidth: "50px",
                        }}
                      >
                        <img
                          src={`https://dev.veritech.mn/assets/core/global/img/user.png`}
                          className=" w-10 h-10 mt-1 rounded-full"
                        />
                      </div>
                      <div className="w-full pl-1.5 capitalize">
                        <RenderAtom
                          item={{ value: item?.username || "Зочин" }}
                          renderType="text"
                          customClassName="text-base text-citizen-title  font-semibold block pt-1"
                        />
                        <RenderAtom
                          item={{
                            value: item?.departmentname || "Байгууллага",
                          }}
                          renderType="text"
                          customClassName="text-sm text-citizen-title lowercase -mt-1 relative -top-1"
                          customStyle={{ color: "#67748E" }}
                        />
                      </div>
                    </div>
                    <div>
                      <RenderAtom
                        item={{
                          value: moment(item.createdDate).format("h:mm"),
                        }}
                        renderType="text"
                        customClassName="text-[14px] font-semibold  pt-1.5 text-citizen-title  text-right lowercase pr-1 "
                        customStyle={{ color: "#585858" }}
                      />
                    </div>
                  </div>
                  <div className="mx-3 ">
                    <p
                      className="text-[14px] leading-5 font-normal py-4 text-gray-500"
                      style={{
                        color: "#67748E",
                      }}
                    >
                      {item?.commenttext}
                    </p>
                    {/* <AtomText
                      item={item?.commenttext}
                      customClassName="text-[14px] leading-5 font-normal py-4 text-gray-500"
                      customStyle={{ color: "#67748E" }}
                    /> */}
                  </div>
                </BlockDiv>
              );
            })}
          </div>
        </div>
      )}
      {/* CHAT */}
      {profile && (
        <div className="w-full py-1 mt-2">
          <form ref={form} onSubmit={handleSubmit}>
            <div className="flex z-10 bg-white rounded-lg justify-between items-center w-full border ">
              <div className="w-full mt-2">
                <textarea
                  onKeyDown={(e) => EnterClick(e)}
                  className="font-medium font-roboto px-2 w-full focus:outline-none focus:shadow-none focus:ring-0 text-gray-700 border-none h-10 active:border-none text-xs"
                  name="commentText"
                  placeholder="Сэтгэгдэл үлдээх ..."
                  value={comment}
                  onChange={(e: any) => handleUserComment(e)}
                />
                <input type="hidden" name="recordId" value={selectedId} />
                <input
                  type="hidden"
                  name="createdCrmUserId"
                  value={session?.id}
                />
                <input
                  type="hidden"
                  name="createdCrmUserId"
                  value={session?.id}
                />
                <input type="hidden" name="createdUserId" value={session?.id} />
                <input
                  type="hidden"
                  name="refStructureId"
                  value={"1479204227214"}
                />
              </div>
              <div className="flex">
                <div className=" h-full flex items-center justify-end">
                  <button className="px-2 pt-1 cursor-pointer" type="submit">
                    <svg
                      width="27"
                      height="23"
                      viewBox="0 0 27 23"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.833011 22.4197C1.47895 23.0376 2.49271 22.9432 3.68591 22.4369L24.9122 13.3744C25.4863 13.1341 25.9439 12.8681 26.2489 12.5763C26.832 12.0185 26.832 11.332 26.2489 10.7741C25.9439 10.4824 25.4863 10.2163 24.9122 9.97603L3.56928 0.870704C2.5286 0.424449 1.48792 0.304303 0.83301 0.930777C0.00764455 1.72031 0.357528 2.58707 0.958609 3.6598L4.33184 9.70141C4.72658 10.4223 5.05853 10.7055 5.81212 10.7398L24.8404 11.3491C25.0647 11.3577 25.1813 11.5036 25.1992 11.6752C25.1992 11.8469 25.0736 11.9842 24.8494 11.9928L5.80315 12.6707C5.09441 12.6965 4.76247 12.9625 4.33185 13.7005L1.02141 19.5963C0.384443 20.7205 -0.00132605 21.6216 0.833011 22.4197Z"
                        fill="#699BF7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
      {/* <Modal open={visibleModal} onCancel={handlerCloseClick} footer={false}>
        <ModalLogin iscustomer={false} setIsModalVisible={setVisibleModal} />
      </Modal> */}
      {/* <ModalView
        open={visibleModal}
        modalOptions={{
          width: 500,
          title: "Нэвтрэх",
        }}
        onClose={handlerCloseClick}
        modelContent={<ModalLogin />}
      /> */}
    </BlockDiv>
  );
};
export default helpComment;
