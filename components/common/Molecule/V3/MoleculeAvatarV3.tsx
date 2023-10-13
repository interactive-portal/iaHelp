import RenderAtom from "@/components/common/Atom/RenderAtom";
import BlockDiv from "@/components/common/Block/BlockDiv";
import MoleculeWrapperV3 from "./MoleculeWrapperV3";

export default function MoleculeAvatarV3({
  atomList,
  moleculeProps,
}: {
  atomList?: {
    id?: any;
    title?: any;
    image?: any;
    description?: any;
  };
  moleculeProps?: {
    outsideClassName?: string;
    isMoleculeWorking?: boolean;
    divNamePrefix?: string;
    tooltip?: any;
    children?: any;
  };
}) {
  return (
    <MoleculeWrapperV3 {...moleculeProps}>
      <BlockDiv
        className="flex flex-row gap-3"
        divNumber="CozyCommentItemBlockUserBlock"
      >
        <BlockDiv className="" divNumber="CozyCommentItemBlockUserBlockLeft">
          <RenderAtom
            item={
              atomList?.image || {
                value:
                  "https://res.cloudinary.com/dzih5nqhg/image/upload/v1687766664/cozy/V3/3465356-200_w8z4hz.png",
              }
            }
            renderType="image"
            className="w-10 h-10 rounded-full object-cover object-center"
          />
        </BlockDiv>

        <BlockDiv
          className="flex flex-col"
          divNumber="CozyCommentItemBlockUserBlockRight"
        >
          <RenderAtom
            item={atomList?.title || { value: "Үл танигдах хүн" }}
            renderType="title"
            className=""
          />
          <RenderAtom
            item={atomList?.description || { value: "Desc тодорхойгүй" }}
            renderType="text"
            className=""
          />
        </BlockDiv>
      </BlockDiv>
    </MoleculeWrapperV3>
  );
}
