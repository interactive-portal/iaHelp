import _ from "lodash";

import RenderAtom from "../Atom/RenderAtom";
import BlockDiv from "../Block/BlockDiv";

export default function MoleculeFilterRadioboxButton({
  item = {},
  rows = [],
  defaultValues,
  onChange,
  customClassName = "",
  customStyle = {},
  divNamePrefix = "",
}: {
  item: any;
  rows?: Array<any>;
  defaultValues?: any;
  onChange?: any;
  customClassName?: string;
  customStyle?: object;
  divNamePrefix?: string;
}) {
  const columnName = `dvc${item.columnname}`;
  const activeClassName = "bg-{colorPrimary} text-white border-cozy";
  const normalClassName = "bg-transparent text-[#585858] border-gray-200";

  const onChangeLocal = (value: any) => {
    onChange({
      [columnName]:
        !_.isEmpty(value) && defaultValues[columnName] != value
          ? value
          : "removeIt",
    });
  };

  return (
    <BlockDiv
      customClassName={`w-full flex flex-wrap gap-2 ${customClassName}`}
      customStyle={customStyle}
      divNumber={`${divNamePrefix}MoleculeFilterRadioboxButtonOuter`}
    >
      {rows.map((item: any, index: number) => {
        const active = defaultValues[columnName] == item?.position0.value;
        return (
          <RenderAtom
            key={item?.position0.value}
            item={item?.position1}
            renderType="text"
            customClassName={`block px-3 py-0.5 cursor-pointer rounded-full border flex items-center hover:bg-{colorPrimary} hover:text-white hover:border-cozy ${
              active ? activeClassName : normalClassName
            }`}
            divNamePrefix={divNamePrefix}
            onClick={() => {
              onChangeLocal(item?.position0.value);
            }}
          />
        );
      })}
    </BlockDiv>
  );
}
