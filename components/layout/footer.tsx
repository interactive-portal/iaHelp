import { Suspense, useMemo } from "react";
import Image from "next/image";
import useSWR, { SWRConfig } from "swr";
import { FC } from "react";
import _ from "lodash";
import { motion, AnimatePresence } from "framer-motion";

import dynamic from "next/dynamic";
import FooterDefault from "../common/default/footerDefault";
import { json } from "stream/consumers";

type FooterProps = {
  options?: any;
};

export default function Footer({ options }: FooterProps) {
  //   console.log("Footer :>> ", options);
  const {
    readyMergedPageConfig,
    masterPageNemgooConfig,
    meta_bp_layout_section,
  } = options;
  const footerWidget = _.find(meta_bp_layout_section, { code: "footer" }) || "";
  if (_.isEmpty(footerWidget)) {
    return <FooterDefault />;
  }
  const RenderFooter: any = useMemo(
    () =>
      dynamic(
        () =>
          import(
            `@/components/${footerWidget.componentpath.toLowerCase()}/${
              footerWidget.widgetcode
            }`
          ),
        {
          loading: () => <span>loader</span>,
        }
      ),

    []
  );

  return (
    <>
      {/* {JSON.stringify(footerWidget.componentpath)} */}
      <RenderFooter />
    </>
  );
}
