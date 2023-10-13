import RenderAtom from "@/components/common/Atom/RenderAtom";
import BlockDiv from "@/components/common/Block/BlockDiv";
import MoleculeWrapperV3 from "./MoleculeWrapperV3";

export default function MoleculeProductV3({
  atomList,
  moleculeProps,
}: {
  atomList?: {
    id?: any;
    title?: any;
    image?: any;
    description?: any;
    createdDate?: any;
    modifiedDate?: any;
    button?: any;
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
        className="flex flex-row gap-3 items-center"
        divNumber="MoleculeProductV3"
      >
        {atomList?.image && (
          <RenderAtom
            item={atomList?.image}
            renderType="image"
            className="w-12 h-10 object-cover object-center"
          />
        )}

        <BlockDiv className="flex flex-col" divNumber="MoleculeProductV3Right">
          {atomList?.title && (
            <RenderAtom item={atomList?.title} renderType="title" />
          )}

          {atomList?.description && (
            <RenderAtom item={atomList?.description} renderType="text" />
          )}
        </BlockDiv>
      </BlockDiv>
    </MoleculeWrapperV3>
  );
}
