import { getProcessData } from "@/lib/serverFunctions";
import { jsonParse } from "@/utils/helper";

const getProcess = async (req: any, res: any) => {
  const processcode = req.query?.processcode || "";
  const parameters = jsonParse(req.query?.parameters || "{}");
  const debug = req.query?.debug || false;

  try {
    const { result } = await getProcessData(processcode, parameters);
    res.status(200).json(result);
  } catch (error) {
    console.log("nem error ,", error);
    res.status(500).json({ error });
  }
};

export default getProcess;
