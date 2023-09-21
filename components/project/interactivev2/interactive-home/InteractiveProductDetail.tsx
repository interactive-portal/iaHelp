import React from "react";
import { useRouter } from "next/router";
import _ from "lodash";

import ErpArticle from "@/components/custom/article/erpArticle";
import ErpCard from "@/components/default/custom/card/erpCard";

import RenderAtom from "@/components/common/atom/renderAtom";
import useSWR from "swr";

import { Pagination, Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/free-mode";

export default function InteractiveProductDetail() {
  const router = useRouter();
  const filterId = router.query?.id;
  const command = "IMN_PRODUCTION_NEWS_DV_004";

  const parameters = `&parameters=${JSON.stringify({
    id: filterId,
  })}`;
  const { data: dataSrc } = useSWR(
    `/api/get-process?processcode=${command}${parameters}`
  );

  const erpArticleDatas = [
    {
      title: dataSrc?.title,
      description: `<span className='md:text-[18px] text-[#67748E] leading-[28px]'>${dataSrc?.body}</span>`,
    },
  ];

  const erpArticleServiceDatas = [
    {
      title: "Харилцагчийн <b className='text-[#0C529D]'>үйлчилгээ</b>",
      description: `<span className='md:text-[18px] text-[#67748E] leading-[28px]'>Интерактив компани нь харилцагч байгууллагуудынхаа үйл ажиллагааны онцлогыг нарийвчлан судлах, түүнд тохирсон зөвлөгөө өгөх, системийн тохиргоо хийх зэрэг бүх төрлийн үйлчилгээг чанарын өндөр түвшинд нэг дор үзүүлдэгээрээ бусад ижил төрлийн үйл ажиллагаа явуулдаг байгууллагуудаас онцлог юм. Мөн бид хэрэглэгч та бүхэнд Veritech ERP цогц системийн ашиглалттай холбоотой нэвтрүүлэлт, сургалт, дэмжлэг туслалцаа, зөвлөх үйлчилгээ болон техник хангамжийн бүх төрлийн үйлчилгээг үзүүлнэ.
</span>`,
    },
  ];

  const erpArticleOptions = {
    classNameTitle: "leading-[44px]",
    classNameDesc: "",
    classNamebutton: "",
    contentStyle: "left",
  };

  const erpCardOptions = {
    className: "",
    extraClassName: "",
    cardType: "randomPosition",
  };

  const specialData = dataSrc?.imn_production_feature_dv;
  const productionModule = dataSrc?.imn_production_module_dv;
  const productionRelation = dataSrc?.imn_production_relation_dv;
  const productionBenefit = dataSrc?.imn_production_benefit_dv;
  const productionFeature = dataSrc?.imn_production_feature_dv;
  const slug = _.toString(router?.query?.slug);
  const detailType = slug.split(",")[0];

  const serviceDefaultData = [
    {
      mainimage:
        "https://res.cloudinary.com/dsap2yssk/image/upload/v1687754036/OBJECTS_owi6jp.png",
      title: "Эрчим хүч ба Ногоон хот",
      description:
        " - Байгууллагын өгөгдлийн сангийн дахин төлөвлөлт<br> - Олон төрлийн өөр хоорондоо уялдаа багатай системүүдийн интеграци хийх (EAI, ESB) <br> - Өгөгдлийн сангийн нэгтгэл, шилжүүлэг, хяналт хийх<br> - Байгууллага хоорондын мэдээлэл солилцоог боловсронгуй болгох <br> - Хэрэглэгчийн болон Хандалтын эрхийн тогтолцоо бий болгох (SSO)",
    },
  ];

  const serviceData = [
    {
      title: "Онцлог үйлчилгээ",
      body: "Veritech ERP цогц системд байнгын сайжруулалт, зогсолтгүй шинэчилэлт хийгддэг бөгөөд систем дээр шинээр үүсч буй боломжуудыг ямар нэг хязгаарлалтгүйгээр нийт харилцагчдад цаг тухай бүрт санал болгодог. Уян хатан зохион байгуулалттай учир систем дээр төрөл бүрийн нэмэлт үйлчилгээг таны үйл ажиллагаанд тохируулан санал болгох ба та өөрт хэрэгтэй нэмэлт үйлчилгээг ашиглах боломжтой.",
      imgUrl:
        "https://res.cloudinary.com/dzih5nqhg/image/upload/v1687852847/ontslog_lylpmw.jpg",
    },
  ];

  const serviceCardOptions = {
    className: "",
    extraClassName: "",
    cardType: "imageRight",
  };

  return (
    <>
      {detailType == "product" && (
        <div className="flex flex-col w-full">
          {/* section 1 */}
          <div className="flex container justify-center items-center mx-auto py-10 md:py-20">
            <ErpArticle
              pDataSrc={erpArticleDatas}
              pOptions={erpArticleOptions}
            />
          </div>
          {/* section 2 */}
          {specialData && specialData.length > 1 && (
            <div className="flex flex-col justify-center items-center pt-7 md:pt-14 pb-28 gap-5 md:gap-[48px] bg-[url('https://res.cloudinary.com/dzih5nqhg/image/upload/v1686198149/allss_ljkndp.png')] bg-top bg-cover">
              <span className="text-white text-[32px] md:text-[40px] font-bold leading-[52px] text-center">
                Онцлох боломжууд
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 container mx-auto text-center gap-5 md:gap-7">
                {specialData?.map((row: any, index: number) => {
                  return (
                    <SpecialChance
                      key={index}
                      title={row.title}
                      imgUrl={row.imgurl}
                      description={row.body}
                    />
                  );
                })}
              </div>
            </div>
          )}
          {/* section 3 */}
          {productionModule && productionModule.length > 1 && (
            <div className="flex w-full container mx-auto py-16">
              <ErpCard pDataSrc={productionModule} pOptions={erpCardOptions} />
            </div>
          )}
          {/* section 4 */}
          {productionBenefit && productionBenefit[0].title && (
            <div className="flex w-full py-10">
              <div className={`relative w-full`}>
                <Swiper
                  slidesPerView={1}
                  pagination={{
                    clickable: true,
                  }}
                  autoplay={{
                    delay: 4500,
                    disableOnInteraction: false,
                  }}
                  modules={[Autoplay, Navigation, Pagination]}
                  className="banner"
                >
                  {productionBenefit?.map((item: any, index: number) => {
                    return (
                      <SwiperSlide className="" key={item?.id || index}>
                        <Slide
                          key={index}
                          title={item.title}
                          description={item.body}
                          imgUrl={`https://dev.veritech.mn/${item.imgurl}`}
                          topImage="https://res.cloudinary.com/dzih5nqhg/image/upload/v1686230603/top_bmi2kx.png"
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
          )}
          {/* section 5 */}
          {productionRelation && productionRelation.length > 1 && (
            <div className="flex flex-col justify-center items-center py-5 md:py-14 gap-5 md:gap-[48px]">
              <span className="text-interactive text-[32px] md:text-[44px] font-bold leading-[52px] text-center">
                Холбогдох системүүд
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-between container mx-auto items-center text-center gap-5">
                {productionRelation?.map((row: any, index: number) => {
                  return (
                    <ConnectSystems
                      key={index}
                      title={row.title}
                      description={row.body}
                      imgUrl={row.imgurl}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
      {detailType == "project" && (
        <div className="flex flex-col w-full bg-white">
          {/* section 1 */}
          <div className="flex container justify-center items-center mx-auto py-10 md:py-20">
            <ErpArticle
              pDataSrc={erpArticleDatas}
              pOptions={erpArticleOptions}
            />
          </div>
          {/* section 2 */}
          <div
            className="w-full flex flex-col gap-10 py-10 sm:py-20 md:pb-40"
            style={{
              backgroundImage:
                "url('https://res.cloudinary.com/dzih5nqhg/image/upload/v1685955585/imgpsh_fullsize_anim_rntm5w.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <span className="text-[#3C3C3C] text-[32px] md:text-[44px] font-bold leading-[52px] text-center">
              Онцлох <b className="text-[#0C529D]">боломжууд</b>
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto container gap-8">
              {productionBenefit?.map((row: any, index: number) => {
                return (
                  <div key={index} className="flex flex-col gap-3 p-5">
                    <RenderAtom
                      renderType="image"
                      item={{ value: row.imgurl }}
                      customClassName={"w-[40px] h-[40px]"}
                    />
                    <RenderAtom
                      item={{ value: row.body }}
                      renderType="text"
                      customClassName={`text-[20px] leading-[30px] font-normal text-[#3C3C3C]`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          {/* section 4 */}
          {productionFeature && (
            <div className="flex w-full">
              <div className={`relative w-full`}>
                <Swiper
                  slidesPerView={1}
                  pagination={{
                    clickable: true,
                  }}
                  autoplay={{
                    delay: 4500,
                    disableOnInteraction: false,
                  }}
                  modules={[Autoplay, Navigation, Pagination]}
                  className="banner"
                >
                  {productionFeature?.map((item: any, index: number) => {
                    return (
                      <SwiperSlide className="" key={item?.id || index}>
                        <Slide
                          key={index}
                          title={item.title}
                          description={item.body}
                          imgUrl={
                            item.imgurl
                              ? `https://dev.veritech.mn/${item.imgurl}`
                              : "https://dev.veritech.mn/storage/uploads/process/202306/file_1686208822521608_168612456917890.png"
                          }
                          topImage="https://res.cloudinary.com/dzih5nqhg/image/upload/v1686237263/urdun2_fbnr7h.png"
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
          )}
        </div>
      )}
      {detailType == "service" && (
        <div className="flex flex-col gap-10 md:gap-20 py-10 md:py-20 bg-white">
          {/* section 1 */}
          <div className="flex container justify-center items-center mx-auto">
            <ErpArticle
              pDataSrc={erpArticleServiceDatas}
              pOptions={erpArticleOptions}
            />
          </div>
          {/* section 2 */}
          <div className="flex flex-col">
            <div className="flex w-full container mx-auto">
              <ErpCard pDataSrc={specialData} pOptions={serviceCardOptions} />
            </div>
          </div>
          {/* section 3 */}
          {serviceData && (
            <div className="flex w-full">
              <div className={`relative w-full`}>
                <Swiper
                  slidesPerView={1}
                  pagination={{
                    clickable: true,
                  }}
                  autoplay={{
                    delay: 4500,
                    disableOnInteraction: false,
                  }}
                  modules={[Autoplay, Navigation, Pagination]}
                  className="banner"
                >
                  {serviceData?.map((item: any, index: number) => {
                    return (
                      <SwiperSlide className="" key={item?.id || index}>
                        <Slide
                          key={index}
                          title={item.title}
                          description={item.body}
                          imgUrl={item.imgUrl}
                          topImage=""
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

const SpecialChance = ({
  imgUrl,
  title,
  description,
}: {
  imgUrl: string;
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col gap-5 items-center ">
      <RenderAtom
        renderType="image"
        item={{ value: imgUrl }}
        customClassName={"w-full h-auto"}
      />
      <span className="text-white text-xl text-bold leading-6">{title}</span>
      <span className="text-white text-base leading-6">{description}</span>
    </div>
  );
};

const ConnectSystems = ({
  imgUrl,
  title,
  description,
}: {
  imgUrl: string;
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col w-full lg:max-w-[240px] items-center gap-5 bg-white p-5 rounded-xl border-4 border-transparent hover:border-green-400 cursor-pointer">
      <RenderAtom
        renderType="image"
        item={{ value: imgUrl }}
        customClassName={"w-[100px] h-auto"}
      />
      <span className="text-interactive text-xl text-bold leading-6">
        {title}
      </span>
      <span className="interactive-white text-base leading-6">
        {description}
      </span>
    </div>
  );
};

const Slide = ({
  imgUrl,
  title,
  description,
  topImage,
}: {
  imgUrl: string;
  title: string;
  description: string;
  topImage: string;
}) => {
  return (
    <div
      className="flex flex-col justify-center items-center w-full h-auto text-white relative "
      style={{
        backgroundImage: `url('${
          imgUrl ||
          "https://dev.veritech.mn/storage/uploads/process/202306/file_1686208822521608_168612456917890.png"
        }')`,
        backgroundPosition: "cover",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="w-full h-full py-24 bg-black/30">
        <div className="flex flex-col justify-center container mx-auto py-10 gap-5 relative h-full">
          {title && (
            <RenderAtom
              item={{ value: title }}
              renderType="title"
              customClassName={
                "text-[24px] lg:text-[30px] max-w-[1060px] md:leading-[59px] items-center text-left flex font-semibold drop-shadow-lg shadow-black"
              }
            />
          )}

          <RenderAtom
            item={{ value: description }}
            renderType="text"
            customClassName={`text-[18px] max-w-[1060px] leading-[34px] items-center text-justify md:text-left flex font-medium drop-shadow-lg shadow-black`}
          />
          {topImage && (
            <RenderAtom
              renderType="image"
              item={{
                value: topImage,
              }}
              customClassName={
                "w-[150px] lg:w-[180px] xl:w-full max-w-[250px] h-auto absolute -top-24 right-0"
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};
