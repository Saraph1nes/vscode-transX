const splitWords = (str) => {
    // 使用正则表达式将横线、下划线和驼峰拼接的字符串切分为单词数组
    const words = str.split(/[-_]|(?=[A-Z])/);
    // 返回使用空格分开的单词字符串
    return words.join(' ');
}

module.exports = {
    splitWords
}