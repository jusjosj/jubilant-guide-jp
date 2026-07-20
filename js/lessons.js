// Lessons and Conjugation Simulator Module
// Handles rendering lessons, the mnemonic song visualizer, and the step-by-step simulator.

window.LESSONS_MODULE = (function() {
  let currentSlideIndex = 0;

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
              <li>う (u) - 買う <span>(kau - buy)</span></li>
              <li>つ (tsu) - 待つ <span>(matsu - wait)</span></li>
              <li>る (ru) - 取る <span>(toru - take)</span></li>
              <li>む (mu), ぶ (bu), ぬ (nu)</li>
              <li>く (ku), ぐ (gu), す (su)</li>
            </ul>
          </div>

          <div class="glass-card group-card group-2">
            <span class="badge badge-g2">Group 2</span>
            <h3>Ichidan (一段)</h3>
            <p class="desc">Also called "Ru-verbs". Almost all end in either <strong>-iru</strong> or <strong>-eru</strong>:</p>
            <ul class="example-list">
              <li>いる (iru) - 見る <span>(miru - see)</span></li>
              <li>える (eru) - 食べる <span>(taberu - eat)</span></li>
            </ul>
            <div class="warning-tip">
              <strong>Note:</strong> Some verbs look like Ichidan but conjugate as Godan (e.g., 帰る kaeru - to return). We will learn these exceptions!
            </div>
          </div>

          <div class="glass-card group-card group-3">
            <span class="badge badge-g3">Group 3</span>
            <h3>Irregular</h3>
            <p class="desc">There are only two irregular verbs in Japanese. You just have to memorize them!</p>
            <ul class="example-list">
              <li>する <span>(suru - to do)</span></li>
              <li>来る <span>(kuru - to come)</span></li>
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
            <p>Simply drop the final <strong>る (ru)</strong> and add <strong>て (te)</strong> or <strong>た (ta)</strong>.</p>
            <table class="lesson-table">
              <thead>
                <tr><th>Meaning</th><th>Dictionary</th><th>Drop る</th><th>-te Form</th><th>-ta Form</th></tr>
              </thead>
              <tbody>
                <tr><td>to eat</td><td>たべる (taberu)</td><td>たべ</td><td class="hl-te">たべて (tabete)</td><td class="hl-ta">たべた (tabeta)</td></tr>
                <tr><td>to see</td><td>みる (miru)</td><td>み</td><td class="hl-te">みて (mite)</td><td class="hl-ta">みた (mita)</td></tr>
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
                <tr><td>to do</td><td>する (suru)</td><td class="hl-te">して (shite)</td><td class="hl-ta">した (shita)</td></tr>
                <tr><td>to come</td><td>くる (kuru)</td><td class="hl-te">きて (kite / 来て)</td><td class="hl-ta">きた (kita / 来た)</td></tr>
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
        <p class="lead">Group 1 verbs conjugate based on their <strong>final syllable</strong>. Japanese students learn this through a famous mnemonic song set to the tune of <em>"Oh My Darling, Clementine"</em> or <em>"London Bridge is Falling Down"</em>.</p>
        
        <div class="song-visualizer-section">
          <div class="song-column">
            <h3>🎵 The Conjugation Song</h3>
            <p class="song-subtitle">Click each line below to see corresponding verbs and rules!</p>
            <div class="song-lines">
              <div class="song-line" data-rule="u-tsu-ru">
                <span class="music-icon">🎵</span>
                <span class="lyrics"><strong>う、つ、る</strong> (u, tsu, ru) &rarr; <strong>って</strong> (tte)</span>
              </div>
              <div class="song-line" data-rule="mu-bu-nu">
                <span class="music-icon">🎵</span>
                <span class="lyrics"><strong>む、ぶ、ぬ</strong> (mu, bu, nu) &rarr; <strong>んで</strong> (nde)</span>
              </div>
              <div class="song-line" data-rule="ku">
                <span class="music-icon">🎵</span>
                <span class="lyrics"><strong>く</strong> (ku) &rarr; <strong>いて</strong> (ite) <span class="exception-note">[行く &rarr; って]</span></span>
              </div>
              <div class="song-line" data-rule="gu">
                <span class="music-icon">🎵</span>
                <span class="lyrics"><strong>ぐ</strong> (gu) &rarr; <strong>いで</strong> (ide)</span>
              </div>
              <div class="song-line" data-rule="su">
                <span class="music-icon">🎵</span>
                <span class="lyrics"><strong>す</strong> (su) &rarr; <strong>して</strong> (shite)</span>
              </div>
            </div>
          </div>

          <div class="song-details-column">
            <div id="song-rule-details" class="glass-card details-card">
              <div class="placeholder-text">
                <p>💡 Click on any song line to learn the conjugation rule, see example verbs, and listen to the pattern rhythm!</p>
              </div>
            </div>
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
              <div class="toggle-buttons">
                <button type="button" id="btn-toggle-te" class="toggle-btn active" data-form="te">-te Form (て)</button>
                <button type="button" id="btn-toggle-ta" class="toggle-btn" data-form="ta">-ta Form (た)</button>
              </div>
            </div>

            <div class="verb-info-card">
              <div class="verb-main-display">
                <h2 id="sim-info-kanji">買う</h2>
                <div id="sim-info-romaji">kau (to buy)</div>
              </div>
              <div class="verb-meta-row">
                <div><strong>Group:</strong> <span id="sim-info-group">Group 1 (Godan)</span></div>
                <div><strong>Suffix:</strong> <span id="sim-info-suffix">う (u)</span></div>
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
      title: "う (u), つ (tsu), る (ru) &rarr; って (tte) / った (tta)",
      formula: "Drop last syllable, add って (te-form) or った (ta-form).",
      examples: [
        { dict: "買う (kau)", te: "買って (katte)", ta: "買った (katta)", meaning: "to buy" },
        { dict: "待つ (matsu)", te: "待って (matte)", ta: "待った (matta)", meaning: "to wait" },
        { dict: "取る (toru)", te: "取って (totte)", ta: "取った (totta)", meaning: "to take" }
      ],
      note: "<strong>Exception:</strong> 帰る (kaeru - to return) is a Godan verb despite ending in -eru, so it conjugates to 帰って / 帰った!"
    },
    "mu-bu-nu": {
      title: "む (mu), ぶ (bu), ぬ (nu) &rarr; んで (nde) / んだ (nda)",
      formula: "Drop last syllable, add んで (te-form) or んだ (ta-form). Note the voiced d (濁音)!",
      examples: [
        { dict: "飲む (nomu)", te: "飲んで (nonde)", ta: "飲んだ (nonda)", meaning: "to drink" },
        { dict: "遊ぶ (asobu)", te: "遊んで (asonde)", ta: "遊んだ (asonda)", meaning: "to play" },
        { dict: "死ぬ (shinu)", te: "死んで (shinde)", ta: "死んだ (shinda)", meaning: "to die" }
      ],
      note: "<strong>Deadly Fact:</strong> 'Shinu' (死ぬ - to die) is the only verb in the entire Japanese language that ends in 'nu'."
    },
    "ku": {
      title: "く (ku) &rarr; いて (ite) / いた (ita)",
      formula: "Drop く, add いて (te-form) or いた (ta-form).",
      examples: [
        { dict: "書く (kaku)", te: "書いて (kaite)", ta: "書いた (kaita)", meaning: "to write" },
        { dict: "聞く (kiku)", te: "聞いて (kiite)", ta: "聞いた (kiita)", meaning: "to listen/ask" }
      ],
      note: "<strong>🚨 MAJOR EXCEPTION:</strong> 行く (iku - to go) is irregular in this subgroup. It conjugating to <strong>行って (itte) / 行った (itta)</strong> instead of iite / iita!"
    },
    "gu": {
      title: "ぐ (gu) &rarr; いで (ide) / いだ (ida)",
      formula: "Drop ぐ, add いで (te-form) or いだ (ida-form). Think of it like the 'ku' rule, but voiced (with ten-ten)!",
      examples: [
        { dict: "泳ぐ (oyogu)", te: "泳いで (oyoide)", ta: "泳いだ (oyoida)", meaning: "to swim" },
        { dict: "急ぐ (isogu)", te: "急いで (isoide)", ta: "急いだ (isoida)", meaning: "to hurry" }
      ],
      note: "Because 'gu' is voiced, the suffixes 'te' and 'ta' also become voiced ('de' and 'da')."
    },
    "su": {
      title: "す (su) &rarr; して (shite) / した (shita)",
      formula: "Drop す, add して (te-form) or した (ta-form).",
      examples: [
        { dict: "話す (hanasu)", te: "話して (hanashite)", ta: "話した (hanashita)", meaning: "to speak" },
        { dict: "貸す (kasu)", te: "貸して (kashite)", ta: "貸した (kashita)", meaning: "to lend" }
      ],
      note: "This matches the conjugation of the irregular verb 'suru' (する &rarr; して)."
    }
  };

  function initLessonView(containerId) {
    currentSlideIndex = 0;
    renderSlide(containerId);
  }

  function renderSlide(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const slide = slides[currentSlideIndex];
    const progressPercent = ((currentSlideIndex + 1) / slides.length) * 100;

    container.innerHTML = `
      <div class="lesson-header">
        <div class="lesson-title-bar">
          <span class="slide-indicator">Slide ${currentSlideIndex + 1} of ${slides.length}</span>
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
          ${currentSlideIndex === slides.length - 1 ? "Finish Lesson &rarr;" : "Next &rarr;"}
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
      if (currentSlideIndex < slides.length - 1) {
        currentSlideIndex++;
        renderSlide(containerId);
      } else {
        // Return to dashboard
        window.APP_ROUTER.navigateTo("dashboard");
        // Mark lesson completed in state
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
    const teBtn = document.getElementById("btn-toggle-te");
    const taBtn = document.getElementById("btn-toggle-ta");

    // Populate select
    select.innerHTML = window.VERB_DATABASE.map((v, idx) => `
      <option value="${idx}">${v.kanji} (${v.hiragana} - ${v.english})</option>
    `).join("");

    select.addEventListener("change", (e) => {
      const verbIdx = parseInt(e.target.value, 10);
      simulatorState.verb = window.VERB_DATABASE[verbIdx];
      runSimulation();
    });

    teBtn.addEventListener("click", () => {
      teBtn.classList.add("active");
      taBtn.classList.remove("active");
      simulatorState.form = "te";
      runSimulation();
    });

    taBtn.addEventListener("click", () => {
      taBtn.classList.add("active");
      teBtn.classList.remove("active");
      simulatorState.form = "ta";
      runSimulation();
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

    const isTe = simulatorState.form === "te";
    const targetSuffix = isTe ? "て" : "た";
    
    // Update basic display info
    document.getElementById("sim-info-kanji").innerText = v.kanji;
    document.getElementById("sim-info-romaji").innerText = `${v.romaji} (${v.english})`;
    
    let groupText = `Group ${v.group}`;
    if (v.group === 1) groupText += " (Godan)";
    else if (v.group === 2) groupText += " (Ichidan)";
    else groupText += " (Irregular)";
    document.getElementById("sim-info-group").innerText = groupText;

    let suffixChar = v.hiragana.slice(-1);
    document.getElementById("sim-info-suffix").innerText = `${suffixChar} (${v.subtype})`;

    // Pipeline Step 1: Stem & Ending Split
    const step1Div = document.getElementById("viz-step-1");
    let stem = "";
    let ending = "";
    let romajiStem = "";
    let romajiEnding = "";

    if (v.group === 2) {
      // Ichidan
      stem = v.hiragana.slice(0, -1);
      ending = "る";
      romajiStem = v.romaji.slice(0, -2); // drop "ru"
      romajiEnding = "ru";
    } else if (v.group === 3) {
      // Irregular
      stem = v.hiragana === "する" ? "す" : "く";
      ending = "る";
      romajiStem = v.romaji.slice(0, -2);
      romajiEnding = "ru";
    } else {
      // Godan
      stem = v.hiragana.slice(0, -1);
      ending = v.hiragana.slice(-1);
      
      // Rough Romaji stem split
      if (v.subtype === "tsu") {
        romajiStem = v.romaji.slice(0, -5); // e.g. matsu -> ma
        romajiEnding = "tsu";
      } else {
        romajiStem = v.romaji.slice(0, -1);
        romajiEnding = v.romaji.slice(-1);
      }
    }

    step1Div.innerHTML = `
      <div class="parts-viz">
        <span class="stem-part" title="Verb Stem">${stem}</span>
        <span class="plus-sign">+</span>
        <span class="ending-part" title="Dictionary Ending">${ending}</span>
      </div>
      <div class="romaji-parts">
        <span>${romajiStem}</span>
        <span></span>
        <span>${romajiEnding}</span>
      </div>
    `;

    // Pipeline Step 2: Apply Replacement Rule
    const step2Div = document.getElementById("viz-step-2");
    let replacement = "";
    let ruleName = "";

    if (v.group === 2) {
      replacement = isTe ? "て" : "た";
      ruleName = "Drop る, add suffix";
    } else if (v.group === 3) {
      if (v.hiragana === "する") {
        replacement = isTe ? "して" : "した";
        ruleName = "Irregular conjugation";
      } else {
        replacement = isTe ? "きて (来て)" : "きた (来た)";
        ruleName = "Irregular conjugation";
      }
    } else {
      // Godan rules
      if (v.isException && v.romaji === "iku") {
        replacement = isTe ? "って" : "った";
        ruleName = "Special exception for 行く";
      } else {
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
    let finalFormKanji = isTe ? v.teForm : v.taForm;
    let finalFormKana = isTe ? v.teHiragana : v.taHiragana;
    let finalFormRomaji = isTe ? v.teRomaji : v.taRomaji;

    step3Div.innerHTML = `
      <div class="final-viz">
        <div class="kanji-large">${finalFormKanji}</div>
        <div class="kana-sub">${finalFormKana}</div>
        <div class="romaji-sub">${finalFormRomaji}</div>
      </div>
    `;

    // Step Explanation text
    const expDiv = document.getElementById("sim-explanation");
    let explText = `<strong>Explanation:</strong> ${v.explanation} `;
    if (v.group === 1) {
      explText += `Since <strong>${v.kanji}</strong> ends in <strong>${ending}</strong>, it belongs to the <strong>${v.subtype}</strong> subcategory. `;
    }
    explText += `The conjugation resulting in the <strong>-${simulatorState.form} Form</strong> is <strong>${finalFormKanji}</strong> (${finalFormRomaji}).`;

    expDiv.innerHTML = explText;
    
    // Add custom class tags for visual cues
    document.getElementById("step-1").className = "flow-step pulse-glow-1";
    document.getElementById("step-2").className = "flow-step pulse-glow-2";
    document.getElementById("step-3").className = "flow-step pulse-glow-3";
  }

  return {
    init: initLessonView
  };
})();
