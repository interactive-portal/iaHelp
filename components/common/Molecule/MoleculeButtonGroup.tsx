import BlockDiv from "../Block/BlockDiv";

export default function MoleculeButtonGroup({
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
  return (
    <BlockDiv divNumber={`${divNamePrefix}divmoleculebuttongroup10`}>
      Энд Button Group гарна.
    </BlockDiv>
  );
}
