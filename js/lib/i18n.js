// ==========================================================================
// LANGUAGE (VI / EN)
// The site is written in Vietnamese. In English mode a translation layer
// swaps UI text as it is rendered:
//   - exact UI strings and patterns from js/lib/i18n-en.js
//   - item / villager / place names from the data (Vietnamese name -> the
//     in-game English name stored in nameEn)
// Long descriptions, tips and guides stay Vietnamese. Anything inside
// [data-no-i18n] (player notes, names typed by players) is never touched.
// The language is read once at load; switching saves it and reloads.
// ==========================================================================

import { UI_EN, NAMES_EN, PATTERNS_EN } from './i18n-en.js';

const KEY = 'stardew_wiki_lang';
export const lang = (() => {
  try { return localStorage.getItem(KEY) === 'en' ? 'en' : 'vi'; } catch { return 'vi'; }
})();
export const isEn = lang === 'en';

export function setLang(next) {
  try { localStorage.setItem(KEY, next); } catch { /* storage blocked */ }
  // Come back to the same tab after the reload
  sessionStorage.setItem('stardew_wiki_tab', document.querySelector('.tab.is-active')?.dataset.tab || '');
  location.reload();
}

// Vietnamese name -> English, built from every dataset that carries nameEn
const NAMES = new Map();
const LOWER = new Map();   // same, keyed in lower case ("Trà xanh" vs "Trà Xanh")
const VI = /[^\x00-\x7F]/;
// "Tên Việt (English Name)" with the English part in brackets
const PAREN = /^(.+?)\s*\(([A-Za-z0-9' .,&:!?-]+)\)$/;
export function registerNames(data) {
  const seen = new Set();
  const walk = (v) => {
    if (!v || typeof v !== 'object' || seen.has(v)) return;
    seen.add(v);
    if (Array.isArray(v)) { v.forEach(walk); return; }
    if (typeof v.name === 'string') {
      if (typeof v.nameEn === 'string') addName(v.name, v.nameEn);
      else { const m = v.name.match(PAREN); if (m && VI.test(m[1])) addName(m[1], m[2]); }
    }
    Object.values(v).forEach(walk);
  };
  walk(data);
}

function addName(name, nameEn) {
  const vi = name.trim();
  const en = nameEn.trim();
  if (!vi || !en) return;
  if (!NAMES.has(vi)) NAMES.set(vi, en);
  if (!LOWER.has(vi.toLowerCase())) LOWER.set(vi.toLowerCase(), en);
  // "Tên Việt (English)" -> also register the bare Vietnamese part
  const bare = vi.replace(/\s*\([^)]*\)\s*$/, '').trim();
  if (bare && bare !== vi && !NAMES.has(bare)) NAMES.set(bare, en);
  if (bare && !LOWER.has(bare.toLowerCase())) LOWER.set(bare.toLowerCase(), en);
}

// Strings written in code: t('Vietnamese text') returns English in EN mode
export function t(vi) {
  return isEn ? translate(vi) ?? vi : vi;
}

// Name of a data object in the current language
export function nm(obj) {
  if (!obj) return '';
  return isEn && obj.nameEn ? obj.nameEn : obj.name;
}

// The second name shown under a title: English in Vietnamese mode, and the
// Vietnamese name in English mode (kept as-is, handy for Vietnamese players)
export function altName(obj) {
  if (!obj) return '';
  if (!isEn) return obj.nameEn || '';
  const vi = String(obj.name || '').replace(/\s*\([^)]*\)\s*$/, '').trim();
  return vi && vi !== obj.nameEn ? `<span data-no-i18n lang="vi">${vi}</span>` : '';
}

function translate(text) {
  // HTML source line breaks inside a sentence count as single spaces
  const s = text.trim().replace(/\s+/g, ' ');
  if (!s) return null;
  if (UI_EN[s] !== undefined) return UI_EN[s];
  const name = lookupName(s);
  if (name) return name;
  // "Tên Việt (English)" -> English, keeping a trailing ":" or " x5"
  const tail = s.match(/^(.*?)((?::| x\d+))$/);
  if (tail && tail[1]) {
    const head = lookupName(tail[1]) ?? parenEnglish(tail[1]);
    if (head) return head + tail[2];
  }
  const paren = parenEnglish(s);
  if (paren) return paren;
  for (const [re, rep] of PATTERNS_EN) {
    if (re.test(s)) return s.replace(re, typeof rep === 'function' ? (...m) => rep(...m, sub) : rep);
  }
  // "Hạt sồi Acorn", "Quán rượu The Stardrop Saloon": a short Vietnamese
  // label followed by the English name -> the English name
  const emb = s.match(/^((?:\S+\s){1,3}?)((?:The |[A-Z])[A-Za-z0-9' .&:-]*)$/);
  if (emb && VI.test(emb[1])) return emb[2];
  // "A • B": translate each part
  if (s.includes(' • ')) {
    const parts = s.split(' • ');
    const out = parts.map(p => translate(p) ?? p);
    if (out.some((p, i) => p !== parts[i])) return out.join(' • ');
  }
  return null;
}

function lookupName(s) {
  return NAMES.get(s) ?? NAMES_EN[s] ?? LOWER.get(s.toLowerCase()) ?? null;
}

function parenEnglish(s) {
  const m = s.match(PAREN);
  return m && VI.test(m[1]) ? m[2] : null;
}

// Nested lookups for patterns ("Ngày 6 (Thứ Bảy)" -> "Day 6 (Saturday)")
function sub(vi) { return translate(vi) ?? vi; }

function translateTextNode(node) {
  const raw = node.textContent;
  const s = raw.trim();
  // Skip plain ASCII unless it is a known Vietnamese word ("Thu", "Nho", "Cua")
  if (!s || (!VI.test(s) && UI_EN[s] === undefined && !NAMES.has(s) && NAMES_EN[s] === undefined)) return;
  const en = translate(s);
  if (en != null && en !== s) node.textContent = raw.replace(s, en);
}

const ATTRS = ['placeholder', 'title', 'aria-label'];

function translateElementAttrs(el) {
  for (const a of ATTRS) {
    const v = el.getAttribute?.(a);
    if (v && VI.test(v)) {
      const en = translate(v);
      if (en != null) el.setAttribute(a, en);
    }
  }
}

// Text inside a textarea is what the player typed; its placeholder is ours
function skip(node) {
  const el = node.nodeType === 1 ? node : node.parentElement;
  return !el || el.closest('[data-no-i18n], script, style, textarea');
}
const skipAttrs = el => !!el.closest('[data-no-i18n]');

function translateTree(root) {
  if (root.nodeType === 3) { if (!skip(root)) translateTextNode(root); return; }
  if (root.nodeType !== 1 || skipAttrs(root)) return;
  translateElementAttrs(root);
  root.querySelectorAll('[placeholder],[title],[aria-label]').forEach(el => { if (!skipAttrs(el)) translateElementAttrs(el); });
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  while (w.nextNode()) if (!skip(w.currentNode)) translateTextNode(w.currentNode);
}

// English mode: translate the page now and everything rendered later
export function startTranslating() {
  document.documentElement.lang = lang;
  if (!isEn) return;
  document.title = UI_EN[document.title] ?? document.title;
  translateTree(document.body);
  new MutationObserver(records => {
    for (const r of records) {
      if (r.type === 'childList') r.addedNodes.forEach(translateTree);
      else if (r.type === 'characterData') { if (!skip(r.target)) translateTextNode(r.target); }
      else if (r.type === 'attributes' && !skipAttrs(r.target)) translateElementAttrs(r.target);
    }
  }).observe(document.body, {
    childList: true, subtree: true, characterData: true,
    attributes: true, attributeFilter: ATTRS
  });
}
