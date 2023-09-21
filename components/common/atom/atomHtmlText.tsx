import { FC } from "react";
import { isEmpty } from "lodash";
import parseHtml from "html-react-parser";
import { decode } from "html-entities";

type PropsType = {
  item: any;
  link?: string;
  color?: string;
  customStyle?: any;
  customClassName?: string;
  truncateRow?: number;
};

const AtomHtmlText: FC<PropsType> = ({
  item,
  link,
  color = "sso",
  customStyle,
  customClassName = "",
  truncateRow = 0,
}) => {
  const data = decode(item.value).replaceAll(
    "storage/",
    "https://cloudnew.veritech.mn/app/storage/"
  );
  if (isEmpty(item)) return null;

  return <span className="htmltext">{parseHtml(data)}</span>;
};

export default AtomHtmlText;
