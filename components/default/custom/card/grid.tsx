import { FC, useState } from "react";
import _ from "lodash";
import { jsonParse } from "@/utils/helper";
import CardItem from "./item";
import Link from "next/link";
import { useTranslation } from "next-i18next";

type PropsType = {
  options?: any;
  data?: any;
};

const Grid: FC<PropsType> = ({ options, data }) => {
  const [active, setActive] = useState(0);
  const [filterItem, setFilterItem]: any = useState(
    options?.custom?.defualt || ""
  );
  const selectdata = _.filter(data, {
    categorydesc: filterItem,
  });

  let newArr = _.map(selectdata, (o) => _.pick(o, ["categorydesc"]));

  let grouped = _.keys(_.mapValues(_.groupBy(newArr, "categorydesc")));

  let filtered: any = [];
  grouped.forEach((x) => {
    if (!x.includes("null") && !x.includes("Ажлын байр")) filtered.push(x);
  });

  const onFilterEvent = (e: any, item: any) => {
    e.preventDefault();
    setFilterItem(item);
  };

  let dataSrc: any = grouped.length > 2 ? selectdata : data;
  const moreButton = options?.custom?.moreButton;
  const { t } = useTranslation("translate");
  return (
    <>
      {grouped && (
        <div className="w-full  flex flex-row justify-between items-center  col-span-12 container  px-2 py-4 pb-8">
          {/* <div className=" md:w-[1300px] xs:w-full grid-cols-1"></div>{" "} */}
          <ul className="flex  sm:text-justify xs:text-justify items-center w-max text-[#67748E] space-x-5">
            {grouped.map((item: any, index: any) => {
              return (
                <li
                  key={index}
                  className={`list-item cursor-pointer hover:border-b-2 px-2  hover:border-interactive font-[700] md:text-[18px] sm:text-[16px] xs:text-[14px] py-2 border-b-2 ${
                    active == index
                      ? "border-interactive text-interactive "
                      : "hover:text-interactive"
                  }`}
                  onClick={(e: any) => {
                    onFilterEvent(e, item);
                  }}
                >
                  <span onClick={() => setActive(index)}>
                    {item === "undefined" ? "" : item}
                  </span>
                </li>
              );
            })}
          </ul>
          {moreButton && (
            <Link
              href={"/news/list"}
              className="flex flex-row justify-center items-center gap-3 text-[#2C2C51] hover:text-[#2C2C51]/50"
            >
              <span className="hidden md:block text-lg font-medium">
             {t("WPD_0111")}
              </span>
              <i className="fa-solid fa-arrow-right" />
            </Link>
          )}
        </div>
      )}
      <div className="grid 8xl:grid-cols-4 lg:grid-cols-3 grid-cols-1 gap-6 z-10 8xl:px-0 lg:px-2 xs:px-2">
        {selectdata
          ?.slice(0, options?.custom?.viewPerCount || "3")
          ?.map((item: any, index: number) => {
            return <CardItem key={index} data={item} options={options} />;
          })}
      </div>
    </>
  );
};

export default Grid;
