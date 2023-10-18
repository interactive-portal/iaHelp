import { FC, useEffect, useState, useContext } from "react";
// import TreeItem from "./TreeItem";
// import { renderPositionType, prepareIsOpen } from "util/helper";
import _ from "lodash";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import CustomThreeItem from "./customThreeItem";

type PropsType = {
  rawDatasrc?: any;
  widgetnemgooReady?: any;
  color?: string;
  customClassName?: string;
  customStyle?: any;
  defaultSelectedId?: any;
  indent?: number;
  onClickItem?: any;
  itemStyle?: any;
};

const CustomMenu: FC<PropsType> = ({
  color,
  rawDatasrc,
  customClassName,
  customStyle,
  defaultSelectedId,
  indent,
  itemStyle,
  onClickItem = () => null,
}) => {
  const {
    config,
    widgetnemgooReady,
    positionConfig,
    metaConfig,
    gridJsonConfig,
    pathConfig,
  } = useContext(WidgetWrapperContext);

  // console.log(defaultSelectedId, "asdasdasd");
  if (_.isEmpty(rawDatasrc)) return null;

  const [selectedId, setSelectedId] = useState<any>(defaultSelectedId);

  function prepareIsOpen(
    readyDatasrc: any,
    selectedId: any,
    selectedIsOpen = false
  ) {
    let newDatasrc = [...readyDatasrc];
    let found = false;
    readyDatasrc.map((item: any, index: number) => {
      const selected = selectedId === item?.id;

      if (selected) {
        newDatasrc[index].isOpen = selectedIsOpen; //selected node нь default-оор онгойх эсэх
        found = true;
      } else {
        newDatasrc[index].isOpen = false;
      }

      if (item?.children) {
        let sss = prepareIsOpen(item?.children, selectedId, selectedIsOpen);
        if (sss[1]) {
          newDatasrc[index].isOpen = true;
          found = true;
        }
      }
    });

    return [newDatasrc, found];
  }
  const [readyDatasrc, setDatasrc] = useState<any>(
    prepareIsOpen(rawDatasrc, selectedId)[0] || []
  );

  const toggleIsOpen = (item: any, itemIndex: number) => {
    // setSelectedId(item?.id);
    const tempArray = [...readyDatasrc];
    tempArray[itemIndex] = {
      ...item,
      isOpen: !item?.isOpen,
    };
    setDatasrc([...tempArray]);

    return null;
  };

  // console.log("selectedID", selectedId);

  // console.log("datasrc TreeeMneiu", readyDatasrc);
  // console.log("selceted", selectedId);
  useEffect(() => {
    setDatasrc(prepareIsOpen(rawDatasrc, selectedId)[0] || []);
  }, [selectedId]);

  return (
    <ul className={`${customClassName} `} style={{ ...customStyle }}>
      {readyDatasrc.map((item: any, index: number) => {
        // const selected = selectedId === item?.id;

        if (selectedId === item?.id) {
          if (item.children) {
            item.isOpen = !item.isOpen;
          }
        }
        return (
          <li
            key={item?.id || index}
            className={`relative ${
              item.icon || item?.profilephoto ? " pl-0 " : `pr-2`
            } `}
          >
            <CustomThreeItem
              key={item?.id || index}
              item={item}
              positionConfig={positionConfig}
              color={color}
              customClassName={` hover:bg-gray-100 py-2 pl-4 pr-2 ${itemStyle} ${
                selectedId == item?.id ? "text-[#699BF7]" : `text-citizen-blue`
              }`}
              selected={selectedId === item?.id}
              itemIndex={index}
              setSelectedid={setSelectedId}
              // onClickItem={(e: any) => {
              //   onClickItem(e);
              // }}
              onArrowClickItem={(item: any, itemIndex: number) => {
                toggleIsOpen(item, itemIndex);
              }}
            />
            {!_.isEmpty(item?.children) && item?.isOpen && (
              <span className="submenu">
                <CustomMenu
                  // config={config}
                  color={color}
                  rawDatasrc={item?.children}
                  widgetnemgooReady={widgetnemgooReady}
                  customClassName={`ml-${indent}`}
                  defaultSelectedId={selectedId}
                  indent={indent}
                  onClickItem={onClickItem}
                  itemStyle={itemStyle}
                />
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default CustomMenu;
