import { FC, useState, useEffect, useContext } from "react";
import ReactPaginate from "react-paginate";
type PropsType = {
  items: any;
  itemsPerPage: any;
  customClassName?: string;
};
import { useRouter } from "next/router";
import { CartItemList } from "@/components/cloud/Custom/Card";
import WidgetWrapperContext from "@engineBox/Wrapper/WidgetUniversalWrapper";
const AtomPaginate: FC<PropsType> = ({
  items,
  itemsPerPage,
  customClassName = "",
}) => {
  const [currentItems, setCurrentItems]: any = useState(items);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const {
    config,
    readyDatasrc,
    widgetnemgooReady,
    positionConfig,
    metaConfig,
    gridJsonConfig,
    pathConfig,
  } = useContext(WidgetWrapperContext);
  const router = useRouter();

  const Items = (currentItems: any) => {
    return (
      <div className="grid ">
        {currentItems.map((item: any, index: string) => (
          <div>
            <CartItemList
              key={item?.id || index}
              item={item}
              position={positionConfig}
              type={4}
            />
          </div>
        ))}
      </div>
    );
  };

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    // console.log(`${itemOffset} to ${endOffset}`);
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    const currentPage = router.asPath;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    console.log(router.query);
    // router.push(`${router.query.layoutid}?item=${event.selected}`);
    setItemOffset(newOffset);
  };

  return (
    <>
      {Items(currentItems)}
      <ReactPaginate
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        pageCount={pageCount}
        previousLabel=" < "
        pageClassName="w-6 h-6  border border-gray-200 hover:border-blue-500 bg-white  flex items-center justify-center cursor-pointer mx-1 hover:bg-blue-500 group"
        pageLinkClassName="page-link bg-blue-30"
        previousClassName="w-6 h-6 border border-gray-200  flex items-center justify-center cursor-pointer mx-1 hover:bg-blue-500 group "
        previousLinkClassName="page-link"
        nextClassName="w-6 h-6 border border-gray-200  flex items-center justify-center cursor-pointer mx-1 hover:bg-blue-500 group "
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="w-6 h-6  border border-gray-200 hover:border-blue-500 bg-white  flex items-center justify-center  cursor-pointer mx-1 hover:bg-blue-500 group"
        breakLinkClassName="page-link"
        containerClassName="pagination flex py-4"
        activeClassName="bg-blue-500 text-white "
        hrefBuilder={(pageIndex: number) => null}
        ariaLabelBuilder={(page, selected) =>
          selected ? "Current page" : "Goto page " + page
        }
        // renderOnZeroPageCount={null}
      />
    </>
  );
};

export default AtomPaginate;
