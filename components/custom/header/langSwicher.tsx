import AtomLink from "@/components/common/atom/atomLink";
import Link from "next/link";
import { FC } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

type PropsType = {
  data?: any;
  colorCustom?: any;
};

const LangSwicher: FC<PropsType> = ({ data, colorCustom }) => {
  const router = useRouter();
  const { pathname, asPath, query } = router;
  const onChangeLanguage = (lang: string) => (e: any) => {
    e.preventDefault();
    router.push(router.asPath, undefined, { locale: lang });
    // router.replace(lang);
    setTimeout(function () {
      window.location.reload();
    }, 500);
  };

  return (
    <div className={`flex flex-row items-center gap-2 ${colorCustom}`}>
      <i className="fa-thin fa-globe opacity-95 xs:hidden lg:block false "></i>
      <span onClick={onChangeLanguage(router?.locale === "mn" ? "en" : "mn")}>
        {/* {" "}
        LangSwicher */}
        <Link
          href={router?.asPath}
          locale={router?.locale === "mn" ? "en" : "mn"}>
          {router?.locale === "mn" ? "EN" : "MН"}
        </Link>
      </span>
    </div>
  );
};
export default LangSwicher;
