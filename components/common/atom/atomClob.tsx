import _ from "lodash";
import BlockDiv from "../block/blockDiv";
import { encode, decode } from "html-entities";

const atomClob = ({
  item,
  customClassName = "",
  customStyle,
  onClick = null,
  showSample = false,
  customDivNumber = "DivText",
  divNamePrefix = "",
  children,
}: {
  item: any;
  customStyle?: any;
  customClassName?: string;
  onClick?: any;
  showSample?: boolean;
  customDivNumber?: string;
  divNamePrefix?: string;
  children?: any;
}) => {
  const value: string = !showSample
    ? // ? decodeURIComponent(item?.value) || ""
      decode(item?.value) || ""
    : "Sample Text";
  const valueClassName = item?.className || "";

  if (_.isEmpty(value)) return null;

  return (
    <BlockDiv
      customClassName={`${customClassName} ${valueClassName}`}
      customStyle={customStyle}
      divNumber={`${divNamePrefix}${customDivNumber}`}
      onClick={onClick}>
      <BlockDiv customClassName="atomClobBody">
        <div
          dangerouslySetInnerHTML={{
            __html: value,
          }}></div>
        <style>
          {`
                .atomClobBody h3, .atomClobBody h3 span { 
                  font-size:26px !important;
                  line-height: 35px !important;
                  font-weight: 500 !important;
                  color: #585858 !important;
                  font-family: Roboto !important;
                  margin: 5px 0 10px !important;
                  display: block !important;
                }
                .atomClobBody span, .atomClobBody div, .atomClobBody p {
                  font-size:14px !important; 
                  line-height: 28px !important; 
                  color: #585858 !important;
                  font-family: Roboto !important;
                  margin: 3px 0 !important; 
                  overflow-wrap: break-word !important;
                }
  
                .atomClobBody img {
                  margin: 2px 0 !important; 
                  max-width:100% !important; 
                  height: auto !important;
                }
                .atomClobBody div {
                }
              `}
        </style>
        {children}
      </BlockDiv>
    </BlockDiv>
  );
};

export default atomClob;
