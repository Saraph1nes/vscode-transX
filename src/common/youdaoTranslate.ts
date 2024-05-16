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
  translationId: string,
  input: string,
  salt: string,
  curTime: number,
  appSecret: string
) => {
  const signStr = translationId + input + salt + curTime + appSecret;
  const sha256 = CryptoJS.SHA256(signStr);
  return sha256.toString(CryptoJS.enc.Hex);
};

/**
 * @param {*} word string
 * @returns string
 */
const youdaoTranslate = async (word: string) => {
  const { translationId, translationKey } =
    vscode.workspace.getConfiguration("translationX");
  const salt = randomUUID();
  const curtime = Math.round(new Date().getTime() / 1000);

  const data = {
    q: word,
    from: "AUTO",
    to: "zh-CHS",
    appKey: translationId,
    salt: salt,
    sign: signWithSHA256(
      translationId,
      handleInput(word),
      salt,
      curtime,
      translationKey
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
