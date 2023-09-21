/* eslint-disable @next/next/no-img-element */

import { FC, useState } from "react";
import _ from "lodash";
import { Popover, Modal } from "antd";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import RenderAtom from "@/components/common/atom/renderAtom";
import MegaHelpMenu from "@/components/custom/menu/megaHelpMenu";
import HelpTopMenu from "@/components/custom/menu/helpTopMenu";

type PropsType = {
  dataSrc?: any;
  config?: any;
  options?: any;
};

const HelpHeader: FC<PropsType> = ({ dataSrc, config, options }) => {
  const { data: session }: any = useSession();
  const router = useRouter();
  let headDataSrc = dataSrc?.layout;
  let headerSection: any = [];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [show, setShow] = useState(false);

  headerSection.push(_.find(headDataSrc, ["sectionCode", "header"]));

  const widgetnemgooReady = options;
  const logo =
    "https://res.cloudinary.com/dzih5nqhg/image/upload/v1695278460/helpLogo_fti9vj.png";

  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handlerTypeEvent = (item: boolean) => {
    setIsModalVisible(item);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const useProfile = (
    <div>
      <ul>
        <li
          className="hover:text-blue-400"
          onClick={() =>
            router.push({
              pathname: "/profile",
            })
          }
        >
          <i className="far fa-user text-sm w-6 "></i>
          <span className="cursor-pointer pl-1 ">Миний профайл</span>
        </li>
        <li>
          <i className="far fa-sign-out-alt  text-sm w-6"></i>
          <button
            className="cursor-pointer hover:text-blue-400 "
            onClick={() => signOut()}
          >
            Гарах
          </button>
        </li>
      </ul>
    </div>
  );
  if (!dataSrc) {
    return;
  }
  return (
    <>
      <div className=" w-full fixed top-0" style={{ background: "#fff" }}>
        <div
          className="my-2 w-full mx-auto  md:px-10 xs:px-2"
          style={{ background: "#fff" }}
        >
          <div
            className={`justify-between h-14 flex items-center  ${
              widgetnemgooReady?.insideDiv?.className || ""
            }`}
          >
            <div className="h-full flex items-center py-1">
              <img src={logo} alt="logo" onClick={() => router.push("/")} />
              {/* <AtomImage
                item={{ value: widgetnemgooReady?.siteLogo || logo }}
                customClassName="flex items-center pl-0 h-full  w-[200px]"
                customStyle={{
                  width: "auto",
                  height: "auto",
                }}
                // link={`/`} //${router.query?.detect[0]} алдаа шалгах
              /> */}
              <div className=" py-1 justify-between flex items-center mx-auto md:px-10 xs:px-2">
                <div className="h-full flex items-center gap-4">
                  <MegaHelpMenu
                    color={widgetnemgooReady?.HeaderTitle?.className}
                    menuItem={dataSrc}
                  />

                  <HelpTopMenu Menu={widgetnemgooReady?.Menu} />
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-10  w-full xl:w-2/5 justify-end ">
              {/* <HelpSearch /> */}
              {/* <div className="flex items-center ">
              <div className="xs:block lg:hidden">
                <RenderAtom
                  item={{ value: "fa-solid fa-bars" }}
                  renderType="icon"
                  customClassName={""}
                  onClick={() => setShow(!show)}
                />
              </div>
            </div> */}
              <div className="hidden xl:flex items-center">
                <div className="ml-6 relative">
                  <div className="flex  gap-3 items-center relative">
                    {!session && (
                      <>
                        <button
                          className="hover:text-blue-900 text-base font-bold cursor-pointer text-[#585858]"
                          onClick={() => setIsModalVisible(!isModalVisible)}
                        >
                          Нэвтрэх
                        </button>
                      </>
                    )}
                    {session && (
                      <>
                        <Popover content={useProfile} placement="bottom">
                          <div className="flex items-center cursor-pointer ">
                            <div className="text-right pr-1 ">
                              <span className="p-0 m-0 inline-block te">
                                {session?.username}
                              </span>
                              <br />
                              <RenderAtom
                                item={{
                                  value:
                                    session?.readyProfile?.profile
                                      ?.positionname,
                                }}
                                renderType="text"
                                customClassName={`capitalize font-semibold text-sm `}
                              />
                            </div>
                          </div>
                        </Popover>
                      </>
                    )}
                    <RenderAtom
                      item={{
                        value:
                          "https://res.cloudinary.com/dzih5nqhg/image/upload/v1637746847/cloud/icons/QMpejaITONnxnRBZKksI_mhmyc4.gif",
                      }}
                      renderType="image"
                      customClassName={
                        "border ml-2 border-gray-300 rounded-full object-cover w-11 h-11 p-1 border-solid"
                      }
                    />
                    {/* <AtomAvatar customClassName="border ml-2 border-gray-300 rounded-full object-cover w-11 h-11 p-1 border-solid" /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t relative"></div>
      </div>
      <Modal
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        {/* <ModalLogin
          iscustomer={false}
          handlerTypeEvent={handlerTypeEvent}
          setIsModalVisible={setIsModalVisible}
        /> */}
      </Modal>
      {/* Login Modal */}

      <nav className="bg-white shadow xl:block hidden"></nav>
      <nav>
        <div className="py-4 px-6 w-full flex md:hidden justify-between items-center bg-white fixed top-0 z-40">
          <div className="w-24">
            {/* <AtomImage
              item={widgetnemgooReady?.siteLogo || logo}
              customClassName="flex items-center pl-0 h-full"
              // link={`/`}
            /> */}
          </div>
          <div className="flex items-center">
            <div
              id="menu"
              className="text-gray-800"
              onClick={() => setShow(!show)}
            >
              {show ? (
                ""
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-menu-2"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <line x1={4} y1={6} x2={20} y2={6} />
                  <line x1={4} y1={12} x2={20} y2={12} />
                  <line x1={4} y1={18} x2={20} y2={18} />
                </svg>
              )}
            </div>
          </div>
        </div>
        {/*Mobile responsive sidebar*/}
        <div
          className={
            show
              ? "w-full md:hidden h-full fixed z-40  transform  translate-x-0 "
              : "   w-full xl:hidden h-full fixed z-40  transform -translate-x-full"
          }
        >
          <div
            className="bg-gray-800 opacity-50 w-full h-full"
            onClick={() => setShow(!show)}
          />
          <div className="w-64 h-full fixed overflow-y-auto z-40 top-0 bg-white shadow flex-col justify-between xl:hidden pb-4 transition duration-150 ease-in-out">
            <div className="px-6">
              <div className="flex flex-col justify-between h-full w-full">
                <div className="mt-6 flex w-full items-center justify-between">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      {/* <AtomImage
                        item={widgetnemgooReady?.siteLogo || logo}
                        customClassName="h-[30px] mr-5"
                        // link={`/`}
                      /> */}
                    </div>
                    <div
                      id="cross"
                      className="text-gray-800"
                      onClick={() => setShow(!show)}
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
                <div className="flex justify-center w-full">
                  <div className="relative w-full">{/* <HelpSearch /> */}</div>
                </div>
                <div className="py-1 justify-between items-center mx-2">
                  <div className="items-center gap-4">
                    <MegaHelpMenu
                      color={widgetnemgooReady?.HeaderTitle?.className}
                      menuItem={dataSrc}
                    />
                    <HelpTopMenu Menu={widgetnemgooReady?.Menu} />
                  </div>
                </div>

                <div className="w-full pt-4">
                  <div className="border-t border-gray-300">
                    <div className="w-full flex items-center justify-between pt-1">
                      <div className="flex items-center">
                        <img
                          alt="profile-pic"
                          src="https://tuk-cdn.s3.amazonaws.com/assets/components/boxed_layout/bl_1.png"
                          className="w-8 h-8 rounded-md"
                        />
                        <p className=" text-gray-800 text-base leading-4 ml-2">
                          Jane Doe
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* Code block ends */}
    </>
  );
};

export default HelpHeader;
