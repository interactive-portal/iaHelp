import React, { useState, useEffect } from "react";
import { decrypt } from "util/helper";
import { useRouter } from "next/router";
import _ from "lodash";
import { signIn, useSession } from "next-auth/react";
import fetchJson from "@/lib/fetchJson";
import useSWR from "swr";
import moment from "moment";

export default function authorization() {
  const router = useRouter();
  const { query } = router;
  const [dataSrc, setDataSrc] = useState<any>();
  const [user, setUser] = useState<any>([]);
  const { data: session } = useSession();

  // console.log("ro :>> ", ro);
  let strData: any = query?.user;

  useEffect(() => {
    if (!router.isReady) return;

    // const userStr = query.user;
    const decryptobject = strData.replaceAll("tttnmhttt", "+");
    const decryptobjects = decryptobject.replaceAll("ttttntsuttt", "=");
    const parameter = decrypt(decryptobjects, "newValue");

    let d = new Date();
    let ank = d.toLocaleString("en-US", { timeZone: "Asia/ulaanbaatar" });
    const ankdd = moment(ank).format("YYYY-MM-DD HH:mm:ss");

    setUser((user: any) => [...user, parameter]);
  }, [router]);

  if (session) {
    window.location.href = "/";
  }

  if (_.isEmpty(user)) return <div>Хэрэглэгчийн мэдээлэлээ шалгана уу</div>;

  const param = _.values(user);

  const JsonObject = JSON.parse(param[0]);

  const loginProcess = async () => {
    const result = await fetchJson(
      `/api/post-process?command=SSO_check_create_crm_user&parameters=${JSON.stringify(
        JsonObject
      )}`
    );
    if (result?.status == "success") {
      let parameters = {
        isHash: 1,
        iscustomer: true,
        redirect: false,
        // callbackUrl: "/",
        username: result?.result?.username,
        password: result?.result?.password,
        passwordhash: result?.result?.passwordhash,
      };

      const res = await signIn("credentials", parameters);
    }
  };

  if (user) {
    loginProcess();
    // console.log("param :>> ", param);
    // signIn("credentials", parameters);
    // delete data.aggregatecolumns;
    // delete data.paging;
    // console.log("data res", res);
  }

  return (
    <>
      Түр хүлээнэ үү ... {}
      <pre>{JSON.stringify(JsonObject, null, 4)}</pre>
    </>
  );
}
