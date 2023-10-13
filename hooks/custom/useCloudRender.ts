import { useCloud } from "hooks/use-cloud";
import _ from "lodash";
import { useEffect } from "react";

const useCloudRender = ({
  readyMergedPageConfig,
  masterPageNemgooConfig,
  hostObject,
  pageHeadMeta,
}: {
  readyMergedPageConfig: any;
  masterPageNemgooConfig: any;
  hostObject?: any;
  pageHeadMeta?: any;
}) => {
  const cloudContext = useCloud();

  if (_.isEmpty(hostObject)) return;

  useEffect(() => {
    //page-ийн өөрийнх нь ерөнхий тохиргоо. Жишээ нь departmentId явж буй.
    cloudContext.setThisPageConfig((prevState: any) => ({
      ...prevState,
      ...readyMergedPageConfig?.thisPageConfig,
    }));

    //Мастер пэйжийн Нэмгоо
    cloudContext.setMasterPageNemgooConfig((prevState: any) => ({
      ...prevState,
      ...masterPageNemgooConfig,
    }));

    //HostObject
    cloudContext.setHostObject((prevState: any) => ({
      ...prevState,
      ...hostObject,
    }));

    cloudContext.setPageMetaData((prevState: any) => ({
      ...prevState,
      ...pageHeadMeta,
    }));
  }, [hostObject]);

  return null;
};

export default useCloudRender;
