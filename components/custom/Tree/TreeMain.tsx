import { FC, useEffect, useState, useContext } from "react";
import TreeItem from "./TreeItem";
import _ from "lodash";
import WidgetWrapperContext from "@/components/widget/WidgetWrapper";
import { prepareIsOpen, renderPositionType } from "@/utils/helper";
import { useRouter } from "next/router";

type PropsType = {
  rawDatasrc?: any;
  widgetnemgooReady?: any;
  data?: any;
  color?: string;
  customClassName?: string;
  customStyle?: any;
  defaultSelectedId?: any;
  indent?: number;
  onClickItem?: any;
  itemStyle?: any;
};

const TreeMain: FC<PropsType> = ({
  color,
  rawDatasrc,
  customClassName,
  data,
  customStyle,
  defaultSelectedId,
  indent,
  itemStyle,
  onClickItem = () => null,
}) => {
  const { config, widgetnemgooReady, positionConfig } =
    useContext(WidgetWrapperContext);
  const router = useRouter();

  // const [selectedId, setSelectedId] = useState<any>(defaultSelectedId);

  const [readyDatasrc, setDatasrc] = useState<any>(
    prepareIsOpen(rawDatasrc, defaultSelectedId, positionConfig)[0] || []
  );

  const toggleIsOpen = (item: any, itemIndex: number) => {
    const tempArray = [...readyDatasrc];
    tempArray[itemIndex] = {
      ...item,
      isOpen: !item?.isOpen,
    };
    setDatasrc([...tempArray]);

    return null;
  };

  return (
    <ul className={`${customClassName} `} style={{ ...customStyle }}>
      {readyDatasrc.map((item: any, index: number) => {
        const selected = item?.id === router.query?.id;
        if (defaultSelectedId === item?.id) {
          // if (item.children) {
          item.isOpen = true;
          // }
        }
        // console.log("router.query?.id :>> ", router.query?.id);
        // console.log("selected :>> ", selected);
        // console.log("dd :>> ", item);
        // console.log("selectedId :>> ", selected);
        return (
          <li
            key={item?.id || index}
            className={`relative  ${
              item.icon || item?.profilephoto ? " pl-10 " : `pr-1`
            } `}>
            {/* {item.icon && (
              <img
                src={`https://dev.veritech.mn/${item.icon}`}
                alt="icon"
                width="18"
                height="14"
                className="absolute left-1 top-2 z-10"
              />
              // <AtomIcon
              //   // item={item.icon}
              //   item={"fa-regular fa-briefcase"}
              //   color="weekly"
              //   customClassName="absolute left-0"
              // />
            )} */}

            <TreeItem
              key={item?.id || index}
              item={item}
              positionConfig={positionConfig}
              color={color}
              customClassName={`  py-2  pr-2 ${itemStyle} ${
                selected ? "text-[#699BF7]" : `text-citizen-blue`
              }`}
              selected={router?.query?.id}
              itemIndex={index}
              // onClickItem={(e: any) => {
              //   onClickItem(e);
              // }}
              onArrowClickItem={(item: any, itemIndex: number) => {
                toggleIsOpen(item, itemIndex);
              }}
            />
            {!_.isEmpty(item?.children) && item?.isOpen && (
              <div className="submenu pl-4">
                <TreeMain
                  // config={config}
                  color={color}
                  rawDatasrc={item?.children}
                  widgetnemgooReady={widgetnemgooReady}
                  customClassName={`ml-${indent}`}
                  defaultSelectedId={defaultSelectedId}
                  indent={indent}
                  onClickItem={onClickItem}
                  itemStyle={itemStyle}
                />
              </div>
            )}
            {/* {item?.children && <></>} */}
          </li>
        );
      })}
    </ul>
  );
};

export default TreeMain;
