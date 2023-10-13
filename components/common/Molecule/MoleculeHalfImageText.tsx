import RenderAtom from "../Atom/RenderAtom";
import BlockDiv from "../Block/BlockDiv";

export default function MoleculeHalfImageText({
  item,
  divNamePrefix = "",
}: {
  item?: any;
  divNamePrefix?: string;
}) {
  return (
    <BlockDiv
      customClassName="w-full h-full relative flex"
      divNumber={`${divNamePrefix}divMoleculeHalfImageTextOuter`}
    >
      <BlockDiv
        customClassName={`w-1/2 order-1 ${item?.leftclass?.value || ""}`}
        divNumber={`${divNamePrefix}divposition25`}
      >
        <RenderAtom
          item={item?.image}
          renderType="image"
          customClassName="w-full h-full object-cover object-center inset-0"
          divNamePrefix={divNamePrefix}
        />
      </BlockDiv>
      <BlockDiv
        customClassName={`w-1/2 order-2 ${item?.rightclass?.value || ""}`}
        divNumber={`${divNamePrefix}divposition27`}
      >
        <RenderAtom
          item={item?.title}
          renderType="title"
          customClassName="text-center text-2xl"
          divNamePrefix={divNamePrefix}
        />
        <RenderAtom
          item={item?.description}
          renderType="text"
          customClassName="text-center text-gray-700"
          divNamePrefix={divNamePrefix}
        />
        <RenderAtom
          item={item?.button}
          renderType="button"
          divNamePrefix={divNamePrefix}
        />
      </BlockDiv>
    </BlockDiv>
  );
}
