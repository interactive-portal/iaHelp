import { Suspense } from "react";
import Head from "next/head";
import Image from "next/image";
import useSWR, { SWRConfig } from "swr";
import { FC } from "react";
import _ from "lodash";
import type { GetServerSideProps } from "next";
import { motion, AnimatePresence } from "framer-motion";
// import Footer from "../common/footer/footer";
// import Header from "../common/header/header";
import Custom404 from "@/pages/404";
import Navbar from "./navbar";
import Footer from "./footer";

type LayoutProps = {
  children?: any;
};

export default function Layout({ children }: LayoutProps) {
  const variants = {
    hidden: { opacity: 0, x: -200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
  };
  const { props } = children;

  // console.log("children :>> ", props);
  // if (children.props.notFound) {
  //   return (
  //     <>
  //       <Custom404 />
  //     </>
  //   );
  // }

  return (
    <>
      <Head>
        <title>Hel ddp </title>
        <meta name="description" content="Интерактив грүп" />
        <meta
          name="keywords"
          content="интерактив, интерактив компани, програм хангамж, систем интеграцчилал, software, system, system integration, interactive, interactive company, interactive mongolia, interactive mongol, интерактив монголия, интерактив компания монголия, интерактив компания"
        />
        <link rel="icon" href="https://www.interactive.mn/images/favicon.ico" />
      </Head>
      <Navbar options={props} />
      {children}
      <Footer options={props} />
    </>
  );
}
