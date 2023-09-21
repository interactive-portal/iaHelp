import WidgetWrapperContext from "@/components/widget/WidgetWrapper";
import { twMergeUtil } from "@/utils/widgetHelper";
import _ from "lodash";
import { FC, useContext } from "react";

type PropsType = {
  item: any;
  type?:
    | "primary"
    | "primary-white"
    | "primary-border"
    | "transparent-border"
    | "blank"
    | "dashed"
    | "dotted"
    | "text"
    | "link"
    | "icon";
  icon?: string;
  image?: string;
  color?: string;
  theme?: any;
  checked?: boolean;
  custom?: any;
  disable?: boolean;
  disableClassName?: string;
  onClick?: any;
  customClassName?: string;
  customStyle?: object;
  showSample?: boolean;
  customDivNumber?: string;
  divNamePrefix?: string;
};

const AtomButtonV2: FC<PropsType> = ({
  item,
  type = "primary",
  icon = null,
  image = null,
  color = "cozy",
  theme,
  checked = false,
  custom = {},
  disable = false,
  disableClassName = "cursor-not-allowed bg-gray-200 text-gray-400",
  onClick = null,
  customStyle = {},
  customClassName = "",
  showSample = false,
  customDivNumber = "DivButton",
  divNamePrefix = "",
}) => {
  const { widgetnemgooReady } = useContext(WidgetWrapperContext);

  const value = !showSample ? item?.value || "" : "Sample";
  const valueClassName = item?.className || "";

  if (_.isEmpty(value) && _.isEmpty(icon)) return null;

  let bg = `bg-${color}`;
  let border = `border-0`;
  let hover = ``;
  let text = ``;

  switch (type) {
    case "primary":
      bg = `bg-${color}`;
      border = `border-0`;
      text = `text-white`;
      hover = `hover:bg-${color}-dark`;
      break;
    case "primary-white":
      bg = `bg-white`;
      border = `border-0`;
      text = `text-${color}`;
      hover = `hover:bg-${color} hover:text-white`;
      break;
    case "primary-border":
      bg = `bg-white`;
      border = `border border-${color}`;
      text = `text-${color}`;
      hover = `hover:bg-${color}`;
      break;
    case "transparent-border":
      bg = `bg-transparent`;
      border = `border border-${color}`;
      text = `text-${color}`;
      hover = `hover:bg-${color} hover:text-white hover:border-0`;
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
      hover = `hover:text-${color}`;
      break;
    case "icon":
      bg = `bg-transparent`;
      border = `border-0`;
      hover = `hover:text-${color}`;
      break;
    default:
      break;
  }

  const buttonClassName = `cursor-pointer ${text} ${border} py-2 px-4 ${bg} ${hover}`;

  const divNumber = `${divNamePrefix}${customDivNumber}`;

  return (
    <button
      {...custom}
      className={twMergeUtil(
        theme,
        "focus:shadow-outline flex items-center justify-center transition-colors duration-300",
        buttonClassName,
        customClassName,
        `${disable ? disableClassName : ""}`,
        widgetnemgooReady?.design?.[divNumber]?.className ||
          widgetnemgooReady?.design?.[divNumber]?.className ||
          "",
        valueClassName
      )}
      style={{
        ...customStyle,
        ...widgetnemgooReady?.design?.[divNumber]?.style,
      }}
      onClick={
        onClick && //onCLick-ийг байхгүй үед нь дүрслэх хэрэггүй. Учир нь a tag-аар хучсан үед a tag-ийн линк ажиллагаагүй болоод байгаа юм.
        ((e) => {
          if (!disable) {
            e.preventDefault();
            onClick(e);
          }
        })
      }
      div-name={divNumber}
    >
      {icon && <i className={`${icon} ${!_.isEmpty(value) && "mr-2"}`}></i>}
      {value && <>{value}</>}
    </button>
  );
};

export default AtomButtonV2;
