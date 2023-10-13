import RenderAtom from "../Atom/RenderAtom";
import BlockDiv from "../Block/BlockDiv";
import { ObjectLight } from "../Types/widgetType";
import Error500 from "./Error500";
import ErrorNotice from "./ErrorNotice";
import InfoNotice from "./InfoNotice";
import IsFallback from "./IsFallback";
import Loading from "./Loading";
import Percent from "./Percent";
import Skeleton from "./Skeleton";
import SuccessNotice from "./SuccessNotice";
import WarningNotice from "./WarningNotice";

export default function RenderNotice({
  renderType,
  title,
  className,
  customClassName,
  style,
  customStyle,
  customProps,
  props,
}: {
  renderType?:
    | "success"
    | "info"
    | "warning"
    | "error"
    | "loading"
    | "percent"
    | "skeleton"
    | "isfallback"
    | "error500"
    | "urgent"
    | "required";
  title?: ObjectLight;
  className?: string;
  customClassName?: string;
  style?: any;
  customStyle?: any;
  customProps?: any;
  props?: any;
}) {
  const RenderComponent = () => {
    switch (renderType) {
      case "success":
        return <SuccessNotice {...customProps} />;
      case "info":
        return <InfoNotice {...customProps} />;
      case "warning":
        return <WarningNotice {...customProps} />;
      case "error":
        return <ErrorNotice {...customProps} />;
      case "loading":
        return <Loading {...customProps} />;
      case "percent":
        return <Percent {...customProps} />;
      case "skeleton":
        return <Skeleton {...customProps} />;
      case "isfallback":
        return <IsFallback {...customProps} />;
      case "error500":
        return <Error500 {...customProps} />;
      default:
        return <>Мэдэгдэх зүйлгүй</>;
    }
  };

  const propsREady = { ...customProps };

  return (
    <BlockDiv
      className={`${customClassName || ""} ${className || ""}`}
      customStyle={customStyle || style}
      ObjectLight={props?.RenderNoticeOuter}
      divNumber="RenderNoticeOuter"
    >
      <BlockDiv
        divNumber="RenderNoticeInner"
        ObjectLight={props?.RenderNoticeInner}
      >
        <BlockDiv
          className={`text-gray-200 text-xs flex justify-between w-full`}
          divNumber="RenderNoticeTitleBlock"
        >
          {/* //widget-ийн isLoading дээр асуудал үүссэн тул түүхий div-ээр явав. */}
          <div
            className={title?.className || customProps?.title?.className}
            style={title?.style || customProps?.title?.style}
          >
            {title?.value || customProps?.title?.title || ""}
          </div>

          <div
            className={customProps?.description?.className}
            style={customProps?.description?.style}
          >
            {customProps?.description?.title || ""}
          </div>
        </BlockDiv>
        <RenderComponent />
      </BlockDiv>
    </BlockDiv>
  );
}
