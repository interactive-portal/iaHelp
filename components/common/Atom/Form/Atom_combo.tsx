import FormMetaContext from "context/Meta/FormMetaContext";
import fetchJson from "lib/fetchJson";
import _ from "lodash";
import { FC, useContext, useEffect, useState } from "react";
import Select from "react-select";
import { twMerge } from "tailwind-merge";
import { fieldDisableEnable, fieldHideShow, getAtomValue } from "@/util/helper";
import Atom_label from "./Atom_label";

type PropsType = {
  config: any;
  rowIndex?: any;
  className: any;
  labelClassName: any;
  style: any;
  sectionConfig: any;
};

const Atom_combo: FC<PropsType> = ({
  config,
  rowIndex,
  className,
  labelClassName,
  style,
  sectionConfig,
}) => {
  const [laoding, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const {
    processExpression,
    processConfig,
    formDataInitData,
    handleChangeContext,
    lookUpData,
    handleLookUpData,
  } = useContext(FormMetaContext);

  const getLookUpData = async () => {
    if (getAtomValue(config, formDataInitData, processConfig, rowIndex)) {
      let criteria = {
        [config.valuefield]: [
          {
            operator: "=",
            operand: getAtomValue(
              config,
              formDataInitData,
              processConfig,
              rowIndex
            ),
          },
        ],
      };
      let data = await fetchJson(
        `/api/get-data?metaid=${
          config.lookupmetadataid
        }&pagingwithoutaggregate=1&criteria=${JSON.stringify(criteria)}`
      );
      delete data.aggregatecolumns;
      delete data.paging;
      data = _.values(data);
      setOptions(comboDataTransform(data));

      return data;
    }
  };

  useEffect(() => {
    getLookUpData();
  }, []);

  const handlerFocus = async (e: any) => {
    if (
      lookUpData[config.paramrealpath] &&
      !processConfig["__lookupParamConfig"][config.paramrealpath]
    ) {
      setOptions(comboDataTransform(lookUpData[config.paramrealpath]));
      return;
    }
    setLoading(true);
    const res = await handleLookUpData(config);
    setOptions(comboDataTransform(res));
    setLoading(false);
  };

  const comboDataTransform = (data: any) => {
    return data.map((item: any, key: any) => {
      let displayfield = item[config.displayfield.toLowerCase()];
      let valuefield = item[config.valuefield.toLowerCase()];
      return { label: displayfield, value: valuefield, icon: "home" };
    });
  };

  const handlerChange = (e: any) => {
    handleChangeContext({
      name: config.paramrealpath,
      value: e.value,
      rowIndex,
    });

    if (processConfig["__lookupParamConfig"][config.paramrealpath]) {
      const lookupPath =
        processConfig["__lookupParamConfig"][config.paramrealpath][0][
          "fieldpath"
        ];
      const lookupAddKey = {
        ...processConfig["__lookupParamConfig"][config.paramrealpath][0],
        paramrealpath: lookupPath,
        criteria: {
          [config.paramrealpath]: [
            {
              operator: "=",
              operand: e.value,
            },
          ],
        },
      };
      handleLookUpData(lookupAddKey);
    }
  };

  const style2 = {
    menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
    control: (base: any) => ({
      ...base,
      ...style,
      // borderColor: "rgba(156, 163, 175, 1)",
      // height: 42,
      // width: parseInt(config.columnwidth || 350, 10),
      // minWidth: 160,
    }),
  };

  return (
    <div
      className={`${
        sectionConfig?.widgetnemgooReady?.labelPosition == "top"
          ? `flex flex-col`
          : `grid grid-cols-2 gap-4`
      } ${
        config.isshow == "0"
          ? "hidden"
          : fieldHideShow(config, processExpression) && "hidden"
      }`}
    >
      <Atom_label
        labelName={config.labelname}
        isrequired={config.isrequired}
        className={`${labelClassName}`}
        styles=""
        sectionConfig={sectionConfig}
      />

      <div className="selectBox self-center w-full relative">
        {processConfig.actiontype === "view" ? (
          <>
            {
              options.filter(
                (option) =>
                  option["value"] ===
                  getAtomValue(
                    config,
                    formDataInitData,
                    processConfig,
                    rowIndex
                  )
              )?.[0]?.["label"]
            }
          </>
        ) : (
          <>
            {config.iconname && (
              <span
                className={`far ${config.iconname} absolute z-50 w-6 h-5 text-[14px] text-center top-[7px] pl-3`}
              ></span>
            )}
            <Select
              options={options}
              onChange={handlerChange}
              onFocus={handlerFocus}
              isLoading={laoding}
              className={twMerge(
                `${className} before:only  ${config.iconname && "pl-10"}`
              )}
              name={config.paramrealpath}
              // placeholder=" - Сонгох - "
              placeholder={config?.placeholdername || " Сонгох"}
              styles={style2}
              value={options.filter(
                (option) =>
                  option["value"] ===
                  getAtomValue(
                    config,
                    formDataInitData,
                    processConfig,
                    rowIndex
                  )
              )}
              menuPortalTarget={document.body}
              isDisabled={fieldDisableEnable(config, processExpression)}
            />
          </>
        )}
      </div>
    </div>
  );
};
export default Atom_combo;
