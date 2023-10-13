import BlockDiv from "../Block/BlockDiv";

export default function MoleculeFilterTime({
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
      divNumber={`${divNamePrefix}MoleculeFilterTimeItemOuter`}
    >
      <input className={input?.className} style={input?.style} type="time" />
    </BlockDiv>
  );
}
