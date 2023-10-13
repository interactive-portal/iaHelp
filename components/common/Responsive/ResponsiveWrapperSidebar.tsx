import _ from "lodash";
import { FC } from "react";

type PropsType = {
  wrapperNemgoo: any;
  isOpen?: boolean;
  setIsOpen?: any;
  customClassName?: string;
  customStyle?: any;
  props?: any;
  children?: any;
};

const ResponsiveWrapperSidebar: FC<PropsType> = ({
  wrapperNemgoo = {},
  isOpen,
  setIsOpen,
  customClassName,
  customStyle,
  props = {},
  children,
}) => {
  if (_.isEmpty(wrapperNemgoo)) return children;

  // const [isVisible, setIsVisible] = useState(isOpen);

  console.log("DDDDDDDDDDDD", wrapperNemgoo, isOpen);
  console.log("BBBBBBBBB", props?.config);

  return children;
};

export default ResponsiveWrapperSidebar;
