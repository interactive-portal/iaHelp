import { useCloud } from "hooks/use-cloud";
import _ from "lodash";
import { useContext } from "react";
import { twMergeUtil } from "@/components/common/engineBox/util/atomHelper";
import { processCloudinaryImage } from "@/components/common/engineBox/util/imageHelper";
import WidgetWrapperContext from "../engineBox/Wrapper/WidgetUniversalWrapper";

export default function AtomImageV2({
  item,
  theme,
  customClassName = "",
  customStyle,
  cloudinaryParam,
  alt,
  onClick = null,
  showSample = false,
  customDivNumber = "DivImage",
  divNamePrefix = "",
  id,
}: {
  item: any;
  theme?: any;
  customClassName?: string;
  customStyle?: any;
  alt?: string;
  cloudinaryParam?: string; //w_200,h_150,c_scale
  onClick?: any;
  showSample?: boolean;
  customDivNumber?: string;
  divNamePrefix?: string;
  id?: string;
}) {
  const { widgetnemgooReady } = useContext(WidgetWrapperContext);
  const cloudContext = useCloud();

  const value = String(
    !showSample
      ? item?.value
      : "https://www.cars-data.com/pictures/mercedes/mercedes-benz-g-class_4266_24.jpg"
  );
  const valueClassName = item?.className || "";

  if (_.isEmpty(value)) return null;

  //storage гэсэн замтай ирвэл өмнө нь домэйнийг залгаж өгөх ёстой.
  // const ddd = process.env?.[`NEXT_PUBLIC_METAHOST_${metaNameV2}_IMAGEROOTURL`];
  const metaNameV2 = cloudContext?.hostObject?.metaNameV2 || "PROD";
  //   const imageRootUrl =
  //     metaNameV2 === "DEV"
  //       ? process.env.NEXT_PUBLIC_METAHOST_DEV_IMAGEROOTURL
  //       : metaNameV2 === "UAT"
  //       ? process.env.NEXT_PUBLIC_METAHOST_UAT_IMAGEROOTURL
  //       : process.env.NEXT_PUBLIC_METAHOST_PROD_IMAGEROOTURL;
  const imageRootUrl = process.env.IMAGEROOTURL || "https://dev.veritech.mn/";

  // const imageRootUrl =
  //   process.env?.[`NEXT_PUBLIC_METAHOST_${metaNameV2}_IMAGEROOTURL`] || "";

  const imgSrc = _.startsWith(value, "storage/")
    ? `${imageRootUrl}${value}`
    : value;

  const imgSrcReady = processCloudinaryImage(
    imgSrc,
    `fl_progressive${!_.isEmpty(cloudinaryParam) ? `,${cloudinaryParam}` : ""}` //w_200,h_150,c_scale гэх мэтээр өгч болно.
  );

  const divNumber = `${divNamePrefix}${customDivNumber}`;

  return (
    <img
      id={id}
      src={imgSrcReady}
      loading="lazy"
      onError={({ currentTarget }) => {
        currentTarget.onerror = null; // prevents looping
        currentTarget.src =
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
  );
}
