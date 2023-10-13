import { FC, useState } from "react";
import useSWR from "swr";
import parseHtml from "html-react-parser";
import { decode } from "html-entities";

// import Jaak from "@/components//cloud/Project/Cozy/jaak";

type PropsType = {
  data?: any;
  options?: any;
};

const ReportTemplate: FC<PropsType> = ({ data, options }) => {
  const [tempalate, setTemplate] = useState<any>();

  const parameters = `&parameters=${JSON.stringify({
    parameter: {
      ...options,
      datarow: [
        {
          id: 16796777640113,
        },
      ],
    },
  })}`;

  const datas = useSWR(
    `/api/get-process?processcode=getReportTemplate${parameters}`
  );
  const rawData = parseHtml(decode(datas?.data));
  //   console.log("rawDa", datas?.data);

  return <>{parseHtml(decode(datas?.data))} </>;
};

export default ReportTemplate;
