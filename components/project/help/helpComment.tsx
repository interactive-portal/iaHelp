import fetchJson from "lib/fetchJson";
import _ from "lodash";
import moment from "moment";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FC, useContext, useEffect, useRef, useState } from "react";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import BlockDiv from "@/components/common/Block/BlockDiv";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import useCallProcess from "@/middleware/dataHook/useCallProcess";
import { Select } from "antd";
import AddComment from "./addComment";
import CommentItem from "./commentItem";
import { listToTree } from "@/util/helper";
import useSWR from "swr";

type PropsType = {
  commentData?: any;
  setCommentCount?: any;
  commentcount?: any;
};

const helpComment: FC<PropsType> = ({
  commentData,
  setCommentCount,
  commentcount,
}: any) => {
  const { data: session, status }: any = useSession();
  const { widgetnemgooReady, positionConfig } =
    useContext(WidgetWrapperContext);
  const router = useRouter();
  let selectedId = router.query?.filterid;

  const [commentList, setcommentList] = useState<any>(null);
  let structureId = widgetnemgooReady?.listconfig?.filterstructureid;
  const [profile, setProfile] = useState(session);

  const parameters = JSON.stringify({
    filterRecordId: selectedId || widgetnemgooReady?.recordId,
    filterStructureId: "1479204227214",
  });

  const {
    data: comment,
    error,
    mutate,
  } = useSWR(
    `/api/post-process?command=PRTL_MN_GET_COMMENT_004&parameters=${parameters}`
  );

  let clecmcommentd: any = _.values(comment?.result?.ecmcommentdtl);

  let comments = _.values(clecmcommentd);
  let ordered = _.orderBy(comments, ["createddate"], ["desc"]);

  const tree = listToTree(ordered, "parentid");

  return (
    <BlockDiv
      customClassName="w-full rounded-lg px-2 py-4 "
      divNumber={"div100"}
    >
      <div className="flex justify-between items-center w-full">
        <p className="text-[#585858] text-[30px] font-medium leading-[32px]">
          {commentcount != 0 && commentcount} Сэтгэгдэл
        </p>
        <Select
          defaultValue="Шинэ эхэндээ"
          style={{ width: 200, border: "none" }}
          options={[{ value: "Шинэ эхэндээ", label: "Шинэ эхэндээ" }]}
        />
      </div>
      {/* {!profile && (
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
      )} */}
      <AddComment
        // form={form}
        mutate={mutate}
        session={session}
        // getComment={getComment}
        // handleSubmit={handleSubmit}
        // EnterClick={EnterClick}
        selectedId={selectedId}
      />

      {tree.length > 0 && (
        <div className="chat-container pb-2 mt-2 max-h-112 overflow-y-auto mb-2 scrollbar-thumb-gray-300  scrollbar-track-gray-200 scrollbar-thin hover:scrollbar-thumb-gray-300 -dark scrollbar-thumb-rounded-full lg:max-h-sm h-full">
          <div className="  lg:max-h-sm h-full mt-2">
            {tree.map((item: any, index: number) => {
              return (
                <CommentItem
                  key={index}
                  item={item}
                  index={index}
                  mutate={mutate}
                  session={session}
                  // form={form}
                  // getComment={getComment}
                  // handleSubmit={handleSubmit}
                  // EnterClick={EnterClick}
                  selectedId={selectedId}
                  children={item?.children}
                />
              );
            })}
          </div>
        </div>
      )}
      {/* CHAT */}
    </BlockDiv>
  );
};
export default helpComment;
