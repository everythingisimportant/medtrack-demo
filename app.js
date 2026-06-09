const SUPABASE_URL = "https://efvjlnmaysnjyrslowns.supabase.co";
const SUPABASE_KEY = "sb_publishable_2-oT4-LmeP67RspMsh9oFw_oMcmKm2I";
const PUBLIC_APP_URL = "https://everythingisimportant.github.io/medtrack-demo/";
const THEME_KEY = "medtrack-theme";
const LANGUAGE_KEY = "medtrack-language";
const PREF_VERSION_KEY = "medtrack-pref-version";
const PREF_VERSION = "css-flag-language-menu-20260609";

const translations = {
  en: {
    pageTitle: "MedTrack Demo",
    themeLabel: "Theme",
    lightMode: "Light",
    darkMode: "Dark",
    switchToDark: "Switch to dark mode",
    switchToLight: "Switch to light mode",
    languageLabel: "Language",
    englishLanguage: "English",
    vietnameseLanguage: "Vietnamese",
    heroEyebrow: "Treatment tracker",
    heroSubcopy: "Manage medication, daily doses, and treatment progress from one focused dashboard.",
    today: "Today",
    treatment: "Treatment",
    todayProgressLabel: "Today's progress",
    overallProgressLabel: "Overall treatment progress",
    activeMeds: "Active meds",
    dailyDoses: "Daily doses",
    completedToday: "Completed today",
    storage: "Storage",
    access: "Access",
    emailPlaceholder: "Email",
    passwordPlaceholder: "Password",
    signIn: "Sign in",
    signUp: "Sign up",
    signOut: "Sign out",
    medication: "Medication",
    addMedication: "Add medication",
    editMedication: "Edit medication",
    medicationName: "Medication name",
    medicineNamePlaceholder: "Example: Amoxicillin",
    dosage: "Dosage",
    dosagePlaceholder: "500mg",
    duration: "Duration",
    startDate: "Start date",
    startDatePlaceholder: "MM/DD/YYYY",
    doseTimes: "Dose times",
    doseTimesPlaceholder: "08:00, 20:00",
    notes: "Notes",
    notesPlaceholder: "After meals, avoid dairy...",
    cancel: "Cancel",
    add: "Add",
    save: "Save",
    edit: "Edit",
    delete: "Delete",
    schedule: "Schedule",
    todaysDoses: "Today's doses",
    resetToday: "Reset today",
    progress: "Progress",
    medicationList: "Medication list",
    requestEditAccess: "Request edit access",
    data: "Data",
    sharingBackup: "Sharing and backup",
    dataDescription: "Data syncs through Supabase with row-level security. Public visitors can view this care space. Signed-in editors can add medicines and confirm doses.",
    refresh: "Refresh",
    exportJson: "Export JSON",
    accessRequests: "Access requests",
    footerNote: "Demo only. Medication decisions should be checked with a qualified clinician.",
    noDosesScheduled: "No doses scheduled.",
    noActiveTreatment: "No active treatment.",
    dosesConfirmed: "{done}/{total} doses confirmed.",
    dayOfTreatment: "Day {elapsed} of {total}. {left} days left.",
    activeTreatment: "{elapsed}/{total} treatment days, {percent}% complete",
    medicineDoseProgress: "{taken}/{total} doses taken, {percent}% complete",
    medicineMeta: "{dose} - {times} - starts {start} - {days} days",
    noMedicationScheduled: "No medication scheduled yet.",
    noMedicationAdded: "No medication added yet.",
    noPendingAccessRequests: "No pending access requests.",
    taken: "Taken",
    markTaken: "Mark taken",
    loadingSharedSpace: "Loading shared care space",
    checkingSession: "Checking Supabase session...",
    noSharedSpace: "No shared care space yet",
    signInCreateSpace: "Sign in to create Solar + Nguyet Care Space.",
    creatingSpace: "Creating shared care space...",
    publicViewer: "public viewer",
    none: "none",
    signInRequestAccess: "{access}. Sign in to request edit access.",
    signedInStatus: "{email} - {access}",
    readOnlySync: "Read-only sync",
    editableSync: "Editable sync",
    supabaseSync: "Supabase sync",
    alertEditorMedication: "Sign in with editor access before changing medication.",
    alertTimes: "Enter times in 24-hour format, for example 08:00, 20:00.",
    alertStartDate: "Enter the start date as MM/DD/YYYY, for example 06/07/2026.",
    alertDoseLogs: "Sign in with editor access before changing dose logs.",
    alertEmailPassword: "Enter email and password.",
    alertAccountCreated: "Account created. Check email if Supabase asks for confirmation, then sign in.",
    alertDeleteMedication: "Sign in with editor access before deleting medication.",
    confirmDeleteMedication: "Delete this medication?",
    alertEditMedication: "Sign in with editor access before editing medication.",
    alertSignInFirst: "Sign in first, then request access.",
    alertAccessRequestSent: "Access request sent.",
    accessRequested: "Requested {role} access",
    approve: "Approve",
    reject: "Reject"
  },
  vi: {
    pageTitle: "MedTrack Demo",
    themeLabel: "Giao diện",
    lightMode: "Sáng",
    darkMode: "Tối",
    switchToDark: "Chuyển sang chế độ tối",
    switchToLight: "Chuyển sang chế độ sáng",
    languageLabel: "Ngôn ngữ",
    englishLanguage: "English",
    vietnameseLanguage: "Tiếng Việt",
    heroEyebrow: "Theo dõi điều trị",
    heroSubcopy: "Quản lý thuốc, liều uống hằng ngày và tiến độ điều trị trong một bảng điều khiển gọn gàng.",
    today: "Hôm nay",
    treatment: "Điều trị",
    todayProgressLabel: "Tiến độ hôm nay",
    overallProgressLabel: "Tiến độ điều trị tổng thể",
    activeMeds: "Thuốc đang dùng",
    dailyDoses: "Liều hôm nay",
    completedToday: "Đã hoàn thành",
    storage: "Lưu trữ",
    access: "Truy cập",
    emailPlaceholder: "Email",
    passwordPlaceholder: "Mật khẩu",
    signIn: "Đăng nhập",
    signUp: "Đăng ký",
    signOut: "Đăng xuất",
    medication: "Thuốc",
    addMedication: "Thêm thuốc",
    editMedication: "Sửa thuốc",
    medicationName: "Tên thuốc",
    medicineNamePlaceholder: "Ví dụ: Amoxicillin",
    dosage: "Liều lượng",
    dosagePlaceholder: "500mg",
    duration: "Số ngày",
    startDate: "Ngày bắt đầu",
    startDatePlaceholder: "MM/DD/YYYY",
    doseTimes: "Giờ uống",
    doseTimesPlaceholder: "08:00, 20:00",
    notes: "Ghi chú",
    notesPlaceholder: "Sau bữa ăn, tránh sữa...",
    cancel: "Hủy",
    add: "Thêm",
    save: "Lưu",
    edit: "Sửa",
    delete: "Xóa",
    schedule: "Lịch",
    todaysDoses: "Liều hôm nay",
    resetToday: "Đặt lại hôm nay",
    progress: "Tiến độ",
    medicationList: "Danh sách thuốc",
    requestEditAccess: "Xin quyền chỉnh sửa",
    data: "Dữ liệu",
    sharingBackup: "Chia sẻ và sao lưu",
    dataDescription: "Dữ liệu đồng bộ qua Supabase với bảo mật theo từng dòng. Người xem công khai có thể xem không gian chăm sóc này. Người đã đăng nhập có quyền chỉnh sửa có thể thêm thuốc và xác nhận liều.",
    refresh: "Làm mới",
    exportJson: "Xuất JSON",
    accessRequests: "Yêu cầu truy cập",
    footerNote: "Chỉ dùng để demo. Quyết định dùng thuốc nên được kiểm tra với nhân viên y tế có chuyên môn.",
    noDosesScheduled: "Chưa có liều nào hôm nay.",
    noActiveTreatment: "Chưa có liệu trình đang chạy.",
    dosesConfirmed: "Đã xác nhận {done}/{total} liều.",
    dayOfTreatment: "Ngày {elapsed} trên {total}. Còn {left} ngày.",
    activeTreatment: "{elapsed}/{total} ngày điều trị, hoàn thành {percent}%",
    medicineDoseProgress: "Đã uống {taken}/{total} liều, hoàn thành {percent}%",
    medicineMeta: "{dose} - {times} - bắt đầu {start} - {days} ngày",
    noMedicationScheduled: "Chưa có thuốc trong lịch.",
    noMedicationAdded: "Chưa thêm thuốc.",
    noPendingAccessRequests: "Không có yêu cầu truy cập đang chờ.",
    taken: "Đã uống",
    markTaken: "Đánh dấu đã uống",
    loadingSharedSpace: "Đang tải không gian chăm sóc",
    checkingSession: "Đang kiểm tra phiên Supabase...",
    noSharedSpace: "Chưa có không gian chăm sóc",
    signInCreateSpace: "Đăng nhập để tạo Solar + Nguyet Care Space.",
    creatingSpace: "Đang tạo không gian chăm sóc...",
    publicViewer: "người xem công khai",
    none: "không có",
    signInRequestAccess: "{access}. Đăng nhập để xin quyền chỉnh sửa.",
    signedInStatus: "{email} - {access}",
    readOnlySync: "Chỉ xem",
    editableSync: "Có thể chỉnh sửa",
    supabaseSync: "Supabase sync",
    alertEditorMedication: "Đăng nhập bằng tài khoản có quyền chỉnh sửa trước khi đổi thuốc.",
    alertTimes: "Nhập giờ theo định dạng 24h, ví dụ 08:00, 20:00.",
    alertStartDate: "Nhập ngày bắt đầu dạng MM/DD/YYYY, ví dụ 06/07/2026.",
    alertDoseLogs: "Đăng nhập bằng tài khoản có quyền chỉnh sửa trước khi đổi lịch sử liều.",
    alertEmailPassword: "Nhập email và mật khẩu.",
    alertAccountCreated: "Đã tạo tài khoản. Kiểm tra email nếu Supabase yêu cầu xác nhận, rồi đăng nhập.",
    alertDeleteMedication: "Đăng nhập bằng tài khoản có quyền chỉnh sửa trước khi xóa thuốc.",
    confirmDeleteMedication: "Xóa thuốc này?",
    alertEditMedication: "Đăng nhập bằng tài khoản có quyền chỉnh sửa trước khi sửa thuốc.",
    alertSignInFirst: "Đăng nhập trước, rồi xin quyền truy cập.",
    alertAccessRequestSent: "Đã gửi yêu cầu truy cập.",
    accessRequested: "Đã yêu cầu quyền {role}",
    approve: "Duyệt",
    reject: "Từ chối"
  }
};

const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const demoMedicines = [
  { name: "Amoxicillin", dose: "500mg", start_date: getTodayKey(), days: 7, times: ["08:00", "20:00"], note: "Take after meals." },
  { name: "Vitamin D3", dose: "1000 IU", start_date: getTodayKey(), days: 30, times: ["12:30"], note: "Take with lunch." }
];

let session = null;
let careSpace = null;
let role = null;
let medicines = [];
let doseLogs = [];
let requests = [];
let channel = null;
let editingMedicineId = null;
let appTheme = getSavedPreference(THEME_KEY, "light");
let appLanguage = getSavedPreference(LANGUAGE_KEY, "en");

const form = document.querySelector("#medicineForm");
const scheduleList = document.querySelector("#scheduleList");
const medicineList = document.querySelector("#medicineList");
const todayProgress = document.querySelector("#todayProgress");
const todayProgressBar = document.querySelector("#todayProgressBar");
const todaySummary = document.querySelector("#todaySummary");
const overallProgress = document.querySelector("#overallProgress");
const overallProgressBar = document.querySelector("#overallProgressBar");
const overallSummary = document.querySelector("#overallSummary");
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
const cancelEditButton = document.querySelector("#cancelEditButton");
const medicineFormTitle = document.querySelector("#medicineFormTitle");
const medicineName = document.querySelector("#medicineName");
const medicineDose = document.querySelector("#medicineDose");
const medicineDays = document.querySelector("#medicineDays");
const medicineStartDate = document.querySelector("#medicineStartDate");
const medicineTimes = document.querySelector("#medicineTimes");
const medicineNote = document.querySelector("#medicineNote");
const storageMode = document.querySelector("#storageMode");
const themeToggle = document.querySelector("#themeToggle");
const themeIcon = document.querySelector("#themeIcon");
const languageMenu = document.querySelector("#languageMenu");
const languageMenuButton = document.querySelector("#languageMenuButton");
const languageMenuList = document.querySelector("#languageMenuList");
const languageFlag = document.querySelector("#languageFlag");
const languageOptions = document.querySelectorAll("[data-language]");

init();

async function init() {
  applyPreferences();
  const result = await client.auth.getSession();
  session = result.data.session;
  bindEvents();
  resetMedicineForm();
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
  cancelEditButton.addEventListener("click", resetMedicineForm);
  themeToggle.addEventListener("click", () => setTheme(appTheme === "dark" ? "light" : "dark"));
  languageMenuButton.addEventListener("click", toggleLanguageMenu);
  languageOptions.forEach((option) => {
    option.addEventListener("click", () => {
      setLanguage(option.dataset.language);
      closeLanguageMenu();
    });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!canEdit()) return alert(t("alertEditorMedication"));

    const data = new FormData(form);
    const times = parseTimes(data.get("times"));
    if (!times.length) return alert(t("alertTimes"));
    const startDate = parseEnglishDate(data.get("start_date"));
    if (!startDate) return alert(t("alertStartDate"));

    const payload = {
      name: data.get("name").trim(),
      dose: data.get("dose").trim(),
      start_date: startDate,
      days: Number(data.get("days")),
      times,
      note: data.get("note").trim()
    };

    const result = editingMedicineId
      ? await client.from("medicines").update(payload).eq("id", editingMedicineId)
      : await client.from("medicines").insert({
          ...payload,
          space_id: careSpace.id,
          created_by: session.user.id
        });

    if (result.error) return alert(result.error.message);
    resetMedicineForm();
    await loadData();
  });

  resetToday.addEventListener("click", async () => {
    if (!canEdit()) return alert(t("alertDoseLogs"));
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
  document.addEventListener("click", handleOutsideLanguageMenu);
  document.addEventListener("keydown", handleDocumentKeydown);
}

function getSavedPreference(key, fallback) {
  if (localStorage.getItem(PREF_VERSION_KEY) !== PREF_VERSION) return fallback;
  return localStorage.getItem(key) || fallback;
}

function setTheme(theme) {
  appTheme = theme === "dark" ? "dark" : "light";
  localStorage.setItem(THEME_KEY, appTheme);
  applyTheme();
}

function setLanguage(language) {
  appLanguage = language === "vi" ? "vi" : "en";
  localStorage.setItem(LANGUAGE_KEY, appLanguage);
  applyStaticTranslations();
  applyTheme();
  updateMedicineFormText();
  render();
}

function applyPreferences() {
  if (!["light", "dark"].includes(appTheme)) appTheme = "light";
  if (!["en", "vi"].includes(appLanguage)) appLanguage = "en";
  localStorage.setItem(PREF_VERSION_KEY, PREF_VERSION);
  localStorage.setItem(THEME_KEY, appTheme);
  localStorage.setItem(LANGUAGE_KEY, appLanguage);
  applyTheme();
  applyStaticTranslations();
}

function applyTheme() {
  document.documentElement.dataset.theme = appTheme;
  themeIcon.innerHTML = getThemeIcon(appTheme);
  themeToggle.setAttribute("aria-label", appTheme === "dark" ? t("switchToLight") : t("switchToDark"));
}

function applyStaticTranslations() {
  document.documentElement.lang = appLanguage;
  document.title = t("pageTitle");

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.placeholder = t(element.dataset.i18nPlaceholder);
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    element.setAttribute("aria-label", t(element.dataset.i18nAriaLabel));
  });

  languageFlag.className = `flag-icon ${appLanguage === "vi" ? "flag-vi" : "flag-en"}`;
  languageMenuButton.setAttribute("aria-label", t("languageLabel"));
  languageOptions.forEach((option) => {
    option.setAttribute("aria-checked", String(option.dataset.language === appLanguage));
  });
}

function toggleLanguageMenu() {
  if (languageMenuList.hidden) {
    openLanguageMenu();
  } else {
    closeLanguageMenu();
  }
}

function openLanguageMenu() {
  languageMenuList.hidden = false;
  languageMenuButton.setAttribute("aria-expanded", "true");
}

function closeLanguageMenu() {
  languageMenuList.hidden = true;
  languageMenuButton.setAttribute("aria-expanded", "false");
}

function handleOutsideLanguageMenu(event) {
  if (languageMenu.contains(event.target)) return;
  closeLanguageMenu();
}

function handleDocumentKeydown(event) {
  if (event.key !== "Escape") return;
  closeLanguageMenu();
}

function getThemeIcon(theme) {
  if (theme === "dark") {
    return `
      <svg class="theme-svg" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a7.8 7.8 0 1 0 11 11Z"></path>
      </svg>
    `;
  }

  return `
    <svg class="theme-svg" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4"></circle>
      <path d="M12 2v2"></path>
      <path d="M12 20v2"></path>
      <path d="m4.93 4.93 1.41 1.41"></path>
      <path d="m17.66 17.66 1.41 1.41"></path>
      <path d="M2 12h2"></path>
      <path d="M20 12h2"></path>
      <path d="m6.34 17.66-1.41 1.41"></path>
      <path d="m19.07 4.93-1.41 1.41"></path>
    </svg>
  `;
}

function updateMedicineFormText() {
  medicineFormTitle.textContent = editingMedicineId ? t("editMedication") : t("addMedication");
  addMedicineButton.textContent = editingMedicineId ? t("save") : t("add");
}

function t(key) {
  return translations[appLanguage]?.[key] || translations.en[key] || key;
}

function formatMessage(key, values) {
  return t(key).replace(/\{(\w+)\}/g, (_, name) => values[name] ?? "");
}

async function signIn() {
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  if (!email || !password) return alert(t("alertEmailPassword"));
  const { error } = await client.auth.signInWithPassword({ email, password });
  if (error) alert(error.message);
}

async function signUp() {
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  if (!email || !password) return alert(t("alertEmailPassword"));
  const { error } = await client.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: getAuthRedirectUrl()
    }
  });
  if (error) return alert(error.message);
  alert(t("alertAccountCreated"));
}

async function loadApp() {
  authStatus.textContent = t("loadingSharedSpace") + "...";
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
    spaceName.textContent = t("noSharedSpace");
    authStatus.textContent = t("signInCreateSpace");
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
    if (!canEdit()) return alert(t("alertDoseLogs"));
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
    if (!canEdit()) return alert(t("alertDeleteMedication"));
    if (!confirm(t("confirmDeleteMedication"))) return;
    const { error } = await client.from("medicines").delete().eq("id", id);
    if (error) return alert(error.message);
  }

  if (action === "edit-medicine") {
    if (!canEdit()) return alert(t("alertEditMedication"));
    startMedicineEdit(id);
    return;
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
  if (!session) return alert(t("alertSignInFirst"));
  const { error } = await client.from("access_requests").insert({
    space_id: careSpace.id,
    requester_id: session.user.id,
    requested_role: "editor",
    message: "Requesting editor access from MedTrack."
  });
  if (error) return alert(error.message);
  alert(t("alertAccessRequestSent"));
  await loadData();
}

function render() {
  renderShell();
  renderToday();
  renderOverallProgress();
  renderMedicines();
  renderRequests();
}

function renderShell() {
  const signedIn = Boolean(session);
  if (!careSpace) {
    spaceName.textContent = t("noSharedSpace");
    authStatus.textContent = signedIn ? t("creatingSpace") : t("signInCreateSpace");
    signOutButton.hidden = !signedIn;
    emailInput.hidden = signedIn;
    passwordInput.hidden = signedIn;
    document.querySelector("#signInButton").hidden = signedIn;
    signUpButton.hidden = signedIn;
    requestAccess.hidden = true;
    addMedicineButton.disabled = true;
    resetMedicineForm();
    resetToday.disabled = true;
    storageMode.textContent = t("readOnlySync");
    return;
  }

  const access = role || (careSpace?.public_read ? t("publicViewer") : t("none"));
  spaceName.textContent = careSpace.name;
  authStatus.textContent = signedIn
    ? formatMessage("signedInStatus", { email: session.user.email, access })
    : formatMessage("signInRequestAccess", { access });
  signOutButton.hidden = !signedIn;
  emailInput.hidden = signedIn;
  passwordInput.hidden = signedIn;
  document.querySelector("#signInButton").hidden = signedIn;
  signUpButton.hidden = signedIn;
  requestAccess.hidden = !signedIn || !careSpace || Boolean(role);
  addMedicineButton.disabled = !canEdit();
  if (!canEdit()) resetMedicineForm();
  resetToday.disabled = !canEdit();
  storageMode.textContent = canEdit() ? t("editableSync") : t("readOnlySync");
}

function renderToday() {
  const today = getTodayKey();
  const doses = medicines
    .filter((medicine) => isMedicineActiveOn(medicine, today))
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
  todaySummary.textContent = doses.length
    ? formatMessage("dosesConfirmed", { done: doneCount, total: doses.length })
    : t("noDosesScheduled");
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
                ${done ? t("taken") : t("markTaken")}
              </button>
            </article>
          `
        )
        .join("")
    : `<div class="empty">${t("noMedicationScheduled")}</div>`;
}

function renderOverallProgress() {
  const progress = getOverallTreatmentProgress();

  overallProgress.textContent = `${progress.percent}%`;
  overallProgressBar.style.width = `${progress.percent}%`;
  overallSummary.textContent = progress.totalDays
    ? formatMessage("dayOfTreatment", { elapsed: progress.elapsedDays, total: progress.totalDays, left: progress.daysLeft })
    : t("noActiveTreatment");
}

function renderMedicines() {
  medicineList.innerHTML = medicines.length
    ? medicines
        .map((medicine) => {
          const progress = getMedicineDoseProgress(medicine);
          return `
            <article class="medicine-card">
              <div>
                <p class="medicine-title">${escapeHtml(medicine.name)}</p>
                <p class="medicine-meta">${escapeHtml(formatMessage("medicineMeta", { dose: medicine.dose, times: medicine.times.join(", "), start: formatEnglishDate(getMedicineStartKey(medicine)), days: medicine.days }))}</p>
                <p class="medicine-meta">${escapeHtml(formatMessage("medicineDoseProgress", { taken: progress.taken, total: progress.total, percent: progress.percent }))}</p>
                <div class="medicine-progress" aria-label="Treatment progress">
                  <span style="width: ${progress.percent}%"></span>
                </div>
              </div>
              <div class="medicine-actions">
                <button class="ghost" data-action="edit-medicine" data-id="${medicine.id}" ${canEdit() ? "" : "disabled"}>${t("edit")}</button>
                <button class="danger" data-action="delete-medicine" data-id="${medicine.id}" ${canEdit() ? "" : "disabled"}>${t("delete")}</button>
              </div>
            </article>
          `;
        })
        .join("")
    : `<div class="empty">${t("noMedicationAdded")}</div>`;
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
                <p class="medicine-meta">${escapeHtml(formatMessage("accessRequested", { role: request.requested_role }))}</p>
              </div>
              <div class="medicine-actions">
                <button class="primary" data-action="approve-request" data-id="${request.id}">${t("approve")}</button>
                <button class="danger" data-action="reject-request" data-id="${request.id}">${t("reject")}</button>
              </div>
            </article>
          `
        )
        .join("")
    : `<div class="empty">${t("noPendingAccessRequests")}</div>`;
}

function parseTimes(value) {
  return String(value)
    .split(",")
    .map((time) => time.trim())
    .filter((time) => /^([01]\d|2[0-3]):[0-5]\d$/.test(time))
    .filter((time, index, all) => all.indexOf(time) === index)
    .sort();
}

function getMedicineDoseProgress(medicine) {
  const total = getTotalDoseCount(medicine);
  const taken = Math.min(total, getTakenCount(medicine.id));
  return {
    taken,
    total,
    percent: Math.round((taken / total) * 100)
  };
}

function getOverallTreatmentProgress() {
  if (!medicines.length) {
    return { elapsedDays: 0, totalDays: 0, daysLeft: 0, percent: 0 };
  }

  const starts = medicines.map(getMedicineStartDate);
  const ends = medicines.map((medicine, index) => addDays(starts[index], Math.max(1, Number(medicine.days))));
  const start = new Date(Math.min(...starts.map((date) => date.getTime())));
  const end = new Date(Math.max(...ends.map((date) => date.getTime())));
  const now = startOfDay(new Date());
  const totalDays = Math.max(1, Math.round((end - start) / 86400000));
  const elapsedDays = Math.min(totalDays, Math.max(1, Math.floor((now - start) / 86400000) + 1));
  const daysLeft = Math.max(0, totalDays - elapsedDays);

  return {
    elapsedDays,
    totalDays,
    daysLeft,
    percent: Math.round((elapsedDays / totalDays) * 100)
  };
}

function getTakenCount(medicineId) {
  return doseLogs.filter((log) => log.medicine_id === medicineId).length;
}

function getTotalDoseCount(medicine) {
  const days = Math.max(1, Number(medicine.days) || 1);
  const dailyDoses = Math.max(1, Array.isArray(medicine.times) ? medicine.times.length : 0);
  return days * dailyDoses;
}

function getMedicineStartDate(medicine) {
  return parseIsoDate(getMedicineStartKey(medicine));
}

function getMedicineStartKey(medicine) {
  return medicine.start_date || medicine.created_at?.slice(0, 10) || getTodayKey();
}

function isMedicineActiveOn(medicine, dateKey) {
  const target = parseIsoDate(dateKey);
  const start = getMedicineStartDate(medicine);
  const end = addDays(start, Math.max(1, Number(medicine.days)));
  return target >= start && target < end;
}

function startMedicineEdit(id) {
  const medicine = medicines.find((item) => item.id === id);
  if (!medicine) return;

  editingMedicineId = id;
  medicineName.value = medicine.name;
  medicineDose.value = medicine.dose;
  medicineDays.value = medicine.days;
  medicineStartDate.value = formatEnglishDate(getMedicineStartKey(medicine));
  medicineTimes.value = medicine.times.join(", ");
  medicineNote.value = medicine.note || "";
  updateMedicineFormText();
  cancelEditButton.hidden = false;
  form.scrollIntoView({ behavior: "smooth", block: "start" });
  medicineName.focus();
}

function resetMedicineForm() {
  editingMedicineId = null;
  form.reset();
  medicineDays.value = 7;
  medicineStartDate.value = formatEnglishDate(getTodayKey());
  updateMedicineFormText();
  cancelEditButton.hidden = true;
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

function parseEnglishDate(value) {
  const match = String(value || "").trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!match) return null;

  const month = Number(match[1]);
  const day = Number(match[2]);
  const year = Number(match[3]);
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;

  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return null;
  return formatIsoDate(date);
}

function formatEnglishDate(dateKey) {
  const date = parseIsoDate(dateKey);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${month}/${day}/${date.getFullYear()}`;
}

function parseIsoDate(dateKey) {
  const match = String(dateKey || getTodayKey()).match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!match) return startOfDay(new Date(dateKey));
  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
}

function formatIsoDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getAuthRedirectUrl() {
  const current = new URL(window.location.href);
  const localHosts = new Set(["localhost", "127.0.0.1", "0.0.0.0", ""]);

  if (localHosts.has(current.hostname)) return PUBLIC_APP_URL;

  current.search = "";
  current.hash = "";
  if (current.pathname.endsWith("/index.html")) {
    current.pathname = current.pathname.slice(0, -"index.html".length);
  }
  return current.toString();
}

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
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
