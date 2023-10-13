import { Slider } from "antd";

import RenderAtom from "../Atom/RenderAtom";
import BlockDiv from "../Block/BlockDiv";

export default function MoleculeFilterNumberSlider({
  item = {},
  rows = [],
  filterNemgoo = {},
  defaultValues,
  onChange,

  customClassName = "",
  customStyle = {},
  divNamePrefix = "",
}: {
  item: any;
  rows?: Array<any>;
  filterNemgoo?: any;
  defaultValues?: any;
  onChange?: any;

  customClassName?: string;
  customStyle?: object;
  divNamePrefix?: string;
}) {
  const columnMin = `dvc${item.columnname}~min`;
  const columnMax = `dvc${item.columnname}~max`;

  const min = Number(filterNemgoo.min || 0);
  const max = Number(filterNemgoo.max || 100);
  const step = Number(filterNemgoo.step || 10);

  const onChangeLocal = (value: any) => {
    console.log("ddddd onChangeLocal", value);
  };

  const onAfterChange = (value: any) => {
    // [20, 85] -- гэсэн утга ирдэг.
    const query = {
      [columnMin]: value[0] !== min ? value[0] : "removeIt",
      [columnMax]: value[1] !== max ? value[1] : "removeIt",
    };
    onChange(query);
  };

  return (
    <BlockDiv
      customClassName={`${customClassName}`}
      customStyle={customStyle}
      divNumber={`${divNamePrefix}MoleculeFilterNumberSliderItemOuter`}
    >
      <Slider
        // onChange={onChangeLocal}
        onAfterChange={onAfterChange}
        range={{ draggableTrack: true }}
        defaultValue={[
          defaultValues[columnMin] || min,
          defaultValues[columnMax] || max,
        ]}
        min={min}
        max={max}
        step={step}
        tooltipPlacement="top"
        tipFormatter={(value: any) => {
          return (
            <RenderAtom item={{ value: String(value) }} renderType="currency" />
          );
        }}
        disabled={false}
        trackStyle={[
          {
            height: 3,
            backgroundColor: "#54ACAE",
          },
        ]}
        handleStyle={[
          {
            height: "18px",
            width: "18px",
            marginTop: "-8px",
            backgroundColor: "#FFFFFF",
            borderColor: "#54ACAE",
          },
          {
            height: "18px",
            width: "18px",
            marginTop: "-8px",
            backgroundColor: "#FFFFFF",
            borderColor: "#54ACAE",
          },
        ]}
      />
      <BlockDiv
        customClassName="flex flex-row items-center justify-between w-full"
        divNumber={`${divNamePrefix}MoleculeFilterNumberSliderFooter`}
      >
        <RenderAtom item={{ value: String(min) }} renderType="currency" />
        <RenderAtom item={{ value: String(max) }} renderType="currency" />
      </BlockDiv>
    </BlockDiv>
  );
}
