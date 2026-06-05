const STORAGE_KEY = "medtrack-demo-state";

const demoMedicines = [
  {
    id: crypto.randomUUID(),
    name: "Amoxicillin",
    dose: "500mg",
    days: 7,
    times: ["08:00", "20:00"],
    note: "Take after meals.",
    createdAt: new Date().toISOString(),
    taken: {}
  },
  {
    id: crypto.randomUUID(),
    name: "Vitamin D3",
    dose: "1000 IU",
    days: 30,
    times: ["12:30"],
    note: "Take with lunch.",
    createdAt: new Date().toISOString(),
    taken: {}
  }
];

let medicines = loadState();

const form = document.querySelector("#medicineForm");
const scheduleList = document.querySelector("#scheduleList");
const medicineList = document.querySelector("#medicineList");
const todayProgress = document.querySelector("#todayProgress");
const todayProgressBar = document.querySelector("#todayProgressBar");
const todaySummary = document.querySelector("#todaySummary");
const activeMeds = document.querySelector("#activeMeds");
const dailyDoses = document.querySelector("#dailyDoses");
const completedDoses = document.querySelector("#completedDoses");
const resetToday = document.querySelector("#resetToday");
const seedDemo = document.querySelector("#seedDemo");
const exportData = document.querySelector("#exportData");
const importData = document.querySelector("#importData");
const importFile = document.querySelector("#importFile");
const clearData = document.querySelector("#clearData");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const times = parseTimes(data.get("times"));

  if (!times.length) {
    alert("Enter times in 24-hour format, for example 08:00, 20:00.");
    return;
  }

  medicines.unshift({
    id: crypto.randomUUID(),
    name: data.get("name").trim(),
    dose: data.get("dose").trim(),
    days: Number(data.get("days")),
    times,
    note: data.get("note").trim(),
    createdAt: new Date().toISOString(),
    taken: {}
  });

  form.reset();
  document.querySelector("#medicineDays").value = 7;
  saveAndRender();
});

resetToday.addEventListener("click", () => {
  const today = getTodayKey();
  medicines = medicines.map((medicine) => ({
    ...medicine,
    taken: Object.fromEntries(Object.entries(medicine.taken).filter(([key]) => !key.endsWith(`|${today}`)))
  }));
  saveAndRender();
});

seedDemo.addEventListener("click", () => {
  medicines = cloneDemo();
  saveAndRender();
});

exportData.addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(medicines, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `medtrack-backup-${getTodayKey()}.json`;
  link.click();
  URL.revokeObjectURL(url);
});

importData.addEventListener("click", () => {
  importFile.click();
});

importFile.addEventListener("change", async () => {
  const [file] = importFile.files;
  if (!file) return;

  try {
    const imported = JSON.parse(await file.text());
    medicines = normalizeImportedMedicines(imported);
    saveAndRender();
  } catch {
    alert("That file is not a valid MedTrack JSON backup.");
  } finally {
    importFile.value = "";
  }
});

clearData.addEventListener("click", () => {
  if (!confirm("Clear all medication data stored in this browser?")) return;
  medicines = [];
  saveAndRender();
});

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return cloneDemo();

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : cloneDemo();
  } catch {
    return cloneDemo();
  }
}

function cloneDemo() {
  return demoMedicines.map((medicine) => ({
    ...medicine,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    taken: {}
  }));
}

function saveAndRender() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(medicines));
  render();
}

function render() {
  renderToday();
  renderMedicines();
}

function renderToday() {
  const today = getTodayKey();
  const doses = medicines
    .flatMap((medicine) =>
      medicine.times.map((time) => ({
        medicine,
        time,
        key: buildTakenKey(medicine.id, time, today),
        done: Boolean(medicine.taken[buildTakenKey(medicine.id, time, today)])
      }))
    )
    .sort((a, b) => a.time.localeCompare(b.time));

  const doneCount = doses.filter((dose) => dose.done).length;
  const percentage = doses.length ? Math.round((doneCount / doses.length) * 100) : 0;

  todayProgress.textContent = `${percentage}%`;
  todayProgressBar.style.width = `${percentage}%`;
  todaySummary.textContent = doses.length
    ? `${doneCount}/${doses.length} doses confirmed.`
    : "No doses scheduled.";
  activeMeds.textContent = medicines.length;
  dailyDoses.textContent = doses.length;
  completedDoses.textContent = doneCount;

  if (!doses.length) {
    scheduleList.innerHTML = `<div class="empty">Add medication to build today's schedule.</div>`;
    return;
  }

  scheduleList.innerHTML = doses
    .map(
      ({ medicine, time, done }) => `
        <article class="dose-row ${done ? "done" : ""}">
          <span class="time-chip">${escapeHtml(time)}</span>
          <div>
            <p class="dose-title">${escapeHtml(medicine.name)}</p>
            <p class="dose-meta">${escapeHtml(medicine.dose)}${medicine.note ? ` - ${escapeHtml(medicine.note)}` : ""}</p>
          </div>
          <button class="${done ? "ghost" : "primary"}" data-action="toggle-dose" data-id="${medicine.id}" data-time="${time}">
            ${done ? "Taken" : "Mark taken"}
          </button>
        </article>
      `
    )
    .join("");
}

function renderMedicines() {
  if (!medicines.length) {
    medicineList.innerHTML = `<div class="empty">No medication added yet.</div>`;
    return;
  }

  medicineList.innerHTML = medicines
    .map((medicine) => {
      const progress = getTreatmentProgress(medicine);
      return `
        <article class="medicine-card">
          <div>
            <p class="medicine-title">${escapeHtml(medicine.name)}</p>
            <p class="medicine-meta">${escapeHtml(medicine.dose)} - ${medicine.times.join(", ")} - ${medicine.days} days</p>
            <p class="medicine-meta">${progress.elapsed}/${medicine.days} treatment days, ${progress.percent}% complete</p>
            <p class="medicine-meta">${getTakenCount(medicine)} total confirmed doses</p>
            <div class="medicine-progress" aria-label="Treatment progress">
              <span style="width: ${progress.percent}%"></span>
            </div>
          </div>
          <div class="medicine-actions">
            <button class="danger" data-action="delete-medicine" data-id="${medicine.id}">Delete</button>
          </div>
        </article>
      `;
    })
    .join("");
}

document.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const { action, id, time } = button.dataset;

  if (action === "toggle-dose") {
    const today = getTodayKey();
    medicines = medicines.map((medicine) => {
      if (medicine.id !== id) return medicine;
      const key = buildTakenKey(id, time, today);
      const taken = { ...medicine.taken };
      if (taken[key]) {
        delete taken[key];
      } else {
        taken[key] = new Date().toISOString();
      }
      return { ...medicine, taken };
    });
  }

  if (action === "delete-medicine") {
    medicines = medicines.filter((medicine) => medicine.id !== id);
  }

  saveAndRender();
});

function parseTimes(value) {
  return String(value)
    .split(",")
    .map((time) => time.trim())
    .filter((time) => /^([01]\d|2[0-3]):[0-5]\d$/.test(time))
    .sort();
}

function getTreatmentProgress(medicine) {
  const start = startOfDay(new Date(medicine.createdAt));
  const now = startOfDay(new Date());
  const elapsed = Math.min(medicine.days, Math.max(1, Math.floor((now - start) / 86400000) + 1));
  return {
    elapsed,
    percent: Math.round((elapsed / medicine.days) * 100)
  };
}

function getTakenCount(medicine) {
  return Object.keys(medicine.taken || {}).length;
}

function normalizeImportedMedicines(imported) {
  if (!Array.isArray(imported)) {
    throw new Error("Invalid backup");
  }

  return imported.map((medicine) => {
    const times = Array.isArray(medicine.times) ? medicine.times.filter((time) => /^([01]\d|2[0-3]):[0-5]\d$/.test(time)) : [];
    if (!medicine.name || !medicine.dose || !times.length) {
      throw new Error("Invalid medicine");
    }

    return {
      id: medicine.id || crypto.randomUUID(),
      name: String(medicine.name).trim(),
      dose: String(medicine.dose).trim(),
      days: Math.max(1, Math.min(365, Number(medicine.days) || 1)),
      times: [...new Set(times)].sort(),
      note: String(medicine.note || "").trim(),
      createdAt: medicine.createdAt || new Date().toISOString(),
      taken: typeof medicine.taken === "object" && medicine.taken !== null ? medicine.taken : {}
    };
  });
}

function getTodayKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function buildTakenKey(id, time, date) {
  return `${id}|${time}|${date}`;
}

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

render();
