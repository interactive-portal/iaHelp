import WidgetWrapperContext from "@/components/widget/WidgetWrapper";
import { twMergeUtil } from "@/utils/widgetHelper";
import _ from "lodash";
import { FC, useContext } from "react";
// import AtomLinkV2 from "./AtomLinkV2";

type PropsType = {
  item: any;
  checked?: boolean;
  color?: string;
  theme?: any;
  hoverSolid?: boolean;
  customClassName?: string;
  customStyle?: any;
  onClick?: any;
  showSample?: boolean;
  customDivNumber?: string;
  divNamePrefix?: string;
};

const AtomIcon: FC<PropsType> = ({
  item,
  checked = false,
  color = "cozy",
  theme,
  hoverSolid = true,
  customClassName = "",
  customStyle,
  onClick,
  showSample = false,
  customDivNumber = "DivIcon",
  divNamePrefix = "",
}) => {
  const { widgetnemgooReady } = useContext(WidgetWrapperContext);
  const value = !showSample ? item?.value || "" : "far fa-smile";
  const valueClassName = item?.className || "";

  if (_.isEmpty(value)) return null;

  let myIcon = value;
  if (hoverSolid && checked) {
    myIcon = _.replace(myIcon, "far", "fas");
    myIcon = _.replace(myIcon, "fal", "fas");
  }

  const divNumber = `${divNamePrefix}${customDivNumber}`;

  return (
    <>
      <i
        className={twMergeUtil(
          theme,
          myIcon,
          customClassName,
          checked && `text-${color}`,
          widgetnemgooReady?.design?.[divNumber]?.className ||
            widgetnemgooReady?.[divNumber]?.className ||
            "",
          valueClassName
        )}
        style={{
          ...widgetnemgooReady?.design?.[divNumber]?.style,
          ...customStyle,
        }}
        onClick={onClick}
        div-name={divNumber}
      />
    </>
  );
};

export default AtomIcon;
