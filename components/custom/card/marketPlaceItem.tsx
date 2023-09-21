import { FC, useState } from "react";
import _ from "lodash";
import { jsonParse } from "@/utils/helper";
import RenderAtom from "@/components/common/atom/renderAtom";
import { useRouter } from "next/router";
import { Rate } from "antd";

type PropsType = {
  options?: any;
  data?: any;
};

const MarketPlaceItem: FC<PropsType> = ({ options, data }) => {
  let newArr = _.map(data, (o) => _.pick(o, ["categorydesc"]));
  let grouped = _.keys(_.mapValues(_.groupBy(newArr, "categorydesc")));
  const [active, setActive] = useState(0);
  const [filterItem, setFilterItem]: any = useState();

  const onFilterEvent = (e: any, item: any) => {
    e.preventDefault();
    setFilterItem(item);
  };

  let categoryPath = "/product/detail?id=";
  // console.log("object :>> ", data);
  if (data?.topcategoryid == "16861245455809") {
    categoryPath = "/project/detail?id=";
  } else if (data?.topcategoryid == "16861250821889") {
    categoryPath = "/service/detail?id=";
  }

  const router = useRouter();

  const onClickOther = async (e: any, item: any) => {
    e.preventDefault();
    const href = categoryPath + item?.id;
    router.push(href, undefined, { shallow: false });
  };

  return (
    <>
      <div
        className=" h-[330px] bg-white  rounded-[10px] shadow-xl flex flex-col  hover:bg-opacity-75 cursor-pointer hover:bg-sky-100"
        onClick={(e: any) => onClickOther(e, data)}
      >
        {data?.imgurl ? (
          <span className=" ">
            <RenderAtom
              item={data?.position2 || { value: data?.imgurl }}
              renderType="image"
              customClassName={"w-full h-[150px] object-cover rounded-[10px]"}
            />
          </span>
        ) : (
          <div className="m-4 ">
            <span className=" w-[100px] h-[100px] flex bg-interactive text-white rounded-xl text-center justify-center items-center">
              <i className="fa-thin fa-notes text-6xl" />
            </span>
          </div>
        )}
        <div className="flex flex-col p-2.5 space-y-2.5">
          <RenderAtom
            item={data?.position1 || { value: data?.title || "title" }}
            renderType="title"
            customClassName={
              "font-normal text-[#67748E] text-[12px] line-clamp-1"
            }
          />
          <RenderAtom
            item={data?.position1 || { value: data?.title || "title" }}
            renderType="title"
            customClassName={
              "font-medium leading-[18px] text-[#3C3C3C] text-base cursor-pointer hover:text-interactive"
            }
            customProps={{
              truncateRow: 2,
            }}
            onClick={(e: any) => onClickOther(e, data)}
          />
          <RenderAtom
            item={data?.position1 || { value: data?.title || "title" }}
            renderType="title"
            customClassName={
              "font-normal text-[#67748E] text-sm line-clamp-3 leading-[18px]"
            }
          />
          <Rate
            value={4}
            allowHalf
            disabled
            style={{
              fontSize: "14px",
              color: "#FFBB00",
              fontWeight: "900",
              margin: "0px 0px",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default MarketPlaceItem;
