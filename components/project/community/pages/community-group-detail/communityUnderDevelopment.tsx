import RenderAtom from "@/components/common/Atom/RenderAtom";
import BlockDiv from "@/components/common/Block/BlockDiv";

export default function CommunityUnderDevelopment() {
  return (
    <BlockDiv customClassName="w-full rounded-[10px] bg-white flex flex-col justify-center items-center mt-[110px] p-5 space-y-[15px]">
      <RenderAtom
        item={{ value: "Уучлаарай" }}
        renderType="title"
        customClassName={"text-[#0165E0] text-[18px]"}
      />
      <RenderAtom
        item={{ value: "Хөгжүүлэлт хийгдэж байна." }}
        renderType="title"
        customClassName={"text-[#585858] text-[18px]"}
      />
      <RenderAtom
        item={{
          value:
            "https://res.cloudinary.com/dzih5nqhg/image/upload/v1680253002/Community/other/7c917130d151129f4d2d5fd4fffa8412_ieevk2.gif",
        }}
        renderType="image"
        customClassName={"w-[700px] h-auto"}
      />
    </BlockDiv>
  );
}
