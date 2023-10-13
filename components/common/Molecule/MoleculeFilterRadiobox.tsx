import { useToggle } from "react-use";

import RenderAtom from "../Atom/RenderAtom";
import BlockDiv from "../Block/BlockDiv";

export default function MoleculeFilterRadiobox({
  rows = [],
  customClassName = "",
  customStyle = {},
  divNamePrefix = "",
}: {
  rows?: Array<any>;
  customClassName?: string;
  customStyle?: object;
  divNamePrefix?: string;
}) {
  return (
    <BlockDiv
      customClassName={`w-full relative flex flex-col ${customClassName}`}
      customStyle={customStyle}
      divNumber={`${divNamePrefix}MoleculeFilterRadioboxItemOuter`}
    >
      {rows.map((item: any, index: number) => {
        return (
          <RadioItem
            key={item?.id || index}
            item={item}
            divNamePrefix={divNamePrefix}
          />
        );
      })}
    </BlockDiv>
  );
}

/* ------------------------------------------------------ */
/*                        RADIOITEM                       */
/* ------------------------------------------------------ */
const RadioItem = ({
  item,
  divNamePrefix,
}: {
  item: any;
  divNamePrefix: string;
}) => {
  const [toggle, setToggle] = useToggle(false);
  const sizeClassName = "w-5 h-5";

  return (
    <div
      className="flex items-center p-1 cursor-pointer hover:bg-gray-50 rounded-md"
      onClick={() => setToggle(!toggle)}
    >
      {toggle ? (
        <RenderAtom
          item={{ value: "far fa-check" }}
          renderType="icon"
          customClassName={`bg-{colorPrimary} border-{colorPrimary} text-white rounded-sm text-center ${sizeClassName}`}
          divNamePrefix={divNamePrefix}
        />
      ) : (
        <input
          type="Radio"
          className={`border border-gray-200 rounded-sm ${sizeClassName}`}
        />
      )}

      <RenderAtom
        item={item?.position1}
        renderType="text"
        customClassName="ml-2"
        divNamePrefix={divNamePrefix}
      />
    </div>
  );
};
