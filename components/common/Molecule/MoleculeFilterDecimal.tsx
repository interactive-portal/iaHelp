import { useState } from "react";
import BlockDiv from "../Block/BlockDiv";

export default function MoleculeFilterDecimal({
  item,
  input = { className: "", style: {} },
  customClassName = "",
  customStyle = {},
  divNamePrefix = "",
}: {
  item: string;
  input?: any;
  customClassName?: string;
  customStyle?: object;
  divNamePrefix?: string;
}) {
  const [sss, setSss] = useState(0);

  const onChange = (e: any) => {
    const amount = e.target.value;

    if (!amount || amount.match(/^\d{1,}(\.\d{0,4})?$/)) {
      setSss(amount);
    }
  };

  return (
    <BlockDiv
      customClassName={customClassName}
      customStyle={customStyle}
      divNumber={`${divNamePrefix}MoleculeFilterDecimalItemOuter`}
    >
      <input
        className={input?.className}
        style={input?.style}
        type="number"
        onChange={onChange}
        value={sss}
      />
    </BlockDiv>
  );
}
