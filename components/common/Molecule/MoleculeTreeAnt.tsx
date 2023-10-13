import { Tree } from "antd";
import { DownOutlined } from "@ant-design/icons";

import RenderAtom from "../Atom/RenderAtom";
import BlockDiv from "../Block/BlockDiv";

const { DirectoryTree, TreeNode } = Tree;

export default function MoleculeTree({
  item: readyDatasrc,
  selectedKeys,
  customClassName = "",
  customStyle = {},
  divNamePrefix = "",
}: {
  item?: any;
  selectedKeys?: Array<string | number>;
  customClassName?: string;
  customStyle?: object;
  divNamePrefix?: string;
}) {
  // console.log("🚀 ~ readyDatasrc", readyDatasrc);

  const onSelect = (keys: React.Key[], info: any) => {
    console.log("Trigger Select", keys, info);
  };

  const onExpand = () => {
    console.log("Trigger Expand");
  };

  return (
    <BlockDiv divNumber={`${divNamePrefix}divMoleculeTreeOuter`}>
      <DirectoryTree
        className="bg-transparent"
        multiple
        onSelect={onSelect}
        onExpand={onExpand}
        showIcon={false}
        switcherIcon={<DownOutlined />}
        defaultSelectedKeys={selectedKeys}
        defaultExpandedKeys={selectedKeys}
      >
        {renderTreeNodes(readyDatasrc)}
      </DirectoryTree>
    </BlockDiv>
  );
}

/* ------------------------------------------------------ */
/*                     RENDERTREENODES                    */
/* ------------------------------------------------------ */

const renderTreeNodes = (readyDatasrc: any) => {
  return readyDatasrc.map((item: any) => {
    if (item.children) {
      return (
        <TreeNode
          title={
            <RenderAtom
              item={item?.position1}
              renderType="text"
              customClassName="inline-block leading-none ml-2"
            />
          }
          key={item.key}
          isLeaf={item.isLeaf}
          icon={item.icon}
        >
          {renderTreeNodes(item.children)}
        </TreeNode>
      );
    }
    return (
      <TreeNode
        {...item}
        title={
          <RenderAtom
            item={item?.position1}
            renderType="text"
            customClassName="inline-block leading-none ml-2"
          />
        }
        key={item.key}
        isLeaf={item.isLeaf}
        icon={item.icon}
        dataRef={item}
      />
    );
  });
};
