import { runService, runServiceMetaVerse } from "./service";

export async function getLayout(command: string, param: any) {
  let parameters = {
    ...param,
  };

  let result = await runService(command, parameters, "");

  //   console.log("response?.result", result);

  const myApiStatus = result?.status;
  const myApiResult = result?.result;
  // console.log("response?.result", response?.result) 404 huudas create;
  if (result.response.result) {
    return result.response;
  }

  const errorJson = {
    status: "notFound",
    result: {},
  };

  return errorJson;

  // console.log("response?.result", response?.result);
  // console.log("myApiResult", myApiResult);
}
//daraa zasah
export async function getProcessData(command: any, param: any) {
  let parameters = {
    ...param,
  };

  let response = await runService(command, parameters, "");

  if (response?.response?.result) {
    return response?.response;
  }
}

export async function getDataView(param: any, lang: any) {
  let parameters = {
    ...param,
  };

  const { response } = await runService("PL_MDVIEW_004", parameters, lang);

  if (response?.status == "success") {
    delete response.aggregatecolumns;
    delete response.paging;
    return response;
  }
  return response;
}
export async function get(command: any) {
  let parameters = {};

  const { response } = await runService("layoutHdr_004_cozy", parameters, "");
  return response;
}

export async function postProcess(command: any, param: any) {
  let parameters = {
    ...param,
  };
  let { response } = await runService(command, parameters, "");
  if (response?.result) {
    // delete response.aggregatecolumns;
    // delete response.paging;
    return response;
  }
}

export async function getDataMetaVerse(command: any, param: any) {
  let parameters = {
    ...param,
  };
  let { response } = await runServiceMetaVerse(command, parameters, "");
  if (response?.result) {
    return response;
  }
}
