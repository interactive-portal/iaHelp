import RenderAtom from "@/components/common/Atom/RenderAtom";
import BlockDiv from "@/components/common/Block/BlockDiv";
import moment from "moment";
import AddComment from "./addComment";
import { useState } from "react";
import _ from "lodash";
import { mutate } from "swr";

const CommentItem = ({
  item,
  index,
  session,
  form,
  handleSubmit,
  EnterClick,
  selectedId,
  children,
}: any) => {
  const [replyOpen, setReplyOpen] = useState(false);

  return (
    <BlockDiv
      key={item?.id || index}
      customClassName="bg-transparent rounded-lg mt-2"
    >
      <div className="flex justify-between py-2 px-2 items-center">
        <div className="flex items-center">
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
              className=" w-10 h-10 mt-1 rounded-full object-cover"
            />
          </div>
          <div className="w-full pl-1.5 capitalize flex items-center gap-2">
            <RenderAtom
              item={{
                value: item?.username || "Зочин",
              }}
              renderType="text"
              customClassName="text-base text-[#585858]  font-semibold block pt-1"
            />
            <RenderAtom
              item={{
                value: `&#8226; ${moment(item.createdDate).format("h:mm")}`,
              }}
              renderType="text"
              customClassName="text-[14px] font-semibold  pt-1.5 text-[#67748E]  text-right lowercase pr-1 "
              customStyle={{ color: "#67748E" }}
            />
            {/* <RenderAtom
                          item={{
                            value: item?.departmentname || "Байгууллага",
                          }}
                          renderType="text"
                          customClassName="text-sm text-citizen-title lowercase -mt-1 relative -top-1"
                          customStyle={{ color: "#67748E" }}
                        /> */}
          </div>
        </div>
        <i className="fa-regular fa-thumbs-up fa-lg text-[#585858]"></i>
      </div>
      <div className="pl-16 ">
        <p
          className="text-[16px] leading-5 font-normal text-gray-500"
          style={{
            color: "#585858",
          }}
        >
          {item?.commenttext}
        </p>
        <button
          className="left-2 top-2 relative text-base font-bold text-[#585858] leading-[18px]"
          onClick={() => setReplyOpen(!replyOpen)}
        >
          Хариулах
        </button>
        {replyOpen && (
          <>
            <div className="w-[90%]">
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
                    // form={form}
                    // handleSubmit={handleSubmit}
                    // EnterClick={EnterClick}
                    selectedId={selectedId}
                    children={item?.children}
                  />
                );
              })}
          </>
        )}
      </div>
    </BlockDiv>
  );
};

export default CommentItem;
