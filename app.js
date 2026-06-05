const SUPABASE_URL = "https://efvjlnmaysnjyrslowns.supabase.co";
const SUPABASE_KEY = "sb_publishable_2-oT4-LmeP67RspMsh9oFw_oMcmKm2I";

const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const demoMedicines = [
  { name: "Amoxicillin", dose: "500mg", days: 7, times: ["08:00", "20:00"], note: "Take after meals." },
  { name: "Vitamin D3", dose: "1000 IU", days: 30, times: ["12:30"], note: "Take with lunch." }
];

let session = null;
let careSpace = null;
let role = null;
let medicines = [];
let doseLogs = [];
let requests = [];
let channel = null;

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
const exportData = document.querySelector("#exportData");
const refreshData = document.querySelector("#refreshData");
const requestAccess = document.querySelector("#requestAccess");
const requestsPanel = document.querySelector("#requestsPanel");
const requestsList = document.querySelector("#requestsList");
const spaceName = document.querySelector("#spaceName");
const authStatus = document.querySelector("#authStatus");
const authForm = document.querySelector("#authForm");
const emailInput = document.querySelector("#emailInput");
const passwordInput = document.querySelector("#passwordInput");
const signUpButton = document.querySelector("#signUpButton");
const signOutButton = document.querySelector("#signOutButton");
const addMedicineButton = document.querySelector("#addMedicineButton");
const storageMode = document.querySelector("#storageMode");

init();

async function init() {
  const result = await client.auth.getSession();
  session = result.data.session;
  bindEvents();
  await loadApp();

  client.auth.onAuthStateChange(async (_event, nextSession) => {
    session = nextSession;
    role = null;
    await loadApp();
  });
}

function bindEvents() {
  authForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    await signIn();
  });

  signUpButton.addEventListener("click", signUp);
  signOutButton.addEventListener("click", () => client.auth.signOut());
  refreshData.addEventListener("click", loadApp);
  requestAccess.addEventListener("click", createAccessRequest);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!canEdit()) return alert("Sign in with editor access before changing medication.");

    const data = new FormData(form);
    const times = parseTimes(data.get("times"));
    if (!times.length) return alert("Enter times in 24-hour format, for example 08:00, 20:00.");

    const { error } = await client.from("medicines").insert({
      space_id: careSpace.id,
      name: data.get("name").trim(),
      dose: data.get("dose").trim(),
      days: Number(data.get("days")),
      times,
      note: data.get("note").trim(),
      created_by: session.user.id
    });

    if (error) return alert(error.message);
    form.reset();
    document.querySelector("#medicineDays").value = 7;
    await loadData();
  });

  resetToday.addEventListener("click", async () => {
    if (!canEdit()) return alert("Sign in with editor access before changing dose logs.");
    const { error } = await client.from("dose_logs").delete().eq("space_id", careSpace.id).eq("dose_date", getTodayKey());
    if (error) return alert(error.message);
    await loadData();
  });

  exportData.addEventListener("click", () => {
    const payload = { careSpace, medicines, doseLogs, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `medtrack-supabase-backup-${getTodayKey()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  });

  document.addEventListener("click", handleActionClick);
}

async function signIn() {
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  if (!email || !password) return alert("Enter email and password.");
  const { error } = await client.auth.signInWithPassword({ email, password });
  if (error) alert(error.message);
}

async function signUp() {
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  if (!email || !password) return alert("Enter email and password.");
  const { error } = await client.auth.signUp({ email, password });
  if (error) return alert(error.message);
  alert("Account created. Check email if Supabase asks for confirmation, then sign in.");
}

async function loadApp() {
  authStatus.textContent = "Loading shared care space...";
  await resolveCareSpace();
  await loadData();
  subscribeRealtime();
}

async function resolveCareSpace() {
  const { data: spaces, error } = await client
    .from("care_spaces")
    .select("id,name,owner_id,public_read,created_at")
    .eq("public_read", true)
    .order("created_at", { ascending: true })
    .limit(1);

  if (error) throwVisible(error.message);
  careSpace = spaces?.[0] || null;

  if (!careSpace && session) {
    const result = await client.rpc("ensure_default_space");
    if (result.error) throwVisible(result.error.message);
    careSpace = result.data;
    await seedDefaultMedicines();
  }

  if (!careSpace) {
    role = null;
    spaceName.textContent = "No shared care space yet";
    authStatus.textContent = "Sign in to create Solar + Nguyet Care Space.";
    return;
  }

  await loadRole();
}

async function loadRole() {
  role = null;
  if (!session || !careSpace) return;

  const { data, error } = await client
    .from("care_members")
    .select("role")
    .eq("space_id", careSpace.id)
    .eq("user_id", session.user.id)
    .maybeSingle();

  if (!error && data) role = data.role;
}

async function seedDefaultMedicines() {
  if (!careSpace || medicines.length) return;
  await client.from("medicines").insert(
    demoMedicines.map((medicine) => ({
      ...medicine,
      space_id: careSpace.id,
      created_by: session.user.id
    }))
  );
}

async function loadData() {
  if (!careSpace) {
    medicines = [];
    doseLogs = [];
    requests = [];
    render();
    return;
  }

  const [medicineResult, doseResult] = await Promise.all([
    client.from("medicines").select("*").eq("space_id", careSpace.id).order("created_at", { ascending: false }),
    client.from("dose_logs").select("*").eq("space_id", careSpace.id)
  ]);

  if (medicineResult.error) throwVisible(medicineResult.error.message);
  if (doseResult.error) throwVisible(doseResult.error.message);

  medicines = medicineResult.data || [];
  doseLogs = doseResult.data || [];

  if (canAdmin()) {
    const requestResult = await client
      .from("access_requests")
      .select("id,requester_id,requested_role,status,message,created_at")
      .eq("space_id", careSpace.id)
      .eq("status", "pending")
      .order("created_at", { ascending: true });
    requests = requestResult.data || [];
  } else {
    requests = [];
  }

  render();
}

function subscribeRealtime() {
  if (channel) client.removeChannel(channel);
  if (!careSpace) return;

  channel = client
    .channel(`care-space-${careSpace.id}`)
    .on("postgres_changes", { event: "*", schema: "public", table: "medicines", filter: `space_id=eq.${careSpace.id}` }, loadData)
    .on("postgres_changes", { event: "*", schema: "public", table: "dose_logs", filter: `space_id=eq.${careSpace.id}` }, loadData)
    .on("postgres_changes", { event: "*", schema: "public", table: "access_requests", filter: `space_id=eq.${careSpace.id}` }, loadData)
    .subscribe();
}

async function handleActionClick(event) {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const { action, id, time } = button.dataset;

  if (action === "toggle-dose") {
    if (!canEdit()) return alert("Sign in with editor access before changing dose logs.");
    const today = getTodayKey();
    const existing = doseLogs.find((log) => log.medicine_id === id && log.dose_time === time && log.dose_date === today);
    const result = existing
      ? await client.from("dose_logs").delete().eq("id", existing.id)
      : await client.from("dose_logs").insert({
          space_id: careSpace.id,
          medicine_id: id,
          dose_date: today,
          dose_time: time,
          taken_by: session.user.id
        });
    if (result.error) return alert(result.error.message);
  }

  if (action === "delete-medicine") {
    if (!canEdit()) return alert("Sign in with editor access before deleting medication.");
    if (!confirm("Delete this medication?")) return;
    const { error } = await client.from("medicines").delete().eq("id", id);
    if (error) return alert(error.message);
  }

  if (action === "approve-request") {
    if (!canAdmin()) return;
    const request = requests.find((item) => item.id === id);
    if (!request) return;
    const insert = await client.from("care_members").insert({
      space_id: careSpace.id,
      user_id: request.requester_id,
      role: request.requested_role
    });
    if (insert.error) return alert(insert.error.message);
    const update = await client
      .from("access_requests")
      .update({ status: "approved", decided_by: session.user.id, decided_at: new Date().toISOString() })
      .eq("id", id);
    if (update.error) return alert(update.error.message);
  }

  if (action === "reject-request") {
    if (!canAdmin()) return;
    const { error } = await client
      .from("access_requests")
      .update({ status: "rejected", decided_by: session.user.id, decided_at: new Date().toISOString() })
      .eq("id", id);
    if (error) return alert(error.message);
  }

  await loadData();
}

async function createAccessRequest() {
  if (!session) return alert("Sign in first, then request access.");
  const { error } = await client.from("access_requests").insert({
    space_id: careSpace.id,
    requester_id: session.user.id,
    requested_role: "editor",
    message: "Requesting editor access from MedTrack."
  });
  if (error) return alert(error.message);
  alert("Access request sent.");
  await loadData();
}

function render() {
  renderShell();
  renderToday();
  renderMedicines();
  renderRequests();
}

function renderShell() {
  const signedIn = Boolean(session);
  const access = role || (careSpace?.public_read ? "public viewer" : "none");
  spaceName.textContent = careSpace?.name || "No shared care space yet";
  authStatus.textContent = signedIn
    ? `${session.user.email} - ${access}`
    : `${access}. Sign in to request edit access.`;
  signOutButton.hidden = !signedIn;
  emailInput.hidden = signedIn;
  passwordInput.hidden = signedIn;
  document.querySelector("#signInButton").hidden = signedIn;
  signUpButton.hidden = signedIn;
  requestAccess.hidden = !signedIn || !careSpace || Boolean(role);
  addMedicineButton.disabled = !canEdit();
  resetToday.disabled = !canEdit();
  storageMode.textContent = canEdit() ? "Editable sync" : "Read-only sync";
}

function renderToday() {
  const today = getTodayKey();
  const doses = medicines
    .flatMap((medicine) =>
      medicine.times.map((time) => ({
        medicine,
        time,
        done: doseLogs.some((log) => log.medicine_id === medicine.id && log.dose_time === time && log.dose_date === today)
      }))
    )
    .sort((a, b) => a.time.localeCompare(b.time));

  const doneCount = doses.filter((dose) => dose.done).length;
  const percentage = doses.length ? Math.round((doneCount / doses.length) * 100) : 0;

  todayProgress.textContent = `${percentage}%`;
  todayProgressBar.style.width = `${percentage}%`;
  todaySummary.textContent = doses.length ? `${doneCount}/${doses.length} doses confirmed.` : "No doses scheduled.";
  activeMeds.textContent = medicines.length;
  dailyDoses.textContent = doses.length;
  completedDoses.textContent = doneCount;

  scheduleList.innerHTML = doses.length
    ? doses
        .map(
          ({ medicine, time, done }) => `
            <article class="dose-row ${done ? "done" : ""}">
              <span class="time-chip">${escapeHtml(time)}</span>
              <div>
                <p class="dose-title">${escapeHtml(medicine.name)}</p>
                <p class="dose-meta">${escapeHtml(medicine.dose)}${medicine.note ? ` - ${escapeHtml(medicine.note)}` : ""}</p>
              </div>
              <button class="${done ? "ghost" : "primary"}" data-action="toggle-dose" data-id="${medicine.id}" data-time="${time}" ${canEdit() ? "" : "disabled"}>
                ${done ? "Taken" : "Mark taken"}
              </button>
            </article>
          `
        )
        .join("")
    : `<div class="empty">No medication scheduled yet.</div>`;
}

function renderMedicines() {
  medicineList.innerHTML = medicines.length
    ? medicines
        .map((medicine) => {
          const progress = getTreatmentProgress(medicine);
          return `
            <article class="medicine-card">
              <div>
                <p class="medicine-title">${escapeHtml(medicine.name)}</p>
                <p class="medicine-meta">${escapeHtml(medicine.dose)} - ${medicine.times.join(", ")} - ${medicine.days} days</p>
                <p class="medicine-meta">${progress.elapsed}/${medicine.days} treatment days, ${progress.percent}% complete</p>
                <p class="medicine-meta">${getTakenCount(medicine.id)} total confirmed doses</p>
                <div class="medicine-progress" aria-label="Treatment progress">
                  <span style="width: ${progress.percent}%"></span>
                </div>
              </div>
              <div class="medicine-actions">
                <button class="danger" data-action="delete-medicine" data-id="${medicine.id}" ${canEdit() ? "" : "disabled"}>Delete</button>
              </div>
            </article>
          `;
        })
        .join("")
    : `<div class="empty">No medication added yet.</div>`;
}

function renderRequests() {
  requestsPanel.hidden = !canAdmin();
  if (!canAdmin()) return;

  requestsList.innerHTML = requests.length
    ? requests
        .map(
          (request) => `
            <article class="medicine-card">
              <div>
                <p class="medicine-title">${escapeHtml(request.requester_id)}</p>
                <p class="medicine-meta">Requested ${escapeHtml(request.requested_role)} access</p>
              </div>
              <div class="medicine-actions">
                <button class="primary" data-action="approve-request" data-id="${request.id}">Approve</button>
                <button class="danger" data-action="reject-request" data-id="${request.id}">Reject</button>
              </div>
            </article>
          `
        )
        .join("")
    : `<div class="empty">No pending access requests.</div>`;
}

function parseTimes(value) {
  return String(value)
    .split(",")
    .map((time) => time.trim())
    .filter((time) => /^([01]\d|2[0-3]):[0-5]\d$/.test(time))
    .filter((time, index, all) => all.indexOf(time) === index)
    .sort();
}

function getTreatmentProgress(medicine) {
  const start = startOfDay(new Date(medicine.created_at));
  const now = startOfDay(new Date());
  const elapsed = Math.min(medicine.days, Math.max(1, Math.floor((now - start) / 86400000) + 1));
  return { elapsed, percent: Math.round((elapsed / medicine.days) * 100) };
}

function getTakenCount(medicineId) {
  return doseLogs.filter((log) => log.medicine_id === medicineId).length;
}

function canEdit() {
  return ["owner", "admin", "editor"].includes(role);
}

function canAdmin() {
  return ["owner", "admin"].includes(role);
}

function getTodayKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function throwVisible(message) {
  authStatus.textContent = message;
  throw new Error(message);
}
