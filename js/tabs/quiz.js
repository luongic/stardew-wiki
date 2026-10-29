// ==========================================================================
// TAB: ĐỐ VUI TRÍ NHỚ (MEMORY QUIZ)
// A name is shown; pick its picture among three. Wrong answers come from the
// same group (fish vs fish, gems vs gems, bachelorettes vs bachelorettes) so
// players must really know the art. Questions are random and endless.
// ==========================================================================

import { NPCS_DATA } from '../../data/npcs-data.js';
import { ITEMS_DATA } from '../../data/items-data.js';
import { RECIPES_DATA } from '../../data/recipes-data.js';
import { MUSEUM_ITEMS } from '../../data/museum-data.js';
import { MINE_AREAS } from '../../data/mines-data.js';
import { ico } from '../lib/icons.js';

const NEXT_DELAY_MS = 1100;

// Names like "Slime Xanh (Green Slime)" show without the English part
const clean = name => String(name).replace(/\s*\([^)]*\)\s*$/, '').trim();

const monsters = (() => {
  const seen = new Map();
  MINE_AREAS.forEach(a => a.zones.forEach(z => (z.monsters || []).forEach(m => {
    if (m.icon && !seen.has(m.nameEn)) seen.set(m.nameEn, m);
  })));
  return [...seen.values()];
})();

// Each entry: { key, name, nameEn, img, group }; group drives the distractors
const TOPICS = [
  { id: 'villagers', name: 'Dân làng', icon: 'npcs', prompt: 'Ai là',
    pool: () => NPCS_DATA.map(n => ({ key: n.id, name: n.name, nameEn: n.nameEn, img: n.avatar, group: n.category })) },
  { id: 'fish', name: 'Cá', icon: 'fish', prompt: 'Đâu là',
    pool: () => ITEMS_DATA.filter(i => i.category === 'fish')
      .map(i => ({ key: i.id, name: clean(i.name), nameEn: i.nameEn, img: i.imageUrl, group: i.subCategory })) },
  { id: 'crops', name: 'Nông sản & Trái cây', icon: 'crops', prompt: 'Đâu là',
    pool: () => ITEMS_DATA.filter(i => ['crops', 'fruits', 'forage'].includes(i.category))
      .map(i => ({ key: i.id, name: clean(i.name), nameEn: i.nameEn, img: i.imageUrl, group: i.category })) },
  { id: 'dishes', name: 'Món ăn', icon: 'cooking', prompt: 'Đâu là món',
    pool: () => RECIPES_DATA.filter(r => r.category === 'cooking')
      .map(r => ({ key: r.id, name: clean(r.name), nameEn: r.nameEn, img: r.imageUrl, group: r.subCategory })) },
  { id: 'museum', name: 'Bảo tàng', icon: 'museum', prompt: 'Đâu là',
    pool: () => MUSEUM_ITEMS.map(m => ({ key: m.id, name: clean(m.name), nameEn: m.nameEn, img: m.icon, group: m.group })) },
  { id: 'monsters', name: 'Quái vật', icon: 'skull', prompt: 'Đâu là',
    pool: () => monsters.map(m => ({ key: m.nameEn, name: clean(m.name), nameEn: m.nameEn, img: `assets/icons/${m.icon}.png`, group: 'monster' })) },
  { id: 'mix', name: 'Tổng hợp', icon: 'sparkle', prompt: 'Đâu là', pool: null }
];
const topicById = new Map(TOPICS.map(t => [t.id, t]));

const pools = new Map();
function poolOf(topic) {
  if (!pools.has(topic.id)) {
    const list = topic.pool
      ? topic.pool()
      : TOPICS.filter(t => t.pool).flatMap(t => t.pool().map(e => ({ ...e, group: `${t.id}:${e.group}` })));
    // One entry per picture, so two options can never look identical
    const byImg = new Map();
    for (const e of list) if (e.img && !byImg.has(e.img)) byImg.set(e.img, e);
    pools.set(topic.id, [...byImg.values()]);
  }
  return pools.get(topic.id);
}

const shuffle = arr => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// Two distractors: same group first, topped up from anywhere in the topic
function makeQuestion(pool, answer) {
  const others = pool.filter(e => e.key !== answer.key && e.name !== answer.name);
  const same = shuffle(others.filter(e => e.group === answer.group));
  const rest = shuffle(others.filter(e => e.group !== answer.group));
  const wrong = [...same, ...rest].slice(0, 2);
  return { answer, options: shuffle([answer, ...wrong]) };
}

// ==========================================
// GAME STATE
// Endless: every question is generated at random on the spot. Nothing is
// stored; the counters live only for the current topic and session.
// ==========================================
const game = {
  topic: TOPICS[0],
  question: null,
  picked: null,     // index of the option chosen for the current question
  correct: 0,
  answered: 0,
  streak: 0,
  recent: [],       // recent answer keys, so the same thing doesn't come back soon
  timer: null
};

function nextQuestion() {
  const pool = poolOf(game.topic);
  // Avoid the last third of the pool (at most 20) before repeating an answer
  const memory = Math.min(20, Math.floor(pool.length / 3));
  const fresh = pool.filter(e => !game.recent.includes(e.key));
  const answer = fresh[Math.floor(Math.random() * fresh.length)] || pool[0];
  game.recent = [...game.recent, answer.key].slice(-memory);
  game.question = makeQuestion(pool, answer);
  game.picked = null;
}

function startTopic(topic) {
  clearTimeout(game.timer);
  game.topic = topic;
  game.correct = 0;
  game.answered = 0;
  game.streak = 0;
  game.recent = [];
  nextQuestion();
}

// ==========================================
// RENDERING
// ==========================================
function statsHtml() {
  return `
    <div class="quiz-stats">
      <span>${ico(game.topic.icon)} <strong>${game.topic.name}</strong></span>
      <span>${ico('check')} Đúng <strong>${game.correct}/${game.answered}</strong></span>
      <span>${ico('sparkle')} Chuỗi <strong>${game.streak}</strong></span>
    </div>`;
}

function questionHtml() {
  const q = game.question;
  const done = game.picked !== null;
  return `
    <div class="quiz-q">
      <div class="quiz-q__prompt">${game.topic.prompt}</div>
      <div class="quiz-q__name">${q.answer.name}</div>
      <div class="quiz-q__en">${done ? q.answer.nameEn : '&nbsp;'}</div>
    </div>
    <div class="quiz-options">
      ${q.options.map((o, i) => {
        let state = '';
        if (done && o.key === q.answer.key) state = 'is-right';
        else if (done && i === game.picked) state = 'is-wrong';
        return `
          <button class="quiz-option ${state}" type="button" data-action="quiz-pick" data-i="${i}" ${done ? 'disabled' : ''}
                  aria-label="Lựa chọn ${i + 1}${done ? `: ${o.name}` : ''}">
            <span class="quiz-option__key">${i + 1}</span>
            <img src="${o.img}" alt="" class="pixel-img">
            <span class="quiz-option__name">${done ? o.name : ''}</span>
          </button>`;
      }).join('')}
    </div>
    <div class="quiz-feedback" aria-live="polite">${feedback(q)}</div>`;
}

function feedback(q) {
  if (game.picked === null) return '<span class="muted">Chọn hình đúng (bấm hoặc phím 1, 2, 3)</span>';
  const right = q.options[game.picked].key === q.answer.key;
  return right
    ? `${ico('check')} Chính xác!${game.streak >= 3 ? ` ${game.streak} câu đúng liên tiếp!` : ''}`
    : `${ico('hated')} Chưa đúng: đây là <strong>${q.options[game.picked].name}</strong>.`;
}

function paint() {
  const el = document.getElementById('quizBoard');
  if (el) el.innerHTML = `${statsHtml()}${questionHtml()}`;
}

// ==========================================
// ANSWERING
// ==========================================
function pick(app, i) {
  const q = game.question;
  if (game.picked !== null || !q.options[i]) return;
  game.picked = i;
  game.answered++;
  if (q.options[i].key === q.answer.key) {
    game.correct++;
    game.streak++;
    app.sfx.play('complete');
  } else {
    game.streak = 0;
    app.sfx.play('uncheck');
  }
  paint();
  game.timer = setTimeout(() => { nextQuestion(); paint(); }, NEXT_DELAY_MS);
}

const quizTab = {
  id: 'quiz',
  toggles: [],

  init(app) {
    document.getElementById('quizChips').innerHTML = TOPICS.map(t =>
      `<button class="chip" type="button" data-action="filter" data-value="${t.id}">${ico(t.icon)} ${t.name}</button>`).join('');
    startTopic(TOPICS[0]);
    // 1/2/3 answer from the keyboard
    document.addEventListener('keydown', (e) => {
      if (app.currentTab !== 'quiz' || e.target.matches('input, textarea') || e.metaKey || e.ctrlKey) return;
      if (['1', '2', '3'].includes(e.key)) pick(app, Number(e.key) - 1);
    });
  },

  onLeave() {
    // Move on now rather than letting a pending timer repaint a hidden tab
    if (game.picked !== null) { clearTimeout(game.timer); nextQuestion(); }
  },

  render(app) {
    const topic = topicById.get(app.filters.quiz) || TOPICS[0];
    document.querySelectorAll('[data-filter-group="quiz"] [data-action="filter"]').forEach(b => {
      b.classList.toggle('is-active', b.dataset.value === topic.id);
    });
    if (topic !== game.topic) startTopic(topic);
    paint();
  },

  actions: {
    'quiz-pick': (app, el) => pick(app, Number(el.dataset.i))
  }
};

export default quizTab;
