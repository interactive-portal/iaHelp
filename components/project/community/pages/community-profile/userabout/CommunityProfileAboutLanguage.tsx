import RenderAtom from "@/components/common/Atom/RenderAtom";
import BlockDiv from "@/components/common/Block/BlockDiv";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
// import RenderMolecule from "@components/common/Molecule/RenderMolecule";
import { useContext } from "react";
import _ from "lodash";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

export default function CommunityProfileAboutLanguage() {
  const { readyDatasrc } = useContext(WidgetWrapperContext);
  const staticItem1 = readyDatasrc?.[0];
  const languageList = _.values(staticItem1?.languageinfo);

  return (
    <BlockDiv customClassName="" divNumber="CommunityProfileAboutLanguageOuter">
      <BlockDiv
        customClassName=""
        divNumber="CommunityProfileAboutLanguageInner"
      >
        {/* <RenderMolecule
          renderType="tab"
          customProps={{
            type: "default",
            divNamePrefix: "profiletab",
            activeTab: 0,
            normalTabClassName: "text-[#67748E] font-normal",
            activeTabClassName:
              "font-bold text-[#2F81E5] border-b-2 border-solid border-[#2F81E5]",
          }}
          item={{
            item: [
              ...languageList.map((item: any, index: number) => {
                return {
                  title: item?.languagename,
                  content: (
                    <LanguageBlock key={item?.id || index} item={item} />
                  ),
                };
              }),
            ],
          }}
        /> */}
      </BlockDiv>
    </BlockDiv>
  );
}

const LanguageBlock = ({ item }: { item: any }) => {
  const skillList = [
    {
      title: "Ярих",
      data: [
        {
          name: "A1",
          value: 100 - Number(item?.speakskill),
          backgroundColor: "#F3F4F6",
        },
        {
          name: "A2",
          value: Number(item?.speakskill),
          backgroundColor: item?.speakskillcolor,
        },
      ],
    },
    {
      title: "Бичих",
      data: [
        {
          name: "A1",
          value: 100 - Number(item?.writeskill),
          backgroundColor: "#F3F4F6",
        },
        {
          name: "A2",
          value: Number(item?.writeskill),
          backgroundColor: item?.writeskillcolor,
        },
      ],
    },
    {
      title: "Унших",
      data: [
        {
          name: "A1",
          value: 100 - Number(item?.readskill),
          backgroundColor: "#F3F4F6",
        },
        {
          name: "A2",
          value: Number(item?.readskill),
          backgroundColor: item?.readskillcolor,
        },
      ],
    },
    {
      title: "Сонсох",
      data: [
        {
          name: "A1",
          value: 100 - Number(item?.listenskill),
          backgroundColor: "#F3F4F6",
        },
        {
          name: "A2",
          value: Number(item?.listenskill),
          backgroundColor: item?.listenskillcolor,
        },
      ],
    },
  ];

  return (
    <BlockDiv customClassName="w-full" divNumber="">
      <BlockDiv
        customClassName="flex flex-row gap-7 items-center"
        divNumber="CommunityProfileAboutLanguageBlock1"
      >
        {skillList.map((item: any, index: number) => {
          return (
            <BlockDiv
              key={item?.id || index}
              customClassName="w-[130px] h-[130px] relative"
              divNumber="CommunityProfileAboutLanguageItem"
            >
              <BlockDiv
                customClassName="absolute inset-0 w-full h-full flex flex-col items-center justify-center"
                divNumber=""
              >
                <RenderAtom
                  item={{ value: String(item?.data?.[1]?.value || "") + "%" }}
                  renderType="title"
                  customClassName="font-bold text-lg leading-[21px] text-center text-[#585858]"
                />
                <RenderAtom
                  item={{ value: item?.title }}
                  renderType="title"
                  customClassName="font-normal text-xs leading-[14px] text-[#67748E] px-4"
                />
              </BlockDiv>

              <MyPieChart data={item?.data} />
            </BlockDiv>
          );
        })}
      </BlockDiv>
    </BlockDiv>
  );
};

const MyPieChart = ({ data }: { data: Array<any> }) => {
  return (
    <ResponsiveContainer className="">
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius={53}
          outerRadius={63}
          cornerRadius={40}
          paddingAngle={0}
          startAngle={90}
          endAngle={360 + 90}
        >
          {data.map((entry: any, index: number) => (
            <Cell key={`cell-${index}`} fill={data?.[index]?.backgroundColor} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};
