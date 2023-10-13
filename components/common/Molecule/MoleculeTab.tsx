import { useCounter } from "react-use";

import RenderAtom from "../Atom/RenderAtom";
import BlockDiv from "../Block/BlockDiv";

export default function MoleculeTab({
  item: myList,
  activeTab = 0,
  customClassName = "",
  customStyle = {},
  normalTabClassName = "text-[#3C3C3C]",
  activeTabClassName = "font-bold border-b-2 border-solid border-{colorPrimary} text-{colorPrimary}",
  divNamePrefix = "",
}: {
  item: Array<any>;
  activeTab?: number;
  customClassName?: string;
  customStyle?: object;
  normalTabClassName?: string;
  activeTabClassName?: string;
  divNamePrefix?: string;
}) {
  const [number, { set: setNumber }] = useCounter(
    activeTab,
    myList.length - 1,
    0
  );

  return (
    <BlockDiv divNumber={`${divNamePrefix}MoleculeTabOuter`}>
      <BlockDiv divNumber={`${divNamePrefix}MoleculeTabInner`}>
        <BlockDiv
          customClassName="flex flex-row gap-x-7 w-full border-b border-gray-100 border-solid"
          divNumber="MoleculeTabHeaderBlock"
        >
          {myList.map((item: any, index: number) => {
            const tabClassName =
              number === index ? activeTabClassName : normalTabClassName;

            return (
              <BlockDiv
                key={item?.id || index}
                customClassName={`cursor-pointer`}
                divNumber="MoleculeTabTitleBlock"
                onClick={() => {
                  setNumber(index);
                }}
              >
                <RenderAtom
                  item={{ value: item.title }}
                  renderType="title"
                  customClassName={`pb-3 ${tabClassName}`}
                />
              </BlockDiv>
            );
          })}
        </BlockDiv>

        <BlockDiv
          customClassName="py-5 rounded-b-xl"
          divNumber="MoleculeTabBodyBlock"
        >
          {myList[number]?.content}
        </BlockDiv>
      </BlockDiv>
    </BlockDiv>
  );
}
