import { useContext } from "react";
import WidgetWrapperContext from "@/components/widget/WidgetWrapper";
import RenderAtom from "@/components/common/atom/renderAtom";

import _ from "lodash";

export default function InteractiveFooter() {
  const {
    config,
    readyDatasrc,
    // positionConfig,
    // metaConfig,
    // gridJsonConfig,
    // pathConfig,
    // widgetnemgooReady,
  } = useContext(WidgetWrapperContext);

  // console.log("footer log", readyDatasrc);

  const staticItem1 = {};
  const staticItem2 = {};
  const staticItem3 = {};
  const staticItem4 = [
    "fa-brands fa-google",
    "fa-brands fa-facebook-f",
    "fa-brands fa-instagram",
    "fa-brands fa-twitter",
  ];
  return (
    <>
      <div className=" w-full h-[515px] bg- bg-[url('https://res.cloudinary.com/dzih5nqhg/image/upload/v1673252763/Community/Group_21981_lnb5lh.png')]">
        <div className="mx-auto container w-full flex flex-row justify-between pt-20">
          {/* col-1 */}
          <div>
            <RenderAtom
              item={{ value: staticItem3[0]?.logo }}
              renderType="image"
              customClassName={"w-auto h-auto object-contain"}
            />
            <div className="pt-8">
              <RenderAtom
                item={{ value: staticItem3[0]?.locationDes }}
                renderType="text"
                customClassName={"text-[14px] text-white "}
              />
            </div>
          </div>
          {/* col-2 */}
          <div>
            <RenderAtom
              item={{ value: "Бидэнтэй танилцах" }}
              renderType="title"
              customClassName={"text-[20px] text-white"}
            />
            <div className="flex flex-col pt-10 gap-y-2">
              {staticItem1?.map((item: any, index: number) => {
                return (
                  // eslint-disable-next-line react/jsx-key
                  <RenderAtom
                    item={{ value: item?.title }}
                    renderType="text"
                    customClassName="text-[14px] text-white cursor-pointer hover:text-gray-200"
                    key={item?.id || index}
                  />
                );
              })}
            </div>
          </div>
          {/* col-3 */}
          <div>
            <RenderAtom
              item={{ value: "Тусламж" }}
              renderType="title"
              customClassName={"text-[20px] text-white"}
            />
            <div className="flex flex-col pt-10 gap-y-2">
              {staticItem2?.map((item: any, index: number) => {
                return (
                  // eslint-disable-next-line react/jsx-key
                  <RenderAtom
                    item={{ value: item?.title }}
                    renderType="text"
                    customClassName="text-[14px] text-white cursor-pointer hover:text-gray-200"
                    key={item?.id || index}
                  />
                );
              })}
            </div>
          </div>
          {/* col-4 */}
          <div>
            <RenderAtom
              item={{ value: "Гар утсан дээрхи Апп" }}
              renderType="title"
              customClassName={"text-[20px] text-white"}
            />
            <div className="flex flex-row justify-center gap-x-[28px] pt-[30px]">
              <RenderAtom
                item={{
                  value:
                    "https://res.cloudinary.com/dhxf8xlsi/image/upload/v1674702539/IntractiveV2/image_44091_v2qgkl.png",
                }}
                renderType="image"
                customClassName={"w-auto h-[50px]"}
              />
              <RenderAtom
                item={{
                  value:
                    "https://res.cloudinary.com/dhxf8xlsi/image/upload/v1674702539/IntractiveV2/image_44090_siayaj.png",
                }}
                renderType="image"
                customClassName={"w-auto h-[50px]"}
              />
            </div>
            <div className="flex flex-row pt-10 gap-x-4">
              {staticItem4?.map((item: any, index: number) => {
                return (
                  // eslint-disable-next-line react/jsx-key
                  <div
                    className="w-[50px] h-[50px] flex items-center justify-center rounded-full border border-white"
                    key={item?.id || index}>
                    <RenderAtom
                      item={{ value: item }}
                      renderType="icon"
                      customClassName={"text-2xl text-white"}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
