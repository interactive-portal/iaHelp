import { FC, useMemo } from "react";
import dynamic from "next/dynamic";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import BlockDiv from "../Block/BlockDiv";
import AtomTooltipV2 from "../Atom/V2/AtomTooltipV2";
import RenderPositions from "./V2/RenderPositions";
import AtomSpinV2 from "../Atom/V2/AtomSpinV2";

export default function RenderMolecule({
  item,
  atomList,
  renderType,
  customClassName = "",
  customStyle = {},
  outsideClassName = "",
  customProps,
  isMoleculeWorking = false,
  onClick,
  customDivNumber = undefined,
  divNamePrefix = "",
  tooltip = {},
  moleculeConfig, //цаашдаа хэрэггүй болно.
  ...props
}: {
  item?: any;
  atomList?: Object;
  renderType?:
    | "card"
    | "cardv2"
    | "banner"
    | "detail"
    | "tree"
    | "menu"
    | "filter"
    | "buttonnumberbetween"
    | "input"
    | "checkbox"
    | "tab"
    | "pagination"
    | "dropdown"
    | "select"
    | "avatar"
    | "listitem"
    | "listitem2"
    | "cozyitem2"
    | "cozylistdetail"
    | "photogallerysocialv2";
  customClassName?: any;
  customStyle?: any;
  outsideClassName?: string;
  customProps?: any;
  isMoleculeWorking?: boolean;
  onClick?: any;
  customDivNumber?: string;
  divNamePrefix?: string;
  tooltip?: any;
  moleculeConfig?: any; //цаашдаа хэрэггүй болно.
}) {
  //main хэсэг эхэлж байна.
  const nemgoo = item?.nemgoo || {};
  const molecule = nemgoo?.molecule || {
    type:
      renderType ||
      moleculeConfig?.type ||
      moleculeConfig?.renderType ||
      "card",
  };
  const moleculeClassName = `${moleculeConfig?.className} ${customClassName} ${
    molecule?.className || ""
  }`;
  const moleculeStyle = {
    ...moleculeConfig?.style,
    ...customStyle,
    ...molecule?.style,
  };

  const layout = molecule?.layout;

  const myTooltip = tooltip;

  const moleculeList: any = {
    card: "MoleculeCard",
    cardv2: "V2/MoleculeCardV2",
    banner: "MoleculeBanner",
    detail: "MoleculeDetail",
    menu: "MoleculeMenu",
    halfimagetext: "MoleculeHalfImageText",
    tree: "MoleculeTree",
    filter: "MoleculeFilter",
    buttonnumberbetween: "MoleculeButtonNumberBetween",
    input: "MoleculeInput",
    checkbox: "MoleculeCheckbox",
    tab: "MoleculeTab",
    pagination: "MoleculePagination",
    dropdown: "MoleculeDropdown",
    select: "MoleculeSelect",
    avatar: "MoleculeAvatar",
    listitem: "MoleculeListItem",
    listitem2: "MoleculeListItem2",
    cozyitem2: "V2/MoleculeCozyBasketItemV2",
    cozylistdetail: "MoleculeCozyListItemDetail",
    photogallerysocialv2: "MoleculePhotoGallerySocialV2",
  };

  const RenderComponent: any = useMemo(
    () =>
      dynamic(
        () =>
          import(
            `@/components/common/Molecule/${
              moleculeList?.[molecule?.type || "card"]
            }`
          ).catch((err) => {
            console.log("Molecule error: ", err);
            return () => <>Molecule дуудахад алдаа гарлаа.</>;
          }),
        {
          ssr: false,
          suspense: true,
          // loading: () => (
          //   <>
          //     <div className="w-full max-w-[150px] animate-pulse">
          //       <div className="h-2 rounded bg-[#fbfbfc] text-[#f3f4f6]">
          //         Molecule ачааааааалж байна
          //       </div>
          //     </div>
          //   </>
          // ),
        }
      ),
    []
  );

  const moleculeProps = {
    item: item?.item,
    atomList,
    customClassName: moleculeClassName,
    customStyle: moleculeStyle,
    isWorking: isMoleculeWorking,
    onClick,
    customDivNumber,
    divNamePrefix,
    ...(molecule?.props || {}),
    ...customProps,
    ...moleculeConfig?.props,
    ...props,
  };

  const LoadingAntIcon = (
    <LoadingOutlined style={{ fontSize: 24, color: "#54ADAE" }} spin />
  );

  return (
    <BlockDiv customClassName={outsideClassName} divNumber="moleculeOutside">
      <AtomSpinV2
        spinning={isMoleculeWorking}
        delay={0}
        tip=""
        indicator="default"
      >
        <AtomTooltipV2 item={myTooltip}>
          <RenderComponent {...moleculeProps}>
            <RenderPositions item={item?.item} layout={layout} />
          </RenderComponent>
        </AtomTooltipV2>
      </AtomSpinV2>
    </BlockDiv>
  );
}
