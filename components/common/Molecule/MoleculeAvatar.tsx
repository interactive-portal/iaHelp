import RenderAtom from "../Atom/RenderAtom";
import BlockDiv from "../Block/BlockDiv";

export default function MoleculeAvatar({
  atomList,
}: {
  atomList?: {
    id: string | number;
    title: string;
    image: string;
    description: string;
    createdDate: string;
    modifiedDate: string;
    button: string;
  };
}) {
  return (
    <BlockDiv
      customClassName="flex flex-row gap-3"
      divNumber="CozyCommentItemBlockUserBlock"
    >
      <BlockDiv
        customClassName=""
        divNumber="CozyCommentItemBlockUserBlockLeft"
      >
        <RenderAtom
          item={
            atomList?.image || {
              value:
                "https://res.cloudinary.com/dzih5nqhg/image/upload/v1687766664/cozy/V3/3465356-200_w8z4hz.png",
            }
          }
          renderType="image"
          customClassName="w-10 h-10 rounded-full"
        />
      </BlockDiv>

      <BlockDiv
        customClassName="flex flex-col"
        divNumber="CozyCommentItemBlockUserBlockRight"
      >
        <RenderAtom
          item={atomList?.title || { value: "Үл танигдах хүн" }}
          renderType="title"
          customClassName=""
        />
        <RenderAtom
          item={atomList?.description || { value: "Desc тодорхойгүй" }}
          renderType="text"
          customClassName=""
        />
      </BlockDiv>
    </BlockDiv>
  );
}
