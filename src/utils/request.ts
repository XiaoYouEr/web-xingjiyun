/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from "umi-request";
import { history } from "umi";

const codeMessage = {
  500: "server error", //服务器发生错误，请检查服务器。
  502: "service gateway error", //网关错误。
  503: "service invalide", //服务不可用，服务器暂时过载或维护。
  504: "request timeout",
};

/**
 * 异常处理程序
 */
const errorHandler = (error: { response: any; type: string }) => {
  const { response = {} } = error;
  if (!navigator.onLine) {
    return { success: false, msg: "网络连接错误，请稍后再试！" };
  }
  if (response.status >= 400) {
    if (response.status === 401) {
      const redirectUrl = response.headers.get("location");
      if (redirectUrl) {
        window.location = redirectUrl;
      }
      return;
    }
    if (response.status >= 500) {
      return {
        success: false,
        message: "服务器异常，请稍后再试！",
      };
    }
    return { success: false, message: "服务器异常，请稍后再试！" };
  }
  if (error.type === "Timeout") {
    return { success: false, message: "请求超时，请稍后再试！" };
  }
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  errorHandler, // 默认错误处理
  // credentials: "include", // 默认请求是否带上cookie,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Accept-Encoding": "gzip,deflate,br",
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  },
});

const authRequestInterceptor = (url: any, options: any) => {
  const headers = {
    Accept: "application/json, text/plain, */*",
    "Accept-Encoding": "gzip,deflate,br",
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  };
  return {
    url: url,
    options: { ...options, headers: headers, interceptors: true },
  };
};

request.interceptors.request.use(authRequestInterceptor, { global: false });

// 网络请求响应报错统一提示
request.interceptors.response.use(async (response, options) => {
  const { responseType } = options;
  if (responseType && responseType !== "json") {
    return response;
  }

  let data = {};
  try {
    // 当响应体中的body不能被解析为json
    data = await response.clone().json();
  } catch (error) {
    return response;
  }

  return response;
});

export default request;
