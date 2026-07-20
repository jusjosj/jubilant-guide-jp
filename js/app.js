// Main Application Router, State Manager, Sandbox, and Dictionary Logic

window.APP_ROUTER = (function() {
  
  // --- Local User State ---
  let userStats = {
    lessonsCompleted: 0,
    quizzesTaken: 0,
    correctAnswers: 0,
    totalQuestions: 0,
    streak: 0,
    lastPracticeDate: null
  };

  // --- Initialize App ---
  function init() {
    loadState();
    setupNavigation();
    updateDashboardStats();
    setupSandbox();
    setupDictionary();
    
    // Default navigate to dashboard on load
    navigateTo("dashboard");
  }

  // --- Local Storage Management ---
  function loadState() {
    const saved = localStorage.getItem("japanese_conjugation_user_stats");
    if (saved) {
      try {
        userStats = JSON.parse(saved);
        validateStreak();
      } catch (e) {
        console.error("Failed to parse user stats", e);
      }
    }
  }

  function saveState() {
    localStorage.setItem("japanese_conjugation_user_stats", JSON.stringify(userStats));
  }

  function validateStreak() {
    if (!userStats.lastPracticeDate) return;
    
    const lastDate = new Date(userStats.lastPracticeDate);
    const today = new Date();
    
    // Reset date hours to compare days
    lastDate.setHours(0,0,0,0);
    today.setHours(0,0,0,0);
    
    const diffTime = Math.abs(today - lastDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays > 1) {
      // Streak broken
      userStats.streak = 0;
      saveState();
    }
  }

  function incrementStreak() {
    const today = new Date();
    const todayStr = today.toDateString();
    
    if (userStats.lastPracticeDate) {
      const lastDate = new Date(userStats.lastPracticeDate);
      const lastDateStr = lastDate.toDateString();
      
      if (lastDateStr !== todayStr) {
        const lastDateReset = new Date(userStats.lastPracticeDate);
        lastDateReset.setHours(0,0,0,0);
        const todayReset = new Date();
        todayReset.setHours(0,0,0,0);
        
        const diffDays = Math.round((todayReset - lastDateReset) / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
          userStats.streak++;
        } else {
          userStats.streak = 1;
        }
      }
    } else {
      userStats.streak = 1;
    }
    
    userStats.lastPracticeDate = today.getTime();
    saveState();
  }

  // --- View Switching and Router ---
  function navigateTo(targetView) {
    // Hide all views
    document.querySelectorAll(".app-view").forEach(view => {
      view.classList.remove("active");
    });

    // Show target view
    const targetEl = document.getElementById(`view-${targetView}`);
    if (targetEl) {
      targetEl.classList.add("active");
    }

    // Toggle Nav Link states
    document.querySelectorAll(".nav-link").forEach(btn => {
      if (btn.dataset.target === targetView) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    // View specific initializations
    if (targetView === "dashboard") {
      updateDashboardStats();
    } else if (targetView === "lessons") {
      window.LESSONS_MODULE.init("lesson-container");
    } else if (targetView === "practice") {
      window.PRACTICE_MODULE.init("practice-container");
    }
  }

  function setupNavigation() {
    // Top Nav buttons
    document.querySelectorAll(".nav-link").forEach(btn => {
      btn.addEventListener("click", () => {
        navigateTo(btn.dataset.target);
      });
    });
  }

  // --- Dashboard Update Renderers ---
  function updateDashboardStats() {
    document.getElementById("stat-lessons-completed").innerText = userStats.lessonsCompleted;
    document.getElementById("stat-quizzes-taken").innerText = userStats.quizzesTaken;
    document.getElementById("stat-practice-streak").innerText = userStats.streak;

    // Calculate percentage
    let percentage = 0;
    if (userStats.totalQuestions > 0) {
      percentage = Math.round((userStats.correctAnswers / userStats.totalQuestions) * 100);
    }
    
    document.getElementById("stat-accuracy-text").innerText = `${percentage}%`;

    // Update circular accuracy chart SVG dashoffset
    // Full circumference is 2 * PI * R = 2 * 3.14159 * 55 = ~345.57
    const circle = document.getElementById("stat-accuracy-circle");
    if (circle) {
      const strokeLength = 345.57;
      const offset = strokeLength - (percentage / 100) * strokeLength;
      circle.style.strokeDashoffset = offset;
    }
  }

  // --- State Modifiers ---
  function markLessonCompleted() {
    userStats.lessonsCompleted++;
    incrementStreak();
    saveState();
    updateDashboardStats();
  }

  function updateStats(correctCount, totalCount) {
    userStats.quizzesTaken++;
    userStats.correctAnswers += correctCount;
    userStats.totalQuestions += totalCount;
    incrementStreak();
    saveState();
    updateDashboardStats();
  }

  // --- Sandbox Logic ---
  function setupSandbox() {
    const select = document.getElementById("sandbox-verb-select");
    if (!select) return;

    // Populate sandbox select options
    select.innerHTML = window.VERB_DATABASE.map((v, index) => `
      <option value="${index}">${v.kanji} (${v.hiragana} - ${v.english})</option>
    `).join("");

    select.addEventListener("change", (e) => {
      const verbIndex = parseInt(e.target.value, 10);
      updateSandboxVerb(window.VERB_DATABASE[verbIndex]);
    });

    // Default load first verb
    if (window.VERB_DATABASE.length > 0) {
      updateSandboxVerb(window.VERB_DATABASE[0]);
    }
  }

  function updateSandboxVerb(verb) {
    if (!verb) return;

    document.getElementById("sand-display-kanji").innerHTML = `<span class="kanji-hover" data-read="${verb.hiragana}">${verb.kanji}</span>`;
    document.getElementById("sand-display-hiragana").innerText = verb.hiragana;
    document.getElementById("sand-display-meaning").innerText = verb.english;
    
    document.getElementById("sand-display-group").innerText = verb.group;
    document.getElementById("sand-display-subtype").innerText = verb.subtype;

    document.getElementById("sand-res-te").innerHTML = `<span class="kanji-hover" data-read="${verb.teHiragana}">${verb.teForm}</span>`;
    document.getElementById("sand-res-te-info").innerText = verb.teHiragana;

    document.getElementById("sand-res-ta").innerHTML = `<span class="kanji-hover" data-read="${verb.taHiragana}">${verb.taForm}</span>`;
    document.getElementById("sand-res-ta-info").innerText = verb.taHiragana;

    document.getElementById("sandbox-explanation-text").innerHTML = `
      <strong>Sandbox Diagnosis:</strong> ${verb.explanation} 
      This is a <strong>Group ${verb.group}</strong> verb. The stem matches 
      <em>${verb.kanji.slice(0, -1)}</em> and the conjugation suffix applied is 
      <em>${verb.teForm.slice(verb.kanji.slice(0, -1).length)}</em> (for -te Form).
    `;
  }

  // --- Dictionary/Index Logic ---
  let activeFilter = "all"; // "all", "1", "2", "3"
  let activeLvlFilter = "all"; // "all", "N5", "N4"

  function setupDictionary() {
    const searchInput = document.getElementById("dict-search");
    if (!searchInput) return;

    // Load filter button clicks
    const filterButtons = [
      { id: "btn-filter-all", filter: "all" },
      { id: "btn-filter-g1", filter: "1" },
      { id: "btn-filter-g2", filter: "2" },
      { id: "btn-filter-g3", filter: "3" }
    ];

    filterButtons.forEach(cfg => {
      const btn = document.getElementById(cfg.id);
      if (btn) {
        btn.addEventListener("click", () => {
          // Toggle active
          filterButtons.forEach(c => {
            const b = document.getElementById(c.id);
            if (b) b.classList.remove("active");
          });
          btn.classList.add("active");
          activeFilter = cfg.filter;
          renderDictionaryTable();
        });
      }
    });

    // Load level filter buttons
    const lvlFilterButtons = [
      { id: "btn-filter-lvl-all", filter: "all" },
      { id: "btn-filter-lvl-n5", filter: "N5" },
      { id: "btn-filter-lvl-n4", filter: "N4" }
    ];

    lvlFilterButtons.forEach(cfg => {
      const btn = document.getElementById(cfg.id);
      if (btn) {
        btn.addEventListener("click", () => {
          lvlFilterButtons.forEach(c => {
            const b = document.getElementById(c.id);
            if (b) b.classList.remove("active");
          });
          btn.classList.add("active");
          activeLvlFilter = cfg.filter;
          renderDictionaryTable();
        });
      }
    });

    searchInput.addEventListener("input", renderDictionaryTable);

    // Initial render
    renderDictionaryTable();
  }

  function renderDictionaryTable() {
    const searchVal = document.getElementById("dict-search").value.toLowerCase().trim();
    const tbody = document.getElementById("dict-table-body");
    if (!tbody) return;

    let filtered = window.VERB_DATABASE;

    // Apply Group filters
    if (activeFilter !== "all") {
      const targetGroup = parseInt(activeFilter, 10);
      filtered = filtered.filter(v => v.group === targetGroup);
    }

    // Apply Level filters
    if (activeLvlFilter !== "all") {
      filtered = filtered.filter(v => v.level === activeLvlFilter);
    }

    // Apply Search matches
    if (searchVal) {
      filtered = filtered.filter(v => 
        v.kanji.toLowerCase().includes(searchVal) ||
        v.hiragana.toLowerCase().includes(searchVal) ||
        v.romaji.toLowerCase().includes(searchVal) ||
        v.english.toLowerCase().includes(searchVal) ||
        v.teForm.toLowerCase().includes(searchVal) ||
        v.taForm.toLowerCase().includes(searchVal)
      );
    }

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" class="text-center" style="color: var(--color-text-muted); padding: 2rem;">
            No verbs match your search filter criteria.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map(v => `
      <tr>
        <td class="td-japanese td-kanji">${v.kanji}</td>
        <td class="td-japanese">${v.hiragana}</td>
        <td>${v.romaji}</td>
        <td>${v.english}</td>
        <td><span class="badge" style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.15); color: #fff;">${v.level}</span></td>
        <td class="td-group text-group-${v.group}">Group ${v.group}</td>
        <td class="td-japanese hl-te">${v.teForm}</td>
        <td class="td-japanese hl-ta">${v.taForm}</td>
      </tr>
    `).join("");
  }

  // --- Run Initialization on Dom Load ---
  document.addEventListener("DOMContentLoaded", init);

  return {
    navigateTo,
    markLessonCompleted,
    updateStats
  };
})();
