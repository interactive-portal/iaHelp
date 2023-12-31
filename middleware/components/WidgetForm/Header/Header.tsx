import { FC } from "react";
import RenderField from "@/middleware/components/WidgetForm/RenderField";

type PropsType = {
  processConfig: any;
  header: any;
  listConfigParse: any;
  processParams: any;
};

const Header: FC<PropsType> = ({
  processConfig,
  header,
  listConfigParse,
  processParams,
}) => {
  const settings = {
    widgetnemgooReady: {
      labelPosition: "top",
    },
  };
  // console.log("Dddddddddddddf   header", processConfig);
  // console.log("Dddddddddddddf   header", header);
  // console.log("Dddddddddddddf   processParams", processParams);

  return processConfig ? (
    <div className={`grid gap-4 grid-cols-2 px-2`}>
      {header?.map((item: any, index: number) => {
        if (!item.tabname && item.datatype !== "group") {
          // console.log("🚀 ~ {header?.map ~ item", item);
          return (
            <RenderField
              key={item?.id || index}
              field={item}
              attr={processParams.details}
              sectionConfig={listConfigParse.otherattr}
            />
          );
        }
      })}
    </div>
  ) : (
    <></>
  );
};

export default Header;
