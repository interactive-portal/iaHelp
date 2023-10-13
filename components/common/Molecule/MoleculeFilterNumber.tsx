import BlockDiv from "../Block/BlockDiv";

export default function MoleculeFilterNumber({
  item = {},
  input = { className: "", style: {} },
  customClassName = "",
  customStyle = {},
  divNamePrefix = "",
}: {
  item: any;
  input?: any;
  customClassName?: string;
  customStyle?: object;
  divNamePrefix?: string;
}) {
  return (
    <BlockDiv
      customClassName={customClassName}
      customStyle={customStyle}
      divNumber={`${divNamePrefix}MoleculeFilterNumberItemOuter`}
    >
      <input className={input?.className} style={input?.style} type="number" />
    </BlockDiv>
  );
}
