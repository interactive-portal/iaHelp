import BlockDiv from "../Block/BlockDiv";

export default function MoleculeFilterDatetime({
  item,
  input = { className: "", style: {} },
  customClassName = "",
  customStyle = {},
  divNamePrefix = "",
}: {
  item: string;
  input?: any;
  customClassName?: string;
  customStyle?: object;
  divNamePrefix?: string;
}) {
  return (
    <BlockDiv
      customClassName={customClassName}
      customStyle={customStyle}
      divNumber={`${divNamePrefix}MoleculeFilterDatetimeItemOuter`}
    >
      <input className={input?.className} style={input?.style} type="date" />
    </BlockDiv>
  );
}
