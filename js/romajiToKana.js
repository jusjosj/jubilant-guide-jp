// Romaji to Hiragana Converter
// Converts English Romaji input into Japanese Hiragana dynamically.
// Supports typing standard prefixes (x / l) for small kana characters (e.g., xtsu -> っ, xya -> ゃ).

window.romajiToHiragana = (function() {
  const mapping = {
    // 4-character rules (like small tsu variants)
    "xtsu": "っ", "ltsu": "っ",

    // 3-character rules (digraphs, small kana variants)
    "kya": "きゃ", "kyu": "きゅ", "kyo": "きょ",
    "sha": "しゃ", "shu": "しゅ", "sho": "しょ",
    "cha": "ちゃ", "chu": "ちゅ", "cho": "ちょ",
    "nya": "にゃ", "nyu": "にゅ", "nyo": "にょ",
    "hya": "ひゃ", "hyu": "ひゅ", "hyo": "ひょ",
    "mya": "みゃ", "myu": "みゅ", "myo": "みょ",
    "rya": "りゃ", "ryu": "りゅ", "ryo": "りょ",
    "gya": "ぎゃ", "gyu": "ぎゅ", "gyo": "ぎょ",
    "bya": "びゃ", "byu": "びゅ", "byo": "びょ",
    "pya": "ぴゃ", "pyu": "ぴゅ", "pyo": "ぴょ",
    "ja": "じゃ", "ju": "じゅ", "jo": "じょ",
    "jya": "じゃ", "jyu": "じゅ", "jyo": "じょ",
    
    // Android/IME small tsu & small y-row
    "xtu": "っ", "ltu": "っ",
    "xya": "ゃ", "lya": "ゃ",
    "xyu": "ゅ", "lyu": "ゅ",
    "xyo": "ょ", "lyo": "ょ",
    "xwa": "ゎ", "lwa": "ゎ",
    "xka": "ヵ", "lka": "ヵ",
    "xke": "ヶ", "lke": "ヶ",

    // 2-character rules
    "ka": "か", "ki": "き", "ku": "く", "ke": "け", "ko": "こ",
    "sa": "さ", "shi": "し", "su": "す", "se": "せ", "so": "そ",
    "ta": "た", "chi": "ち", "tsu": "つ", "te": "て", "to": "と",
    "na": "な", "ni": "に", "nu": "ぬ", "ne": "ね", "no": "の",
    "ha": "は", "hi": "ひ", "fu": "ふ", "he": "へ", "ho": "ほ",
    "ma": "ま", "mi": "み", "mu": "む", "me": "め", "mo": "も",
    "ya": "や", "yu": "ゆ", "yo": "よ",
    "ra": "ら", "ri": "り", "ru": "る", "re": "れ", "ro": "ろ",
    "wa": "わ", "wo": "を", "nn": "ん",

    "ga": "が", "gi": "ぎ", "gu": "ぐ", "ge": "げ", "go": "ご",
    "za": "ざ", "ji": "じ", "zu": "ず", "ze": "ぜ", "zo": "ぞ",
    "da": "だ", "di": "ぢ", "du": "づ", "de": "で", "do": "ど",
    "ba": "ば", "bi": "bi", "bu": "ぶ", "be": "べ", "bo": "ぼ",
    "pa": "ぱ", "pi": "ぴ", "pu": "ぷ", "pe": "ぺ", "po": "ぽ",

    // Small vowel variants (x / l)
    "xa": "ぁ", "la": "ぁ",
    "xi": "ぃ", "li": "ぃ",
    "xu": "ぅ", "lu": "ぅ",
    "xe": "ぇ", "le": "ぇ",
    "xo": "ぉ", "lo": "ぉ",

    // 1-character rules
    "a": "あ", "i": "い", "u": "う", "e": "え", "o": "お"
  };

  return function(text) {
    if (!text) return "";
    let result = "";
    let i = 0;
    text = text.toLowerCase();

    while (i < text.length) {
      // 1. Check for n/nn cases
      if (text[i] === 'n') {
        // Double n is "ん"
        if (i + 1 < text.length && text[i + 1] === 'n') {
          result += "ん";
          i += 2;
          continue;
        }
        // n followed by vowel or y shouldn't be immediately converted (wait for combination)
        if (i + 1 < text.length && ["a", "i", "u", "e", "o", "y"].includes(text[i + 1])) {
          // Keep parsing normally
        } else if (i + 1 < text.length) {
          // n followed by other consonant is "ん"
          result += "ん";
          i += 1;
          continue;
        } else {
          // Standalone n at the very end of input
          result += "ん";
          i += 1;
          continue;
        }
      }

      // 2. Check double consonant (sokuon "っ")
      // If we see double consonant like 'tt', 'kk', 'ss', 'pp' (excluding nn)
      if (i + 1 < text.length && 
          text[i] === text[i + 1] && 
          text[i] >= 'a' && text[i] <= 'z' && 
          !["a", "i", "u", "e", "o", "n"].includes(text[i])) {
        result += "っ";
        i += 1; // consume the first of the double consonant, second will be parsed as start of next syllable
        continue;
      }

      // 3. Try 4-character match (e.g. xtsu, ltsu)
      if (i + 3 < text.length) {
        let quad = text.substring(i, i + 4);
        if (mapping[quad]) {
          result += mapping[quad];
          i += 4;
          continue;
        }
      }

      // 4. Try 3-character match (digraphs like kya, shu, or xtu, ltu, xya, etc.)
      if (i + 2 < text.length) {
        let tri = text.substring(i, i + 3);
        if (mapping[tri]) {
          result += mapping[tri];
          i += 3;
          continue;
        }
      }

      // 5. Try 2-character match (vowels, small vowels like xa, la)
      if (i + 1 < text.length) {
        let duo = text.substring(i, i + 2);
        if (mapping[duo]) {
          result += mapping[duo];
          i += 2;
          continue;
        }
      }

      // 6. Try 1-character match (vowels mainly)
      let uni = text[i];
      if (mapping[uni]) {
        result += mapping[uni];
        i += 1;
      } else {
        // Keep non-mappable characters (like spaces, punctuation, or incomplete letters)
        result += uni;
        i += 1;
      }
    }

    return result;
  };
})();
