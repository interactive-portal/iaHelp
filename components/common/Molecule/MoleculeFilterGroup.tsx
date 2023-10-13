import BlockDiv from "../Block/BlockDiv";

export default function MoleculeFilterGroup({
  item,
  customClassName = "",
  customStyle = {},
  divNamePrefix = "",
}: {
  item: string;
  customClassName?: string;
  customStyle?: object;
  divNamePrefix?: string;
}) {
  return (
    <BlockDiv
      customClassName={customClassName}
      customStyle={customStyle}
      divNumber={`${divNamePrefix}MoleculeFilterGroupItemOuter`}
    >
      Group гарна
    </BlockDiv>
  );
}
