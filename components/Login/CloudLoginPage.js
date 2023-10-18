import { useState } from "react";
import CloudLoginForm from "./CloudLoginForm";
import CloudRegisterForm from "./CloudRegisterForm";
import { Modal } from "antd";
import RenderWidgetProcess from "@/middleware/components/WidgetForm/RenderWidgetProcess";
import Link from "next/link";

export default function CloudLoginPage() {
  const [pageIndex, setPageIndex] = useState(0);
  const [visibleModal, setVisibleModal] = useState(false);

  const onClickOpenRegister = () => {
    setVisibleModal(true);
  };
  const onClose = () => {
    setVisibleModal(false);
  };
  return (
    <div className="h-full w-full flex flex-col">
      <div className="bg-white w-full h-full p-8 pb-0 flex flex-col items-center justify-center">
        <img
          src="https://res.cloudinary.com/dzih5nqhg/image/upload/v1664264599/cloud/Group_21856_plve7t.png"
          className="w-3/5 h-auto block mx-auto mb-10"
        />
        <div className="w-full">
          <div className="text-[#699BF7] text-2xl font-semibold">
            Сайн байна уу?
          </div>
          <div className="text-gary-500 text-sm font-semibold">
            Танд энэ өдрийн мэндийг хүргэе.
          </div>
        </div>

        <div className="mt-5 w-full">
          {pageIndex == 0 && <CloudLoginForm />}
          {pageIndex == 1 && <CloudRegisterForm />}
        </div>

        {/* <div className="my-5 text-gray-300 text-xs">эсвэл</div>

				<div className="w-full flex grid-cols-2 gap-3">
					<AtomButton
						item=""
						icon="fab fa-facebook-f"
						type="primary-white"
						color="gray"
						customClassName="w-full bg-blue-200 h-12 text-2xl rounded-full hover:bg-gray-50 cursor-pointer"
						onClick={() =>
							signIn("facebook", { redirect: false, callbackUrl: "/" })
						}
						customStyle={{
							color: "#4267B2",
							boxShadow: "0px 3px 12px rgba(0, 0, 0, 0.12)",
						}}
					/>
					<AtomButton
						item=""
						icon="fab fa-google"
						type="primary-white"
						color="gray"
						customClassName="w-full h-12 text-2xl rounded-full hover:bg-gray-50 cursor-pointer"
						customStyle={{
							color: "#F44336",
							boxShadow: "0px 3px 12px rgba(0, 0, 0, 0.12)",
						}}
						onClick={() =>
							signIn("google", { redirect: false, callbackUrl: "/" })
						}
					/>
				</div> */}
        {/* <div className="my-5 text-gray-900 text-xs">Хаягаар нэвтрэх</div> */}
      </div>
      <div className="p-10 bg-white">
        <div className="flex items-center gap-8 justify-center w-full h-full text-black">
          {/* <AtomTab
						data={tabData}
						pageIndex={pageIndex}
						setPageIndex={setPageIndex}
					/> */}
          <p>Шинэ хэрэглэгчээр </p>
          <Link
            href="/login/register"
            as="/login/register"
            className="hover:text-blue-400 text-xl font-bold cursor:pointer text-[#699BF7]"
          >
            Бүртгүүлэх
          </Link>
        </div>
      </div>

      <Modal
        open={visibleModal}
        width={620}
        title="Бүртгүүлэх"
        centered
        footer={false}
        onCancel={onClose}
      >
        {
          <RenderWidgetProcess
            dialog={true}
            listConfig={{ metadataid: "1650443355719672" }}
          />
        }
      </Modal>
    </div>
  );
}

const tabData = [
  { title: "Нэвтрэх", icon: "" },
  { title: "Бүртгүүлэх", icon: "" },
];
