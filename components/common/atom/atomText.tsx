import React, { FC } from "react";
import _ from "lodash";
import { decode } from "html-entities";
import parseHtml from "html-react-parser";

import { twMerge } from "tailwind-merge";
import BlockDiv from "../block/blockDiv";
import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { twMergeUtil } from "@/utils/widgetHelper";

const AtomText = ({
  item,
  color = "cozy",
  theme,
  onMouseEnter,
  customClassName = "",
  customStyle,
  truncateRow = 0,
  maxLength = 9007199254740991,
  onClick = null,
  showSample = false,
  customDivNumber = "DivText",
  divNamePrefix = "",
  children,
}: {
  item: any;
  link?: string;
  color?: string;
  theme?: any;
  onMouseEnter?: any;
  customStyle?: any;
  customClassName?: string;
  truncateRow?: number;
  maxLength?: number;
  onClick?: any;
  showSample?: boolean;
  customDivNumber?: string;
  divNamePrefix?: string;
  children?: any;
}) => {
  const value: string = !showSample ? String(item?.value) || "" : "Sample Text";
  const valueClassName = item?.className || "";

  //main хэсэг эхэлж байна.
  if (_.isEmpty(value)) return null;

  // const myValue = parseHtml(decode(value.substring(0, maxLength)));
  const content = decode(value.substring(0, maxLength));

  return (
    <BlockDiv
      customClassName={`${customClassName} ${valueClassName}`}
      customStyle={customStyle}
      divNumber={`${divNamePrefix}${customDivNumber}`}
      type="span"
      onClick={onClick}>
      <span className={`line-clamp-${truncateRow}`} onMouseEnter={onMouseEnter}>
        <ReactMarkdown
          // children={content}
          rehypePlugins={[rehypeRaw]}
          components={{ p: React.Fragment }}>
          {content}
        </ReactMarkdown>
      </span>
    </BlockDiv>
  );
};

export default AtomText;
