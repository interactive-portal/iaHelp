import RenderAtom from "@/components/common/atom/renderAtom";
import Link from "next/link";
import Image from "next/image";
export default function Custom404() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-[#F8FBFF] ">
      <div className="flex flex-col max-w-[570px] text-center justify-center items-center gap-5 md:gap-0">
        <RenderAtom
          renderType="image"
          item={{
            value:
              "https://res.cloudinary.com/dzih5nqhg/image/upload/v1689914176/_x31__8__tcmjwb.png",
          }}
          customClassName={"max-w-[570px] h-auto object-cover"}
        />
        <RenderAtom
          renderType="title"
          item={{
            value: "Хуудас олдсонгүй",
          }}
          customClassName={
            "font-semibold text-[#67748E] text-[30px] md:text-[45px] leading-[100%] md:leading-[190%]"
          }
        />
        <RenderAtom
          renderType="text"
          item={{
            value:
              "Таны хайж буй хуудасны нэр солигдсон эсвэл устгагдсан байж магадгүй байна.",
          }}
          customClassName={
            "font-normal text-[#67748E] text-[18px] md:text-[25px] leading-[150%]"
          }
        />
        <div className="flex flex-row gap-10 mt-8">
          <Link href={"/"}>
            <button className="rounded-[10px] bg-interactive shadow-md text-white py-4 px-6 font-semibold">
              Нүүр хуудас
            </button>
          </Link>
          <button
            onClick={() => {
              history.back();
            }}
            className="rounded-[10px] bg-white text-interactive shadow-md py-4 px-6 font-semibold"
          >
            Буцах
          </button>
        </div>
      </div>
    </div>
  );
}
