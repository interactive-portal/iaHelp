import { useContext, useState } from "react";
import CommunityProfileEditMenu from "./CommunityProfileEditMenu";
import CommunityProfileStandardFormModal from "./CommunityProfileStandardFormModal";
import { useSession } from "next-auth/react";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import { extractInternalProcess } from "@/util/widgetHelper";
import BlockDiv from "@/components/common/Block/BlockDiv";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import { hexToRgba } from "@/util/helper";

export default function CommunityProfileAboutEducation() {
  const { data: session, status } = useSession();

  const { readyDatasrc } = useContext(WidgetWrapperContext);
  const [formModalConfig, setFormModalConfig] = useState({
    isShowModal: false,
    processMode: "insert",
    processCode: "communityUserEdu_002",
    processDVCode: "communityUserEdu",
    ...extractInternalProcess("communityUserEdu"),
    item: null,
    listWidgetId: "16762631689409",
    defaultValues: {
      id: "",
      personid: "{STANDARD_CUSTOMERID}",
      typecode: "112233",
    },
  });

  console.log("readyDatasrc", readyDatasrc);

  return (
    <BlockDiv
      customClassName="w-full"
      divNumber="CommunityProfileAboutEducationOuter"
    >
      <BlockDiv
        customClassName="w-full flex flex-col gap-5 "
        divNumber="CommunityProfileAboutEducationInner"
      >
        <BlockDiv
          customClassName="absolute top-0 right-0"
          divNumber="CommunityProfileAboutEducationInsertBlock"
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

        <BlockDiv
          customClassName="flex flex-col gap-5 w-full"
          divNumber="CommunityProfileAboutEducationBody"
        >
          {readyDatasrc.map((item: any, index: number) => {
            const rgbaColor = hexToRgba(item?.rowcolor, 0.1);
            return (
              <BlockDiv
                key={item?.id || index}
                customClassName="flex flex-row items-center gap-4 relative group w-full"
              >
                <RenderAtom
                  item={
                    item?.position4 || {
                      value: `${item?.startyearid || "XXXX"} → ${
                        item?.endyearid || "XXXX"
                      }`,
                    }
                  }
                  renderType="text"
                  customClassName="bg-[#E6F0FC]/60 text-[#00ADF1] text-[16px] leading-[18px] font-semibold w-[140px] py-3 rounded-full flex items-center justify-center"
                  customStyle={{
                    color: item?.rowcolor,
                    backgroundColor: rgbaColor,
                  }}
                  customProps={{
                    truncateRow: "1",
                  }}
                />
                <BlockDiv
                  customClassName="w-full flex flex-row justify-between items-center"
                  divNumber=""
                >
                  <BlockDiv customClassName="flex flex-col" divNumber="">
                    <RenderAtom
                      item={
                        item?.position1 || {
                          value: item?.degreename || "Тодорхойгүй",
                        }
                      }
                      renderType="title"
                      customClassName="block font-bold text-[#585858]"
                    />
                    <RenderAtom
                      item={
                        item?.position3 || {
                          value: `${item?.countryname}, ${item?.cityname}, ${item?.schoolname}`,
                        }
                      }
                      renderType="text"
                      customClassName="block text-[#67748E]"
                    />
                  </BlockDiv>

                  <CommunityProfileEditMenu
                    item={{ ...item, id: item?.educationid }}
                    formModalConfig={formModalConfig}
                    setFormModalConfig={setFormModalConfig}
                  />
                </BlockDiv>
              </BlockDiv>
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
