import Payment from "../payment/payment";
import { FC, useState } from "react";

type PropsType = {
  item?: any;
  setSelectDateModal?: any;
};

const PaymentModal: FC<PropsType> = ({ item, setSelectDateModal }) => {
  console.log("item", item);
  const [loading, setLoading] = useState(false);
  const checkPayment = () => {
    setLoading(true);
    Payment(
      Number(item?.saleprice),
      70105432,
      "khanbank",
      function (item: any) {
        console.log("item", item);
        setSelectDateModal(false);
      }
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full mx-auto">
        <div
          className="w-[424px] h- box-border relative rounded"
          style={{
            background: "var(--202020, #202020)",
          }}
        >
          <div className="p-[30px]">
            <p className="text-[#BAD405] text-[22px] uppercase font-bold">
              Картаа уншуулна уу
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-full mx-auto">
      <div
        className="w-[424px] h- box-border relative rounded"
        style={{
          background: "var(--202020, #202020)",
        }}
      >
        <div className="p-[30px]">
          <p className="text-[#BAD405] text-[22px] uppercase font-bold">
            Төлбөр төлөх
          </p>
          <div className="rounded-lg border border-[#DEDEDE]  mt-[50px]">
            <div className="flex flex-col gap-[20px] py-[45px] border-b mx-[25px] border-white">
              <div className="flex items-center justify-between text-white text-[16px]">
                <p className="">Багц </p>
                <p className="font-bold">{item?.classificationname}</p>
              </div>
              <div className="flex items-center justify-between text-white text-[16px]">
                <p className="">Хугацаа </p>
                <p className="font-bold">{item?.monthname}</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-white text-[16px] mx-[25px] py-[20px]">
              <p className="">Үнийн дүн </p>
              <p className="font-bold">{item?.saleprice}</p>
            </div>
          </div>
        </div>
        <div className="pb-[20px] w-full flex gap-[16px] px-[64px] cursor-pointer">
          <div
            className="w-full  text-[20px] text-center uppercase rounded font-medium py-2"
            style={{
              color: "var(--202020, #202020)",
              background: "var(--green-main, #BAD405)",
            }}
            onClick={() => checkPayment()}
          >
            ТӨЛБӨР ТӨЛӨХ
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
