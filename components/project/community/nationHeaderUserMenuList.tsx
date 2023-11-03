import RenderAtom from "@/components/common/Atom/RenderAtom";
import BlockDiv from "@/components/common/Block/BlockDiv";
import { signOut } from "next-auth/react";
import Link from "next/link";
export default function NationHeaderUserMenuList() {
  // console.log("heartList :>> ", heartList);

  return (
    <BlockDiv customClassName="flex flex-col divide-y divide-gray-200 divide-solid">
      {userMenuList.map((item: any, index: number) => {
        return (
          <Link href={item?.url}>
            <BlockDiv
              key={item?.id || index}
              customClassName="flex flex-row items-center group py-2 gap-x-2"
              divNumber="CozyHeaderUserMenuListItemBlock"
            >
              <RenderAtom
                item={{ value: item?.icon }}
                renderType="icon"
                customClassName={`text-gray-500 group-hover:text-gray-800 w-5`}
              />
              <RenderAtom
                item={{ value: item.title }}
                renderType="text"
                customClassName={
                  "text-[14px] text-[#3C3C3C] group-hover:text-gray-900"
                }
              />
            </BlockDiv>
          </Link>
        );
      })}
      <BlockDiv
        customClassName="flex flex-row items-center group py-2 gap-x-2"
        divNumber="CozyHeaderUserMenuListItemBlock"
      >
        <RenderAtom
          item={{ value: "far fa-sign-out" }}
          renderType="icon"
          customClassName={`text-gray-500 group-hover:text-gray-800 w-5`}
        />
        <span
          className="cursor-pointer text-[#3C3C3C] group-hover:text-gray-900"
          onClick={() => signOut()}
        >
          Гарах
        </span>
      </BlockDiv>
    </BlockDiv>
  );
}

const userMenuList = [
  {
    title: "Миний профайл",
    icon: "far fa-user",
    url: "nation?page=community/profileAbout",
  },
];
