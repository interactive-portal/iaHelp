import BlockDiv from "../Block/BlockDiv";

export default function MoleculeFilterPercent({
  input = { className: "", style: {} },
  customClassName = "",
  customStyle = {},
  divNamePrefix = "",
}: {
  input?: any;
  customClassName?: string;
  customStyle?: object;
  divNamePrefix?: string;
}) {
  return (
    <BlockDiv
      customClassName={customClassName}
      customStyle={customStyle}
      divNumber={`${divNamePrefix}MoleculeFilterPercentItemOuter`}
    >
      <input className={input?.className} style={input?.style} type="number" />
    </BlockDiv>
  );
}
