import BlockDiv from "../Block/BlockDiv";

export default function MoleculeFilterDescription({
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
      divNumber={`${divNamePrefix}MoleculeFilterDescriptionItemOuter`}
    >
      <textarea className={input?.className} style={input?.style} />
    </BlockDiv>
  );
}
