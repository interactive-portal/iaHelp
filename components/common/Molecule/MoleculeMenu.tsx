import { useCounter } from "react-use";

import RenderAtom from "../Atom/RenderAtom";
import BlockDiv from "../Block/BlockDiv";
import { toBoolean } from "../engineBox/@/util/atomHelper";

export default function MoleculeMenu({
  defaultActive = -1,
  item: menuList,
  customClassName = "",
  customStyle = {},
  active = {
    className: "border-b-2 border-cozy pb-2",
    style: { fontWeight: "700" },
  },
  divNamePrefix = "",
}: {
  defaultActive?: number | string;
  item?: any;
  customClassName?: string;
  customStyle?: object;
  active?: any;
  divNamePrefix?: string;
}) {
  const [number, { set: setNumber }] = useCounter(Number(defaultActive));

  return (
    <BlockDiv
      customClassName={`flex flex-col ${customClassName}`}
      customStyle={customStyle}
      divNumber={`${divNamePrefix}divMoleculeMenuOuter`}
    >
      {menuList.map((item: any, index: number) => {
        //isactive (position8) шалгаж байна.
        if (
          !toBoolean(
            item?.position8?.value == undefined ? true : item?.position8?.value
          )
        ) {
          return null;
        }

        return (
          <RenderAtom
            key={item?.id || index}
            item={item?.position1}
            renderType="title"
            divNamePrefix={divNamePrefix}
            customClassName={`cursor-pointer ${
              number === index ? active?.className || "" : ""
            }`}
            customStyle={number === index ? active?.style || {} : {}}
            onClick={() => setNumber(index)}
          />
        );
      })}
    </BlockDiv>
  );
}
