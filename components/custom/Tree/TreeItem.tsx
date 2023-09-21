import AtomIcon from "@/components/common/atom/atomIcon";
import AtomTag from "@/components/common/atom/atomTag";
import RenderAtom from "@/components/common/atom/renderAtom";
import { jsonParse, renderPositionType } from "@/utils/helper";
import _ from "lodash";
import { useRouter } from "next/router";
import { FC } from "react";

type PropsTypeItem = {
  item: any;
  positionConfig: any;
  color?: string;
  customClassName?: string;
  selected: any;
  onClickItem?: any;
  onArrowClickItem?: any;
  itemIndex: number;
};

const TreeItem: FC<PropsTypeItem> = ({
  item,
  positionConfig,
  color,
  customClassName,
  selected,
  onClickItem,
  onArrowClickItem,
  itemIndex,
}) => {
  // let linkPath = jsonParse(item?.position1?.positionnemgoo);

  const withChildren = !_.isEmpty(item?.children);
  const router = useRouter();
  const handlerChangeEvent = (e: any, i: any) => {
    e.preventDefault();
    handlerChange(e, item);
  };

  const handlerChange = async (e: any, item: any) => {
    e.preventDefault();
    let linkPath = item?.position1?.positionnemgoo.url;
    router.push({ ...linkPath }, undefined, { scroll: false });
    // console.log("onClickOther", item);
  };

  return (
    <div
      className={`flex w-full justify-between text-gray-800  leading-none cursor-pointer items-center relative ${customClassName}`}
      onClick={(e) => handlerChangeEvent(e, item)}>
      {/* {item.icon && (
        <AtomIcon
          // item={item.icon}
          item={` ${item?.icon}` || item?.profilephoto}
          color="weekly"
          customClassName={`absolute ml-1 fa-light left-0 hover:text-[${color}] ${
            selected ? `text-[${color}]` : "text-[#585858]"
          } `}
        />
      )} */}

      <div className="w-full  gap-2  ">
        <div className="w-[16px] h-[16px]  border absolute -left-7 top-[3px] translate-y-2 ">
          {selected == item?.id ? (
            <span className="fa fa-check text-xs text-center bg-interactive text-white border border-interactive w-[16px] h-[16px]  relative top-0"></span>
          ) : (
            ""
          )}
        </div>
        <RenderAtom
          item={item?.position1}
          renderType="title"
          customClassName={`${
            withChildren ? "font-semibold text-base" : " text-base font-normal"
          } w-full justify-start p-0 font-normal hover:text-interactive ${
            selected == item?.id ? `text-interactive ` : "text-gray-800"
          } ${item?.id}`}
        />
      </div>
      <AtomTag
        item={renderPositionType(item, "position4", positionConfig)}
        type="gray"
        position="inset-y-0 right-0"
        zeroShow={false}
      />
      {withChildren ? (
        <i
          className={`text-xs far pl-16 pr-2 fa-chevron-${
            item.isOpen ? "down" : "right"
          } text-gray-700`}
          onClick={() => {
            onArrowClickItem(item, itemIndex);
          }}
        />
      ) : (
        item?.taskcount ||
        (item?.cnt && (
          <RenderAtom
            item={{ value: item?.taskcount || item?.cnt }}
            renderType="text"
            customClassName={`text-[12px] rounded-[5px] p-1 ${
              selected ? `border-[${color}]` : "border-[#E1E1E1]"
            } hover:text-[${color}] border`}
            customStyle={{ color: selected ? color : "#E1E1E1" }}
          />
        ))
      )}
    </div>
  );
};

export default TreeItem;
