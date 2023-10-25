import { getProcessData } from "@/service/serverFunctions";

export default async (req: any, res: any) => {
  const metaName: string = req?.query?.metaName || "metaProd";
  const processcode = req.body.processcode || "";
  const parameters = req.body.parameters || {};
  const config = req.body.headerParam || "";

  // const metaName: string = req?.query?.metaName || "metaProd";

  // const ourMetaConstant = (metaConfig as any)[metaName];
  let user: any = null;

  // const result = await serverData(
  //   "",
  //   processcode,
  //   parameters,
  //   ourMetaConstant,
  //   config
  // );

  const jjjjjjjjjjjjjjjj = await getProcessData(processcode, parameters);

  console.log("jjjjjjjjjjjjjjjj :>> ", jjjjjjjjjjjjjjjj);

  // if (result.status == "success") {
  //   console.log("resultresultresult :>> ", result);
  //   let param = {
  //     filterCustomerId: result.result.sessioncrmuserid || "",
  //   };

  //   // const { result: hash } = await serverData(
  //   //   "",
  //   //   "getCrmCustomerIdDv_004",
  //   //   param,
  //   //   ourMetaConstant,
  //   //   config,
  //   //   { returnByStandartJson: 1 }
  //   // );
  //   // user = {
  //   //   ...hash,
  //   //   ...result,
  //   // };
  // }
  // delete user?.result?.sessionvalues;
  // delete user?.result?.sessionid;

  // res.status(200).json(user || result);
};
