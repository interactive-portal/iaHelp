import { FC } from "react";
import RenderAtom from "@/components/common/atom/renderAtom";

type PropsType = {
    options?: any;
    data?: any;
  };

const CardSlider: FC<PropsType> = ({ options, data }) => {
  return (
    <div className="xl:grid flex flex-col items-center xl:overflow-hidden grid-cols-1 lg:grid-cols-2 gap-6 z-10 8xl:px-0 lg:px-2 xs:px-2 pb-16">
        {data.map((item: any, index: number) => {
                return (
                    <div key={index} className="flex flex-col xl:min-w-auto lg:min-w-[500px] xs:min-w-[280px]  lg:max-h-[167px] lg:min-h-[167px] sm:flex-row w-full bg-white rounded-[10px] cursor-pointer hover:shadow-lg">
                        <div className="flex-none w-[202.703px] max-h-[167px] min-h-[167px]">
                            <div>
                                <RenderAtom
                                    renderType="image"
                                    customClassName={"w-auto max-h-[167px] min-h-[167px] rounded-l-lg"}
                                    item={{
                                    value: item?.mainimage,
                                    }}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-5 p-5">
                            <RenderAtom
                                item={data?.position3 || { value: item?.title || "title" }}
                                renderType="title"
                                customClassName={
                                "lg:text-[16px] sm:text-[14px] xs:text-[12px] lg:font-semibold sm:font-medium xs:font-normal leading-[120%] text-[#3C3C3C]"
                                }
                            /> 
                            <RenderAtom
                                item={data?.position3 || { value: item?.description || "description" }}
                                renderType="title"
                                customClassName={
                                "lg:text-[14px] sm:text-[14px] xs:text-[10px] text-[#67748E] leading-[140%]"
                                }
                            /> 
                            <div className="flex items-center gap-6">
                                <div className="flex-none">
                                    <RenderAtom
                                        renderType="image"
                                        customClassName={"w-auto h-full"}
                                        item={{
                                        value: item?.iconImage,
                                        }}
                                    />
                                </div>
                                <div>
                                    <RenderAtom
                                        item={{value: item?.label}}
                                        renderType="text"
                                        customClassName={
                                        "lg:text-[14px] sm:text-[14px] xs:text-[12px] text-[#3C3C3C] leading-[120%]"
                                        }
                                    /> 
                                </div>
                            </div>    
                        </div>
                    </div>
                );
            })}
    </div>
  );
}
export default CardSlider;