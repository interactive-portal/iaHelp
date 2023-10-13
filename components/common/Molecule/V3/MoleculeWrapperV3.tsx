import BlockDiv from "../../Block/BlockDiv";
import AtomTooltipV2 from "../../Atom/V2/AtomTooltipV2";
import AtomSpinV2 from "../../Atom/V2/AtomSpinV2";

export default function RenderMolecule({
  outsideClassName = "",
  isMoleculeWorking = false,
  divNamePrefix = "",
  tooltip = {},
  children,
}: {
  outsideClassName?: string;
  isMoleculeWorking?: boolean;
  divNamePrefix?: string;
  tooltip?: any;
  children?: any;
}) {
  return (
    <BlockDiv
      customClassName={outsideClassName}
      divNumber={`${divNamePrefix}moleculeOutside`}
    >
      <AtomSpinV2
        spinning={isMoleculeWorking}
        delay={0}
        tip=""
        indicator="default"
      >
        <AtomTooltipV2 item={tooltip}>{children}</AtomTooltipV2>
      </AtomSpinV2>
    </BlockDiv>
  );
}
