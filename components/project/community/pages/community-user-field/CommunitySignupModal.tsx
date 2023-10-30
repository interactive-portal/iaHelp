import RenderAtom from "@/components/common/Atom/RenderAtom";
import BlockDiv from "@/components/common/Block/BlockDiv";
import useCallProcess from "@/middleware/dataHook/useCallProcess";
import AtomFormItemWrapper from "@/components/common/Atom/HookForm/AtomFormItemWrapper";
import { message } from "antd";
import { useForm } from "react-hook-form";

export default function CommunitySingupModal({
  setLoginModalShow,
  setSignupModalShow,
  viewTitle,
  afterSignup,
}: {
  setLoginModalShow?: any;
  setSignupModalShow?: any;
  viewTitle?: any;
  afterSignup?: any;
}) {
  const {
    register,
    setValue,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const hookForm = {
    register,
    setValue,
    handleSubmit,
    control,
    watch,
    errors,
  };

  const { callProcess, isProcessWorking } = useCallProcess();

  const onFormSubmit = async (formData: any) => {
    console.log("Success! Form data: ", formData);

    const parameter = {
      username: formData?.email,
      passwordHash: formData?.password,
      isOnlyCozyLogin: "0",
      ...formData,
      metaNameV2: "PROD",
      KYC_DTL: [
        {
          email: formData?.email,
          kycType: "Cozy",
          kycKey: "Email",
          kycValue: formData?.email,
        },
        {
          email: formData?.email,
          kycType: "Cozy",
          kycKey: "Phone",
          kycValue: formData?.phoneNumber,
        },
        {
          email: formData?.email,
          kycType: "Cozy",
          kycKey: "Firstname",
          kycValue: formData?.firstName,
        },
        {
          email: formData?.email,
          kycType: "Cozy",
          kycKey: "Lastname",
          kycValue: formData?.lastName,
        },
      ],
    };

    console.log("Success! parameter: ", parameter);
    // return null;

    await callProcess({
      command: "cozyLoginAndCreate",
      parameter: parameter,
      // metaNameV2: "PROD",
      moreRequest: null,
      event: {
        onError: () => {
          message.error("Та мэдээллээ засаад дахин оролдоно уу.");
        },
        onSuccess: () => {
          message.success("Амжилттай бүртгэлээ, одоо Нэвтэрч орно уу.");
          afterSignup();
        },
      },
    });
  };

  const onFormError = (errors: any) => {
    console.log("Error! Form Validate", errors);
  };

  return (
    <BlockDiv customClassName="p-[40px]" divNumber="CommunitySingupModalOuter">
      <BlockDiv
        customClassName="flex flex-col items-center"
        divNumber="CozyLoginModalInside"
      >
        {viewTitle && (
          <RenderAtom
            item={{ value: "Бүртгүүлэх" }}
            renderType="text"
            customClassName={"text-[32px] text-[#585858] font-semibold"}
          />
        )}
      </BlockDiv>

      <BlockDiv customClassName="" divNumber="CozyLoginModalBlock3">
        <form onSubmit={handleSubmit(onFormSubmit, onFormError)}>
          {fields.map((item: any, index: number) => {
            return (
              <AtomFormItemWrapper
                key={item?.id || index}
                renderType={item?.showtype}
                label={item?.label}
                validation={item?.validation}
                fieldName={item?.fieldName}
                defaultValue={item?.defaultValue || ""}
                hookForm={hookForm}
              />
            );
          })}

          <RenderAtom
            item={{
              value: "Бүртгүүлэх",
              positionnemgoo: {
                atom: {
                  type: "button",
                  className: "",
                  props: {
                    type: "primary",
                    custom: {
                      type: "submit",
                    },
                  },
                },
              },
            }}
            renderType="button"
            customClassName="cursor-pointer w-full text-white hover:text-white bg-[#FFAE00] text-center flex items-center justify-center py-2 rounded-full uppercase font-semibold hover:brightness-90 py-3 mt-8 text-[14px] leading-[16px]"
            isAtomWorking={isProcessWorking}
            // isWorking={isWorking}
          />
        </form>
      </BlockDiv>
    </BlockDiv>
  );
}

const fields = [
  {
    label: {
      title: "И-мэйл",
    },
    validation: {
      required: {
        value: true,
        message: "Имэйл хаягаа зөв бичнэ үү",
      },
    },
    showtype: "input",
    fieldName: "email",
    defaultValue: "",
  },
  {
    label: {
      title: "Эцэг эхийн нэр",
      props: {
        truncateRow: 1,
      },
    },
    validation: {
      required: {
        value: false,
        message: "Эцэг эхийн нэрийг бичнэ үү",
      },
    },
    showtype: "input",
    fieldName: "lastName",
    defaultValue: "",
  },
  {
    label: {
      title: "Таны нэр",
    },
    validation: {
      required: {
        value: true,
        message: "Та өөрийн нэрийг бичнэ үү",
      },
    },
    showtype: "input",
    fieldName: "firstName",
    defaultValue: "",
  },
  {
    label: {
      title: "Гар утас",
    },
    validation: {
      required: {
        value: false,
        message: "Гар утасны дугаараа зөв бичнэ үү",
      },
    },
    showtype: "input",
    fieldName: "phoneNumber",
    defaultValue: "",
  },
  {
    label: {
      title: "Нууц үг",
    },
    validation: {
      required: {
        value: true,
        message: "Та нууц үгээ оруулна уу",
      },
    },
    showtype: "input",
    fieldName: "password",
    defaultValue: "",
  },
  {
    label: {
      title: "Нууц үг давтах",
    },
    validation: {
      required: {
        value: true,
        message: "Та дээрх нууц үгээ энд зөв оруулна уу",
      },
    },
    showtype: "input",
    fieldName: "passwordConfirm",
    defaultValue: "",
  },
];
