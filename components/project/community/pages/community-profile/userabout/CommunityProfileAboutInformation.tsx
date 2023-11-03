import React from "react";
import { useContext } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import BlockDiv from "@/components/common/Block/BlockDiv";
import RenderAtom from "@/components/common/Atom/RenderAtom";

export default function CommunityProfileAboutInformation() {
  const { readyDatasrc } = useContext(WidgetWrapperContext);
  const { data: session, status } = useSession();
  const router = useRouter();

  // if (!session) {
  //   router.push(`https://customer.veritech.mn/login`);
  // }

  // about: "Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality). Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)";
  // abouticon: "fal fa-address-card";
  // age: "34";
  // ageicon: "";
  // custuserid: "16751562015989";
  // email: "uugan@interactive.mn";
  // emailicon: "fal fa-envelope";
  // firstname: "Батбаяр";
  // firstnameicon: "fal fa-user";
  // gender: "Эрэгтэй";
  // gendericon: "fal fa-venus-mars";
  // lastname: "Галсан";
  // lastnameicon: "fal fa-user";
  // maritalstatus: "Гэрлэсэн";
  // maritalstatusicon: "fal fa-rings-wedding";
  // personid: "16719552163069";
  // phone: "";
  // phoneicon: "fal fa-phone";
  // social: "Fb: Batbayargalsan";
  // socialicon: "fal fa-globe";

  const staticItem1 = readyDatasrc[0];

  const infoList = [
    {
      title: "Овог:",
      item: staticItem1?.lastname,
      icon: staticItem1?.lastnameicon,
    },
    {
      title: "Нэр:",
      item: staticItem1?.firstname,
      icon: staticItem1?.firstnameicon,
    },
    {
      title: "Нас:",
      item: staticItem1?.age,
      icon: staticItem1?.ageicon,
    },
    {
      title: "Хүйс:",
      item: staticItem1?.gender,
      icon: staticItem1?.gendericon,
    },
    {
      title: "Гэр бүл:",
      item: staticItem1?.maritalstatus,
      icon: staticItem1?.maritalstatusicon,
    },
    {
      title: "Social:",
      item: staticItem1?.social,
      icon: staticItem1?.socialicon,
    },
    {
      title: "Утас:",
      item: staticItem1?.phone,
      icon: staticItem1?.phoneicon,
    },
    {
      title: "Имэйл:",
      item: staticItem1?.email,
      icon: staticItem1?.emailicon,
    },
  ];

  return (
    <BlockDiv
      customClassName=""
      divNumber="CommunityProfileAboutInformationOuter"
    >
      <BlockDiv
        customClassName="flex flex-col gap-5"
        divNumber="CommunityProfileAboutInformationInner"
      >
        {/* Edit Icon */}
        <RenderAtom
          renderType="icon"
          item={{ value: "fa-regular fa-pen" }}
          customClassName="text-[#A0A0A0] active:text-[#0165E0] w-7 h-7 rounded-full flex items-center justify-center shadow-md active:shadow-xl"
        />

        {/* Том текст */}
        <RenderAtom
          renderType="text"
          item={
            staticItem1?.position3 || {
              value: staticItem1?.description || staticItem1?.about,
            }
          }
          customClassName="tracking-tight text-[#67748E] leading-[21px] w-full"
        />

        {/* Spec Detail */}
        <BlockDiv
          customClassName="grid grid-cols-2 gap-y-5"
          divNumber="CommunityProfileAboutInformationSpecBlock"
        >
          {infoList.map((item: any, index: number) => {
            return (
              <BlockDiv
                customClassName="flex flex-row gap-4"
                divNumber="CommunityProfileAboutInformationSpecBlockItem"
              >
                <RenderAtom
                  renderType="icon"
                  item={{ value: item?.icon }}
                  customClassName="w-[40px] h-[40px] text-[#2F81E5] flex justify-center items-center bg-[#E1EBFD] rounded-full"
                />
                <BlockDiv
                  key={item?.id || index}
                  customClassName="flex flex-col gap-2"
                  divNumber="CommunityProfileAboutInformationSpecBlockItemRight"
                >
                  <RenderAtom
                    renderType="text"
                    item={{ value: item?.title }}
                    customClassName="{ProfileCardSpec1}"
                  />
                  <RenderAtom
                    renderType="title"
                    item={{ value: item?.item }}
                    customClassName="{ProfileCardSpec2}"
                  />
                </BlockDiv>
              </BlockDiv>
            );
          })}
        </BlockDiv>
      </BlockDiv>
    </BlockDiv>
  );
}
