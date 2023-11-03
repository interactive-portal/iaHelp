import RenderAtom from "@/components/common/Atom/RenderAtom";
import BlockDiv from "@/components/common/Block/BlockDiv";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import { useContext } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function CommunityProfileTopBanner() {
  const { readyDatasrc } = useContext(WidgetWrapperContext);
  const { data: session } = useSession();
  const router = useRouter();

  const staticItem = readyDatasrc[0];

  return (
    <BlockDiv divNumber="CommunityProfileTopBannerOuter">
      <BlockDiv
        customClassName="container mx-auto"
        divNumber="CommunityProfileTopBannerInner"
      >
        <BlockDiv
          customClassName="w-full h-[300px] relative"
          divNumber="itemHeaderBanner"
        >
          <RenderAtom
            item={
              staticItem?.position2 || {
                value: staticItem?.mainImage || staticItem?.coverpicture,
              }
            }
            renderType="image"
            customClassName="absolute inset-0 w-full h-full object-cover object-center brightness-50 rounded-xl"
          />
          <BlockDiv
            customClassName="absolute inset-y-0 left-0 w-full h-full flex items-end px-10 pb-5"
            divNumber="itemHeaderBannerText"
          >
            <BlockDiv
              customClassName="w-full flex flex-row justify-between gap-5"
              divNumber=""
            >
              <BlockDiv
                customClassName="w-auto h-auto flex flex-row gap-3"
                divNumber=""
              >
                <BlockDiv
                  customClassName="rounded-2xl border-2 border-white"
                  divNumber=""
                >
                  <RenderAtom
                    item={
                      staticItem?.position2 || {
                        value:
                          staticItem?.mainImage || staticItem?.profilepicture,
                      }
                    }
                    renderType="image"
                    customClassName="w-[135px] h-[135px] object-cover object-center rounded-2xl border-2 border-white"
                  />
                </BlockDiv>
                <BlockDiv
                  customClassName="w-auto h-full flex flex-col justify-end pb-5"
                  divNumber=""
                >
                  <RenderAtom
                    item={
                      staticItem?.position1 || {
                        value: staticItem?.title || staticItem?.fullname,
                      }
                    }
                    renderType="title"
                    customClassName="text-white font-bold text-lg"
                  />
                  <RenderAtom
                    item={
                      staticItem?.position3 || {
                        value: staticItem?.description || staticItem?.bio,
                      }
                    }
                    renderType="text"
                    customClassName="font-normal text-md text-center text-white"
                  />
                </BlockDiv>
              </BlockDiv>

              <BlockDiv
                customClassName="w-auto h-auto flex flex-row gap-10 items-end pb-5"
                divNumber=""
              >
                <BlockDiv customClassName="flex flex-col gap-1" divNumber="">
                  <RenderAtom
                    item={{
                      value: staticItem?.followers,
                    }}
                    renderType="title"
                    customClassName="font-bold text-2xl text-white text-center"
                  />
                  <RenderAtom
                    item={{ value: "дагагч" }}
                    renderType="title"
                    customClassName="font-bold text-md text-white text-center"
                  />
                </BlockDiv>
                <BlockDiv customClassName="flex flex-col gap-1" divNumber="">
                  <RenderAtom
                    item={{
                      value: staticItem?.follows,
                    }}
                    renderType="title"
                    customClassName="font-bold text-2xl text-white text-center"
                  />
                  <RenderAtom
                    item={{ value: "дагасан" }}
                    renderType="title"
                    customClassName="font-bold text-md text-white text-center"
                  />
                </BlockDiv>
              </BlockDiv>

              {/* <RenderAtom
                item={{
                  value: `dfsd sfsd f`,
                }}
                renderType="title"
                customClassName="text-[40px] leading-none text-white font-roboto"
              />
              <RenderAtom
                item={{
                  value: "dfsd fd sf",
                }}
                renderType="title"
                customClassName="text-[32px] leading-none text-gray-100 font-normal"
              />
              <RenderAtom
                item={{
                  value: "item?.Version",
                }}
                renderType="title"
                customClassName="text-[32px] leading-none text-gray-100 font-normal"
              /> */}
            </BlockDiv>
          </BlockDiv>
        </BlockDiv>
      </BlockDiv>
    </BlockDiv>
  );
}
