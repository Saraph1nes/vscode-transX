import request from "../utils/request";
import CryptoJS from "crypto-js";
import * as vscode from "vscode";

const detectLanguage = (str: string): { from: string; to: string } => {
  const isChinese = /[\u4e00-\u9fa5]/.test(str);
  return {
    from: isChinese ? "cn" : "en",
    to: isChinese ? "en" : "cn",
  };
};

/**
 * 生成讯飞API的授权签名
 */
const generateXunfeiSignature = (
  apiKey: string,
  apiSecret: string,
  host: string,
  date: string,
  requestLine: string,
  digest: string
) => {
  const signatureOrigin = `host: ${host}\ndate: ${date}\n${requestLine}\ndigest: ${digest}`;
  const signatureSha = CryptoJS.HmacSHA256(signatureOrigin, apiSecret);
  return CryptoJS.enc.Base64.stringify(signatureSha);
};

/**
 * 生成讯飞API的授权头
 */
const generateXunfeiAuthorization = (
  apiKey: string,
  apiSecret: string,
  host: string,
  date: string,
  requestLine: string,
  digest: string
) => {
  const signature = generateXunfeiSignature(apiKey, apiSecret, host, date, requestLine, digest);
  return `api_key="${apiKey}", algorithm="hmac-sha256", headers="host date request-line digest", signature="${signature}"`;
};

/**
 * 使用讯飞API翻译文本
 */
const xunfeiTranslate = async (text: string) => {
  const date = new Date().toUTCString();
  const requestLine = "POST /v2/its HTTP/1.1";
  const config = vscode.workspace.getConfiguration("translationX");
  const apiKey: string = config.get("APIKey") || '';
  const apiSecret: string = config.get("APISecret") || '';
  const host = "itrans.xfyun.cn";

  // 生成Digest
  const body = {
    common: {
      app_id: config.get("APPID")
    },
    business: detectLanguage(text),
    data: {
      text: CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text))
    }
  };
  const bodyString = JSON.stringify(body);
  const digest = "SHA-256=" + CryptoJS.SHA256(bodyString).toString(CryptoJS.enc.Base64);

  const authorization = generateXunfeiAuthorization(
    apiKey,
    apiSecret,
    host,
    date,
    requestLine,
    digest
  );

  const url = "https://itrans.xfyun.cn/v2/its";

  try {
    const res = await request({
      url,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Host": host,
        "Date": date,
        "Digest": digest,
        "Authorization": authorization
      },
      data: body
    });

    const txt = res.data.data.result.trans_result.dst;
    console.log("翻译结果 =>", txt);
    return txt;
  } catch (err) {
    console.error("翻译失败 =>", err);
  }
};

export default xunfeiTranslate;