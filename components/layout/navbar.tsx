import { Suspense, useMemo, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { FC } from "react";
import _ from "lodash";
import type { GetServerSideProps } from "next";
import { motion, AnimatePresence } from "framer-motion";
import Custom404 from "@/pages/404";

import useWidgetData from "@/components/common/engineBox/util/useWidgetData";
import dynamic from "next/dynamic";

type NavbarProps = {
  options?: any;
};

export default function Navbar({ options }: NavbarProps) {
  const {
    readyMergedPageConfig,
    masterPageNemgooConfig,
    meta_bp_layout_section,
  } = options || {};

  let headerWidget = _.find(meta_bp_layout_section, { code: "header" }) || "";

  let optionsWidget = _.omit(headerWidget, [
    "layoutnemgoo",
    "otherattr",
    "layouthdr",
    "rdebugconfig",
    "borderstyle",
    "rdebugdata",
    "rdebugshowposition",
  ]);

  // if (_.isEmpty(headerWidget)) {
  //   return <Header />;
  // }

  const widgetConfigNemgoo = optionsWidget?.widget;
  const myMetaTypeId =
    widgetConfigNemgoo?.metatypeid || optionsWidget.metatypeid;
  const myActionType =
    widgetConfigNemgoo?.actiontype || optionsWidget.actiontype;
  optionsWidget;

  const RenderWidget: any = useMemo(
    () =>
      dynamic(
        () =>
          import(
            `@/components/${headerWidget.componentpath?.toLowerCase()}/${
              headerWidget.widgetcode
            }`
          ),
        {
          loading: () => <span>{headerWidget.componentpath}</span>,
        }
      ),

    []
  );

  const DynamicHeader = dynamic(
    () =>
      import(
        `@/components/${headerWidget?.componentpath?.toLowerCase()}/${
          headerWidget.widgetcode
        }`
      ),
    {
      ssr: false,
    }
  );

  const [dataSrc, error] = useWidgetData(optionsWidget);
  // console.log("object :>> ", optionsWidget);ss

  return (
    <>
      <RenderWidget data={dataSrc} options={optionsWidget} />
      {/* <DynamicHeader data={dataSrc} options={optionsWidget} /> */}
    </>
  );
}
