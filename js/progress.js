/* =========================================================
   Progress — exercícios concluídos, stats, streak, conquistas
   ========================================================= */

const Progress = (() => {
  const SAVE_KEY = 'sqlcurso_save_v1';

  let state = null;

  function defaultState() {
    return {
      completedExercises: {},
      revealedSolutions: {},
      currentLessonId: null,
      stats: {
        totalQueries: 0,
        successfulQueries: 0,
        solvedWithoutSolution: 0
      },
      streak: { current: 0, best: 0, lastDate: null },
      unlockedAchievements: []
    };
  }

  function load() {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) { state = defaultState(); return state; }
    try {
      state = JSON.parse(raw);
      // Migrations / safety
      if (!state.completedExercises)   state.completedExercises = {};
      if (!state.revealedSolutions)    state.revealedSolutions = {};
      if (!state.stats)                state.stats = { totalQueries: 0, successfulQueries: 0, solvedWithoutSolution: 0 };
      if (state.stats.totalQueries      == null) state.stats.totalQueries = 0;
      if (state.stats.successfulQueries == null) state.stats.successfulQueries = 0;
      if (state.stats.solvedWithoutSolution == null) state.stats.solvedWithoutSolution = 0;
      if (!state.streak)               state.streak = { current: 0, best: 0, lastDate: null };
      if (!state.unlockedAchievements) state.unlockedAchievements = [];
      return state;
    } catch {
      state = defaultState();
      return state;
    }
  }

  function save() { if (state) localStorage.setItem(SAVE_KEY, JSON.stringify(state)); }

  function reset() {
    state = defaultState();
    save();
  }

  function get() { return state; }

  function bumpStat(key, n = 1) {
    if (!state.stats) state.stats = {};
    state.stats[key] = (state.stats[key] || 0) + n;
    save();
  }

  function markExerciseDone(lessonId, exerciseIdx) {
    if (!state.completedExercises[lessonId]) state.completedExercises[lessonId] = [];
    if (!state.completedExercises[lessonId].includes(exerciseIdx)) {
      state.completedExercises[lessonId].push(exerciseIdx);
      // If not revealed solution → bump "solvedWithoutSolution"
      const revealed = state.revealedSolutions[lessonId] || [];
      if (!revealed.includes(exerciseIdx)) {
        state.stats.solvedWithoutSolution = (state.stats.solvedWithoutSolution || 0) + 1;
      }
      save();
    }
  }

  function markSolutionRevealed(lessonId, exerciseIdx) {
    if (!state.revealedSolutions[lessonId]) state.revealedSolutions[lessonId] = [];
    if (!state.revealedSolutions[lessonId].includes(exerciseIdx)) {
      state.revealedSolutions[lessonId].push(exerciseIdx);
      save();
    }
  }

  function isExerciseDone(lessonId, exerciseIdx) {
    return state.completedExercises[lessonId]
      && state.completedExercises[lessonId].includes(exerciseIdx);
  }

  function isSolutionRevealed(lessonId, exerciseIdx) {
    return state.revealedSolutions[lessonId]
      && state.revealedSolutions[lessonId].includes(exerciseIdx);
  }

  function isLessonComplete(lesson) {
    if (!lesson.exercises || lesson.exercises.length === 0) return true;
    const done = state.completedExercises[lesson.id] || [];
    return lesson.exercises.every((_, idx) => done.includes(idx));
  }

  function setCurrentLesson(id) {
    state.currentLessonId = id;
    save();
  }

  function overallProgress() {
    let done = 0, total = 0;
    for (const module of CURRICULUM) {
      for (const lesson of module.lessons) {
        total += 1;
        if (isLessonComplete(lesson)) done += 1;
      }
    }
    return { done, total };
  }

  function refreshStreak() {
    const changed = updateStreak(state);
    if (changed) save();
    return state.streak;
  }

  function checkAndUnlockAchievements() {
    const newly = checkAchievements(state);
    if (newly.length > 0) save();
    return newly;
  }

  return {
    load, save, reset, get,
    bumpStat,
    markExerciseDone, markSolutionRevealed,
    isExerciseDone, isSolutionRevealed, isLessonComplete,
    setCurrentLesson, overallProgress,
    refreshStreak, checkAndUnlockAchievements
  };
})();
