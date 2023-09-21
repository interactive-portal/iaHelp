// import fs from "fs";
import * as fs from "fs";
import path from "path";
import _ from "lodash";
import fetchJson from "@/utils/helper";
import { Spin, Alert } from "antd";
import Link from "next/link";

export default function Globe() {
  return (
    <div
      style={{ fontSize: 16 }}
      className="h-96 mt-20 flex flex-col   mx-auto bg-slate-700">
      {/* <Alert
          className="h-96"
          message="Орчуулгын файл амжилттай үүслээ."
          description="."
          type="info"
        /> */}
      <span className="h-36 flex mx-auto  text-4xl text-white pt-32 ">
        Орчуулгын файл амжилттай үүслээ
      </span>
      <div className="flex flex-col h-36  mx-auto ">
        <Link href="/" className="mx-auto text-4xl my-20 text-interactive">
          Нүүр хуудасруу буцах
        </Link>
      </div>

      {/* Орчуулгын файл амжилттай үүслээ. */}
      {/* <p onClick={(e) => handleFilterData("mn")}>mongolian </p>
      <p onClick={(e) => handleFilterData("en")}>en </p> */}
    </div>
  );
}

// export async function getStaticProps(context) {
export async function getServerSideProps(context: any) {
  const { URL } = process.env;
  let paging = {
    // offset: 3,
    // pageSize: 1000,
  };

  let criteria = {
    code: [
      {
        operator: "like",
        operand: "WP%",
      },
    ],
  };

  let result = await fetchJson(
    URL +
      `/api/get-data?metaid=1455701097791&&criteria=${JSON.stringify(
        criteria
      )}&paging=${JSON.stringify(paging)}&withoutaggregate=1}`
  );
  delete result.aggregatecolumns;
  delete result.paging;
  const data = _.values(result?.result);

  // console.log("result resultresult:>> ", result);

  let mnSrc = {};
  let enSrc = {};
  data.map((item: any) => {
    mnSrc = { ...mnSrc, [item.code]: item.mongolian };
  });
  data.map((item: any) => {
    enSrc = { ...enSrc, [item.code]: item.english };
  });

  fs.writeFileSync(
    path.resolve("./public/locales/mn/translate.json"),
    JSON.stringify(mnSrc),
    "utf8"
  );
  fs.writeFileSync(
    path.resolve("./public/locales/en/translate.json"),
    JSON.stringify(enSrc),
    "utf8"
  );
  return {
    props: {}, // will be passed to the page component as props
  };
}
