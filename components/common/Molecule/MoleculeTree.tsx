import _ from "lodash";
import { useState } from "react";

import RenderAtom from "../Atom/RenderAtom";
import BlockDiv from "../Block/BlockDiv";

export default function MoleculeTree({
  item,
  selectedKeys,
  defaultSelectedId,
  type = "separate",
  showCheck = false,
  customClassName = "",
  customStyle = {},
  positionConfig,
  divNamePrefix = "",
}: {
  item?: any;
  selectedKeys?: Array<string | number>;
  defaultSelectedId?: string | number;
  type?: "separate" | "solid";
  showCheck?: boolean;
  customClassName?: string;
  customStyle?: object;
  positionConfig?: any;
  divNamePrefix?: string;
}) {
  const [readyDatasrc, setDatasrc] = useState<any>(item);

  const toggleIsOpen = (item: any, itemIndex: number) => {
    let tempArray = [...readyDatasrc];
    tempArray[itemIndex] = { ...item, isOpen: true };
    setDatasrc([...tempArray]);
    return null;
  };

  return (
    <BlockDiv customClassName="" divNumber="MoleculeTreeOuter">
      <BlockDiv customClassName="" divNumber="MoleculeTreeInner">
        {readyDatasrc.map((item: any, index: number) => {
          if (!_.isEmpty(item.cnt) && item.isOpen) {
            return (
              <BlockDiv
                customClassName="ml-4 my-1"
                key={item?.id || index}
                divNumber="MoleculeTreeItemBlock"
              >
                <TreeItem
                  item={item}
                  toggleIsOpen={toggleIsOpen}
                  index={index}
                  defaultSelectedId={defaultSelectedId}
                  arrow={{ value: "far fa-chevron-down" }}
                  type={type}
                  showCheck={showCheck}
                />

                <MoleculeTree
                  item={item.children}
                  selectedKeys={selectedKeys}
                  defaultSelectedId={defaultSelectedId}
                  customClassName={customClassName}
                  customStyle={customStyle}
                  positionConfig={positionConfig}
                  divNamePrefix={divNamePrefix}
                  type={type}
                  showCheck={showCheck}
                />
              </BlockDiv>
            );
          }

          if (!_.isEmpty(item.cnt) && !item.isOpen) {
            return (
              <BlockDiv
                customClassName="ml-4 my-1"
                key={item?.id || index}
                divNumber="MoleculeTreeItemBlock"
              >
                <TreeItem
                  item={item}
                  toggleIsOpen={toggleIsOpen}
                  index={index}
                  defaultSelectedId={defaultSelectedId}
                  type={type}
                  arrow={{ value: "far fa-chevron-right" }}
                  showCheck={showCheck}
                />
              </BlockDiv>
            );
          }

          return (
            <BlockDiv
              customClassName="ml-4 my-1 mr-4"
              key={item?.id || index}
              divNumber="MoleculeTreeItemTitle"
            >
              <ItemTitle
                item={item}
                defaultSelectedId={defaultSelectedId}
                showCheck={showCheck}
              />
            </BlockDiv>
          );
        })}
      </BlockDiv>
    </BlockDiv>
  );
}

/* ------------------------------------------------------ */
/*                        TREEITEM                        */
/* ------------------------------------------------------ */

const TreeItem = ({
  item,
  toggleIsOpen,
  index,
  defaultSelectedId,
  arrow,
  type,
  showCheck,
}: {
  item?: any;
  toggleIsOpen?: any;
  index?: number;
  defaultSelectedId?: number | string;
  arrow?: any;
  type?: any;
  showCheck?: boolean;
}) => {
  switch (type) {
    case "solid":
      return (
        <BlockDiv customClassName="" divNumber="MoleculeTreeItemBlock2">
          <ItemTitle
            item={item}
            defaultSelectedId={defaultSelectedId}
            customClassName="relative w-full"
            showCheck={showCheck}
          >
            <RenderAtom
              item={{ value: arrow?.value }}
              renderType="icon"
              customClassName="inline-block absolute right-0"
            />
          </ItemTitle>
        </BlockDiv>
      );

    case "separate":
      return (
        <BlockDiv
          customClassName="flex flex-row items-center justify-between gap-x-2"
          divNumber="MoleculeTreeItemBlock3"
        >
          <ItemTitle
            item={item}
            defaultSelectedId={defaultSelectedId}
            showCheck={showCheck}
          />
          <RenderAtom
            item={{ value: arrow?.value }}
            renderType="icon"
            customClassName="inline-block"
            onClick={() => toggleIsOpen(item, index)}
          />
        </BlockDiv>
      );
  }

  return null;
};

/* ------------------------------------------------------ */
/*                        ITEMTITLE                       */
/* ------------------------------------------------------ */

const ItemTitle = ({
  item,
  defaultSelectedId,
  customClassName,
  children,
  showCheck,
}: {
  item?: any;
  defaultSelectedId?: string | number;
  customClassName?: string;
  children?: any;
  showCheck?: boolean;
}) => {
  const isChecked = defaultSelectedId === item.id;
  return (
    <BlockDiv
      customClassName={`inline-block ${customClassName} flex flex-row gap-3`}
      divNumber="TreeItemBlock"
    >
      {showCheck &&
        (isChecked ? (
          <RenderAtom
            item={{ value: "fas fa-square-check" }}
            renderType="icon"
            customClassName={`text-{colorPrimary} text-[20px]`}
          />
        ) : (
          <RenderAtom
            item={{ value: "far fa-square" }}
            renderType="icon"
            customClassName={`text-gray-200 text-[20px]`}
          />
        ))}
      <RenderAtom
        item={item?.position1}
        renderType="text"
        customClassName={`text-black hover:text-{colorPrimary} ${
          isChecked ? "text-{colorPrimary} font-medium" : ""
        }`}
      >
        {children}
      </RenderAtom>
    </BlockDiv>
  );
};
