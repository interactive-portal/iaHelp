import React, { FC, useRef, useState } from "react";
import parseHtml from "html-react-parser";
import { decode } from "html-entities";
type PropsType = {
  title?: any;
  content?: any;
};

const FaqItem: FC<PropsType> = ({ title, content }) => {
  const [active, setActive] = useState(false);
  const [height, setHeight] = useState("0px");
  const [rotate, setRotate] = useState("transform duration-700 ease");

  const contentSpace = useRef<HTMLDivElement>(null);

  const toggleAccordion = () => {
    setActive((prevState) => !prevState);
    setHeight(active ? "0px" : `${contentSpace?.current?.scrollHeight}px`);
    setRotate(
      active
        ? "transform duration-300 ease"
        : "transform duration-300 ease rotate-180"
    );
  };
  return (
    <div className="flex flex-col bg-[#F9F9F9] my-4 px-4 rounded-md">
      <button
        className="py-6 box-border appearance-none cursor-pointer focus:outline-none flex items-center justify-between"
        onClick={toggleAccordion}>
        <p className="inline-block text-kbportal-title lg:text-[17px] font-bold text-left xs:text-tiny font-segoe">
          {title}
        </p>
        <img
          src={`https://res.cloudinary.com/dzih5nqhg/image/upload/v1651658827/Khanbank/Group_bvy1nc.svg`}
          alt="Chevron icon"
          className={`${rotate} inline-block`}
        />
      </button>
      <div
        ref={contentSpace}
        style={{ maxHeight: `${height}` }}
        className="overflow-auto transition-max-height duration-300 ease-in-out scrollbar-thumb-gray-300  scrollbar-track-gray-200 scrollbar-thin hover:scrollbar-thumb-gray-300 -dark scrollbar-thumb-rounded-full">
        <div className="px-4 lg:text-base xs:text-xs font-segoe  pb-8">
          {parseHtml(decode(content))}
          {/* {content} */}
        </div>
      </div>
    </div>
  );
};

export default FaqItem;
