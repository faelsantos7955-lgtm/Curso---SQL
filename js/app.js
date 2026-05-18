/* =========================================================
   App — boot, landing/app routing, wiring
   ========================================================= */

(async function () {
  // Load progress (synchronous, fast)
  Progress.load();

  // Decide landing vs app based on URL hash
  // (deep links like #aprender skip landing)
  const startInApp = window.location.hash === '#aprender' || window.location.hash === '#app';
  if (startInApp) {
    enterApp();
  } else {
    setupLanding();
  }

  // ============= LANDING =============
  function setupLanding() {
    document.body.classList.add('landing-mode');
    document.getElementById('landing').hidden = false;
    document.getElementById('app-shell').hidden = true;

    // CTA label depends on whether user has progress
    const { done, total } = Progress.overallProgress();
    const hasProgress = done > 0 || (Progress.get().currentLessonId && Progress.get().currentLessonId !== firstLesson().id);

    if (hasProgress) {
      document.getElementById('cta-label').textContent = 'Continuar onde parei';
      document.getElementById('btn-landing-restart').hidden = false;
      const note = document.getElementById('hero-progress-note');
      note.hidden = false;
      note.textContent = `Você já concluiu ${done} de ${total} aulas — continue de onde parou.`;
    } else {
      document.getElementById('cta-label').textContent = 'Começar agora';
    }

    // Wire CTAs
    ['btn-landing-start', 'btn-landing-start-top', 'btn-landing-start-bottom'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('click', enterApp);
    });

    document.getElementById('btn-landing-restart').addEventListener('click', () => {
      if (!confirm('Recomeçar apaga seu progresso atual. Continuar?')) return;
      Progress.reset();
      enterApp();
    });
  }

  // ============= ENTER APP =============
  async function enterApp() {
    document.body.classList.remove('landing-mode');
    document.getElementById('landing').hidden = true;
    document.getElementById('app-shell').hidden = false;

    // Update URL hash so refresh skips landing
    if (window.location.hash !== '#aprender') {
      history.replaceState(null, '', '#aprender');
    }

    // Update streak on app entry (counts as a "day of practice")
    Progress.refreshStreak();

    // Initialize SQL engine (lazy — only when entering app)
    try {
      await SqlEngine.init();
    } catch (e) {
      document.getElementById('content').innerHTML =
        `<div class="empty-state">Erro ao inicializar o motor SQL: ${UI.escapeHtml(e.message)}</div>`;
      return;
    }

    // Render
    const startLessonId = Progress.get().currentLessonId || firstLesson().id;
    UI.renderSidebar(startLessonId);
    UI.renderLesson(startLessonId);
    UI.updateTopbar();
    UI.checkNewAchievements();

    // Wire app buttons (idempotent — only attaches once)
    wireAppButtons();
  }

  // ============= GO BACK TO LANDING =============
  function goHome() {
    document.body.classList.add('landing-mode');
    document.getElementById('landing').hidden = false;
    document.getElementById('app-shell').hidden = true;
    history.replaceState(null, '', window.location.pathname);
    window.scrollTo(0, 0);
    setupLanding();
  }

  // ============= APP BUTTONS =============
  let appButtonsWired = false;
  function wireAppButtons() {
    if (appButtonsWired) return;
    appButtonsWired = true;

    document.getElementById('btn-home').addEventListener('click', goHome);

    document.getElementById('btn-reset').addEventListener('click', () => {
      if (!confirm('Resetar todo o progresso? Isso apaga as marcações de aulas/exercícios concluídos.')) return;
      Progress.reset();
      SqlEngine.resetDb();
      UI.renderSidebar(firstLesson().id);
      UI.renderLesson(firstLesson().id);
      UI.updateTopbar();
      UI.toast('Progresso resetado.', 'success');
    });

    // Encyclopedia
    document.getElementById('btn-encyclopedia').addEventListener('click', () => UI.openEncyclopedia());
    document.getElementById('btn-close-modal').addEventListener('click', () => UI.closeEncyclopedia());
    document.querySelector('#modal-encyclopedia .modal-backdrop').addEventListener('click', () => UI.closeEncyclopedia());
    document.getElementById('enc-search').addEventListener('input', e => UI.setEncSearch(e.target.value));

    // Achievements
    document.getElementById('btn-achievements').addEventListener('click', () => UI.openAchievements());
    document.getElementById('btn-close-ach').addEventListener('click', () => UI.closeAchievements());
    document.querySelector('#modal-achievements .modal-backdrop').addEventListener('click', () => UI.closeAchievements());

    // Global keyboard shortcuts
    document.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        UI.openEncyclopedia();
        return;
      }
      if (e.key === 'Escape') {
        if (UI.isEncyclopediaOpen()) UI.closeEncyclopedia();
        else if (UI.isAchievementsOpen()) UI.closeAchievements();
        else UI.hideTooltipImmediate();
      }
    });
  }

})();
