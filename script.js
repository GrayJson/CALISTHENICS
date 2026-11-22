/* ============ DATOS ============ */
const exercises = [
  { name: "Flexiones (Push-ups)", cat: "Pecho", icon: "💪", info: "Fortalece pecho, hombros y tríceps. Es la base de todo el empuje en calistenia.", tip: "Mantén el cuerpo recto como una tabla y baja hasta que el pecho casi toque el suelo." },
  { name: "Flexiones diamante", cat: "Brazos", icon: "💎", info: "Enfatiza los tríceps y la parte interna del pecho.", tip: "Junta las manos formando un diamante y mantén los codos cerca del cuerpo." },
  { name: "Fondos en silla (Dips)", cat: "Brazos", icon: "🪑", info: "Trabaja tríceps, pecho inferior y hombros.", tip: "Asegúrate de que las sillas no se muevan y baja controlado, sin encoger los hombros." },
  { name: "Dominadas (Pull-ups)", cat: "Espalda", icon: "🧗", info: "Desarrollan dorsales, bíceps y antebrazos. Es el mejor ejercicio de tirón.", tip: "Agarre más ancho que los hombros; sube hasta pasar la barbilla de la barra." },
  { name: "Dominadas supinas (Chin-ups)", cat: "Brazos", icon: "🙌", info: "Como la dominada, pero con las palmas hacia ti: más trabajo de bíceps.", tip: "Empieza con los brazos estirados y evita balancearte." },
  { name: "Remo invertido", cat: "Espalda", icon: "🚣", info: "Trabaja espalda media, bíceps y agarre. Es más fácil que la dominada.", tip: "Cuerpo en línea recta y lleva el pecho hacia la barra. Usa una mesa o barra bien firme." },
  { name: "Sentadillas (Squats)", cat: "Piernas", icon: "🦵", info: "Fortalecen cuádriceps, glúteos y core. Son la base del tren inferior.", tip: "Rodillas alineadas con los pies y espalda recta; baja hasta que los muslos queden paralelos al suelo." },
  { name: "Zancadas (Lunges)", cat: "Piernas", icon: "🚶", info: "Trabajan piernas y glúteos, y mejoran el equilibrio.", tip: "Da un paso largo y baja la rodilla trasera cerca del suelo." },
  { name: "Sentadilla búlgara", cat: "Piernas", icon: "🏔️", info: "Trabajo intenso de cuádriceps y glúteos, una pierna a la vez.", tip: "Apoya el pie trasero en una silla firme y baja controlado." },
  { name: "Puente de glúteo", cat: "Piernas", icon: "🌉", info: "Activa glúteos y femorales, y ayuda a cuidar la zona lumbar.", tip: "Aprieta los glúteos arriba y mantén un segundo." },
  { name: "Plancha (Plank)", cat: "Core", icon: "🧱", info: "Fortalece todo el core y mejora la postura.", tip: "Cuerpo recto de cabeza a talones, abdomen apretado, sin hundir la cadera." },
  { name: "Plancha lateral", cat: "Core", icon: "📐", info: "Trabaja los oblicuos y la estabilidad del tronco.", tip: "Apoya el antebrazo y eleva la cadera hasta formar una línea recta." },
  { name: "Elevación de piernas", cat: "Core", icon: "🦿", info: "Fortalece el abdomen inferior y los flexores de la cadera.", tip: "Pega la zona lumbar al suelo y baja las piernas despacio." },
  { name: "Abdominales (Crunches)", cat: "Core", icon: "🔥", info: "Aíslan la parte superior del abdomen.", tip: "Sube con el abdomen, sin jalar el cuello con las manos." },
  { name: "Mountain climbers", cat: "Cardio", icon: "⛰️", info: "Combina core y cardio; sube el pulso rápidamente.", tip: "Mantén la cadera baja y alterna las rodillas al pecho con ritmo." },
  { name: "Burpees", cat: "Cardio", icon: "🏃", info: "Ejercicio de cuerpo completo que mejora resistencia y fuerza.", tip: "Hazlos a un ritmo que puedas mantener con buena técnica." },
  { name: "Jumping jacks", cat: "Cardio", icon: "⭐", info: "Calientan el cuerpo y mejoran la resistencia cardiovascular.", tip: "Aterriza suave sobre la punta de los pies." },
  { name: "Sentadilla con salto", cat: "Piernas", icon: "🦘", info: "Desarrolla potencia explosiva en las piernas.", tip: "Aterriza suave, con las rodillas flexionadas." },
  { name: "Pike push-up", cat: "Hombros", icon: "🔺", info: "Fortalece los hombros y prepara el camino hacia la parada de manos.", tip: "Forma una V invertida con el cuerpo y baja la cabeza entre las manos." },
  { name: "Superman", cat: "Espalda", icon: "🦸", info: "Fortalece la espalda baja y los glúteos.", tip: "Eleva brazos y piernas a la vez y sostén un segundo arriba." },
  { name: "Hollow hold", cat: "Core", icon: "🌙", info: "Fortalece el core profundo; es clave en gimnasia.", tip: "Zona lumbar pegada al suelo, brazos y piernas extendidos y elevados." },
  { name: "Escaladores de pared (Wall walk)", cat: "Hombros", icon: "🧗‍♂️", info: "Fortalece hombros y core, y prepara la parada de manos.", tip: "Ve despacio y para si sientes dolor en las muñecas." },
  { name: "Archer push-up", cat: "Pecho", icon: "🏹", info: "Variante avanzada de flexión que carga un brazo a la vez.", tip: "Estira un brazo hacia el lado mientras el otro hace el empuje." },
];

const CAT_COLORS = {
  Pecho: "#e63946", Espalda: "#4895ef", Piernas: "#2a9d8f", Core: "#f4a261",
  Hombros: "#9b5de5", Brazos: "#f15bb5", Cardio: "#ffd166", Otro: "#888"
};

function defaultRoutines() {
  return [
    { id: "push", icon: "💪", name: "Lunes — Push", sub: "Pecho, hombros y tríceps",
      exercises: ["Flexiones (Push-ups)", "Flexiones diamante", "Fondos en silla (Dips)", "Pike push-up", "Archer push-up"] },
    { id: "pull", icon: "🧗", name: "Miércoles — Pull", sub: "Espalda y bíceps",
      exercises: ["Dominadas (Pull-ups)", "Dominadas supinas (Chin-ups)", "Remo invertido", "Superman"] },
    { id: "legs", icon: "🦵", name: "Viernes — Legs + Core", sub: "Piernas y abdomen",
      exercises: ["Sentadillas (Squats)", "Zancadas (Lunges)", "Sentadilla búlgara", "Puente de glúteo", "Plancha (Plank)", "Elevación de piernas"] },
  ];
}

/* ============ UTILIDADES ============ */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const load = (key, fallback) => {
  try { const v = JSON.parse(localStorage.getItem(key)); return v ?? fallback; }
  catch { return fallback; }
};
const save = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const byName = name => exercises.find(e => e.name === name);

let profile = load("cal-profile", { name: "", height: "", weight: "", goal: 3 });
let routines = load("cal-routines", defaultRoutines());
let history = load("cal-history", []);

const saveRoutines = () => save("cal-routines", routines);
const saveHistory = () => save("cal-history", history);

/* ============ PESTAÑAS ============ */
function showTab(tab) {
  $$(".tab-btn").forEach(b => b.classList.toggle("active", b.dataset.tab === tab));
  $$(".tab-content").forEach(c => c.classList.toggle("active", c.id === tab));
  if (tab === "history") renderHistory();
}
$$(".tab-btn").forEach(btn => btn.addEventListener("click", () => showTab(btn.dataset.tab)));

/* ============ PERFIL ============ */
function renderProfile() {
  $("#p-name").value = profile.name;
  $("#p-height").value = profile.height;
  $("#p-weight").value = profile.weight;
  $("#p-goal").value = profile.goal || 3;

  $("#greeting").textContent = profile.name ? `¡Vamos, ${profile.name}!` : "";

  const h = Number(profile.height) / 100;
  const w = Number(profile.weight);
  const box = $("#imc-box");
  if (h > 0 && w > 0) {
    const imc = w / (h * h);
    let label = "peso normal";
    if (imc < 18.5) label = "bajo peso";
    else if (imc >= 30) label = "obesidad";
    else if (imc >= 25) label = "sobrepeso";
    box.textContent = `IMC: ${imc.toFixed(1)} (${label}). Es solo una referencia general.`;
  } else {
    box.textContent = "";
  }
}

$("#save-profile").addEventListener("click", () => {
  profile = {
    name: $("#p-name").value.trim(),
    height: $("#p-height").value,
    weight: $("#p-weight").value,
    goal: Math.min(7, Math.max(1, Number($("#p-goal").value) || 3)),
  };
  save("cal-profile", profile);
  renderProfile();
  alert("Perfil guardado ✅");
});

/* ============ LIBRERÍA ============ */
function renderLibrary() {
  const ul = $("#exercise-list");
  ul.innerHTML = "";
  exercises.forEach(ex => {
    const li = document.createElement("li");
    li.className = "ex-item";
    li.innerHTML = `
      <div class="ex-row">
        <span class="ex-icon" style="background:${CAT_COLORS[ex.cat]}33">${ex.icon}</span>
        <div class="ex-main"><strong>${ex.name}</strong><small>${ex.cat}</small></div>
        <button class="plus-btn" title="Añadir a una rutina">+</button>
      </div>
      <div class="ex-info">
        <p><b>¿Para qué sirve?</b> ${ex.info}</p>
        <p><b>Consejo:</b> ${ex.tip}</p>
      </div>`;
    $(".ex-row", li).addEventListener("click", () => li.classList.toggle("open"));
    $(".plus-btn", li).addEventListener("click", e => {
      e.stopPropagation();
      openAddDialog(ex.name);
    });
    ul.appendChild(li);
  });
}

/* ---- Diálogo: añadir a rutina ---- */
let pendingExercise = null;

function addToRoutine(routineId, exerciseName) {
  const r = routines.find(x => x.id === routineId);
  if (r && !r.exercises.includes(exerciseName)) {
    r.exercises.push(exerciseName);
    saveRoutines();
    renderRoutines();
  }
}

function createRoutine(name) {
  const r = { id: "r" + Date.now(), icon: "🔥", name, sub: "Rutina personalizada", exercises: [] };
  routines.push(r);
  saveRoutines();
  return r.id;
}

function openAddDialog(exerciseName) {
  pendingExercise = exerciseName;
  $("#add-title").textContent = `Añadir "${exerciseName}" a...`;
  const box = $("#add-options");
  box.innerHTML = "";
  routines.forEach(r => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "option-btn";
    b.textContent = `${r.icon} ${r.name}`;
    b.addEventListener("click", () => {
      addToRoutine(r.id, pendingExercise);
      $("#add-dialog").close();
    });
    box.appendChild(b);
  });
  $("#add-dialog").showModal();
}

$("#add-new").addEventListener("click", () => {
  const name = prompt("Nombre de la nueva rutina:");
  if (name && name.trim()) {
    const id = createRoutine(name.trim());
    addToRoutine(id, pendingExercise);
    renderRoutines();
    $("#add-dialog").close();
  }
});
$("#add-cancel").addEventListener("click", () => $("#add-dialog").close());

/* ============ RUTINAS ============ */
function renderRoutines() {
  const box = $("#routine-list");
  box.innerHTML = "";

  routines.forEach(r => {
    const items = r.exercises.map((n, i) => {
      const ex = byName(n);
      return `<li>
        <span class="ex-icon sm">${ex ? ex.icon : "•"}</span>
        <span class="grow">${esc(n)}</span>
        <button class="remove-btn" data-i="${i}" title="Quitar">×</button>
      </li>`;
    }).join("");

    const card = document.createElement("div");
    card.className = "routine-card";
    card.innerHTML = `
      <div class="routine-head">
        <span class="routine-icon">${r.icon}</span>
        <div class="grow">
          <h3>${esc(r.name)}</h3>
          <p class="day-sub">${esc(r.sub || "")}</p>
        </div>
        <button class="icon-btn rename" title="Renombrar">✏️</button>
        <button class="icon-btn delete" title="Eliminar rutina">🗑️</button>
      </div>
      <ul class="day-list">
        ${items || '<li class="empty">Sin ejercicios todavía. Añádelos desde la Librería con el botón +</li>'}
      </ul>
      <button class="primary-btn start">▶ Registrar entrenamiento</button>`;

    $$(".remove-btn", card).forEach(b => b.addEventListener("click", () => {
      r.exercises.splice(Number(b.dataset.i), 1);
      saveRoutines();
      renderRoutines();
    }));

    $(".rename", card).addEventListener("click", () => {
      const name = prompt("Nuevo nombre de la rutina:", r.name);
      if (name && name.trim()) {
        r.name = name.trim();
        saveRoutines();
        renderRoutines();
      }
    });

    $(".delete", card).addEventListener("click", () => {
      if (confirm(`¿Eliminar la rutina "${r.name}"?`)) {
        routines = routines.filter(x => x.id !== r.id);
        saveRoutines();
        renderRoutines();
      }
    });

    $(".start", card).addEventListener("click", () => {
      if (!r.exercises.length) {
        alert("Esta rutina no tiene ejercicios todavía.");
        return;
      }
      openLogDialog(r);
    });

    box.appendChild(card);
  });
}

$("#new-routine").addEventListener("click", () => {
  const name = prompt("Nombre de la nueva rutina:");
  if (name && name.trim()) {
    createRoutine(name.trim());
    renderRoutines();
  }
});

$("#restore-routines").addEventListener("click", () => {
  if (confirm("Esto reemplaza TODAS tus rutinas por las 3 originales. ¿Continuar?")) {
    routines = defaultRoutines();
    saveRoutines();
    renderRoutines();
  }
});

/* ---- Diálogo: registrar entrenamiento ---- */
let logRoutine = null;

function openLogDialog(r) {
  logRoutine = r;
  $("#log-title").textContent = `${r.icon} ${r.name}`;
  const box = $("#log-rows");
  box.innerHTML = "";
  r.exercises.forEach(n => {
    const ex = byName(n);
    const row = document.createElement("div");
    row.className = "log-row";
    row.dataset.name = n;
    row.innerHTML = `
      <span class="grow">${ex ? ex.icon : ""} ${esc(n)}</span>
      <input type="number" class="sets" min="0" placeholder="Series">
      <input type="number" class="reps" min="0" placeholder="Reps">`;
    box.appendChild(row);
  });
  $("#log-dialog").showModal();
}

$("#log-save").addEventListener("click", () => {
  const items = $$("#log-rows .log-row").map(row => ({
    name: row.dataset.name,
    sets: Number($(".sets", row).value) || 0,
    reps: Number($(".reps", row).value) || 0,
  })).filter(i => i.sets > 0 && i.reps > 0);

  if (!items.length) {
    alert("Pon series y repeticiones en al menos un ejercicio.");
    return;
  }

  history.unshift({
    id: Date.now(),
    date: new Date().toISOString(),
    routineName: logRoutine.name,
    icon: logRoutine.icon,
    items,
  });
  saveHistory();
  $("#log-dialog").close();
  showTab("history");
});
$("#log-cancel").addEventListener("click", () => $("#log-dialog").close());

/* ============ HISTORIAL ============ */
function startOfWeek() {
  const d = new Date();
  const dayFromMonday = (d.getDay() + 6) % 7;
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - dayFromMonday);
  return d;
}

function renderHistory() {
  /* Meta semanal */
  const goal = Number(profile.goal) || 3;
  const weekCount = history.filter(h => new Date(h.date) >= startOfWeek()).length;
  const pct = Math.min(100, Math.round((weekCount / goal) * 100));
  $("#week-text").textContent = `${weekCount} de ${goal} entrenamientos esta semana (${pct}%)`;
  $("#week-fill").style.width = pct + "%";

  /* Totales */
  const perExercise = {};
  const perCat = {};
  let totalReps = 0;
  history.forEach(session => {
    session.items.forEach(it => {
      const reps = it.sets * it.reps;
      totalReps += reps;
      perExercise[it.name] = (perExercise[it.name] || 0) + reps;
      const cat = byName(it.name)?.cat || "Otro";
      perCat[cat] = (perCat[cat] || 0) + reps;
    });
  });
  $("#stat-sessions").textContent = history.length;
  $("#stat-reps").textContent = totalReps;

  /* Barras por ejercicio (top 6) */
  const bars = $("#exercise-bars");
  const top = Object.entries(perExercise).sort((a, b) => b[1] - a[1]).slice(0, 6);
  if (!top.length) {
    bars.innerHTML = '<p class="hint">Aún no hay datos. Registra tu primer entrenamiento.</p>';
  } else {
    const max = top[0][1];
    bars.innerHTML = top.map(([name, reps]) => `
      <div class="bar-row">
        <div class="bar-label"><span>${esc(name)}</span><span>${reps}</span></div>
        <div class="bar"><div class="bar-fill" style="width:${Math.round((reps / max) * 100)}%"></div></div>
      </div>`).join("");
  }

  /* Gráfica de pastel */
  const pie = $("#pie");
  const legend = $("#pie-legend");
  const entries = Object.entries(perCat).sort((a, b) => b[1] - a[1]);
  if (!entries.length) {
    pie.style.background = "#2a2a2a";
    legend.innerHTML = '<li class="hint">Sin datos todavía</li>';
  } else {
    let acc = 0;
    const stops = entries.map(([cat, val]) => {
      const from = (acc / totalReps) * 100;
      acc += val;
      const to = (acc / totalReps) * 100;
      return `${CAT_COLORS[cat] || CAT_COLORS.Otro} ${from}% ${to}%`;
    });
    pie.style.background = `conic-gradient(${stops.join(", ")})`;
    legend.innerHTML = entries.map(([cat, val]) => `
      <li><span class="dot" style="background:${CAT_COLORS[cat] || CAT_COLORS.Otro}"></span>
      ${esc(cat)} — ${Math.round((val / totalReps) * 100)}%</li>`).join("");
  }

  /* Lista de sesiones */
  const list = $("#session-list");
  if (!history.length) {
    list.innerHTML = '<li class="hint">Todavía no hay sesiones.</li>';
  } else {
    list.innerHTML = history.map(s => {
      const date = new Date(s.date).toLocaleDateString("es", { weekday: "long", day: "numeric", month: "short" });
      const summary = s.items.map(i => `${esc(i.name)}: ${i.sets}×${i.reps}`).join(" · ");
      return `<li>
        <div class="session-top">
          <span>${s.icon || "🔥"}</span>
          <strong class="grow">${esc(s.routineName)}</strong>
          <button class="remove-btn" data-id="${s.id}" title="Borrar sesión">×</button>
        </div>
        <div class="session-date">${date}</div>
        <div class="session-items">${summary}</div>
      </li>`;
    }).join("");

    $$("#session-list .remove-btn").forEach(b => b.addEventListener("click", () => {
      if (confirm("¿Borrar esta sesión del historial?")) {
        history = history.filter(h => String(h.id) !== b.dataset.id);
        saveHistory();
        renderHistory();
      }
    }));
  }
}

/* ============ INICIO ============ */
renderProfile();
renderLibrary();
renderRoutines();
renderHistory();