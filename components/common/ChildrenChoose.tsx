import RenderAtom from "@atom/RenderAtom";

export default function ChildrenChoose({
  item,
  childrenConfig,
  ...props
}: {
  item?: any;
  childrenConfig?: any;
}) {
  // {
  //     "type": "Atom",
  //     "props": {
  //         "type": "image",
  //         "className": "font-bold text-xl uppercase",
  //         "style": {}
  //     }
  // },
  // {
  //     "type": "Molecule",
  //     "props": {
  //         "type": "MoleculeBanner",
  //         "className": ""
  //     }
  // }

  const propsss: any = { ...props };

  console.log("childrenConfig", childrenConfig);
  console.log("propsss", propsss?.item);

  switch (childrenConfig?.type) {
    case "Atom":
      // console.log("ЭЭЭЭЭЭЭЭЭЭЭНД ОРЖ БАЙНА");
      return (
        <>
          <RenderAtom
            item={item}
            renderType={childrenConfig?.props?.type || "text"}
            // renderType="text"
            customClassName={childrenConfig?.props?.className}
            customStyle={{ ...childrenConfig?.props?.style }}
            {...childrenConfig?.props}
          />
        </>
      );

    // case "Molecule":
    //   return <RenderMolecule moleculeConfig={childrenConfig} {...props} />;

    default:
      return null;
      break;
  }
}
