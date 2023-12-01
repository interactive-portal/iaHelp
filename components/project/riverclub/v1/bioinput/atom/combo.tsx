import { FC, useEffect, useState } from "react";
import { Select } from "antd";
import _ from "lodash";
import { useFormContext, Controller } from "react-hook-form";
import useSWR from "swr";

type PropsType = {
  obj?: any;
};

const Combo: FC<PropsType> = ({ obj }) => {
  const {
    register,
    formState: { errors },
    setValue,
    control,
    getValues,
  } = useFormContext();

  const [formValue, setformValue] = useState(getValues());

  const criteria = {
    [obj?.criteriaPath]: [
      {
        operator: "=",
        operand: formValue[obj?.criteriaPath] || "",
      },
    ],
  };

  let {
    data: readyData,
    error,
    mutate,
  } = useSWR(`
	/api/get-data?metaid=${obj?.lookupId}&criteria=${JSON.stringify(criteria)}
	`);

  useEffect(() => {
    mutate();
  }, [formValue]);

  const options = _.values(readyData?.result);
  const [selectIndex, setSelectIndex] = useState(0);

  const onchange = (e: any) => {
    // setSelectIndex(e.nativeEvent.target.selectedIndex);
    // onmouseenter={, mutate()}
    setValue(obj?.pathname, e);
    setformValue(getValues());
  };

  return (
    <div className="flex flex-col ">
      <label className="text-[16px] font-medium  text-[#2A2A2A] mb-[8px]">
        {obj?.labelname}
      </label>
      <Controller
        control={control}
        name={`${obj?.pathname}`}
        render={({ field }) => (
          <Select
            onChange={onchange}
            className="text-[16px]"
            options={options?.map((item: any, index: number) => {
              return {
                value: item?.id,
                label: item?.[obj?.name],
              };
            })}
          />
          // <select
          //   className="border py-2 px-4 rounded-lg"
          //   style={{
          //     color: "inherit",
          //   }}
          //   onChange={(e) => onchange(e)}
          // >
          //   {options?.map((item: any, index: number) => {
          //     return (
          //       <option key={index} value={item?.id}>
          //         {item?.[obj?.name]}
          //       </option>
          //     );
          //   })}
          // </select>
        )}
      />
      {/* <Select
        onChange={handleChange}
        options={options?.map((item: any, index: number) => {
          return {
            value: item?.id,
            label: item?.[obj?.name],
          };
        })}
      /> */}
      {/* <style>
        {`
          ant-select-selection-placeholder {
            padding:8px 16px;
          }
        `}
      </style> */}
    </div>
  );
};

export default Combo;
