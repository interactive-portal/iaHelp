import { runService } from "./service";

export async function getLayout(pathname: string) {
  let parameters = {
    filtermetadataid: "",
    filterdomain: process.env.DOMAIN_NAME || "interactive2", //"feedback", //"mrtd",
    filterslug: pathname,
  };

  let result = await runService("layoutHdr_004_cozy", parameters, "");

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
  let { response } = await runService(command, parameters, "");
  if (response?.result) {
    return response;
  }
}

export async function getDataView(param: any, lang: any) {
  let parameters = {
    ...param,
  };

  const { response } = await runService("PL_MDVIEW_004", parameters, lang);
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
    return response;
  }
}
