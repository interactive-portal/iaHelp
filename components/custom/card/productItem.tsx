import { FC, useState } from "react";
import _ from "lodash";
import { jsonParse } from "@/utils/helper";
import RenderAtom from "@/components/common/atom/renderAtom";
import { useRouter } from "next/router";

type PropsType = {
  options?: any;
  data?: any;
};

const ProductItem: FC<PropsType> = ({ options, data }) => {
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
        className=" h-[250px] bg-white justify-center items-center rounded-xl shadow-xl flex flex-col  text-center hover:bg-opacity-75 cursor-pointer hover:bg-sky-100"
        onClick={(e: any) => onClickOther(e, data)}
      >
        {data?.imgurl ? (
          <span className=" ">
            <RenderAtom
              item={data?.position2 || { value: data?.imgurl }}
              renderType="image"
              customClassName={"w-[120px]"}
              //   onClick={(e: any) => onClickOther(e, data)}
            />
          </span>
        ) : (
          <div className="m-4 ">
            <span className=" w-[100px] h-[100px] flex bg-interactive text-white rounded-xl text-center justify-center items-center">
              <i className="fa-thin fa-notes text-6xl"></i>
            </span>
          </div>
        )}

        <RenderAtom
          item={data?.position1 || { value: data?.title || "title" }}
          renderType="title"
          customClassName={
            "font-normal leading-[18px] px-4 pb-0 pt-1 text-[#2C2C51] cursor-pointer hover:text-interactive mt-3 h-10"
          }
          customProps={{
            truncateRow: 2,
          }}
          onClick={(e: any) => onClickOther(e, data)}
        />
      </div>
    </>
  );
};

export default ProductItem;
