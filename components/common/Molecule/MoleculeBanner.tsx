import RenderAtom from "../Atom/RenderAtom";
import BlockDiv from "../Block/BlockDiv";
import { AtomFade } from "../Atom";

export default function MoleculeBanner({
  item,
  customClassName = "",
  customStyle = {},
  AtomFadeProps = { opacityClass: "bg-opacity-0" },
  divNamePrefix = "",
}: {
  item?: any;
  customClassName?: string;
  customStyle?: object;
  AtomFadeProps?: any;
  divNamePrefix?: string;
}) {
  return (
    <BlockDiv
      customClassName={`w-full h-full relative ${customClassName}`}
      customStyle={customStyle}
      divNumber={`${divNamePrefix}divMoleculeBannerOuter`}
    >
      <RenderAtom
        item={item?.image}
        renderType="image"
        customClassName="w-full h-full object-cover object-center inset-0"
      />
      <AtomFade className="" color="black" {...AtomFadeProps} />

      <BlockDiv
        customClassName="absolute w-full h-full inset-0 container mx-auto"
        divNumber={`${divNamePrefix}MoleculeBannerInsideOuter`}
      >
        <BlockDiv
          customClassName="flex flex-row items-center h-full"
          divNumber={`${divNamePrefix}MoleculeBannerInsideInner`}
        >
          <RenderAtom
            item={item?.title}
            renderType="title"
            customClassName="text-xl"
            divNamePrefix={divNamePrefix}
          />
          {/* <RenderAtom
              item={item?.description}
              renderType="text"
              customClassName="text-gray-700"
              divNamePrefix={divNamePrefix}
            /> */}
          <RenderAtom item={item?.button} renderType="button" />
          <RenderAtom
            item={item?.mainnumber}
            renderType="number"
            customClassName=""
            divNamePrefix={divNamePrefix}
          />
        </BlockDiv>
      </BlockDiv>
    </BlockDiv>
  );
}
