import WidgetWrapperContext from "@/components/widget/WidgetWrapper";
import { isEmpty } from "lodash";
import { FC, useContext } from "react";

// import { useCloud } from "hooks/use-cloud";

type PropsType = {
  item?: any;
  type?: "simple" | "square";
  color?: string;
  theme?: any;
  customClassName?: string;
  customStyle?: object;
  onClick?: any;
  showSample?: boolean;
  customDivNumber?: string;
  divNamePrefix?: string;
};

const AtomAvatar: FC<PropsType> = ({
  item,
  color = "cozy",
  theme,
  customClassName = "",
  customStyle = {},
  onClick = null,
  showSample = false,
  customDivNumber = "DivImage",
  divNamePrefix = "",
}) => {
  const cloudContext = {};

  const value = !showSample
    ? item?.value ||
      "https://res.cloudinary.com/dzih5nqhg/image/upload/v1637746847/cloud/icons/QMpejaITONnxnRBZKksI_mhmyc4.gif"
    : "https://www.cars-data.com/pictures/mercedes/mercedes-benz-g-class_4266_24.jpg";
  const valueClassName = item?.className || "";

  if (isEmpty(value)) return null;

  //storage гэсэн замтай ирвэл өмнө нь домэйнийг залгаж өгөх ёстой.
  let imgSrc = value;
  // if (imgSrc.startsWith("storage/")) {
  //   imgSrc = `${cloudContext.metaConstant.ourMetaConstant.imageRootURL}${imgSrc}`;
  // }

  const divNumber = `${divNamePrefix}${customDivNumber}`;

  return (
    <>
      IMAGE
      {/* <img
        src={imgSrc}
        className={twMergeUtil(
          theme,
          "w-full h-auto",
          customClassName,
          widgetnemgooReady?.design?.[divNumber]?.className ||
            widgetnemgooReady?.[divNumber]?.className ||
            "",
          valueClassName
        )}
        style={{
          ...widgetnemgooReady?.design?.[divNumber]?.style,
          ...customStyle,
        }}
        role="img"
        onClick={onClick}
        div-name={divNumber}
      /> */}
    </>
  );
};

export default AtomAvatar;
