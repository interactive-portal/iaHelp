import RenderAtom from "../Atom/RenderAtom";
import BlockDiv from "../Block/BlockDiv";

export default function MoleculeCozyListItemDetail({
  item,
  customClassName = "",
  customStyle = {},
  divNamePrefix = "",
  children,
  initial,
  animate,
  transition,
}: {
  item?: any;
  customClassName?: string;
  customStyle?: object;
  divNamePrefix?: string;
  children?: any;
  initial?: any;
  animate?: any;
  transition?: any;
}) {
  return (
    <BlockDiv
      customClassName={customClassName}
      customStyle={{
        ...customStyle,
      }}
      initial={{ initial }}
      animate={{ animate }}
      transition={{ transition }}
      divNumber={`${divNamePrefix}MoleculeCozyListItemDetailOuter`}
    >
      <RenderAtom
        item={item?.position41}
        renderType="text"
        customClassName="block font-normal text-[12px] leading-[14px] text-[#A0A0A0]"
        divNamePrefix={`${divNamePrefix}category`}
      />
      <RenderAtom
        item={item?.position3}
        renderType="text"
        customClassName="text-[12px] mt-2 block"
        customProps={{
          truncateRow: 3,
        }}
        divNamePrefix={`${divNamePrefix}description`}
      />

      <RenderAtom
        item={{ value: `Брэнд: ${item?.position56?.value}` }}
        renderType="text"
        customClassName="block font-normal text-[12px] leading-[14px] text-[#A0A0A0]"
        customProps={{
          truncateRow: 1,
        }}
        divNamePrefix={`${divNamePrefix}brand`}
      />
      <RenderAtom
        item={{ value: `Нийлүүлэгч: ${item?.position55?.value}` }}
        renderType="text"
        customClassName="block font-normal text-[12px] leading-[14px] text-[#A0A0A0]"
        customProps={{
          truncateRow: 1,
        }}
        divNamePrefix={`${divNamePrefix}company`}
      />
      {children}
    </BlockDiv>
  );
}
