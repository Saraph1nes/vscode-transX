const splitWords = (str) => {
  // 使用正则表达式将横线、下划线和驼峰拼接的字符串切分为单词数组
  const words = str.split(/[-_]|(?<=[a-z])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])/);
  // 返回使用空格分开的单词字符串
  return words.join(" ");
};

const containsChinese = (str) => {
  return /[\u4e00-\u9fa5]/.test(str);
};

const convertSentenceToCaseFormats = (sentence) => {
  // 小驼峰
  const camelCase = sentence
    .toLowerCase()
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");

  // 大驼峰
  const pascalCase = sentence
    .toLowerCase()
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => {
      return word.toUpperCase();
    })
    .replace(/\s+/g, "");

  // 小写链接符号
  const kebabCase = sentence.replace(/\s+/g, "-").toLowerCase();

  // 大写链接符号
  const trainCase = sentence.replace(/\s+/g, "-").toUpperCase();

  // 小写下划线
  const snakeCase = sentence.replace(/\s+/g, "_").toLowerCase();

  // 大写下划线
  const screamSnakeCase = sentence.replace(/\s+/g, "_").toUpperCase();

  // 返回结果数组
  return [
    camelCase,
    pascalCase,
    kebabCase,
    trainCase,
    snakeCase,
    screamSnakeCase,
    sentence,
  ];
};

export { splitWords, containsChinese, convertSentenceToCaseFormats };
