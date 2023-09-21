import { FC } from "react";
import _ from "lodash";
import RenderWidget from "../widget/renderWidget";

type PropsType = {
  listConfig?: any;
};

const SectionWidgetChoose: FC<PropsType> = ({ listConfig }) => {
  const widgetnemgooReady = listConfig?.widgetnemgooReady;
  if (widgetnemgooReady?.isShow === "0") return null;

  const widgetConfigNemgoo = widgetnemgooReady?.widget;
  const myMetaTypeId = widgetConfigNemgoo?.metatypeid || listConfig.metatypeid;
  const myActionType = widgetConfigNemgoo?.actiontype || listConfig.actiontype;

  return <>
  <p>{listConfig.widgetcode}</p>
  <br/>
  <p>path: {listConfig.componentpath}</p>
  <br/>
  {/* <pre>{JSON.stringify(listConfig,null,4)}</pre> */}
  {/* <RenderWidget listConfig={listConfig} /> */}
  </>;
};

export default SectionWidgetChoose;
