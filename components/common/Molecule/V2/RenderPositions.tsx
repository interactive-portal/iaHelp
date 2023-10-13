import _ from "lodash";
import RenderAtom from "../../Atom/RenderAtom";

export default function RenderPositions({
  item,
  layout = [],
  divNamePrefix = "",
}: {
  item?: any;
  layout?: any;
  divNamePrefix?: string;
}) {
  if (_.isEmpty(layout)) return null;

  return (
    <>
      {layout.map((positionConfig: any, index: number) => {
        if (positionConfig?.children)
          return (
            <RenderPositions item={item} layout={positionConfig?.children} />
          );

        //position заасан байвал түүгээр, заагаагүй бол path заасан байх ёстой. Түүгээр явна.
        //CozyOrderListV2 дотор энийг туршилтаар дуудаж байгаа.
        const itemDetail = positionConfig?.position
          ? item?.[positionConfig?.position]
          : positionConfig?.path
          ? { value: item?.[positionConfig?.path] }
          : positionConfig?.value
          ? { value: positionConfig?.value }
          : { value: "" };

        return (
          <RenderAtom
            key={index}
            item={itemDetail}
            renderType={positionConfig?.type || "text"}
            customClassName={positionConfig?.className}
            customStyle={positionConfig?.style}
            tooltip={positionConfig?.tooltip}
            customProps={positionConfig?.props}
            divNamePrefix={divNamePrefix}
          />
        );
      })}
    </>
  );
}
