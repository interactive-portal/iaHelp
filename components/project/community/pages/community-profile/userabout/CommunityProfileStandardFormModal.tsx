import RenderAtom from "@/components/common/Atom/RenderAtom";
import RenderAtomList from "@/components/common/Atom/RenderAtomList";
// import BlockModal1 from "@components/common/Block/BlockModal1";
import _ from "lodash";

export default function CommunityProfileStandardFormModal({
  formModalConfig,
  setFormModalConfig,
}: {
  formModalConfig?: any;
  setFormModalConfig?: any;
}) {
  // console.log("🚀 ~ formModalConfig:", formModalConfig);

  // const [
  //   myHookForm,
  //   defaultValues,
  //   onReset,
  //   onFormSubmit,
  //   onFormError,
  //   isProcessWorking,
  //   readyFieldList,
  //   processName,
  // ] = useErpFormReadyWrapper({
  //   formConfig: formModalConfig,
  //   setFormModalConfig: setFormModalConfig,
  // });

  return (
    <></>
    // <BlockModal1
    //   formModalConfig={formModalConfig}
    //   setFormModalConfig={setFormModalConfig}
    //   customProps={{
    //     title: {
    //       title: processName || "Тодорхойгүй",
    //       className:
    //         "text-[32px] font-semibold text-center text-[#585858] text-center w-full",
    //     },
    //     reset: (
    //       <RenderAtom
    //         item={{
    //           value: "Цэвэрлэх",
    //         }}
    //         renderType="button"
    //         customClassName="text-lg font-medium text-center capitalize text-[#a0a0a0] bg-transparent p-0"
    //         isAtomWorking={isProcessWorking}
    //         onClick={() => {
    //           onReset();
    //         }}
    //       />
    //     ),
    //     body: {
    //       className: "grid grid-cols-2 gap-5",
    //     },
    //     submit: (
    //       <form onSubmit={myHookForm?.handleSubmit(onFormSubmit, onFormError)}>
    //         <RenderAtom
    //           item={{
    //             value: "Хадгалах",
    //             positionnemgoo: {
    //               atom: {
    //                 type: "button",
    //                 props: {
    //                   custom: {
    //                     type: "submit",
    //                   },
    //                 },
    //               },
    //             },
    //           }}
    //           customClassName={
    //             "text-[18px] text-white font-bold w-full active:scale-[99%] h-[43px] rounded-lg bg-[#0165E0]"
    //           }
    //           isAtomWorking={isProcessWorking}
    //         />
    //       </form>
    //     ),
    //   }}
    // >
    //   <RenderAtomList
    //     atomList={[
    //       ...(readyFieldList || []).map((item: any) => {
    //         return {
    //           renderType:
    //             item?.lookup?.lookuptype || item?.fieldTypeReady || "input",
    //           class:
    //             "h-[42px] px-5 py-2.5 rounded-[10px] border border-[#ededed] focus:ring-none focus:border-[#2F81E5]",
    //           item: {
    //             value: "",
    //             positionnemgoo: {
    //               label: {
    //                 className: "text-sm text-[#585858]",
    //                 title: `${item?.labelname} ${
    //                   item?.isrequired ? "<span style='color:red'>*</span>" : ""
    //                 } `,
    //               },
    //             },
    //           },
    //           form: {
    //             hookForm: myHookForm,
    //             fieldName: _.toLower(item?.paramrealpath),
    //             fieldType: item?.fieldTypeReady,
    //             // defaultValue: "",
    //             validation: {
    //               required: {
    //                 value: item?.isrequired,
    //                 message: "заавал!",
    //               },
    //             },
    //             configVeritechErp: item,
    //           },
    //         };
    //       }),
    //     ]}
    //   />
    // </BlockModal1>
  );
}
