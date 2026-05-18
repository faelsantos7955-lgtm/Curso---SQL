/* =========================================================
   App — boot e wiring
   ========================================================= */

(async function () {
  // Load progress + update streak for today
  Progress.load();
  Progress.refreshStreak();

  // Initialize SQL engine
  try {
    await SqlEngine.init();
  } catch (e) {
    document.getElementById('content').innerHTML =
      `<div class="empty-state">Erro ao inicializar o motor SQL: ${UI.escapeHtml(e.message)}</div>`;
    return;
  }

  // Render initial state
  const startLessonId = Progress.get().currentLessonId || firstLesson().id;
  UI.renderSidebar(startLessonId);
  UI.renderLesson(startLessonId);
  UI.updateTopbar();
  UI.checkNewAchievements();  // unlock any achievements that may have been earned by streak update

  // Reset button
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

})();
