import RenderAtom from "../Atom/RenderAtom";
import BlockDiv from "../Block/BlockDiv";

export default function MoleculeListItem3({
  item,
  divNamePrefix = "",
}: {
  item?: any;
  divNamePrefix?: string;
}) {
  return (
    <BlockDiv divNumber="divMoleculeListItem3Outer">
      <BlockDiv
        customClassName="w-full flex flex-row my-2"
        divNumber={`${divNamePrefix}divMoleculeListItem3Inside`}
      >
        <BlockDiv
          customClassName=""
          divNumber={`${divNamePrefix}divMoleculeListItem3Left`}
        >
          <RenderAtom
            item={item?.position49}
            renderType="icon"
            customClassName="mr-2"
            divNamePrefix={divNamePrefix}
          />
        </BlockDiv>
        <BlockDiv
          customClassName=""
          divNumber={`${divNamePrefix}divMoleculeListItem3Center`}
        >
          <RenderAtom
            item={item?.position1}
            renderType="title"
            divNamePrefix={divNamePrefix}
          />
          <RenderAtom
            item={item?.position3}
            renderType="text"
            divNamePrefix={divNamePrefix}
          />
        </BlockDiv>
      </BlockDiv>
    </BlockDiv>
  );
}
