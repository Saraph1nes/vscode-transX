import request from "../utils/request";
import vscode from "vscode";
import CryptoJS from "crypto-js";

import { randomUUID } from "crypto";

const handleInput = (q: string) => {
  const len = q.length;
  if (len <= 20) return q;
  return q.substring(0, 10) + len + q.substring(len - 10, len);
};

const signWithSHA256 = (
  APISecret: string,
  input: string,
  salt: string,
  domain: string,
  appSecret: string
) => {
  const signStr = APISecret + input + salt + domain + appSecret;
  const sha256 = CryptoJS.SHA256(signStr);
  return sha256.toString(CryptoJS.enc.Hex);
};

/**
 * @param {*} word string
 * @returns string
 */
const baiduDomainTranslate = async (word: string) => {
  const { APISecret, APIKey } =
    vscode.workspace.getConfiguration("translationX");
  const salt = randomUUID();

  const data = {
    q: word,
    from: "AUTO",
    to: "zh",
    appid: APISecret,
    salt: salt,
    domain: "it",
    sign: signWithSHA256(
      APISecret,
      handleInput(word),
      salt,
      "it",
      APIKey
    ),
  };

  const res = await request({
    url: `https://fanyi-api.baidu.com/api/trans/vip/fieldtranslate`,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data,
  });

  console.log("res =>", res.data);

  return res.data.trans_result[0].dst;
};

export default baiduDomainTranslate;
