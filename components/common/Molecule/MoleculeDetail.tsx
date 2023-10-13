import RenderAtom from "../Atom/RenderAtom";
import BlockDiv from "../Block/BlockDiv";

export default function MoleculeDetail({
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
    <BlockDiv divNumber={`${divNamePrefix}divMoleculeDetailOuter`}>
      <RenderAtom
        item={item?.image}
        renderType="image"
        customClassName="w-full h-full object-cover object-center"
        divNamePrefix={divNamePrefix}
      />
      <RenderAtom
        item={item?.title}
        renderType="title"
        divNamePrefix={divNamePrefix}
      />
      <RenderAtom
        item={item?.description}
        renderType="text"
        divNamePrefix={divNamePrefix}
      />
      <RenderAtom
        item={item?.button}
        renderType="button"
        divNamePrefix={divNamePrefix}
      />
    </BlockDiv>
  );
}
