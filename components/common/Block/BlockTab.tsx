import React from "react";
import BlockDiv from "./BlockDiv";
import { useCounter } from "react-use";
import RenderAtom from "../Atom/RenderAtom";

export default function BlockTab({
  titleList = [],
  activeNumber = 0,
  customProps = {},

  children,
}: {
  titleList?: any[];
  activeNumber?: number;
  customProps?: {
    titleBlockClassName?: string;
    normalTabClassName?: string;
    activeTabClassName?: string;
  };
  children: any;
}) {
  const [number, { set: setNumber }] = useCounter(
    activeNumber,
    React.Children.count(children) - 1,
    0
  );

  const BlockTabTitleBlockClassName = `w-full flex flex-row gap-x-7 items-center justify-center border-b border-gray-100 border-solid ${customProps?.titleBlockClassName}`;
  const normalTabClassName = `border-b-2 border-solid border-transparent ${customProps?.normalTabClassName}`;
  const activeTabClassName = `border-b-2 border-solid ${customProps?.activeTabClassName}`;

  return (
    <>
      <BlockDiv
        customClassName={BlockTabTitleBlockClassName}
        divNumber="BlockTabTitleBlock"
      >
        {titleList.map((item: any, index: number) => {
          return (
            <RenderAtom
              key={item?.id || index}
              item={item?.position1 || { value: item?.title || item?.name }}
              renderType="title"
              customClassName={`pb-3 cursor-pointer ${
                number === index ? activeTabClassName : normalTabClassName
              }`}
              onClick={() => {
                setNumber(index);
              }}
            />
          );
        })}
      </BlockDiv>

      {React.Children.toArray(children)[number]}
    </>
  );
}
