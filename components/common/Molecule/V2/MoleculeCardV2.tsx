import BlockDiv from "../../Block/BlockDiv";

export default function MoleculeCardV2({
  customClassName = "",
  customStyle = {},
  divNamePrefix = "",
  children,
  initial,
}: {
  customClassName?: string;
  customStyle?: object;
  divNamePrefix?: string;
  children?: any;
  initial?: any;
}) {
  return (
    <BlockDiv
      customClassName={customClassName}
      customStyle={{
        ...customStyle,
      }}
      initial={{ initial }}
      divNumber={`${divNamePrefix}MoleculeCardV2Outer`}
    >
      {children}
    </BlockDiv>
  );
}
