import RenderAtom from "../Atom/RenderAtom";
import BlockDiv from "../Block/BlockDiv";

export default function MoleculeFilterLabel({
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
}) {
  return (
    <BlockDiv
      customClassName={customClassName}
      customStyle={customStyle}
      divNumber={`${divNamePrefix}MoleculeFilterLabelItemOuter`}
    >
      <RenderAtom item={rows?.[0]?.position1} renderType="text" />
    </BlockDiv>
  );
}
