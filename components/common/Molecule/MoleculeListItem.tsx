import RenderAtom from "../Atom/RenderAtom";
import BlockDiv from "../Block/BlockDiv";

export default function MoleculeListItem({
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
    <BlockDiv divNumber="divMoleculeListItemOuter">
      <BlockDiv
        customClassName="w-full h-48 grid grid-cols-12 gap-6"
        divNumber={`${divNamePrefix}divMoleculeListItemInside`}
      >
        <BlockDiv
          customClassName="w-full h-full col-span-4"
          divNumber={`${divNamePrefix}divMoleculeListItemLeft`}
        >
          <RenderAtom
            item={item?.image}
            renderType="image"
            customClassName="w-full h-full object-cover object-center"
            divNamePrefix={divNamePrefix}
          />
        </BlockDiv>
        <BlockDiv
          customClassName="w-full h-full col-span-6"
          divNumber={`${divNamePrefix}divMoleculeListItemCenter`}
        >
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
        </BlockDiv>

        <BlockDiv
          customClassName="w-full h-full col-span-2"
          divNumber={`${divNamePrefix}divMoleculeListItemRight`}
        >
          <RenderAtom
            item={item?.button}
            renderType="button"
            divNamePrefix={divNamePrefix}
          />
        </BlockDiv>
      </BlockDiv>
    </BlockDiv>
  );
}
