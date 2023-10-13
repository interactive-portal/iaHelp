import BlockDiv from "./BlockDiv";

export default function BlockScroll({
  containerHeight = "500px",
  width = "5px",
  scrollClassName,
  children,
}: {
  containerHeight?: string;
  width?: string;
  scrollClassName?: string;
  children: any;
}) {
  const scrollClassNameReady = `w-full h-[${containerHeight}] overflow-auto scrollbar scrollbar-thumb-gray-200 hover:scrollbar-thumb-gray-300 scrollbar-thumb-rounded-full scrollbar-w-[${width}] ${scrollClassName}`;

  return (
    <BlockDiv
      className={scrollClassNameReady}
      customStyle={{ height: containerHeight }}
      divNumber="BlockScrollOuter"
    >
      {children}
    </BlockDiv>
  );
}
