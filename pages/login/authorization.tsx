import React, { useState, useEffect } from "react";
import { decrypt } from "util/helper";
import { useRouter } from "next/router";
import _ from "lodash";
import { signIn, useSession } from "next-auth/react";

export default function authorization() {
  const router = useRouter();
  const { query } = router;
  const [dataSrc, setDataSrc] = useState<any>();
  const [user, setUser] = useState<any>([]);
  const { data: session } = useSession();

  // console.log("ro :>> ", ro);

  useEffect(() => {
    if (!router.isReady) return;

    const strData = query?.user;
    // const userStr = query.user;
    const decryptobject = strData.replaceAll("tttnmhttt", "+");
    const decryptobjects = decryptobject.replaceAll("ttttntsuttt", "=");
    const parameter = decrypt(decryptobjects, "newValue");

    setUser((user: any) => [...user, parameter]);
  }, [router]);

  console.log("sessionsession", session);

  if (session) {
    window.location.href = "/";
  }

  // console.log("strData :>> ", strData);

  if (_.isEmpty(user)) return <div>Хэрэглэгчийн мэдээлэлээ шалгана уу</div>;

  if (user) {
    const param = _.values(user);

    const JsonObject = JSON.parse(param[0]);
    delete JsonObject.expiredate;

    // let { data, error } = useSWR(
    // 	`/api/get-process?processcode=login&parameters=${JsonObject}`,
    // );
    // if (error) return <div>Хэрэглэгчийн мэдээлэлээ шалгана уу</div>;
    // if (!data) return <div>Уншиж байна ...</div>;
    // const parameter = decrypt(JsonObject[0], "newValue");
    // const parameterdd = JSON.parse(parameter);
    let parameters = {
      isHash: 1,
      iscustomer: true,
      redirect: false,
      callbackUrl: "/",
      ...JsonObject,
    };

    console.log("param :>> ", param);
    signIn("credentials", parameters);

    // delete data.aggregatecolumns;
    // delete data.paging;
    // console.log("data res", res);
  }

  return <>Түр хүлээнэ үү ... {}</>;
}
