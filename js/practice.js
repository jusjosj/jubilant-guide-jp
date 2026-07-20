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
    practiceLevel: "all", // Filter by level: "all", "N5", "N4"
    // Quiz configuration
    quizConfig: {
      length: 10,
      targetForm: "both", // "te", "ta", "both"
      questionType: "mixed" // "choice", "input", "mixed"
    },
    // Flashcard variables
    isCardFlipped: false,
    cardConfig: {
      selectedForms: ["te", "ta"] // can contain "te", "ta", "politePast", "plainPastNeg"
    },
    // Builder variables
    selectedSuffix: null
  };

  function setPracticeLevel(btnEl, level) {
    const parent = btnEl.parentNode;
    parent.querySelectorAll(".seg-btn").forEach(btn => btn.classList.remove("active"));
    btnEl.classList.add("active");
    activeState.practiceLevel = level;
  }

  function initPracticePortal(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div class="practice-portal-header text-center">
        <h2>Japanese Verb Practice Arena</h2>
        <p class="lead">Select a training exercise below to build your muscle memory for -te and -ta conjugations.</p>
        
        <div style="display: inline-flex; align-items: center; justify-content: center; gap: 15px; margin-bottom: 2rem; background: rgba(0,0,0,0.15); padding: 8px 16px; border-radius: 15px; border: 1px solid var(--glass-border);">
          <span style="color: var(--color-text-muted); font-size: 0.95rem; font-weight: 500;">Practice Level:</span>
          <div class="segmented-control" style="min-width: 250px;">
            <button class="seg-btn ${activeState.practiceLevel === "all" ? "active" : ""}" onclick="window.PRACTICE_MODULE.setPracticeLevel(this, 'all')">All Levels</button>
            <button class="seg-btn ${activeState.practiceLevel === "N5" ? "active" : ""}" onclick="window.PRACTICE_MODULE.setPracticeLevel(this, 'N5')">N5 Only</button>
            <button class="seg-btn ${activeState.practiceLevel === "N4" ? "active" : ""}" onclick="window.PRACTICE_MODULE.setPracticeLevel(this, 'N4')">N4 Only</button>
          </div>
        </div>
      </div>

      <div class="practice-modes-grid">
        <!-- Mode 1: Flashcards -->
        <div class="glass-card mode-select-card" id="card-mode-select">
          <div class="mode-icon">🎴</div>
          <h3>Verb Flashcards</h3>
          <p>Study Japanese verbs at your own pace. Review dictionary forms, flip to see conjugations, and check grammar explanations.</p>
          <button class="action-btn primary-btn mt-auto" onclick="window.PRACTICE_MODULE.showFlashcardSettings()">Configure Flashcards</button>
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

        <!-- Mode 4: ta koto ga aru Sentence Arena -->
        <div class="glass-card mode-select-card" id="koto-mode-select">
          <div class="mode-icon">⛰️</div>
          <h3>〜たことがある Arena</h3>
          <p>Practice past experience sentences! Conjugate N5/N4 verbs in a fill-in-the-blank interface to complete real Japanese sentences.</p>
          <button class="action-btn primary-btn mt-auto" style="background: var(--cyan-accent); box-shadow: 0 4px 15px var(--cyan-accent-glow); color: #0b0914;" onclick="window.PRACTICE_MODULE.startKotoGaAruQuiz()">Launch Arena</button>
        </div>
      </div>
    `;
  }

  // ==========================================
  // FLASHCARDS MODE
  // ==========================================

  function showFlashcardSettings() {
    const container = document.getElementById("practice-container");
    if (!container) return;

    const forms = activeState.cardConfig.selectedForms;
    const isTe = forms.includes("te");
    const isTa = forms.includes("ta");
    const isPolite = forms.includes("politePast");
    const isNeg = forms.includes("plainPastNeg");

    container.innerHTML = `
      <div class="practice-header">
        <button class="back-link" onclick="window.PRACTICE_MODULE.exitToPortal()">&larr; Exit to Practice Menu</button>
      </div>

      <div class="glass-card settings-card-form max-w-500 mx-auto">
        <h3 class="text-center">Configure Flashcards</h3>
        <p class="settings-intro text-center" style="margin-bottom: 1.5rem; color: var(--color-text-muted);">Select any combination of conjugation forms to display on the back of the cards.</p>
        
        <div class="settings-form">
          <div class="form-group" style="margin-bottom: 1.5rem;">
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Conjugation Forms (Select Multiple):</label>
            <div class="segmented-control" style="flex-wrap: wrap; gap: 8px;" id="flashcard-forms-select">
              <button class="seg-btn ${isTe ? "active" : ""}" data-val="te" onclick="window.PRACTICE_MODULE.toggleFlashcardForm(this)">-te Form</button>
              <button class="seg-btn ${isTa ? "active" : ""}" data-val="ta" onclick="window.PRACTICE_MODULE.toggleFlashcardForm(this)">-ta Form</button>
              <button class="seg-btn ${isPolite ? "active" : ""}" data-val="politePast" onclick="window.PRACTICE_MODULE.toggleFlashcardForm(this)">-mashita</button>
              <button class="seg-btn ${isNeg ? "active" : ""}" data-val="plainPastNeg" onclick="window.PRACTICE_MODULE.toggleFlashcardForm(this)">-nakatta</button>
            </div>
            <p id="flashcard-warn-text" class="text-center" style="font-size: 0.8rem; color: var(--color-danger); margin-top: 8px; visibility: hidden;">You must select at least one conjugation form!</p>
          </div>

          <button class="action-btn primary-btn w-full mt-4" onclick="window.PRACTICE_MODULE.startFlashcards()">Launch Flashcards! 🎴</button>
        </div>
      </div>
    `;
  }

  function toggleFlashcardForm(btnEl) {
    const parent = btnEl.parentNode;
    const activeBtns = parent.querySelectorAll(".seg-btn.active");
    const warnText = document.getElementById("flashcard-warn-text");

    if (btnEl.classList.contains("active")) {
      // Trying to deactivate
      if (activeBtns.length <= 1) {
        if (warnText) {
          warnText.style.visibility = "visible";
          setTimeout(() => { if (warnText) warnText.style.visibility = "hidden"; }, 3000);
        }
        return;
      }
      btnEl.classList.remove("active");
    } else {
      btnEl.classList.add("active");
      if (warnText) warnText.style.visibility = "hidden";
    }

    // Update activeState
    const newSelection = [];
    parent.querySelectorAll(".seg-btn.active").forEach(btn => {
      newSelection.push(btn.dataset.val);
    });
    activeState.cardConfig.selectedForms = newSelection;
  }

  function startFlashcards() {
    activeState.mode = "cards";
    // Filter verb database by level
    let candidates = [...window.VERB_DATABASE];
    if (activeState.practiceLevel !== "all") {
      candidates = candidates.filter(v => v.level === activeState.practiceLevel);
    }
    // Shuffle
    activeState.verbsList = candidates.sort(() => 0.5 - Math.random());
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

    // Build dynamic answer display blocks
    const selectedForms = activeState.cardConfig.selectedForms;
    const numSelected = selectedForms.length;

    const conjBlocks = {
      te: `
        <div class="conj-block">
          <span class="conj-label">-te Form (て)</span>
          <span class="conj-val-kanji"><span class="kanji-hover" data-read="${verb.teHiragana}">${verb.teForm}</span></span>
          <span class="conj-val-kana">${verb.teHiragana}</span>
        </div>
      `,
      ta: `
        <div class="conj-block">
          <span class="conj-label">-ta Form (た)</span>
          <span class="conj-val-kanji"><span class="kanji-hover" data-read="${verb.taHiragana}">${verb.taForm}</span></span>
          <span class="conj-val-kana">${verb.taHiragana}</span>
        </div>
      `,
      politePast: `
        <div class="conj-block">
          <span class="conj-label">Polite Past (-mashita)</span>
          <span class="conj-val-kanji"><span class="kanji-hover" data-read="${verb.politePastHiragana}">${verb.politePastForm}</span></span>
          <span class="conj-val-kana">${verb.politePastHiragana}</span>
        </div>
      `,
      plainPastNeg: `
        <div class="conj-block">
          <span class="conj-label">Plain Past Neg (-nakatta)</span>
          <span class="conj-val-kanji"><span class="kanji-hover" data-read="${verb.plainPastNegHiragana}">${verb.plainPastNegForm}</span></span>
          <span class="conj-val-kana">${verb.plainPastNegHiragana}</span>
        </div>
      `
    };

    const conjHtml = selectedForms.map(fKey => conjBlocks[fKey]).join("");
    const gridStyle = numSelected === 1 ? "grid-template-columns: 1fr; gap: 0.5rem;" : "grid-template-columns: 1fr 1fr; gap: 1.5rem;";
    
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
              <span class="kanji-display"><span class="kanji-hover" data-read="${verb.hiragana}">${verb.kanji}</span></span>
            </div>
            <div class="card-english">${verb.english}</div>
            <div class="card-action-cue">Click Card to Flip</div>
          </div>

          <!-- BACK OF CARD -->
          <div class="card-side card-back glass-card ${numSelected >= 3 ? "compact-layout" : ""}">
            <span class="badge badge-g${verb.group}">Conjugated Forms</span>
            <div class="conjugations-display" style="${gridStyle}">
              ${conjHtml}
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
            <div class="segmented-control" style="flex-wrap: wrap; gap: 8px;">
              <button class="seg-btn active" data-val="both" onclick="window.PRACTICE_MODULE.setSeg(this, 'targetForm')">Mixed (All)</button>
              <button class="seg-btn" data-val="te" onclick="window.PRACTICE_MODULE.setSeg(this, 'targetForm')">-te</button>
              <button class="seg-btn" data-val="ta" onclick="window.PRACTICE_MODULE.setSeg(this, 'targetForm')">-ta</button>
              <button class="seg-btn" data-val="politePast" onclick="window.PRACTICE_MODULE.setSeg(this, 'targetForm')">-mashita</button>
              <button class="seg-btn" data-val="plainPastNeg" onclick="window.PRACTICE_MODULE.setSeg(this, 'targetForm')">-nakatta</button>
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
    
    // Filter verb database by level
    let candidates = [...window.VERB_DATABASE];
    if (activeState.practiceLevel !== "all") {
      candidates = candidates.filter(v => v.level === activeState.practiceLevel);
    }
    // Choose N random verbs from database
    const shuffled = candidates.sort(() => 0.5 - Math.random());
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
    
    // Determine target form for this question (-te, -ta, politePast, plainPastNeg)
    let form = activeState.quizConfig.targetForm;
    if (form === "both") {
      const forms = ["te", "ta", "politePast", "plainPastNeg"];
      form = forms[Math.floor(Math.random() * forms.length)];
    }

    // Determine type (choice or input)
    let qType = activeState.quizConfig.questionType;
    if (qType === "mixed") {
      qType = Math.random() > 0.5 ? "choice" : "input";
    }

    // Prepare Question Model
    let correctKanji = "", correctKana = "", correctRomaji = "";
    if (form === "te") {
      correctKanji = verb.teForm; correctKana = verb.teHiragana; correctRomaji = verb.teRomaji;
    } else if (form === "ta") {
      correctKanji = verb.taForm; correctKana = verb.taHiragana; correctRomaji = verb.taRomaji;
    } else if (form === "politePast") {
      correctKanji = verb.politePastForm; correctKana = verb.politePastHiragana; correctRomaji = verb.politePastRomaji;
    } else if (form === "plainPastNeg") {
      correctKanji = verb.plainPastNegForm; correctKana = verb.plainPastNegHiragana; correctRomaji = verb.plainPastNegRomaji;
    }

    const qModel = {
      verb: verb,
      form: form,
      type: qType,
      correctAnswerKanji: correctKanji,
      correctAnswerKana: correctKana,
      correctAnswerRomaji: correctRomaji
    };

    container.innerHTML = `
      <div class="practice-header">
        <button class="back-link" onclick="window.PRACTICE_MODULE.exitToPortal()">&larr; Abort Quiz</button>
        <span class="progress-indicator">Question ${activeState.currentIndex + 1} of ${activeState.totalQuestions}</span>
      </div>

      <div class="quiz-question-card glass-card">
        <div class="quiz-verb-prompt">
          <span class="badge badge-g${verb.group}">Group ${verb.group} Verb</span>
          <h2>Conjugate: <span class="prompt-kanji"><span class="kanji-hover" data-read="${verb.hiragana}">${verb.kanji}</span></span></h2>
          <div class="prompt-translation">Meaning: "${verb.english}"</div>
        </div>

        <div class="quiz-target-banner target-${form}">
          Form requested: <strong>${form === "te" ? "-te Form (て形)" : form === "ta" ? "-ta Form (た形)" : form === "politePast" ? "Polite Past Form (-mashita / ました形)" : "Plain Past Negative Form (-nakatta / なかった形)"}</strong>
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
    const form = qModel.form;
    const correct = qModel.correctAnswerKanji;

    const distractors = new Set();
    
    if (form === "te" || form === "ta") {
      const isTe = form === "te";
      // Distractor 1: Standard Ichidan drop-ru rule on Godan (or vice versa)
      if (verb.group === 1) {
        // E.g., kau -> kaute / kauta (dropping u and adding te/ta)
        distractors.add(verb.kanji.slice(0, -1) + (isTe ? "て" : "た"));
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
    } else if (form === "politePast") {
      distractors.add(verb.kanji + "ました"); // e.g. 買うました
      distractors.add(verb.teForm);          // e.g. 買って
      distractors.add(verb.taForm);          // e.g. 買った
      distractors.add(verb.plainPastNegForm); // e.g. 買わなかった
    } else if (form === "plainPastNeg") {
      distractors.add(verb.kanji + "なかった"); // e.g. 買うなかった
      distractors.add(verb.taForm);            // e.g. 買った
      distractors.add(verb.politePastForm);     // e.g. 買いました
      distractors.add(verb.teForm);            // e.g. 買って
    }

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
        <input type="text" id="quiz-typed-input" placeholder="Type Hiragana (e.g. ${qModel.correctAnswerKana})..." autocomplete="off" autofocus>
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
      correctString: `<span class="kanji-hover" data-read="${q.correctAnswerKana}">${q.correctAnswerKanji}</span> (${q.correctAnswerKana})`
    });

    feedbackBox.innerHTML = `
      <div class="feedback-card ${isCorrect ? "fb-correct" : "fb-incorrect"} animate-pop">
        <div class="fb-icon">${isCorrect ? "✅ Correct!" : "❌ Incorrect"}</div>
        <div class="fb-detail">
          <p>Correct conjugation: <span class="fb-correct-ans"><span class="kanji-hover" data-read="${q.correctAnswerKana}">${q.correctAnswerKanji}</span></span> (${q.correctAnswerKana})</p>
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
    // Filter verb database by level
    let candidates = [...window.VERB_DATABASE];
    if (activeState.practiceLevel !== "all") {
      candidates = candidates.filter(v => v.level === activeState.practiceLevel);
    }
    activeState.verbsList = candidates.sort(() => 0.5 - Math.random());
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
    
    // Choose target form randomly from the 4 forms
    const forms = ["te", "ta", "politePast", "plainPastNeg"];
    const form = forms[Math.floor(Math.random() * forms.length)];

    let stem = "";
    let correctSuffix = "";
    let correctAnswer = "";

    // Calculate split
    if (form === "te" || form === "ta") {
      const isTe = form === "te";
      correctAnswer = isTe ? verb.teForm : verb.taForm;

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
    } else if (form === "politePast") {
      correctAnswer = verb.politePastForm;
      correctSuffix = "ました";
      stem = verb.politePastForm.slice(0, -3); // drop "ました"
    } else if (form === "plainPastNeg") {
      correctAnswer = verb.plainPastNegForm;
      correctSuffix = "なかった";
      stem = verb.plainPastNegForm.slice(0, -4); // drop "なかった"
    }

    // Generate option suffix blocks
    const allSuffixes = ["て", "た", "ました", "なかった", "って", "んで", "いて", "いで", "して", "った", "んだ", "いた", "いだ", "した"];
    
    // Ensure correct suffix is in array, take unique values, slice 6, ensure correctSuffix is in it
    const uniquePool = Array.from(new Set([correctSuffix, ...allSuffixes]));
    const shuffledPool = uniquePool.sort(() => 0.5 - Math.random()).slice(0, 6);
    if (!shuffledPool.includes(correctSuffix)) {
      shuffledPool[0] = correctSuffix;
    }
    const sfxPool = shuffledPool.sort(() => 0.5 - Math.random());

    container.innerHTML = `
      <div class="practice-header">
        <button class="back-link" onclick="window.PRACTICE_MODULE.exitToPortal()">&larr; Exit to Practice Menu</button>
        <span class="progress-indicator">Builder ${activeState.currentIndex + 1} of ${activeState.verbsList.length}</span>
      </div>

      <div class="builder-arena glass-card">
        <div class="builder-prompt">
          <span class="badge badge-g${verb.group}">Group ${verb.group}</span>
          <h2>Assemble Conjugation: <strong><span class="kanji-hover" data-read="${verb.hiragana}">${verb.kanji}</span></strong> (${verb.english})</h2>
          <div class="builder-target-tag">Target Form: <strong>${form === "te" ? "-te Form" : form === "ta" ? "-ta Form" : form === "politePast" ? "Polite Past Form (-mashita)" : "Plain Past Negative (-nakatta)"}</strong></div>
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

  // ==========================================
  // ~TA KOTO GA ARU SENTENCE ARENA
  // ==========================================

  function startKotoGaAruQuiz() {
    activeState.mode = "koto";
    activeState.currentIndex = 0;
    activeState.score = 0;
    activeState.answersLog = [];
    
    // Shuffle the sentences database
    const shuffled = [...window.KOTO_GA_ARU_SENTENCES].sort(() => 0.5 - Math.random());
    activeState.verbsList = shuffled; // here verbsList holds the sentence objects
    activeState.totalQuestions = shuffled.length;

    renderKotoGaAruQuestion();
  }

  function renderKotoGaAruQuestion() {
    const container = document.getElementById("practice-container");
    if (!container) return;

    if (activeState.currentIndex >= activeState.totalQuestions) {
      showPracticeCompletion("Sentence Arena Completed!", `Splendid! You completed all ${activeState.totalQuestions} sentences in the arena.`);
      return;
    }

    const item = activeState.verbsList[activeState.currentIndex];

    // Build fill-in-the-blank input HTML
    // We replace "________" with a styled blank text box
    const sentenceParts = item.sentencePattern.split("________");
    const part1 = sentenceParts[0];
    const part2 = sentenceParts[1] || "";

    container.innerHTML = `
      <div class="practice-header">
        <button class="back-link" onclick="window.PRACTICE_MODULE.exitToPortal()">&larr; Exit to Practice Menu</button>
        <span class="progress-indicator">Sentence ${activeState.currentIndex + 1} of ${activeState.totalQuestions}</span>
      </div>

      <div class="quiz-question-card glass-card">
        <div class="quiz-verb-prompt">
          <span class="badge badge-g2" style="background: rgba(0, 222, 201, 0.25); color: #00dec9; border: 1px solid rgba(0, 222, 201, 0.4);">Experience Grammar</span>
          <h2>〜たことがある (Koto ga aru)</h2>
          <div class="prompt-translation" style="margin-top: 10px; font-size: 1.15rem; font-style: italic; color: #fff;">
            "${item.englishTranslation}"
          </div>
        </div>

        <div class="sentence-fill-container" style="display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 10px; margin: 2rem 0; font-size: 1.6rem; font-family: var(--font-ja);">
          <span>${part1}</span>
          <div class="fill-input-wrapper" style="position: relative;">
            <input type="text" id="koto-typed-input" placeholder="た-form..." autocomplete="off" autofocus 
                   style="background: rgba(0, 0, 0, 0.4); border: 2px dashed var(--cyan-accent); border-radius: 8px; padding: 6px 12px; font-size: 1.4rem; color: #fff; width: 160px; text-align: center; font-family: var(--font-ja); outline: none;">
          </div>
          <span>${part2}</span>
        </div>

        <div style="text-align: center; margin-bottom: 1.5rem; color: var(--color-text-muted); font-size: 0.95rem;">
          Conjugate this verb: <strong>${item.dictionaryForm}</strong> (${item.verbMeaning})
          <div class="kana-live-preview">Kana translation: <strong id="koto-live-kana"></strong></div>
        </div>

        <button id="btn-submit-koto-answer" class="action-btn primary-btn mt-3 w-full mx-auto" style="display: block;">Submit Sentence</button>
        
        <div id="koto-feedback" class="quiz-feedback-box hidden"></div>
      </div>
    `;

    const input = document.getElementById("koto-typed-input");
    const preview = document.getElementById("koto-live-kana");
    const submitBtn = document.getElementById("btn-submit-koto-answer");

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
      checkKotoAnswer(rawVal, convertedVal, item);
    });
  }

  function checkKotoAnswer(rawVal, convertedVal, item) {
    // Check correct values
    const isCorrect = (
      rawVal === item.correctConjugation ||
      convertedVal === item.correctHiragana ||
      rawVal.toLowerCase() === item.correctRomaji
    );

    const input = document.getElementById("koto-typed-input");
    const submitBtn = document.getElementById("btn-submit-koto-answer");
    if (input) input.disabled = true;
    if (submitBtn) submitBtn.disabled = true;

    if (input) {
      if (isCorrect) {
        input.style.borderColor = "var(--color-success)";
        input.style.background = "rgba(85, 239, 196, 0.05)";
        input.style.boxShadow = "0 0 10px rgba(85, 239, 196, 0.3)";
      } else {
        input.style.borderColor = "var(--color-danger)";
        input.style.background = "rgba(255, 118, 117, 0.05)";
        input.style.boxShadow = "0 0 10px rgba(255, 118, 117, 0.3)";
      }
    }

    const feedback = document.getElementById("koto-feedback");
    feedback.innerHTML = `
      <div class="feedback-card ${isCorrect ? "fb-correct" : "fb-incorrect"} animate-pop">
        <div class="fb-icon">${isCorrect ? "🎉 Correct!" : "❌ Try Again!"}</div>
        <div class="fb-detail">
          <p>Complete Sentence: <strong style="font-family: var(--font-ja); color: #fff; font-size: 1.15rem;">
            ${item.sentencePattern.replace("________", item.correctConjugation)}
          </strong></p>
          <p>English: "${item.englishTranslation}"</p>
          <p class="fb-rule"><strong>Verb breakdown:</strong> '${item.dictionaryForm}' conjugates to '<strong>${item.correctConjugation}</strong>' in the past plain (-ta) form before adding 'koto ga aru'.</p>
        </div>
        <button id="btn-next-koto" class="action-btn primary-btn mt-2">Next Sentence &rarr;</button>
      </div>
    `;
    feedback.classList.remove("hidden");

    document.getElementById("btn-next-koto").addEventListener("click", () => {
      activeState.currentIndex++;
      renderKotoGaAruQuestion();
    });
  }

  return {
    init: initPracticePortal,
    setPracticeLevel,
    showFlashcardSettings,
    toggleFlashcardForm,
    startFlashcards,
    showQuizSettings,
    startQuiz,
    startSuffixBuilder,
    startKotoGaAruQuiz,
    setSeg,
    checkChoiceAnswer,
    selectSuffixBlock,
    resetBuilder,
    exitToPortal
  };
})();
