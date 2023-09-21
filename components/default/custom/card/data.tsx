import { FC } from "react";
import AtomImage from "@/components/common/atom/atomImage";
import RenderAtom from "@/components/common/atom/renderAtom";

type PropsType = {
    options?: any;
    data?: any;
  };

const gridSpan = [
    "h-80 row-span-2",
    "h-80 row-span-2",
    "row-span-3",
    "h-80 col-span-2",
    "h-80 row-span-2",
    "h-80 row-span-2",
    "row-span-3",
    "h-80 col-span-2",
];

const CardData: FC<PropsType> = ({ options, data }) => {
   
  return (
    <div className="grid md:grid-cols-3 grid-cols-1 gap-3">
        {data?.slice(0, 4).map((item: any, index: number) => {
            return (
                <div key={index} className={`${gridSpan[index]} flex flex-col justify-end items-end rounded-xl w-full group bg-cover bg-center overflow-hidden`}
                    style={{
                        backgroundImage: `url('${item.mainimage}')`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                    }}
                    >
                    <div className="flex flex-col w-full h-[100px] p-7 rounded-b-xl group-hover:h-full transition-all bg-[#0E430D]/60 group-hover:px-16 group-hover:py-auto">
                        <RenderAtom
                            item={{ value: item?.title }}
                            renderType="text"
                            customClassName={
                                "font-bold text-[16px] leading-[140%] text-white"
                            }
                        />
                        <div className="group-hover:py-5 hidden group-hover:block">
                            <RenderAtom
                                item={{ value: item?.description }}
                                renderType="text"
                                customClassName={
                                    "font-normal text-[14px] leading-[140%] text-white"
                                }
                            />
                        </div>
                    </div>
                </div>
            );
        })}
    </div>
  );
}
export default CardData;