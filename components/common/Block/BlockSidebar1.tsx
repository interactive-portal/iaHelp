import { useToggle } from "react-use";
import BlockDiv from "./BlockDiv";
import RenderAtom from "../Atom/RenderAtom";

export default function BlockSidebar1({
  sidebarWidth = "310", //w-[310]
  buttonMarginTop = "mt-[320px]",
  title = {
    title: "Ерөнхий шүүлтүүр",
    className: "",
  },
  desktopViewClassName = "w-[310px] hidden md:flex bg-[#F9F9F9] px-4 py-4 rounded-2xl",
  earIcon = { icon: "fal fa-bars-filter", className: "text-white" },
  children,
}: {
  sidebarWidth?: string;
  buttonMarginTop?: string;
  title?: {
    title: string;
    className?: string;
  };
  earIcon?: {
    icon: string;
    className?: string;
  };
  desktopViewClassName?: string;
  children?: any;
}) {
  const [isOpenSidebar, setIsOpenSidebar] = useToggle(false);

  return (
    <>
      {/* DESKTOP */}
      <BlockDiv
        // customClassName="w-[310px] bg-[#F9F9F9] hidden md:flex px-4 py-4 rounded-2xl"
        customClassName={desktopViewClassName}
        divNumber="DesktopView"
      >
        {children}
      </BlockDiv>

      {/* MOBILE */}
      <BlockDiv
        customClassName={`w-[${sidebarWidth}px] z-40 h-screen fixed top-0 left-0 bottom-0 md:relative bg-gray-100 shadow-lg py-4 md:h-full flex-col justify-between md:hidden transition duration-150 ease-in-out`}
        customStyle={{
          transform: isOpenSidebar
            ? "translateX(0px)"
            : `translateX(-${sidebarWidth}px)`,
        }}
        divNumber="MobileView"
      >
        {/* Нээх товч - Чих */}
        <RenderAtom
          item={earIcon?.icon}
          renderType="icon"
          className={`w-12 h-11 ${
            earIcon?.className
          } bg-{colorPrimary} absolute right-0 ${buttonMarginTop} -mr-[48px] flex items-center justify-center shadow rounded-tr rounded-br cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-{colorPrimary} text-lg ${
            isOpenSidebar ? "hidden" : ""
          }`}
          onClick={() => {
            setIsOpenSidebar(true);
          }}
        />
        {/* Хаах товч - Чих */}
        <RenderAtom
          item={{ value: `fal fa-xmark` }}
          renderType="icon"
          customClassName={`w-12 h-11 bg-{colorPrimary} absolute right-0 ${buttonMarginTop} -mr-[48px] flex items-center justify-center shadow rounded-tr rounded-br cursor-pointer text-white text-lg ${
            isOpenSidebar ? "" : "hidden"
          }`}
          onClick={() => {
            setIsOpenSidebar(false);
          }}
          // customProps={{ type: "html" }}
        />
        <BlockDiv customClassName="w-full flex flex-row justify-between px-4 pb-4 border-b border-gray-200">
          <RenderAtom
            item={{ value: title?.title }}
            renderType="title"
            className={title?.className}
          />
          <RenderAtom
            item={{
              value:
                "fal fa-arrow-left text-lg cursor-pointer hover:text-{colorPrimary}",
            }}
            renderType="icon"
            onClick={() => {
              setIsOpenSidebar(false);
            }}
          />
        </BlockDiv>
        {children}
      </BlockDiv>
    </>
  );
}
