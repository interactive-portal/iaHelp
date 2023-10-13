export default async (req: any, res: any) => {
  const processcode = req.body.processcode || "";
  const parameters = req.body.parameters || {};
  const config = req.body.headerParam || "";

  const result = {};

  res.status(200).json(result);
};
