import { FC } from "react";
import _ from "lodash";
import { jsonParse } from "@/utils/helper";
import { useScrollBy } from "react-use-window-scroll";

type PropsType = {
  options?: any;
  className?: any;
};

const Up: FC<PropsType> = ({ options, className }) => {
  const scrollBy = useScrollBy();
  return (
    <>
      <span
        className={`${className} transition duration-150 ease-in-out hover:animate-fade-in-down `}
        onClick={() => scrollBy(options)}></span>
    </>
  );
};

export default Up;
