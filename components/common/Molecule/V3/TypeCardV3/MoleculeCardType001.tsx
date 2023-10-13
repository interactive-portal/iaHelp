import RenderAtom from "@/components/common/Atom/RenderAtom";
import BlockDiv from "@/components/common/Block/BlockDiv";

export default function MoleculeCardType001({ item }: { item?: any }) {
  return (
    <BlockDiv
      className="flex flex-col gap-3 items-center justify-center"
      divNumber="MoleculeCardType001Block"
    >
      <RenderAtom
        item={{
          value:
            item?.image ||
            item?.mainimage ||
            item?.profilephoto ||
            item?.objectimage ||
            "https://res.cloudinary.com/dzih5nqhg/image/upload/v1687861957/cozy/V3/product_jh6byq.png",
          ...item?.position2,
        }}
        renderType="image"
        className="w-auto max-h-[40px] object-cover object-center"
        divNamePrefix="MoleculeCardType001"
      />
      <RenderAtom
        item={{
          ...(item?.position1 || { value: item?.title || item?.name }),
        }}
        renderType="title"
        divNamePrefix="MoleculeCardType001"
      />
      <RenderAtom
        item={{
          ...(item?.position3 || { value: item?.description || item?.text }),
        }}
        renderType="text"
        divNamePrefix="MoleculeCardType001"
      />
    </BlockDiv>
  );
}
