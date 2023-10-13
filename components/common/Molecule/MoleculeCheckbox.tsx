import { useEffect } from "react";
import { useToggle } from "react-use";

import RenderAtom from "../Atom/RenderAtom";
import BlockDiv from "../Block/BlockDiv";

export default function MoleculeCheckbox({
  item,
  defaultReady,
  customClassName = "",
  customStyle = {},
  divNamePrefix = "",
}: {
  item: Array<string | number>;
  defaultReady?: any;
  customClassName?: string;
  customStyle?: object;
  divNamePrefix?: string;
}) {
  return (
    <BlockDiv
      customClassName={`w-full relative flex flex-col ${customClassName}`}
      customStyle={customStyle}
      divNumber={`${divNamePrefix}MoleculeCheckboxItemOuter`}
    >
      {item &&
        item.map((item: any, index: number) => {
          return (
            <CheckboxItem
              key={item?.id || index}
              item={item}
              defaultReady={defaultReady}
              divNamePrefix={divNamePrefix}
            />
          );
        })}
    </BlockDiv>
  );
}

/* ------------------------------------------------------ */
/*                      CHECKBOXITEM                      */
/* ------------------------------------------------------ */
const CheckboxItem = ({
  item,
  defaultReady,
  divNamePrefix,
}: {
  item: any;
  defaultReady?: any;
  divNamePrefix: string;
}) => {
  const myDefaultValue = defaultReady?.[0]?.value;
  const [toggle, setToggle] = useToggle(
    (item?.position0?.value || item?.id) === myDefaultValue
  );

  useEffect(() => {
    setToggle((item?.position0?.value || item?.id) === myDefaultValue);
  }, [myDefaultValue]);

  return (
    <BlockDiv
      customClassName="flex flex-row gap-2 items-center p-1 cursor-pointer hover:bg-gray-50 rounded-md"
      divNumber="CheckboxItemBlock"
      onClick={() => setToggle(!toggle)}
    >
      {toggle ? (
        <RenderAtom
          item={{ value: "fas fa-square-check" }}
          renderType="icon"
          customClassName={`text-{colorPrimary} text-[20px]`}
          divNamePrefix={divNamePrefix}
        />
      ) : (
        <RenderAtom
          item={{ value: "far fa-square" }}
          renderType="icon"
          customClassName={`text-gray-200 text-[20px]`}
          divNamePrefix={divNamePrefix}
        />
      )}
      {/* {item.icon && (
        <RenderAtom
          item={{ value: item?.icon }}
          renderType="image"
          customClassName={"w-[22px] h-[22px] rounded-[5px] ml-2"}
        />
      )} */}
      <RenderAtom
        item={item?.position1 || { value: item?.title }}
        renderType="text"
        customClassName="text-[#585858]"
        divNamePrefix={divNamePrefix}
      />

      <RenderAtom
        item={item?.position4 || { value: item?.cnt }}
        renderType="text"
        customClassName="text-gray-400 absolute right-2"
        divNamePrefix={divNamePrefix}
      />
    </BlockDiv>
  );
};
