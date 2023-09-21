import { FC } from "react";
import _ from "lodash";
import BlockDiv from "../block/blockDiv";
import { decode } from "html-entities";
import parseHtml from "html-react-parser";
import { inherit } from "tailwindcss/colors";

type PropsType = {
  item: any;
  color?: string;
  theme?: any;
  customClassName?: string;
  customStyle?: any;
  truncateRow?: number;
  onClick?: any;
  showSample?: boolean;
  customDivNumber?: string;
  divNamePrefix?: string;
  atomProps?: any;
};

const AtomTitleV2: FC<PropsType> = ({
  item,
  color = "cozy",
  theme,
  customClassName = "",
  customStyle,
  atomProps,
  truncateRow = 0,
  onClick = null,
  showSample = false,
  customDivNumber = "DivTitle",
  divNamePrefix = "",
}) => {
  const value = showSample ? "Sample Title" : item?.value || "";
  const valueClassName = item?.className || "";

  //main хэсэг эхэлж байна.
  // if (_.isEmpty(value)) return null;

  return (
    <BlockDiv
      customClassName={`text-lg font-bold ${customClassName} ${valueClassName}`}
      customStyle={customStyle}
      divNumber={`${divNamePrefix}${customDivNumber}`}
      type="div"
      onClick={onClick}>
      <span className={`line-clamp-${truncateRow}`} style={{ cursor: inherit }}>
        {parseHtml(decode(value))}
      </span>
    </BlockDiv>
  );
};

export default AtomTitleV2;
