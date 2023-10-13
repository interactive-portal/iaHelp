import { Suspense, useMemo, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import useSWR, { SWRConfig } from "swr";
import { FC } from "react";
import _ from "lodash";
import type { GetServerSideProps } from "next";
import { motion, AnimatePresence } from "framer-motion";
import Custom404 from "@/pages/404";
import dynamic from "next/dynamic";
import Header from "../common/default/header";

type NavbarProps = {
  options?: any;
};

export default function Navbar({ options }: NavbarProps) {
  const {
    readyMergedPageConfig,
    masterPageNemgooConfig,
    meta_bp_layout_section,
  } = options;

  const headerWidget = _.find(meta_bp_layout_section, { code: "header" }) || "";

  if (_.isEmpty(headerWidget)) {
    return <Header />;
  }
  const RenderWidget: any = useMemo(
    () =>
      dynamic(
        () =>
          import(
            `@/components/${headerWidget.componentpath.toLowerCase()}/${
              headerWidget.widgetcode
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
      <RenderWidget />
    </>
  );
}
