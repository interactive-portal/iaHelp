import { useCounter, useUpdateEffect } from "react-use";
import { twMerge } from "tailwind-merge";

import RenderAtom from "../Atom/RenderAtom";
import BlockDiv from "../Block/BlockDiv";

export default function MoleculeButtonNumberBetween({
  customClassName = "",
  customStyle = {},
  onClick,
  defaultValue = 1,
  minValue = -999999999999999,
  maxValue = 999999999999999,
  button = {},
  divNamePrefix = "",
}: {
  customClassName?: string;
  customStyle?: object;
  onClick?: any;
  defaultValue?: string | number;
  minValue?: string | number;
  maxValue?: string | number;
  button?: any;
  divNamePrefix?: string;
}) {
  // console.log("🚀 ~ defaultValue", Number(defaultValue));

  const [current, { inc: incNumber, dec: decNumber }] = useCounter(
    Number(defaultValue),
    Number(maxValue),
    Number(minValue)
  );

  // console.log("🚀 ~ current", current);

  useUpdateEffect(() => {
    onClick(current);
  }, [current]);

  return (
    <BlockDiv
      divNumber={`${divNamePrefix}MoleculeButtonNumberBetweenOuter`}
      customClassName={`flex flex-row items-center justify-between rounded-full h-9 px-3 bg-{colorPrimary} text-white ${customClassName}`}
      customStyle={customStyle}
    >
      <RenderAtom
        item={{ value: null }}
        renderType="button"
        divNamePrefix={`${divNamePrefix}`}
        customClassName={`h-9 hover:bg-transparent px-0 ${button?.className}`}
        customStyle={button?.customStyle}
        customProps={{
          type: "text",
          color: "cozy",
          icon: twMerge(`fas fa-minus text-white ${button?.icon?.className}`),
        }}
        onClick={() => {
          // setNumber(number - 1);
          decNumber();
        }}
      />
      <RenderAtom
        item={{ value: current.toString() }}
        // item={{ value: String(number) }}
        renderType="text"
        divNamePrefix={`${divNamePrefix}`}
        customClassName="block px-0"
        customStyle={{
          fontSize: "18px",
          lineHeight: "21px",
        }}
        customProps={{
          type: "text",
          color: "cozy",
        }}
      />
      <RenderAtom
        item={{ value: null }}
        renderType="button"
        divNamePrefix={`${divNamePrefix}`}
        customClassName={`h-9 hover:bg-transparent px-0 ${button?.className}`}
        customStyle={button?.customStyle}
        customProps={{
          type: "text",
          color: "cozy",
          icon: twMerge(`fas fa-plus text-white ${button?.icon?.className}`),
        }}
        onClick={() => {
          // setNumber(number + 1);
          incNumber();
        }}
      />
    </BlockDiv>
  );
}
