import { FC } from "react";
import _ from "lodash";
import BlockDiv from "../block/blockDiv";

import { twMerge } from "tailwind-merge";

type PropsType = {
  item: any;
  type?:
    | "primary"
    | "primary-white"
    | "gray"
    | "blank"
    | "dashed"
    | "dotted"
    | "text"
    | "link";
  position?: string;
  color?: string;
  theme?: any;
  link?: string;
  customStyle?: any;
  customClassName?: string;
  truncateRow?: number;
  zeroShow?: boolean;
  showSample?: boolean;
  customDivNumber?: string;
  divNamePrefix?: string;
};

const AtomTagV2: FC<PropsType> = ({
  item,
  type = "primary",
  position = "top-3 right-3",
  color = "cozy",
  theme,
  link,
  customStyle,
  customClassName = "",
  truncateRow = 0,
  zeroShow = true,
  showSample = false,
  customDivNumber = "DivTag",
  divNamePrefix = "",
}) => {
  const value = !showSample ? item?.value || "" : "tag";
  const valueClassName = item?.className || "";

  if (_.isEmpty(value)) return null;

  if (!zeroShow && value === "0") return null;

  let bg = `bg-${color}`;
  let border = `border-0 rounded-full`;
  let hover = ``;
  let text = ``;
  let padding = `px-2 py-0.5`;

  switch (type) {
    case "primary":
      bg = `bg-${color}`;
      border = `border-0 rounded-full`;
      text = `text-white`;
      hover = `hover:bg-${color}-dark`;
      break;
    case "primary-white":
      bg = `bg-white`;
      border = `border-0`;
      text = `text-${color}`;
      hover = `hover:bg-${color} hover:text-white`;
      break;
    case "gray":
      bg = `bg-white`;
      border = `border border-gray-300 rounded-md`;
      text = `text-gray-500 text-xs`;
      padding = `px-1.5 py-0.5`;
      // hover = `hover:bg-${color} hover:text-white`;
      break;
    case "blank":
      bg = `bg-transparent`;
      border = `border border-solid`;
      hover = `hover:text-${color} hover:border-${color}`;
      break;
    case "dashed":
      bg = `bg-transparent`;
      border = `border border-dashed`;
      hover = `hover:text-${color} hover:border-${color}`;
      break;
    case "dotted":
      bg = `bg-transparent`;
      border = `border border-dotted`;
      hover = `hover:text-${color} hover:border-${color}`;
      break;
    case "text":
      bg = `bg-transparent`;
      border = `border-0`;
      hover = `hover:bg-gray-100`;
      break;
    case "link":
      bg = `bg-transparent`;
      border = `border-0`;
      break;
    default:
      break;
  }

  const tagClassName = `${text} ${border} ${padding} ${bg} ${hover} ${position}`;

  return (
    <>
      <BlockDiv
        customClassName={`absolute ${tagClassName} ${customClassName} ${valueClassName}`}
        customStyle={customStyle}
        divNumber={`${divNamePrefix}${customDivNumber}`}>
        <span className={`line-clamp-${truncateRow}`}>{value}</span>
      </BlockDiv>
    </>
  );
};

export default AtomTagV2;
