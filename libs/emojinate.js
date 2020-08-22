/// 入力されたアルファベットの単語を出来るだけemojiに置換して返す
module.exports = function(text) {
  const regex = /(?<word>[A-Za-z]+)/;
  const result = text.match(regex);
  if (result) {
    return Array.prototype.map.call(result.groups.word, c => {
      return `:regional_indicator_${c.toLowerCase()}:`;
    }).join(' ');
  }
  return text;
};