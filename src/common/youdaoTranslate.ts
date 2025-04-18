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
  APPID: string,
  input: string,
  salt: string,
  curTime: number,
  APISecret: string
) => {
  // 应用ID+input+salt+curtime+应用密钥
  const signStr = APPID + input + salt + curTime + APISecret;
  const sha256 = CryptoJS.SHA256(signStr);
  return sha256.toString(CryptoJS.enc.Hex);
};

/**
 * @param {*} word string
 * @returns string
 */
const youdaoTranslate = async (word: string) => {
  const { APPID, APISecret } =
    vscode.workspace.getConfiguration("translationX");
  const salt = randomUUID();
  const curtime = Math.round(new Date().getTime() / 1000);

  const data = {
    q: word,
    from: "AUTO",
    to: "zh-CHS",
    appKey: APPID,
    salt: salt,
    sign: signWithSHA256(
      APPID,
      handleInput(word),
      salt,
      curtime,
      APISecret
    ),
    signType: "v3",
    curtime,
  };
  const res = await request({
    url: "https://openapi.youdao.com/api",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data,
  });
  return res.data.translation[0];
};

export default youdaoTranslate;
