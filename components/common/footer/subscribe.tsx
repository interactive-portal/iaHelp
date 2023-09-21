import { useState, FC } from "react";
import _ from "lodash";
import RenderAtom from "../atom/renderAtom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import fetchJson from "@/utils/helper";
import axios from "axios";
import { notification } from "antd";
import { useTranslation } from "next-i18next";

type PropsType = {
  dataSrc?: any;
};

const schema = yup
  .object({
    newlink: yup
      .string()
      .email("Имэйл буруу байна ")
      .max(255)
      .required("Имэйл хаяг оруулна уу"),
  })
  .required();

const Subscribe: FC<PropsType> = ({ dataSrc }) => {
  const { t } = useTranslation("translate");
  const subData = {
    title: "WPD_0044",
    description: "WPD_0045",
    placeholder: "WPD_0063",
    button: "WPD_0073",
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    const param = {
      typeId: "1",
      ...data,
    };

    const { data: submitData } = await axios.post(`/api/post-process`, {
      processcode: "IMN_GET_EMAIL_DV_001",
      parameters: param,
    });

    // console.log("submitData :>> ", submitData);

    if (submitData?.status == "success") {
      notification.success({
        message: "Бидэнтэй нэгдсэнд баярлалаа.",
        placement: "bottom",
      });
      reset();
    }
  };

  return (
    <>
      <div className="container mx-auto">
        <div
          className={`flex  mx-auto flex-col items-center text-center justify-center  md:w-[800px] sm:w-full bg-white py-10`}>
          {/* <RenderAtom
            item={{ value: subData?.title }}
            renderType="title"
            customClassName={
              "md:text-[40px] md:leading-[75px] xs:text-2xl text-[#3C3C3C]"
            }
          /> */}
          <h3 className="md:text-[40px] md:leading-[75px] font-bold xs:text-2xl text-[#3C3C3C]">
            {" "}
            {t(subData?.title)}
          </h3>
          <p className="md:text-[18px] xs:text-sm text-[#7B7B93] leading-[28px] text-center">
            {" "}
            {t(subData?.description)}
          </p>
          {/* <RenderAtom
            item={{ value: subData?.description }}
            renderType="text"
            customClassName={
              "md:text-[18px] xs:text-sm text-[#7B7B93] leading-[28px] text-center"
            }
          /> */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative flex flex-row py-10">
              <input
                {...register("newlink")}
                className="border-#E1E1E1 md:h-[45px] sm:h-[50px] xs:h-[38px] xs:w-[320px] sm:w-[350px] md:w-[850px] rounded-full border pl-5 xl:text-[18px] lg:text-[16px] xs:text-[14px] text-[#90A0B7]"
                placeholder={t("WPD_0063")}></input>
              {errors.newlink && (
                <div className="text-red-400 absolute -bottom-0  pl-2">
                  {!errors?.newlink?.message
                    .toString()
                    .match(/required field/g) && errors?.newlink?.message}
                </div>
              )}
              <span className="flex px-5 items-center  absolute right-0 md:w-[180px] cursor-pointer sm:w-[140px] xs:w-[130px] md:h-[45px] sm:h-[50px] xs:h-[40px] bg-[#0C529D] hover:text-white xl:text-[18px] lg:text-[16px] xs:text-[14px] flex-row-reverse text-white font-medium rounded-r-full">
                <i className="fa-regular fa-heart ml-2 flex items-center justify-items-center"></i>
                <input
                  type="submit"
                  value={t(subData?.button)}
                  className="cursor-pointer"
                />
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Subscribe;
