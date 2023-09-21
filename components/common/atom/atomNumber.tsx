import { FC } from "react";
import _ from "lodash";
import BlockDiv from "../block/blockDiv";

type PropsType = {
  item: any;
  link?: string;
  color?: string;
  theme?: any;
  customStyle?: any;
  customClassName?: string;
  showSample?: boolean;
  customDivNumber?: string;
  divNamePrefix?: string;
};

const AtomNumber: FC<PropsType> = ({
  item,
  link,
  color = "cozy",
  theme,
  customStyle,
  customClassName,
  showSample = false,
  customDivNumber = "DivNumber",
  divNamePrefix = "",
}) => {
  const value = !showSample ? item?.value || "" : "902070";
  const valueClassName = item?.className || "";

  if (_.isEmpty(value)) return null;

  return (
    <BlockDiv
      customClassName={`text-sm lg:text-base ${customClassName} ${valueClassName}`}
      customStyle={customStyle}
      divNumber={`${divNamePrefix}${customDivNumber}`}
      type="span">
      {value}
    </BlockDiv>
  );
};

export default AtomNumber;
