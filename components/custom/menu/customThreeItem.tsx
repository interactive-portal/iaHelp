import RenderAtom from "@/components/common/Atom/RenderAtom";
import AtomIcon from "@/components/common/Atom/atomIcon";
import AtomTag from "@/components/common/Atom/atomTag";
import _ from "lodash";
import { useRouter } from "next/router";
import { FC } from "react";
import { jsonParse, renderPositionType } from "util/helper";

type PropsTypeItem = {
  item: any;
  positionConfig: any;
  color?: string;
  customClassName?: string;
  selected: boolean;
  onClickItem?: any;
  onArrowClickItem?: any;
  itemIndex: number;
  setSelectedid?: any;
};

const CustomThreeItem: FC<PropsTypeItem> = ({
  item,
  positionConfig,
  color,
  customClassName,
  selected,
  onClickItem,
  onArrowClickItem,
  itemIndex,
  setSelectedid,
}) => {
  // console.log("item", item);
  let linkPath = jsonParse(positionConfig?.position1?.widgetnemgooReady);

  const withChildren = !_.isEmpty(item?.children);
  const router = useRouter();
  const handlerChangeEvent = (e: any, i: any) => {
    setSelectedid(i?.id);
    let linkPaths = item?.position1?.positionnemgoo.url;
    let parentid = router.query.lparentid;
    // console.log("router :>> ", router.query.filterid);
    const path = {
      pathname: "/lessons/content",
      query: {
        filterid: i.id,
        lparentid: parentid,
      },
    };
    router.push({ ...path }, undefined, { shallow: false });
    // console.log("path :>> ", path);
    // console.log("s :>> ", i);
    // if (withChildren) {
    //   onArrowClickItem(item, itemIndex);
    // } else {
    //   // onClickItem(item);
    // }
  };

  return (
    <div
      className={`flex w-full justify-between text-gray-800  leading-none cursor-pointer items-center relative hover:text-blue-400  ${customClassName}`}
    >
      {item.icon && (
        <AtomIcon
          // item={item.icon}
          item={` ${item?.icon}` || item?.profilephoto}
          color="weekly"
          customClassName={`absolute ml-1 fa-light left-0 hover:text-[#699BF7] ${
            selected ? `text-[#699BF7]` : "text-[#585858]"
          } `}
        />
      )}
      <div
        className={`${
          selected ? "text-[#699BF7]" : "text-[#585858]"
        } hover:text-[#699BF7] w-full`}
        // onClick={() => onArrowClickItem(item, itemIndex)}
        onClick={(e) => handlerChangeEvent(e, item)}
      >
        {/* <RenderAtom
          item={item?.position1}
          renderType="title"
          customClassName={`text-sm w-full justify-start p-0 font-normal hover:text-[${color}] ${
            item.icon && "pl-3"
          } ${selected ? `text-[${color}] font-semibold` : "text-gray-800"}`}
        /> */}
        {item.name}
      </div>
      <AtomTag
        item={renderPositionType(item, "position4", positionConfig)}
        type="gray"
        position="inset-y-0 right-0"
        zeroShow={false}
      />
      {withChildren ? (
        <AtomIcon
          item={`far fa-chevron-${
            item.isOpen ? "down" : "right"
          } text-gray-700 relative z-50  w-10 text-right`}
          color="weekly"
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

export default CustomThreeItem;