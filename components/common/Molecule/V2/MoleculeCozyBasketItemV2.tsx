import BlockDiv from "../../Block/BlockDiv";

export default function MoleculeCozyBasketItemV2({
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
      divNumber={`${divNamePrefix}MoleculeCozyBasketItemV2Outer`}
    >
      {children}
    </BlockDiv>
  );
}
