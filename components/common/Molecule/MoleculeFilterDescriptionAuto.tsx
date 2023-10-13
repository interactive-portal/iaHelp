import BlockDiv from "../Block/BlockDiv";

export default function MoleculeFilterDescriptionAuto({
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
      divNumber={`${divNamePrefix}MoleculeFilterDescriptionAutoItemOuter`}
    >
      <textarea className={input?.className} style={input?.style} />
    </BlockDiv>
  );
}
