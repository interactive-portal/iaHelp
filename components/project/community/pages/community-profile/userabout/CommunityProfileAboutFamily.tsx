import { useContext, useState } from "react";
import _ from "lodash";
import CommunityProfileStandardFormModal from "./CommunityProfileStandardFormModal";
import CommunityProfileEditMenu from "./CommunityProfileEditMenu";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import { extractInternalProcess } from "@/util/widgetHelper";
import BlockDiv from "@/components/common/Block/BlockDiv";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import { hexToRgba } from "@/util/helper";

export default function CommunityProfileAboutFamily() {
  const { readyDatasrc } = useContext(WidgetWrapperContext);
  const [formModalConfig, setFormModalConfig] = useState({
    isShowModal: false,
    processMode: "insert",
    processCode: "communityUserFamily_002",
    processDVCode: "communityUserFamily",
    ...extractInternalProcess("communityUserFamily"),
    item: null,
    listWidgetId: "16817957481729",
    defaultValues: {
      id: "",
      personid: "{STANDARD_CUSTOMERID}",
      typeCode: "1",
    },
  });

  return (
    <BlockDiv
      customClassName="w-full"
      divNumber="CommunityProfileAboutFamilyOuter"
    >
      <BlockDiv
        customClassName="w-full flex flex-col gap-5"
        divNumber="CommunityProfileAboutFamilyInner"
      >
        <BlockDiv
          customClassName="absolute top-0 right-0"
          divNumber="CommunityProfileAboutJobInsertBlock"
        >
          <RenderAtom
            renderType="icon"
            item={{ value: "fa-regular fa-plus" }}
            customClassName="text-[#A0A0A0] active:text-[#0165E0] text-lg w-8 h-8 rounded-full flex items-center justify-center bg-transparent hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              setFormModalConfig({
                ...formModalConfig,
                isShowModal: true,
                processMode: "insert",
                item: null,
              });
            }}
          />
        </BlockDiv>

        <BlockDiv customClassName="grid grid-cols-2 gap-5">
          {readyDatasrc.map((item: any, index: number) => {
            return (
              <ProfileCard
                key={item?.id || index}
                item={item}
                formModalConfig={formModalConfig}
                setFormModalConfig={setFormModalConfig}
              />
            );
          })}
        </BlockDiv>

        <CommunityProfileStandardFormModal
          formModalConfig={formModalConfig}
          setFormModalConfig={setFormModalConfig}
        />
      </BlockDiv>
    </BlockDiv>
  );
}

const ProfileCard = ({
  item,
  formModalConfig,
  setFormModalConfig,
}: {
  item: any;
  formModalConfig: any;
  setFormModalConfig: any;
}) => {
  const rgbaColor = hexToRgba(item?.iconcolor || "#2F81E5", 0.1);

  return (
    <BlockDiv customClassName="flex flex-row items-center gap-4 relative group">
      <RenderAtom
        item={{
          value: item?.icon,
        }}
        renderType="icon"
        customClassName="bg-[#2F81E5]/60 text-[#2F81E5] text-[32px] rounded-lg w-[94px] h-[94px] flex items-center justify-center"
        customStyle={{
          color: item?.iconcolor,
          backgroundColor: rgbaColor,
        }}
      />
      <BlockDiv customClassName="flex flex-col text-[14px] " divNumber="">
        <BlockDiv
          customClassName="flex flex-row gap-2 items-center"
          divNumber=""
        >
          <RenderAtom
            item={{
              value: item?.fullname,
            }}
            renderType="title"
            customClassName="block font-bold text-[#585858] text-[14px] flex-none"
          />
          <RenderAtom
            item={{
              value: `(${item?.relationshipname})`,
            }}
            renderType="text"
            customClassName="block font-normal text-[#67748E] text-[14px] shrink"
          />
        </BlockDiv>

        <BlockDiv
          customClassName="flex flex-row gap-2 items-center"
          divNumber=""
        >
          <RenderAtom
            item={{
              value: item?.positionname,
            }}
            renderType="title"
            customClassName="block font-bold text-[#585858] text-[14px] flex-none"
            // customProps={{
            //   truncateRow: 1,
            // }}
          />
          <RenderAtom
            item={{
              value: `(${item?.workname})`,
            }}
            renderType="text"
            customClassName="block font-normal text-[#67748E] text-[14px] shrink"
            customProps={{
              truncateRow: 1,
            }}
          />
        </BlockDiv>

        <RenderAtom
          item={{
            value: item?.mobile,
          }}
          renderType="title"
          customClassName="block font-bold text-[#585858] text-[14px] flex-none"
        />
      </BlockDiv>

      <BlockDiv customClassName="absolute top-0 right-0 hidden group-hover:block">
        <CommunityProfileEditMenu
          item={{ ...item, id: item?.peopleid }}
          formModalConfig={formModalConfig}
          setFormModalConfig={setFormModalConfig}
        />
      </BlockDiv>
    </BlockDiv>
  );
};
