import { FC } from "react";
import Down from "./down";
import Up from "./down";

type PropsType = {
  type?: string;
  customClassName?: string;
  options?: any;
};

const Scroll: FC<PropsType> = ({
  type = "default",
  customClassName,
  options,
}) => {
  switch (type) {
    case "down":
      return <Down options={options} className={customClassName} />;
    default:
      return <Up />;
  }
};

export default Scroll;
