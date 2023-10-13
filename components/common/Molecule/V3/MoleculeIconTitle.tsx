import RenderAtom from "@/components/common/Atom/RenderAtom";
import BlockDiv from "@/components/common/Block/BlockDiv";

export default function MoleculeIconTitle({
  icon,
  title,
  customProps,
}: {
  icon?: string;
  title?: string;
  customProps?: {
    outerClassName?: string;
    iconClassName?: string;
    titleClassName?: string;
    outerProps?: any;
    iconProps?: any;
    titleProps?: any;
  };
}) {
  return (
    <BlockDiv
      className={`flex flex-row items-center gap-3 ${customProps?.outerClassName}`}
      {...customProps?.outerProps}
      divNumber="MoleculeIconTitleOuter"
    >
      <RenderAtom
        item={{ value: icon }}
        renderType="icon"
        customClassName={customProps?.iconClassName}
        {...customProps?.iconProps}
      />
      <RenderAtom
        item={{ value: title }}
        renderType="title"
        customClassName={customProps?.titleClassName}
        {...customProps?.titleProps}
      />
    </BlockDiv>
  );
}
