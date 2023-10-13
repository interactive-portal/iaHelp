import { Popover } from "antd";
import BlockDiv from "./BlockDiv";

export default function BlockPopover({
  content,
  props,
  children,
}: {
  content: any;
  props?: {
    title?: string;
    trigger?: "hover" | "focus" | "click" | "contextMenu";
    placement?:
      | "top"
      | "left"
      | "right"
      | "bottom"
      | "topLeft"
      | "topRight"
      | "bottomLeft"
      | "bottomRight"
      | "leftTop"
      | "leftBottom"
      | "rightTop"
      | "rightBottom";
  };
  children: any;
}) {
  if (!content) return children;

  return (
    <Popover
      content={content}
      title=""
      trigger="hover"
      placement="bottom"
      arrow={false}
      {...props}>
      <BlockDiv className="w-full h-full" divNumber="BlockPopoverOuter">
        {children}
      </BlockDiv>
    </Popover>
  );
}
