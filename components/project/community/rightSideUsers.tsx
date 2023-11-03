import RenderAtom from "@/components/common/Atom/RenderAtom";
import BlockDiv from "@/components/common/Block/BlockDiv";

export default function RightSideUsers() {
  return (
    <BlockDiv customClassName="flex flex-col right-0 min-h-screen  w-[85px] bg-[#E8EBF0] items-center p-[15px] space-y-[12px]">
      <BlockDiv customClassName="rounded-[10px] bg-[#2F81E5] w-[40px] h-[40px] text-center justify-center flex items-center">
        <RenderAtom
          item={{ value: "fa-regular fa-search" }}
          renderType={"icon"}
          customClassName="text-[16px] text-white"
        />
      </BlockDiv>
      <RightCard />
      <RightCard />
      <RightCard />
      <RightCard />
      <RightCard />
      <RightCard />
      <RightCard />
      <RightCard />
      <RightCard />
    </BlockDiv>
  );
}
const RightCard = () => {
  return (
    <BlockDiv customClassName="rounded-full w-[40px] h-[40px] text-center justify-center flex items-center relative">
      <RenderAtom
        item={{
          value:
            "https://res.cloudinary.com/dzih5nqhg/image/upload/v1675668141/Community/Frame_36709_2_jhak4q.png",
        }}
        renderType={"image"}
        customClassName="rounded-full w-full h-full object-cover"
      />
      <BlockDiv customClassName="h-[12px] w-[12px] bg-[#3BD760] rounded-full absolute left-0 bottom-0 border-2 border-white" />
      <BlockDiv customClassName="rounded-full absolute -right-1 -top-2 text-center items-center justify-center">
        <RenderAtom
          renderType="title"
          item={{ value: "7" }}
          customClassName="rounded-[10px] text-white text-[8px] leading-0 bg-[#FF524B] px-1 py-0 font-normal"
        />
      </BlockDiv>
    </BlockDiv>
  );
};
