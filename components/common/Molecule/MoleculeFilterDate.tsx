import BlockDiv from "../Block/BlockDiv";

export default function MoleculeFilterDate({
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
      divNumber={`${divNamePrefix}MoleculeFilterDateItemOuter`}
    >
      <input className={input?.className} style={input?.style} type="date" />
    </BlockDiv>
  );
}
