// Practice and Quizzes Module
// Handles Flashcards, Multiple-Choice Quizzes, Text Inputs (with Romaji-to-Kana), and the Suffix Builder.

window.PRACTICE_MODULE = (function() {
  let activeState = {
    mode: null, // "cards", "quiz", "builder"
    verbsList: [],
    currentIndex: 0,
    score: 0,
    totalQuestions: 0,
    answersLog: [], // tracks user answer, correctness, verb, target form
    // Quiz configuration
    quizConfig: {
      length: 10,
      targetForm: "both", // "te", "ta", "both"
      questionType: "mixed" // "choice", "input", "mixed"
    },
    // Flashcard variables
    isCardFlipped: false,
    // Builder variables
    selectedSuffix: null
  };

  function initPracticePortal(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div class="practice-portal-header text-center">
        <h2>Japanese Verb Practice Arena</h2>
        <p class="lead">Select a training exercise below to build your muscle memory for -te and -ta conjugations.</p>
      </div>

      <div class="practice-modes-grid">
        <!-- Mode 1: Flashcards -->
        <div class="glass-card mode-select-card" id="card-mode-select">
          <div class="mode-icon">🎴</div>
          <h3>Verb Flashcards</h3>
          <p>Study Japanese verbs at your own pace. Review dictionary forms, flip to see conjugations, and check grammar explanations.</p>
          <button class="action-btn primary-btn mt-auto" onclick="window.PRACTICE_MODULE.startFlashcards()">Launch Flashcards</button>
        </div>

        <!-- Mode 2: The Conjugation Quiz -->
        <div class="glass-card mode-select-card" id="quiz-mode-select">
          <div class="mode-icon">📝</div>
          <h3>Conjugation Quiz</h3>
          <p>Put your skills to the test. Formats include multiple-choice questions and real-time typed conjugations with auto-Kana helper.</p>
          <button class="action-btn primary-btn mt-auto" onclick="window.PRACTICE_MODULE.showQuizSettings()">Configure Quiz</button>
        </div>

        <!-- Mode 3: Suffix Block Builder -->
        <div class="glass-card mode-select-card" id="builder-mode-select">
          <div class="mode-icon">🧩</div>
          <h3>Suffix Block Builder</h3>
          <p>Deconstruct verbs! Snap together the correct verb stem and ending suffix blocks (-nde, -tte, -te, etc.) to complete the conjugation.</p>
          <button class="action-btn primary-btn mt-auto" onclick="window.PRACTICE_MODULE.startSuffixBuilder()">Start Builder</button>
        </div>
      </div>
    `;
  }

  // ==========================================
  // FLASHCARDS MODE
  // ==========================================

  function startFlashcards() {
    activeState.mode = "cards";
    // Shuffle verb database
    activeState.verbsList = [...window.VERB_DATABASE].sort(() => 0.5 - Math.random());
    activeState.currentIndex = 0;
    activeState.isCardFlipped = false;
    
    renderFlashcardView();
  }

  function renderFlashcardView() {
    const container = document.getElementById("practice-container");
    if (!container) return;

    if (activeState.currentIndex >= activeState.verbsList.length) {
      // Completed all cards, loop or wrap up
      showPracticeCompletion("Flashcard Review Complete!", `You've reviewed all ${activeState.verbsList.length} verbs in the deck!`);
      return;
    }

    const verb = activeState.verbsList[activeState.currentIndex];
    
    container.innerHTML = `
      <div class="practice-header">
        <button class="back-link" onclick="window.PRACTICE_MODULE.exitToPortal()">&larr; Exit to Practice Menu</button>
        <span class="progress-indicator">Card ${activeState.currentIndex + 1} of ${activeState.verbsList.length}</span>
      </div>

      <div class="flashcard-arena">
        <div class="flashcard ${activeState.isCardFlipped ? "flipped" : ""}" id="main-flashcard">
          <!-- FRONT OF CARD -->
          <div class="card-side card-front glass-card">
            <span class="badge badge-g${verb.group}">Group ${verb.group}</span>
            <div class="card-japanese-main">
              <span class="kanji-display">${verb.kanji}</span>
              <span class="kana-display">${verb.hiragana}</span>
            </div>
            <div class="card-english">${verb.english}</div>
            <div class="card-romaji">${verb.romaji}</div>
            <div class="card-action-cue">Click Card to Flip</div>
          </div>

          <!-- BACK OF CARD -->
          <div class="card-side card-back glass-card">
            <span class="badge badge-g${verb.group}">Conjugated Forms</span>
            <div class="conjugations-display">
              <div class="conj-block">
                <span class="conj-label">-te Form</span>
                <span class="conj-val-kanji">${verb.teForm}</span>
                <span class="conj-val-kana">${verb.teHiragana} / ${verb.teRomaji}</span>
              </div>
              <div class="conj-block">
                <span class="conj-label">-ta Form</span>
                <span class="conj-val-kanji">${verb.taForm}</span>
                <span class="conj-val-kana">${verb.taHiragana} / ${verb.taRomaji}</span>
              </div>
            </div>
            
            <div class="card-back-explanation">
              <strong>Grammar Note:</strong> ${verb.explanation}
            </div>

            <div class="card-action-cue">Click to Flip Back</div>
          </div>
        </div>

        <div class="flashcard-controls">
          <button class="action-btn secondary-btn" id="btn-card-hard">Study Again</button>
          <button class="action-btn primary-btn" id="btn-card-easy">Got It! &rarr;</button>
        </div>
      </div>
    `;

    // Add click listener on card to flip
    const cardEl = document.getElementById("main-flashcard");
    cardEl.addEventListener("click", () => {
      activeState.isCardFlipped = !activeState.isCardFlipped;
      cardEl.classList.toggle("flipped");
    });

    document.getElementById("btn-card-easy").addEventListener("click", () => {
      activeState.currentIndex++;
      activeState.isCardFlipped = false;
      renderFlashcardView();
    });

    document.getElementById("btn-card-hard").addEventListener("click", () => {
      // Push card to the end of array to review again
      const currentVerb = activeState.verbsList[activeState.currentIndex];
      activeState.verbsList.push(currentVerb);
      activeState.currentIndex++;
      activeState.isCardFlipped = false;
      renderFlashcardView();
    });
  }

  // ==========================================
  // CONJUGATION QUIZ MODE
  // ==========================================

  function showQuizSettings() {
    const container = document.getElementById("practice-container");
    if (!container) return;

    container.innerHTML = `
      <div class="practice-header">
        <button class="back-link" onclick="window.PRACTICE_MODULE.exitToPortal()">&larr; Exit to Practice Menu</button>
      </div>

      <div class="glass-card settings-card-form max-w-500 mx-auto">
        <h3 class="text-center">Configure Quiz</h3>
        <p class="settings-intro text-center">Customize your conjugation challenge.</p>
        
        <div class="settings-form">
          <div class="form-group">
            <label>Conjugation Form:</label>
            <div class="segmented-control">
              <button class="seg-btn active" data-val="both" onclick="window.PRACTICE_MODULE.setSeg(this, 'targetForm')">Both (-te / -ta)</button>
              <button class="seg-btn" data-val="te" onclick="window.PRACTICE_MODULE.setSeg(this, 'targetForm')">-te Only</button>
              <button class="seg-btn" data-val="ta" onclick="window.PRACTICE_MODULE.setSeg(this, 'targetForm')">-ta Only</button>
            </div>
          </div>

          <div class="form-group">
            <label>Question Type:</label>
            <div class="segmented-control">
              <button class="seg-btn active" data-val="mixed" onclick="window.PRACTICE_MODULE.setSeg(this, 'questionType')">Mixed</button>
              <button class="seg-btn" data-val="choice" onclick="window.PRACTICE_MODULE.setSeg(this, 'questionType')">Multiple Choice</button>
              <button class="seg-btn" data-val="input" onclick="window.PRACTICE_MODULE.setSeg(this, 'questionType')">Text Entry</button>
            </div>
          </div>

          <div class="form-group">
            <label>Number of Questions:</label>
            <div class="segmented-control">
              <button class="seg-btn" data-val="5" onclick="window.PRACTICE_MODULE.setSeg(this, 'length')">5</button>
              <button class="seg-btn active" data-val="10" onclick="window.PRACTICE_MODULE.setSeg(this, 'length')">10</button>
              <button class="seg-btn" data-val="15" onclick="window.PRACTICE_MODULE.setSeg(this, 'length')">15</button>
            </div>
          </div>

          <button class="action-btn primary-btn w-full mt-4" onclick="window.PRACTICE_MODULE.startQuiz()">Start Conjugation Quiz! 🚀</button>
        </div>
      </div>
    `;
  }

  function setSeg(btnEl, configKey) {
    // Remove active from siblings
    const parent = btnEl.parentNode;
    parent.querySelectorAll(".seg-btn").forEach(btn => btn.classList.remove("active"));
    btnEl.classList.add("active");

    let val = btnEl.dataset.val;
    // parse numeric values
    if (!isNaN(val)) val = parseInt(val, 10);
    
    activeState.quizConfig[configKey] = val;
  }

  function startQuiz() {
    activeState.mode = "quiz";
    activeState.currentIndex = 0;
    activeState.score = 0;
    activeState.answersLog = [];
    
    // Choose N random verbs from database
    const shuffled = [...window.VERB_DATABASE].sort(() => 0.5 - Math.random());
    activeState.verbsList = shuffled.slice(0, Math.min(activeState.quizConfig.length, shuffled.length));
    activeState.totalQuestions = activeState.verbsList.length;

    renderQuizQuestion();
  }

  function renderQuizQuestion() {
    const container = document.getElementById("practice-container");
    if (!container) return;

    if (activeState.currentIndex >= activeState.totalQuestions) {
      showQuizResults();
      return;
    }

    const verb = activeState.verbsList[activeState.currentIndex];
    
    // Determine target form for this question (-te or -ta)
    let form = activeState.quizConfig.targetForm;
    if (form === "both") {
      form = Math.random() > 0.5 ? "te" : "ta";
    }

    // Determine type (choice or input)
    let qType = activeState.quizConfig.questionType;
    if (qType === "mixed") {
      qType = Math.random() > 0.5 ? "choice" : "input";
    }

    // Prepare Question Model
    const qModel = {
      verb: verb,
      form: form, // "te" or "ta"
      type: qType, // "choice" or "input"
      correctAnswerKanji: form === "te" ? verb.teForm : verb.taForm,
      correctAnswerKana: form === "te" ? verb.teHiragana : verb.taHiragana,
      correctAnswerRomaji: form === "te" ? verb.teRomaji : verb.taRomaji
    };

    container.innerHTML = `
      <div class="practice-header">
        <button class="back-link" onclick="window.PRACTICE_MODULE.exitToPortal()">&larr; Abort Quiz</button>
        <span class="progress-indicator">Question ${activeState.currentIndex + 1} of ${activeState.totalQuestions}</span>
      </div>

      <div class="quiz-question-card glass-card">
        <div class="quiz-verb-prompt">
          <span class="badge badge-g${verb.group}">Group ${verb.group} Verb</span>
          <h2>Conjugate: <span class="prompt-kanji">${verb.kanji}</span> <span class="prompt-kana">(${verb.hiragana})</span></h2>
          <div class="prompt-translation">Meaning: "${verb.english}"</div>
        </div>

        <div class="quiz-target-banner target-${form}">
          Form requested: <strong>-${form} Form (${form === "te" ? "て形" : "た形"})</strong>
        </div>

        <div class="quiz-answer-area" id="quiz-interaction-container">
          <!-- Will be filled by type injector -->
        </div>
      </div>
    `;

    if (qType === "choice") {
      renderMultipleChoice(qModel);
    } else {
      renderTextInput(qModel);
    }
  }

  // Generate Distractor Conjugations for Multiple Choice
  function generateDistractors(qModel) {
    const verb = qModel.verb;
    const isTe = qModel.form === "te";
    const correct = qModel.correctAnswerKanji;

    const distractors = new Set();
    
    // Distractor 1: Standard Ichidan drop-ru rule on Godan (or vice versa)
    if (verb.group === 1) {
      // E.g., kau -> kaute / kauta (dropping u and adding te/ta)
      distractors.add(verb.kanji.slice(0, -1) + (isTe ? "て" : "た"));
      // E.g. kaurute / kauruta
      distractors.add(verb.kanji + (isTe ? "て" : "た"));
    } else {
      // Ichidan verb distractors: e.g. tabete -> tabette / tabende
      distractors.add(verb.kanji.slice(0, -1) + (isTe ? "って" : "った"));
      distractors.add(verb.kanji.slice(0, -1) + (isTe ? "んで" : "んだ"));
    }

    // Distractor 2: Swap te and ta endings (but on another rule)
    // Distractor 3: Mix standard Godan suffixes
    const suffixesTe = ["って", "んで", "いて", "いで", "して", "て"];
    const suffixesTa = ["った", "んだ", "いた", "いだ", "した", "た"];
    const stems = verb.kanji.slice(0, -1);

    const targetSuffixes = isTe ? suffixesTe : suffixesTa;
    targetSuffixes.forEach(sfx => {
      distractors.add(stems + sfx);
    });

    // Remove correct answer
    distractors.delete(correct);

    // Convert to array, shuffle and pick 3
    let list = Array.from(distractors).sort(() => 0.5 - Math.random());
    return list.slice(0, 3);
  }

  function renderMultipleChoice(qModel) {
    const interContainer = document.getElementById("quiz-interaction-container");
    const choices = generateDistractors(qModel);
    choices.push(qModel.correctAnswerKanji);
    
    // Shuffle choices
    choices.sort(() => 0.5 - Math.random());

    let buttonsHtml = choices.map(choice => `
      <button class="choice-btn glass-btn" onclick="window.PRACTICE_MODULE.checkChoiceAnswer(this, '${choice.replace(/'/g, "\\'")}')">${choice}</button>
    `).join("");

    interContainer.innerHTML = `
      <div class="choices-grid">
        ${buttonsHtml}
      </div>
      <div id="quiz-feedback-box" class="quiz-feedback-box hidden"></div>
    `;

    // Save active question model for the checker to access
    activeState.currentQuestionModel = qModel;
  }

  function renderTextInput(qModel) {
    const interContainer = document.getElementById("quiz-interaction-container");
    
    interContainer.innerHTML = `
      <div class="text-input-wrapper">
        <input type="text" id="quiz-typed-input" placeholder="Type Romaji (e.g. ${qModel.correctAnswerRomaji}) or Hiragana..." autocomplete="off" autofocus>
        <div class="kana-live-preview">Kana translation: <strong id="live-kana-span"></strong></div>
        <button id="btn-submit-text-answer" class="action-btn primary-btn mt-3 w-full">Submit Answer</button>
      </div>
      <div id="quiz-feedback-box" class="quiz-feedback-box hidden"></div>
    `;

    const input = document.getElementById("quiz-typed-input");
    const preview = document.getElementById("live-kana-span");
    const submitBtn = document.getElementById("btn-submit-text-answer");

    // Live Romaji to Hiragana conversion
    input.addEventListener("input", (e) => {
      const val = e.target.value;
      const converted = window.romajiToHiragana(val);
      preview.innerText = converted;
    });

    // Enter key submit
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        submitBtn.click();
      }
    });

    submitBtn.addEventListener("click", () => {
      const rawVal = input.value.trim();
      const convertedVal = preview.innerText.trim();
      
      checkTextAnswer(rawVal, convertedVal, qModel);
    });

    activeState.currentQuestionModel = qModel;
  }

  function checkChoiceAnswer(buttonEl, chosenAnswer) {
    const q = activeState.currentQuestionModel;
    const isCorrect = (chosenAnswer === q.correctAnswerKanji);
    
    // Disable all options
    document.querySelectorAll(".choice-btn").forEach(btn => {
      btn.disabled = true;
      if (btn.innerText === q.correctAnswerKanji) {
        btn.classList.add("correct-choice");
      } else if (btn === buttonEl) {
        btn.classList.add("incorrect-choice");
      }
    });

    revealFeedback(isCorrect, q);
  }

  function checkTextAnswer(rawVal, convertedVal, q) {
    // Accept either:
    // 1. Correct Kanji form (e.g. 食べて)
    // 2. Correct Hiragana form (e.g. たべて)
    // 3. Correct Romaji input matched after conversion (e.g. typing "tabete" results in "たべて" which matches hiragana)
    const isCorrect = (
      rawVal === q.correctAnswerKanji || 
      convertedVal === q.correctAnswerKana || 
      rawVal.toLowerCase() === q.correctAnswerRomaji ||
      convertedVal.includes(q.correctAnswerKana)
    );

    // Disable input and button
    const input = document.getElementById("quiz-typed-input");
    const submitBtn = document.getElementById("btn-submit-text-answer");
    if (input) input.disabled = true;
    if (submitBtn) submitBtn.disabled = true;

    if (input) {
      if (isCorrect) {
        input.classList.add("input-correct");
      } else {
        input.classList.add("input-incorrect");
      }
    }

    revealFeedback(isCorrect, q);
  }

  function revealFeedback(isCorrect, q) {
    const feedbackBox = document.getElementById("quiz-feedback-box");
    if (!feedbackBox) return;

    if (isCorrect) {
      activeState.score++;
    }

    // Log this answer
    activeState.answersLog.push({
      verb: q.verb,
      form: q.form,
      isCorrect: isCorrect,
      correctString: `${q.correctAnswerKanji} (${q.correctAnswerKana} - ${q.correctAnswerRomaji})`
    });

    feedbackBox.innerHTML = `
      <div class="feedback-card ${isCorrect ? "fb-correct" : "fb-incorrect"} animate-pop">
        <div class="fb-icon">${isCorrect ? "✅ Correct!" : "❌ Incorrect"}</div>
        <div class="fb-detail">
          <p>Correct conjugation: <span class="fb-correct-ans">${q.correctAnswerKanji}</span> (${q.correctAnswerKana})</p>
          <p class="fb-rule"><strong>Rule:</strong> ${q.verb.explanation}</p>
        </div>
        <button id="btn-next-question" class="action-btn primary-btn mt-2">Next Question &rarr;</button>
      </div>
    `;
    feedbackBox.classList.remove("hidden");

    document.getElementById("btn-next-question").addEventListener("click", () => {
      activeState.currentIndex++;
      renderQuizQuestion();
    });
  }

  function showQuizResults() {
    const container = document.getElementById("practice-container");
    if (!container) return;

    const percent = Math.round((activeState.score / activeState.totalQuestions) * 100);
    
    // Save to user stats
    window.APP_ROUTER.updateStats(activeState.score, activeState.totalQuestions);

    let feedbackMsg = "Good effort! Keep studying.";
    if (percent === 100) feedbackMsg = "🎉 Perfect! You are a conjugation master!";
    else if (percent >= 80) feedbackMsg = "🌟 Excellent job! Almost perfect.";
    else if (percent >= 50) feedbackMsg = "👍 Not bad! Review the lessons and try again.";

    let reviewItemsHtml = activeState.answersLog.map(item => `
      <tr class="${item.isCorrect ? "row-correct" : "row-incorrect"}">
        <td>${item.verb.kanji} (${item.verb.hiragana})</td>
        <td>-${item.form} Form</td>
        <td>${item.isCorrect ? "✅ Correct" : "❌ Incorrect"}</td>
        <td class="table-bold-ans">${item.correctString}</td>
      </tr>
    `).join("");

    container.innerHTML = `
      <div class="glass-card quiz-results-card">
        <h2>Quiz Results</h2>
        <div class="results-score-wheel animate-glow-light">
          <span class="score-num">${activeState.score}/${activeState.totalQuestions}</span>
          <span class="score-pct">${percent}% Correct</span>
        </div>
        <p class="results-quote lead text-center">${feedbackMsg}</p>

        <div class="results-review-table-wrapper">
          <h3>Question Review</h3>
          <table class="review-table">
            <thead>
              <tr><th>Verb</th><th>Target Form</th><th>Status</th><th>Correct Answer</th></tr>
            </thead>
            <tbody>
              ${reviewItemsHtml}
            </tbody>
          </table>
        </div>

        <div class="results-navigation">
          <button class="action-btn secondary-btn" onclick="window.PRACTICE_MODULE.exitToPortal()">Back to Practice Portal</button>
          <button class="action-btn primary-btn" onclick="window.PRACTICE_MODULE.startQuiz()">Try Again 🔄</button>
        </div>
      </div>
    `;
  }

  // ==========================================
  // SUFFIX BLOCK BUILDER MODE
  // ==========================================

  function startSuffixBuilder() {
    activeState.mode = "builder";
    activeState.verbsList = [...window.VERB_DATABASE].sort(() => 0.5 - Math.random());
    activeState.currentIndex = 0;
    activeState.score = 0;
    
    renderBuilderView();
  }

  function renderBuilderView() {
    const container = document.getElementById("practice-container");
    if (!container) return;

    if (activeState.currentIndex >= activeState.verbsList.length) {
      showPracticeCompletion("Suffix Builder Completed!", `Outstanding! You successfully built conjugations for all ${activeState.verbsList.length} verbs!`);
      return;
    }

    const verb = activeState.verbsList[activeState.currentIndex];
    
    // Choose -te or -ta target form randomly
    const isTe = Math.random() > 0.5;
    const form = isTe ? "te" : "ta";
    const correctAnswer = isTe ? verb.teForm : verb.taForm;

    // Split Stem and target suffix
    let stem = "";
    let correctSuffix = "";

    // Calculate split
    if (verb.group === 2) {
      // Ichidan
      stem = verb.kanji.slice(0, -1);
      correctSuffix = isTe ? "て" : "た";
    } else if (verb.group === 3) {
      // Irregular
      if (verb.kanji === "する") {
        stem = "し";
        correctSuffix = isTe ? "て" : "た";
      } else { // くる
        stem = "き";
        correctSuffix = isTe ? "て" : "た";
      }
    } else {
      // Godan
      stem = verb.kanji.slice(0, -1);
      if (verb.isException && verb.romaji === "iku") {
        correctSuffix = isTe ? "って" : "った";
      } else {
        switch (verb.subtype) {
          case "u":
          case "tsu":
          case "ru":
            correctSuffix = isTe ? "って" : "った";
            break;
          case "bu":
          case "mu":
          case "nu":
            correctSuffix = isTe ? "んで" : "んだ";
            break;
          case "ku":
            correctSuffix = isTe ? "いて" : "いた";
            break;
          case "gu":
            correctSuffix = isTe ? "いで" : "いだ";
            break;
          case "su":
            correctSuffix = isTe ? "して" : "した";
            break;
        }
      }
    }

    // Generate option suffix blocks
    // Pool of common suffixes
    const allSuffixes = isTe ? 
      ["て", "って", "んで", "いて", "いで", "して", "た"] : 
      ["た", "った", "んだ", "いた", "いだ", "した", "て"];
    
    // Ensure correct suffix is in array, take unique values
    const sfxPool = Array.from(new Set([correctSuffix, ...allSuffixes])).sort(() => 0.5 - Math.random());

    container.innerHTML = `
      <div class="practice-header">
        <button class="back-link" onclick="window.PRACTICE_MODULE.exitToPortal()">&larr; Exit to Practice Menu</button>
        <span class="progress-indicator">Builder ${activeState.currentIndex + 1} of ${activeState.verbsList.length}</span>
      </div>

      <div class="builder-arena glass-card">
        <div class="builder-prompt">
          <span class="badge badge-g${verb.group}">Group ${verb.group}</span>
          <h2>Assemble Conjugation: <strong>${verb.kanji}</strong> (${verb.english})</h2>
          <div class="builder-target-tag">Target Form: <strong>-${form} Form</strong></div>
        </div>

        <div class="assembly-area">
          <div class="stem-block-slot">
            <span class="stem-text">${stem}</span>
            <span class="stem-label">Stem</span>
          </div>
          <div class="plus-symbol">+</div>
          <div class="suffix-block-slot empty" id="drop-target-slot">
            <span class="slot-placeholder">Click a Suffix Block</span>
            <span class="slot-label">Suffix</span>
          </div>
        </div>

        <div class="suffix-palette">
          <h4>Available Suffix Blocks:</h4>
          <div class="palette-grid">
            ${sfxPool.map(sfx => `
              <button class="suffix-block-btn" onclick="window.PRACTICE_MODULE.selectSuffixBlock(this, '${sfx}')">${sfx}</button>
            `).join("")}
          </div>
        </div>

        <div class="builder-actions hidden" id="builder-actions-panel">
          <button class="action-btn secondary-btn" id="btn-builder-reset" onclick="window.PRACTICE_MODULE.resetBuilder()">Reset Block</button>
          <button class="action-btn primary-btn" id="btn-builder-submit">Submit Combination</button>
        </div>

        <div id="builder-feedback" class="quiz-feedback-box hidden"></div>
      </div>
    `;

    // Cache local variables for validation
    activeState.builderData = {
      stem: stem,
      correctSuffix: correctSuffix,
      correctAnswer: correctAnswer,
      verb: verb
    };
  }

  function selectSuffixBlock(btnEl, sfx) {
    const slot = document.getElementById("drop-target-slot");
    const actionsPanel = document.getElementById("builder-actions-panel");
    if (!slot) return;

    // Highlight block in palette
    document.querySelectorAll(".suffix-block-btn").forEach(btn => btn.classList.remove("selected-sfx-btn"));
    btnEl.classList.add("selected-sfx-btn");

    // Update Drop Target display
    slot.classList.remove("empty");
    slot.classList.add("filled");
    slot.innerHTML = `
      <span class="stem-text select-pulse">${sfx}</span>
      <span class="slot-label">Suffix</span>
    `;

    activeState.selectedSuffix = sfx;
    actionsPanel.classList.remove("hidden");

    // Hook submit button click
    const submitBtn = document.getElementById("btn-builder-submit");
    submitBtn.onclick = () => {
      checkBuilderAnswer(sfx);
    };
  }

  function resetBuilder() {
    const slot = document.getElementById("drop-target-slot");
    const actionsPanel = document.getElementById("builder-actions-panel");
    if (!slot) return;

    slot.classList.add("empty");
    slot.classList.remove("filled");
    slot.innerHTML = `
      <span class="slot-placeholder">Click a Suffix Block</span>
      <span class="slot-label">Suffix</span>
    `;

    document.querySelectorAll(".suffix-block-btn").forEach(btn => btn.classList.remove("selected-sfx-btn"));
    activeState.selectedSuffix = null;
    actionsPanel.classList.add("hidden");
  }

  function checkBuilderAnswer(chosenSuffix) {
    const data = activeState.builderData;
    const isCorrect = (chosenSuffix === data.correctSuffix);

    // Disable interactions
    document.querySelectorAll(".suffix-block-btn").forEach(btn => btn.disabled = true);
    const submitBtn = document.getElementById("btn-builder-submit");
    const resetBtn = document.getElementById("btn-builder-reset");
    if (submitBtn) submitBtn.disabled = true;
    if (resetBtn) resetBtn.disabled = true;

    const feedback = document.getElementById("builder-feedback");
    feedback.innerHTML = `
      <div class="feedback-card ${isCorrect ? "fb-correct" : "fb-incorrect"} animate-pop">
        <div class="fb-icon">${isCorrect ? "🎉 Perfectly Synced!" : "❌ Suffix Mismatch"}</div>
        <div class="fb-detail">
          <p>Conjugation result: <span class="fb-correct-ans">${data.stem}${data.correctSuffix}</span></p>
          <p class="fb-rule"><strong>Rule:</strong> ${data.verb.explanation}</p>
        </div>
        <button id="btn-next-builder" class="action-btn primary-btn mt-2">Next Verb &rarr;</button>
      </div>
    `;
    feedback.classList.remove("hidden");

    document.getElementById("btn-next-builder").addEventListener("click", () => {
      activeState.currentIndex++;
      activeState.selectedSuffix = null;
      renderBuilderView();
    });
  }

  function showPracticeCompletion(title, message) {
    const container = document.getElementById("practice-container");
    if (!container) return;

    container.innerHTML = `
      <div class="glass-card completion-card text-center animate-glow-light">
        <div class="completion-icon">🏆</div>
        <h2>${title}</h2>
        <p class="lead">${message}</p>
        <p>Excellent work practicing conjugations. Building muscle memory is key to mastering Japanese!</p>
        <div class="completion-actions mt-4">
          <button class="action-btn primary-btn" onclick="window.PRACTICE_MODULE.exitToPortal()">Finish & Exit</button>
        </div>
      </div>
    `;
  }

  function exitToPortal() {
    initPracticePortal("practice-container");
  }

  return {
    init: initPracticePortal,
    startFlashcards,
    showQuizSettings,
    startQuiz,
    startSuffixBuilder,
    setSeg,
    checkChoiceAnswer,
    selectSuffixBlock,
    resetBuilder,
    exitToPortal
  };
})();
