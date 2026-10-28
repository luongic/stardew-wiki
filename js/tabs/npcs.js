// ==========================================================================
// TAB: DÂN LÀNG & NPC + TRÌNH MÔ PHỎNG LỊCH TRÌNH
//
// Which schedule an NPC follows, highest priority first:
//   1. Town festival (non-passive): villagers stay home before a daytime
//      festival, attend during its hours, and go home afterwards. Special
//      NPCs (Krobus, Dwarf, Sandy, ...) skip festivals.
//   2. Rain: the rainy schedule beats day-of-week ones, which is the order
//      the game itself checks schedule keys in.
//   3. Day-of-week schedule (monday ... sunday).
//   4. Default sunny schedule.
// Winter has snow instead of rain, and snow uses the normal schedules.
// Town festival days are always sunny, so weather is locked to sun there.
// ==========================================================================

import { NPCS_DATA, CALENDAR_EVENTS } from '../../data/npcs-data.js';
import { emptyState, wikiLink, modalHeader, matches } from '../lib/templates.js';
import { ico } from '../lib/icons.js';

const npcById = new Map(NPCS_DATA.map(n => [n.id, n]));
const DAY_NAMES = ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chủ Nhật'];
const DAY_KEYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const PORTRAIT_FALLBACK = 'assets/portraits/abigail.png';

const CATEGORY_LABELS = {
  bachelorette: `${ico('bachelorette')} Độc Thân Nữ`,
  bachelor: `${ico('bachelor')} Độc Thân Nam`,
  town: `${ico('town')} Dân Làng Pelican`,
  special: `${ico('special')} Đặc Biệt`
};

const WEEKDAY_SCHEDULES = [
  { key: 'saturday', title: `${ico('fishing')} Lịch Trình Thứ Bảy (Cuối Tuần)` },
  { key: 'sunday', title: `${ico('sunny')} Lịch Trình Chủ Nhật` },
  { key: 'friday', title: `${ico('saloon')} Lịch Trình Tối Thứ Sáu (Saloon Night)` },
  { key: 'tuesday', title: `${ico('calendar')} Lịch Trình Thứ Ba (Lớp Aerobic / Bác Sĩ)` },
  { key: 'wednesday', title: `${ico('calendar')} Lịch Trình Thứ Tư (Tiệm Nghỉ / Thư Viện)` },
  { key: 'thursday', title: `${ico('calendar')} Lịch Trình Thứ Năm` },
  { key: 'monday', title: `${ico('calendar')} Lịch Trình Thứ Hai` }
];

// ==========================================
// PURE SCHEDULE LOGIC
// ==========================================

// "09:30 AM" -> 9.5. Times after midnight map to 24-26 so a day runs 6 -> 26.
export function parseScheduleTime(timeStr) {
  const match = timeStr?.trim().match(/(\d+):?(\d*)\s*(AM|PM)/i);
  if (!match) return 0;
  let hour = parseInt(match[1], 10);
  const min = match[2] ? parseInt(match[2], 10) / 60 : 0;
  const isPM = match[3].toUpperCase() === 'PM';
  if (isPM && hour < 12) hour += 12;
  if (!isPM && hour === 12) hour = 0;
  if (hour < 6) hour += 24;
  return hour + min;
}

export function formatSimHour(hour) {
  const whole = Math.floor(hour);
  const min = String(Math.round((hour - whole) * 60)).padStart(2, '0');
  let h12 = whole >= 24 ? whole - 24 : whole;
  const period = whole >= 12 && whole < 24 ? 'PM' : 'AM';
  if (h12 > 12) h12 -= 12;
  if (h12 === 0) h12 = 12;

  let phase = 'Đêm Muộn';
  if (hour < 12) phase = 'Buổi Sáng';
  else if (hour < 14) phase = 'Buổi Trưa';
  else if (hour < 18) phase = 'Buổi Chiều';
  else if (hour < 22) phase = 'Buổi Tối';

  return `${String(h12).padStart(2, '0')}:${min} ${period} (${phase})`;
}

const dayOfWeek = day => (day - 1) % 7;

export function townFestivalOn(season, day) {
  const evt = CALENDAR_EVENTS[season]?.[day];
  return evt?.type === 'festival' && !evt.passive ? evt : null;
}

function festivalWindow(evt) {
  const [start, end] = evt.time.split('-').map(parseScheduleTime);
  return { start, end };
}

const home = (npc, time, note) => ({
  time,
  location: `${note} (${npc.residence})`,
  locationShort: 'Nhà riêng'
});

export function getNpcLocation(npc, { hour, weather, season, day }) {
  const festival = townFestivalOn(season, day);
  if (festival && npc.category !== 'special') {
    const { start, end } = festivalWindow(festival);
    if (hour >= start && hour < end) {
      return {
        time: festival.time,
        location: `${ico(festival.icon || 'festival')} Đang tham dự ${festival.name} tại ${festival.loc}`,
        locationShort: festival.loc,
        festival: true
      };
    }
    if (hour >= end) return home(npc, 'Sau lễ hội', 'Về nhà nghỉ ngơi sau lễ hội');
    // Before a daytime festival the town is closed; night festivals keep the day normal
    if (start <= 12) return home(npc, 'Trước lễ hội', 'Ở nhà chuẩn bị đi lễ hội');
  }

  const s = npc.schedule;
  const dayKey = DAY_KEYS[dayOfWeek(day)];
  const list = (weather === 'rainy' && s.rainy?.length && s.rainy)
    || (s[dayKey]?.length && s[dayKey])
    || s.sunny
    || [];

  if (!list.length) {
    return { time: 'Cả ngày', location: s.overview || npc.residence, locationShort: npc.residence };
  }

  const parsed = list.map(item => ({ ...item, h: parseScheduleTime(item.time) })).sort((a, b) => a.h - b.h);
  if (hour < parsed[0].h) {
    return { time: 'Sáng sớm', location: `Ở tại phòng ngủ nghỉ ngơi (${npc.residence})`, locationShort: 'Phòng ngủ / Nhà riêng' };
  }
  const current = parsed.findLast(item => item.h <= hour);
  return {
    time: current.time,
    location: current.location,
    locationShort: current.locationShort || current.location
  };
}

// ==========================================
// SIMULATOR STATE
// ==========================================
const sim = {
  season: 'spring',
  weather: 'sunny', // what the user picked; see effectiveWeather()
  day: 6,
  hour: 12,
  timer: null
};

function effectiveWeather() {
  if (townFestivalOn(sim.season, sim.day)) return 'sunny';
  if (sim.season === 'winter' && sim.weather === 'rainy') return 'snowy';
  return sim.weather;
}

function simContext() {
  return { hour: sim.hour, weather: effectiveWeather(), season: sim.season, day: sim.day };
}

const birthdayText = npc => (npc.birthday ? `${npc.birthday.seasonText} Ngày ${npc.birthday.day}` : 'Không rõ');

function birthdaysOn(season, day) {
  return NPCS_DATA.filter(n => n.birthday?.season === season && n.birthday.day === day);
}

// ==========================================
// SIMULATOR CONTROLS RENDERING
// ==========================================
function renderSeasonButtons() {
  document.querySelectorAll('[data-action="sim-season"]').forEach(b => {
    b.classList.toggle('is-active', b.dataset.season === sim.season);
  });
}

function renderWeatherButtons() {
  const wrap = document.getElementById('simWeatherBtns');
  const locked = !!townFestivalOn(sim.season, sim.day);
  const current = effectiveWeather();
  const wet = sim.season === 'winter'
    ? { value: 'rainy', shown: 'snowy', label: `${ico('snowy')} Tuyết Rơi` }
    : { value: 'rainy', shown: 'rainy', label: `${ico('rainy')} Trời Mưa` };

  wrap.innerHTML = `
    <button class="seg-btn ${current === 'sunny' ? 'is-active' : ''}" type="button" data-action="sim-weather" data-weather="sunny">${ico('sunny')} Nắng Đẹp</button>
    <button class="seg-btn ${current === wet.shown ? 'is-active' : ''}" type="button" data-action="sim-weather" data-weather="${wet.value}"
            ${locked ? 'disabled title="Ngày lễ hội luôn luôn nắng"' : ''}>${wet.label}</button>`;
  document.getElementById('simWeatherNote').hidden = !locked;
}

function renderCalendar() {
  const grid = document.getElementById('stardewCalendarGrid');
  let html = '';
  for (let day = 1; day <= 28; day++) {
    const dow = DAY_NAMES[dayOfWeek(day)];
    const bdays = birthdaysOn(sim.season, day);
    const evt = CALENDAR_EVENTS[sim.season]?.[day];
    const fest = evt?.type === 'festival' ? evt : null;

    const tip = [`Ngày ${day} (${dow})`];
    if (bdays.length) tip.push(bdays.map(n => `Sinh nhật ${n.name}`).join(', '));
    if (fest) tip.push(fest.name);

    const cls = ['cal-cell'];
    if (day === sim.day) cls.push('is-active');
    if (bdays.length) cls.push('has-bday');
    if (fest) cls.push('has-fest');

    html += `
      <button class="${cls.join(' ')}" type="button" data-action="sim-day" data-day="${day}"
              title="${tip.join(' • ')}" aria-label="${tip.join(', ')}" aria-pressed="${day === sim.day}">
        <span class="cal-cell__num">${day}</span>
        ${bdays.map(n => `
          <span class="cal-cell__bday">
            <img src="${n.avatar}" alt="" class="pixel-img" loading="lazy">
            <span class="cal-cell__cake" aria-hidden="true">${ico('birthday')}</span>
          </span>`).join('')}
        ${fest ? `<span class="cal-cell__fest" aria-hidden="true">${ico(fest.icon || 'festival')}</span>` : ''}
      </button>`;
  }
  grid.innerHTML = html;
}

function renderDateDisplay() {
  document.getElementById('simDayTitle').textContent = `Ngày ${sim.day} (${DAY_NAMES[dayOfWeek(sim.day)]})`;
  document.getElementById('simWeekTag').textContent = `Tuần ${Math.ceil(sim.day / 7)}`;

  const banner = document.getElementById('simEventBanner');
  const evt = CALENDAR_EVENTS[sim.season]?.[sim.day];
  const bdays = birthdaysOn(sim.season, sim.day);
  let icon = '';
  let text = '';
  if (evt?.type === 'festival') {
    icon = evt.icon || 'festival';
    text = `${evt.name} - ${evt.time} (${evt.loc}) - ${evt.desc || ''}`;
    if (evt.passive) text += ' • Dân làng vẫn sinh hoạt theo lịch thường.';
  } else if (bdays.length) {
    icon = 'birthday';
    text = `Hôm nay là Sinh nhật ${bdays.map(n => n.name).join(' & ')}! (Tặng quà yêu thích x8 điểm tình bạn - 640 điểm)`;
  }
  banner.hidden = !text;
  document.getElementById('simEventIcon').innerHTML = icon ? ico(icon) : '';
  document.getElementById('simEventText').textContent = text;
}

function renderTime() {
  document.getElementById('simTimeSlider').value = sim.hour;
  document.getElementById('simTimeDisplay').textContent = formatSimHour(sim.hour);
  document.querySelectorAll('[data-action="sim-quick-time"]').forEach(b => {
    b.classList.toggle('is-active', Math.abs(parseFloat(b.dataset.time) - sim.hour) < 0.25);
  });
}

function stopPlay() {
  clearInterval(sim.timer);
  sim.timer = null;
  const btn = document.getElementById('simPlayBtn');
  btn.innerHTML = `${ico('play')} Chạy Tự Động`;
  btn.classList.remove('is-playing');
}

// ==========================================
// NPC CARDS
// ==========================================
function cardHtml(npc) {
  const loc = getNpcLocation(npc, simContext());
  const isBday = npc.birthday?.season === sim.season && npc.birthday.day === sim.day;
  return `
    <article class="card card--clickable npc-card" role="button" tabindex="0"
             data-action="open-detail" data-type="npc" data-id="${npc.id}">
      <header class="card__head">
        <div class="card__title-row">
          <div class="portrait"><img src="${npc.avatar}" alt="${npc.name}" class="pixel-img" data-fallback="${PORTRAIT_FALLBACK}" loading="lazy"></div>
          <div>
            <h3 class="card__title card__title--lg">${npc.name}</h3>
            <div class="card__sub">${npc.nameEn} <span class="tag">${CATEGORY_LABELS[npc.category] || npc.categoryTitle}</span></div>
          </div>
        </div>
      </header>

      <div class="card__body">
        <div class="pill-row">
          ${isBday
            ? `<span class="badge badge--bday">${ico('birthday')} HÔM NAY SINH NHẬT! (+x8 Tim)</span>`
            : `<span class="tag tag--orange">${ico('birthday')} ${birthdayText(npc)}</span>`}
          <span class="tag tag--slate">${ico('pin')} ${npc.residence.split('(')[0].trim()}</span>
        </div>

        <div class="live-loc ${loc.festival ? 'live-loc--fest' : ''}">
          <span class="live-dot" aria-hidden="true"></span>
          <div>
            <div class="live-loc__time">${DAY_NAMES[dayOfWeek(sim.day)]} • ${loc.time} (${loc.locationShort}):</div>
            <div class="live-loc__desc">${loc.location}</div>
          </div>
        </div>

        <div class="inset-box">
          <div class="section-label section-label--red">${ico('loved')} Quà Cực Thích (+80đ):</div>
          <div class="pill-row">
            ${npc.gifts.loved.slice(0, 4).map(g => giftPill(g, 'gift', g.name.split('(')[0].trim())).join('')}
            ${npc.gifts.loved.length > 4 ? `<span class="gift gift--more">+${npc.gifts.loved.length - 4}</span>` : ''}
          </div>
        </div>

        <p class="card__desc">${npc.desc}</p>
      </div>

      <footer class="card__foot">
        <span class="muted-strong">${npc.marriageable ? `${ico('marriage')} Có Thể Kết Hôn` : `${ico('friend')} Bạn Bè`}</span>
        <span class="btn btn--ghost btn--sm" aria-hidden="true">${ico('calendar')} Lịch Trình & Sự Kiện</span>
      </footer>
    </article>`;
}

function giftPill(g, emoji, label = g.name, mod = '') {
  return `
    <span class="gift ${mod}" title="${g.name}">
      ${g.icon
        ? `<span class="gift__icon"><img src="${g.icon}" alt="" class="pixel-img" data-fallback="hide" loading="lazy"></span>`
        : (emoji ? ico(emoji) : '')}
      <span>${label}</span>
    </span>`;
}

function scheduleBox(title, list, mod) {
  return `
    <div class="sched sched--${mod}">
      <div class="sched__title">${title}</div>
      <ul class="sched__list">
        ${list.map(s => `<li><strong>${s.time}:</strong> ${s.location}</li>`).join('')}
      </ul>
    </div>`;
}

function giftGroup(title, list, mod, emoji) {
  if (!list?.length) return '';
  return `
    <div class="gift-group">
      <div class="gift-group__title gift-group__title--${mod}">${title}</div>
      <div class="pill-row">${list.map(g => giftPill(g, emoji, g.name, `gift--${mod}`)).join('')}</div>
    </div>`;
}

const npcsTab = {
  id: 'npcs',
  detailType: 'npc',
  toggles: [],

  init() {
    renderSeasonButtons();
    // Counts in the tab badge and filter chips come from the data, not the markup
    document.querySelectorAll('[data-npc-count]').forEach(el => {
      const cat = el.dataset.npcCount;
      const n = cat === 'all' ? NPCS_DATA.length : NPCS_DATA.filter(x => x.category === cat).length;
      // Inside a filter chip the count reads "(39)"; on the tab badge it's bare
      el.textContent = el.closest('.chip') ? `(${n})` : n;
    });
  },

  onLeave() {
    // Do not keep ticking and re-rendering a hidden tab
    if (sim.timer) stopPlay();
  },

  render(app) {
    renderCalendar();
    renderDateDisplay();
    renderWeatherButtons();
    renderTime();
    this.renderCards(app);
  },

  renderCards(app) {
    const grid = document.getElementById('npcsGrid');
    const filter = app.filters.npcs;
    const q = app.searchQuery;

    const list = NPCS_DATA.filter(npc => {
      if (filter !== 'all') {
        if (['spring', 'summer', 'fall', 'winter'].includes(filter)) {
          if (npc.birthday?.season !== filter) return false;
        } else if (npc.category !== filter) return false;
      }
      if (q) {
        return matches(q, npc.name, npc.nameEn, npc.residence, npc.occupation,
          npc.gifts.loved.map(g => g.name), npc.birthday && `${npc.birthday.seasonText} ${npc.birthday.day}`);
      }
      return true;
    });

    grid.innerHTML = list.length
      ? list.map(cardHtml).join('')
      : emptyState('search', 'Không tìm thấy Dân Làng / NPC nào phù hợp!', "Hãy thử tìm từ khóa khác hoặc bấm nút 'Tất Cả Dân Làng'.");
  },

  detail(app, id) {
    const npc = npcById.get(id);
    if (!npc) return '';
    const loc = getNpcLocation(npc, simContext());
    const s = npc.schedule;

    return `
      ${modalHeader({
        icon: `<div class="portrait portrait--lg"><img src="${npc.avatar}" alt="${npc.name}" class="pixel-img" data-fallback="${PORTRAIT_FALLBACK}"></div>`,
        title: npc.name,
        sub: `${npc.nameEn} • <span class="tag">${CATEGORY_LABELS[npc.category] || npc.categoryTitle}</span>`,
        extra: wikiLink(npc.nameEn, 'Xem trang bách khoa chính thức trên Official Wiki')
      })}
      <p class="detail-lead">${npc.desc}</p>

      <div class="spec-grid">
        <div class="spec spec--gold"><div class="spec__label">${ico('birthday')} SINH NHẬT</div><div class="spec__value">${birthdayText(npc)}</div></div>
        <div class="spec spec--slate"><div class="spec__label">${ico('residence')} NƠI CƯ NGỤ</div><div class="spec__value">${npc.residence}</div></div>
        <div class="spec spec--green"><div class="spec__label">${ico('job')} NGHỀ NGHIỆP / VAI TRÒ</div><div class="spec__value">${npc.occupation}</div></div>
      </div>

      <div class="live-loc live-loc--lg ${loc.festival ? 'live-loc--fest' : ''}">
        <span class="live-dot" aria-hidden="true"></span>
        <div>
          <div class="live-loc__time">VỊ TRÍ THEO THỜI ĐIỂM CHỌN (${DAY_NAMES[dayOfWeek(sim.day)]}, Ngày ${sim.day} - ${formatSimHour(sim.hour)}):</div>
          <div class="live-loc__short">${ico('pin')} ${loc.locationShort}</div>
          <div class="live-loc__desc">${loc.location}</div>
        </div>
      </div>

      <div class="inset-box">
        <h3 class="inset-box__title">${ico('gift')} Sở Thích Tặng Quà & Điểm Tình Bạn:</h3>
        ${giftGroup(`${ico('loved')} Cực kỳ yêu thích (+80 điểm tình bạn):`, npc.gifts.loved, 'loved', 'gift')}
        ${giftGroup(`${ico('liked')} Thích (+45 điểm tình bạn):`, npc.gifts.liked, 'liked', 'liked')}
        ${giftGroup(`${ico('disliked')} Không thích (-20 điểm tình bạn):`, npc.gifts.disliked, 'disliked', '')}
        ${giftGroup(`${ico('hated')} Ghét cay ghét đắng (-40 điểm tình bạn - Tuyệt đối không tặng!):`, npc.gifts.hated, 'hated', '')}
      </div>

      <div class="inset-box inset-box--plain">
        <h3 class="inset-box__title">${ico('clock')} Lịch Trình Di Chuyển Cụ Thể (Daily Schedule):</h3>
        <p class="muted">${s.overview || 'Lịch trình di chuyển theo từng mốc thời gian trong ngày:'}</p>
        <div class="sched-grid">
          ${scheduleBox(`${ico('sunny')} Lịch Trình Ngày Thường (Trời Nắng)`, s.sunny || [], 'sunny')}
          ${scheduleBox(`${ico('rainy')} Lịch Trình Ngày Mưa (Rainy Days)`, s.rainy || [], 'rainy')}
          ${WEEKDAY_SCHEDULES.filter(d => s[d.key]?.length).map(d => scheduleBox(d.title, s[d.key], 'day')).join('')}
        </div>
        ${s.special?.length ? `
          <div class="callout callout--purple">
            <h4 class="callout__title">${ico('sparkle')} Các Ngày Đặc Biệt & Ngoại Lệ:</h4>
            <ul class="bullet-list">${s.special.map(sp => `<li><strong>${sp.condition}:</strong> ${sp.desc}</li>`).join('')}</ul>
          </div>` : ''}
      </div>

      ${npc.heartEvents?.length ? `
        <div class="callout callout--red">
          <h3 class="callout__title">${ico('hearts')} Chuỗi Sự Kiện Tim Tình Bạn (Heart Events):</h3>
          <div class="heart-list">
            ${npc.heartEvents.map(he => `
              <div class="heart-event">
                <div class="heart-event__head">
                  <span class="badge badge--heart">${he.hearts} TIM</span>
                  <strong>${ico('pin')} ${he.location}</strong>
                </div>
                <p>${he.desc}</p>
              </div>`).join('')}
          </div>
        </div>` : ''}`;
  },

  actions: {
    'sim-season': (app, el) => {
      sim.season = el.dataset.season;
      renderSeasonButtons();
      app.sfx.play('click');
      app.render();
    },
    'sim-weather': (app, el) => {
      sim.weather = el.dataset.weather;
      app.sfx.play('click');
      app.render();
    },
    'sim-day': (app, el) => {
      sim.day = Number(el.dataset.day);
      app.sfx.play('click');
      app.render();
    },
    'sim-time': (app, el) => {
      sim.hour = parseFloat(el.value);
      app.render();
    },
    'sim-quick-time': (app, el) => {
      sim.hour = parseFloat(el.dataset.time);
      app.sfx.play('click');
      app.render();
    },
    'sim-play': (app, el) => {
      if (sim.timer) {
        stopPlay();
        return;
      }
      el.innerHTML = `${ico('pause')} Tạm Dừng`;
      el.classList.add('is-playing');
      sim.timer = setInterval(() => {
        sim.hour = sim.hour >= 26 ? 6 : sim.hour + 0.5;
        renderTime();
        npcsTab.renderCards(app);
      }, 1000);
    }
  }
};

export default npcsTab;
