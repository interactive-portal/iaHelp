import WidgetWrapperContext from "@/components/widget/WidgetWrapper";
// import { metaConfig } from "@config/metaConfig";
import { twMergeUtil } from "@/utils/widgetHelper";
// import { useCloud } from "hooks/use-cloud";
import { isEmpty } from "lodash";
import { FC, useContext } from "react";
import Image from "next/image";

type PropsType = {
  item: any;
  color?: string;
  theme?: any;
  customClassName?: string;
  customStyle?: any;
  alt?: string;
  options?: string;
  onClick?: any;
  showSample?: boolean;
  customDivNumber?: string;
  divNamePrefix?: string;
};

const AtomImg: FC<PropsType> = ({
  item,
  color = "cozy",
  theme,
  customClassName = "",
  customStyle,
  alt,
  options,
  onClick = null,
  showSample = false,
  customDivNumber = "DivImage",
  divNamePrefix = "",
}) => {
  const { widgetnemgooReady } = useContext(WidgetWrapperContext);
  const cloudContext = {};
  const metaName = widgetnemgooReady?.metaConfig?.host?.metaName || "metaProd";

  const value = !showSample
    ? item?.value
    : "https://www.cars-data.com/pictures/mercedes/mercedes-benz-g-class_4266_24.jpg";
  const valueClassName = item?.className || "";

  const positionnemgoo = item?.positionnemgoo || {};

  if (isEmpty(value)) return null;

  const metaNameV2 = {}; //cloudContext?.hostObject?.metaNameV2;

  //storage гэсэн замтай ирвэл өмнө нь домэйнийг залгаж өгөх ёстой.
  // const ddd = process.env?.[`NEXT_PUBLIC_METAHOST_${metaNameV2}_IMAGEROOTURL`];
  const ddd = process.env.IMAGEROOTURL || "https://dev.veritech.mn/";

  let imgSrc = value;
  if (imgSrc?.startsWith("storage/")) {
    imgSrc = `${ddd}${imgSrc}`;
  }
  const divNumber = `${divNamePrefix}${customDivNumber}`;

  return (
    <>
      <img
        src={imgSrc}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src =
            // "https://res.cloudinary.com/dzih5nqhg/image/upload/v1663122773/cozy/NoImage_ej0xi3.jpg";
            "https://res.cloudinary.com/dzih5nqhg/image/upload/v1677751495/moto_mn/Banner/icon-no-image_tcse9o.svg";
        }}
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
        alt={alt || imgSrc}
        role="img"
        onClick={onClick}
        div-name={divNumber}
      />
    </>
  );
};

export default AtomImg;
