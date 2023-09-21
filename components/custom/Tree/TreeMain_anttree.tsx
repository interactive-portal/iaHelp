import { FC } from "react";
import { Tree } from "antd";

import _ from "lodash";
import { positionToPath } from "@/utils/helper";
const { DirectoryTree } = Tree;

type PropsType = {
  readyDatasrc: any;
  config: any;
  widgetnemgooReady?: any;
  customClassName?: string;
  customStyle?: any;
  type?: "classic" | "modern";
};

const TreeMain: FC<PropsType> = ({
  readyDatasrc,
  config,
  widgetnemgooReady,
  customClassName,
  customStyle,
  type = "classic",
}) => {
  if (_.isEmpty(readyDatasrc)) return null;
  const positionConfig = positionToPath(config.bpsectiondtl);
  // console.log("TreeMain config", config);
  // console.log("TreeMain readyDatasrc", readyDatasrc);
  // console.log("TreeMain widgetnemgooReady", widgetnemgooReady);

  const onSelect = (selectedKeys: any, info: any) => {
    console.log("selected", selectedKeys, info);
  };

  return (
    <DirectoryTree
      className={`bg-transparent text-sm w-full ${customClassName}   ${
        type === "modern" ? "modern-tree" : "classic-tree"
      }`}
      checkable={false}
      draggable={false}
      multiple={false}
      showLine={false}
      showIcon={false}
      autoExpandParent={false}
      switcherIcon={
        <span className="anticon ant-tree-switcher-icon">
          <i className="far fa-chevron-down text-sm"></i>
        </span>
      }
      onSelect={onSelect}
      treeData={readyDatasrc}
    />
  );
};

export default TreeMain;

// type PropsTypeItem = {
//   item: any;
//   positionConfig: any;
// };

// const TreeItem: FC<PropsTypeItem> = ({ item, positionConfig }) => {
//   console.log("item", item);
//   return (
//     <li className="bg-gray-50 rounded flex w-full justify-between text-gray-800  leading-none cursor-pointer items-center py-3 px-4">
//       <AtomText
//         item={renderPositionType(item, "position1", positionConfig)}
//         customClassName="text-sm text-gray-800 ml-2"
//       />
//       <AtomIcon item="far fa-chevron-right" />
//     </li>
//   );
// };
