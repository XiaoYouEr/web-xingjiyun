// import { stringify } from 'qs';
import request from "@/utils/request";
import loading from "@/components/Loading";
import { message } from "antd";

const IS_PROD = ["production", "prod", "demo"].includes(process.env.NAME || "");
const baseUrl = IS_PROD ? window.location.protocol + "//" + window.location.hostname + ":8888" : "";
/**
 * handleResponse 处理接口响应
 * @param res 请求接口后返回的原始数据
 * @param handleRes 是否处理返回值，默认为true，若不处理则直接返回
 * @param isLoading 是否加载loading，默认为true，此参数为false时必须先传handleRes
 * @returns any
 */
const handleResponse = (
  res: {
    success: boolean;
    data?: any;
    msg?: string;
  },
  handleRes = true,
  isLoading: boolean,
) => {
  isLoading && loading.end();
  if (!res.success && !res.msg) {
    res.msg = "服务器异常，请稍后再试！";
  }
  if (!handleRes) return res;
  if (res.success) {
    // 请求成功且无响应data时,直接返回true
    return res.data || true;
  } else {
    message.error(res.msg);
    return null;
  }
};

//获取ip列表
export async function getIpList(handleRes = true, isLoading = true, loadingText = "") {
  isLoading && loading.start(loadingText);
  return request(baseUrl + "/web/iplist", {
    method: "GET",
  })
    .then((res) => {
      return handleResponse(res, handleRes, isLoading);
    })
    .catch((err) => {
      isLoading && loading.end();
      throw new Error("Request Failed : " + err);
    });
}

export async function Login(params: any) {
  return request("/api/v1/customers/signin", {
    method: "POST",
    data: params,
    requestType: "form",
  });
}

//获取概要信息
export async function getWebTotal(handleRes = true, isLoading = true, loadingText = "") {
  isLoading && loading.start(loadingText);
  return request(baseUrl + "/web/total", {
    method: "GET",
  })
    .then((res) => {
      return handleResponse(res, handleRes, isLoading);
    })
    .catch((err) => {
      isLoading && loading.end();
      throw new Error("Request Failed : " + err);
    });
}

// 获取节点监控信息
export async function getNodeTotal(
  data: any,
  handleRes = true,
  isLoading = true,
  loadingText = "",
) {
  isLoading && loading.start(loadingText);
  return request(baseUrl + "/web/node/total", {
    method: "POST",
    data: { ...data },
  })
    .then((res) => {
      return handleResponse(res, handleRes, isLoading);
    })
    .catch((err) => {
      isLoading && loading.end();
      throw new Error("Request Failed : " + err);
    });
}
