const request = require("../request");

/**
 * 
 * @param {*} word string
 * @returns string
 */
const youdaoTranslateFree = async (word) => {
    const res = await request({
        url: `https://fanyi.youdao.com/translate?&doctype=json&type=AUTO&i=${word}`,
        method: 'GET',
    })
    return res.data.translateResult[0][0].tgt;
}

module.exports = youdaoTranslateFree;