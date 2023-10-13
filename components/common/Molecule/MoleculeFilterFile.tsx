import BlockDiv from "../Block/BlockDiv";

export default function MoleculeFilterFile({
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
      divNumber={`${divNamePrefix}MoleculeFilterFileItemOuter`}
    >
      File upload хийх
    </BlockDiv>
  );
}
