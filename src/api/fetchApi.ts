import { FetchApiParams, QueryParams } from "../common/tCommon";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchApi = ({
  method,
  path,
  queryParams,
  body,
  contentTypeAuto = false,
  contentType = "application/json",
}: FetchApiParams) => {
  const payloadToken = sessionStorage.getItem("payloadToken");
  const signatureToken = sessionStorage.getItem("signatureToken");

  if (
    !payloadToken ||
    !signatureToken ||
    payloadToken === "" ||
    signatureToken === ""
  ) {
    window.location.replace("/login");
    return Promise.reject();
  }
  const headers: HeadersInit = contentTypeAuto
    ? {
        "x-header-payload-token": payloadToken || "",
        "x-signature-token": signatureToken || "",
      }
    : {
        "x-header-payload-token": payloadToken || "",
        "x-signature-token": signatureToken || "",
        "Content-Type": contentType,
      };

  const options: RequestInit = {
    method,
    headers,
    cache: "no-cache",
    redirect: "follow",
    body,
  };

  const paramsStr = generateParamsStr(queryParams);

  const url = `${API_URL}${path}${paramsStr}`;
  return fetch(url, options).then(async (res) => {
    if (res.ok) return res;

    const json = await res.json();
    if (
      res.status === 401 ||
      json.message?.toLowerCase().includes("token") ||
      json.data?.message?.toLowerCase().includes("token")
    ) {
      localStorage.removeItem("payloadToken");
      localStorage.removeItem("signatureToken");
      window.location.replace("/login");
      return Promise.reject();
    } else if (
      res.status === 403 &&
      (json.message?.toLowerCase().includes("eula") ||
        json.data?.message?.toLowerCase().includes("eula"))
    ) {
      window.location.replace("/eula");
      return Promise.reject({
        message: "Acepta el eula para usar la aplicación.",
      });
    }

    return Promise.reject({
      message: json.message || json.data?.message,
      status: res.status,
    });
  });
};

export const fetchApiPublic = ({
  method,
  path,
  queryParams,
  body,
}: FetchApiParams) => {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body,
  };

  const paramsStr = generateParamsStr(queryParams);

  const url = `${API_URL}${path}${paramsStr}`;

  return fetch(url, options);
};

const generateParamsStr = (queryParams?: QueryParams) => {
  let paramsStr = "";
  if (queryParams !== undefined) {
    paramsStr =
      "?" +
      Object.entries(queryParams)
        .filter((param) => param[1] !== undefined && param[1] !== "")
        .map((param) => `${param[0]}=${param[1]}`)
        .map((param) => param.replace("#", "%23"))
        .join("&");
  }

  return paramsStr;
};
