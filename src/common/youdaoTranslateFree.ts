import request from "../utils/request";

const youdaoTranslateFree = async (word: string) => {
  const res = await request({
    url: `https://youdao.com/result?word=123123${word}`,
    method: "GET",
  });
  return res.data.translateResult[0][0].tgt;
};

export default youdaoTranslateFree;
