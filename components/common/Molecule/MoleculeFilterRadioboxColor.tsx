import _ from "lodash";

import { useCounter } from "react-use";
import BlockDiv from "../Block/BlockDiv";

export default function MoleculeFilterRadioboxColor({
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
  const [number, { set: setNumber }] = useCounter(-1, rows.length, 0);
  const normalClassName = "border-0";
  const activeClassName = "border-2 border-gray-500";

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
      customClassName={`w-full flex flex-wrap gap-1 ${customClassName}`}
      customStyle={customStyle}
      divNumber={`${divNamePrefix}MoleculeFilterRadioboxColorOuter`}
    >
      {rows.map((item: any, index: number) => {
        const active = defaultValues[columnName] == item?.position0.value;
        return (
          <BlockDiv
            key={item?.position0.value}
            customClassName={`w-12 h-7 block flex items-center justify-center hover:p-0 ${
              active ? "p-0" : "p-0.5"
            }`}
            onClick={() => {
              setNumber(index);
              onChangeLocal(item?.position0.value);
            }}
          >
            <div
              className={`w-full h-full cursor-pointer rounded-full ${
                active ? activeClassName : normalClassName
              }`}
              style={{ backgroundColor: item?.value }}
            />
          </BlockDiv>
        );
      })}
    </BlockDiv>
  );
}
