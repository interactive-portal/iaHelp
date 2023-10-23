import { useContext, useState } from "react";
import Link from "next/link";
import WidgetWithId from "middleware/components/WidgetStandart/WidgetWithId";
import useSWR from "swr";
import _ from "lodash";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Modal } from "antd";
import { CKEditor } from "ckeditor4-react";
import { htmlDecode } from "@/util/helper";
import SingleKnowLedge from "./singleKnowLedge";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import useCallProcess from "@/middleware/dataHook/useCallProcess";
import BlockDiv from "@/components/common/Block/BlockDiv";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import HelpComment from "../../project/help/helpComment";
import FileViewType from "./fileViewType";

const knowLedgeSingle = () => {
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
  const { data: session } = useSession();
  const { callProcess } = useCallProcess();
  const [openEdit, setOpenEdit] = useState(false);
  const [title, setTitle] = useState(readyDatasrc[0]?.name);
  const [getData, setGetData] = useState<any>(readyDatasrc[0]?.description);

  const [show, setShow] = useState(true);

  const [feautures, setFeautures] = useState(false);

  const [comment, setComment] = useState(true);
  const relatedknowledge = _.values(readyDatasrc[0]?.relatedknowledge);
  const parentItem = router.query?.lparentid;
  const [menu, setMenu] = useState(relatedknowledge.length == 0 ? false : true);
  const [commentcount, setCommentCount] = useState<any>();

  // console.log("readydata", readyDatasrc);
  // return <SingleKnowLedge />;

  const Submit = async () => {
    const result = await callProcess({
      command: "createKnowledgeDV_001",
      parameter: {
        name: title,
        description: getData,
        typeId: readyDatasrc[0]?.typeid,
        // author: readyDatasrc[0]?.author,
        code: Number(readyDatasrc[0]?.id),
        orderNumber: readyDatasrc[0]?.ordernumber,
        parentId: readyDatasrc[0]?.parentid,
        categoryId: Number(readyDatasrc[0]?.code),
        wfmStatusId: "1683627268863682",
        relatedIndicatorId: readyDatasrc[0]?.id,
        relatedKnowledge: readyDatasrc[0]?.relatedknowledge
          ? _.values(readyDatasrc[0]?.relatedknowledge).map(
              (item: any, index: number) => {
                return {
                  id: item?.id,
                  icon: item?.icon,
                  knowledgeName: item?.knowledgename,
                  trgKnowledgeId: item?.trgknowledgeid,
                  srcKnowledgeId: item?.srcknowledgeid,
                  srcTableName: item?.srctablename,
                  trgTableName: item?.trgtablename,
                };
              }
            )
          : [],
        kpiDynamicDtl:
          readyDatasrc[0]?.kpidynamicdtl &&
          _.values(readyDatasrc[0]?.kpidynamicdtl).map(
            (item: any, index: number) => {
              return {
                id: item?.id,
              };
            }
          ),
        kmTypeMap:
          readyDatasrc[0]?.kmtypemap &&
          _.values(readyDatasrc[0]?.kntypemap).map(
            (item: any, index: number) => {
              return {
                id: item?.id,
                indicatorId: item?.indicatorid,
                typeId: item?.typeid,
                valueType: item?.valuetype,
              };
            }
          ),
        kmCategoryMap:
          readyDatasrc[0]?.kmcategorymap &&
          _.values(readyDatasrc[0]?.kmcategorymap).map(
            (item: any, index: number) => {
              return {
                id: item?.id,
                categoryid: item?.categoryid,
                indicatorId: item?.indicatorId,
              };
            }
          ),
      },
    });
    if (result?.status == "success") {
      dataMutate();
      setOpenEdit(false);
    }
  };

  return (
    <>
      <BlockDiv customClassName="h-auto" divNumber="div10">
        {/* <span className="w-56"></span> */}
        <BlockDiv customClassName={`flex`} divNumber="divGridNumber">
          <div className=" bg-white 2xl:w-3/4 md:w-[100%] px-6 py-2 min-h-screen">
            {" "}
            {
              session?.readyProfile?.clouderp?.positionname == "Менежер" &&
                !openEdit && (
                  <button
                    className="absolute right-10 top-10  p-3 bg-[#699BF7] bg-opacity-[15%] font-medium text-white rounded-full cursor-pointer"
                    onClick={() => setOpenEdit(!openEdit)}
                  >
                    <i className="fa-light fa-pen text-[#699BF7]"></i>
                  </button>
                )
              // ) : (
              //   <button
              //     className="absolute right-10 top-10  p-2 bg-[#699BF7] font-medium text-white rounded-[10px] cursor-pointer"
              //     onClick={() => Submit()}
              //   >
              //     Хадгалах
              //   </button>
              // )
              // )
            }
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
                      renderType="title"
                      customClassName={
                        "xl:text-[25px] lg:text-[20px] xs:text-[16px] pb-6 pt-2 text-[#585858]"
                      }
                    />
                    <RenderAtom
                      item={readyDatasrc[0]?.position22}
                      renderType="htmltext"
                      customClassName={
                        "text-[30px] py-6 bg-red-500 overflow-auto"
                      }
                    />
                    <div id="comment" className="pt-[70px]">
                      <div className="mt-8 px-2 py-4 border-t-2 border-gray-300">
                        <h2 className="text-[#585858] text-xl font-medium">
                          Сэтгэгдэл
                        </h2>
                        <HelpComment setCommentCount={setCommentCount} />
                      </div>
                    </div>
                  </>
                )}
              </div>
            )) ||
              readyDatasrc.map((item: any, index: number) => {
                return (
                  <></>
                  //   <RenderMolecule
                  //     key={item?.id || index}
                  //     renderType="card"
                  //     item={{
                  //       item: {
                  //         title: item?.position1,
                  //         image: item?.position2,
                  //         description: item?.position3,
                  //         button: item?.position10,
                  //       },
                  //     }}
                  //   />
                );
              })}
          </div>
          <BlockDiv
            customClassName={`col-span-12 p-3 2xl:w-1/4  xl:w-64 md:w-56`}
            divNumber="divGridMainSub"
          >
            <>
              <BlockDiv
                customClassName="cursor-pointer flex pt-4 items-center justify-between"
                onClick={() => setFeautures((prev) => !prev)}
                divNumber={"divRightSideFeautures"}
              >
                <RenderAtom
                  item={{ value: "Feautures" }}
                  renderType="text"
                  customClassName="text-lg text-[#585858] font-semibold"
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
                  customClassName="text-lg text-[#585858]  font-semibold"
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
                  customClassName="text-lg text-[#585858]   font-semibold"
                />
                {show == true ? (
                  <i className="fa-solid fa-chevron-down"></i>
                ) : (
                  <i className="fa-solid fa-chevron-up"></i>
                )}
              </div>
              {show == true && (
                <>
                  <FileViewType />
                  {/* <WidgetWithId widgetId={widgetnemgooReady?.fileId} /> */}
                </>
              )}
            </>
            <>
              <>
                <a
                  className="cursor-pointer flex pt-2 items-center justify-between"
                  // onClick={() => )}
                  href="#comment"
                >
                  <RenderAtom
                    item={{ value: "Сэтгэгдэл" }}
                    renderType="text"
                    customClassName="text-lg text-[#585858]  font-semibold "
                  />
                  <p className="pr-2 text-[#585858] font-semibold">
                    {commentcount}
                  </p>
                </a>
              </>
            </>
            {/* <button
              //  onClick={copyToClipboard}
              className="cursor-pointer"
            >
              Link хуулах
            </button> */}

            <input
              className="border-0 focus:outline-none bg-gray-100 text-gray-100"
              // ref={textAreaRef}
              value={window.location.href}
            />
          </BlockDiv>
        </BlockDiv>
      </BlockDiv>

      <style>
        {`
          .cke_contents {
            min-height:500px
          }
          .htmltext img{
            width:600px !important;
          }
          `}
      </style>
    </>
  );
};
export default knowLedgeSingle;

const EmptyItem = () => {
  return (
    <div className="w-full text-center my-2">
      <p className="text-[#585858]">Хоосон байна</p>
    </div>
  );
};

const plugins =
  "basicstyles,dialogui,dialog,notification,button,toolbar,clipboard,enterkey,entities,floatingspace,wysiwygarea,indent,indentlist,fakeobjects,link,list,undo,horizontalrule,xml,ajax,templates,sourcearea,image,table,maximize,link,format,blockquote";

const toolbar = [
  {
    name: "clipboard",
    items: ["Cut", "Copy", "Paste", "PasteText", "-", "Undo", "Redo"],
  },
  { name: "links", items: ["Link", "Unlink"] },
  {
    name: "basicstyles",
    items: [
      "Bold",
      "Italic",
      "Underline",
      "Strike",
      "-",
      "Subscript",
      "Superscript",
    ],
  },
  {
    name: "paragraph",
    items: [
      "NumberedList",
      "BulletedList",
      "-",
      "Outdent",
      "Indent",
      "-",
      "Blockquote",
    ],
  },
  "/",
  { name: "tools", items: ["Maximize", "Source"] },
  { name: "styles", items: ["Format"] },
  {
    name: "insert",
    items: ["Image", "Table", "HorizontalRule", "Templates"],
  },
  "/",
];

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
