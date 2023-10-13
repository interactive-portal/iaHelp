import { Select, Tooltip } from "antd";
import _ from "lodash";
import { useCounter } from "react-use";

import useGoLink from "@customhook/useGoLink";
import RenderAtom from "../Atom/RenderAtom";
import BlockDiv from "../Block/BlockDiv";

export default function MoleculePagination({
  offset,
  total,
  pageSize,
  customClassName = "",
  customStyle = {},
  buttonObject,
  textObject,
  pageSizeObject,
  divNamePrefix = "",
}: {
  offset: number;
  total: number;
  pageSize: number;
  customClassName?: string;
  customStyle?: object;
  buttonObject?: any;
  textObject?: any;
  pageSizeObject?: any;
  divNamePrefix?: string;
}) {
  return (
    <BlockDiv
      customClassName={`w-full ${customClassName}`}
      customStyle={customStyle}
      divNumber={`${divNamePrefix}MoleculePaginationOuter`}
    >
      <BlockDiv
        customClassName="w-full"
        divNumber={`${divNamePrefix}MoleculePaginationInner`}
      >
        <RenderPagination
          offset={offset}
          total={total}
          pageSize={pageSize}
          buttonObject={buttonObject}
          textObject={textObject}
          pageSizeObject={pageSizeObject}
        />
      </BlockDiv>
    </BlockDiv>
  );
}

/* ------------------------------------------------------ */
/*                    RENDERPAGINATION                    */
/* ------------------------------------------------------ */
const RenderPagination = ({
  offset,
  total,
  pageSize,
  buttonObject,
  textObject,
  pageSizeObject,
}: {
  offset: number;
  total: number;
  pageSize: number;
  buttonObject?: any;
  textObject?: any;
  pageSizeObject?: any;
}) => {
  if (!offset) return null;

  const maxPages = _.ceil(total / pageSize);

  let leftSide = offset - 2;
  if (leftSide <= 0) leftSide = 1;

  let rightSide = offset + 2;
  if (rightSide > maxPages) rightSide = maxPages;

  const showStartItem = offset * pageSize - pageSize + 1;
  let showEndItem = offset * pageSize;
  if (showEndItem > total) showEndItem = total;

  const pageList = _.range(leftSide, rightSide + 1);

  return (
    <BlockDiv
      customClassName="w-full flex flex-wrap items-center justify-center gap-x-5"
      divNumber="MoleculePaginationBlock"
    >
      <RenderAtom
        item={{
          value: `${total} бүтээгдэхүүнээс ${showStartItem}-${showEndItem} хэсгийг харуулж байна.`,
        }}
        renderType="text"
        customClassName={textObject?.className}
        customStyle={textObject?.style}
      />

      <BlockDiv
        customClassName="flex flex-row items-center gap-x-2"
        divNumber="MoleculePaginationButtonBlock"
      >
        <RenderAtom
          item={{ value: "Өмнөх" }}
          customClassName={`w-auto h-[40px] ${buttonObject?.className} ${
            offset == 1 && "text-gray-300 bg-gray-200"
          }`}
          renderType="button"
          url={{
            path: "",
            query: {
              offset: String(offset - 1),
            },
            props: { shallow: true },
            keepQuery: true,
          }}
        />
        {pageList.map((item: any, index: number) => {
          const isActive = offset == item;
          return (
            <RenderAtom
              key={item?.id || index}
              item={{ value: String(item) }}
              renderType="button"
              customClassName={`w-[40px] h-[40px] ${buttonObject?.className} ${
                isActive ? buttonObject?.active?.className : ""
              }`}
              url={{
                path: "",
                query: {
                  offset: String(item),
                },
                props: { shallow: true },
                keepQuery: true,
              }}
            />
          );
        })}

        <RenderAtom
          item={{ value: "Дараах" }}
          customClassName={`w-auto h-[40px] ${buttonObject?.className} ${
            offset == maxPages && "text-gray-300 bg-gray-200"
          }`}
          renderType="button"
          url={{
            path: "",
            query: {
              offset: String(offset + 1),
            },
            props: { shallow: true },
            keepQuery: true,
          }}
        />
      </BlockDiv>

      <PageSizeSelectDropdown
        offset={offset}
        pageSize={pageSize}
        pageSizeObject={pageSizeObject}
      />
    </BlockDiv>
  );
};

/* ------------------------------------------------------ */
/*                        DROPDOWN                        */
/* ------------------------------------------------------ */
const PageSizeSelectDropdown = ({
  offset,
  pageSize,
  pageSizeObject,
}: {
  offset: number;
  pageSize: number;
  pageSizeObject?: any;
}) => {
  const { goLink } = useGoLink();

  return (
    <BlockDiv customClassName="" divNumber="MoleculePaginationPagesizeBlock">
      <Tooltip title="Нэг хуудсанд харуулах барааны тоо">
        <Select
          value={String(pageSize)}
          onChange={(value: any) => {
            goLink({
              urlObject: {
                query: {
                  offset: offset,
                  pagesize: value,
                },
                props: {
                  shallow: true,
                },
                keepQuery: true,
              },
            });
          }}
        >
          {(pageSizeObject?.item).map((item: string, index: number) => {
            // console.log("🚀 ~ { ~ item select 222:", String(item));
            return (
              <Select.Option key={item || index} value={String(item)}>
                <RenderAtom
                  item={{
                    value: String(item),
                    positionnemgoo: {
                      atom: {
                        type: "text",
                        className: "",
                        props: { maxLength: 30 },
                      },
                    },
                  }}
                  renderType="text"
                  customClassName="w-full"
                />
              </Select.Option>
            );
          })}
        </Select>
      </Tooltip>
    </BlockDiv>
  );
};
