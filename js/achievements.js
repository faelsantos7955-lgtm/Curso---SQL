/* =========================================================
   Achievements — sistema de conquistas leve
   ========================================================= */

const ACHIEVEMENTS = [
  {
    id: 'first-query',
    name: 'Primeira Query',
    description: 'Execute sua primeira query SQL bem-sucedida.',
    icon: '🚀',
    check: s => (s.stats?.successfulQueries || 0) >= 1
  },
  {
    id: 'first-exercise',
    name: 'Primeiro Acerto',
    description: 'Resolva seu primeiro exercício com sucesso.',
    icon: '✅',
    check: s => totalExercisesDone(s) >= 1
  },
  {
    id: 'no-shortcut-5',
    name: 'Sem Atalhos',
    description: 'Resolva 5 exercícios sem ver a solução.',
    icon: '💯',
    check: s => (s.stats?.solvedWithoutSolution || 0) >= 5
  },
  {
    id: 'persistent',
    name: 'Persistente',
    description: 'Faça 50 queries (com erro ou acerto — tentativa é tudo).',
    icon: '⚡',
    check: s => (s.stats?.totalQueries || 0) >= 50
  },
  {
    id: 'streak-3',
    name: 'Sequência de 3',
    description: 'Use o curso por 3 dias consecutivos.',
    icon: '🔥',
    check: s => (s.streak?.current || 0) >= 3
  },
  {
    id: 'streak-7',
    name: 'Semana Cheia',
    description: 'Use o curso por 7 dias consecutivos.',
    icon: '🌟',
    check: s => (s.streak?.current || 0) >= 7
  },
  {
    id: 'module-M1',
    name: 'Fundamentos',
    description: 'Conclua o Módulo 1 — Fundamentos.',
    icon: '📘',
    check: s => moduleComplete(s, 'M1')
  },
  {
    id: 'module-M2',
    name: 'Selecionador',
    description: 'Conclua o Módulo 2 — SELECT em detalhe.',
    icon: '🎯',
    check: s => moduleComplete(s, 'M2')
  },
  {
    id: 'module-M3',
    name: 'Filtrador',
    description: 'Conclua o Módulo 3 — Filtrando com WHERE.',
    icon: '🔍',
    check: s => moduleComplete(s, 'M3')
  },
  {
    id: 'module-M4',
    name: 'Ordenador',
    description: 'Conclua o Módulo 4 — Ordenando e Limitando.',
    icon: '📊',
    check: s => moduleComplete(s, 'M4')
  },
  {
    id: 'module-M5',
    name: 'Agregador',
    description: 'Conclua o Módulo 5 — Agregação.',
    icon: '➕',
    check: s => moduleComplete(s, 'M5')
  },
  {
    id: 'module-M6',
    name: 'Conectador',
    description: 'Conclua o Módulo 6 — JOINs.',
    icon: '🔗',
    check: s => moduleComplete(s, 'M6')
  },
  {
    id: 'module-M7',
    name: 'Manipulador',
    description: 'Conclua o Módulo 7 — Manipulando Dados.',
    icon: '🧬',
    check: s => moduleComplete(s, 'M7')
  },
  {
    id: 'module-M8',
    name: 'Arquiteto de Queries',
    description: 'Conclua o Módulo 8 — Queries Complexas (Subqueries, CTEs, Window).',
    icon: '🏗️',
    check: s => moduleComplete(s, 'M8')
  },
  {
    id: 'module-M9',
    name: 'Capstone Vencido',
    description: 'Resolva as 3 perguntas do case real (Módulo 9).',
    icon: '🎓',
    check: s => moduleComplete(s, 'M9')
  },
  {
    id: 'all-modules',
    name: 'Curso Completo',
    description: 'Conclua todos os módulos disponíveis.',
    icon: '🏆',
    check: s => CURRICULUM.every(m => moduleComplete(s, m.id))
  }
];

// ============ Helpers ============
function totalExercisesDone(s) {
  if (!s.completedExercises) return 0;
  return Object.values(s.completedExercises).reduce((a, arr) => a + arr.length, 0);
}

function moduleComplete(s, moduleId) {
  const m = CURRICULUM.find(mm => mm.id === moduleId);
  if (!m) return false;
  return m.lessons.every(l => {
    if (!l.exercises || l.exercises.length === 0) return true;
    const done = (s.completedExercises && s.completedExercises[l.id]) || [];
    return l.exercises.every((_, idx) => done.includes(idx));
  });
}

/**
 * Verifica achievements e retorna lista dos que acabaram de desbloquear (não estavam unlocked antes).
 */
function checkAchievements(state) {
  if (!state.unlockedAchievements) state.unlockedAchievements = [];
  const newlyUnlocked = [];
  for (const a of ACHIEVEMENTS) {
    if (state.unlockedAchievements.includes(a.id)) continue;
    try {
      if (a.check(state)) {
        state.unlockedAchievements.push(a.id);
        newlyUnlocked.push(a);
      }
    } catch (e) {
      // ignore check errors
    }
  }
  return newlyUnlocked;
}

function isUnlocked(state, id) {
  return state.unlockedAchievements && state.unlockedAchievements.includes(id);
}

/** Day-aware streak update. Returns true if streak was updated. */
function updateStreak(state) {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  if (!state.streak) state.streak = { current: 0, best: 0, lastDate: null };
  if (state.streak.lastDate === today) return false;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yStr = yesterday.toISOString().slice(0, 10);
  if (state.streak.lastDate === yStr) {
    state.streak.current += 1;
  } else {
    state.streak.current = 1;
  }
  if (state.streak.current > (state.streak.best || 0)) {
    state.streak.best = state.streak.current;
  }
  state.streak.lastDate = today;
  return true;
}
