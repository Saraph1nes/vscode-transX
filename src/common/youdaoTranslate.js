const request = require("../request");
const vscode = require('vscode');
const CryptoJS = require("crypto-js");
const { randomUUID } = require("crypto");

const handleInput = (q) => {
    const len = q.length;
    if (len <= 20) return q;
    return q.substring(0, 10) + len + q.substring(len - 10, len);
}

const signWithSHA256 = (translationId, input, salt, curTime, appSecret) => {
    const signStr = translationId + input + salt + curTime + appSecret;
    const sha256 = CryptoJS.SHA256(signStr);
    return sha256.toString(CryptoJS.enc.Hex);
}

const youdaoTranslate = async (word) => {
    const {
        translationId,
        translationKey
    } = vscode.workspace.getConfiguration("translationX");
    const salt = randomUUID();
    const curtime = Math.round(new Date().getTime() / 1000);

    const data = {
        q: word,
        from: 'AUTO',
        to: 'zh-CHS',
        appKey: translationId,
        salt: salt,
        sign: signWithSHA256(translationId, handleInput(word), salt, curtime, translationKey),
        signType: 'v3',
        curtime,
    }
    return request({
        url: 'https://openapi.youdao.com/api',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data
    })
}

module.exports = youdaoTranslate;