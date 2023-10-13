import _ from "lodash";
import { useCounter } from "react-use";

import RenderAtom from "../Atom/RenderAtom";
import BlockDiv from "../Block/BlockDiv";

export default function MoleculeFilterMultiCheckbox({
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
  //fold - section
  const fold = filterNemgoo?.fold || {};
  const truncateRow = Number(fold?.truncateRow || "9007199254740991");
  const [number, { set: setNumber }] = useCounter(truncateRow); //Бүгдийг харах
  const columnName = `dvc${item.columnname}`;

  const onChangeLocal = (value: any) => {
    onChange({
      // [columnName]: !_.isEmpty(value) && defaultValues[columnName] != value
      [columnName]:
        !_.isEmpty(value) && defaultValues[columnName] != value
          ? value
          : "removeIt",
    });
  };

  return (
    <BlockDiv
      customClassName={`w-full ${customClassName}`}
      customStyle={customStyle}
      divNumber={`${divNamePrefix}MoleculeFilterMultiCheckboxOuter`}
    >
      <BlockDiv
        customClassName="relative flex flex-col"
        divNumber={`${divNamePrefix}MoleculeFilterMultiCheckboxBody`}
      >
        {rows.map((item: any, index: number) => {
          if (index <= number - 1) {
            const active = defaultValues[columnName] == item?.position0.value;

            return (
              <CheckboxItem
                key={item?.id || index}
                item={item}
                divNamePrefix={divNamePrefix}
                active={active}
                onChange={onChangeLocal}
              />
            );
          }
        })}
      </BlockDiv>

      <BlockDiv
        customClassName=""
        divNumber={`${divNamePrefix}MoleculeFilterMultiCheckboxFooter`}
      >
        {number !== 9007199254740991 ? (
          <RenderAtom
            item={{ value: fold?.fold?.title || "Бүгдийг харах" }}
            customClassName={`mt-4 block float-right text-{colorPrimary} cursor-pointer ${fold?.fold?.className}`}
            customStyle={fold?.fold?.style}
            onClick={() => setNumber(9007199254740991)}
          />
        ) : (
          <RenderAtom
            item={{ value: fold?.unFold?.title || "Хумих" }}
            customClassName={`mt-4 block float-right text-{colorPrimary} cursor-pointer ${fold?.unFold?.className}`}
            customStyle={fold?.unFold?.style}
            onClick={() => setNumber(truncateRow)}
          />
        )}
      </BlockDiv>
    </BlockDiv>
  );
}

/* ------------------------------------------------------ */
/*                      CHECKBOXITEM                      */
/* ------------------------------------------------------ */
const CheckboxItem = ({
  item,
  divNamePrefix,
  active,
  onChange,
}: {
  item: any;
  divNamePrefix: string;
  active: boolean;
  onChange: any;
}) => {
  const sizeClassName = "w-5 h-5";

  return (
    <BlockDiv
      customClassName={`flex flex-row gap-x-3 items-center p-1 cursor-pointer hover:bg-gray-50 rounded-md`}
      onClick={() => onChange(item?.position0.value)}
    >
      <BlockDiv customClassName={`flex-none ${sizeClassName}`}>
        {active ? (
          <RenderAtom
            item={{ value: "far fa-check" }}
            renderType="icon"
            customClassName={`bg-{colorPrimary} border-{colorPrimary} text-white rounded-sm text-center w-full h-full`}
            divNamePrefix={divNamePrefix}
          />
        ) : (
          <input
            type="checkbox"
            className={`border border-gray-200 rounded-sm w-full h-full`}
          />
        )}
      </BlockDiv>

      <BlockDiv customClassName={`shrink w-full overflow-hidden`}>
        <RenderAtom
          item={item?.position1}
          renderType="text"
          customClassName="truncate"
          customProps={{
            truncateRow: 1,
          }}
          divNamePrefix={divNamePrefix}
        />
      </BlockDiv>
    </BlockDiv>
  );
};
