import { getProcessData } from "@/service/serverFunctions";
import { jsonParse } from "util/jsonParse";

const getProcess = async (req: any, res: any) => {
  const metaName: string = req?.query?.metaName || "metaProd";
  const processcode = req.query?.command || "";
  let parameters = jsonParse(req.query?.parameters) || "{}";
  const debug = req.query?.debug || false;

  // console.log("object :>> ", processcode);

  delete parameters.slug;

  const result = await getProcessData(processcode, parameters);

  // console.log("result :>> ", result);

  res.status(200).json(result);
};

export default getProcess;
