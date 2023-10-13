import RenderAtom from "../Atom/RenderAtom";
import BlockDiv from "../Block/BlockDiv";

export default function MoleculeCard({
  item,
  customClassName = "",
  customStyle = {},
  divNamePrefix = "",
}: {
  item?: any;
  customClassName?: string;
  customStyle?: object;
  divNamePrefix?: string;
}) {
  return (
    <BlockDiv
      customClassName={customClassName}
      customStyle={customStyle}
      divNumber={`${divNamePrefix}divMoleculeCardOuter`}
    >
      <RenderAtom
        item={item?.position2}
        renderType="image"
        customClassName="w-full h-full object-cover object-center"
        divNamePrefix={divNamePrefix}
      />
      <RenderAtom
        item={item?.position1}
        renderType="title"
        divNamePrefix={divNamePrefix}
      />
      <RenderAtom
        item={item?.position40}
        renderType="text"
        divNamePrefix={`${divNamePrefix}subtitle`}
      />
      <RenderAtom
        item={item?.position3}
        renderType="text"
        divNamePrefix={divNamePrefix}
      />
      <RenderAtom
        item={item?.position10}
        renderType="button"
        divNamePrefix={divNamePrefix}
      />
    </BlockDiv>
  );
}
