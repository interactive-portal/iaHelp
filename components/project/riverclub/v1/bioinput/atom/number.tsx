import { FC } from "react";
import { useFormContext } from "react-hook-form";

type PropsType = {
  obj?: any;
};

const Number: FC<PropsType> = ({ obj }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="flex flex-col ">
      <label className="text-[16px] font-medium  text-[#2A2A2A]">
        {obj?.labelname}
      </label>
      <input
        type="number"
        placeholder={obj?.labelname}
        {...register(obj?.pathname)}
        className="mt-[8px] px-[14px] py-[4px] text-[16px]"
        style={{
          boxShadow:
            "0px 1px 1px 0px rgba(0, 0, 0, 0.12), 0px 0px 0px 1px rgba(0, 0, 0, 0.64), 0px 2px 5px 0px rgba(103, 110, 118, 0.08)",
        }}
      />
    </div>
  );
};

export default Number;
