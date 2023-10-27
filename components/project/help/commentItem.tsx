import RenderAtom from "@/components/common/Atom/RenderAtom";
import BlockDiv from "@/components/common/Block/BlockDiv";
import moment from "moment";
import AddComment from "./addComment";
import { useState } from "react";
import _ from "lodash";
import { Image } from "antd";

const CommentItem = ({
  item,
  index,
  session,
  selectedId,
  children,
  mutate,
}: any) => {
  const [replyOpen, setReplyOpen] = useState(false);
  const [isPreviewVisible, setPreviewVisible] = useState(false);

  return (
    <BlockDiv
      key={item?.id || index}
      customClassName="bg-transparent rounded-lg mt-2 py-2"
    >
      <div className="flex">
        <div
          className=""
          style={{
            minWidth: "50px",
          }}
        >
          <img
            src={
              item?.profilephoto
                ? `https://dev.veritech.mn/${item?.profilephoto}`
                : `https://dev.veritech.mn/assets/core/global/img/user.png`
            }
            className=" w-10 h-10 mt-3 rounded-full object-cover"
          />
        </div>
        <div className="bg-gray-100  rounded-lg p-3 w-[96%]">
          <div className="flex w-full items-center justify-between">
            <div className="w-full capitalize flex items-center gap-2 min-h-[40px]">
              <div className="">
                <RenderAtom
                  item={{
                    value: item?.username || "Зочин",
                  }}
                  renderType="text"
                  customClassName="text-base text-[#585858]  font-semibold block "
                />
                <RenderAtom
                  item={{
                    value: item?.departmentname || "Байгууллага",
                  }}
                  renderType="text"
                  customClassName="text-xs text-[#585858]/70  font-semibold block "
                />
              </div>

              <RenderAtom
                item={{
                  value: `&#8226; ${moment(item?.createdDate).format("h:mm")}`,
                }}
                renderType="text"
                customClassName="text-[14px] font-semibold  pt-1.5 text-[#67748E]  text-right lowercase pr-1 "
                customStyle={{ color: "#67748E" }}
              />
            </div>
            {/* <i className="fa-regular fa-thumbs-up fa-lg text-[#585858]"></i> */}
          </div>
          <div className="mt-3">
            <p
              className="text-[16px] leading-5 font-normal text-gray-500"
              style={{
                color: "#585858",
              }}
            >
              {item?.commenttext}
            </p>
            {!_.isEmpty(item.commentfile) && (
              <Image.PreviewGroup
                preview={{
                  visible: isPreviewVisible,
                  onVisibleChange: (visible, prevVisible) =>
                    setPreviewVisible(visible),
                }}
              >
                <div className="flex items-center mt-5">
                  {item?.commentfile.map((obj: any, index: number) => {
                    switch (obj?.fileextension) {
                      case "png" || "jpg" || "jpeg":
                        if (index == 1) {
                          return (
                            <div className="relative ">
                              <Image
                                // width={240}

                                // height={300}
                                src={`https://dev.veritech.mn/${obj?.physicalpath}`}
                                className="object-cover"
                                sizes="cover"
                                wrapperClassName="object-cover rounded-lg"
                                style={{
                                  maxWidth: "300px",
                                }}
                              />
                              {/* <div
                                className="flex items-center justify-center rounded-lg absolute top-0 bg-black/20 w-full h-[98%] text-white cursor-pointer"
                                onClick={() => setPreviewVisible(true)}
                              >
                                <p className="text-[70px] font-bold">
                                  +{item?.commentfile?.length - 2}
                                </p>
                              </div> */}
                            </div>
                          );
                        } else {
                          return (
                            <div className="relative">
                              <Image
                                // width={240}
                                // height={300}
                                src={`https://dev.veritech.mn/${obj?.physicalpath}`}
                                className="object-cover rounded-lg"
                                sizes="cover"
                                wrapperClassName="object-cover rounded-lg"
                              />
                            </div>
                          );
                        }
                    }
                  })}
                </div>
              </Image.PreviewGroup>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center pl-[55px] text-[12px] text-[#585858]">
        <p className="hover:text-[#699BF7] cursor-pointer">Like</p>
        <p className="px-4">|</p>
        <p
          className="hover:text-[#699BF7] cursor-pointer"
          onClick={() => setReplyOpen(!replyOpen)}
        >
          Хариулах
        </p>
        {!_.isEmpty(children) && (
          <>
            <p className="px-4">|</p>
            <p className="">{children.length} Replies</p>
          </>
        )}
      </div>
      <div className="pl-[55px] w-full">
        {replyOpen && (
          <>
            <div className="w-full">
              <AddComment
                //   form={form}
                session={session}
                mutate={mutate}
                //   handleSubmit={handleSubmit}
                //   EnterClick={EnterClick}
                selectedId={selectedId}
                parentId={item?.id}
              />
            </div>
            {!_.isEmpty(children) &&
              children.map((item: any, index: any) => {
                return (
                  <CommentItem
                    item={item}
                    index={index}
                    session={session}
                    mutate={mutate}
                    selectedId={selectedId}
                    children={item?.children}
                  />
                );
              })}
          </>
        )}
      </div>
      <style>
        {`
          .ant-image-img {
            border-radius:10px;
            max-width:300px
          }
          .ant-image-mask {
            border-radius:10px

          }
          `}
      </style>
    </BlockDiv>
  );
};

export default CommentItem;
