import { jsonParse } from "util/jsonParse";

const getProcess = async (req: any, res: any) => {
  const metaName: string = req?.query?.metaName || "metaProd";
  const processcode = req.query?.processcode || "";
  const parameters = jsonParse(req.query?.parameters || "{}");
  const debug = req.query?.debug || false;

  const result = {};

  res.status(200).json(result);
};

export default getProcess;
