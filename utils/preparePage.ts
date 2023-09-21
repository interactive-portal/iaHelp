import { jsonParse } from "./helper";
import _ from "lodash";
import { metaConfig } from "@/config/metaConfig";

const prepareBody = (thisPageConfig: any) => {
  const thisPageNemgoo = jsonParse(thisPageConfig["layoutnemgoo"]);
  const thisPageLayout = thisPageNemgoo?.layout;
  // console.log("body thisPageNe mgoo", thisPageNemgoo);
  const masterPageNemgoo = jsonParse(thisPageConfig.layoutnemgoo);
  const masterPageLayout = masterPageNemgoo?.layout;
  findBodyAndUpdate(masterPageNemgoo?.layout, "body", thisPageLayout);

  return [masterPageLayout];
};

const findBodyAndUpdate = (object = [], findObject: any, thisLayout: any) => {
  let myObject;

  for (let item of object) {
    // let ddd = _.find(item, findObject);
    let ddd = item?.sectionCode === findObject ? item : undefined;
    if (ddd) {
      myObject = ddd;
      item.children = [...thisLayout];
      break;
    }
    if (item?.children)
      ddd = findBodyAndUpdate(item?.children, findObject, thisLayout);
    if (ddd) {
      myObject = ddd;
      break;
    }
  }

  return myObject;
};

const prepareSection = (mergedLayoutConfig: any) => {
  const sectionList =
    _.values(mergedLayoutConfig?.meta_bp_layout_section) || [];
  const sectionListHdr =
    _.values(mergedLayoutConfig?.layouthdr?.meta_bp_layout_section) || [];

  let readySectionList = [];
  let headerSectionList = [];

  for (let item of sectionList) {
    if (
      item.metatypeid === metaConfig.METATYPE_BUSINESSPROCESS &&
      item.islayout === "1"
    ) {
      const deepLayoutConfig = {};
      readySectionList.push({
        ...item,
        children: { ...deepLayoutConfig },
        thisislayout: true,
      });
    } else {
      readySectionList.push({ ...item, thisislayout: false });
    }
  }

  for (let item of sectionListHdr) {
    if (
      item.metatypeid === metaConfig.METATYPE_BUSINESSPROCESS &&
      item.islayout === "1"
    ) {
      const deepLayoutConfig = {};
      headerSectionList.push({
        ...item,
        children: { ...deepLayoutConfig },
        thisislayout: true,
      });
    } else {
      headerSectionList.push({ ...item, thisislayout: false });
    }
  }

  const readyLayoutConfig = {
    ...mergedLayoutConfig,
    meta_bp_layout_section: readySectionList,
    meta_hdr_bp_layout_section: headerSectionList,
    thisislayout: true,
  };

  return readyLayoutConfig;
};

const prepareReactConfigToWidgetNemgooReady = (listConfig: any) => {
  const debug = {
    console: {
      config: listConfig.rdebugconfig,
      data: listConfig.rdebugdata,
      nemgoo: listConfig.rdebugnemgoo,
      ...listConfig?.debug?.console,
    },
    show: {
      showPosition: listConfig.rdebugshowposition,
      showSample: listConfig.rdebugshowsample,
      ...listConfig?.debug?.show,
    },
  };

  return {
    ...listConfig?.widgetnemgooReady,
    debug: debug,
    isDefaultTheme: listConfig.risdefaulttheme,
    loadIconType: listConfig.risloadicon,
    isShow: listConfig.risshow,
  };
};

const preparePositionNemgoo = (bpsectiondtl: any) => {
  let array_bpsectiondtl = _.values(bpsectiondtl);
  array_bpsectiondtl?.map((item, index) => {
    array_bpsectiondtl[index].positionnemgooReady = jsonParse(item.otherattr);
  });

  return array_bpsectiondtl;
};

export default function preparePageList(pageConfig: any) {
  const readyMergedLayoutConfig: any = prepareSection(pageConfig);

  let meta_bp_layout_section = [
    ...readyMergedLayoutConfig?.meta_bp_layout_section,
    ...readyMergedLayoutConfig?.layouthdr?.meta_bp_layout_section,
  ];
  const eded = _.values(pageConfig.meta_bp_layout_section);
  if (readyMergedLayoutConfig?.meta_bp_layout_section[0]?.id !== eded[0]?.id) {
    meta_bp_layout_section = [...meta_bp_layout_section, ...eded];
  }

  meta_bp_layout_section?.map((item, index) => {
    const listConfig = meta_bp_layout_section[index];

    //widgetnemgooReady бэлтгэх
    meta_bp_layout_section[index].widgetnemgooReady =
      jsonParse(item?.widgetnemgoo) || {};

    meta_bp_layout_section[index].widgetnemgooReady =
      prepareReactConfigToWidgetNemgooReady(listConfig);

    meta_bp_layout_section[index].rawPositionList = preparePositionNemgoo(
      meta_bp_layout_section[index].bpsectiondtl
    );
  });

  let mainConfig = [];
  const layouthdrd = jsonParse(pageConfig.layouthdr.layoutnemgoo);
  const layouthdr = layouthdrd.layout;

  const [mergedPageNemgoo = []] = prepareBody(pageConfig);

  return {
    mergedPageNemgoo,
    readyMergedLayoutConfig,
    meta_bp_layout_section,
    layouthdr,
    // globalConfig,
  };
}
