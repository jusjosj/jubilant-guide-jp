// Japanese Verb Database & Dynamic Conjugator
// Programmatically generates conjugations for all N5 & N4 verbs to maintain a small file size and robust conjugation logic.

(function() {
  
  // --- Raw N5/N4 Verb list ---
  const rawVerbs = [
    // === JLPT N5 VERBS ===
    // Group 1 (Godan)
    { kanji: "買う", hiragana: "かう", romaji: "kau", english: "to buy", level: "N5" },
    { kanji: "言う", hiragana: "いう", romaji: "iu", english: "to say", level: "N5" },
    { kanji: "会う", hiragana: "あう", romaji: "au", english: "to meet", level: "N5" },
    { kanji: "歌う", hiragana: "うたう", romaji: "utau", english: "to sing", level: "N5" },
    { kanji: "洗う", hiragana: "あらう", romaji: "arau", english: "to wash", level: "N5" },
    { kanji: "吸う", hiragana: "すう", romaji: "suu", english: "to smoke / inhale", level: "N5" },
    { kanji: "使う", hiragana: "つかう", romaji: "tsukau", english: "to use", level: "N5" },
    { kanji: "手伝う", hiragana: "てつだう", romaji: "tetsudau", english: "to help / assist", level: "N5" },
    { kanji: "習う", hiragana: "ならう", romaji: "narau", english: "to learn", level: "N5" },
    { kanji: "待つ", hiragana: "まつ", romaji: "matsu", english: "to wait", level: "N5" },
    { kanji: "立つ", hiragana: "たつ", romaji: "tatsu", english: "to stand", level: "N5" },
    { kanji: "持つ", hiragana: "もつ", romaji: "motsu", english: "to hold / possess", level: "N5" },
    { kanji: "取る", hiragana: "とる", romaji: "toru", english: "to take / pass", level: "N5" },
    { kanji: "作る", hiragana: "つくる", romaji: "tsukuru", english: "to make / build", level: "N5" },
    { kanji: "売る", hiragana: "うる", romaji: "uru", english: "to sell", level: "N5" },
    { kanji: "終わる", hiragana: "おわる", romaji: "owaru", english: "to end / finish", level: "N5" },
    { kanji: "送る", hiragana: "おくる", romaji: "okuru", english: "to send", level: "N5" },
    { kanji: "登る", hiragana: "のぼる", romaji: "noboru", english: "to climb", level: "N5" },
    { kanji: "乗る", hiragana: "のる", romaji: "noru", english: "to ride / board", level: "N5" },
    { kanji: "分かる", hiragana: "わかる", romaji: "wakaru", english: "to understand", level: "N5" },
    { kanji: "座る", hiragana: "すわる", romaji: "suwaru", english: "to sit", level: "N5" },
    { kanji: "切る", hiragana: "きる", romaji: "kiru", english: "to cut", level: "N5", group: 1, subtype: "ru", isException: true }, // Godan exception (looks like -iru)
    { kanji: "入る", hiragana: "はいる", romaji: "hairu", english: "to enter", level: "N5", group: 1, subtype: "ru", isException: true }, // Godan exception (looks like -iru)
    { kanji: "走る", hiragana: "はしる", romaji: "hashiru", english: "to run", level: "N5", group: 1, subtype: "ru", isException: true }, // Godan exception (looks like -iru)
    { kanji: "知る", hiragana: "しる", romaji: "shiru", english: "to know", level: "N5", group: 1, subtype: "ru", isException: true }, // Godan exception (looks like -iru)
    { kanji: "帰る", hiragana: "かえる", romaji: "kaeru", english: "to return / go home", level: "N5", group: 1, subtype: "ru", isException: true }, // Godan exception (looks like -eru)
    { kanji: "要る", hiragana: "いる", romaji: "iru", english: "to need", level: "N5", group: 1, subtype: "ru", isException: true }, // Godan exception (looks like -iru)
    { kanji: "遊ぶ", hiragana: "あそぶ", romaji: "asobu", english: "to play", level: "N5" },
    { kanji: "呼ぶ", hiragana: "よぶ", romaji: "yobu", english: "to call / summon", level: "N5" },
    { kanji: "読む", hiragana: "よむ", romaji: "yomu", english: "to read", level: "N5" },
    { kanji: "飲む", hiragana: "のむ", romaji: "nomu", english: "to drink", level: "N5" },
    { kanji: "休む", hiragana: "やすむ", romaji: "yasumu", english: "to rest / take a holiday", level: "N5" },
    { kanji: "住む", hiragana: "すむ", romaji: "sumu", english: "to reside / live in", level: "N5" },
    { kanji: "死ぬ", hiragana: "しぬ", romaji: "shinu", english: "to die", level: "N5" },
    { kanji: "書く", hiragana: "かく", romaji: "kaku", english: "to write", level: "N5" },
    { kanji: "歩く", hiragana: "あるく", romaji: "aruku", english: "to walk", level: "N5" },
    { kanji: "聞く", hiragana: "きく", romaji: "kiku", english: "to listen / hear / ask", level: "N5" },
    { kanji: "咲く", hiragana: "さく", romaji: "saku", english: "to bloom", level: "N5" },
    { kanji: "置く", hiragana: "おく", romaji: "oku", english: "to place / put", level: "N5" },
    { kanji: "行く", hiragana: "いく", romaji: "iku", english: "to go", level: "N5" }, // Special 'ku' rule exception
    { kanji: "泳ぐ", hiragana: "およぐ", romaji: "oyogu", english: "to swim", level: "N5" },
    { kanji: "脱ぐ", hiragana: "ぬぐ", romaji: "nugu", english: "to undress", level: "N5" },
    { kanji: "話す", hiragana: "はなす", romaji: "hanasu", english: "to speak / talk", level: "N5" },
    { kanji: "出す", hiragana: "だす", romaji: "dasu", english: "to submit / take out", level: "N5" },
    { kanji: "返す", hiragana: "かえす", romaji: "kaesu", english: "to return (an object)", level: "N5" },
    { kanji: "貸す", hiragana: "かす", romaji: "kasu", english: "to lend", level: "N5" },
    { kanji: "消す", hiragana: "けす", romaji: "kesu", english: "to turn off / erase", level: "N5" },

    // Group 2 (Ichidan)
    { kanji: "食べる", hiragana: "たべる", romaji: "taberu", english: "to eat", level: "N5" },
    { kanji: "見る", hiragana: "みる", romaji: "miru", english: "to watch / see", level: "N5" },
    { kanji: "開ける", hiragana: "あける", romaji: "akeru", english: "to open", level: "N5" },
    { kanji: "閉める", hiragana: "しめる", romaji: "shimeru", english: "to close", level: "N5" },
    { kanji: "寝る", hiragana: "ねる", romaji: "neru", english: "to sleep", level: "N5" },
    { kanji: "起きる", hiragana: "おきる", romaji: "okiru", english: "to wake up", level: "N5" },
    { kanji: "教える", hiragana: "おしえる", romaji: "oshieru", english: "to teach / tell", level: "N5" },
    { kanji: "忘れる", hiragana: "wasureru", romaji: "wasureru", english: "to forget", level: "N5" },
    { kanji: "浴びる", hiragana: "あびる", romaji: "abiru", english: "to take a shower", level: "N5" },
    { kanji: "出かける", hiragana: "でかける", romaji: "dekakeru", english: "to go out", level: "N5" },
    { kanji: "借りる", hiragana: "かりる", romaji: "kariru", english: "to borrow", level: "N5" },
    { kanji: "見せる", hiragana: "みせる", romaji: "miseru", english: "to show", level: "N5" },
    { kanji: "いる", hiragana: "いる", romaji: "iru", english: "to exist (living things)", level: "N5" },
    { kanji: "生まれる", hiragana: "うまれる", romaji: "umareru", english: "to be born", level: "N5" },
    
    // Group 3 (Irregular)
    { kanji: "する", hiragana: "する", romaji: "suru", english: "to do", level: "N5" },
    { kanji: "来る", hiragana: "くる", romaji: "kuru", english: "to come", level: "N5" },


    // === JLPT N4 VERBS ===
    // Group 1 (Godan)
    { kanji: "払う", hiragana: "はらう", romaji: "harau", english: "to pay", level: "N4" },
    { kanji: "祝う", hiragana: "いわう", romaji: "iwau", english: "to celebrate", level: "N4" },
    { kanji: "拾う", hiragana: "ひろう", romaji: "hirou", english: "to pick up", level: "N4" },
    { kanji: "願う", hiragana: "ねがう", romaji: "negau", english: "to pray / request", level: "N4" },
    { kanji: "違う", hiragana: "ちがう", romaji: "chigau", english: "to differ / be wrong", level: "N4" },
    { kanji: "手伝う", hiragana: "てつだう", romaji: "tetsudau", english: "to help", level: "N4" },
    { kanji: "向かう", hiragana: "むかう", romaji: "mukau", english: "to face / go towards", level: "N4" },
    { kanji: "勝つ", hiragana: "かつ", romaji: "katsu", english: "to win", level: "N4" },
    { kanji: "打つ", hiragana: "うつ", romaji: "utsu", english: "to hit / strike", level: "N4" },
    { kanji: "踊る", hiragana: "おどる", romaji: "odoru", english: "to dance", level: "N4" },
    { kanji: "守る", hiragana: "まもる", romaji: "mamoru", english: "to protect / obey", level: "N4" },
    { kanji: "祈る", hiragana: "いのる", romaji: "inoru", english: "to pray", level: "N4" },
    { kanji: "怒る", hiragana: "おこる", romaji: "okoru", english: "to get angry", level: "N4" },
    { kanji: "渡る", hiragana: "わたる", romaji: "wataru", english: "to cross (a bridge/road)", level: "N4" },
    { kanji: "光る", hiragana: "ひかる", romaji: "hikaru", english: "to shine", level: "N4" },
    { kanji: "残る", hiragana: "のこる", romaji: "nokoru", english: "to remain / stay behind", level: "N4" },
    { kanji: "断る", hiragana: "ことわる", romaji: "kotowaru", english: "to refuse / decline", level: "N4" },
    { kanji: "滑る", hiragana: "すべる", romaji: "suberu", english: "to slide / slip", level: "N4", group: 1, subtype: "ru", isException: true }, // Godan exception (looks like -eru)
    { kanji: "参る", hiragana: "まいる", romaji: "mairu", english: "to come / go (humble)", level: "N4", group: 1, subtype: "ru", isException: true }, // Godan exception (looks like -iru)
    { kanji: "謝る", hiragana: "あやまる", romaji: "ayamaru", english: "to apologize", level: "N4" },
    { kanji: "運ぶ", hiragana: "はこぶ", romaji: "hakobu", english: "to carry / transport", level: "N4" },
    { kanji: "選ぶ", hiragana: "えらぶ", romaji: "erabu", english: "to choose", level: "N4" },
    { kanji: "住む", hiragana: "すむ", romaji: "sumu", english: "to live", level: "N4" },
    { kanji: "包む", hiragana: "つつむ", romaji: "tsutsumu", english: "to wrap / pack", level: "N4" },
    { kanji: "盗む", hiragana: "ぬすむ", romaji: "nusumu", english: "to steal", level: "N4" },
    { kanji: "踏む", hiragana: "ふむ", romaji: "fumu", english: "to step on", level: "N4" },
    { kanji: "楽しむ", hiragana: "たのしむ", romaji: "tanoshima", english: "to enjoy", level: "N4" },
    { kanji: "頼む", hiragana: "たのむ", romaji: "tanomu", english: "to request / order", level: "N4" },
    { kanji: "働く", hiragana: "はたらく", romaji: "hataraku", english: "to work", level: "N4" },
    { kanji: "着く", hiragana: "つく", romaji: "tsuku", english: "to arrive", level: "N4" },
    { kanji: "泣く", hiragana: "なく", romaji: "naku", english: "to cry", level: "N4" },
    { kanji: "焼く", hiragana: "やく", romaji: "yaku", english: "to bake / grill", level: "N4" },
    { kanji: "驚く", hiragana: "おどろく", romaji: "odoroku", english: "to be surprised", level: "N4" },
    { kanji: "沸く", hiragana: "わく", romaji: "waku", english: "to boil (intransitive)", level: "N4" },
    { kanji: "空く", hiragana: "すく", romaji: "suku", english: "to become empty", level: "N4" },
    { kanji: "引く", hiragana: "ひく", romaji: "hiku", english: "to pull", level: "N4" },
    { kanji: "開く", hiragana: "ひらく", romaji: "hiraku", english: "to open / bloom", level: "N4" },
    { kanji: "磨く", hiragana: "みがく", romaji: "migaku", english: "to brush / polish", level: "N4" },
    { kanji: "急ぐ", hiragana: "いそぐ", romaji: "isogu", english: "to hurry", level: "N4" },
    { kanji: "騒ぐ", hiragana: "さわぐ", romaji: "sawagu", english: "to make noise", level: "N4" },
    { kanji: "直す", hiragana: "なおす", romaji: "naosu", english: "to cure / repair", level: "N4" },
    { kanji: "壊す", hiragana: "こわす", romaji: "kowasu", english: "to break / smash", level: "N4" },
    { kanji: "落とす", hiragana: "おとす", romaji: "otosu", english: "to drop (something)", level: "N4" },
    { kanji: "渡す", hiragana: "わたす", romaji: "watasu", english: "to hand over / pass", level: "N4" },
    { kanji: "起こす", hiragana: "おこす", romaji: "okosu", english: "to wake someone up", level: "N4" },
    
    // Group 2 (Ichidan)
    { kanji: "考える", hiragana: "かんがえる", romaji: "kangaeru", english: "to think / consider", level: "N4" },
    { kanji: "決める", hiragana: "きめる", romaji: "kimeru", english: "to decide", level: "N4" },
    { kanji: "信じる", hiragana: "しんじる", romaji: "shinjiru", english: "to believe", level: "N4" },
    { kanji: "閉じる", hiragana: "とじる", romaji: "tojiru", english: "to close (eyes/book)", level: "N4" },
    { kanji: "捨てる", hiragana: "すてる", romaji: "suteru", english: "to throw away", level: "N4" },
    { kanji: "調べる", hiragana: "しらべる", romaji: "shiraberu", english: "to investigate / check", level: "N4" },
    { kanji: "集める", hiragana: "あつめる", romaji: "atsumeru", english: "to collect", level: "N4" },
    { kanji: "変える", hiragana: "かえる", romaji: "kaeru", english: "to change", level: "N4" },
    { kanji: "始める", hiragana: "はじめる", romaji: "hajimeru", english: "to start", level: "N4" },
    { kanji: "続ける", hiragana: "つづける", romaji: "tsudzukeru", english: "to continue", level: "N4" },
    { kanji: "疲れる", hiragana: "つかれる", romaji: "tsukareru", english: "to get tired", level: "N4" },
    { kanji: "落ちる", hiragana: "おちる", romaji: "ochiru", english: "to fall / fail", level: "N4" },
    { kanji: "壊れる", hiragana: "こわれる", romaji: "kowareru", english: "to get broken", level: "N4" },
    { kanji: "消える", hiragana: "きえる", romaji: "kieru", english: "to disappear / go out", level: "N4" },
    { kanji: "比べる", hiragana: "くらべる", romaji: "kuraberu", english: "to compare", level: "N4" },
    { kanji: "投げる", hiragana: "なげる", romaji: "nageru", english: "to throw", level: "N4" },
    { kanji: "逃げる", hiragana: "にげる", romaji: "nigeru", english: "to run away / escape", level: "N4" },
    { kanji: "濡れる", hiragana: "ぬれる", romaji: "nureru", english: "to get wet", level: "N4" },
    { kanji: "褒める", hiragana: "ほめる", romaji: "homeru", english: "to praise / compliment", level: "N4" },
    { kanji: "負ける", hiragana: "まける", romaji: "makeru", english: "to lose (a game)", level: "N4" },
    { kanji: "見つける", hiragana: "みつける", romaji: "mitsukeru", english: "to find", level: "N4" },
    { kanji: "迎える", hiragana: "むかえる", romaji: "mukaeru", english: "to welcome / meet", level: "N4" },

    // === NEW APPROVED GROUP 2 (ICHIDAN) ADDITIONS ===
    { kanji: "あげる", hiragana: "あげる", romaji: "ageru", english: "to give", level: "N5" },
    { kanji: "出来る", hiragana: "できる", romaji: "dekiru", english: "to be able to", level: "N5" },
    { kanji: "晴れる", hiragana: "はれる", romaji: "hareru", english: "to clear up (weather)", level: "N5" },
    { kanji: "勤める", hiragana: "つとめる", romaji: "tsutomeru", english: "to work for / be employed", level: "N4" },
    { kanji: "くれる", hiragana: "くれる", romaji: "kureru", english: "to give (to speaker)", level: "N4" },
    { kanji: "暮れる", hiragana: "くれる", romaji: "kureru", english: "to grow dark", level: "N4" },
    { kanji: "下げる", hiragana: "さげる", romaji: "sageru", english: "to lower", level: "N4" },
    { kanji: "育てる", hiragana: "そだてる", romaji: "sodateru", english: "to raise / bring up", level: "N4" },
    { kanji: "倒れる", hiragana: "たおれる", romaji: "taoreru", english: "to collapse / fall down", level: "N4" },
    { kanji: "訪ねる", hiragana: "たずねる", romaji: "tazuneru", english: "to visit", level: "N4" },
    { kanji: "尋ねる", hiragana: "たずねる", romaji: "tazuneru", english: "to ask / inquire", level: "N4" },
    { kanji: "建てる", hiragana: "たてる", romaji: "tateru", english: "to build", level: "N4" },
    { kanji: "伝える", hiragana: "つたえる", romaji: "tsutaeru", english: "to convey / report", level: "N4" },
    { kanji: "届ける", hiragana: "とどける", romaji: "todokeru", english: "to deliver", level: "N4" },
    { kanji: "止める", hiragana: "とめる", romaji: "tomeru", english: "to stop / park", level: "N4" },
    { kanji: "取り替える", hiragana: "とりかえる", romaji: "torikaeru", english: "to exchange / replace", level: "N4" },
    { kanji: "慣れる", hiragana: "なれる", romaji: "nareru", english: "to get used to", level: "N4" },
    { kanji: "似る", hiragana: "にる", romaji: "niru", english: "to resemble", level: "N4" },
    { kanji: "のりかえる", hiragana: "のりかえる", romaji: "norikaeru", english: "to transfer (trains)", level: "N4" },
    { kanji: "冷える", hiragana: "ひえる", romaji: "hieru", english: "to grow cold", level: "N4" },
    { kanji: "増える", hiragana: "ふえる", romaji: "fueru", english: "to increase", level: "N4" },
    { kanji: "痩せる", hiragana: "やせる", romaji: "yaseru", english: "to lose weight", level: "N4" },
    { kanji: "辞める", hiragana: "やめる", romaji: "yameru", english: "to quit", level: "N4" },
    { kanji: "汚れる", hiragana: "よごれる", romaji: "yogoreru", english: "to get dirty", level: "N4" },
    { kanji: "揺れる", hiragana: "ゆれる", romaji: "yureru", english: "to shake", level: "N4" },
    { kanji: "遅れる", hiragana: "おくれる", romaji: "okureru", english: "to be late", level: "N4" },
    { kanji: "答える", hiragana: "こたえる", romaji: "kotaeru", english: "to answer", level: "N4" },
    { kanji: "立てる", hiragana: "たてる", romaji: "tateru", english: "to set up", level: "N4" },
    { kanji: "いじめる", hiragana: "いじめる", romaji: "ijimeru", english: "to tease / bully", level: "N4" },
    { kanji: "植える", hiragana: "うえる", romaji: "ueru", english: "to plant", level: "N4" },
    { kanji: "受ける", hiragana: "うける", romaji: "ukeru", english: "to receive / take exam", level: "N4" },
    { kanji: "片付ける", hiragana: "かたづける", romaji: "katazukeru", english: "to tidy up", level: "N4" },
    { kanji: "数える", hiragana: "かぞえる", romaji: "kazoeru", english: "to count", level: "N4" },
    { kanji: "付ける", hiragana: "つける", romaji: "tsukeru", english: "to attach / turn on", level: "N4" },
    { kanji: "生きる", hiragana: "いきる", romaji: "ikiru", english: "to live", level: "N3" },
    { kanji: "感じる", hiragana: "かんじる", romaji: "kanjiru", english: "to feel", level: "N3" },
    { kanji: "進める", hiragana: "すすめる", romaji: "susumeru", english: "to recommend / advance", level: "N3" },
    { kanji: "諦める", hiragana: "あきらめる", romaji: "akirameru", english: "to give up", level: "N3" },
    { kanji: "現れる", hiragana: "あらわれる", romaji: "arawareru", english: "to appear", level: "N3" },
    { kanji: "分ける", hiragana: "わける", romaji: "wakeru", english: "to divide / split", level: "N3" },
    { kanji: "助ける", hiragana: "たすける", romaji: "tasukeru", english: "to save / help", level: "N3" }
  ];

  // --- Dynamic Conjugator Function ---
  function conjugate(verb) {
    // 1. Irregulars (Hardcoded)
    if (verb.romaji === "suru") {
      return {
        ...verb,
        group: 3, subtype: "irregular", isException: false,
        teForm: "して", teHiragana: "して", teRomaji: "shite",
        taForm: "した", taHiragana: "した", taRomaji: "shita",
        politePastForm: "しました", politePastHiragana: "しました", politePastRomaji: "shimashita",
        plainPastNegForm: "しなかった", plainPastNegHiragana: "しなかった", plainPastNegRomaji: "shinakatta",
        explanation: "Irregular verb 'suru' conjugates directly into 'shite' (-te form) and 'shita' (-ta form)."
      };
    }
    if (verb.romaji === "kuru") {
      return {
        ...verb,
        group: 3, subtype: "irregular", isException: false,
        teForm: "来て", teHiragana: "きて", teRomaji: "kite",
        taForm: "来た", taHiragana: "きた", taRomaji: "kita",
        politePastForm: "来ました", politePastHiragana: "きました", politePastRomaji: "kimashita",
        plainPastNegForm: "来なかった", plainPastNegHiragana: "こなかった", plainPastNegRomaji: "konakatta",
        explanation: "Irregular verb 'kuru' (来る) changes its stem vowel, conjugating to 'kite' (来て) / 'kita' (来た)."
      };
    }

    // 2. Resolve Groups and Subtypes
    let group = verb.group;
    let subtype = verb.subtype;

    if (!group) {
      const isRuEnding = verb.hiragana.endsWith("る");
      const endsInIruOrEru = verb.romaji.endsWith("iru") || verb.romaji.endsWith("eru");

      if (isRuEnding && endsInIruOrEru) {
        group = 2;
        subtype = "ru-ichidan";
      } else {
        group = 1;
        const lastHira = verb.hiragana.slice(-1);
        if (lastHira === "う") subtype = "u";
        else if (lastHira === "つ") subtype = "tsu";
        else if (lastHira === "る") subtype = "ru";
        else if (lastHira === "ぶ") subtype = "bu";
        else if (lastHira === "む") subtype = "mu";
        else if (lastHira === "ぬ") subtype = "nu";
        else if (lastHira === "く") subtype = "ku";
        else if (lastHira === "ぐ") subtype = "gu";
        else if (lastHira === "す") subtype = "su";
      }
    }

    // Stems (Drop trailing character)
    const hiraStem = verb.hiragana.slice(0, -1);
    const kanjiStem = verb.kanji.slice(0, -1);

    // Suffixes
    let teSfx = "", taSfx = "", teRomSfx = "", taRomSfx = "";
    let explanation = "";

    if (group === 2) {
      teSfx = "て"; taSfx = "た"; teRomSfx = "te"; taRomSfx = "ta";
      explanation = "Group 2 (Ichidan) verbs conjugate simply by dropping the trailing 'ru' (る) and replacing it with 'te' or 'ta'.";
    } else {
      if (verb.romaji === "iku") {
        teSfx = "って"; taSfx = "った"; teRomSfx = "tte"; taRomSfx = "tta";
        explanation = "EXCEPTION: Although 'iku' ends in ~ku, it conjugates with 'tte' / 'tta' (行って / 行った) rather than 'ite' / 'ita'.";
      } else {
        switch (subtype) {
          case "u":
            teSfx = "って"; taSfx = "った"; teRomSfx = "tte"; taRomSfx = "tta";
            explanation = "Verbs ending in ~u (う) conjugate to -te/-ta by dropping 'u' and adding 'tte' / 'tta'.";
            break;
          case "tsu":
            teSfx = "って"; taSfx = "った"; teRomSfx = "tte"; taRomSfx = "tta";
            explanation = "Verbs ending in ~tsu (つ) conjugate to -te/-ta by dropping 'tsu' and adding 'tte' / 'tta'.";
            break;
          case "ru":
            teSfx = "って"; taSfx = "った"; teRomSfx = "tte"; taRomSfx = "tta";
            explanation = verb.isException ? 
              `WARNING: '${verb.romaji}' looks like an Ichidan verb due to -iru/-eru, but is actually a Group 1 (Godan) exception! It conjugates with 'tte'/'tta'.` :
              "Verbs ending in ~ru (る) conjugate to -te/-ta by dropping 'ru' and adding 'tte' / 'tta'.";
            break;
          case "bu":
            teSfx = "んで"; taSfx = "んだ"; teRomSfx = "nde"; taRomSfx = "nda";
            explanation = "Verbs ending in ~bu (ぶ) conjugate to -te/-ta by dropping 'bu' and adding 'nde' / 'nda'.";
            break;
          case "mu":
            teSfx = "んで"; taSfx = "んだ"; teRomSfx = "nde"; taRomSfx = "nda";
            explanation = "Verbs ending in ~mu (む) conjugate to -te/-ta by dropping 'mu' and adding 'nde' / 'nda'.";
            break;
          case "nu":
            teSfx = "んで"; taSfx = "んだ"; teRomSfx = "nde"; taRomSfx = "nda";
            explanation = "Verbs ending in ~nu (ぬ) conjugate to -te/-ta by dropping 'nu' and adding 'nde' / 'nda'.";
            break;
          case "ku":
            teSfx = "いて"; taSfx = "いた"; teRomSfx = "ite"; taRomSfx = "ita";
            explanation = "Verbs ending in ~ku (く) conjugate to -te/-ta by dropping 'ku' and adding 'ite' / 'ita'.";
            break;
          case "gu":
            teSfx = "いで"; taSfx = "いだ"; teRomSfx = "ide"; taRomSfx = "ida";
            explanation = "Verbs ending in ~gu (ぐ) conjugate to -te/-ta by dropping 'gu' and adding 'ide' / 'ida'.";
            break;
          case "su":
            teSfx = "して"; taSfx = "した"; teRomSfx = "shite"; taRomSfx = "shita";
            explanation = "Verbs ending in ~su (す) conjugate to -te/-ta by dropping 'su' and adding 'shite' / 'shita'.";
            break;
        }
      }
    }

    // Romaji Stem calculation
    let romStem = "";
    if (group === 2) {
      romStem = verb.romaji.slice(0, -2);
    } else {
      if (subtype === "tsu") {
        romStem = verb.romaji.slice(0, -3);
      } else if (subtype === "u") {
        romStem = verb.romaji.slice(0, -1);
      } else {
        romStem = verb.romaji.slice(0, -2);
      }
    }

    let politePastForm = "", politePastHiragana = "", politePastRomaji = "";
    let plainPastNegForm = "", plainPastNegHiragana = "", plainPastNegRomaji = "";

    if (group === 2) {
      politePastForm = kanjiStem + "ました";
      politePastHiragana = hiraStem + "ました";
      politePastRomaji = romStem + "mashita";

      plainPastNegForm = kanjiStem + "なかった";
      plainPastNegHiragana = hiraStem + "なかった";
      plainPastNegRomaji = romStem + "nakatta";
    } else {
      let iCol = "", aCol = "", iRom = "", aRom = "";
      
      switch (subtype) {
        case "u":
          iCol = "い"; aCol = "わ"; iRom = "i"; aRom = "wa";
          break;
        case "tsu":
          iCol = "ち"; aCol = "た"; iRom = "chi"; aRom = "ta";
          break;
        case "ru":
          iCol = "り"; aCol = "ら"; iRom = "ri"; aRom = "ra";
          break;
        case "bu":
          iCol = "び"; aCol = "ば"; iRom = "bi"; aRom = "ba";
          break;
        case "mu":
          iCol = "み"; aCol = "ま"; iRom = "mi"; aRom = "ma";
          break;
        case "nu":
          iCol = "に"; aCol = "な"; iRom = "ni"; aRom = "na";
          break;
        case "ku":
          iCol = "き"; aCol = "か"; iRom = "ki"; aRom = "ka";
          break;
        case "gu":
          iCol = "ぎ"; aCol = "が"; iRom = "gi"; aRom = "ga";
          break;
        case "su":
          iCol = "し"; aCol = "さ"; iRom = "shi"; aRom = "sa";
          break;
      }

      politePastForm = kanjiStem + iCol + "ました";
      politePastHiragana = hiraStem + iCol + "ました";
      politePastRomaji = romStem + iRom + "mashita";

      plainPastNegForm = kanjiStem + aCol + "なかった";
      plainPastNegHiragana = hiraStem + aCol + "なかった";
      plainPastNegRomaji = romStem + aRom + "nakatta";
    }

    return {
      kanji: verb.kanji,
      hiragana: verb.hiragana,
      romaji: verb.romaji,
      english: verb.english,
      level: verb.level,
      group: group,
      subtype: subtype,
      isException: verb.isException || false,
      teForm: kanjiStem + teSfx,
      teHiragana: hiraStem + teSfx,
      teRomaji: romStem + teRomSfx,
      taForm: kanjiStem + taSfx,
      taHiragana: hiraStem + taSfx,
      taRomaji: romStem + taRomSfx,
      politePastForm: politePastForm,
      politePastHiragana: politePastHiragana,
      politePastRomaji: politePastRomaji,
      plainPastNegForm: plainPastNegForm,
      plainPastNegHiragana: plainPastNegHiragana,
      plainPastNegRomaji: plainPastNegRomaji,
      explanation: explanation
    };
  }

  // Populate global database
  window.VERB_DATABASE = rawVerbs.map(conjugate);

  // Database of sentences for the "~ta koto ga aru" practice mode
  window.KOTO_GA_ARU_SENTENCES = [
    {
      sentencePattern: '<span class="kanji-hover" data-read="ふじさん">富士山</span>に ________ ことがあります。',
      englishTranslation: "I have climbed Mt. Fuji.",
      verbMeaning: "to climb",
      dictionaryForm: '<span class="kanji-hover" data-read="のぼる">登る</span>',
      correctConjugation: "登った",
      correctHiragana: "のぼった",
      correctRomaji: "nobotta"
    },
    {
      sentencePattern: '<span class="kanji-hover" data-read="すし">寿司</span>を ________ ことがあります。',
      englishTranslation: "I have eaten sushi.",
      verbMeaning: "to eat",
      dictionaryForm: '<span class="kanji-hover" data-read="たべる">食べる</span>',
      correctConjugation: "食べた",
      correctHiragana: "たべた",
      correctRomaji: "tabeta"
    },
    {
      sentencePattern: '<span class="kanji-hover" data-read="にほん">日本</span>へ ________ ことがありますか。',
      englishTranslation: "Have you ever gone to Japan?",
      verbMeaning: "to go",
      dictionaryForm: '<span class="kanji-hover" data-read="いく">行く</span>',
      correctConjugation: "行った",
      correctHiragana: "いった",
      correctRomaji: "itta"
    },
    {
      sentencePattern: '<span class="kanji-hover" data-read="きょうと">京都</span>の<span class="kanji-hover" data-read="きんかくじ">金閣寺</span>を ________ ことがあります。',
      englishTranslation: "I have seen the Kinkakuji temple in Kyoto.",
      verbMeaning: "to see",
      dictionaryForm: '<span class="kanji-hover" data-read="みる">見る</span>',
      correctConjugation: "見た",
      correctHiragana: "みた",
      correctRomaji: "mita"
    },
    {
      sentencePattern: '<span class="kanji-hover" data-read="にほん">日本</span>の<span class="kanji-hover" data-read="おんせん">温泉</span>に ________ ことがあります。',
      englishTranslation: "I have entered a Japanese hot spring.",
      verbMeaning: "to enter",
      dictionaryForm: '<span class="kanji-hover" data-read="はいる">入る</span>',
      correctConjugation: "入った",
      correctHiragana: "はいった",
      correctRomaji: "haitta"
    },
    {
      sentencePattern: '<span class="kanji-hover" data-read="かぶき">歌舞伎</span>を ________ ことがありますか。',
      englishTranslation: "Have you ever watched Kabuki theatre?",
      verbMeaning: "to watch",
      dictionaryForm: '<span class="kanji-hover" data-read="みる">見る</span>',
      correctConjugation: "見た",
      correctHiragana: "みた",
      correctRomaji: "mita"
    },
    {
      sentencePattern: '<span class="kanji-hover" data-read="さしみ">刺身</span>を ________ ことがありません。',
      englishTranslation: "I have never eaten sashimi.",
      verbMeaning: "to eat",
      dictionaryForm: '<span class="kanji-hover" data-read="たべる">食べる</span>',
      correctConjugation: "食べた",
      correctHiragana: "たべた",
      correctRomaji: "tabeta"
    },
    {
      sentencePattern: '<span class="kanji-hover" data-read="にほん">日本</span>の<span class="kanji-hover" data-read="きもの">着物</span>を ________ ことがあります。',
      englishTranslation: "I have worn a Japanese kimono.",
      verbMeaning: "to wear",
      dictionaryForm: '<span class="kanji-hover" data-read="きる">着る</span>',
      correctConjugation: "着た",
      correctHiragana: "きた",
      correctRomaji: "kita"
    },
    {
      sentencePattern: '<span class="kanji-hover" data-read="にほんしゅ">日本酒</span>を ________ ことがありません。',
      englishTranslation: "I have never drunk sake.",
      verbMeaning: "to drink",
      dictionaryForm: '<span class="kanji-hover" data-read="のむ">飲む</span>',
      correctConjugation: "飲んだ",
      correctHiragana: "のんだ",
      correctRomaji: "nonda"
    },
    {
      sentencePattern: '<span class="kanji-hover" data-read="にほんご">日本語</span>で ________ ことがあります。',
      englishTranslation: "I have spoken in Japanese.",
      verbMeaning: "to speak",
      dictionaryForm: '<span class="kanji-hover" data-read="はなす">話す</span>',
      correctConjugation: "話した",
      correctHiragana: "はなした",
      correctRomaji: "hanashita"
    }
  ];

})();
