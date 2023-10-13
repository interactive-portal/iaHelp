import { useState } from "react";

import RenderAtom from "../Atom/RenderAtom";
import BlockDiv from "../Block/BlockDiv";

export default function MoleculeRadiobox({
  item,
  customClassName = "",
  customStyle = {},
  divNamePrefix = "",
}: {
  item: any;
  customClassName?: string;
  customStyle?: object;
  divNamePrefix?: string;
}) {
  const [selectedId, setSelectedId]: any = useState(0);

  return (
    <BlockDiv
      customClassName="w-full relative flex flex-col"
      divNumber={`${divNamePrefix}MoleculeRadioboxItemOuter`}
    >
      {item.map((item: any, index: number) => {
        return (
          <RadioboxItem
            key={item?.id || index}
            item={item}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            divNamePrefix={divNamePrefix}
          />
        );
      })}
    </BlockDiv>
  );
}

/* ------------------------------------------------------ */
/*                      RADIOBOXITEM                      */
/* ------------------------------------------------------ */
const RadioboxItem = ({
  item,
  selectedId,
  setSelectedId,
  divNamePrefix,
}: {
  item: any;
  selectedId: string | number;
  setSelectedId: any;
  divNamePrefix: string;
}) => {
  const sizeClassName = "w-5 h-5";

  return (
    <div
      className="flex items-center p-1 cursor-pointer hover:bg-gray-50 rounded-md"
      onClick={() => setSelectedId(item?.id)}
    >
      {item?.id === selectedId ? (
        <RenderAtom
          item={{ value: "fas fa-circle-small" }}
          renderType="icon"
          customClassName={`bg-{colorPrimary} border-{colorPrimary} text-white rounded-full text-center align-middle ${sizeClassName}`}
          divNamePrefix={divNamePrefix}
        />
      ) : (
        <input
          type="checkbox"
          className={`border border-gray-200 rounded-full ${sizeClassName}`}
        />
      )}

      <RenderAtom
        item={{ value: item.title }}
        renderType="text"
        customClassName="ml-2"
        divNamePrefix={divNamePrefix}
      />
    </div>
  );
};
