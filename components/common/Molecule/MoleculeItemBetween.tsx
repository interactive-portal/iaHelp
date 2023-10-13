import RenderAtom from "../Atom/RenderAtom";
import BlockDiv from "../Block/BlockDiv";

export default function MoleculeItemBetween({
  item,
  divNamePrefix = "",
}: {
  item?: any;
  divNamePrefix?: string;
}) {
  return (
    <BlockDiv divNumber="divMoleculeItemBetweenOuter">
      <BlockDiv
        customClassName="w-full flex flex-row items-center justify-between"
        divNumber={`${divNamePrefix}divMoleculeItemBetweenInside`}
      >
        <RenderAtom
          item={item?.first}
          renderType="title"
          divNamePrefix={divNamePrefix}
        />
        <RenderAtom
          item={item?.second}
          renderType="text"
          divNamePrefix={divNamePrefix}
        />
      </BlockDiv>
    </BlockDiv>
  );
}
