import { jsonParse } from "util/jsonParse";
import { getProcessData } from "@/service/serverFunctions";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "100mb", // Set desired value here
    },
  },
};

const postProcess = async (req: any, res: any) => {
  const metaName: string = req?.query?.metaName || "metaProd";
  const processcode = req.query?.command || "";
  let parameter = jsonParse(req.query?.parameters) || "{}";
  const debug = req.query?.debug || false;

  console.log("object :>> ", parameter);

  delete parameter.slug;

  const result = await getProcessData(processcode, parameter);

  console.log("result", result);

  // console.log("result :>> ", result);

  // res.status(200).json(result);
};

export default postProcess;
