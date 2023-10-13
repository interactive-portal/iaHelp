import BlockDiv from "../Block/BlockDiv";

export default function MoleculeFilterText({
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
      divNumber={`${divNamePrefix}MoleculeFilterTextItemOuter`}
    >
      <input className={input?.className} style={input?.style} type="text" />
    </BlockDiv>
  );
}
