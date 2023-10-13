import Skeleton from "@components/common/Skeleton/Skeleton";
import { runExpression } from "@util/expression";
import { Tabs } from "antd";
import axios from "axios";
import { FormMetaContextProvider as MetaStore } from "context/Meta/FormMetaContext";
import _ from "lodash";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { loadProcessConfig } from "lib/api-config";
import { jsonParse } from "util/helper";
import { processTransform } from "util/processTransform";
import WidgetCustomRenderProcess from "../WidgetStandardProcess/WidgetCustomRenderProcess";
import FormWrapper, { FormSectionWrapper } from "./FormWrapper";
import Header from "./Header/Header";
import RenderField from "./RenderField";
import RenderWidgetProcessField from "./RenderWidgetProcessField";

type PropsType = {
  listConfig: any;
  dialog?: any;
  headerType?: string;
};

const { TabPane } = Tabs;

const RenderWidgetProcess: FC<PropsType> = ({
  listConfig,
  dialog,
  headerType,
}) => {
  const router = useRouter();
  // const { userData } = useUser();
  const { data: session } = useSession();
  const userData = session || {};
  const widgetnemgooReady = listConfig.widgetnemgooReady;
  const [formDataInitDataState, setFormDataInitDataState] = useState<any>({});
  const [processExpression, setProcessExpression] = useState<any>({});
  const [processConfigState, setProcessConfigState] = useState<any>();
  const [processParams, setProcessParams] = useState<any>({ header: [] });

  delete router.query.detect;
  const parameters = `&parameters=${JSON.stringify({
    id: listConfig.metadataid,
  })}&getparameters=${JSON.stringify({
    ...router.query,
  })}`;

  const listConfigParse = {
    ...listConfig,
    otherattr: jsonParse(listConfig?.otherattr),
  };
  const runExpressionAsync = async () => {
    let processParamsvar: any = {},
      formDataInitDatavar: any = {};

    const processFullConfig =
      (await loadProcessConfig(listConfig.metadataid)) || {};

    console.log("expResult  listConfig ", processFullConfig);

    const { data } = await axios.get(
      `/api/get-config-process?processcode=META_BUSINESS_PROCESS_LINK_BP_GET_004${parameters}`
    );

    processParamsvar = await processTransform(data.result, userData);
    // processParamsvar = [];

    formDataInitDatavar = processFullConfig
      ? await _.merge(processParamsvar.__dataElement, data.getData)
      : await _.merge(processParamsvar.__dataElement, router.query);

    const expResult: any = await runExpression(
      "all",
      processExpression,
      processParamsvar,
      formDataInitDatavar
    );
    console.log("expResult expResult", expResult?.expression);

    setProcessParams(processParamsvar);
    setFormDataInitDataState(expResult?.data);
    setProcessExpression(expResult?.expression);
    setProcessConfigState(data);
  };

  useEffect(() => {
    if (!_.isEmpty(processConfigState)) return;
    // if (
    // 	!_.isEmpty(processConfigState) ||
    // 	_.isNull(processConfigState) ||
    // 	_.isNull(processExpression)
    // )
    runExpressionAsync();
  }, [processConfigState]);

  if (_.isEmpty(processConfigState)) return <Skeleton type="loading" />;
  const { header } = processParams;
  const groupByTabname = _.groupBy(header, function (n) {
    return n.tabname;
  });
  return (
    <MetaStore
      formInitData={formDataInitDataState}
      formExpression={processExpression}
      processConfig={processParams}
    >
      <FormWrapper
        dialog={dialog}
        settings={listConfig}
        title={`${processConfigState?.result?.metadataname || ""}`}
      >
        <Header
          header={header}
          processParams={processParams}
          listConfigParse={listConfigParse}
          processConfig={processConfigState}
        />
        {header.map((item: any, index: number) => {
          if (!item.tabname && item.datatype === "group") {
            return (
              <RenderField
                key={item?.id || index}
                field={item}
                attr={processParams.details}
                sectionConfig={listConfigParse}
                className=""
                style=""
                rowIndex=""
                labelClassName=""
              />
            );
          }
        })}
        <Tabs>
          {header.map((item: any, index: number) => {
            if (item.tabname) {
              let isContent = _.filter(
                groupByTabname[item.tabname],
                (item2) => {
                  return item2.isshow === "1";
                }
              );
              if (isContent.length)
                return (
                  <TabPane tab={item.tabname} key={item?.id || index}>
                    <RenderField
                      field={item}
                      attr={processParams.details}
                      sectionConfig={listConfigParse}
                    />
                  </TabPane>
                );
            }
          })}
        </Tabs>
      </FormWrapper>
    </MetaStore>
  );

  if (processConfigState.result.iswithlayout == "1") {
    return (
      <MetaStore
        formInitData={formDataInitDataState}
        formExpression={processExpression}
        processConfig={processParams}
      >
        <FormSectionWrapper>
          <RenderWidgetProcessField
            processSection={processConfigState.result}
          />
        </FormSectionWrapper>
      </MetaStore>
    );
  } else {
    const { header } = processParams;

    const groupByTabname = _.groupBy(header, function (n) {
      return n.tabname;
    });

    const renderTypeView = () => {
      if (listConfig.widgetcode) {
        return (
          <WidgetCustomRenderProcess
            listConfig={listConfig}
            processData={processParams}
            formDataInit={formDataInitDataState}
            formConfig={processConfigState}
          />
        );
      } else {
        return (
          <FormWrapper
            dialog={dialog}
            settings={listConfig}
            title={`${processConfigState?.result?.metadataname || ""}`}
          >
            <Header
              header={header}
              processParams={processParams}
              listConfigParse={listConfigParse}
              processConfig={processConfigState}
            />
            {header.map((item: any, index: number) => {
              if (!item.tabname && item.datatype === "group") {
                return (
                  <RenderField
                    key={item?.id || index}
                    field={item}
                    attr={processParams.details}
                    sectionConfig={listConfigParse}
                    className=""
                    style=""
                    rowIndex=""
                    labelClassName=""
                  />
                );
              }
            })}
            <Tabs>
              {header.map((item: any, index: number) => {
                if (item.tabname) {
                  let isContent = _.filter(
                    groupByTabname[item.tabname],
                    (item2) => {
                      return item2.isshow === "1";
                    }
                  );
                  if (isContent.length)
                    return (
                      <TabPane tab={item.tabname} key={item?.id || index}>
                        <RenderField
                          field={item}
                          attr={processParams.details}
                          sectionConfig={listConfigParse}
                        />
                      </TabPane>
                    );
                }
              })}
            </Tabs>
          </FormWrapper>
        );
      }
    };

    return (
      <MetaStore
        formInitData={formDataInitDataState}
        formExpression={processExpression}
        processConfig={processParams}
      >
        {renderTypeView()}
      </MetaStore>
    );
  }
};

export default RenderWidgetProcess;
