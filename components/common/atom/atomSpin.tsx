import { LoadingOutlined } from "@ant-design/icons";
import { Spin, Tooltip } from "antd";
import _ from "lodash";
import { FC } from "react";

type PropsType = {
  spinning?: boolean;
  delay?: number;
  tip?: string;
  indicator?: "default" | "modern";
  customClassName?: string;
  customStyle?: any;
  children: any;
};

const AtomSpinV2: FC<PropsType> = ({
  spinning = false,
  delay = 0,
  tip = "",
  indicator = "default",
  customClassName = "",
  customStyle = {},
  children,
}) => {
  if (!spinning) return children;

  const LoadingAntIcon = (
    <LoadingOutlined style={{ fontSize: 24, color: "#54ADAE" }} spin />
  );

  return (
    <Spin
      spinning={spinning}
      delay={delay}
      tip={tip}
      indicator={LoadingAntIcon}
      wrapperClassName="w-fit"
    >
      {children}
    </Spin>
  );
};

export default AtomSpinV2;
