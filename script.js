/* ===================== UTILIDADES ===================== */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const load = (key, fallback) => {
  try { const v = JSON.parse(localStorage.getItem(key)); return v ?? fallback; }
  catch { return fallback; }
};
const save = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const fmt = s => String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(Math.floor(s % 60)).padStart(2, "0");

let toastTimer;
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 1800);
}

/* ===================== DATOS ===================== */
// E(nombre, grupo, icono, nivel, músculos, tipo, series, meta, posición inicial, ejecución, tips)
const E = (name, cat, icon, level, muscles, type, sets, target, start, exec, tips) =>
  ({ name, cat, icon, level, muscles, type, sets, target, start, exec, tips });

const exercises = [
  E("Flexiones (Push-ups)", "Pecho", "💪", "Principiante", "Empuje (Pecho, tríceps)", "reps", 4, 12,
    "Manos en el suelo, un poco más anchas que los hombros, cuerpo recto de cabeza a talones.",
    "Baja el pecho hacia el suelo flexionando los codos y empuja hasta estirar los brazos.",
    ["Aprieta abdomen y glúteos para no hundir la cadera.", "Los codos van a unos 45° del cuerpo, no abiertos a 90°."]),
  E("Flexiones declinadas", "Pecho", "📉", "Intermedio", "Empuje (Pecho alto, hombros)", "reps", 3, 10,
    "Pies elevados sobre una silla o banco y manos en el suelo alineadas con los hombros.",
    "Flexiona los codos bajando el pecho hacia el suelo y empuja de vuelta arriba.",
    ["Mantén el abdomen apretado sin hundir la cadera.", "Asegúrate de que la silla no se mueva."]),
  E("Flexiones diamante", "Brazos", "💎", "Intermedio", "Empuje (Tríceps, pecho interno)", "reps", 3, 10,
    "Manos juntas bajo el pecho formando un diamante con pulgares e índices.",
    "Baja manteniendo los codos pegados al cuerpo y empuja hasta extender los brazos.",
    ["Si te cuesta, hazlas con las rodillas apoyadas.", "No dejes que la cadera suba ni baje."]),
  E("Fondos en silla (Dips)", "Brazos", "🪑", "Intermedio", "Empuje (Tríceps, pecho inferior)", "reps", 3, 10,
    "Apoya las manos en el borde de una silla firme, con las piernas estiradas o dobladas al frente.",
    "Baja flexionando los codos hacia atrás hasta unos 90° y sube extendiendo los brazos.",
    ["Pega la espalda a la silla y no encojas los hombros.", "Apoya la silla contra una pared para que no se deslice."]),
  E("Pike push-up", "Hombros", "🔺", "Intermedio", "Empuje (Hombros)", "reps", 3, 8,
    "Forma una V invertida: cadera arriba, manos y pies en el suelo, brazos y piernas estirados.",
    "Flexiona los codos llevando la cabeza hacia el suelo entre las manos y empuja de vuelta.",
    ["Cuanto más cerca estén los pies de las manos, más difícil.", "Mantén la cadera alta durante todo el movimiento."]),
  E("Archer push-up", "Pecho", "🏹", "Avanzado", "Empuje (Pecho, un brazo a la vez)", "reps", 3, 6,
    "Posición de flexión con las manos muy abiertas, más anchas que los hombros.",
    "Baja hacia una mano mientras el otro brazo queda estirado al lado, y sube; alterna lados.",
    ["El brazo estirado solo guía, el otro hace la fuerza.", "Empieza con pocas repeticiones y buen control."]),
  E("Dominadas (Pull-ups)", "Espalda", "🧗", "Avanzado", "Jalón (Espalda, dorsal)", "reps", 4, 6,
    "Cuelga de la barra con las palmas al frente y agarre más ancho que los hombros.",
    "Jala hasta que la barbilla pase la barra y baja controlado hasta extender los brazos.",
    ["Evita balancearte o usar impulso.", "Baja despacio: ahí también se gana fuerza."]),
  E("Dominadas supinas (Chin-ups)", "Brazos", "🙌", "Intermedio", "Jalón (Bíceps y dorsal)", "reps", 3, 8,
    "Cuelga de la barra con las palmas hacia ti y agarre a la anchura de los hombros.",
    "Sube hasta pasar la barbilla de la barra y baja controlado.",
    ["Aprieta los omóplatos al subir.", "No dejes caer el cuerpo de golpe al bajar."]),
  E("Remo invertido", "Espalda", "🚣", "Principiante", "Jalón (Espalda media)", "reps", 3, 12,
    "Acuéstate bajo una barra o mesa firme, agárrala y mantén el cuerpo recto con los talones en el suelo.",
    "Jala el pecho hacia la barra juntando los omóplatos y baja controlado.",
    ["Cuerpo recto como una tabla, sin hundir la cadera.", "Prueba que la mesa o barra aguante tu peso antes de empezar."]),
  E("Superman", "Espalda", "🦸", "Principiante", "Cadena posterior (Espalda baja, glúteos)", "reps", 3, 12,
    "Boca abajo, con los brazos estirados al frente y las piernas extendidas.",
    "Eleva brazos y piernas a la vez, mantén un segundo arriba y baja con control.",
    ["Mira al suelo para no forzar el cuello.", "Aprieta los glúteos al subir."]),
  E("Sentadillas (Squats)", "Piernas", "🦵", "Principiante", "Piernas (Cuádriceps, glúteos)", "reps", 4, 15,
    "De pie, con los pies a la anchura de los hombros y las puntas ligeramente hacia afuera.",
    "Baja llevando la cadera atrás hasta que los muslos queden paralelos al suelo y sube empujando con los talones.",
    ["Rodillas alineadas con los pies, sin que se vayan hacia dentro.", "Mantén la espalda recta y el pecho arriba."]),
  E("Zancadas (Lunges)", "Piernas", "🚶", "Principiante", "Piernas (Cuádriceps, glúteos)", "reps", 3, 10,
    "De pie con los pies juntos y las manos en la cintura.",
    "Da un paso largo al frente y baja hasta que ambas rodillas estén a unos 90°; empuja para volver.",
    ["La rodilla delantera no debe pasar mucho la punta del pie.", "Cuenta las repeticiones de cada pierna."]),
  E("Sentadilla búlgara", "Piernas", "🏔️", "Intermedio", "Piernas (Glúteos y cuádriceps por pierna)", "reps", 3, 10,
    "De espaldas a una silla firme, apoya el empeine de un pie sobre ella y da un paso al frente con la otra pierna.",
    "Baja flexionando la pierna delantera hasta que el muslo quede paralelo al suelo y sube.",
    ["Casi todo el peso va en la pierna de adelante.", "Cuenta las repeticiones de cada pierna."]),
  E("Puente de glúteo", "Piernas", "🌉", "Principiante", "Cadena posterior (Glúteos, femorales)", "reps", 3, 15,
    "Boca arriba, rodillas dobladas y pies apoyados en el suelo, brazos a los lados.",
    "Eleva la cadera hasta formar una línea recta de hombros a rodillas y baja controlado.",
    ["Aprieta los glúteos arriba y mantén un segundo.", "No arquees la zona lumbar."]),
  E("Sentadilla con salto", "Piernas", "🦘", "Intermedio", "Piernas (Potencia, cuádriceps, glúteos)", "reps", 3, 10,
    "Posición de sentadilla con los pies a la anchura de los hombros.",
    "Baja a sentadilla y salta explosivo hacia arriba; aterriza suave y repite.",
    ["Aterriza con las rodillas flexionadas para amortiguar.", "Si te duelen las rodillas, haz sentadillas normales."]),
  E("Plancha (Plank)", "Core", "🧱", "Principiante", "Core (Abdomen, zona media)", "time", 3, 30,
    "Apoya antebrazos y puntas de los pies en el suelo, con los codos bajo los hombros.",
    "Mantén el cuerpo recto de cabeza a talones, apretando abdomen y glúteos, durante todo el tiempo.",
    ["No hundas ni subas la cadera.", "Respira de forma constante, sin aguantar el aire."]),
  E("Plancha lateral", "Core", "📐", "Intermedio", "Core (Oblicuos)", "time", 3, 20,
    "De lado, apoya un antebrazo en el suelo con el codo bajo el hombro y los pies apilados.",
    "Eleva la cadera hasta formar una línea recta y mantén; luego cambia de lado.",
    ["El tiempo es por lado: haz una serie de cada lado.", "Mira al frente y no dejes caer la cadera."]),
  E("Elevación de piernas", "Core", "🦿", "Intermedio", "Core (Abdomen bajo)", "reps", 3, 12,
    "Boca arriba con las piernas estiradas y las manos bajo la cadera o a los lados.",
    "Sube las piernas juntas hasta 90° y bájalas despacio sin tocar el suelo.",
    ["Pega la zona lumbar al suelo todo el tiempo.", "Si te duele la espalda, dobla un poco las rodillas."]),
  E("Abdominales (Crunches)", "Core", "🔥", "Principiante", "Core (Abdomen superior)", "reps", 3, 20,
    "Boca arriba con las rodillas dobladas y las manos cruzadas sobre el pecho o junto a las sienes.",
    "Sube los hombros del suelo contrayendo el abdomen y baja controlado.",
    ["No jales el cuello con las manos.", "Sube con el abdomen, no con el impulso."]),
  E("Hollow hold", "Core", "🌙", "Avanzado", "Core (Abdomen profundo)", "time", 3, 20,
    "Boca arriba con los brazos estirados sobre la cabeza y las piernas extendidas.",
    "Eleva hombros y piernas del suelo dejando la zona lumbar pegada, y mantén la forma de banana.",
    ["Si es muy difícil, dobla un poco las rodillas.", "La zona lumbar siempre pegada al suelo."]),
  E("Mountain climbers", "Cardio", "⛰️", "Principiante", "Cardio (Core, hombros, piernas)", "reps", 3, 30,
    "Posición de flexión con los brazos estirados y el cuerpo recto.",
    "Lleva una rodilla al pecho y cambia de pierna rápidamente, como si corrieras en el suelo.",
    ["Mantén la cadera baja, a la altura de la espalda.", "Cuenta cada rodilla como una repetición."]),
  E("Burpees", "Cardio", "🏃", "Intermedio", "Cardio (Cuerpo completo)", "reps", 3, 10,
    "De pie con los pies a la anchura de los hombros.",
    "Baja a posición de flexión, haz una flexión, recoge los pies al pecho y salta hacia arriba con los brazos extendidos.",
    ["Ve a un ritmo que puedas mantener con buena técnica.", "Puedes quitar la flexión si estás empezando."]),
  E("Jumping jacks", "Cardio", "⭐", "Principiante", "Cardio (Cuerpo completo)", "reps", 3, 30,
    "De pie con los pies juntos y los brazos a los lados.",
    "Salta abriendo las piernas y subiendo los brazos sobre la cabeza, y vuelve a la posición inicial.",
    ["Aterriza suave sobre la punta de los pies.", "Mantén un ritmo constante."]),
  E("Escaladores de pared (Wall walk)", "Hombros", "🧗‍♂️", "Avanzado", "Empuje (Hombros, core)", "reps", 3, 5,
    "Boca abajo con los pies pegados a una pared, en posición de flexión.",
    "Camina con los pies hacia arriba por la pared mientras acercas las manos hacia ella, y vuelve despacio.",
    ["Ve poco a poco y para si te mareas o te duelen las muñecas.", "Mantén el abdomen apretado."]),
];

const CAT_COLORS = {
  Pecho: "#e63946", Espalda: "#4895ef", Piernas: "#2a9d8f", Core: "#f4a261",
  Hombros: "#9b5de5", Brazos: "#f15bb5", Cardio: "#ffd166", Otro: "#888"
};

const byName = name => exercises.find(e => e.name === name);
const mk = name => { const e = byName(name); return { name, sets: e.sets, target: e.target }; };

function defaultRoutines() {
  return [
    { id: "push", icon: "💪", name: "Lunes — Push", sub: "Empuje · Pecho, hombros y tríceps",
      exercises: ["Flexiones (Push-ups)", "Flexiones declinadas", "Fondos en silla (Dips)", "Pike push-up", "Flexiones diamante"].map(mk) },
    { id: "pull", icon: "🧗", name: "Miércoles — Pull", sub: "Jalón · Espalda y bíceps",
      exercises: ["Dominadas (Pull-ups)", "Remo invertido", "Dominadas supinas (Chin-ups)", "Superman"].map(mk) },
    { id: "legs", icon: "🦵", name: "Viernes — Legs + Core", sub: "Piernas · Glúteos y abdomen",
      exercises: ["Sentadillas (Squats)", "Zancadas (Lunges)", "Sentadilla búlgara", "Puente de glúteo", "Plancha (Plank)", "Elevación de piernas"].map(mk) },
  ];
}

/* ===================== ESTADO ===================== */
let profile = load("cal-profile", { name: "", height: "", weight: "", goal: 3 });
let routines = load("cal2-routines", defaultRoutines());
let history = load("cal2-history", []);
const editing = new Set();

const saveRoutines = () => save("cal2-routines", routines);
const saveHistory = () => save("cal2-history", history);

function startOfWeek() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return d;
}
function weekStats() {
  const goal = Number(profile.goal) || 3;
  const count = history.filter(h => new Date(h.date) >= startOfWeek()).length;
  return { goal, count, pct: Math.min(100, Math.round((count / goal) * 100)) };
}
function dayLabel(iso) {
  const d = new Date(iso); d.setHours(0, 0, 0, 0);
  const t = new Date(); t.setHours(0, 0, 0, 0);
  const diff = Math.round((t - d) / 86400000);
  if (diff === 0) return "Hoy";
  if (diff === 1) return "Ayer";
  return d.toLocaleDateString("es", { weekday: "short", day: "numeric", month: "short" });
}
const fmtTarget = e => `${e.sets} x ${e.target}${byName(e.name)?.type === "time" ? "s" : ""}`;

/* ===================== NAVEGACIÓN ===================== */
function showView(v) {
  $$(".view").forEach(s => s.classList.toggle("active", s.id === v));
  $$(".nav-btn").forEach(b => b.classList.toggle("active", b.dataset.view === v));
  if (v === "train") renderTrain();
  if (v === "progress") renderProgress();
  window.scrollTo({ top: 0 });
}
$$(".nav-btn").forEach(b => b.addEventListener("click", () => showView(b.dataset.view)));
$$("dialog").forEach(d => d.addEventListener("click", e => { if (e.target === d) d.close(); }));

/* ===================== PERFIL ===================== */
function renderProfile() {
  $("#greeting").textContent = profile.name ? `¡Vamos, ${profile.name}! 🔥` : "";
  $("#profile-btn").textContent = profile.name ? profile.name[0].toUpperCase() : "👤";
  const h = Number(profile.height) / 100, w = Number(profile.weight);
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
$("#profile-btn").addEventListener("click", () => {
  $("#p-name").value = profile.name;
  $("#p-height").value = profile.height;
  $("#p-weight").value = profile.weight;
  $("#p-goal").value = profile.goal || 3;
  renderProfile();
  $("#profile-dialog").showModal();
});
$("#profile-close").addEventListener("click", () => $("#profile-dialog").close());
$("#save-profile").addEventListener("click", () => {
  profile = {
    name: $("#p-name").value.trim(),
    height: $("#p-height").value,
    weight: $("#p-weight").value,
    goal: Math.min(7, Math.max(1, Number($("#p-goal").value) || 3)),
  };
  save("cal-profile", profile);
  renderProfile();
  renderTrain();
  renderProgress();
  $("#profile-dialog").close();
  toast("Perfil guardado ✅");
});
$("#restore-routines").addEventListener("click", () => {
  if (confirm("Esto reemplaza TODAS tus rutinas por las 3 originales. ¿Continuar?")) {
    routines = defaultRoutines();
    editing.clear();
    saveRoutines();
    renderRoutines();
    renderTrain();
    $("#profile-dialog").close();
    toast("Rutinas restauradas");
  }
});

/* ===================== LIBRERÍA ===================== */
let currentExercise = null;

function renderLibrary() {
  const box = $("#exercise-list");
  box.innerHTML = "";
  exercises.forEach(ex => {
    const card = document.createElement("div");
    card.className = "ex-card";
    card.innerHTML = `
      <div class="ex-ico">${ex.icon}</div>
      <div class="ex-text">
        <div class="ex-name">${ex.name}</div>
        <div class="ex-sub">${ex.muscles}</div>
      </div>
      <div class="ex-side">
        <span class="lvl">${ex.level}</span>
        <button class="plus" type="button" aria-label="Añadir a una rutina">+</button>
      </div>`;
    card.addEventListener("click", () => openExercise(ex.name));
    $(".plus", card).addEventListener("click", e => { e.stopPropagation(); openAddDialog(ex.name); });
    box.appendChild(card);
  });
}

function openExercise(name) {
  const ex = byName(name);
  currentExercise = name;
  $("#ex-d-icon").textContent = ex.icon;
  $("#ex-d-title").textContent = ex.name;
  $("#ex-d-body").innerHTML = `
    <div class="chip-row"><span class="chip-label">Músculos<br>Afectados:</span><span class="chip-pink">${ex.muscles}</span></div>
    <div class="step-card"><div class="step-title"><b>1</b> POSICIÓN INICIAL</div><p>${ex.start}</p></div>
    <div class="step-card"><div class="step-title"><b>2</b> EJECUCIÓN CORRECTA</div><p>${ex.exec}</p></div>
    <div class="step-card"><div class="step-title">💡 TIPS CLAVE DE TÉCNICA</div>
      <ul class="tips">${ex.tips.map(t => `<li>${t}</li>`).join("")}</ul></div>
    <p class="hint-mono">Nivel: ${ex.level} · Meta sugerida: ${ex.sets} x ${ex.target}${ex.type === "time" ? " segundos" : ""}</p>`;
  $("#ex-dialog").showModal();
}
$("#ex-d-close").addEventListener("click", () => $("#ex-dialog").close());
$("#ex-d-ok").addEventListener("click", () => $("#ex-dialog").close());
$("#ex-d-add").addEventListener("click", () => {
  $("#ex-dialog").close();
  openAddDialog(currentExercise);
});

/* ---- Añadir a una rutina ---- */
let pendingExercise = null;

function addToRoutine(routineId, exerciseName) {
  const r = routines.find(x => x.id === routineId);
  if (!r) return;
  if (r.exercises.some(e => e.name === exerciseName)) { toast("Ya está en esa rutina"); return; }
  r.exercises.push(mk(exerciseName));
  saveRoutines();
  renderRoutines();
  renderTrain();
  toast(`Añadido a ${r.name}`);
}
function createRoutine(name) {
  const r = { id: "r" + Date.now(), icon: "🔥", name, sub: "Rutina personalizada", exercises: [] };
  routines.push(r);
  saveRoutines();
  return r.id;
}
function openAddDialog(exerciseName) {
  pendingExercise = exerciseName;
  $("#add-title").textContent = "Añadir a...";
  const box = $("#add-options");
  box.innerHTML = "";
  routines.forEach(r => {
    const has = r.exercises.some(e => e.name === exerciseName);
    const b = document.createElement("button");
    b.type = "button";
    b.className = "option-btn";
    b.innerHTML = `<span>${r.icon} ${esc(r.name)}</span><small>${has ? "✓ ya incluido" : r.exercises.length + " ejercicios"}</small>`;
    b.addEventListener("click", () => { addToRoutine(r.id, pendingExercise); $("#add-dialog").close(); });
    box.appendChild(b);
  });
  $("#add-dialog").showModal();
}
$("#add-close").addEventListener("click", () => $("#add-dialog").close());
$("#add-new").addEventListener("click", () => {
  const name = prompt("Nombre de la nueva rutina:");
  if (name && name.trim()) {
    const id = createRoutine(name.trim());
    addToRoutine(id, pendingExercise);
    $("#add-dialog").close();
  }
});

/* ===================== RUTINAS ===================== */
function renderRoutines() {
  const box = $("#routine-list");
  box.innerHTML = "";
  routines.forEach(r => {
    const isEdit = editing.has(r.id);
    const rows = r.exercises.map((e, i) => `
      <li>
        <span class="bullet">•</span>
        <span class="grow">${esc(e.name)}</span>
        <button class="sxr ${isEdit ? "edit" : ""}" data-i="${i}" type="button">${fmtTarget(e)}</button>
        ${isEdit ? `<button class="rm" data-i="${i}" type="button" aria-label="Quitar">×</button>` : ""}
      </li>`).join("");

    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="rt-head">
        <div class="grow"><h3>${esc(r.name)}</h3><p>${esc(r.sub || "")}</p></div>
        <button class="btn-pink sm start" type="button">▶ Entrenar</button>
      </div>
      <ul class="rt-list">${rows || '<li class="empty">Sin ejercicios. Añádelos desde la Librería con el botón +</li>'}</ul>
      <div class="rt-foot">
        <button class="link edit" type="button">${isEdit ? "✓ Listo" : "✏️ Editar"}</button>
        ${isEdit ? '<button class="link rename" type="button">Renombrar</button><button class="link danger del" type="button">Eliminar rutina</button>' : ""}
      </div>`;

    $(".start", card).addEventListener("click", () => startWorkout(r.id));
    $(".edit", card).addEventListener("click", () => {
      isEdit ? editing.delete(r.id) : editing.add(r.id);
      renderRoutines();
    });
    if (isEdit) {
      $(".rename", card).addEventListener("click", () => {
        const name = prompt("Nuevo nombre de la rutina:", r.name);
        if (name && name.trim()) { r.name = name.trim(); saveRoutines(); renderRoutines(); renderTrain(); }
      });
      $(".del", card).addEventListener("click", () => {
        if (confirm(`¿Eliminar la rutina "${r.name}"?`)) {
          routines = routines.filter(x => x.id !== r.id);
          editing.delete(r.id);
          saveRoutines(); renderRoutines(); renderTrain();
        }
      });
      $$(".rm", card).forEach(b => b.addEventListener("click", () => {
        r.exercises.splice(Number(b.dataset.i), 1);
        saveRoutines(); renderRoutines(); renderTrain();
      }));
      $$(".sxr", card).forEach(b => b.addEventListener("click", () => {
        const e = r.exercises[Number(b.dataset.i)];
        const isTime = byName(e.name)?.type === "time";
        const v = prompt(isTime ? "Series x segundos (ej: 3x30)" : "Series x repeticiones (ej: 4x10)", `${e.sets}x${e.target}`);
        if (v === null) return;
        const m = String(v).match(/^\s*(\d+)\s*[xX×*]\s*(\d+)\s*$/);
        if (!m || Number(m[1]) < 1 || Number(m[2]) < 1) { alert("Formato no válido. Escribe algo como 4x10."); return; }
        e.sets = Number(m[1]); e.target = Number(m[2]);
        saveRoutines(); renderRoutines(); renderTrain();
      }));
    }
    box.appendChild(card);
  });
}
$("#new-routine").addEventListener("click", () => {
  const name = prompt("Nombre de la nueva rutina:");
  if (name && name.trim()) {
    const id = createRoutine(name.trim());
    editing.add(id);
    renderRoutines();
    renderTrain();
    toast("Rutina creada. Añade ejercicios desde la Librería con +");
  }
});

/* ===================== ENTRENAR (selector) ===================== */
function renderTrain() {
  const w = weekStats();
  $("#train-week").innerHTML = `
    <div class="kicker">ESTA SEMANA</div>
    <div class="wk-meta"><span>${w.count} de ${w.goal} entrenamientos</span><span>${w.pct}%</span></div>
    <div class="progress"><i style="width:${w.pct}%"></i></div>`;
  const list = $("#train-list");
  list.innerHTML = "";
  routines.forEach(r => {
    const sets = r.exercises.reduce((a, e) => a + e.sets, 0);
    const card = document.createElement("div");
    card.className = "card train-card";
    card.innerHTML = `
      <div class="rt-ico">${r.icon}</div>
      <div class="grow"><h3>${esc(r.name)}</h3><p>${r.exercises.length} ejercicios • ${sets} series</p></div>
      <button class="btn-pink sm" type="button">▶ Empezar</button>`;
    $("button", card).addEventListener("click", () => startWorkout(r.id));
    list.appendChild(card);
  });
}

/* ===================== MODO ENTRENAMIENTO (paso a paso) ===================== */
const REST_SET = 60, REST_EX = 90;
let wk = null, tickId = null, audioCtx = null, wakeLock = null;

async function lockScreen() { try { wakeLock = await navigator.wakeLock?.request("screen"); } catch {} }
function unlockScreen() { try { wakeLock?.release(); } catch {} wakeLock = null; }
function beep() {
  try {
    if (!audioCtx) return;
    const o = audioCtx.createOscillator(), g = audioCtx.createGain();
    o.connect(g); g.connect(audioCtx.destination);
    o.frequency.value = 880; g.gain.value = 0.08;
    o.start(); o.stop(audioCtx.currentTime + 0.18);
  } catch {}
}
function buzz() { try { navigator.vibrate && navigator.vibrate(250); } catch {} beep(); }

function startWorkout(id) {
  const r = routines.find(x => x.id === id);
  if (!r) return;
  if (!r.exercises.length) { alert("Esta rutina no tiene ejercicios todavía. Añádelos desde la Librería con +"); return; }
  try { audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)(); } catch {}
  wk = {
    r: { id: r.id, name: r.name, icon: r.icon },
    items: r.exercises.map(e => ({
      name: e.name, sets: e.sets, target: e.target,
      type: byName(e.name)?.type || "reps", done: [], skipped: false
    })),
    i: 0, phase: "work", startedAt: Date.now(), endedAt: null,
    hold: null, pendingNext: false, restEnd: 0, restTotal: 0, techOpen: false
  };
  lockScreen();
  clearInterval(tickId);
  tickId = setInterval(onTick, 1000);
  renderWorkout();
}

const restLeft = () => Math.max(0, Math.ceil((wk.restEnd - Date.now()) / 1000));
const holdLeft = () => {
  const h = wk.hold;
  return h.running ? Math.max(0, h.target - Math.floor((Date.now() - h.start) / 1000)) : h.target;
};

function onTick() {
  if (!wk) return;
  const clock = $("#wk-clock");
  if (clock) clock.textContent = fmt(Math.floor((Date.now() - wk.startedAt) / 1000));
  if (wk.phase === "rest") {
    const left = restLeft();
    const num = $("#rest-num"), bar = $("#rest-bar");
    if (num) num.textContent = fmt(left);
    if (bar) bar.style.width = (wk.restTotal ? (left / wk.restTotal) * 100 : 0) + "%";
    if (left <= 0) { buzz(); endRest(); }
  } else if (wk.phase === "work" && wk.hold && wk.hold.running) {
    const left = holdLeft();
    const num = $("#hold-num");
    if (num) num.textContent = fmt(left);
    if (left <= 0) { buzz(); completeSet(wk.hold.target); }
  }
}

function completeSet(value) {
  const it = wk.items[wk.i];
  wk.hold = null;
  it.done.push(value);
  if (it.done.length >= it.sets) {
    if (wk.i >= wk.items.length - 1) return finishWorkout();
    wk.pendingNext = true;
    startRest(REST_EX);
  } else {
    startRest(REST_SET);
  }
}
function startRest(sec) {
  wk.phase = "rest";
  wk.restTotal = sec;
  wk.restEnd = Date.now() + sec * 1000;
  renderWorkout();
}
function endRest() {
  if (wk.pendingNext) { wk.i++; wk.pendingNext = false; }
  wk.phase = "work";
  wk.hold = null;
  renderWorkout();
}
function toggleHold() {
  const h = wk.hold;
  if (!h.running) { h.running = true; h.start = Date.now(); renderWorkout(); return; }
  completeSet(Math.max(1, Math.floor((Date.now() - h.start) / 1000)));
}
function skipExercise() {
  if (!confirm("¿Saltar este ejercicio?")) return;
  wk.items[wk.i].skipped = true;
  wk.hold = null;
  if (wk.i >= wk.items.length - 1) return finishWorkout();
  wk.i++;
  wk.phase = "work";
  renderWorkout();
}
function saveSession(partial) {
  const items = wk.items.filter(it => it.done.length).map(it => ({ name: it.name, type: it.type, sets: it.done.slice() }));
  if (!items.length) return false;
  history.unshift({
    id: Date.now(), date: new Date(wk.startedAt).toISOString(),
    routineName: wk.r.name, icon: wk.r.icon,
    seconds: Math.floor(((wk.endedAt || Date.now()) - wk.startedAt) / 1000),
    partial, items
  });
  saveHistory();
  return true;
}
function finishWorkout() {
  wk.endedAt = Date.now();
  wk.phase = "done";
  clearInterval(tickId);
  unlockScreen();
  saveSession(false);
  buzz();
  renderWorkout();
}
function exitWorkout() {
  const any = wk.items.some(it => it.done.length);
  const msg = any ? "¿Terminar ahora? Se guardará lo que ya completaste." : "¿Salir del entrenamiento?";
  if (!confirm(msg)) return;
  wk.endedAt = Date.now();
  if (any) saveSession(true);
  closeWorkout();
  if (any) showView("progress");
}
function closeWorkout() {
  clearInterval(tickId);
  unlockScreen();
  wk = null;
  renderWorkout();
  renderTrain();
  renderProgress();
}

function bindWorkout() {
  const on = (sel, fn) => { const el = $(sel); if (el) el.addEventListener("click", fn); };
  on("#wk-exit", exitWorkout);
  on("#wk-skip", skipExercise);
  on("#set-done", () => {
    const v = Number($("#rep-input").value) || 0;
    if (v < 1) { alert("Pon cuántas repeticiones hiciste."); return; }
    completeSet(v);
  });
  on("#rep-minus", () => { const i = $("#rep-input"); i.value = Math.max(0, (Number(i.value) || 0) - 1); });
  on("#rep-plus", () => { const i = $("#rep-input"); i.value = (Number(i.value) || 0) + 1; });
  on("#hold-btn", toggleHold);
  on("#rest-skip", endRest);
  on("#rest-add", () => { wk.restEnd += 15000; wk.restTotal += 15; });
  on("#wk-finish", () => { closeWorkout(); showView("progress"); });
  const tech = $(".tech");
  if (tech) tech.addEventListener("toggle", e => { wk.techOpen = e.target.open; });
}

function renderWorkout() {
  const box = $("#workout");
  if (!wk) { box.classList.add("hidden"); box.innerHTML = ""; return; }
  box.classList.remove("hidden");

  if (wk.phase === "done") { renderSummary(box); bindWorkout(); box.scrollTop = 0; return; }

  const totalSets = wk.items.reduce((a, it) => a + (it.skipped ? it.done.length : it.sets), 0);
  const doneSets = wk.items.reduce((a, it) => a + it.done.length, 0);
  const pct = totalSets ? Math.round((doneSets / totalSets) * 100) : 0;
  const it = wk.items[wk.i];
  const meta = byName(it.name) || { icon: "•", muscles: "", level: "", start: "", exec: "", tips: [] };
  const isTime = it.type === "time";
  if (isTime && !wk.hold) wk.hold = { target: it.target, running: false, start: 0 };

  const steps = wk.items.map((x, idx) => {
    let cls = "step", txt = idx + 1;
    if (x.skipped) { cls += " skip"; txt = "⏭"; }
    else if (x.done.length >= x.sets) { cls += " done"; txt = "✓"; }
    if (idx === wk.i) cls += " current";
    return `<div class="${cls}">${txt}</div>`;
  }).join("");

  let panel = "";
  if (wk.phase === "rest") {
    const left = restLeft();
    const nxt = wk.pendingNext
      ? `Ejercicio ${wk.i + 2}: <b>${esc(wk.items[wk.i + 1].name)}</b>`
      : `Serie ${it.done.length + 1} de ${it.sets}: <b>${esc(it.name)}</b>`;
    panel = `
      <div class="wk-panel center">
        <div class="kicker">DESCANSO</div>
        <div class="big-timer" id="rest-num">${fmt(left)}</div>
        <div class="progress"><i id="rest-bar" style="width:${wk.restTotal ? (left / wk.restTotal) * 100 : 0}%"></i></div>
        <p class="next-up">Sigue: ${nxt}</p>
        <div class="row-btns">
          <button class="ghost" id="rest-add" type="button">+15 s</button>
          <button class="btn-pink" id="rest-skip" type="button">Saltar descanso</button>
        </div>
      </div>`;
  } else {
    const dots = Array.from({ length: it.sets }, (_, k) => {
      const d = k < it.done.length;
      const c = d ? "done" : (k === it.done.length ? "current" : "");
      return `<span class="dot-chip ${c}">${d ? it.done[k] + (isTime ? "s" : "") : k + 1}</span>`;
    }).join("");
    const control = isTime
      ? `<div class="big-timer" id="hold-num">${fmt(holdLeft())}</div>
         <button class="btn-pink big" id="hold-btn" type="button">${wk.hold.running ? "■ Terminar serie" : "▶ Iniciar"}</button>`
      : `<div class="num-input">
           <button id="rep-minus" type="button">−</button>
           <input id="rep-input" type="number" inputmode="numeric" min="0" value="${it.target}">
           <button id="rep-plus" type="button">+</button>
         </div>
         <div class="num-label">Repeticiones que hiciste</div>
         <button class="btn-pink big" id="set-done" type="button">✓ Completar serie</button>`;
    panel = `
      <div class="wk-panel">
        <div class="kicker">SERIE ${it.done.length + 1} DE ${it.sets}</div>
        <div class="dots">${dots}</div>
        <div class="target">Meta: <b>${it.target} ${isTime ? "segundos" : "repeticiones"}</b></div>
        ${control}
        <button class="ghost" id="wk-skip" type="button">Saltar ejercicio</button>
      </div>`;
  }

  box.innerHTML = `
    <div class="wk-inner">
      <div class="wk-top">
        <button class="x-btn" id="wk-exit" type="button" aria-label="Salir">✕</button>
        <div class="title">${esc(wk.r.name)}</div>
        <div class="wk-clock" id="wk-clock">${fmt(Math.floor((Date.now() - wk.startedAt) / 1000))}</div>
      </div>
      <div>
        <div class="wk-meta"><span>${doneSets} de ${totalSets} series</span><span>${pct}%</span></div>
        <div class="progress"><i style="width:${pct}%"></i></div>
      </div>
      <div class="stepper">${steps}</div>
      <div class="wk-card">
        <div class="wk-ex-head">
          <div class="ex-ico big">${meta.icon}</div>
          <div>
            <div class="kicker">EJERCICIO ${wk.i + 1} DE ${wk.items.length}</div>
            <div class="wk-ex-name">${esc(it.name)}</div>
            <div class="ex-sub">${meta.muscles}</div>
          </div>
        </div>
        <details class="tech" ${wk.techOpen ? "open" : ""}>
          <summary>Cómo ejecutarlo</summary>
          <p><b>Posición:</b> ${meta.start}</p>
          <p><b>Ejecución:</b> ${meta.exec}</p>
          <ul>${meta.tips.map(t => `<li>${t}</li>`).join("")}</ul>
        </details>
      </div>
      ${panel}
    </div>`;
  bindWorkout();
}

function renderSummary(box) {
  const secs = Math.floor((wk.endedAt - wk.startedAt) / 1000);
  const sets = wk.items.reduce((a, it) => a + it.done.length, 0);
  const reps = wk.items.reduce((a, it) => a + (it.type === "time" ? 0 : it.done.reduce((x, y) => x + y, 0)), 0);
  const rows = wk.items.map(it => `
    <div class="sum-row">
      <span>${esc(it.name)}</span>
      <span>${it.done.length ? it.done.map(v => v + (it.type === "time" ? "s" : "")).join(" · ") : "saltado"}</span>
    </div>`).join("");
  box.innerHTML = `
    <div class="wk-inner">
      <div class="trophy">🏆</div>
      <h2>¡Entrenamiento completado!</h2>
      <p class="sub">${esc(wk.r.name)}</p>
      <div class="stats3">
        <div class="stat"><strong>${fmt(secs)}</strong><span>Tiempo</span></div>
        <div class="stat"><strong>${sets}</strong><span>Series</span></div>
        <div class="stat"><strong>${reps}</strong><span>Repeticiones</span></div>
      </div>
      <div class="card">${rows}</div>
      <button class="btn-pink big" id="wk-finish" type="button">Ver mi progreso</button>
    </div>`;
}

/* ===================== PROGRESO ===================== */
function renderProgress() {
  const w = weekStats();
  $("#week-text").textContent = `${w.count} de ${w.goal} entrenamientos`;
  $("#week-pct").textContent = w.pct + "%";
  $("#week-fill").style.width = w.pct + "%";

  let totalSets = 0, totalReps = 0;
  const perEx = {}, perCat = {};
  history.forEach(s => s.items.forEach(it => {
    const n = it.sets.length;
    totalSets += n;
    if (it.type !== "time") totalReps += it.sets.reduce((a, b) => a + b, 0);
    perEx[it.name] = (perEx[it.name] || 0) + n;
    const cat = byName(it.name)?.cat || "Otro";
    perCat[cat] = (perCat[cat] || 0) + n;
  }));
  $("#stat-sessions").textContent = history.length;
  $("#stat-sets").textContent = totalSets;
  $("#stat-reps").textContent = totalReps;

  /* Barras por ejercicio */
  const bars = $("#exercise-bars");
  const top = Object.entries(perEx).sort((a, b) => b[1] - a[1]).slice(0, 6);
  if (!top.length) {
    bars.innerHTML = '<p class="view-sub" style="margin:0">Aún no hay datos. Completa tu primer entrenamiento.</p>';
  } else {
    const max = top[0][1];
    bars.innerHTML = top.map(([name, n]) => `
      <div class="bar-row">
        <div class="bar-label"><span>${esc(name)}</span><span class="mono-pink">${n}</span></div>
        <div class="progress"><i style="width:${Math.round((n / max) * 100)}%"></i></div>
      </div>`).join("");
  }

  /* Gráfica de pastel */
  const pie = $("#pie"), legend = $("#pie-legend");
  const entries = Object.entries(perCat).sort((a, b) => b[1] - a[1]);
  if (!entries.length) {
    pie.style.background = "#232838";
    legend.innerHTML = '<li style="color:#9aa1b5">Sin datos todavía</li>';
  } else {
    let acc = 0;
    const stops = entries.map(([cat, val]) => {
      const from = (acc / totalSets) * 100;
      acc += val;
      return `${CAT_COLORS[cat] || CAT_COLORS.Otro} ${from}% ${(acc / totalSets) * 100}%`;
    });
    pie.style.background = `conic-gradient(${stops.join(", ")})`;
    legend.innerHTML = entries.map(([cat, val]) => `
      <li><span class="dot" style="background:${CAT_COLORS[cat] || CAT_COLORS.Otro}"></span>
      ${esc(cat)} — ${Math.round((val / totalSets) * 100)}%</li>`).join("");
  }

  /* Sesiones */
  const list = $("#session-list");
  if (!history.length) {
    list.innerHTML = '<p class="view-sub">Todavía no hay sesiones guardadas.</p>';
    return;
  }
  list.innerHTML = history.map(s => {
    const sets = s.items.reduce((a, it) => a + it.sets.length, 0);
    const mins = Math.max(1, Math.round((s.seconds || 0) / 60));
    const details = s.items.map(it => `
      <div class="det-row"><span>${esc(it.name)}</span>
      <span>${it.sets.map(v => v + (it.type === "time" ? "s" : "")).join(" · ")}</span></div>`).join("");
    return `
      <div class="card sess" data-id="${s.id}">
        <div class="sess-top">
          <div class="grow">
            <div class="sess-name">${esc(s.routineName)}${s.partial ? " <em>(parcial)</em>" : ""}</div>
            <div class="sess-sub">${dayLabel(s.date)} • ${mins} min</div>
          </div>
          <div class="mono-pink big">${sets} Series</div>
        </div>
        <div class="sess-det">
          ${details}
          <button class="link danger del-sess" data-id="${s.id}" type="button">🗑️ Borrar sesión</button>
        </div>
      </div>`;
  }).join("");

  $$("#session-list .sess").forEach(c => c.addEventListener("click", () => c.classList.toggle("open")));
  $$("#session-list .del-sess").forEach(b => b.addEventListener("click", e => {
    e.stopPropagation();
    if (confirm("¿Borrar esta sesión del historial?")) {
      history = history.filter(h => String(h.id) !== b.dataset.id);
      saveHistory();
      renderProgress();
      renderTrain();
    }
  }));
}

/* ===================== INICIO ===================== */
renderProfile();
renderLibrary();
renderRoutines();
renderTrain();
renderProgress();
