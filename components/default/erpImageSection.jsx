import { useContext } from "react";
import WidgetWrapperContext from "@/components/widget/WidgetWrapper";
export default function ErpImageSection() {
  const { readyDatasrc } = useContext(WidgetWrapperContext);
  const imgUrl = readyDatasrc[0]?.backgroundImage;

  return (
    <div className="relative w-full h-full">
      <img
        src={imgUrl}
        alt="zurag"
        className="w-full h-auto max-h-[250px] object-cover object-top"
      />
    </div>
  );
}
