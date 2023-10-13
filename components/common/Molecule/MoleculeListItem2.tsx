import RenderAtom from "../Atom/RenderAtom";
import BlockDiv from "../Block/BlockDiv";

export default function MoleculeListItem2({
  item,
  customClassName = "",
  customStyle = {},
  divNamePrefix = "",
}: {
  item?: any;
  customClassName?: string;
  customStyle?: object;
  divNamePrefix?: string;
}) {
  return (
    <BlockDiv divNumber="divMoleculeListItem2Outer">
      <BlockDiv
        customClassName="w-full flex flex-row my-2"
        divNumber={`${divNamePrefix}divMoleculeListItem2Inside`}
      >
        <BlockDiv
          customClassName=""
          divNumber={`${divNamePrefix}divMoleculeListItem2Left`}
        >
          <RenderAtom
            item={item?.icon}
            renderType="icon"
            customClassName="mr-2"
            divNamePrefix={divNamePrefix}
          />
        </BlockDiv>
        <BlockDiv
          customClassName=""
          divNumber={`${divNamePrefix}divMoleculeListItem2Center`}
        >
          <RenderAtom
            item={item?.title}
            renderType="title"
            divNamePrefix={divNamePrefix}
          />
          <RenderAtom
            item={item?.description}
            renderType="text"
            divNamePrefix={divNamePrefix}
          />
        </BlockDiv>
      </BlockDiv>
    </BlockDiv>
  );
}
