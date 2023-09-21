import { Tooltip } from "antd";
import _ from "lodash";
import { FC } from "react";

type PropsType = {
  item?: any;
  customClassName?: string;
  customStyle?: any;
  children: any;
};

const AtomTooltip: FC<PropsType> = ({
  item = {},
  customClassName = "",
  customStyle = {},
  children,
}) => {
  if (_.isEmpty(item)) return children;

  return (
    <Tooltip
      title={item?.text || item?.title || ""}
      className={customClassName}
      style={customStyle}>
      <span className="w-full">{children}</span>
    </Tooltip>
  );
};

export default AtomTooltip;
