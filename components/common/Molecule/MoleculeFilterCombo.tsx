import { Select } from "antd";
import _ from "lodash";

import RenderAtom from "../Atom/RenderAtom";
import BlockDiv from "../Block/BlockDiv";

export default function MoleculeFilterCombo({
  item = {},
  rows = [],
  defaultValues,
  onChange,
  type = "default",
  customClassName = "",
  customStyle = {},
  divNamePrefix = "",
}: {
  item: any;
  rows?: Array<any>;
  defaultValues?: any;
  onChange?: any;
  type?: "default" | "modern";
  customClassName?: string;
  customStyle?: object;
  divNamePrefix?: string;
}) {
  const columnName = `dvc${item.columnname}`;

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
      customClassName={`w-full relative flex flex-col ${customClassName}`}
      customStyle={customStyle}
      divNumber={`${divNamePrefix}MoleculeFilterComboItemOuter`}
    >
      <Select
        onChange={onChangeLocal}
        defaultValue={defaultValues[columnName]}
        allowClear
      >
        {rows.map((item: any, index: number) => {
          return (
            <Select.Option
              key={item?.id || index}
              value={item?.position0?.value || item?.id}
            >
              <RenderAtom
                item={item?.position1 || { value: item?.title }}
                renderType="text"
                divNamePrefix={divNamePrefix}
              />
            </Select.Option>
          );
        })}
      </Select>
    </BlockDiv>
  );
}
