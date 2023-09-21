import BlockDiv from "../block/blockDiv";
import _ from "lodash";
import { FC } from "react";

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

const AtomDateV2: FC<PropsType> = ({
  item,
  link,
  color = "cozy",
  theme,
  customStyle,
  customClassName,
  showSample = false,
  customDivNumber = "DivDate",
  divNamePrefix = "",
}) => {
  const value = !showSample ? item?.value || "" : "2022-08-12 11:54:00";
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

export default AtomDateV2;
