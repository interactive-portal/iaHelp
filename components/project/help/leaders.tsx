import RenderAtom from "@/components/common/Atom/RenderAtom";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import { useContext } from "react";

const Leaders = () => {
  const { widgetnemgooReady } = useContext(WidgetWrapperContext);
  const testData = [
    {
      name: "Б. Энхзул",
      position: "Менежер",
      rate: "Тэргүүлэгч",
      count: "500",
    },
    {
      name: "Б. Энхзул",
      position: "Менежер",
      rate: "Тэргүүлэгч",
      count: "500",
    },
    {
      name: "Б. Энхзул",
      position: "Менежер",
      rate: "Тэргүүлэгч",
      count: "500",
    },
    {
      name: "Б. Энхзул",
      position: "Менежер",
      rate: "Тэргүүлэгч",
      count: "500",
    },
    {
      name: "Б. Энхзул",
      position: "Менежер",
      rate: "Тэргүүлэгч",
      count: "500",
    },
  ];

  const cardColor = ["", "#FF8E50", "#FEC345", "#39E0CF", "#48C7F4"];

  return (
    <div>
      <div className="">
        <RenderAtom
          item={{ value: widgetnemgooReady?.title || "Бүх ангилал" }}
          renderType="title"
          customClassName={"text-[38px] font-medium text-[#585858] text-center"}
        />
      </div>
      <div className="max-w-[920px] mx-auto text-center w-full pb-[50px]">
        <RenderAtom
          item={{
            value:
              widgetnemgooReady?.description ||
              "Хэрэглэгч та бизнесийн олон төрлийн үйлчилгээг дижитал хэлбэрээр хялбар авах боломжтой бөгөөд цахим шилжилт хийсэн бизнесүүдийн үйлчилгээний сангаас сонголтоо хийн үйлчлүүлнэ үү.",
          }}
          renderType="text"
          customClassName={
            "text-[#67748E] text-base font-normal leading-6 max-w-[920px] text-center"
          }
        />
      </div>
      <div className="grid grid-cols-3 gap-5 w-full px-[140px]">
        {testData?.map((obj: any, index: number) => {
          if (index == 0) {
            return (
              <div className="row-span-4 col-span-1 bg-white rounded-[20px] flex flex-col gap-[20px] items-center">
                <div className="bg-[#FF7E79] w-max mx-auto rounded-b-xl text-center px-[20px] py-[10px]">
                  <RenderAtom
                    item={{ value: obj?.rate }}
                    renderType="text"
                    customClassName={"text-[26px] font-bold text-white  "}
                  />
                  {/* {obj?.rate} */}
                </div>
                <RenderAtom
                  item={
                    obj?.position2 || {
                      value:
                        "https://res.cloudinary.com/dzih5nqhg/image/upload/v1673509721/image_44054_mqwegp.png",
                    }
                  }
                  renderType="image"
                  customClassName={"h-[150px] rounded-full w-[150px]"}
                />
                <div className="text-center">
                  <RenderAtom
                    item={obj?.position3 || { value: obj?.name }}
                    renderType="title"
                    customClassName={"text-[26px] text-[#585858] font-medium"}
                  />
                  <RenderAtom
                    item={obj?.position4 || { value: obj?.position }}
                    renderType="title"
                    customClassName={"text-[16px] text-[#67748E] font-medium"}
                  />
                </div>
                <div className="bg-[#FF7E79] w-full rounded-b-[20px] bg-opacity-20 text-center leading-6 py-[12px]">
                  <RenderAtom
                    item={obj?.position5 || { value: obj?.count }}
                    renderType="text"
                    customClassName={"text-[30px] text-[#FF7E79] font-black"}
                  />
                  <p className="text-[16px] font-medium text-[#FF7E79]">
                    санал
                  </p>
                </div>
              </div>
            );
          } else {
            return (
              <div className="col-span-2 w-full flex items-center">
                <div className="bg-white max-h-[70px] rounded-[10px] flex w-full relative">
                  <div className="px-[20px] py-[12px] text-center">
                    <p className=" text-[#585858] text-[20px] font-medium">
                      <span className="text-[26px] font-bold">{index + 1}</span>
                      т
                    </p>
                  </div>
                  <RenderAtom
                    item={
                      obj?.position2 || {
                        value:
                          "https://res.cloudinary.com/dzih5nqhg/image/upload/v1673509721/image_44054_mqwegp.png",
                      }
                    }
                    renderType="image"
                    customClassName={
                      "h-[90px] rounded-full w-[90px] relative -top-[10px]"
                    }
                  />
                  <div className=" px-[20px] leading-6 py-[12px]">
                    <RenderAtom
                      item={obj?.position1 || { value: obj?.name }}
                      renderType="text"
                      customClassName={
                        "text-[24px] text-[#585858] font-medium p-0"
                      }
                    />
                    <RenderAtom
                      item={obj?.position2 || { value: obj?.position }}
                      renderType="text"
                      customClassName={
                        "text-[16px] text-[#67748E] font-medium p-0"
                      }
                    />
                  </div>
                  <div
                    className={`absolute right-0 top-0 h-full rounded-r-[10px] px-[20px] text-center py-[12px] leading-6`}
                    style={{
                      background: cardColor[index],
                    }}
                  >
                    <RenderAtom
                      item={obj?.position5 || { value: obj?.count }}
                      renderType="text"
                      customClassName={"text-[30px] text-white font-black"}
                    />
                    <p className="text-[16px] font-medium text-white">санал</p>
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Leaders;
