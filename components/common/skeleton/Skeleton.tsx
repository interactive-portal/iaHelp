import { FC } from "react";
import SkeletonItemDefault from "./SkeletonItemDefault";
import SkeletonItemLoading from "./SkeletonItemLoading";

type PropsType = {
  type?: "default" | "loading" | "modern" | "card" | "bigred";
  customClassName?: string;
  customStyle?: any;
};

const Skeleton: FC<PropsType> = ({
  type = "default",
  customClassName,
  customStyle,
}) => {
  switch (type) {
    case "modern":
      return <SkeletonItemDefault />;
    case "card":
      return <SkeletonItemDefault />;
    case "loading":
      return <SkeletonItemLoading />;
    case "bigred":
      return (
        <>
          <div className="bg-red-700 w-96 h-96">Анхаар</div>
        </>
      );
    default:
      return <SkeletonItemDefault />;
  }
};

export default Skeleton;
