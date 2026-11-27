/* figures.js — Figuras animadas de ejercicios */
const FIG = (() => {
  const T = 36, UA = 20, FA = 18, TH = 26, SH = 26, FT = 9, HR = 8;
  const GROUND = 146, BAR = 16, CX = 100, PERIOD = 2600;
  const rad = d => (d * Math.PI) / 180;
  const add = (p, a, len) => [p[0] + Math.cos(rad(a)) * len, p[1] + Math.sin(rad(a)) * len];

  /* Ángulos en grados: 0 = derecha, 90 = abajo, -90 = arriba */
  const POSES = {
    push: { ax: "wr",
      A: { t: -19, h: -19, a1: 90, a2: 90, l1: 161, l2: 161, f: 90 },
      B: { t: -6.5, h: -6.5, a1: 165, a2: 50, l1: 173.5, l2: 173.5, f: 90 } },
    squat: { ax: "an",
      A: { t: -90, h: -90, a1: 80, a2: 88, l1: 90, l2: 90, f: 0 },
      B: { t: -60, h: -60, a1: 0, a2: 0, l1: 8, l2: 105, f: 0 } },
    plank: { ax: "el",
      A: { t: -7, h: -7, a1: 90, a2: 0, l1: 173, l2: 173, f: 90 },
      B: { t: -9, h: -9, a1: 90, a2: 0, l1: 171, l2: 171, f: 90 } },
    pull: { ax: "wr", ay: "bar",
      A: { t: -90, h: -90, a1: -90, a2: -90, l1: 92, l2: 100, f: 20 },
      B: { t: -90, h: -90, a1: -210, a2: -60, l1: 100, l2: 125, f: 30 } },
    bridge: { ax: "sh",
      A: { t: 180, h: 200, a1: 0, a2: 0, l1: -55, l2: 55, f: 0 },
      B: { t: 155, h: 200, a1: 0, a2: 0, l1: -20, l2: 68, f: 0 } },
    lunge: { ax: "an",
      A: { t: -90, h: -90, a1: 80, a2: 88, l1: 90, l2: 90, f: 0, m1: 90, m2: 90, f2: 0 },
      B: { t: -90, h: -90, a1: 80, a2: 88, l1: 5, l2: 92, f: 0, m1: 105, m2: 190, f2: 60 } },
    crunch: { ax: "hip",
      A: { t: 180, h: 200, a1: 20, a2: 160, l1: -55, l2: 55, f: 0 },
      B: { t: 205, h: 225, a1: 20, a2: 160, l1: -55, l2: 55, f: 0 } },
    legraise: { ax: "hip",
      A: { t: 180, h: 200, a1: 0, a2: 0, l1: 0, l2: 0, f: -80 },
      B: { t: 180, h: 200, a1: 0, a2: 0, l1: -90, l2: -90, f: 0 } },
    superman: { ax: "hip",
      A: { t: 0, h: -20, a1: 0, a2: 0, l1: 180, l2: 180, f: 180 },
      B: { t: -8, h: -30, a1: -25, a2: -25, l1: 190, l2: 190, f: 190 } },
  };

  const KEY = {
    "Flexiones (Push-ups)": "push",
    "Sentadillas (Squats)": "squat",
    "Plancha (Plank)": "plank",
    "Dominadas (Pull-ups)": "pull",
    "Dominadas supinas (Chin-ups)": "pull",
    "Puente de glúteo": "bridge",
    "Zancadas (Lunges)": "lunge",
    "Abdominales (Crunches)": "crunch",
    "Elevación de piernas": "legraise",
    "Superman": "superman",
  };

  const has = name => !!POSES[KEY[name]];

  function mount(el, name) {
    const spec = POSES[KEY[name]];
    if (!el || !spec) return;
    const token = {};
    el._fig = token;

    const stroke = (c, w) => `fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"`;
    el.innerHTML = `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
      ${spec.ay === "bar"
        ? `<line x1="60" x2="140" y1="${BAR}" y2="${BAR}" stroke="#8a90a6" stroke-width="4" stroke-linecap="round"/>`
        : `<line x1="16" x2="184" y1="${GROUND}" y2="${GROUND}" stroke="#2d3454" stroke-width="2" stroke-linecap="round"/>`}
      <polyline class="far" ${stroke("#9d2b66", 5.5)}/>
      <polyline class="leg" ${stroke("#ec4899", 5.5)}/>
      <polyline class="torso" ${stroke("#f0549f", 8)}/>
      <polyline class="arm" ${stroke("#f9a8d4", 4.5)}/>
      <circle class="head" r="${HR}" fill="#f0549f"/>
    </svg>`;
    const svg = el.querySelector("svg");
    const q = c => svg.querySelector("." + c);

    function draw(u) {
      const p = {};
      for (const k in spec.A) p[k] = spec.A[k] + (spec.B[k] - spec.A[k]) * u;

      const J = {};
      J.hip = [0, 0];
      J.sh = add(J.hip, p.t, T);
      J.head = add(J.sh, p.h, HR + 5);
      J.el = add(J.sh, p.a1, UA);
      J.wr = add(J.el, p.a2, FA);
      J.kn = add(J.hip, p.l1, TH);
      J.an = add(J.kn, p.l2, SH);
      J.toe = add(J.an, p.f, FT);
      const two = p.m1 !== undefined;
      if (two) {
        J.kn2 = add(J.hip, p.m1, TH);
        J.an2 = add(J.kn2, p.m2, SH);
        J.toe2 = add(J.an2, p.f2, FT);
      }

      let low = -1e9;
      for (const k in J) low = Math.max(low, J[k][1] + (k === "head" ? HR : 3.5));
      const dx = CX - J[spec.ax][0];
      const dy = spec.ay === "bar" ? BAR - J.wr[1] : GROUND - low;
      const P = k => [J[k][0] + dx, J[k][1] + dy];
      const pts = (...ks) => ks.map(k => P(k).map(v => v.toFixed(1)).join(",")).join(" ");

      q("torso").setAttribute("points", pts("hip", "sh"));
      q("leg").setAttribute("points", pts("hip", "kn", "an", "toe"));
      q("far").setAttribute("points", two ? pts("hip", "kn2", "an2", "toe2") : "");
      q("arm").setAttribute("points", pts("sh", "el", "wr"));
      const h = P("head");
      q("head").setAttribute("cx", h[0].toFixed(1));
      q("head").setAttribute("cy", h[1].toFixed(1));
    }

    const dlg = el.closest("dialog");
    const t0 = performance.now();
    (function loop(now) {
      if (el._fig !== token || !el.isConnected || (dlg && !dlg.open)) return;
      const ph = ((now - t0) % PERIOD) / PERIOD;
      draw(0.5 - 0.5 * Math.cos(ph * 2 * Math.PI));
      requestAnimationFrame(loop);
    })(t0);
  }

  return { has, mount };
})();
