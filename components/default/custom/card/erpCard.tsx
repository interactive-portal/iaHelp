import RenderAtom from "@/components/common/atom/renderAtom";
import WidgetWrapperContext from "@/components/widget/WidgetWrapper";
import Image from "next/image";
import React, { useContext, useState } from "react";
import Grid from "./grid";
import { useRouter } from "next/router";
import _ from "lodash";
import { TabsProps, Tabs } from "antd";
import AtomImage from "@/components/common/atom/atomImage";
import Link from "next/link";
import Masonry from "./masonry";
import { useTranslation } from "next-i18next";
import Category from "./category";
import HelpGrid from "./helpGrid";

export default function ErpCard({
  pDataSrc,
  pOptions,
}: {
  pDataSrc: any;
  pOptions: any;
}) {
  const { t } = useTranslation("translate");
  const { config, readyDatasrc, positionConfig, widgetnemgooReady } =
    useContext(WidgetWrapperContext);

  const staticItem = readyDatasrc[0] || (pDataSrc && pDataSrc[0]);
  const externalData = staticItem?.externalData;
  const options = widgetnemgooReady?.options || (pOptions && pOptions);
  const startPosition = widgetnemgooReady?.options?.startPosition;
  const router = useRouter();
  const [active, setActive] = useState(0);
  let newArr = _.map(readyDatasrc, (o) => _.pick(o, ["categorydesc"]));
  let grouped = _.keys(_.mapValues(_.groupBy(newArr, "categorydesc")));
  const [filterItem, setFilterItem]: any = useState("Veritech ERP");

  const selectdata = _.filter(readyDatasrc, {
    categorydesc: filterItem,
  });

  let renderData =
    readyDatasrc.length > 1 ? readyDatasrc : pDataSrc && pDataSrc;

  let dataSrc: any = grouped.length > 2 ? selectdata : renderData;

  const onFilterEvent = (e: any, item: any) => {
    e.preventDefault();
    setFilterItem(item);
  };

  const gridCount = options?.gridCount || 3;
  const dark = options?.dark || "";

  const renderExternalData = () => {
    return (
      <>
        {Array.isArray(externalData) &&
          externalData.length > 0 &&
          externalData?.map((row: any, index: any) => {
            return (
              <div className="flex flex-col gap-y-2" key={row?.id || index}>
                {row?.icon && row?.title && (
                  <div className="flex flex-row items-center gap-x-2">
                    <RenderAtom
                      item={{ value: row?.icon }}
                      renderType="image"
                      customClassName={
                        "w-auto h-auto object-cover object-center"
                      }
                    />
                    <RenderAtom
                      item={{ value: t(row?.title) }}
                      renderType="title"
                      customClassName={"text-[18px] text-[#2C2C51]"}
                    />
                  </div>
                )}

                <RenderAtom
                  item={{ value: t(row?.description) }}
                  renderType="text"
                  customClassName={
                    "text-[18px] text-[#7B7B93] leading-[28px] items-center text-left flex font-medium "
                  }
                />
              </div>
            );
          })}
      </>
    );
  };

  const media = (image: any) => {
    const ddd = process.env.IMAGEROOTURL || "https://dev.veritech.mn/";
    let imgSrc = image?.value;
    if (imgSrc?.startsWith("storage/")) {
      imgSrc = `${ddd}${imgSrc}`;
    }
    return (
      <div className="relative w-full md:w-1/2 px-6 md:py-3 sm:py-1  xs:py-0 col-span-6">
        <div className="md:w-[470px] xs:w-[300px] md:h-[470px] xs:h-[300px] relative">
          <Image
            src={imgSrc || staticItem?.mainimage}
            alt="feature image"
            fill
            // height={490}
            // width={490}
            style={{
              objectFit: "contain",
            }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        {/* <RenderAtom
          item={_.isString(image) ? { value: image } : image}
          renderType="image"
          customClassName={"md:w-"}
        /> */}
      </div>
    );
  };
  const description = (item: any, i: number) => {
    return (
      <div className="flex flex-col justify-center w-full md:w-1/2 md:px-2 lg:py-0 xs:py-11 xs:px-1">
        <div className="pl-4 flex flex-col justify-evenly gap-5">
          {/* h-[55%] */}
          <RenderAtom
            item={item?.position1 || { value: t(item?.title) }}
            renderType="title"
            customClassName={"text-[#2C2C51] text-left text-3xl"}
          />
          {item?.subtitle && (
            <RenderAtom
              item={item?.position40 || { value: t(item?.subtitle) }}
              renderType="text"
              customClassName={
                "text-[#2C2C51] lg:text-[22px] xs:text-xs uppercase my-4"
              }
            />
          )}
          <RenderAtom
            item={item?.position3 || { value: item?.body }}
            renderType="text"
            customClassName={`sm:text-lg xs:text-base text-[#7B7B93] text-left p-0 ${
              i === 2 ? ".." : ".."
            }  overflow-hidden`}
            customStyle={{
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: options?.lineTextCountDesc || "3",
              WebkitBoxOrient: "vertical",
            }}
          />

          <Link href={item?.url || "/"} target="_blank">
            <div className=" flex  items-center   md:w-[180px] sm:w-[150px] xs:w-[130px] md:h-[42px] sm:h-[40px] xs:h-[30px] md:text-[18px] sm:text-[14px] xs:text-[12px] bg-interactive rounded-full hover:opacity-70    text-[#fff]">
              <span className="inline-block w-full justify-items-center  text-center ">
                {" "}
                {t("WPD_0001")}
              </span>
            </div>
            {/* <RenderAtom
              item={item?.position9}
              renderType="button"
              customClassName={
                "font-bold md:w-[200px] sm:w-[150px] xs:w-[130px] md:h-[50px] sm:h-[40px] xs:h-[30px] md:text-[18px] sm:text-[14px] xs:text-[12px] bg-interactive rounded-[10px] hover:opacity-70 rounded-full   text-[#fff]"
              }
              // customStyle={{ fontSize: "18px" }}dd
            /> */}
          </Link>
          {/* </button> */}
        </div>
      </div>
    );
  };

  const mixedContent = (item: any, i: number) => {
    if (i === 0) {
      return (
        <div className="flex flex-col md:flex-row justify-between mt-2">
          {media(item?.position2 || item?.imgurl)}
          {description(item, i)}
        </div>
      );
    } else if (i === 1) {
      return (
        <div className="flex flex-col-reverse md:flex-row  justify-between">
          {description(item, i)}
          {media(item?.position2 || item?.imgurl)}
        </div>
      );
    } else if (i === 2) {
      return (
        <div className="flex flex-col md:flex-row  justify-between md:mb-10 md:mt-5">
          {media(item?.position2 || item?.imgurl)}
          {description(item, i)}
        </div>
      );
    } else if (i === 3) {
      return (
        <div className="flex flex-col-reverse md:flex-row  justify-between md:mb-10 md:mt-5">
          {description(item, i)}
          {media(item?.position2 || item?.imgurl)}
        </div>
      );
    } else if (i === 4) {
      return (
        <div className="flex flex-col md:flex-row  justify-between md:mb-10 md:mt-5">
          {media(item?.position2 || item?.imgurl)}
          {description(item, i)}
        </div>
      );
    } else if (i === 5) {
      return (
        <div className="flex flex-col-reverse md:flex-row  justify-between md:mb-10 md:mt-5">
          {description(item, i)}
          {media(item?.position2 || item?.imgurl)}
        </div>
      );
    }
  };

  const content = () => {
    switch (options?.cardType) {
      case "helpGrid":
        return <HelpGrid data={readyDatasrc} options={options} />;
      case "grid":
        return <Grid data={readyDatasrc} options={options} />;
      case "category":
        return <Category data={readyDatasrc} options={options} />;
      case "masonry":
        return <Masonry data={readyDatasrc} options={options} />;
      case "right":
        return (
          <div className="z-5 absolute text-[#0C529D] pt-[20px] w-full h-full flex flex-col gap-y-[35px] items-center justify-center bg">
            <div className="container mx-auto">
              <RenderAtom
                item={{ value: t(staticItem?.title) }}
                renderType="title"
                customClassName={
                  "text-[50px] text-white w-[700px] leading-[59px] items-center text-right h-[100px] flex  font-bold "
                }
              />
              <RenderAtom
                item={{ value: t(staticItem?.description) }}
                renderType="title"
                customClassName={
                  "text-[18px] text-white w-[700px] leading-[28px] items-center text-left h-[210px] flex  font-medium "
                }
              />
              <div className="flex items-center justify-start transition duration-150 ease-in-out">
                <RenderAtom
                  item={{ value: staticItem?.button }}
                  renderType="button"
                  customClassName={
                    "text-[18px] text-black px-10 rounded-full hover:opacity-80 transition"
                  }
                />
              </div>
            </div>
          </div>
        );

      case "left":
        return (
          <div className="grid grid-cols-2 gap-4">
            <div className={`${options?.extraClassName}`}>
              <RenderAtom
                item={{ value: t(staticItem?.title) }}
                renderType="title"
                customClassName={
                  "text-[50px] w-[700px] leading-[59px] items-center text-left h-[100px] flex font-bold "
                }
              />

              {/* description тохируулсан бол харуулах */}
              {staticItem?.description && (
                <RenderAtom
                  item={{ value: t(staticItem?.description) }}
                  renderType="title"
                  customClassName={
                    "text-[18px] w-[700px] leading-[28px] items-center text-left flex font-medium "
                  }
                />
              )}

              {renderExternalData()}

              {/* Товч ашиглах бол харуулна */}
              {staticItem?.button && (
                <div className="flex items-center justify-start transition duration-150 ease-in-out">
                  <RenderAtom
                    item={{ value: staticItem?.button }}
                    renderType="button"
                    customClassName={
                      "text-[18px] text-white px-10 rounded-full hover:opacity-80 transition bg-[#F8636B]"
                    }
                  />
                </div>
              )}
            </div>

            <div className="text-center block relative">
              <Image src={staticItem?.mainimage} alt="feature image" fill />
            </div>
          </div>
        );

      case "rightCard":
        return (
          <div className="grid grid-cols-2 gap-4 py-7">
            <div className={`${options?.extraClassName}`}>
              <RenderAtom
                item={{ value: t(staticItem?.title) }}
                renderType="title"
                customClassName={
                  "text-[40px] w-[700px] leading-[47px] items-center text-[#3C3C3C] text-left h-[100px] flex font-bold "
                }
              />

              {/* description тохируулсан бол харуулах */}
              {staticItem?.description && (
                <RenderAtom
                  item={{ value: t(staticItem?.description) }}
                  renderType="title"
                  customClassName={
                    "text-[18px] w-[700px] leading-[30px] text-[#67748E] items-center text-left flex font-medium "
                  }
                />
              )}
            </div>

            <div className="flex text-center  relative items-center justify-center">
              <RenderAtom
                renderType="image"
                customClassName={"w-auto h-full"}
                item={{
                  value: staticItem?.mainimage,
                }}
              />
            </div>
          </div>
        );

      case "leftCard":
        return (
          <div className="grid grid-cols-2 gap-4 py-7">
            <div className="flex text-center  relative items-center justify-center">
              <RenderAtom
                renderType="image"
                customClassName={"w-auto h-full"}
                item={{
                  value: staticItem?.mainimage,
                }}
              />
            </div>
            <div className={`${options?.extraClassName}`}>
              <RenderAtom
                item={{ value: t(staticItem?.title) }}
                renderType="title"
                customClassName={
                  "text-[40px] w-[700px] leading-[47px] items-center text-[#3C3C3C] text-left h-[100px] flex font-bold "
                }
              />

              {/* description тохируулсан бол харуулах */}
              {staticItem?.description && (
                <RenderAtom
                  item={{ value: t(staticItem?.description) }}
                  renderType="title"
                  customClassName={
                    "text-[18px] w-[700px] leading-[30px] text-[#67748E] items-center text-left flex font-medium "
                  }
                />
              )}
            </div>
          </div>
        );

      case "gridTwoCard":
        return (
          <div className="xl:grid lg:flex xs:flex items-center xl:overflow-hidden xs:overflow-scroll grid-cols-1 lg:grid-cols-2 gap-6 z-10 8xl:px-0 lg:px-2 xs:px-2 p-6">
            {readyDatasrc.map((row: any, index: number) => {
              return (
                <div
                  key={index}
                  className="flex flex-col xl:min-w-auto lg:min-w-[500px] xs:min-w-[280px] sm:flex-row w-full bg-transparent rounded-[10px] cursor-pointer relative p-[30px] gap-5"
                >
                  <div className="flex-none w-[155px] max-h-[160px]">
                    <RenderAtom
                      renderType="image"
                      item={
                        row.position6 || {
                          value:
                            "https://res.cloudinary.com/dzih5nqhg/image/upload/v1671618805/Proliance/Frame_22069_1_yqk4c7.png",
                        }
                      }
                      customClassName={"w-full h-auto max-h-[160px]"}
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    <RenderAtom
                      renderType="text"
                      customClassName="lg:text-[26px] sm:text-2xl xs:text-lg font-bold lg:leading-[32px] text-[#3C3C3C]"
                      item={row.position1 || { value: t(row.title) }}
                    />
                    <RenderAtom
                      renderType="text"
                      customClassName="text-[16px] leading-[26px] text-[#67748E] line-clamp-3"
                      item={row.position3 || { value: t(row.description) }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        );

      case "imageLeft":
        return (
          <div className="flex flex-col md:flex-row justify-center items-center md:justify-between gap-5 w-full">
            <div className="flex flex-col md:w-1/2 xs:w-full items-center justify-center">
              <RenderAtom
                renderType="image"
                item={{
                  value:
                    staticItem?.mainimage ||
                    "https://res.cloudinary.com/dzih5nqhg/image/upload/v1686055101/all_mlmu7j.jpg",
                }}
                customClassName={"w-auto max-h-[420px] h-full"}
              />
            </div>
            <div className="flex flex-col justify-center items-center md:items-start gap-5 md:w-1/2">
              <RenderAtom
                renderType="title"
                item={{ value: t(staticItem?.title) || "Дэмжлэг үйлчилгээ" }}
                customClassName={`${options.titleClassName} xs:text-[1.5rem] md:text-[40px] text-center md:text-start font-bold md:leading-[46px] text-[#fff]`}
              />
              <RenderAtom
                renderType="text"
                item={{
                  value: t(staticItem?.description) || staticItem?.body,
                }}
                customClassName={`${options.descClassName} md:text-[16px] sm:text-lg xs:text-base leading-[26px] text-[#fff] font-normal w-full md:text-left xs:text-justify`}
              />
              {staticItem?.extraDesription && (
                <div className="flex flex-col w-full space-y-8">
                  {staticItem?.extraDesription.map(
                    (row: any, index: number) => {
                      return (
                        <div key={index} className="flex items-center gap-6">
                          <div className="flex-none">
                            <RenderAtom
                              renderType="image"
                              item={{ value: row.iconImage }}
                              customClassName={
                                "w-full max-w-[60px] h-auto object-contain"
                              }
                            />
                          </div>
                          <RenderAtom
                            renderType="text"
                            item={{ value: t(row.desc) }}
                            customClassName="break-words font-bold text-xl leading-6 text-[#3C3C3C]"
                          />
                        </div>
                      );
                    }
                  )}
                </div>
              )}
            </div>
          </div>
        );

      case "imageRight":
        return (
          <div className="flex flex-col md:flex-row justify-center items-center md:justify-between gap-10 w-full hContent">
            <div className="flex flex-col justify-center items-center md:items-start gap-5 md:w-1/2">
              <RenderAtom
                renderType="title"
                item={{ value: t(staticItem?.title) }}
                customClassName={`${options.titleClassName}  xs:text-[1.5rem] md:text-[40px] text-center md:text-start font-bold md:leading-[46px] text-[#2C2C51]`}
              />
              <RenderAtom
                renderType="text"
                item={{
                  value: t(staticItem?.description) || staticItem?.body,
                }}
                customClassName={`${options.descClassName} md:text-[18px] sm:text-lg xs:text-base leading-[30px] text-[#67748E] font-normal xs:text-justify`}
              />
              {staticItem?.extraDesription && (
                <div className="flex flex-col w-full space-y-8">
                  {staticItem?.extraDesription.map(
                    (row: any, index: number) => {
                      return (
                        <div key={index} className="flex items-center gap-6">
                          <div className="flex-none">
                            <RenderAtom
                              renderType="image"
                              item={{ value: row.iconImage }}
                              customClassName={
                                "w-full max-w-[60px] h-auto object-contain"
                              }
                            />
                          </div>
                          <RenderAtom
                            renderType="text"
                            item={{ value: t(row.desc) }}
                            customClassName="break-words font-bold text-xl leading-6 text-[#3C3C3C]"
                          />
                        </div>
                      );
                    }
                  )}
                </div>
              )}
              {staticItem?.button && (
                <div className="flex items-center justify-start transition duration-150 ease-in-out">
                  <RenderAtom
                    item={{ value: staticItem?.button }}
                    renderType="button"
                    customClassName={
                      "text-[18px] text-white px-10 rounded-full hover:opacity-80 transition bg-interactive"
                    }
                  />
                </div>
              )}
            </div>
            <div className="flex flex-col items-center justify-center md:w-1/2">
              <RenderAtom
                renderType="image"
                item={
                  staticItem?.position2 || {
                    value: staticItem?.mainimage || staticItem?.imgurl,
                  }
                }
                customClassName={"w-full max-w-[458px] h-auto"}
              />
            </div>
          </div>
        );

      case "gridColsCardCenter":
        return (
          <div className="flex flex-col w-full container mx-auto">
            <div
              className={`grid md:grid-cols-${gridCount} sm:grid-cols-1 xs:grid-cols-1 gap-8 text-center justify-center `}
            >
              {readyDatasrc.map((row: any, index: number) => {
                return (
                  <div
                    key={index}
                    className="flex  flex-col xl:p-[30px] lg:p-[30px] xs:p-4 border-t-8 border-transparent rounded-t-[5px] rounded-b-[10px] hover:border-white  hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] space-y-5 cursor-pointer hover:bg-[#0c0f24] xl:min-w-auto lg:min-w-auto xs:min-w-[260px]"
                  >
                    <RenderAtom
                      item={{ value: row.iconimage }}
                      renderType="image"
                      customClassName={
                        "md:w-[60px] md:h-[60px] xs:w-[40px] xs:h-[40px] object-cover rounded-[10px]  mx-auto"
                      }
                    />
                    <RenderAtom
                      renderType="title"
                      item={{ value: t(row.title) }}
                      customProps={{
                        truncateRow: 2,
                      }}
                      customClassName={
                        "text-[22px] font-bold leading-[30px] text-[#fff]"
                      }
                    />
                    <RenderAtom
                      renderType="text"
                      item={{ value: t(row.description) }}
                      customClassName={
                        "md:text-[18px] sm:text-lg xs:text-base leading-[30px] text-[#fff] xs:text-justify"
                      }
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );

      case "gridColsCardDark":
        return (
          <div className="flex flex-col w-full container mx-auto">
            <div
              className={`grid md:grid-cols-${gridCount} sm:grid-cols-1 xs:grid-cols-1 gap-8`}
            >
              {readyDatasrc.map((row: any, index: number) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col xl:p-[30px] lg:p-[30px] xs:p-4 border-t-8 border-transparent rounded-t-[5px] rounded-b-[10px] hover:border-white  hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] space-y-5 cursor-pointer hover:bg-[#0c0f24] xl:min-w-auto lg:min-w-auto xs:min-w-[260px]"
                  >
                    <RenderAtom
                      item={{ value: row.iconimage }}
                      renderType="image"
                      customClassName={
                        "md:w-[60px] md:h-[60px] xs:w-[40px] xs:h-[40px] object-cover rounded-[10px]"
                      }
                    />
                    <RenderAtom
                      renderType="title"
                      item={{ value: t(row.title) }}
                      customProps={{
                        truncateRow: 2,
                      }}
                      customClassName={
                        "text-[22px] font-bold leading-[30px] text-[#fff]"
                      }
                    />
                    <RenderAtom
                      renderType="text"
                      item={{ value: t(row.description) }}
                      customClassName={
                        "md:text-[18px] sm:text-lg xs:text-base leading-[30px] text-[#fff] xs:text-justify"
                      }
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );

      case "gridColsCard":
        return (
          <div className="flex flex-col w-full container mx-auto">
            <div
              className={`grid md:grid-cols-${gridCount} sm:grid-cols-1 xs:grid-cols-1`}
            >
              {readyDatasrc.map((row: any, index: number) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col xl:p-[30px] lg:p-[30px] xs:p-4 border-t-8 border-transparent rounded-t-[5px] rounded-b-[10px] hover:border-interactive  hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] space-y-5 cursor-pointer hover:bg-white xl:min-w-auto lg:min-w-auto xs:min-w-[260px]"
                  >
                    <RenderAtom
                      item={row.position8 || { value: row.iconimage }}
                      renderType="image"
                      customClassName={
                        "md:w-[60px] md:h-[60px] xs:w-[40px] xs:h-[40px] object-cover rounded-[10px]"
                      }
                    />
                    <RenderAtom
                      renderType="title"
                      item={{ value: t(row.title) }}
                      customProps={{
                        truncateRow: 2,
                      }}
                      customClassName={
                        "text-[22px] font-bold leading-[30px] text-[#3C3C3C]"
                      }
                    />
                    <RenderAtom
                      renderType="text"
                      item={{ value: t(row.description) || t(row.body) }}
                      customClassName={
                        "md:text-[18px] sm:text-lg xs:text-base leading-[30px] text-[#67748E] xs:text-justify"
                      }
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );

      case "randomPosition":
        return (
          <div className="w-full container mx-auto space-y-[60px]">
            {renderData?.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  className={`flex ${
                    startPosition == "right"
                      ? index % 2 != 0
                        ? "flex-col md:flex-row-reverse"
                        : "flex-col md:flex-row"
                      : index % 2 == 0
                      ? "flex-col md:flex-row-reverse"
                      : "flex-col md:flex-row"
                  } w-full container mx-auto justify-between items-start gap-10`}
                >
                  <div
                    className={`flex h-auto md:w-1/2 xs:w-full ${
                      index % 2 == 0 ? "justify-end" : "justify-start"
                    }`}
                  >
                    <RenderAtom
                      renderType="image"
                      item={
                        item.position || {
                          value:
                            item.mainimage ||
                            item.imgurl ||
                            item.backgroundimage,
                        }
                      }
                      customClassName="w-auto h-full"
                    />
                  </div>
                  <div className="flex flex-col  justify-center items-center md:items-start  md:w-1/2 xs:w-full gap-5">
                    <RenderAtom
                      renderType="title"
                      item={{ value: t(item.title) }}
                      customClassName="xs:text-[24px] md:text-[40px] text-[#3C3C3C]  md:leading-[47px] xs:leading-[30px] font-bold"
                    />
                    <RenderAtom
                      renderType="text"
                      item={{ value: t(item.description) || item.body }}
                      customClassName="text-[#67748E] text-base  leading-6 md:leading-8 font-normal"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        );

      default:
        return (
          <>
            {grouped &&
              (options.filter == "true" ? (
                <div className="w-full block col-span-12 container xl:overflow-hidden lg:overflow-hidden xs:overflow-scroll">
                  <ul className="xs:flex md:gap-6 sm:gap-3 sm:text-justify xs:text-center items-center w-max text-[#67748E] xl:overflow-hidden lg:overflow-hidden xs:overflow-scroll">
                    {grouped.map((item: any, index: any) => {
                      return (
                        <li
                          key={index}
                          className={`xl:w-auto xs:w-[150px]  list-item cursor-pointer hover:border-b-2 border-transparent hover:border-interactive font-[700] md:text-[18px] sm:text-[16px] xs:text-[14px] py-2 border-b-2 ${
                            active === index
                              ? "border-interactive text-interactive"
                              : "hover:text-interactive border-transparent"
                          }`}
                          onClick={(e: any) => {
                            onFilterEvent(e, item);
                          }}
                        >
                          <span onClick={() => setActive(index)}>
                            {item === "undefined" ? "" : item}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : (
                ""
              ))}
            {dataSrc
              ?.slice(0, options?.custom?.viewPerCount || "6")
              .map((item: any, index: any) => {
                if (options?.maxIndex) {
                  index = index + 1;
                } else {
                  index = index;
                }
                return <span key={index}>{mixedContent(item, index)}</span>;
              })}
          </>
        );
      // return <div className="grid grid-cols-2 gap-4">ddd</div>;
    }
  };

  return (
    <div
      className={`emerging-title relative w-full ${
        options?.className || " h-auto"
      }  min-h-[300px] transition-all `}
    >
      {content()}
      <style>
        {`
            .emerging-title {
              opacity: 0;
              transform: translateY(-10px);
              animation: emerge 2s forwards;
            }

            @keyframes emerge {
              from {
                opacity: 0;
                transform: translateY(-10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            `}
      </style>
    </div>
  );
}
