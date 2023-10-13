import { useToggle } from "react-use";

import RenderAtom from "../Atom/RenderAtom";
import BlockDiv from "../Block/BlockDiv";

const MoleculeFilterCheckbox = ({
  item = {},
  rows = [],
  customClassName = "",
  customStyle = {},
  divNamePrefix = "",
}: {
  item: any;
  rows?: Array<any>;
  customClassName?: string;
  customStyle?: object;
  divNamePrefix?: string;
}) => {
  return (
    <BlockDiv
      customClassName={`w-full relative flex flex-col ${customClassName}`}
      customStyle={customStyle}
      divNumber={`${divNamePrefix}MoleculeFilterCheckboxItemOuter`}
    >
      {rows.map((item: any, index: number) => {
        return (
          <CheckboxItem
            key={item?.id || index}
            item={item}
            divNamePrefix={divNamePrefix}
          />
        );
      })}
    </BlockDiv>
  );
};

export default MoleculeFilterCheckbox;

/* ------------------------------------------------------ */
/*                      CHECKBOXITEM                      */
/* ------------------------------------------------------ */
const CheckboxItem = ({
  item,
  divNamePrefix,
}: {
  item: any;
  divNamePrefix: string;
}) => {
  const [toggle, setToggle] = useToggle(false);

  return (
    <BlockDiv
      customClassName="flex flex-row gap-2 items-center p-1 cursor-pointer hover:bg-gray-50 rounded-md "
      divNumber="CheckboxItemBlock"
      onClick={() => setToggle(!toggle)}
    >
      {toggle ? (
        <RenderAtom
          item={{ value: "fas fa-square-check" }}
          renderType="icon"
          customClassName={`text-{colorPrimary} text-[20px]`}
          divNamePrefix={divNamePrefix}
        />
      ) : (
        <RenderAtom
          item={{ value: "far fa-square" }}
          renderType="icon"
          customClassName={`text-gray-200 text-[20px]`}
          divNamePrefix={divNamePrefix}
        />
        // <input
        //   type="checkbox"
        //   className={`border border-gray-200 rounded-sm ${sizeClassName}`}
        // />
      )}

      <RenderAtom
        item={item?.position1 || { value: item?.title }}
        renderType="text"
        customClassName=""
        divNamePrefix={divNamePrefix}
      />
    </BlockDiv>
  );
};
