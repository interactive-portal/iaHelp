//Энд Жава-тай холбогдох функцуудыг байлгая, Логин, жагсаалт, процесс дуудах г.м

export const runService = async (
  pCommand: string,
  pParameters: any,
  lang: any,
  pUrl: string = process.env.MAIN_BACKEND_URL as string
) => {
  let bodys = { ...pParameters };

  let requestBody: any = {
    request: {
      command: pCommand,
      languageCode: lang || "mn",
      // userToken: process.env.USER_TOKEN,
      username: "admin",
      password: "Pass789*456",
      returnByStandartJson: "1",
      parameters: bodys,
    },
  };

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(requestBody),
  };

  const res = await fetch(pUrl, requestOptions);
  // console.log("res :>> ", res);

  if (!res.ok) {
    const errorCode = res.ok ? false : res.status;
    throw new Error("Failed to fetch data");
  }

  const response = await res.json();

  if (response && response.status === "error") {
    console.log("SERVICE_ERROR :", response.data.response.text);
    throw new Error(response.data.response.text);
  }

  return response;
};
export const runServiceLogin = async (
  pCommand: string,
  pParameters: any,
  lang: any,
  pUrl: string = process.env.MAIN_BACKEND_URL as string
) => {
  let bodys = { ...pParameters };

  let requestBody: any = {
    request: {
      command: pCommand,
      languageCode: lang || "mn",
      // userToken: process.env.USER_TOKEN,
      // username: "admin",
      // password: "Pass789*456",
      returnByStandartJson: "1",
      parameters: bodys,
    },
  };

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(requestBody),
  };

  const res = await fetch(pUrl, requestOptions);
  // console.log("res :>> ", res);

  if (!res.ok) {
    const errorCode = res.ok ? false : res.status;
    throw new Error("Failed to fetch data");
  }

  const response = await res.json();

  if (response && response.status === "error") {
    console.log("SERVICE_ERROR :", response.data.response.text);
    throw new Error(response.data.response.text);
  }

  return response;
};

export const runServiceMetaVerse = async (
  pCommand: string,
  pParameters: any,
  lang: any,
  pUrl: string = process.env.METAVERSE_URL as string
) => {
  let bodys = { ...pParameters };

  let requestBody: any = {
    request: {
      command: pCommand,
      username: process.env.METAHOST_USERNAME,
      password: process.env.METAHOST_PASSWORD,
      parameters: bodys,
    },
  };

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json;charset=UTF-8");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(requestBody),
  };

  const res = await fetch(pUrl, requestOptions);

  if (!res.ok) {
    const errorCode = res.ok ? false : res.status;
    throw new Error("Failed to fetch data");
  }

  const response = await res.json();

  if (response && response.status === "error") {
    console.log("SERVICE_ERROR :", response.data.response.text);
    throw new Error(response.data.response.text);
  }

  return response;
};

export const runServiceComment = async (
  pCommand: string,
  pParameters: any,
  lang: any,
  pUrl: string = process.env.MAIN_BACKEND_URL as string
) => {
  let bodys = { ...pParameters };

  let requestBody: any = {
    request: {
      command: pCommand,
      languageCode: lang || "mn",
      // userToken: process.env.USER_TOKEN,
      sessionid: pParameters?.dbsessionid,
      // username: "admin",
      // password: "Pass789*456",
      returnByStandartJson: "1",
      parameters: bodys,
    },
  };

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(requestBody),
  };

  const res = await fetch(pUrl, requestOptions);
  // console.log("res :>> ", res);

  if (!res.ok) {
    const errorCode = res.ok ? false : res.status;
    throw new Error("Failed to fetch data");
  }

  const response = await res.json();

  if (response && response.status === "error") {
    console.log("SERVICE_ERROR :", response.data.response.text);
    throw new Error(response.data.response.text);
  }

  return response;
};
