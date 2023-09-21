import { FC } from "react";
import AtomLink from "@/components/common/atom/atomLink";
import Link from "next/link";
import Image from "next/image";
import RenderAtom from "@/components/common/atom/renderAtom";
type PropsType = {
  data?: any;
  options?: any;
  setShow?: any;
};

const SurveyMenu: FC<PropsType> = ({ data, options, setShow }) => {
  return (
    <>
      <div className=" w-full xl:hidden  absolute z-50  text-white transform  translate-x-0 bg-black/50 h-screen top-0">
        <div
          className="bg-gray-800 opacity-50 w-full h-full"
          onClick={() => setShow(false)}
        />
        <div className="w-[280px] right-0 fixed overflow-y-auto z-40 top-0 bg-white shadow h-full flex-col justify-between xl:hidden pb-4 transition duration-150 ease-in-out">
          <div className="px-6 h-full">
            <div className="flex flex-col justify-between h-full w-full">
              <div>
                <div className="mt-6 flex w-full items-center justify-between">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <Link href="/">
                        <Image
                          src={"/feedbackLogo.svg"}
                          alt=""
                          width={180}
                          height={40}
                        />
                      </Link>
                    </div>
                    <div
                      id="cross"
                      className="text-gray-800"
                      onClick={() => setShow(false)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-x"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <line x1={18} y1={6} x2={6} y2={18} />
                        <line x1={6} y1={6} x2={18} y2={18} />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="f-m-m text-left pt-10">
                  {data?.map((row: any, index: number) => {
                    return (
                      <div
                        key={index}
                        className="text-gray-800 cursor-pointer py-0"
                        onClick={() => setShow(false)}
                      >
                        <AtomLink
                          key={index}
                          item={row?.title}
                          href={row?.url}
                          customClassName="text-[14px] font-semibold  border-b-2 border-transparent hover:border-[#fff] flex-row-reverse font-normal cursor-pointer hover:text-blue-400"
                          childData={row?.children || []}
                        />
                      </div>
                    );
                  })}

                </div>
              </div>
              <div className="w-full pt-4 ">
                <div className="flex justify-center mb-4 w-full">
                  <div className="relative w-full">
                    <div className="text-gray-500 absolute ml-4 inset-0 m-auto w-4 h-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-search"
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                        strokeWidth={1}
                        stroke="#A0AEC0"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <circle cx={10} cy={10} r={7} />
                        <line x1={21} y1={21} x2={15} y2={15} />
                      </svg>
                    </div>
                    <input
                      className="bg-gray-100 focus:outline-none rounded w-full text-sm text-gray-500  pl-10 py-2"
                      type="text"
                      placeholder="Search"
                    />
                  </div>
                </div>
                <div className="border-t border-gray-300">
                  <div className="w-full flex items-center justify-between pt-1">
                    <div className="flex items-center">
                      <RenderAtom
                        item={{ value: "fa-light fa-user" }}
                        renderType="icon"
                        customClassName={"font-medium text-white  pt-2"}
                      />
                    </div>
                    <ul className="flex">
                      <li className="cursor-pointer text-gray-800 pt-5 pb-3 pl-3">
                        <div className="w-6 h-6 md:w-8 md:h-8">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-bell"
                            viewBox="0 0 24 24"
                            strokeWidth={1}
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                            <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                          </svg>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SurveyMenu;
