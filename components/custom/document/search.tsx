import BlockDiv from "@/components/common/block/blockDiv";
import WidgetWrapperContext from "@/components/widget/WidgetWrapper";
import fetchJson, { listToTree, prepareIsOpen } from "@/utils/helper";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import TreeMain from "../Tree/TreeMain";
import _ from "lodash";
import Link from "next/link";
import { Empty } from "antd";
import useSWR from "swr";

export default function Search() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState<any>();
  const metadataId = "1686137879081317";

  const [readyDatasrc, setReadyDatasrc] = useState<any>();

  useEffect(() => {
    // const criteria = {
    //   filtercategoryid: router.query?.id || dvalue,
    // };
    const fetchData = async () => {
      const data = await fetchJson(`/api/get-data?metaid=${metadataId}`);
      setReadyDatasrc(data.result);
    };
    if (!readyDatasrc) fetchData();
  }, []);

  const matchingValuesData = readyDatasrc?.filter(function (item: any) {
    return item?.title?.toLowerCase().includes(searchValue?.toLowerCase());
  });

  const resultList = matchingValuesData?.map((item: any, index: number) => {
    let categoryPath = "/product/detail";
    // console.log("object :>> ", data);
    if (item?.topcategoryid == "16861245455809") {
      categoryPath = "/project/detail";
    } else if (item?.topcategoryid == "16861250821889") {
      categoryPath = "/service/detail";
    }

    const url = {
      pathname: categoryPath,
      query: {
        id: item.id,
      },
    };
    return (
      <Link href={url} key={index}>
        <li
          key={item?.id || index}
          className="p-1 bg-gray-100 my-1 cursor-pointer hover:bg-gray-200 ">
          {item.title}
        </li>
      </Link>
    );
  });

  return (
    <>
      <span className="relative">
        <>
          <div className="w-full  shadow-xl bg-white border-gray-300 rounded-lg mb-4">
            <div className="relative px-2">
              <input
                className="w-full   py-2 px-4 text-[14px]   focus:ring-0 focus:ring-gray-300 focus:outline-none border-gray-300 focus:border-gray-300 text-[#585858] opacity-60"
                type="text"
                placeholder="Хайх"
                // value="val"
                onChange={(event) => setSearchValue(event.target.value)}
              />
              <i className="fa-sharp fa-light fa-magnifying-glass  absolute text-base top-2 right-5 cursor-pointer text-[#585858]"></i>
            </div>
          </div>
        </>
        {searchValue?.length > 0 && (
          <div className="absolute top-5   max-h-[300px] w-full rounded-lg bg-white mt-6 overflow-hidden z-50 scrollbar-thumb-gray-500 scrollbar-track-gray-100 scrollbar-thin hover:scrollbar-thumb-gray-700 scrollbar-thumb-rounded-full shadow py-4">
            <ul className="z-20 px-2 ">
              {resultList?.length > 0 ? (
                resultList
              ) : (
                <Empty description={"Хайлтын илэрц олдсонгүй"} />
              )}
            </ul>
          </div>
        )}
      </span>
    </>
  );
}
