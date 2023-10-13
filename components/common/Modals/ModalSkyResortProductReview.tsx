import { FC, useContext, useState } from "react";
import WidgetWrapperContext from "@engineBox/Wrapper/WidgetUniversalWrapper";
import _ from "lodash";

import RenderAtom from "@/components/common/Atom/RenderAtom";
import ModalView from "@/components/cloud/Custom/Modal/ModalView";
import WidgetWithId from "middleware/components/WidgetStandart/WidgetWithId";
type PropsType = {
  item?: any;
  type?: string;
};

const ModalSkyResortProductReview: FC<PropsType> = ({
  item,
  type = "default",
}) => {
  const {
    config,
    readyDatasrc,
    widgetnemgooReady,
    positionConfig,
    metaConfig,
    gridJsonConfig,
    pathConfig,
  } = useContext(WidgetWrapperContext);
  const mainData = readyDatasrc[0];
  const itemsInBasket = _.values(readyDatasrc[0]?.sdmsalesorderitem_dtl) || [];
  const [visibleModal, setVisibleModal] = useState(false);
  const [content, setContent] = useState<any>();
  const [totalPrice, setTotalPrice] = useState(
    _.sumBy(itemsInBasket, (item: any) => {
      return item.saleprice * item.orderqty;
    })
  );

  const onClickEv = () => {
    // setContent(tulburBody);
    setVisibleModal(true);
    console.log("dddd");
  };

  const [tulburDisplay, setTulburDisplay] = useState(false);
  const handlerCloseClick = (e: any) => {
    setVisibleModal(false);
  };
  const paymentTypeList = (data: any) => {
    const TypeList = _.values(data);

    return (
      <>
        <div className="grid grid-cols-12 gap-6 ">
          <div className="col-span-6">
            <RenderAtom
              item={item?.position2}
              renderType="image"
              customClassName={`object-center object-cover w-full h-auto`}
            />
            <WidgetWithId widgetId="16395435109401" />
          </div>
          <div className="col-span-6 bg-gray-100">
            <RenderAtom
              item={item?.position1}
              renderType="title"
              customClassName="text-3xl"
            />
            <WidgetWithId widgetId="16390282166181" />
            <hr className="opacity-50 my-5" />
            <div className="grid grid-cols-12 gap-2">
              <WidgetWithId widgetId="16387733466201" />
              <WidgetWithId widgetId="16387733466181" />
              <WidgetWithId widgetId="16388669705131" />
            </div>
            <hr className="opacity-50 my-5" />
            <div className=" flex justify-start items-center  w-full">
              <div className="py-7 flex flex-wrap sm:flex-nowrap items-center w-full sm:space-x-5 space-y-5 sm:space-y-0  border-b border-gray-200">
                <WidgetWithId widgetId="16394008259381" />
                {/* Тоо ширхэг */}
                <WidgetWithId widgetId="16394008301741" />
                {/* Сагсанд нэмэх */}
              </div>
            </div>
            <hr className="opacity-50 my-5" />
            {/* <RenderAtom item={item?.position3} renderType="text" /> */}
          </div>
        </div>
      </>
    );
  };
  // console.log("item: - ", item);
  return (
    <>
      <div>
        <p
          className="font-bold text-xl cursor-pointer"
          onClick={() => onClickEv()}
        >
          {item?.position1.value}
        </p>
        {/* <RenderAtom
          item={item?.position1}
          renderType="title"
          customProps={{
            truncateRow: 2,
          }}
        /> */}
        {/* <RenderAtom
          item={{ value: "Худалдан авах" }}
          renderType="button"
          // onClick={() => {
          //   setTulburDisplay(!tulburDisplay);
          // }}
          onClick={() => onClickEv()}
          customClassName="w-full rounded"
          customProps={{
            type: "primary",
            color: "skyresort",
          }}
        /> */}

        {/* <AtomModal
          display={tulburDisplay}
          setDisplay={setTulburDisplay}
          headerText="Төлбөр төлөх"
          footer={tulburFooter()}
          body={tulburBody([
            "Хаан банк",
            "Хаан банк",
            "Хаан банк",
            "Хаан банк",
            "Хаан банк",
            "Хаан банк",
            "Хаан банк",
            "Хаан банк",
          ])}
          customClassName="bg-gray-100"
        /> */}
        <ModalView
          open={visibleModal}
          modalOptions={{
            width: 700,
            title: "Нэмэлт хэрэгсэл",
          }}
          onClose={handlerCloseClick}
          modelContent={paymentTypeList(readyDatasrc)}
        />
      </div>

      <style>
        {`
            .ant-modal-body{
              background :#F0F0F0;
            }
            `}
      </style>
    </>
  );
};
export default ModalSkyResortProductReview;
