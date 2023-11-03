import RenderAtom from "@/components/common/Atom/RenderAtom";
import BlockDiv from "@/components/common/Block/BlockDiv";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import Link from "next/link";
import { useContext } from "react";

export default function CommunityProfileSidebarFriends() {
  const { readyDatasrc } = useContext(WidgetWrapperContext);

  return (
    <BlockDiv
      customClassName=""
      divNumber="CommunityProfileSidebarFriendsOuter"
    >
      <BlockDiv
        customClassName="flex flex-col gap-5 pt-5"
        divNumber="CommunityProfileSidebarFriendsInner"
      >
        <BlockDiv customClassName="grid grid-cols-3 gap-2">
          {readyDatasrc.map((item: any, index: number) => {
            return (
              <BlockDiv
                key={index}
                customClassName="w-full flex flex-col gap-2"
              >
                <RenderAtom
                  item={{ value: item?.picture }}
                  renderType="image"
                  customClassName="w-full aspect-square object-cover object-center rounded-[10px] border border-[#F3F4F6] border-solid"
                />
                <RenderAtom
                  item={{ value: `${item?.firstname} ${item?.lastname}` }}
                  renderType="title"
                  customClassName="text-center font-semibold text-[14px] leading-[17px] text-[#585858]"
                />
              </BlockDiv>
            );
          })}
        </BlockDiv>

        <RenderAtom
          item={{
            value: "Цааш үзэх",
            positionnemgoo: {
              url: {
                path: "/community/profile/friends",
              },
            },
          }}
          renderType="button"
          customClassName="text-[#2F81E5] font-bold leading-[16px] rounded-[10px] bg-[#E6F0FC] group cursor-pointer hover:brightness-90 py-3 px-5 w-full"
        />
      </BlockDiv>
    </BlockDiv>
  );
}
