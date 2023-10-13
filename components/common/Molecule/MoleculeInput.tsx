import RenderAtom from "../Atom/RenderAtom";
import BlockDiv from "../Block/BlockDiv";

export default function MoleculeInput({
  item,
  input,
  label,
  defaultValue = "",
  customClassName = "",
  customStyle = {},
  divNamePrefix = "",
}: {
  item?: any;
  input?: any; //className, placeholder etc
  label?: any; //title, className etc
  defaultValue?: any;
  customClassName?: string;
  customStyle?: object;
  divNamePrefix?: string;
}) {
  return (
    <BlockDiv
      customClassName={`${customClassName}`}
      customStyle={customStyle}
      divNumber={`${divNamePrefix}MoleculeInputOuter`}
    >
      <BlockDiv
        customClassName={``}
        divNumber={`${divNamePrefix}MoleculeInputLabelBlock`}
      >
        {label && (
          <label className={`${label?.className || ""}`} style={label?.style}>
            {label.title}
          </label>
        )}
      </BlockDiv>

      <BlockDiv
        customClassName={`w-full relative flex flex-row items-center`}
        divNumber={`${divNamePrefix}MoleculeInputBlock`}
      >
        {/* Зүүн талын Icon */}
        <RenderAtom
          item={{ value: item.icon }}
          renderType="icon"
          customClassName="absolute text-xl block ml-3"
          divNamePrefix={divNamePrefix}
        />

        {/* Баруун талын Icon */}
        <RenderAtom
          item={{ value: item.icon2 }}
          renderType="icon"
          customClassName="absolute right-0 text-xl block mr-3"
          divNamePrefix={divNamePrefix}
        />

        {/* Энд AtomInput оруулж ирэх ёстой. */}
        <RenderAtom
          item={{ value: defaultValue }}
          renderType="input"
          customClassName={`h-9 flex items-center ${
            item.icon ? "pl-12" : "pl-3"
          } ${item.icon2 ? "pr-12" : "pr-3"} w-full placeholder:text-gray-400 ${
            input?.className || ""
          }`}
          customStyle={input?.style}
          customProps={{
            ...input,
          }}
        />
      </BlockDiv>
    </BlockDiv>
  );
}
