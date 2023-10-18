import CloudBanner1 from "@/components/Login/Banner1";
import CloudLoginPage from "@/components/Login/CloudLoginPage";
import { decrypt } from "util/helper";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  return (
    <>
      <div className="bg-gray-100 w-screen h-screen flex flex-row">
        <div className="flex-1 w-0 hidden sm:block flex-col overflow-hidden">
          <CloudBanner1 />
        </div>
        <div className="shrink-0 w-full md:w-128 overflow-y-auto  scrollbar-thumb-citizen scrollbar-track-gray-200 scrollbar-thin hover:scrollbar-thumb-citizen-dark scrollbar-thumb-rounded-full">
          <CloudLoginPage />
        </div>
      </div>
    </>
  );
}
