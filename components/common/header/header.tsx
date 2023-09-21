import { DefaultHandler } from "htmlparser2";
import { FC } from "react";
import _ from "lodash";
import RenderSections from "@/components/pageRender/renderSections";
import RenderWidget from "@/components/widget/renderWidget";
import ErpHeader from "@/components/custom/header/erpHeader";
import FeadbackHeader from "@/components/custom/header/feadbackHeader";
import useWidgetData from "@/components/widget/useData";
import { jsonParse } from "@/utils/helper";

type PropsType = {
  data?: any;
};

const Header: FC<PropsType> = ({ data }) => {
  let headDataSrc = data?.layout;
  let headerSection: any = [];

  headerSection.push(_.find(headDataSrc, ["sectionCode", "header"]));
  const headSection =
    headDataSrc?.readyMergedLayoutConfig?.meta_hdr_bp_layout_section;

  const sectionList = _.filter(headSection, {
    widgetcode: "erpHeader",
  });
  const nemgoo = jsonParse(sectionList[0]?.widgetnemgoo);
  const styleType = nemgoo?.options?.type;
  const [dataSrc, dataError, dataMutate, paging, aggregatecolumns] =
    useWidgetData(sectionList[0]);

  if (styleType === "2") {
    return (
      <header
        className={`${nemgoo?.sectionClassName}  top-0 z-50 fixed bg-white`}>
        <FeadbackHeader
          dataSrc={dataSrc}
          config={sectionList[0]}
          options={nemgoo}
        />
      </header>
    );
  } else {
    return (
      <header
        className={`${nemgoo?.sectionClassName}  top-0 z-50 fixed  bg-opacity-0 w-full`}>
        <ErpHeader dataSrc={dataSrc} config={sectionList[0]} options={nemgoo} />
      </header>
    );
  }
};

export default Header;
