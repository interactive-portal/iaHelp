import { useContext, useEffect, useState } from "react";
import Link from "next/link";
// import RenderMolecule from "@molecule/RenderMolecule";
import WidgetWithId from "middleware/components/WidgetStandart/WidgetWithId";
import useSWR from "swr";
import _ from "lodash";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Modal, Rate, notification } from "antd";
import { CKEditor } from "ckeditor4-react";
import { htmlDecode } from "@/util/helper";
// import useCallProcess from "@/middleware/components/dataHook/useCallProcess";
import SideBar from "./sidebar";
import { useCloud } from "hooks/use-cloud";
import fetchJson from "@/lib/fetchJson";
import QRCode from "react-qr-code";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import BlockDiv from "@/components/common/Block/BlockDiv";
import RenderAtom from "@/components/common/Atom/RenderAtom";

const SingleKnowLedge = () => {
  const {
    config,
    readyDatasrc,
    positionConfig,
    gridJsonConfig,
    pathConfig,
    widgetnemgooReady,
    Title,
    dataMutate,
  } = useContext(WidgetWrapperContext);
  const router = useRouter();
  console.log("readyDatasrc :>> ", readyDatasrc);
  const { data: session } = useSession();
  //   const { callProcess } = useCallProcess();
  const [openEdit, setOpenEdit] = useState(false);
  const [title, setTitle] = useState(readyDatasrc[0]?.name);
  const [getData, setGetData] = useState<any>(readyDatasrc[0]?.description);

  const [show, setShow] = useState(true);
  const [feautures, setFeautures] = useState(false);
  // const [titleData, setTitleData] = useState<any>();

  const [comment, setComment] = useState(true);
  const relatedknowledge = _.values(readyDatasrc[0]?.relatedknowledge);
  const parentItem = router.query?.lparentid;
  const [menu, setMenu] = useState(relatedknowledge.length == 0 ? false : true);
  const { pathname } = widgetnemgooReady;

  let parentid = router.query.lparentid;

  const cloudContext = useCloud();
  const metaNameV2 = cloudContext.hostObject.metaNameV2;
  const myCriteria = {
    filterId: parentid || 166479296622331,
  };
  const criteria = JSON.stringify(myCriteria);

  const [srcTitle, setTitleData] = useState<any>([]);

  //   const fetchDataHeader = async () => {
  //     const data = await fetchJson(
  //       `/api/get-data-v2?metaid=1682912998334502&metaNameV2=${metaNameV2}&criteria=${criteria}`
  //     );
  //     if (data?.status == "success") {
  //       setTitleData(_.values(data?.result));
  //     }
  //   };

  const location = window.location.href;
  const copyUrl = () => {
    navigator.clipboard.writeText(location);
    notification.open({
      message: "Амжилттай хууллаа",
      description: "",
      duration: 5,
    });
  };

  //   useEffect(() => {
  //     if (_.isEmpty(srcTitle)) fetchDataHeader();
  //   }, []);

  // console.log("srcTitle :>> ", srcTitle);
  const Submit = async () => {
    // const result = await callProcess({
    //   command: "createKnowledgeDV_001",
    //   parameter: {
    //     name: title,
    //     description: getData,
    //     typeId: readyDatasrc[0]?.typeid,
    //     // author: readyDatasrc[0]?.author,
    //     code: Number(readyDatasrc[0]?.id),
    //     orderNumber: readyDatasrc[0]?.ordernumber,
    //     parentId: readyDatasrc[0]?.parentid,
    //     categoryId: Number(readyDatasrc[0]?.code),
    //     wfmStatusId: "1683627268863682",
    //     relatedIndicatorId: readyDatasrc[0]?.id,
    //     relatedKnowledge: readyDatasrc[0]?.relatedknowledge
    //       ? _.values(readyDatasrc[0]?.relatedknowledge).map(
    //           (item: any, index: number) => {
    //             return {
    //               id: item?.id,
    //               icon: item?.icon,
    //               knowledgeName: item?.knowledgename,
    //               trgKnowledgeId: item?.trgknowledgeid,
    //               srcKnowledgeId: item?.srcknowledgeid,
    //               srcTableName: item?.srctablename,
    //               trgTableName: item?.trgtablename,
    //             };
    //           }
    //         )
    //       : [],
    //     kpiDynamicDtl:
    //       readyDatasrc[0]?.kpidynamicdtl &&
    //       _.values(readyDatasrc[0]?.kpidynamicdtl).map(
    //         (item: any, index: number) => {
    //           return {
    //             id: item?.id,
    //           };
    //         }
    //       ),
    //     kmTypeMap:
    //       readyDatasrc[0]?.kmtypemap &&
    //       _.values(readyDatasrc[0]?.kntypemap).map(
    //         (item: any, index: number) => {
    //           return {
    //             id: item?.id,
    //             indicatorId: item?.indicatorid,
    //             typeId: item?.typeid,
    //             valueType: item?.valuetype,
    //           };
    //         }
    //       ),
    //     kmCategoryMap:
    //       readyDatasrc[0]?.kmcategorymap &&
    //       _.values(readyDatasrc[0]?.kmcategorymap).map(
    //         (item: any, index: number) => {
    //           return {
    //             id: item?.id,
    //             categoryid: item?.categoryid,
    //             indicatorId: item?.indicatorId,
    //           };
    //         }
    //       ),
    //   },
    // });
    // if (result?.status == "success") {
    //   dataMutate();
    //   setOpenEdit(false);
    // }
  };

  const EmptyItem = () => {
    return (
      <div className="w-full text-center my-2">
        <p className="text-[#585858]">Хоосон байна</p>
      </div>
    );
  };

  return (
    <>
      {/* pageTitle test */}
      <BlockDiv customClassName="w-full  h-full " divNumber="div10">
        <BlockDiv
          customClassName={`flex mx-auto px-10 h-full py-10`}
          divNumber="divGridNumber"
          customStyle={{
            backgroundImage:
              "url(https://res.cloudinary.com/dzih5nqhg/image/upload/v1692773379/cloud/item/unsplash_5EhN4wbfvBc_rffgdk_ds3xnz.png)",
          }}
        >
          <BlockDiv customClassName="md:col-span-1 flex flex-col justify-between h-full col-span-12 px-2">
            <p className="text-white flex text-center sm:text-xs xs:text-[8px] md:text-base">
              <span className="opacity-80 hover:text-white cursor-pointer">
                Нүүр{" "}
              </span>
              {srcTitle.map((item: any, index: number) => {
                return (
                  <div key={index}>
                    <p
                      className="ml-1 cursor-pointer hover:text-white"
                      key={item?.id || index}
                      onClick={() => {
                        if (index > 0) {
                          router.push(
                            {
                              pathname: pathname || "/lessons/content",
                              query: {
                                filterid: item?.id,
                                lparentid: router.query?.lparentid,
                              },
                            },
                            undefined,
                            {
                              shallow: false,
                            }
                          );
                        } else {
                          router.push({
                            pathname: "/category",
                            query: {
                              fparentid: item?.id,
                            },
                          });
                        }
                      }}
                    >
                      {item?.name && <span className="opacity-80">/ </span>}
                      <span className="opacity-80 hover:opacity-100">
                        {item?.name}
                      </span>
                    </p>
                  </div>
                );
              })}
            </p>
            <RenderAtom
              item={
                srcTitle[0]?.mainname || {
                  value: "Контентийн гарчиг",
                }
              }
              renderType="title"
              customClassName={
                "text-lg text-white md:pt-4 sm:text-base xs:text-sm md:text-2xl"
              }
            />{" "}
            <RenderAtom
              item={
                srcTitle[0]?.description || {
                  value: "Контентийн тайлбар",
                }
              }
              renderType="text"
              customProps={{
                truncateRow: 4,
              }}
              customClassName={
                "md:w-1/2 lg:w-full xl:w-1/2 text-white md:text-[16px] text-[12px]"
              }
              customStyle={{
                color: "white !important",
              }}
            />
            <div className="flex items-center">
              <Rate
                allowHalf
                defaultValue={Number(srcTitle[0]?.starval) || 4}
                disabled
                className="text-sm py-4"
                style={{ color: "#FFBB00" }}
              />
              <span className="text-white pl-2">
                {" "}
                {srcTitle[0]?.starval} / {srcTitle[0]?.viewcount}
              </span>
            </div>
            <span className=" mb-0 text-white opacity-80 flex xs:text-xs md:text-sm">
              {srcTitle[0]?.lastmodify}
            </span>
          </BlockDiv>
          <BlockDiv
            customClassName="md:col-span-1 md:flex md:flex-row-reverse md:h-[130px] col-span-12 h-[50px] sm:self-center xs:self-center md:self-end ml-auto"
            divNumber={"pageTitleDivRight"}
          >
            <RenderAtom
              item={{ value: srcTitle[1]?.picture }}
              renderType="image"
              customClassName={
                "md:w-[130px] h-full md:rounded-[20px] w-[50px] rounded[10px]"
              }
            />
            <BlockDiv customClassName="flex flex-col items-end justify-end mr-4 mb-4 text-right">
              {/* <RenderAtom
                item={readyDatasrc[0]?.position25 || { value: "Менежер" }}
                renderType="text"
                customStyle={{
                  width: "auto",
                }}
              /> */}
              <RenderAtom
                item={{ value: srcTitle[1]?.fullname }}
                renderType="title"
                customClassName={
                  "sm:text-base xs:text-sm md:text-2xl text-white"
                }
                customStyle={{
                  width: "auto",
                }}
              />
            </BlockDiv>
          </BlockDiv>
        </BlockDiv>
      </BlockDiv>
      <div className="grid grid-flow-row-dense md:grid-cols-9 lg:grid-cols-12  xl:grid-cols-12 mx-10 min-h-screen">
        <SideBar options={widgetnemgooReady} />
        <div className="md:col-span-5 lg:col-span-6 xl:col-span-8 3xl:col-span-8 px-6 py-4 bg-white">
          {(readyDatasrc[0]?.position22 && (
            <div className="">
              {openEdit ? (
                <>
                  <input
                    className="font-semibold text-[16px] rounded-lg mb-6 mt-2 w-full border-[#E1E1E1] text-[#585858] focus:outline-none focus:border-[#E1E1E1] focus:ring-0"
                    type="text"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                  />
                  <CKEditor
                    // className="min-h-[400px]"
                    initData={htmlDecode(readyDatasrc[0]?.description)}
                    config={{
                      // enterMode: ENTER_P,
                      // shiftEnterMode: ENTER_BR,
                      stylesSet: addStyles,
                      extraPlugins: "colorbutton,colordialog,font",
                      removeButtons: "exportpdf,save,smiley,about,language",
                    }}
                    onChange={(event) => setGetData(event.editor.getData())}
                  />
                  <button
                    className="p-2 bg-[#699BF7] text-[16px] font-medium text-white cursor-pointer float-right mt-[30px] rounded-[20px] px-4"
                    onClick={() => Submit()}
                  >
                    Хадгалах
                  </button>
                </>
              ) : (
                <>
                  <RenderAtom
                    item={
                      readyDatasrc[0]?.position1 || {
                        value: readyDatasrc[0]?.name,
                      }
                    }
                    renderType="text"
                    customClassName={
                      "xl:text-3xl lg:text-2xl xs:text-xl pb-6 pt-2"
                    }
                  />

                  <RenderAtom
                    item={readyDatasrc[0]?.position22}
                    renderType="htmltext"
                    customClassName={
                      "text-[30px] py-6 bg-red-500 overflow-auto"
                    }
                  />
                </>
              )}
            </div>
          )) ||
            readyDatasrc.map((item: any, index: number) => {
              return (
                <></>
                // <RenderMolecule
                //   key={item?.id || index}
                //   renderType="card"
                //   item={{
                //     item: {
                //       title: item?.position1,
                //       image: item?.position2,
                //       description: item?.position3,
                //       button: item?.position10,
                //     },
                //   }}
                // />
              );
            })}
        </div>
        <div className="md:col-span-2 lg:col-span-3 xl:col-span-2 3xl:col-span-2 pl-4 py-4">
          <>
            <BlockDiv
              customClassName="cursor-pointer flex pt-4 items-center justify-between"
              onClick={() => setFeautures((prev) => !prev)}
              divNumber={"divRightSideFeautures"}
            >
              <RenderAtom
                item={{ value: "Feautures" }}
                renderType="text"
                customClassName="text-lg text-citizen-title font-semibold"
              />
              {feautures == true ? (
                <i className="fa-solid fa-chevron-down"></i>
              ) : (
                <i className="fa-solid fa-chevron-up"></i>
              )}
            </BlockDiv>
            {feautures == true && (
              <>
                {_.isEmpty(relatedknowledge) && <EmptyItem />}
                {relatedknowledge.map((menu: any, index: number) => {
                  return (
                    <li
                      key={index}
                      className="py-1 list-none my-2 px-2 cursor-pointer border-transparent border-l hover:border-blue-500 rounded-none"
                    >
                      <Link
                        href={`/category/detail?id=${menu.trgknowledgeid}&lparentid=${parentItem}`}
                        className="hover:text-blue-500 text-[#585858] hover:opacity-100 hover:font-medium"
                        shallow={true}
                      >
                        {menu.knowledgename}
                      </Link>
                    </li>
                  );
                })}
              </>
            )}
          </>
          <>
            <div
              className="cursor-pointer flex pt-2 items-center justify-between"
              onClick={() => setMenu((prev) => !prev)}
            >
              <RenderAtom
                item={{ value: "Холбоотой" }}
                renderType="text"
                customClassName="text-lg text-citizen-title font-semibold"
              />
              {menu == true ? (
                <i className="fa-solid fa-chevron-down"></i>
              ) : (
                <i className="fa-solid fa-chevron-up"></i>
              )}
            </div>
            {menu == true && (
              <>
                {_.isEmpty(relatedknowledge) && <EmptyItem />}
                {relatedknowledge.map((menu: any, index: number) => {
                  return (
                    <li
                      key={index}
                      style={{
                        color: "#585858",
                        fontWeight: "semibold",
                      }}
                      className="py-1 list-none my-2 px-2 cursor-pointer border-transparent border-l hover:border-blue-500 rounded-none"
                    >
                      <Link
                        href={`/lessons/content?filterid=${menu?.trgknowledgeid}&lparentid=${parentItem}`}
                        className="hover:text-blue-500 text-[#585858] hover:opacity-100 hover:font-medium"
                        // shallow={true}
                      >
                        {menu.knowledgename}
                      </Link>
                    </li>
                  );
                })}
              </>
            )}
          </>
          <>
            <div
              className="cursor-pointer flex pt-2 items-center justify-between "
              onClick={() => setShow((prev) => !prev)}
            >
              <RenderAtom
                item={{ value: "Хавсралт" }}
                renderType="text"
                customClassName="text-lg text-citizen-title  font-semibold"
              />
              {show == true ? (
                <i className="fa-solid fa-chevron-down"></i>
              ) : (
                <i className="fa-solid fa-chevron-up"></i>
              )}
            </div>
            {show == true && (
              <>{/* <WidgetWithId widgetId={widgetnemgooReady?.fileId} /> */}</>
            )}
          </>
          <>
            <div
              className="cursor-pointer flex pt-2 items-center justify-between"
              onClick={() => setComment((prev) => !prev)}
            >
              <RenderAtom
                item={{ value: "Сэтгэгдэл" }}
                renderType="text"
                customClassName="text-lg text-citizen-title  font-semibold "
              />
              {comment == true ? (
                <i className="fa-solid fa-chevron-down"></i>
              ) : (
                <i className="fa-solid fa-chevron-up"></i>
              )}
            </div>
            {comment && (
              <>
                {/* <WidgetWithId widgetId="16625551068269" /> */}
                {/* <WidgetWithId widgetId={widgetnemgooReady?.commentId} /> */}
              </>
            )}
          </>
          <BlockDiv customClassName="flex flex-col mt-[20px] justify-start bg-white ">
            {/* <RenderAtom
              item={{ value: "Холбоос" }}
              renderType="text"
              customClassName={"text-[18px] font-semibold "}
              customStyle={{ color: "#585858" }}
            /> */}
            {/* <input
              value={location}
              onFocus={(event) => event.target.select()}
              className="border-none px-0  border-[#A0A0A0] p-[12px] rounded-[5px] my-[15px] w-full text-[14px] focus-visible:outline-none"
            ></input> */}
            <RenderAtom
              item={{ value: "Холбоос хуулах" }}
              renderType="button"
              customClassName={
                "text-[#0C529D] w-full px-2 py-4 justify-start text-lg text-citizen-title font-semibold "
              }
              onClick={() => copyUrl()}
            />
            {/* {location} */}
            <QRCode
              size={125}
              style={{
                height: "auto",
                maxWidth: "100%",
                width: "100%",
                padding: "25px",
                margin: "auto",
              }}
              value={location}
              viewBox={`0 0 256 256`}
            />
          </BlockDiv>
        </div>
      </div>
      <style>
        {`
          .htmltext img {
            width: 100% !important;
            height: auto !important
          }
          `}
      </style>
    </>
  );
};
export default SingleKnowLedge;

const addStyles = [
  {
    name: "UPPER",
    element: "span",
    styles: {
      "text-transform": "uppercase",
    },
  },
  {
    name: "lower",
    element: "span",
    styles: {
      "text-transform": "lowercase",
    },
  },
  {
    name: "Capitalize",
    element: "span",
    styles: {
      "text-transform": "capitalize",
    },
  },
  {
    name: "Гарчиг ",
    element: "h2",
    styles: {
      color: "#000",
      "font-style": "normal",
      "font-weight": "700",
      "font-size": "20px",
    },
  },
  {
    name: "Дэд гарчиг ",
    element: "h3",
    styles: {
      color: "#000",
      "font-weight": "700",
      "font-size": "18px",
    },
  },
  {
    name: "Гарчиг",
    element: "h2",
    styles: {
      color: "#3498db",
      "font-style": "normal",
      "font-weight": "700",
      "font-size": "20px",
    },
  },
  {
    name: "Дэд гарчиг",
    element: "h3",
    styles: {
      color: "#31708f",
      "font-weight": "700",
      "font-size": "18px",
    },
  },
  {
    name: "Дэлгэрэнгүй",
    element: "p",

    styles: {
      color: "#000",
      "font-style": "normal",
      "font-size": "14px",
      "text-align": "justify",
    },
  },
  {
    name: "Мэдээлэл",
    element: "div",
    styles: {
      padding: "20px 15px",
      background: "#E6F1FF",
      border: "1px solid #E6F1FF",
      "border-radius": "4px",
      //   with: "100%",
      //   display: "block",
      "font-size": "12px",
      color: "#3382E7",
    },
  },
  {
    name: "Амжилттай",
    element: "div",
    styles: {
      padding: "20px 15px",
      background: "#DBF6EF",
      "border-left": "4px solid #28AE86",
      //   with: "100%",
      //   display: "block",
      color: "#28AE86",
      "border-radius": "4px",
      "font-size": "12px",
    },
  },

  {
    name: "Aнхааруулга",
    element: "div",
    styles: {
      padding: "20px 15px",
      background: "#FFF0DA",
      "border-left": "4px solid #F19317",
      //   with: "100%",
      //   display: "block",
      "border-radius": "4px",
      color: "#F19317",
      "font-size": "12px",
    },
  },
  {
    name: "Алдаа",
    element: "div",
    styles: {
      padding: "20px 15px",
      background: "#fadad9",
      "border-left": "4px solid #E64442",
      //   with: "100%",
      //   display: "block",
      color: "#E64442",
      "border-radius": "4px",
      "font-size": "12px",
    },
  },

  {
    name: "Жишээ код",
    element: "code",
    styles: {
      padding: "20px 15px",
      margin: "15px 0",
      background: "#2f2e2e",
      border: "1px solid #000000",
      color: "#fff6f6",
      with: "100%",
      "border-radius": "4px",
      display: "block",
      "font-size": "12px",
    },
  },

  {
    name: "Marker",
    element: "span",
    attributes: { class: "marker" },
  },

  { name: "Big", element: "big" },
  { name: "Small", element: "small" },
  { name: "Typewriter", element: "tt" },

  { name: "Deleted Text", element: "del" },
  { name: "Inserted Text", element: "ins" },

  /* Object styles */

  {
    name: "Styled Image (left)",
    element: "img",
    attributes: { class: "left" },
  },
  {
    name: "Styled Image (right)",
    element: "img",
    attributes: { class: "right" },
  },

  {
    name: "Compact Table",
    element: "table",
    attributes: {
      cellpadding: "5",
      cellspacing: "0",
      border: "1",
      bordercolor: "#ccc",
    },
    styles: {
      "border-collapse": "collapse",
    },
  },

  {
    name: "Borderless Table",
    element: "table",
    styles: {
      "border-style": "hidden",
      "background-color": "#E6E6FA",
    },
  },
  {
    name: "Square Bulleted List",
    element: "ul",
    styles: { "list-style-type": "square" },
  },

  /* Widget styles */

  {
    name: "Clean Image",
    type: "widget",
    widget: "image",
    attributes: { class: "image-clean" },
  },
  {
    name: "Grayscale Image",
    type: "widget",
    widget: "image",
    attributes: { class: "image-grayscale" },
  },

  {
    name: "Featured Snippet",
    type: "widget",
    widget: "codeSnippet",
    attributes: { class: "code-featured" },
  },

  {
    name: "Featured Formula",
    type: "widget",
    widget: "mathjax",
    attributes: { class: "math-featured" },
  },

  {
    name: "240p",
    type: "widget",
    widget: "embedSemantic",
    attributes: { class: "embed-240p" },
    group: "size",
  },
  {
    name: "360p",
    type: "widget",
    widget: "embedSemantic",
    attributes: { class: "embed-360p" },
    group: "size",
  },
  {
    name: "480p",
    type: "widget",
    widget: "embedSemantic",
    attributes: { class: "embed-480p" },
    group: "size",
  },
  {
    name: "720p",
    type: "widget",
    widget: "embedSemantic",
    attributes: { class: "embed-720p" },
    group: "size",
  },
  {
    name: "1080p",
    type: "widget",
    widget: "embedSemantic",
    attributes: { class: "embed-1080p" },
    group: "size",
  },

  // Adding space after the style name is an intended workaround. For now, there
  // is no option to create two styles with the same name for different widget types. See https://dev.ckeditor.com/ticket/16664.
  {
    name: "240p ",
    type: "widget",
    widget: "embed",
    attributes: { class: "embed-240p" },
    group: "size",
  },
  {
    name: "360p ",
    type: "widget",
    widget: "embed",
    attributes: { class: "embed-360p" },
    group: "size",
  },
  {
    name: "480p ",
    type: "widget",
    widget: "embed",
    attributes: { class: "embed-480p" },
    group: "size",
  },
  {
    name: "720p ",
    type: "widget",
    widget: "embed",
    attributes: { class: "embed-720p" },
    group: "size",
  },
  {
    name: "1080p ",
    type: "widget",
    widget: "embed",
    attributes: { class: "embed-1080p" },
    group: "size",
  },
];
