/* body.js — Mapa muscular (gira con el dedo) */
const BODY = (() => {
  const NAMES = {
    chest: "Pecho", shoulders: "Hombros", biceps: "Bíceps", triceps: "Tríceps",
    forearms: "Antebrazos", abs: "Abdomen", obliques: "Oblicuos", quads: "Cuádriceps",
    calves: "Pantorrillas", traps: "Trapecio", lats: "Dorsales", lowback: "Lumbar",
    glutes: "Glúteos", hamstrings: "Femorales"
  };

  const MAP = {
    "Flexiones (Push-ups)": { chest: 3, triceps: 2, shoulders: 2, abs: 1 },
    "Flexiones declinadas": { chest: 3, shoulders: 3, triceps: 2, abs: 1 },
    "Flexiones diamante": { triceps: 3, chest: 2, shoulders: 1 },
    "Fondos en silla (Dips)": { triceps: 3, shoulders: 2, chest: 1 },
    "Pike push-up": { shoulders: 3, triceps: 2, traps: 1 },
    "Archer push-up": { chest: 3, triceps: 2, shoulders: 2, obliques: 1 },
    "Dominadas (Pull-ups)": { lats: 3, biceps: 2, forearms: 2, traps: 1, abs: 1 },
    "Dominadas supinas (Chin-ups)": { biceps: 3, lats: 3, forearms: 1 },
    "Remo invertido": { lats: 3, traps: 2, biceps: 2, forearms: 1 },
    "Superman": { lowback: 3, glutes: 2, hamstrings: 1, traps: 1 },
    "Sentadillas (Squats)": { quads: 3, glutes: 3, hamstrings: 1, calves: 1, abs: 1 },
    "Zancadas (Lunges)": { quads: 3, glutes: 3, hamstrings: 1, calves: 1 },
    "Sentadilla búlgara": { quads: 3, glutes: 3, hamstrings: 1 },
    "Puente de glúteo": { glutes: 3, hamstrings: 2, lowback: 1 },
    "Sentadilla con salto": { quads: 3, glutes: 2, calves: 2 },
    "Plancha (Plank)": { abs: 3, obliques: 1, shoulders: 1, lowback: 1, glutes: 1 },
    "Plancha lateral": { obliques: 3, abs: 1, shoulders: 1, glutes: 1 },
    "Elevación de piernas": { abs: 3, quads: 1 },
    "Abdominales (Crunches)": { abs: 3, obliques: 1 },
    "Hollow hold": { abs: 3, quads: 1 },
    "Mountain climbers": { abs: 2, shoulders: 1, quads: 1, obliques: 1 },
    "Burpees": { quads: 2, chest: 1, shoulders: 1, triceps: 1, glutes: 1, abs: 1 },
    "Jumping jacks": { shoulders: 1, quads: 1, calves: 1, glutes: 1 },
    "Escaladores de pared (Wall walk)": { shoulders: 3, abs: 2, triceps: 1, traps: 1 },
  };

  /* Formas de cada músculo (mitad izquierda; se refleja solo). {F} = color */
  const SHAPES = {
    front: [
      { id: "chest", el: '<path d="M98 74 L98 114 Q82 124 64 112 Q60 94 66 82 Q82 72 98 74 Z" fill="{F}"/>' },
      { id: "obliques", el: '<path d="M66 124 Q62 152 69 188 L83 188 Q85 152 84 126 Q74 128 66 124 Z" fill="{F}"/>' },
      { id: "abs", mid: true, el: '<g fill="{F}"><rect x="87" y="122" width="12" height="14" rx="4"/><rect x="101" y="122" width="12" height="14" rx="4"/><rect x="87" y="140" width="12" height="14" rx="4"/><rect x="101" y="140" width="12" height="14" rx="4"/><rect x="87" y="158" width="12" height="14" rx="4"/><rect x="101" y="158" width="12" height="14" rx="4"/><rect x="87" y="176" width="12" height="14" rx="4"/><rect x="101" y="176" width="12" height="14" rx="4"/></g>' },
      { id: "shoulders", el: '<ellipse cx="52" cy="78" rx="14" ry="16" fill="{F}"/>' },
      { id: "biceps", el: '<ellipse cx="42" cy="112" rx="9" ry="26" transform="rotate(6 42 112)" fill="{F}"/>' },
      { id: "forearms", el: '<ellipse cx="36" cy="176" rx="8" ry="24" transform="rotate(3 36 176)" fill="{F}"/>' },
      { id: "quads", el: '<path d="M76 204 Q69 250 75 290 L96 290 Q101 250 98 204 Z" fill="{F}"/>' },
      { id: "calves", el: '<path d="M77 300 Q73 340 79 384 L92 384 Q95 340 94 300 Z" fill="{F}"/>' },
    ],
    back: [
      { id: "traps", el: '<path d="M100 52 L100 104 Q82 100 62 72 Q82 60 100 52 Z" fill="{F}"/>' },
      { id: "lats", el: '<path d="M98 108 L98 168 Q80 174 70 152 Q64 128 68 104 Q82 102 98 108 Z" fill="{F}"/>' },
      { id: "lowback", mid: true, el: '<path d="M88 170 L112 170 L112 198 Q100 204 88 198 Z" fill="{F}"/>' },
      { id: "shoulders", el: '<ellipse cx="52" cy="78" rx="14" ry="16" fill="{F}"/>' },
      { id: "triceps", el: '<ellipse cx="42" cy="112" rx="9" ry="26" transform="rotate(6 42 112)" fill="{F}"/>' },
      { id: "forearms", el: '<ellipse cx="36" cy="176" rx="8" ry="24" transform="rotate(3 36 176)" fill="{F}"/>' },
      { id: "glutes", el: '<path d="M100 200 L100 242 Q80 250 70 232 Q66 210 80 200 Q90 196 100 200 Z" fill="{F}"/>' },
      { id: "hamstrings", el: '<path d="M76 250 Q70 272 75 292 L96 292 Q101 272 98 250 Q86 256 76 250 Z" fill="{F}"/>' },
      { id: "calves", el: '<path d="M77 300 Q71 332 79 366 L92 366 Q98 332 94 300 Z" fill="{F}"/>' },
    ],
  };

  const BF = 'fill="#161b2c" stroke="#2d3454" stroke-width="1.5"';
  const BASE_HALF = `
    <ellipse cx="42" cy="112" rx="13" ry="34" transform="rotate(6 42 112)" ${BF}/>
    <ellipse cx="36" cy="176" rx="11" ry="32" transform="rotate(3 36 176)" ${BF}/>
    <ellipse cx="33" cy="216" rx="8" ry="12" ${BF}/>
    <path d="M72 198 Q64 250 70 296 L98 296 Q104 250 100 198 Z" ${BF}/>
    <path d="M74 296 Q70 340 76 392 L94 392 Q98 340 96 296 Z" ${BF}/>
    <ellipse cx="84" cy="402" rx="14" ry="7" ${BF}/>`;
  const BASE_MID = `
    <circle cx="100" cy="30" r="18" ${BF}/>
    <rect x="91" y="46" width="18" height="18" rx="6" ${BF}/>
    <path d="M64 66 Q100 54 136 66 Q142 90 132 130 Q128 160 126 198 Q100 210 74 198 Q72 160 68 130 Q58 90 64 66 Z" ${BF}/>`;

  const mirror = h => `<g transform="translate(200 0) scale(-1 1)">${h}</g>`;
  const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
  const mix = (a, b, t) => {
    const A = hex(a), B = hex(b);
    return "#" + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, "0")).join("");
  };
  const colorFor = t => (t <= 0 ? "#262c45" : mix("#6b2a5c", "#ff2d95", Math.min(1, t)));

  function svgFor(view, vals) {
    const parts = SHAPES[view].map(s => {
      const html = s.el.replace(/\{F\}/g, colorFor(vals[s.id] || 0));
      return s.mid ? html : html + mirror(html);
    }).join("");
    return `<svg viewBox="0 0 200 420" xmlns="http://www.w3.org/2000/svg">
      ${BASE_HALF}${mirror(BASE_HALF)}${BASE_MID}
      <g stroke="#0b0b12" stroke-width="1.2">${parts}</g></svg>`;
  }

  function weekStart() {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
    return d;
  }

  let range = "week", angle = 0, built = false, last = [];

  function build(stage) {
    stage.innerHTML = `
      <div class="body-scene" id="body-scene">
        <div class="body-rot" id="body-rot">
          <div class="body-face" id="face-front"></div>
          <div class="body-face back" id="face-back"></div>
        </div>
      </div>
      <button class="ghost spin" id="spin" type="button">↻ Girar</button>`;
    const scene = stage.querySelector("#body-scene");
    const rot = stage.querySelector("#body-rot");
    const apply = () => { rot.style.transform = `rotateY(${angle}deg)`; };
    let down = false, sx = 0, base = 0;
    scene.addEventListener("pointerdown", e => {
      down = true; sx = e.clientX; base = angle;
      rot.style.transition = "none";
      scene.setPointerCapture(e.pointerId);
    });
    scene.addEventListener("pointermove", e => {
      if (!down) return;
      angle = base + (e.clientX - sx) * 0.9;
      apply();
    });
    const end = () => {
      if (!down) return;
      down = false;
      angle = Math.round(angle / 180) * 180;
      rot.style.transition = "transform .35s ease";
      apply();
    };
    scene.addEventListener("pointerup", end);
    scene.addEventListener("pointercancel", end);
    stage.querySelector("#spin").addEventListener("click", () => {
      angle += 180;
      rot.style.transition = "transform .5s ease";
      apply();
    });
    built = true;
  }

  function render(history) {
    last = history;
    const stage = document.getElementById("body-stage");
    if (!stage) return;
    if (!built) build(stage);

    const since = range === "week" ? weekStart() : 0;
    const acc = {};
    history.forEach(s => {
      if (new Date(s.date) < since) return;
      s.items.forEach(it => {
        const m = MAP[it.name];
        if (!m) return;
        const n = it.sets.length;
        for (const k in m) acc[k] = (acc[k] || 0) + m[k] * n;
      });
    });
    const max = Math.max(0, ...Object.values(acc));
    const vals = {};
    for (const k in acc) vals[k] = max ? acc[k] / max : 0;

    document.getElementById("face-front").innerHTML = svgFor("front", vals);
    document.getElementById("face-back").innerHTML = svgFor("back", vals);

    const total = Object.values(acc).reduce((a, b) => a + b, 0);
    const top = Object.entries(acc).sort((a, b) => b[1] - a[1]).slice(0, 5);
    document.getElementById("muscle-top").innerHTML = top.length
      ? top.map(([k, v]) => `<li><span class="dot" style="background:${colorFor(vals[k])}"></span><span class="grow">${NAMES[k]}</span><b class="mono-pink">${Math.round((v / total) * 100)}%</b></li>`).join("")
      : '<li class="empty">Sin datos en este periodo</li>';
  }

  document.querySelectorAll(".seg-btn").forEach(b => b.addEventListener("click", () => {
    range = b.dataset.range;
    document.querySelectorAll(".seg-btn").forEach(x => x.classList.toggle("active", x === b));
    render(last);
  }));

  return { render };
})();
