/* =========================================================
   UI — renderiza sidebar, lição, exercícios, conquistas
   ========================================================= */

const UI = (() => {

  const $ = sel => document.querySelector(sel);
  const $$ = sel => Array.from(document.querySelectorAll(sel));

  // Track CodeMirror instances by editor textarea node
  const editorInstances = new WeakMap();

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({
      '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
    }[c]));
  }

  function toast(msg, type = '') {
    let t = document.getElementById('toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'toast';
      t.className = 'toast';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.className = 'toast show ' + type;
    clearTimeout(t._timer);
    t._timer = setTimeout(() => { t.className = 'toast'; }, 2800);
  }

  // ============= TOPBAR =============
  function updateTopbar() {
    const { done, total } = Progress.overallProgress();
    $('#progress-text').textContent = `${done} / ${total} aulas concluídas`;
    $('#progress-fill').style.width = total > 0 ? `${(done / total) * 100}%` : '0%';
    updateAchievementCounter();
    updateStreakBadge();
  }

  function updateAchievementCounter() {
    const state = Progress.get();
    const unlocked = (state.unlockedAchievements || []).length;
    const total = ACHIEVEMENTS.length;
    const el = $('#ach-counter');
    if (el) el.textContent = `${unlocked}/${total}`;
  }

  function updateStreakBadge() {
    const state = Progress.get();
    const count = state.streak?.current || 0;
    const badge = $('#streak-badge');
    if (!badge) return;
    if (count >= 2) {
      badge.hidden = false;
      $('#streak-count').textContent = count;
    } else {
      badge.hidden = true;
    }
  }

  // ============= SIDEBAR =============
  function renderSidebar(activeId) {
    const html = CURRICULUM.map(module => {
      const lessonsHtml = module.lessons.map(lesson => {
        const isDone = Progress.isLessonComplete(lesson);
        const isActive = lesson.id === activeId;
        const cls = ['lesson-item', isDone ? 'done' : '', isActive ? 'active' : ''].join(' ').trim();
        return `
          <div class="${cls}" data-lesson-id="${lesson.id}">
            <span class="lesson-status">${isDone ? '✓' : ''}</span>
            <span class="lesson-id">${lesson.id}</span>
            <span class="lesson-name">${escapeHtml(lesson.title)}</span>
          </div>
        `;
      }).join('');
      return `
        <div class="module">
          <div class="module-title">${escapeHtml(module.title)}</div>
          ${lessonsHtml}
        </div>
      `;
    }).join('');

    $('#sidebar').innerHTML = html;

    $$('.lesson-item').forEach(el => {
      el.addEventListener('click', () => {
        const id = el.dataset.lessonId;
        renderLesson(id);
      });
    });
  }

  // ============= LESSON =============
  function renderLesson(lessonId) {
    const found = findLesson(lessonId);
    if (!found) return;
    const { module, lesson } = found;
    const { prev, next } = adjacentLessons(lessonId);

    Progress.setCurrentLesson(lessonId);

    const exercisesHtml = lesson.exercises.length === 0
      ? ''
      : `
        <div class="exercises-section">
          <h2 class="exercises-heading">
            Exercícios <span class="exercises-count">${lesson.exercises.length} exercício(s)</span>
          </h2>
          ${lesson.exercises.map((ex, idx) => renderExerciseCard(lesson, ex, idx)).join('')}
        </div>
      `;

    const allDone = Progress.isLessonComplete(lesson);
    const completeBanner = (allDone && lesson.exercises.length > 0)
      ? `<div class="lesson-complete-banner">Aula concluída! Você dominou: <strong>${escapeHtml(lesson.title)}</strong></div>`
      : '';

    const footerHtml = `
      <div class="lesson-footer">
        <button class="btn-secondary" id="btn-prev-lesson" ${prev ? '' : 'disabled'}>
          ${prev ? '← ' + prev.id + ' ' + escapeHtml(prev.title) : '← Início'}
        </button>
        <button class="btn-primary" id="btn-next-lesson" ${next ? '' : 'disabled'}>
          ${next ? escapeHtml(next.title) + ' ' + next.id + ' →' : 'Fim do curso'}
        </button>
      </div>
    `;

    $('#content').innerHTML = `
      <div class="content-wrap">
        <div class="lesson-header">
          <div class="lesson-breadcrumb">${escapeHtml(module.title)} • Aula ${lesson.id}</div>
          <h1 class="lesson-title">${escapeHtml(lesson.title)}</h1>
        </div>
        <div class="theory">${lesson.theory}</div>
        ${exercisesHtml}
        ${completeBanner}
        ${renderSchemaPanel(lesson)}
        ${footerHtml}
      </div>
    `;

    // Bind exercise controls (and instantiate CodeMirror for each editor)
    lesson.exercises.forEach((ex, idx) => bindExercise(lesson, ex, idx));

    // Decorate glossary terms in the rendered content
    decorateGlossaryTerms(document.getElementById('content'));

    // Footer nav
    if (prev) $('#btn-prev-lesson').addEventListener('click', () => {
      renderLesson(prev.id);
      $('#content').scrollTop = 0;
    });
    if (next) $('#btn-next-lesson').addEventListener('click', () => {
      renderLesson(next.id);
      $('#content').scrollTop = 0;
    });

    renderSidebar(lessonId);
    updateTopbar();
  }

  function renderExerciseCard(lesson, ex, idx) {
    const isDone = Progress.isExerciseDone(lesson.id, idx);
    const solutionRevealed = Progress.isSolutionRevealed(lesson.id, idx);
    const initialValue = isDone ? ex.solution : '';

    return `
      <div class="exercise ${isDone ? 'done' : ''}" data-ex-idx="${idx}">
        <div class="exercise-head">
          <div class="exercise-num">${isDone ? '✓' : (idx + 1)}</div>
          <div class="exercise-prompt">${ex.prompt}</div>
        </div>
        <div class="exercise-body">
          <div class="editor-wrap">
            <div class="editor-header">
              <span>SQL</span>
              <span class="ex-shortcut">Ctrl+Enter = Verificar</span>
            </div>
            <textarea class="sql-editor" data-ex-idx="${idx}" data-lesson-id="${lesson.id}" spellcheck="false">${escapeHtml(initialValue)}</textarea>
          </div>
          <div class="exercise-controls">
            <button class="btn-primary btn-sm btn-verify" data-ex-idx="${idx}">Verificar</button>
            <button class="btn-secondary btn-sm btn-hint" data-ex-idx="${idx}">Ver dica</button>
            <button class="btn-ghost btn-sm btn-show-solution" data-ex-idx="${idx}">
              ${solutionRevealed ? 'Esconder solução' : 'Mostrar solução'}
            </button>
          </div>
          <div class="exercise-feedback" id="feedback-${lesson.id}-${idx}"></div>
          <div class="exercise-result" id="result-${lesson.id}-${idx}"></div>
        </div>
      </div>
    `;
  }

  function bindExercise(lesson, ex, idx) {
    const cardSel = `.exercise[data-ex-idx="${idx}"]`;
    const textarea = document.querySelector(`${cardSel} .sql-editor`);
    const verifyBtn = document.querySelector(`${cardSel} .btn-verify`);
    const hintBtn = document.querySelector(`${cardSel} .btn-hint`);
    const solBtn = document.querySelector(`${cardSel} .btn-show-solution`);
    const feedback = document.getElementById(`feedback-${lesson.id}-${idx}`);
    const resultEl = document.getElementById(`result-${lesson.id}-${idx}`);

    // Replace textarea with CodeMirror
    let editor;
    if (typeof CodeMirror !== 'undefined') {
      editor = CodeMirror.fromTextArea(textarea, {
        mode: 'text/x-sqlite',
        lineNumbers: false,
        matchBrackets: true,
        indentUnit: 2,
        smartIndent: true,
        autofocus: false,
        viewportMargin: Infinity,
        extraKeys: {
          'Ctrl-Enter': () => verifyBtn && verifyBtn.click(),
          'Cmd-Enter':  () => verifyBtn && verifyBtn.click()
        }
      });
      editorInstances.set(textarea, editor);
    }

    function getValue() {
      return editor ? editor.getValue() : textarea.value;
    }

    if (verifyBtn) {
      verifyBtn.addEventListener('click', () => {
        const query = getValue().trim();
        if (!query) {
          toast('Escreva uma query primeiro.', '');
          return;
        }
        Progress.bumpStat('totalQueries');

        let result;
        try {
          result = SqlEngine.run(query);
          Progress.bumpStat('successfulQueries');
        } catch (e) {
          feedback.className = 'exercise-feedback show error';
          feedback.innerHTML = `<strong>Erro de sintaxe:</strong> ${escapeHtml(e.message)}`;
          resultEl.innerHTML = '';
          checkNewAchievements();
          return;
        }

        renderResultTable(result, resultEl);

        const v = validateResult(result, ex.expected);
        if (v.ok) {
          feedback.className = 'exercise-feedback show success';
          feedback.innerHTML = `✓ <strong>Correto!</strong> ${v.reason}`;
          Progress.markExerciseDone(lesson.id, idx);
          updateTopbar();
          renderSidebar(lesson.id);
          const card = textarea.closest('.exercise');
          if (card) {
            card.classList.add('done');
            const num = card.querySelector('.exercise-num');
            if (num) num.textContent = '✓';
          }
          checkNewAchievements();

          // If this completed the lesson, show banner injected at the bottom of content
          if (Progress.isLessonComplete(lesson) && !document.querySelector('.lesson-complete-banner')) {
            const banner = document.createElement('div');
            banner.className = 'lesson-complete-banner';
            banner.innerHTML = `Aula concluída! Você dominou: <strong>${escapeHtml(lesson.title)}</strong>`;
            const schemaPanel = document.querySelector('.schema-panel');
            if (schemaPanel) schemaPanel.before(banner);
          }
        } else {
          feedback.className = 'exercise-feedback show error';
          feedback.innerHTML = `✗ <strong>Não bateu:</strong> ${escapeHtml(v.reason)}`;
        }
      });
    }

    if (hintBtn) {
      hintBtn.addEventListener('click', () => {
        feedback.className = 'exercise-feedback show';
        feedback.style.background = 'var(--surface-2)';
        feedback.style.borderColor = 'var(--border-lt)';
        feedback.style.color = 'var(--text-dim)';
        feedback.innerHTML = `<strong>💡 Dica:</strong> ${escapeHtml(ex.hint || 'Sem dica disponível.')}`;
      });
    }

    if (solBtn) {
      solBtn.addEventListener('click', () => {
        const card = solBtn.closest('.exercise');
        const existing = card.querySelector('.solution-reveal');
        if (existing) {
          existing.remove();
          solBtn.textContent = 'Mostrar solução';
          return;
        }
        Progress.markSolutionRevealed(lesson.id, idx);
        const div = document.createElement('div');
        div.className = 'solution-reveal';
        div.innerHTML = `<div class="solution-label">Solução</div>${escapeHtml(ex.solution)}`;
        card.querySelector('.exercise-body').appendChild(div);
        solBtn.textContent = 'Esconder solução';
      });
    }
  }

  function renderResultTable(result, container) {
    if (!result || !result.columns || result.columns.length === 0) {
      container.innerHTML = '<div class="result-meta">— sem resultado —</div>';
      return;
    }
    const ths = result.columns.map(c => `<th>${escapeHtml(c)}</th>`).join('');
    const trs = result.values.map(row =>
      '<tr>' + row.map(v =>
        `<td>${v === null ? '<em style="color:#64748b">NULL</em>' : escapeHtml(String(v))}</td>`
      ).join('') + '</tr>'
    ).join('');
    container.innerHTML = `
      <div class="result-meta">${result.values.length} linha(s) × ${result.columns.length} coluna(s)</div>
      <table>
        <thead><tr>${ths}</tr></thead>
        <tbody>${trs}</tbody>
      </table>
    `;
  }

  function renderSchemaPanel(lesson) {
    const filter = lesson && lesson.tabelas ? lesson.tabelas : ['filmes'];
    const schema = SqlEngine.getSchema(filter);
    const tables = Object.entries(schema).map(([name, cols]) => {
      const colsHtml = cols.map(c =>
        `<div><span>${escapeHtml(c.name)}</span><span class="type">${escapeHtml(c.type)}</span></div>`
      ).join('');
      return `
        <div class="schema-table">
          <div class="schema-tname">${escapeHtml(name)}</div>
          <div class="schema-cols">${colsHtml}</div>
        </div>
      `;
    }).join('');
    return `
      <div class="schema-panel">
        <div class="schema-panel-title">Schema disponível</div>
        ${tables}
      </div>
    `;
  }

  // ============= ACHIEVEMENTS =============
  function checkNewAchievements() {
    const newly = Progress.checkAndUnlockAchievements();
    if (newly.length > 0) {
      // Show a sequential toast for each (slight stagger)
      newly.forEach((a, i) => {
        setTimeout(() => {
          toast(`${a.icon} Conquista: ${a.name}`, 'achievement');
        }, i * 600);
      });
      updateAchievementCounter();
    }
  }

  function renderAchievementsModal() {
    const state = Progress.get();
    const html = ACHIEVEMENTS.map(a => {
      const unlocked = (state.unlockedAchievements || []).includes(a.id);
      return `
        <div class="ach-card ${unlocked ? 'unlocked' : 'locked'}">
          <div class="ach-icon">${a.icon}</div>
          <div class="ach-content">
            <div class="ach-name">${escapeHtml(a.name)}</div>
            <div class="ach-desc">${escapeHtml(a.description)}</div>
            <div class="ach-status">${unlocked ? '✓ Desbloqueada' : 'Bloqueada'}</div>
          </div>
        </div>
      `;
    }).join('');
    $('#ach-grid').innerHTML = html;
  }

  function openAchievements() {
    renderAchievementsModal();
    $('#modal-achievements').hidden = false;
  }
  function closeAchievements() {
    $('#modal-achievements').hidden = true;
  }
  function isAchievementsOpen() {
    return !$('#modal-achievements').hidden;
  }

  // ============= GLOSSARY TERM DECORATION =============
  function decorateGlossaryTerms(rootEl) {
    if (!rootEl) return;
    const codes = rootEl.querySelectorAll('code');
    codes.forEach(code => {
      if (code.closest('pre')) return;
      if (code.classList.contains('term')) return;
      const text = code.textContent;
      const entry = findGlossaryTerm(text);
      if (!entry) return;
      code.classList.add('term');
      code.dataset.term = entry.term;
      code.addEventListener('mouseenter', e => showTermTooltip(code, entry));
      code.addEventListener('mouseleave', e => scheduleHideTooltip());
      code.addEventListener('click', e => {
        e.preventDefault();
        openEncyclopedia(entry.term);
      });
    });
  }

  let tooltipTimer = null;
  function showTermTooltip(el, entry) {
    cancelHideTooltip();
    const tip = document.getElementById('term-tooltip');
    if (!tip) return;
    tip.innerHTML = `
      <div class="tt-category">${escapeHtml(entry.category)}</div>
      <div class="tt-term">${escapeHtml(entry.term)}</div>
      <div class="tt-short">${escapeHtml(entry.short)}</div>
      <span class="tt-more" data-term="${escapeHtml(entry.term)}">Ver na enciclopédia →</span>
    `;
    const rect = el.getBoundingClientRect();
    tip.hidden = false;
    const tipRect = tip.getBoundingClientRect();
    let left = rect.left;
    if (left + tipRect.width > window.innerWidth - 16) {
      left = window.innerWidth - tipRect.width - 16;
    }
    let top = rect.bottom + 6;
    if (top + tipRect.height > window.innerHeight - 16) {
      top = rect.top - tipRect.height - 6;
    }
    tip.style.left = Math.max(8, left) + 'px';
    tip.style.top = Math.max(8, top) + 'px';
    tip.querySelector('.tt-more').addEventListener('click', e => {
      e.stopPropagation();
      hideTooltipImmediate();
      openEncyclopedia(entry.term);
    });
    tip.addEventListener('mouseenter', cancelHideTooltip, { once: true });
    tip.addEventListener('mouseleave', scheduleHideTooltip, { once: true });
  }
  function scheduleHideTooltip() {
    cancelHideTooltip();
    tooltipTimer = setTimeout(hideTooltipImmediate, 200);
  }
  function cancelHideTooltip() {
    if (tooltipTimer) clearTimeout(tooltipTimer);
    tooltipTimer = null;
  }
  function hideTooltipImmediate() {
    const tip = document.getElementById('term-tooltip');
    if (tip) tip.hidden = true;
  }

  // ============= ENCYCLOPEDIA MODAL =============
  let encState = { query: '', category: '', activeTerm: null };

  function openEncyclopedia(focusTerm) {
    const modal = document.getElementById('modal-encyclopedia');
    modal.hidden = false;
    encState.activeTerm = focusTerm || encState.activeTerm;
    renderEncCategories();
    renderEncList();
    if (encState.activeTerm) renderEncDetail(encState.activeTerm);
    setTimeout(() => document.getElementById('enc-search').focus(), 50);
  }
  function closeEncyclopedia() {
    document.getElementById('modal-encyclopedia').hidden = true;
  }
  function isEncyclopediaOpen() {
    return !document.getElementById('modal-encyclopedia').hidden;
  }

  function renderEncCategories() {
    const wrap = document.getElementById('enc-categories');
    const cats = [''].concat(GLOSSARY_CATEGORIES);
    wrap.innerHTML = cats.map(c => `
      <span class="enc-cat-pill ${encState.category === c ? 'active' : ''}" data-cat="${escapeHtml(c)}">
        ${c ? escapeHtml(c) : 'Todos'}
      </span>
    `).join('');
    wrap.querySelectorAll('.enc-cat-pill').forEach(el => {
      el.addEventListener('click', () => {
        encState.category = el.dataset.cat;
        renderEncCategories();
        renderEncList();
      });
    });
  }

  function renderEncList() {
    const list = document.getElementById('enc-list');
    const entries = searchGlossary(encState.query, encState.category);
    if (entries.length === 0) {
      list.innerHTML = '<div class="enc-empty-list">Nenhum termo encontrado.</div>';
      return;
    }
    list.innerHTML = entries.map(e => `
      <div class="enc-list-item ${encState.activeTerm === e.term ? 'active' : ''}" data-term="${escapeHtml(e.term)}">
        <span class="enc-list-term">${escapeHtml(e.term)}</span>
        <span class="enc-list-cat">${escapeHtml(e.category)}</span>
      </div>
    `).join('');
    list.querySelectorAll('.enc-list-item').forEach(el => {
      el.addEventListener('click', () => {
        encState.activeTerm = el.dataset.term;
        renderEncList();
        renderEncDetail(encState.activeTerm);
      });
    });
  }

  function renderEncDetail(termName) {
    const detail = document.getElementById('enc-detail');
    const entry = GLOSSARY[termName] || findGlossaryTerm(termName);
    if (!entry) {
      detail.innerHTML = '<div class="empty-state">Termo não encontrado.</div>';
      return;
    }
    encState.activeTerm = entry.term;
    const sections = [];
    sections.push(`
      <div class="enc-detail-header">
        <div class="enc-detail-category">${escapeHtml(entry.category)}</div>
        <div class="enc-detail-term">${escapeHtml(entry.term)}</div>
      </div>
    `);
    sections.push(`
      <div class="enc-section">
        <div class="enc-section-label">Resumo</div>
        <div class="enc-section-body">${escapeHtml(entry.short)}</div>
      </div>
    `);
    if (entry.long) {
      sections.push(`
        <div class="enc-section">
          <div class="enc-section-label">Explicação</div>
          <div class="enc-section-body">${escapeHtml(entry.long)}</div>
        </div>
      `);
    }
    if (entry.syntax) {
      sections.push(`
        <div class="enc-section">
          <div class="enc-section-label">Sintaxe</div>
          <div class="enc-syntax">${escapeHtml(entry.syntax)}</div>
        </div>
      `);
    }
    if (entry.example) {
      sections.push(`
        <div class="enc-section">
          <div class="enc-section-label">Exemplo</div>
          <div class="enc-example">${escapeHtml(entry.example)}</div>
          ${entry.exampleDesc ? `<div class="enc-example-desc">${escapeHtml(entry.exampleDesc)}</div>` : ''}
        </div>
      `);
    }
    if (entry.seeAlso && entry.seeAlso.length > 0) {
      sections.push(`
        <div class="enc-section">
          <div class="enc-section-label">Ver também</div>
          <div class="enc-related">
            ${entry.seeAlso.map(s => `<span class="enc-related-pill" data-related="${escapeHtml(s)}">${escapeHtml(s)}</span>`).join('')}
          </div>
        </div>
      `);
    }
    detail.innerHTML = sections.join('');
    document.querySelectorAll('.enc-list-item').forEach(el => {
      el.classList.toggle('active', el.dataset.term === entry.term);
    });
    detail.querySelectorAll('.enc-related-pill').forEach(el => {
      el.addEventListener('click', () => {
        const t = el.dataset.related;
        renderEncDetail(t);
        detail.scrollTop = 0;
      });
    });
  }

  function setEncSearch(query) {
    encState.query = query;
    renderEncList();
  }

  return {
    $, $$, escapeHtml, toast,
    updateTopbar, renderSidebar, renderLesson,
    decorateGlossaryTerms,
    openEncyclopedia, closeEncyclopedia, isEncyclopediaOpen,
    renderEncList, setEncSearch, hideTooltipImmediate,
    openAchievements, closeAchievements, isAchievementsOpen,
    checkNewAchievements, updateAchievementCounter, updateStreakBadge
  };
})();
