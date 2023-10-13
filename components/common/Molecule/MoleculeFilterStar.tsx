import BlockDiv from "../Block/BlockDiv";

export default function MoleculeFilterStar({
  customClassName = "",
  customStyle = {},
  divNamePrefix = "",
}: {
  customClassName?: string;
  customStyle?: object;
  divNamePrefix?: string;
}) {
  return (
    <BlockDiv
      customClassName={customClassName}
      customStyle={customStyle}
      divNumber={`${divNamePrefix}MoleculeFilterStarItemOuter`}
    >
      Үнэлгээнүүд гарна
    </BlockDiv>
  );
}
