// Lesson Sequence & Mnemonic Rule Content
// Defines static lesson slides, the mnemonic conjugation song, and interactive sandbox visualizer.

window.LESSONS_MODULE = (function() {

  const slides = [
    {
      title: "Understanding Japanese Verb Groups",
      type: "intro",
      content: `
        <p class="lead">Before conjugating verbs into the <strong>-te (て)</strong> or <strong>-ta (た)</strong> forms, you must know how to identify the three verb groups in Japanese.</p>
        
        <div class="card-grid">
          <div class="glass-card group-card group-1">
            <span class="badge badge-g1">Group 1</span>
            <h3>Godan (五段)</h3>
            <p class="desc">Also called "U-verbs". Their dictionary forms end in various "u" column Hiragana:</p>
            <ul class="example-list">
              <li>う - <span class="kanji-hover" data-read="かう">買う</span> <span>(buy)</span></li>
              <li>つ - <span class="kanji-hover" data-read="まつ">待つ</span> <span>(wait)</span></li>
              <li>る - <span class="kanji-hover" data-read="とる">取る</span> <span>(take)</span></li>
              <li>む, ぶ, ぬ</li>
              <li>く, ぐ, す</li>
            </ul>
          </div>

          <div class="glass-card group-card group-2">
            <span class="badge badge-g2">Group 2</span>
            <h3>Ichidan (一段)</h3>
            <p class="desc">Also called "Ru-verbs". Almost all end in either <strong>-iru</strong> or <strong>-eru</strong> in their readings:</p>
            <ul class="example-list">
              <li>いる - <span class="kanji-hover" data-read="みる">見る</span> <span>(see)</span></li>
              <li>える - <span class="kanji-hover" data-read="たべる">食べる</span> <span>(eat)</span></li>
            </ul>
            <div class="warning-tip">
              <strong>Note:</strong> Some verbs look like Ichidan but conjugate as Godan (e.g., <span class="kanji-hover" data-read="かえる">帰る</span> - to return). We will learn these exceptions!
            </div>
          </div>

          <div class="glass-card group-card group-3">
            <span class="badge badge-g3">Group 3</span>
            <h3>Irregular</h3>
            <p class="desc">There are only two irregular verbs in Japanese. You just have to memorize them!</p>
            <ul class="example-list">
              <li><span class="kanji-hover" data-read="する">する</span> <span>(to do)</span></li>
              <li><span class="kanji-hover" data-read="くる">来る</span> <span>(to come)</span></li>
            </ul>
          </div>
        </div>
      `
    },
    {
      title: "Group 2 (Ichidan) & Group 3 (Irregular)",
      type: "easy-groups",
      content: `
        <p class="lead">Let's start with the easy ones! Group 2 and Group 3 verbs follow extremely simple conjugation rules.</p>
        
        <div class="rules-container">
          <div class="glass-card rule-box">
            <h3><span class="badge badge-g2">Group 2</span> Ichidan Rule</h3>
            <div class="formula">
              <span class="math-term">Dictionary Form</span>
              <span class="math-op">- る</span>
              <span class="math-op">+ て / た</span>
            </div>
            <p>Simply drop the final <strong>る</strong> and add <strong>て</strong> or <strong>た</strong>.</p>
            <table class="lesson-table">
              <thead>
                <tr><th>Meaning</th><th>Dictionary</th><th>Drop る</th><th>-te Form</th><th>-ta Form</th></tr>
              </thead>
              <tbody>
                <tr><td>to eat</td><td><span class="kanji-hover" data-read="たべる">食べる</span> (たべる)</td><td>たべ</td><td class="hl-te">たべて</td><td class="hl-ta">たべた</td></tr>
                <tr><td>to see</td><td><span class="kanji-hover" data-read="みる">見る</span> (みる)</td><td>み</td><td class="hl-te">みて</td><td class="hl-ta">みた</td></tr>
              </tbody>
            </table>
          </div>

          <div class="glass-card rule-box">
            <h3><span class="badge badge-g3">Group 3</span> Irregular Rule</h3>
            <p>No formula here—just memorize these direct modifications:</p>
            <table class="lesson-table">
              <thead>
                <tr><th>Meaning</th><th>Dictionary</th><th>-te Form</th><th>-ta Form</th></tr>
              </thead>
              <tbody>
                <tr><td>to do</td><td>する</td><td class="hl-te">して</td><td class="hl-ta">した</td></tr>
                <tr><td>to come</td><td><span class="kanji-hover" data-read="くる">来る</span> (くる)</td><td class="hl-te"><span class="kanji-hover" data-read="きて">来て</span> (きて)</td><td class="hl-ta"><span class="kanji-hover" data-read="きた">来た</span> (きた)</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      `
    },
    {
      title: "Group 1 (Godan) - The Conjugation Song",
      type: "song-mnemonic",
      content: `
        <p class="lead">Group 1 verbs conjugate based on their <strong>final syllable</strong>. Japanese students learn this through a famous mnemonic song set to the tune of <em>"Oh My Darling, Clementine"</em>.</p>
        
        <div class="song-visualizer-section">
          <div class="song-column">
            <h3>🎵 The Conjugation Song</h3>
            <p class="song-subtitle">Click each line below to see corresponding verbs and rules!</p>
            <div class="song-lines">
              <div class="song-line" data-rule="u-tsu-ru">
                <span class="music-icon">🎵</span>
                <span class="lyrics"><strong>う、つ、る</strong> &rarr; <strong>って</strong></span>
              </div>
              <div class="song-line" data-rule="mu-bu-nu">
                <span class="music-icon">🎵</span>
                <span class="lyrics"><strong>む、ぶ、ぬ</strong> &rarr; <strong>んで</strong></span>
              </div>
              <div class="song-line" data-rule="ku">
                <span class="music-icon">🎵</span>
                <span class="lyrics"><strong>く</strong> &rarr; <strong>いて</strong> <span class="exception-note">[<span class="kanji-hover" data-read="いく">行く</span> &rarr; って]</span></span>
              </div>
              <div class="song-line" data-rule="gu">
                <span class="music-icon">🎵</span>
                <span class="lyrics"><strong>ぐ</strong> &rarr; <strong>いで</strong></span>
              </div>
              <div class="song-line" data-rule="su">
                <span class="music-icon">🎵</span>
                <span class="lyrics"><strong>す</strong> &rarr; <strong>して</strong></span>
              </div>
            </div>
          </div>

          <div class="song-details-column">
            <div id="song-rule-details" class="glass-card details-card">
              <div class="placeholder-text">
                <p>💡 Click on any song line to learn the conjugation rule, see example verbs, and hover over Kanji to check their readings!</p>
              </div>
            </div>
          </div>
        </div>
      `
    },
    {
      title: "Expressing Experience: 〜たことがある",
      type: "grammar-exp",
      content: `
        <p class="lead">Now that you know how to conjugate verbs into the <strong>-ta (た) form</strong>, you can immediately build the common grammar structure: <strong>〜たことがある</strong> (to have the experience of doing something).</p>
        
        <div class="rules-container">
          <div class="glass-card rule-box">
            <h3>Structure & Usage</h3>
            <div class="formula">
              <span class="math-term">Verb in -ta form (た形)</span>
              <span class="math-op">+ ことがある / ことがあります</span>
            </div>
            <p>This grammar point is equivalent to saying <em>"I have done [verb] before"</em> in English. To make it polite, change <strong>ある</strong> to <strong>あります</strong>.</p>
            
            <table class="lesson-table" style="margin-top: 1.5rem;">
              <thead>
                <tr><th>Base Verb</th><th>-ta Form</th><th>Experience Pattern</th><th>Meaning</th></tr>
              </thead>
              <tbody>
                <tr><td><span class="kanji-hover" data-read="いく">行く</span> (いく)</td><td>いった</td><td><span class="kanji-hover" data-read="いった">行った</span>ことがある</td><td>I have been there before.</td></tr>
                <tr><td><span class="kanji-hover" data-read="たべる">食べる</span> (たべる)</td><td>たべた</td><td><span class="kanji-hover" data-read="たべた">食べた</span>ことがあります</td><td>I have eaten it before.</td></tr>
                <tr><td>する</td><td>した</td><td>したことがありますか</td><td>Have you ever done it?</td></tr>
              </tbody>
            </table>
          </div>

          <div class="glass-card rule-box">
            <h3>Negative Form: "Have Never Done..."</h3>
            <p>To say you have <em>never</em> experienced something, simply change <strong>ある</strong> to its negative form: <strong>ない</strong> (casual) or <strong>ありません</strong> (polite).</p>
            
            <div class="formula" style="background: rgba(255, 118, 117, 0.08); border-color: rgba(255, 118, 117, 0.25);">
              <span class="math-term" style="color: #fff;">Verb in -ta form</span>
              <span class="math-op" style="color: var(--color-danger);">+ ことがない / ことはありません</span>
            </div>

            <div class="warning-tip" style="background: rgba(108, 92, 231, 0.08); border-color: rgba(108, 92, 231, 0.2); color: var(--color-text);">
              <strong>Examples:</strong><br>
              • <span class="kanji-hover" data-read="ふじさん">富士山</span>に<span class="kanji-hover" data-read="のぼった">登った</span><strong>ことがない</strong>。 (I have never climbed Mt. Fuji.)<br>
              • <span class="kanji-hover" data-read="にほんしゅ">日本酒</span>を<span class="kanji-hover" data-read="のんだ">飲んだ</span><strong>ことはありません</strong>。 (I have never drunk Japanese sake.)
            </div>
          </div>
        </div>
      `
    },
    {
      title: "Polite Past (-mashita) & Plain Past Neg (-nakatta)",
      type: "past-forms",
      content: `
        <p class="lead">Let's learn how to conjugate verbs into the <strong>Polite Past (-mashita)</strong> and <strong>Plain Past Negative (-nakatta)</strong> forms. These forms allow you to express completed past actions in both polite and casual styles.</p>
        
        <div class="rules-container">
          <!-- Polite Past -->
          <div class="glass-card rule-box">
            <h3>Polite Past (-mashita / ました)</h3>
            <p>Formed using the <strong>Masu-stem</strong> (dropping ~ru for Group 2, or shifting the last vowel to the "i" column for Group 1) + <strong>ました</strong>.</p>
            
            <table class="lesson-table" style="margin-top: 1rem;">
              <thead>
                <tr><th>Group</th><th>Verb</th><th>Masu-stem</th><th>Polite Past</th><th>Meaning</th></tr>
              </thead>
              <tbody>
                <tr><td>Group 1</td><td><span class="kanji-hover" data-read="かう">買う</span></td><td>かい</td><td><span class="kanji-hover" data-read="かいました">買いました</span></td><td>bought</td></tr>
                <tr><td>Group 1</td><td><span class="kanji-hover" data-read="まつ">待つ</span></td><td>まち</td><td><span class="kanji-hover" data-read="まちました">待ちました</span></td><td>waited</td></tr>
                <tr><td>Group 2</td><td><span class="kanji-hover" data-read="たべる">食べる</span></td><td>たべ</td><td><span class="kanji-hover" data-read="たべました">食べました</span></td><td>ate</td></tr>
                <tr><td>Group 3</td><td><span class="kanji-hover" data-read="する">する</span></td><td>し</td><td><span class="kanji-hover" data-read="しました">しました</span></td><td>did</td></tr>
                <tr><td>Group 3</td><td><span class="kanji-hover" data-read="くる">来る</span></td><td>き</td><td><span class="kanji-hover" data-read="きました">来ました</span></td><td>came</td></tr>
              </tbody>
            </table>
          </div>

          <!-- Plain Past Negative -->
          <div class="glass-card rule-box">
            <h3>Plain Past Negative (-nakatta / なかった)</h3>
            <p>Formed using the <strong>Negative-stem</strong> (dropping ~ru for Group 2, or shifting the last vowel to the "a" column for Group 1) + <strong>なかった</strong>. <br><em>*Note: Godan verbs ending in <strong>う</strong> shift to <strong>わ</strong>.</em></p>
            
            <table class="lesson-table" style="margin-top: 1rem;">
              <thead>
                <tr><th>Group</th><th>Verb</th><th>Negative-stem</th><th>Plain Past Neg</th><th>Meaning</th></tr>
              </thead>
              <tbody>
                <tr><td>Group 1</td><td><span class="kanji-hover" data-read="かう">買う</span></td><td>かわ</td><td><span class="kanji-hover" data-read="かわなかった">買わなかった</span></td><td>did not buy</td></tr>
                <tr><td>Group 1</td><td><span class="kanji-hover" data-read="まつ">待つ</span></td><td>また</td><td><span class="kanji-hover" data-read="またなかった">待たなかった</span></td><td>did not wait</td></tr>
                <tr><td>Group 2</td><td><span class="kanji-hover" data-read="たべる">食べる</span></td><td>たべ</td><td><span class="kanji-hover" data-read="たべなかった">食べなかった</span></td><td>did not eat</td></tr>
                <tr><td>Group 3</td><td><span class="kanji-hover" data-read="する">する</span></td><td>し</td><td><span class="kanji-hover" data-read="しなかった">しなかった</span></td><td>did not do</td></tr>
                <tr><td>Group 3</td><td><span class="kanji-hover" data-read="くる">来る</span></td><td>こ</td><td><span class="kanji-hover" data-read="こなかった">来なかった</span></td><td>did not come</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      `
    },
    {
      title: "Interactive Conjugation Simulator",
      type: "simulator",
      content: `
        <p class="lead">Test your understanding! Select a verb from the database and toggle between forms to watch the step-by-step conjugation formula in action.</p>
        
        <div class="simulator-layout">
          <div class="glass-card sim-controls">
            <div class="form-group">
              <label for="sim-verb-select">Choose a Verb:</label>
              <select id="sim-verb-select" class="styled-select"></select>
            </div>
            
            <div class="form-group">
              <label>Choose Target Form:</label>
              <div class="toggle-buttons" style="flex-wrap: wrap; gap: 8px;">
                <button type="button" id="btn-toggle-te" class="toggle-btn active" data-form="te">-te Form (て)</button>
                <button type="button" id="btn-toggle-ta" class="toggle-btn" data-form="ta">-ta Form (た)</button>
                <button type="button" id="btn-toggle-politePast" class="toggle-btn" data-form="politePast">-mashita (ました)</button>
                <button type="button" id="btn-toggle-plainPastNeg" class="toggle-btn" data-form="plainPastNeg">-nakatta (なかった)</button>
              </div>
            </div>

            <div class="verb-info-card">
              <div class="verb-main-display">
                <h2 id="sim-info-kanji">買う</h2>
                <div id="sim-info-romaji">かう (to buy)</div>
              </div>
              <div class="verb-meta-row">
                <div><strong>Group:</strong> <span id="sim-info-group">Group 1 (Godan)</span></div>
                <div><strong>Suffix:</strong> <span id="sim-info-suffix">う</span></div>
              </div>
            </div>
          </div>

          <div class="glass-card sim-output">
            <h3>Conjugation Pipeline</h3>
            <div class="pipeline-flow">
              <div class="flow-step" id="step-1">
                <span class="step-num">1</span>
                <div class="step-desc">
                  <h4>Analyze stem & ending</h4>
                  <div class="step-viz" id="viz-step-1"></div>
                </div>
              </div>

              <div class="flow-step" id="step-2">
                <span class="step-num">2</span>
                <div class="step-desc">
                  <h4>Apply replacement rule</h4>
                  <div class="step-viz" id="viz-step-2"></div>
                </div>
              </div>

              <div class="flow-step" id="step-3">
                <span class="step-num">3</span>
                <div class="step-desc">
                  <h4>Final Conjugated Form</h4>
                  <div class="step-viz" id="viz-step-3"></div>
                </div>
              </div>
            </div>

            <div class="explanation-box" id="sim-explanation"></div>
          </div>
        </div>
      `
    }
  ];

  const songRules = {
    "u-tsu-ru": {
      title: "う, つ, る &rarr; って / った",
      formula: "Drop last syllable, add って (te-form) or った (ta-form).",
      examples: [
        { dict: '<span class="kanji-hover" data-read="かう">買う</span> (かう)', te: '<span class="kanji-hover" data-read="かって">買って</span>', ta: '<span class="kanji-hover" data-read="かった">買った</span>', meaning: "to buy" },
        { dict: '<span class="kanji-hover" data-read="まつ">待つ</span> (まつ)', te: '<span class="kanji-hover" data-read="まって">待って</span>', ta: '<span class="kanji-hover" data-read="まった">待った</span>', meaning: "to wait" },
        { dict: '<span class="kanji-hover" data-read="とる">取る</span> (とる)', te: '<span class="kanji-hover" data-read="とって">取って</span>', ta: '<span class="kanji-hover" data-read="とった">取った</span>', meaning: "to take" }
      ],
      note: `<strong>Exception:</strong> <span class="kanji-hover" data-read="かえる">帰る</span> (to return) is a Godan verb despite ending in -eru, so it conjugates to <span class="kanji-hover" data-read="かえって">帰って</span> / <span class="kanji-hover" data-read="かえった">帰った</span>!`
    },
    "mu-bu-nu": {
      title: "む, ぶ, ぬ &rarr; んで / んだ",
      formula: "Drop last syllable, add んで (te-form) or んだ (ta-form). Note the voiced sound (濁音)!",
      examples: [
        { dict: '<span class="kanji-hover" data-read="のむ">飲む</span> (のむ)', te: '<span class="kanji-hover" data-read="のんで">飲んで</span>', ta: '<span class="kanji-hover" data-read="のんだ">飲んだ</span>', meaning: "to drink" },
        { dict: '<span class="kanji-hover" data-read="あそぶ">遊ぶ</span> (あそぶ)', te: '<span class="kanji-hover" data-read="あそんで">遊んで</span>', ta: '<span class="kanji-hover" data-read="あそんだ">遊んだ</span>', meaning: "to play" },
        { dict: '<span class="kanji-hover" data-read="しぬ">死ぬ</span> (しぬ)', te: '<span class="kanji-hover" data-read="しんで">死んで</span>', ta: '<span class="kanji-hover" data-read="しんだ">死んだ</span>', meaning: "to die" }
      ],
      note: `<strong>Deadly Fact:</strong> <span class="kanji-hover" data-read="しぬ">死ぬ</span> (to die) is the only verb in the entire Japanese language that ends in 'nu'.`
    },
    "ku": {
      title: "く &rarr; いて / いた",
      formula: "Drop く, add いて (te-form) or いた (ta-form).",
      examples: [
        { dict: '<span class="kanji-hover" data-read="かく">書く</span> (かく)', te: '<span class="kanji-hover" data-read="かいて">書いて</span>', ta: '<span class="kanji-hover" data-read="かいた">書いた</span>', meaning: "to write" },
        { dict: '<span class="kanji-hover" data-read="きく">聞く</span> (きく)', te: '<span class="kanji-hover" data-read="きいて">聞いて</span>', ta: '<span class="kanji-hover" data-read="きいた">聞いた</span>', meaning: "to listen/ask" }
      ],
      note: `<strong>🚨 MAJOR EXCEPTION:</strong> <span class="kanji-hover" data-read="いく">行く</span> (to go) is irregular in this subgroup. It conjugates to <strong><span class="kanji-hover" data-read="いって">行って</span> / <span class="kanji-hover" data-read="いった">行った</span></strong> instead of iite / iita!`
    },
    "gu": {
      title: "ぐ &rarr; いで / いだ",
      formula: "Drop ぐ, add いで (te-form) or いだ (ida-form). Think of it like the 'ku' rule, but voiced (with ten-ten)!",
      examples: [
        { dict: '<span class="kanji-hover" data-read="およぐ">泳ぐ</span> (およぐ)', te: '<span class="kanji-hover" data-read="およいで">泳いで</span>', ta: '<span class="kanji-hover" data-read="およいだ">泳いだ</span>', meaning: "to swim" },
        { dict: '<span class="kanji-hover" data-read="いそぐ">急ぐ</span> (いそぐ)', te: '<span class="kanji-hover" data-read="いそいで">急いで</span>', ta: '<span class="kanji-hover" data-read="いそいだ">急いだ</span>', meaning: "to hurry" }
      ],
      note: `Because 'gu' is voiced, the suffixes 'te' and 'ta' also become voiced ('de' and 'da').`
    },
    "su": {
      title: "す &rarr; して / した",
      formula: "Drop す, add して (te-form) or した (ta-form).",
      examples: [
        { dict: '<span class="kanji-hover" data-read="はなす">話す</span> (はなす)', te: '<span class="kanji-hover" data-read="はなして">話して</span>', ta: '<span class="kanji-hover" data-read="はなした">話した</span>', meaning: "to speak" },
        { dict: '<span class="kanji-hover" data-read="かす">貸す</span> (かす)', te: '<span class="kanji-hover" data-read="かして">貸して</span>', ta: '<span class="kanji-hover" data-read="かした">貸した</span>', meaning: "to lend" }
      ],
      note: "This matches the conjugation of the irregular verb 'suru' (する &rarr; して)."
    }
  };

  let activeLessonKey = null;
  let activeLessonSlides = [];
  let currentSlideIndex = 0;
  let lessonContainerId = "";

  const lessonsData = {
    "teta-basics": {
      title: "-te & -ta Conjugation Basics",
      description: "Master verb groups, Ichidan vs. Godan stem rules, and sing the mnemonic song to memorize standard changes.",
      slidesIndices: [0, 1, 2]
    },
    "past-tense": {
      title: "Past Tense & Experiences",
      description: "Express plain past experiences (〜たことがある), polite past (-mashita), and plain negative past (-nakatta) conjugations.",
      slidesIndices: [3, 4]
    },
    "simulator": {
      title: "Interactive Simulator",
      description: "Select any verb from the database and visually inspect the stem split and replacement formulas step-by-step.",
      slidesIndices: [5]
    }
  };

  function initLessonView(containerId) {
    lessonContainerId = containerId;
    activeLessonKey = null;
    activeLessonSlides = [];
    currentSlideIndex = 0;
    renderPortal();
  }

  function renderPortal() {
    const container = document.getElementById(lessonContainerId);
    if (!container) return;

    container.innerHTML = `
      <div class="lessons-portal">
        <div class="portal-header text-center">
          <h2>Lessons Portal 📚</h2>
          <p class="lead" style="color: var(--color-text-muted);">Select a lesson module below to begin learning conjugation rules step-by-step.</p>
        </div>
        
        <div class="lessons-grid">
          <div class="glass-card lesson-card clickable" onclick="window.LESSONS_MODULE.startLesson('teta-basics')">
            <div class="lesson-card-header">
              <span class="lesson-badge" style="background: rgba(108, 92, 231, 0.2); border: 1px solid rgba(108, 92, 231, 0.4); color: var(--sakura-pink);">Lesson 1</span>
              <h3>-te & -ta Conjugation Basics</h3>
            </div>
            <p>${lessonsData["teta-basics"].description}</p>
            <div class="lesson-meta-row">
              <span>📋 3 Topics</span>
              <span class="start-text">Start Lesson &rarr;</span>
            </div>
          </div>
          
          <div class="glass-card lesson-card clickable" onclick="window.LESSONS_MODULE.startLesson('past-tense')">
            <div class="lesson-card-header">
              <span class="lesson-badge" style="background: rgba(0, 206, 201, 0.2); border: 1px solid rgba(0, 206, 201, 0.4); color: var(--cyan-accent);">Lesson 2</span>
              <h3>Past Tense & Experiences</h3>
            </div>
            <p>${lessonsData["past-tense"].description}</p>
            <div class="lesson-meta-row">
              <span>📋 2 Topics</span>
              <span class="start-text">Start Lesson &rarr;</span>
            </div>
          </div>
          
          <div class="glass-card lesson-card clickable" onclick="window.LESSONS_MODULE.startLesson('simulator')">
            <div class="lesson-card-header">
              <span class="lesson-badge" style="background: rgba(255, 234, 167, 0.15); border: 1px solid rgba(255, 234, 167, 0.35); color: #ffeaa7;">Toolbox</span>
              <h3>Interactive Simulator</h3>
            </div>
            <p>${lessonsData["simulator"].description}</p>
            <div class="lesson-meta-row">
              <span>🛠️ Sandbox Tool</span>
              <span class="start-text">Open Sandbox &rarr;</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function startLesson(lessonKey) {
    activeLessonKey = lessonKey;
    activeLessonSlides = lessonsData[lessonKey].slidesIndices.map(idx => slides[idx]);
    currentSlideIndex = 0;
    renderSlide(lessonContainerId);
  }

  function exitToPortal() {
    activeLessonKey = null;
    activeLessonSlides = [];
    currentSlideIndex = 0;
    renderPortal();
  }

  function renderSlide(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const slide = activeLessonSlides[currentSlideIndex];
    const progressPercent = ((currentSlideIndex + 1) / activeLessonSlides.length) * 100;

    container.innerHTML = `
      <div class="lesson-header">
        <div class="lesson-title-bar">
          <button class="back-link" onclick="window.LESSONS_MODULE.exitToPortal()">&larr; Lessons List</button>
          <span class="slide-indicator">Slide ${currentSlideIndex + 1} of ${activeLessonSlides.length}</span>
          <h2>${slide.title}</h2>
        </div>
        <div class="progress-bar-container">
          <div class="progress-bar-fill" style="width: ${progressPercent}%"></div>
        </div>
      </div>

      <div class="lesson-slide-content">
        ${slide.content}
      </div>

      <div class="lesson-navigation">
        <button id="btn-prev-slide" class="action-btn secondary-btn" ${currentSlideIndex === 0 ? "disabled" : ""}>
          &larr; Back
        </button>
        <button id="btn-next-slide" class="action-btn primary-btn">
          ${currentSlideIndex === activeLessonSlides.length - 1 ? "Finish Lesson &rarr;" : "Next &rarr;"}
        </button>
      </div>
    `;

    // Hook slide-specific events
    if (slide.type === "song-mnemonic") {
      setupSongEvents();
    } else if (slide.type === "simulator") {
      setupSimulatorEvents();
    }

    // Add navigation listeners
    document.getElementById("btn-prev-slide").addEventListener("click", () => {
      if (currentSlideIndex > 0) {
        currentSlideIndex--;
        renderSlide(containerId);
      }
    });

    document.getElementById("btn-next-slide").addEventListener("click", () => {
      if (currentSlideIndex < activeLessonSlides.length - 1) {
        currentSlideIndex++;
        renderSlide(containerId);
      } else {
        exitToPortal();
        window.APP_ROUTER.markLessonCompleted();
      }
    });
  }

  function setupSongEvents() {
    const lines = document.querySelectorAll(".song-line");
    const detailsContainer = document.getElementById("song-rule-details");

    lines.forEach(line => {
      line.addEventListener("click", () => {
        // Remove active state from other lines
        lines.forEach(l => l.classList.remove("active"));
        line.classList.add("active");

        const ruleKey = line.dataset.rule;
        const rule = songRules[ruleKey];
        if (!rule) return;

        // Render details
        let examplesHtml = rule.examples.map(ex => `
          <div class="song-example-item">
            <span class="ex-dict">${ex.dict}</span>
            <span class="ex-arrow">&rarr;</span>
            <span class="ex-te">${ex.te}</span>
            <span class="ex-ta">${ex.ta}</span>
            <span class="ex-meaning">(${ex.meaning})</span>
          </div>
        `).join("");

        detailsContainer.innerHTML = `
          <div class="rule-details-content">
            <h4>${rule.title}</h4>
            <p class="rule-desc"><strong>Rule:</strong> ${rule.formula}</p>
            <div class="examples-subgrid">
              <h5>Examples:</h5>
              ${examplesHtml}
            </div>
            <div class="rule-footnote">
              <span class="info-icon">💡</span>
              <p>${rule.note}</p>
            </div>
          </div>
        `;
        
        // Trigger a CSS animation
        detailsContainer.classList.remove("slide-in-anim");
        void detailsContainer.offsetWidth; // trigger reflow
        detailsContainer.classList.add("slide-in-anim");
      });
    });

    // Automatically trigger the first item on load
    if (lines.length > 0) {
      lines[0].click();
    }
  }

  let simulatorState = {
    verb: null,
    form: "te" // or "ta"
  };

  function setupSimulatorEvents() {
    const select = document.getElementById("sim-verb-select");
    const toggleBtns = document.querySelectorAll(".toggle-buttons .toggle-btn");

    // Populate select
    select.innerHTML = window.VERB_DATABASE.map((v, idx) => `
      <option value="${idx}">${v.kanji} (${v.hiragana} - ${v.english})</option>
    `).join("");

    select.addEventListener("change", (e) => {
      const verbIdx = parseInt(e.target.value, 10);
      simulatorState.verb = window.VERB_DATABASE[verbIdx];
      runSimulation();
    });

    toggleBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        toggleBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        simulatorState.form = btn.dataset.form;
        runSimulation();
      });
    });

    // Initial run
    if (window.VERB_DATABASE.length > 0) {
      simulatorState.verb = window.VERB_DATABASE[0];
      runSimulation();
    }
  }

  function runSimulation() {
    const v = simulatorState.verb;
    if (!v) return;

    const form = simulatorState.form;

    // Update basic display info with Hiragana hover reading
    document.getElementById("sim-info-kanji").innerHTML = `<span class="kanji-hover" data-read="${v.hiragana}">${v.kanji}</span>`;
    document.getElementById("sim-info-romaji").innerText = `${v.hiragana} (${v.english})`;
    
    let groupText = `Group ${v.group}`;
    if (v.group === 1) groupText += " (Godan)";
    else if (v.group === 2) groupText += " (Ichidan)";
    else groupText += " (Irregular)";
    document.getElementById("sim-info-group").innerText = groupText;

    let suffixChar = v.hiragana.slice(-1);
    document.getElementById("sim-info-suffix").innerText = `${suffixChar}`;

    // Pipeline Step 1: Stem & Ending Split
    const step1Div = document.getElementById("viz-step-1");
    let stem = "";
    let ending = "";

    if (v.group === 2) {
      // Ichidan
      stem = v.hiragana.slice(0, -1);
      ending = "る";
    } else if (v.group === 3) {
      // Irregular
      stem = v.hiragana === "する" ? "す" : "く";
      ending = "る";
    } else {
      // Godan
      stem = v.hiragana.slice(0, -1);
      ending = v.hiragana.slice(-1);
    }

    step1Div.innerHTML = `
      <div class="parts-viz">
        <span class="stem-part" title="Verb Stem">${stem}</span>
        <span class="plus-sign">+</span>
        <span class="ending-part" title="Dictionary Ending">${ending}</span>
      </div>
    `;

    // Pipeline Step 2: Apply Replacement Rule
    const step2Div = document.getElementById("viz-step-2");
    let replacement = "";
    let ruleName = "";

    if (v.group === 2) {
      if (form === "te") {
        replacement = "て";
        ruleName = "Drop る, add て";
      } else if (form === "ta") {
        replacement = "た";
        ruleName = "Drop る, add た";
      } else if (form === "politePast") {
        replacement = "ました";
        ruleName = "Drop る, add ました";
      } else if (form === "plainPastNeg") {
        replacement = "なかった";
        ruleName = "Drop る, add なかった";
      }
    } else if (v.group === 3) {
      if (v.hiragana === "する") {
        if (form === "te") replacement = "して";
        else if (form === "ta") replacement = "した";
        else if (form === "politePast") replacement = "しました";
        else if (form === "plainPastNeg") replacement = "しなかった";
        ruleName = "Irregular conjugation";
      } else {
        if (form === "te") replacement = "きて (来て)";
        else if (form === "ta") replacement = "きた (来た)";
        else if (form === "politePast") replacement = "きました (来ました)";
        else if (form === "plainPastNeg") replacement = "こなかった (来なかった)";
        ruleName = "Irregular conjugation";
      }
    } else {
      // Godan rules
      if ((form === "te" || form === "ta") && v.isException && v.romaji === "iku") {
        replacement = form === "te" ? "って" : "った";
        ruleName = "Special exception for 行く";
      } else if (form === "te" || form === "ta") {
        const isTe = form === "te";
        switch (v.subtype) {
          case "u":
          case "tsu":
          case "ru":
            replacement = isTe ? "って" : "った";
            ruleName = "う, つ, る &rarr; " + (isTe ? "って" : "った");
            break;
          case "bu":
          case "mu":
          case "nu":
            replacement = isTe ? "んで" : "んだ";
            ruleName = "ぶ, む, ぬ &rarr; " + (isTe ? "んで" : "んだ");
            break;
          case "ku":
            replacement = isTe ? "いて" : "いた";
            ruleName = "く &rarr; " + (isTe ? "いて" : "いた");
            break;
          case "gu":
            replacement = isTe ? "いで" : "いだ";
            ruleName = "ぐ &rarr; " + (isTe ? "いで" : "いだ");
            break;
          case "su":
            replacement = isTe ? "して" : "した";
            ruleName = "す &rarr; " + (isTe ? "して" : "した");
            break;
        }
      } else {
        // Godan politePast / plainPastNeg rules
        let iCol = "", aCol = "";
        switch (v.subtype) {
          case "u": iCol = "い"; aCol = "わ"; break;
          case "tsu": iCol = "ち"; aCol = "た"; break;
          case "ru": iCol = "り"; aCol = "ら"; break;
          case "bu": iCol = "び"; aCol = "ば"; break;
          case "mu": iCol = "み"; aCol = "ま"; break;
          case "nu": iCol = "に"; aCol = "な"; break;
          case "ku": iCol = "き"; aCol = "か"; break;
          case "gu": iCol = "ぎ"; aCol = "が"; break;
          case "su": iCol = "し"; aCol = "さ"; break;
        }
        if (form === "politePast") {
          replacement = iCol + "ました";
          ruleName = `Shift ${ending} &rarr; ${iCol}ました`;
        } else {
          replacement = aCol + "なかった";
          ruleName = `Shift ${ending} &rarr; ${aCol}なかった`;
        }
      }
    }

    step2Div.innerHTML = `
      <div class="replacement-viz">
        <span class="replaced-from line-through">${ending}</span>
        <span class="arrow-down">&darr;</span>
        <span class="replaced-to animate-glow">${replacement}</span>
      </div>
      <div class="rule-name-tag">${ruleName}</div>
    `;

    // Pipeline Step 3: Final Form Join
    const step3Div = document.getElementById("viz-step-3");
    let finalFormKanji = "";
    let finalFormKana = "";

    if (form === "te") {
      finalFormKanji = v.teForm; finalFormKana = v.teHiragana;
    } else if (form === "ta") {
      finalFormKanji = v.taForm; finalFormKana = v.taHiragana;
    } else if (form === "politePast") {
      finalFormKanji = v.politePastForm; finalFormKana = v.politePastHiragana;
    } else if (form === "plainPastNeg") {
      finalFormKanji = v.plainPastNegForm; finalFormKana = v.plainPastNegHiragana;
    }

    step3Div.innerHTML = `
      <div class="final-viz">
        <div class="kanji-large"><span class="kanji-hover" data-read="${finalFormKana}">${finalFormKanji}</span></div>
        <div class="kana-sub">${finalFormKana}</div>
      </div>
    `;

    // Step Explanation text
    const expDiv = document.getElementById("sim-explanation");
    let formLabel = "";
    if (form === "te") formLabel = "-te Form";
    else if (form === "ta") formLabel = "-ta Form";
    else if (form === "politePast") formLabel = "Polite Past Form (-mashita)";
    else if (form === "plainPastNeg") formLabel = "Plain Past Negative Form (-nakatta)";

    let explText = `<strong>Explanation:</strong> ${v.explanation} `;
    if (v.group === 1 && (form === "te" || form === "ta")) {
      explText += `Since <strong>${v.kanji}</strong> ends in <strong>${ending}</strong>, it belongs to the <strong>${v.subtype}</strong> subcategory. `;
    }
    explText += `The conjugation resulting in the <strong>${formLabel}</strong> is <strong>${finalFormKanji}</strong>.`;

    expDiv.innerHTML = explText;
    
    // Add custom class tags for visual cues
    document.getElementById("step-1").className = "flow-step pulse-glow-1";
    document.getElementById("step-2").className = "flow-step pulse-glow-2";
    document.getElementById("step-3").className = "flow-step pulse-glow-3";
  }

  return {
    init: initLessonView,
    startLesson: startLesson,
    exitToPortal: exitToPortal
  };
})();
