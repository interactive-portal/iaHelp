import React from "react";

import useResponsiveBreakpoint from "@customhook/useResponsiveBreakpoint";
import _ from "lodash";
import { Popover } from "antd";

import RenderAtom from "../Atom/RenderAtom";
import { ObjectLight } from "../Types/widgetType";

export default function BlockMore({
  number = "5",
  icon,
  menu,
  workBreakpoint,
  children,
}: {
  number?: string | number;
  icon?: ObjectLight;
  menu?: {
    item?: ObjectLight;
    title?: ObjectLight;
  };
  workBreakpoint?: Array<any>;
  children: React.ReactNode;
}) {
  const { breakpoint } = useResponsiveBreakpoint();

  const MenuChildrenListRaw = React.Children.toArray(children).slice(
    Number(number)
  );

  const MenuChildrenListReady = React.Children.map(
    MenuChildrenListRaw,
    (child: any) => {
      const itemClassNameReady = `${child.props.className} ${child.props.class} ${child.props.className} ${menu?.item?.className}`;

      return React.cloneElement(child, {
        className: itemClassNameReady,
      });
    }
  );

  if (!_.includes(workBreakpoint, breakpoint)) return children;

  return (
    <>
      {/* Үндсэн харагдах хэсэг */}
      {_.slice(React.Children.toArray(children), 0, Number(number))}

      {/* Цэсэнд хураагдсан хэсэг */}
      <Popover content={MenuChildrenListReady} trigger="click" arrow={false}>
        <div>
          <RenderAtom
            item={{ value: icon?.value || "far fa-ellipsis" }}
            renderType="icon"
            className={icon?.className}
            customStyle={icon?.style}
          />
        </div>
      </Popover>
    </>
  );
}
