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

  return <RenderWidget listConfig={listConfig} />;
};

export default SectionWidgetChoose;
