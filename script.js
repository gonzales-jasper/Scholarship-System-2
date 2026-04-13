function loadPageAdmin(url, element) {

  $.ajax({

    url: url,

    success: function (response) {
      const cleaned = response.replace(/<script\b[^>]*src[^>]*>([\s\S]*?)<\/script>/gi, '');
      $("#main-content").html(cleaned);

      if (element) {
        $(".nav-link").removeClass("active");
        $(element).addClass("active");
      }

    }

  });

}

function viewApplicant(applicationId) {
  $.ajax({
    url: "admin-viewApplicant.php",
    data: { application_id: applicationId },
    success: function (response) {
      $("#modal").html(response).fadeIn(300);
      $("#bg-modal").fadeIn(300);
    }

  });
}
function closeAdminModal() {
  $("#modal").hide();
  $("#bg-modal").hide();
}

function loadFullProfile(studentId) {
  closeAdminModal();
  loadPageAdmin('admin-profile.php?application_id=' + studentId);
}

function updateStatus(applicationId, status) {
  $.ajax({
    url: "admin-updateStatusProcess.php",
    method: 'post',
    data: { application_id: applicationId, status: status },
    success: function (response) {
      closeAdminModal();
      loadPageAdmin('admin-evaluation.php');
    }
  });
}

function confirmStatus(applicationId, newStatus) {
  $.ajax({
    url: 'admin-confirmStatusModal.php',
    data: { application_id: applicationId, status: newStatus },
    success: function (response) {
      $('#modal').html(response).fadeIn(300);
      $('#bg-modal').fadeIn(300);
    }
  });
}

function openAddModal() {
  $.ajax({
    url: 'admin-addApplicationModal.php',
    success: function (response) {
      $("#modal").html(response).fadeIn(300);
      $("#bg-modal").fadeIn(300);
    }
  });
}
function handleStudentSelect(selectEl) {
  var opt = selectEl.options[selectEl.selectedIndex];
  var display = document.getElementById('selected-student-display');
  var nameEl = document.getElementById('selected-student-name');
  var noEl = document.getElementById('selected-student-no');

  if (!display || !nameEl || !noEl) return;

  if (selectEl.value) {
    nameEl.textContent = opt.getAttribute('data-lname') + ', ' + opt.getAttribute('data-fname');
    noEl.textContent = opt.getAttribute('data-no');
    display.style.display = 'flex';
  } else {
    display.style.display = 'none';
  }
}

function submitAdd(e) {
  e.preventDefault();
  $.ajax({
    url: 'admin-addApplicationProcess.php',
    method: 'POST',
    data: $(e.target).serialize(),
    success: function (response) {
      // process.php returns the result modal HTML directly
      $('#modal').html(response).fadeIn(300);
      $('#bg-modal').fadeIn(300);
      // refresh table in background regardless of result
      loadPageAdmin('admin-evaluation.php');
    }
  });
}

// step 1 — show confirmation modal
function deleteApplication(applicationId) {
  $.ajax({
    url: 'admin-confirmDeleteModal.php',
    data: { application_id: applicationId },
    success: function (response) {
      $('#modal').html(response).fadeIn(300);
      $('#bg-modal').fadeIn(300);
    }
  });
}

// step 2 — actually delete
function confirmedDeleteProcess(applicationId) {
  $.ajax({
    url: 'admin-deleteApplicationProcess.php',
    method: 'POST',
    data: { application_id: applicationId },
    success: function (response) {
      $('#modal').html(response).fadeIn(300);
      loadPageAdmin('admin-evaluation.php');
      closeAdminModal();
    }
  });
}

function editApplication(applicationId) {
  $.ajax({
    url: 'admin-editApplication.php',
    data: { application_id: applicationId },
    success: function (response) {
      $('#modal').html(response).fadeIn(300);
      $('#bg-modal').fadeIn(300);
    }
  });
}

function submitEditProcess(event) {
  event.preventDefault();
  $.ajax({
    url: 'admin-editApplicationProcess.php',
    method: 'POST',
    data: $(event.target).serialize(),
    success: function (response) {
      $('#modal').html(response).fadeIn(300);
      $('#bg-modal').fadeIn(300);
      loadPageAdmin('admin-evaluation.php');
    }
  });
}








const REGISTERED_USER_KEY = "scholarshipPortal.registeredUser";
const CURRENT_USER_KEY = "scholarshipPortal.currentUser";
const APPLICATIONS_KEY = "scholarshipPortal.applications";
const CURRENT_ADMIN_KEY = "scholarshipPortal.currentAdmin";
const CURRENT_APPLICANT_KEY = "scholarshipPortal.currentApplicant";
const ADMIN_STUDENTS_KEY = "scholarshipPortal.adminStudents";
const ADMIN_APPLICANTS_KEY = "scholarshipPortal.adminApplicants";
const ADMIN_PENDING_STUDENTS_KEY = "scholarshipPortal.adminPendingStudents";
const ADMIN_CREDENTIALS = [
  {
    username: "admin",
    password: "admin123",
    displayName: "Scholarship Admin"
  }
];
const ADDRESS_OPTIONS = {
  "Central Luzon": {
    Bulacan: {
      Malolos: [
        "Bagna",
        "Bulihan",
        "Guinhawa",
        "Longos",
        "Mojon",
        "San Gabriel",
        "Sumapang Bata",
        "Tikay"
      ],
      "City of San Jose del Monte": [
        "Assumption",
        "Bagong Buhay I",
        "Citrus",
        "Gaya-Gaya",
        "Graceville",
        "Kaypian",
        "Muzon",
        "Santo Cristo"
      ],
      "Santa Maria": [
        "Bagbaguin",
        "Cay Pombo",
        "Guyong",
        "Manggahan",
        "Parada",
        "Poblacion",
        "Pulong Buhangin",
        "Tabing Bakod"
      ],
      Baliwag: [
        "Bagong Nayon",
        "Catulinan",
        "Hinukay",
        "Makinabang",
        "Pagala",
        "Paitan",
        "Poblacion",
        "Santo Cristo"
      ],
      Meycauayan: [
        "Banga",
        "Calvario",
        "Camalig",
        "Hulo",
        "Langka",
        "Lawa",
        "Perez",
        "Saluysoy"
      ],
      Marilao: [
        "Abangan Norte",
        "Ibayo",
        "Lambakin",
        "Loma de Gato",
        "Patubig",
        "Prenza I",
        "Santa Rosa I",
        "Tabing Ilog"
      ],
      Plaridel: [
        "Agnaya",
        "Banga I",
        "Bintog",
        "Bulihan",
        "Culianin",
        "Lalangan",
        "Poblacion",
        "Sipat"
      ],
      Hagonoy: [
        "Abulalas",
        "Carillo",
        "Iba",
        "Mercado",
        "Palapat",
        "Poblacion",
        "San Agustin",
        "San Nicolas"
      ]
    }
  }
};

const DEFAULT_ADMIN_APPLICANTS = {
  1002: {
    title: "Profile | John Mark Reyes",
    heading: "John Mark Reyes",
    applicantId: "1002",
    studentNumber: "2024-014",
    lastName: "Reyes",
    firstName: "John Mark",
    middleName: "Santos",
    program: "BSCE",
    college: "COE",
    gwa: "1.92",
    income: "125,000",
    status: "Pending Review",
    father: "Mario Reyes",
    mother: "Lea Reyes",
    occupation: "Construction Worker / Seamstress",
    household: "6",
    address: "Plaridel, Bulacan",
    familyIncome: "125,000",
    educationCollege: "COE",
    yearLevel: "1st Year",
    educationGwa: "1.92",
    enrollment: "Enrolled",
    scholarship: "None",
    applicationStatus: "Pending Review"
  },
  1003: {
    title: "Profile | Ana Mae Cruz",
    heading: "Ana Mae Cruz",
    applicantId: "1003",
    studentNumber: "2024-028",
    lastName: "Cruz",
    firstName: "Ana Mae",
    middleName: "Rivera",
    program: "BSED",
    college: "CTE",
    gwa: "2.03",
    income: "95,000",
    status: "Pending Review",
    father: "Ramon Cruz",
    mother: "Teresa Cruz",
    occupation: "Farmer / Homemaker",
    household: "4",
    address: "San Rafael, Bulacan",
    familyIncome: "95,000",
    educationCollege: "CTE",
    yearLevel: "1st Year",
    educationGwa: "2.03",
    enrollment: "Enrolled",
    scholarship: "None",
    applicationStatus: "Pending Review"
  },
  1004: {
    title: "Profile | Krizzia Keith Garcia",
    heading: "Krizzia Keith Garcia",
    applicantId: "1004",
    studentNumber: "2024-001",
    lastName: "Garcia",
    firstName: "Krizzia Keith",
    middleName: "Luna",
    program: "BSIT",
    college: "CICT",
    gwa: "1.75",
    income: "100,000",
    status: "Pending Review",
    father: "xqtrv nplok",
    mother: "zmkia wreop",
    occupation: "plmno qzxrt / vbeui",
    household: "5",
    address: "Malolos, Bulacan",
    familyIncome: "100,000",
    educationCollege: "CICT",
    yearLevel: "1st Year",
    educationGwa: "1.75",
    enrollment: "Enrolled",
    scholarship: "None",
    applicationStatus: "Pending Review"
  }
};

const DEFAULT_ADMIN_PENDING_STUDENTS = [
  {
    title: "Profile | Maria Angela Dela Cruz",
    heading: "Maria Angela Dela Cruz",
    applicantId: "1005",
    studentNumber: "2024-045",
    lastName: "Dela Cruz",
    firstName: "Maria Angela",
    middleName: "Santos",
    program: "BSIT",
    college: "CICT",
    gwa: "1.68",
    income: "88,000",
    status: "Pending",
    father: "Eduardo Dela Cruz",
    mother: "Lorna Dela Cruz",
    occupation: "Driver / Vendor",
    household: "5",
    address: "Baliwag, Bulacan",
    familyIncome: "88,000",
    educationCollege: "CICT",
    yearLevel: "1st Year",
    educationGwa: "1.68",
    enrollment: "Enrolled",
    scholarship: "None",
    applicationStatus: "Pending"
  },
  {
    title: "Profile | Carlo Miguel Santos",
    heading: "Carlo Miguel Santos",
    applicantId: "1006",
    studentNumber: "2024-052",
    lastName: "Santos",
    firstName: "Carlo Miguel",
    middleName: "Reyes",
    program: "BSED",
    college: "CTE",
    gwa: "1.84",
    income: "92,000",
    status: "Pending",
    father: "Roberto Santos",
    mother: "Marites Santos",
    occupation: "Electrician / Store Keeper",
    household: "4",
    address: "Santa Maria, Bulacan",
    familyIncome: "92,000",
    educationCollege: "CTE",
    yearLevel: "1st Year",
    educationGwa: "1.84",
    enrollment: "Enrolled",
    scholarship: "None",
    applicationStatus: "Pending"
  },
  {
    title: "Profile | Jasmine Nicole Flores",
    heading: "Jasmine Nicole Flores",
    applicantId: "1007",
    studentNumber: "2024-061",
    lastName: "Flores",
    firstName: "Jasmine Nicole",
    middleName: "Torres",
    program: "BSCE",
    college: "COE",
    gwa: "1.71",
    income: "97,500",
    status: "Pending",
    father: "Antonio Flores",
    mother: "Luzviminda Flores",
    occupation: "Mechanic / Tailor",
    household: "6",
    address: "Malolos, Bulacan",
    familyIncome: "97,500",
    educationCollege: "COE",
    yearLevel: "1st Year",
    educationGwa: "1.71",
    enrollment: "Enrolled",
    scholarship: "None",
    applicationStatus: "Pending"
  },
  {
    title: "Profile | Daniel Joseph Navarro",
    heading: "Daniel Joseph Navarro",
    applicantId: "1008",
    studentNumber: "2024-073",
    lastName: "Navarro",
    firstName: "Daniel Joseph",
    middleName: "Mendoza",
    program: "BSIT",
    college: "CICT",
    gwa: "1.66",
    income: "89,000",
    status: "Pending",
    father: "Rogelio Navarro",
    mother: "Cynthia Navarro",
    occupation: "Technician / Seamstress",
    household: "5",
    address: "Meycauayan, Bulacan",
    familyIncome: "89,000",
    educationCollege: "CICT",
    yearLevel: "1st Year",
    educationGwa: "1.66",
    enrollment: "Enrolled",
    scholarship: "None",
    applicationStatus: "Pending"
  },
  {
    title: "Profile | Carl Santiago",
    heading: "Carl Santiago",
    applicantId: "1009",
    studentNumber: "2024-074",
    lastName: "Santiago",
    firstName: "Carl",
    middleName: "Pescador",
    program: "BIT",
    college: "CIT",
    gwa: "1.66",
    income: "89,000",
    status: "Pending",
    father: "Rogelio Santiago",
    mother: "Cynthia Santiago",
    occupation: "Technician / Seamstress",
    household: "5",
    address: "Meycauayan, Bulacan",
    familyIncome: "89,000",
    educationCollege: "CIT",
    yearLevel: "1st Year",
    educationGwa: "1.66",
    enrollment: "Enrolled",
    scholarship: "None",
    applicationStatus: "Pending"
  }
];

function readStorage(key, fallback = null) {
  try {
    const rawValue = localStorage.getItem(key);
    return rawValue ? JSON.parse(rawValue) : fallback;
  } catch (error) {
    return fallback;
  }
}

function writeStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function cloneData(value) {
  return JSON.parse(JSON.stringify(value));
}

function loadAdminApplicants() {
  const storedApplicants = readStorage(ADMIN_APPLICANTS_KEY, null);
  const baseApplicants = cloneData(DEFAULT_ADMIN_APPLICANTS);

  if (!storedApplicants || typeof storedApplicants !== "object" || Array.isArray(storedApplicants)) {
    return baseApplicants;
  }

  return {
    ...baseApplicants,
    ...storedApplicants
  };
}

function loadPendingStudents() {
  const storedPendingStudents = readStorage(ADMIN_PENDING_STUDENTS_KEY, null);
  const basePendingStudents = cloneData(DEFAULT_ADMIN_PENDING_STUDENTS);

  if (!Array.isArray(storedPendingStudents)) {
    return basePendingStudents;
  }

  const mergedPendingStudents = storedPendingStudents.map(function (student) {
    return {
      ...student
    };
  });

  const existingIds = new Set(
    mergedPendingStudents.map(function (student) {
      return String(student?.applicantId || "");
    })
  );

  basePendingStudents.forEach(function (student) {
    const applicantId = String(student.applicantId || "");

    if (!existingIds.has(applicantId)) {
      mergedPendingStudents.push(student);
    }
  });

  return mergedPendingStudents;
}

const ADMIN_APPLICANTS = loadAdminApplicants();
const ADMIN_PENDING_STUDENTS = loadPendingStudents();

writeStorage(ADMIN_APPLICANTS_KEY, ADMIN_APPLICANTS);
writeStorage(ADMIN_PENDING_STUDENTS_KEY, ADMIN_PENDING_STUDENTS);

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function titleCase(value) {
  return (value || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

function createSelectOptions(options, placeholder) {
  const items = [`<option value="">${placeholder}</option>`];

  options.forEach(function (option) {
    items.push(`<option value="${option}">${option}</option>`);
  });

  return items.join("");
}

function populateAddressSelect(field, options, placeholder, selectedValue) {
  if (!field) {
    return;
  }

  field.innerHTML = createSelectOptions(options, placeholder);
  field.disabled = !options.length;
  field.value = options.includes(selectedValue) ? selectedValue : "";
}

function setupAddressDropdowns(form, application) {
  const regionField = form.elements.namedItem("region");
  const provinceField = form.elements.namedItem("province");
  const cityField = form.elements.namedItem("city");
  const barangayField = form.elements.namedItem("barangay");

  if (!regionField || !provinceField || !cityField || !barangayField) {
    return;
  }

  const savedValues = {
    region: String(application?.region || "").trim(),
    province: String(application?.province || "").trim(),
    city: String(application?.city || "").trim(),
    barangay: String(application?.barangay || "").trim()
  };

  const regions = Object.keys(ADDRESS_OPTIONS);
  populateAddressSelect(regionField, regions, "Select", savedValues.region);

  function updateProvinces(selectedProvince = "") {
    const provinces = Object.keys(ADDRESS_OPTIONS[regionField.value] || {});
    populateAddressSelect(
      provinceField,
      provinces,
      regionField.value ? "Select" : "Select region first",
      selectedProvince
    );
    updateCities("");
  }

  function updateCities(selectedCity = "") {
    const cities = Object.keys(ADDRESS_OPTIONS[regionField.value]?.[provinceField.value] || {});
    populateAddressSelect(
      cityField,
      cities,
      provinceField.value ? "Select" : "Select province first",
      selectedCity
    );
    updateBarangays("");
  }

  function updateBarangays(selectedBarangay = "") {
    const barangays = ADDRESS_OPTIONS[regionField.value]?.[provinceField.value]?.[cityField.value] || [];
    populateAddressSelect(
      barangayField,
      barangays,
      cityField.value ? "Select" : "Select city first",
      selectedBarangay
    );
  }

  regionField.addEventListener("change", function () {
    updateProvinces("");
  });

  provinceField.addEventListener("change", function () {
    updateCities("");
  });

  cityField.addEventListener("change", function () {
    updateBarangays("");
  });

  if (savedValues.region) {
    updateProvinces(savedValues.province);

    if (savedValues.province) {
      updateCities(savedValues.city);
    }

    if (savedValues.city) {
      updateBarangays(savedValues.barangay);
    }
  } else {
    updateProvinces("");
  }
}

function getLeadingFirstName(value) {
  return String(value || "").trim().split(/\s+/).filter(Boolean)[0] || "";
}

function getApplicantProfile(id) {
  return ADMIN_APPLICANTS[String(id)] || ADMIN_APPLICANTS["1004"];
}

function rememberCurrentApplicant(id) {
  writeStorage(CURRENT_APPLICANT_KEY, String(id));
}

function readCurrentApplicant() {
  const params = new URLSearchParams(window.location.search);
  const applicantFromQuery = params.get("applicant");

  if (applicantFromQuery && ADMIN_APPLICANTS[applicantFromQuery]) {
    rememberCurrentApplicant(applicantFromQuery);
    return applicantFromQuery;
  }

  const applicantFromStorage = readStorage(CURRENT_APPLICANT_KEY, "1004");
  return ADMIN_APPLICANTS[applicantFromStorage] ? applicantFromStorage : "1004";
}

window.ADMIN_APPLICANTS = ADMIN_APPLICANTS;
window.getApplicantProfile = getApplicantProfile;
window.rememberCurrentApplicant = rememberCurrentApplicant;
window.readCurrentApplicant = readCurrentApplicant;

function sanitizeUserNames(user) {
  if (!user || !user.username) {
    return user;
  }

  const normalizedUsername = String(user.username).trim().toLowerCase();
  const normalizedFullName = String(user.fullName || "").trim().toLowerCase();
  const normalizedFirstName = String(user.firstName || "").trim().toLowerCase();

  if (normalizedFullName !== normalizedUsername && normalizedFirstName !== normalizedUsername) {
    return user;
  }

  return {
    ...user,
    fullName: "",
    firstName: "",
    lastName: ""
  };
}

function getCurrentUser() {
  const currentUser = readStorage(CURRENT_USER_KEY);
  const sanitizedUser = sanitizeUserNames(currentUser);

  if (currentUser && sanitizedUser && JSON.stringify(currentUser) !== JSON.stringify(sanitizedUser)) {
    writeStorage(CURRENT_USER_KEY, sanitizedUser);
  }

  return sanitizedUser;
}

function syncUserNamesFromApplication(user, application) {
  if (!user || !application) {
    return user;
  }

  const firstName = String(application.firstName || "").trim();
  const lastName = String(application.lastName || "").trim();
  const fullName = [firstName, lastName].filter(Boolean).join(" ");

  if (!firstName && !lastName) {
    return user;
  }

  const nextUser = {
    ...user,
    firstName: firstName || user.firstName || "",
    lastName: lastName || user.lastName || "",
    fullName: fullName || user.fullName || ""
  };

  if (JSON.stringify(nextUser) !== JSON.stringify(user)) {
    writeStorage(CURRENT_USER_KEY, nextUser);

    const registeredUser = readStorage(REGISTERED_USER_KEY);
    if (registeredUser && registeredUser.username === user.username) {
      writeStorage(REGISTERED_USER_KEY, {
        ...registeredUser,
        firstName: nextUser.firstName,
        lastName: nextUser.lastName,
        fullName: nextUser.fullName
      });
    }
  }

  return nextUser;
}

function getApplication() {
  const currentUser = getCurrentUser();
  const applications = readStorage(APPLICATIONS_KEY, {});

  if (!currentUser || !currentUser.email) {
    return null;
  }

  return applications[currentUser.email] || null;
}

function getDisplayName(user) {
  if (!user) {
    return "Student";
  }

  return user.fullName || user.firstName || user.username || user.email || "Student";
}

function getProfileMenuName(user) {
  if (!user) {
    return "Student";
  }

  return user.username || getDisplayName(user);
}

function logoutStudent() {
  localStorage.removeItem(CURRENT_USER_KEY);
  window.location.href = "login.html";
}

function getStudentApplicationStatus(user = getCurrentUser(), application = getApplication()) {
  if (!user) {
    return {
      label: "Not started",
      detail: "Please sign in to review your scholarship progress.",
      nextStep: "Log in to access the student portal.",
      actionHref: "login.html",
      actionLabel: "Go to login"
    };
  }

  if (!hasSubmittedApplication(user, application)) {
    return {
      label: "Not started",
      detail: "You have not submitted a scholarship application yet.",
      nextStep: "Log in first to continue to the scholarship application flow.",
      actionHref: "login.html",
      actionLabel: "Apply now"
    };
  }

  return {
    label: "Pending review",
    detail: "Your scholarship application has been submitted and is waiting for evaluation.",
    nextStep: "",
    actionHref: "student-profile.html",
    actionLabel: "View application"
  };
}

function buildInlineFeedbackModal() {
  const modal = document.createElement("div");
  modal.className = "inline-feedback-modal";
  modal.id = "inline-feedback-modal";
  modal.hidden = true;
  modal.innerHTML = `
    <div class="inline-feedback-backdrop" data-close-inline-feedback></div>
    <div class="inline-feedback-dialog" role="dialog" aria-modal="true" aria-label="Feedback">
      <div class="inline-feedback-content" data-inline-feedback-content></div>
    </div>
  `;

  modal.addEventListener("click", function (event) {
    if (event.target.matches("[data-close-inline-feedback]")) {
      closeInlineFeedbackModal();
    }
  });

  return modal;
}

function ensureInlineFeedbackModal() {
  let modal = document.getElementById("inline-feedback-modal");

  if (!modal) {
    modal = buildInlineFeedbackModal();
    document.body.appendChild(modal);
  }

  return modal;
}

function closeInlineFeedbackModal() {
  const modal = document.getElementById("inline-feedback-modal");

  if (!modal) {
    return;
  }

  modal.hidden = true;
  document.body.classList.remove("modal-open");
}

function buildInlineFeedbackCard(config) {
  const titleId = config.titleId || "inline-feedback-title";
  const title = config.title || "Notice";
  const text = config.text || "";
  const actions = Array.isArray(config.actions) ? config.actions : [];

  const actionsMarkup = actions
    .map(function (action, index) {
      const className = action.variant === "primary" ? ' class="button-link"' : "";
      const attributes = [`data-inline-action-index="${index}"`];

      if (action.type === "close") {
        attributes.push('href="#"');
      } else {
        attributes.push(`href="${action.href || "#"}"`);
      }

      return `<a${className} ${attributes.join(" ")}>${action.label || "Continue"}</a>`;
    })
    .join("");

  return `
    <div class="card small-card form-panel empty-application-dialog" role="dialog" aria-modal="true" aria-labelledby="${titleId}">
      <h1 id="${titleId}">${title}</h1>
      <p class="text">${text}</p>
      <div class="actions">
        ${actionsMarkup}
      </div>
    </div>
  `;
}

function getInlineFeedbackTemplate(pageHref) {
  if (pageHref === "not-qualified.html") {
    return `
      <div class="card small-card form-panel empty-application-dialog" role="dialog" aria-modal="true" aria-labelledby="not-qualified-title">
        <h1 id="not-qualified-title">Not Qualified</h1>
        <p class="text">The entered GWA does not meet the scholarship requirement.</p>
        <div class="actions">
          <a class="button-link back-pill-button" href="student-home.html">Back</a>
        </div>
      </div>
    `;
  }

  if (pageHref === "student-status.html") {
    return `
      <main class="card small-card form-panel empty-application-dialog" role="dialog" aria-modal="true" aria-labelledby="student-status-title">
        <h1 id="student-status-title" data-status-title>Application Status</h1>
        <p class="text" data-status-detail>Your application progress will appear here.</p>
        <p class="text" data-status-next-step></p>
        <div class="actions">
          <a class="button-link back-pill-button" href="student-home.html">Back</a>
          <a class="button-link" data-status-action href="user-screening.html">Apply now</a>
        </div>
      </main>
    `;
  }

  return `
    <div class="card small-card form-panel empty-application-dialog" role="dialog" aria-modal="true" aria-labelledby="confirmation-title">
      <h1 id="confirmation-title">Application Submitted</h1>
      <p class="text">Your scholarship application has been submitted successfully.</p>
      <div class="actions">
        <a class="button-link back-pill-button" href="student-home.html">Back</a>
        <a class="button-link" href="student-application-view.html">View Application</a>
      </div>
    </div>
  `;
}

function openInlineFeedbackModal(config) {
  const modal = ensureInlineFeedbackModal();
  const content = modal.querySelector("[data-inline-feedback-content]");
  const pageHref = config.pageHref || "confirmation.html";
  const customCard = config.card;
  content.innerHTML = customCard ? buildInlineFeedbackCard(customCard) : getInlineFeedbackTemplate(pageHref);

  if (pageHref === "student-status.html") {
    const title = content.querySelector("[data-status-title]");
    const detail = content.querySelector("[data-status-detail]");
    const nextStep = content.querySelector("[data-status-next-step]");
    const action = content.querySelector("[data-status-action]");
    const user = getCurrentUser();
    const application = getApplication();
    const status = getStudentApplicationStatus(user, application);

    if (title && detail && nextStep && action) {
      title.textContent = status.label;
      detail.textContent = status.detail;
      nextStep.textContent = status.nextStep;
      nextStep.hidden = !status.nextStep;
      action.href = status.actionHref;
      action.textContent = status.actionLabel;
    }
  }

  const linkNodes = Array.from(content.querySelectorAll("a[href]"));
  linkNodes.forEach(function (link) {
    link.addEventListener("click", function (event) {
      const href = link.getAttribute("href");
      const index = Number(link.dataset.inlineActionIndex);
      const action = customCard && Array.isArray(customCard.actions) ? customCard.actions[index] : null;

      if (action && action.type === "close") {
        event.preventDefault();
        closeInlineFeedbackModal();
        return;
      }

      if (!href || href === "#") {
        return;
      }

      event.preventDefault();
      closeInlineFeedbackModal();
      window.location.href = href;
    });
  });

  modal.hidden = false;
  document.body.classList.add("modal-open");
}

function openStudentStatusModal() {
  const user = getCurrentUser();
  const application = getApplication();
  const status = getStudentApplicationStatus(user, application);

  openInlineFeedbackModal({
    pageHref: "student-status.html"
  });
}

function openAdminDecisionModal(config) {
  openInlineFeedbackModal({
    card: {
      titleId: config.status === "Approved" ? "applicant-accepted-title" : "applicant-rejected-title",
      title: config.status === "Approved" ? "Applicant accepted" : "Applicant rejected",
      text: config.status === "Approved"
        ? `${config.fullName} has been marked as qualified for the scholarship.`
        : `${config.fullName} has been marked as not qualified for the scholarship.`,
      actions: [
        {
          label: "Close",
          type: "close",
          variant: "primary"
        }
      ]
    }
  });
}

function openApplicantReadyModal() {
  openInlineFeedbackModal({
    card: {
      titleId: "applicant-ready-title",
      title: "Applicant is ready for evaluation",
      text: "",
      actions: [
        {
          label: "Close",
          type: "close",
          variant: "primary"
        }
      ]
    }
  });
}

window.openApplicantReadyModal = openApplicantReadyModal;

function buildProfileMenu(user, options = {}) {
  const {
    includeToggle = true,
    toggleId = "profile-toggle",
    menuId = "profile-menu",
    toggleLabel = "Menu"
  } = options;
  const wrapper = document.createElement("div");
  wrapper.className = "profile-widget";
  wrapper.innerHTML = `
    ${includeToggle ? `
      <button type="button" class="profile-toggle" id="${toggleId}" aria-haspopup="true" aria-expanded="false">
        <span class="profile-trigger-text">${toggleLabel}</span>
      </button>
    ` : ""}
    <div class="profile-menu" id="${menuId}" hidden>
      <div class="profile-menu-label">Signed in as ${getProfileMenuName(user)}</div>
      <button type="button" class="profile-menu-item" data-profile-action="application">
        View Application
      </button>
      <button type="button" class="profile-menu-item danger" data-profile-action="logout">
        Log Out
      </button>
    </div>
  `;

  return wrapper;
}

function setupProfileMenuInteractions(host, toggle, menu, onAction, onEscape) {
  if (!host || !toggle || !menu) {
    return;
  }

  function closeMenu() {
    menu.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
    toggle.classList.remove("is-open");
  }

  toggle.addEventListener("click", function (event) {
    if (toggle.tagName === "A") {
      event.preventDefault();
    }

    const isOpen = !menu.hidden;
    menu.hidden = isOpen;
    toggle.setAttribute("aria-expanded", String(!isOpen));
    toggle.classList.toggle("is-open", !isOpen);
  });

  menu.addEventListener("click", function (event) {
    const actionButton = event.target.closest("[data-menu-action]");
    if (!actionButton) {
      return;
    }

    onAction(actionButton.dataset.menuAction, closeMenu, event);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeMenu();

      if (typeof onEscape === "function") {
        onEscape();
      }
    }
  });

  document.addEventListener("click", function (event) {
    if (!host.contains(event.target)) {
      closeMenu();
    }
  });
}

function buildApplicationModal() {
  const modal = document.createElement("div");
  modal.className = "profile-modal";
  modal.id = "application-modal";
  modal.hidden = true;
  modal.innerHTML = `
    <div class="profile-modal-backdrop" data-close-modal></div>
    <div class="profile-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="application-modal-title">
      <div class="profile-modal-header">
        <div>
          <p class="tag">Student Record</p>
          <h2 id="application-modal-title">Application Form</h2>
        </div>
        <button type="button" class="modal-close-button" aria-label="Close" data-close-modal>&times;</button>
      </div>
      <div class="profile-modal-content" id="application-modal-content"></div>
    </div>
  `;

  return modal;
}

function getApplicationFieldValue(application, field) {
  const value = application?.[field];
  return value && String(value).trim() ? value : "Not provided";
}

function hasSubmittedApplication(user = getCurrentUser(), application = getApplication()) {
  return Boolean(user && application && application.email === user.email);
}

function getStudentApplicationPage(user = getCurrentUser(), application = getApplication()) {
  return hasSubmittedApplication(user, application)
    ? "student-application-view.html"
    : "student-application-empty.html";
}

function parseProfileMoney(value) {
  return Number(String(value || "").replace(/[^\d.]/g, "")) || 0;
}

function formatProfileMoney(value) {
  const amount = parseProfileMoney(value);
  return amount ? amount.toLocaleString("en-PH") : "Not provided";
}

function buildStudentProfileData(user = getCurrentUser(), application = getApplication()) {
  if (!hasSubmittedApplication(user, application)) {
    return null;
  }

  const firstName = String(application.firstName || user?.firstName || "").trim();
  const lastName = String(application.lastName || user?.lastName || "").trim();
  const heading = [firstName, lastName].filter(Boolean).join(" ") || getDisplayName(user);
  const fatherIncome = parseProfileMoney(application.fatherIncome);
  const motherIncome = parseProfileMoney(application.motherIncome);
  const enrollment = String(application.enrolled || "").trim();
  const address = [
    application.streetAddress,
    application.barangay,
    application.city,
    application.province,
    application.region
  ]
    .map((value) => String(value || "").trim())
    .filter(Boolean)
    .join(", ");
  return {
    title: `Profile | ${heading}`,
    heading,
    studentNumber: getApplicationFieldValue(application, "studentNumber"),
    lastName: getApplicationFieldValue(application, "lastName"),
    firstName: getApplicationFieldValue(application, "firstName"),
    middleName: getApplicationFieldValue(application, "middleName"),
    program: getApplicationFieldValue(application, "program"),
    father: getApplicationFieldValue(application, "fatherName"),
    mother: getApplicationFieldValue(application, "motherName"),
    fatherOccupation: getApplicationFieldValue(application, "fatherOccupation"),
    motherOccupation: getApplicationFieldValue(application, "motherOccupation"),
    fatherIncome: formatProfileMoney(fatherIncome),
    motherIncome: formatProfileMoney(motherIncome),
    household: "Not provided",
    address: address || "Not provided",
    educationCollege: getApplicationFieldValue(application, "college"),
    yearLevel: getApplicationFieldValue(application, "yearLevel"),
    educationGwa: getApplicationFieldValue(application, "gwa"),
    enrollment: enrollment ? (enrollment.toLowerCase() === "yes" ? "Enrolled" : "Not Enrolled") : "Not provided",
    scholarship: "None",
    applicationStatus: "Pending Review",
    college: getApplicationFieldValue(application, "college")
  };
}

function buildApplicationViewMarkup(application) {
  if (!application) {
    return `
      <div class="application-empty-state">
        <p class="text">No submitted application form was found for this account yet.</p>
      </div>
    `;
  }

  return `
    <div class="application-profile-view">
      <section class="profile-section">
        <h2>Personal Information</h2>
        <div class="info-grid">
          <p><strong>Student No.:</strong> <span>${getApplicationFieldValue(application, "studentNumber")}</span></p>
          <p><strong>Email Address:</strong> <span>${getApplicationFieldValue(application, "email")}</span></p>
          <p><strong>Last Name:</strong> <span>${getApplicationFieldValue(application, "lastName")}</span></p>
          <p><strong>First Name:</strong> <span>${getApplicationFieldValue(application, "firstName")}</span></p>
          <p><strong>Middle Name:</strong> <span>${getApplicationFieldValue(application, "middleName")}</span></p>
          <p><strong>Suffix:</strong> <span>${getApplicationFieldValue(application, "suffix")}</span></p>
          <p><strong>Civil Status:</strong> <span>${getApplicationFieldValue(application, "civilStatus")}</span></p>
          <p><strong>Gender:</strong> <span>${getApplicationFieldValue(application, "gender")}</span></p>
          <p><strong>Date of Birth:</strong> <span>${getApplicationFieldValue(application, "dateOfBirth")}</span></p>
          <p><strong>Place of Birth:</strong> <span>${getApplicationFieldValue(application, "placeOfBirth")}</span></p>
          <p><strong>Mobile Number:</strong> <span>${getApplicationFieldValue(application, "mobileNumber")}</span></p>
          <p><strong>Telephone Number:</strong> <span>${getApplicationFieldValue(application, "telephoneNumber")}</span></p>
        </div>
      </section>

      <section class="profile-section">
        <h2>Address</h2>
        <div class="info-grid">
          <p><strong>Street &amp; House No.:</strong> <span>${getApplicationFieldValue(application, "streetAddress")}</span></p>
          <p><strong>Barangay:</strong> <span>${getApplicationFieldValue(application, "barangay")}</span></p>
          <p><strong>City:</strong> <span>${getApplicationFieldValue(application, "city")}</span></p>
          <p><strong>Province:</strong> <span>${getApplicationFieldValue(application, "province")}</span></p>
          <p><strong>Region:</strong> <span>${getApplicationFieldValue(application, "region")}</span></p>
        </div>
      </section>

      <section class="profile-section">
        <h2>Family Background</h2>
        <div class="info-grid">
          <p><strong>Father:</strong> <span>${getApplicationFieldValue(application, "fatherName")}</span></p>
          <p><strong>Mother:</strong> <span>${getApplicationFieldValue(application, "motherName")}</span></p>
          <p><strong>Father's Occupation:</strong> <span>${getApplicationFieldValue(application, "fatherOccupation")}</span></p>
          <p><strong>Mother's Occupation:</strong> <span>${getApplicationFieldValue(application, "motherOccupation")}</span></p>
          <p><strong>Father's Annual Income:</strong> <span>${getApplicationFieldValue(application, "fatherIncome")}</span></p>
          <p><strong>Mother's Annual Income:</strong> <span>${getApplicationFieldValue(application, "motherIncome")}</span></p>
          <p><strong>Siblings:</strong> <span>${getApplicationFieldValue(application, "siblings")}</span></p>
          <p><strong>Sibling's Education Level:</strong> <span>${getApplicationFieldValue(application, "siblingEducationLevel")}</span></p>
        </div>
      </section>

      <section class="profile-section">
        <h2>Education</h2>
        <div class="info-grid">
          <p><strong>College:</strong> <span>${getApplicationFieldValue(application, "college")}</span></p>
          <p><strong>Program:</strong> <span>${getApplicationFieldValue(application, "program")}</span></p>
          <p><strong>Year Level:</strong> <span>${getApplicationFieldValue(application, "yearLevel")}</span></p>
          <p><strong>Specialization:</strong> <span>${getApplicationFieldValue(application, "specialization")}</span></p>
          <p><strong>Enrolled:</strong> <span>${getApplicationFieldValue(application, "enrolled")}</span></p>
          <p><strong>GWA:</strong> <span>${getApplicationFieldValue(application, "gwa")}</span></p>
        </div>
      </section>

      <section class="profile-section">
        <h2>Other Details</h2>
        <div class="info-grid">
          <p><strong>Are you solo parent?</strong> <span>${getApplicationFieldValue(application, "soloParent")}</span></p>
          <p><strong>Are you child of a solo parent?</strong> <span>${getApplicationFieldValue(application, "childOfSoloParent")}</span></p>
          <p><strong>Are you a Student with Special Needs?</strong> <span>${getApplicationFieldValue(application, "pwd")}</span></p>
          <p><strong>Are you an Indigenous People?</strong> <span>${getApplicationFieldValue(application, "indigenous")}</span></p>
          <p><strong>Are you member of 4Ps?</strong> <span>${getApplicationFieldValue(application, "fourPsMember")}</span></p>
          <p><strong>Are you located in Geographically Isolated and Disadvantaged Area (GIDA)?</strong> <span>${getApplicationFieldValue(application, "currentScholarship")}</span></p>
        </div>
      </section>
    </div>
  `;
}

function buildApplicationDocumentMarkup(application) {
  if (!application) {
    return `
      <div class="application-empty-state">
        <p class="text">No submitted application form was found for this account yet.</p>
      </div>
    `;
  }

  const middleName = getApplicationFieldValue(application, "middleName");
  const suffix = getApplicationFieldValue(application, "suffix");
  const fullName = [
    getApplicationFieldValue(application, "firstName"),
    middleName === "Not provided" ? "" : middleName,
    getApplicationFieldValue(application, "lastName"),
    suffix === "Not provided" ? "" : suffix
  ].filter(Boolean).join(" ");
  const address = [
    application.streetAddress,
    application.barangay,
    application.city,
    application.province,
    application.region
  ].map(function (value) {
    return String(value || "").trim();
  }).filter(Boolean).join(", ") || "Not provided";
  const totalIncome = parseProfileMoney(application.fatherIncome) + parseProfileMoney(application.motherIncome);
  const generatedDate = new Date().toLocaleDateString("en-PH", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return `
    <article class="application-document-sheet">
      <header class="application-document-header">
        <p class="document-kicker">Republic of the Philippines</p>
        <h2>Bulacan State University Scholarship Office</h2>
        <p class="document-meta-line">Guinhawa, City of Malolos, Bulacan</p>
        <div class="document-title-band">
          <span>Scholarship Application Record</span>
        </div>
      </header>

      <section class="document-section">
        <div class="document-section-heading">
          <span>Applicant Information</span>
          <span class="document-section-note">Generated ${generatedDate}</span>
        </div>
        <div class="document-grid document-grid-three">
          <div class="document-field">
            <span class="document-label">Student Number</span>
            <strong>${getApplicationFieldValue(application, "studentNumber")}</strong>
          </div>
          <div class="document-field document-field-wide">
            <span class="document-label">Full Name</span>
            <strong>${fullName}</strong>
          </div>
          <div class="document-field">
            <span class="document-label">Email Address</span>
            <strong>${getApplicationFieldValue(application, "email")}</strong>
          </div>
          <div class="document-field">
            <span class="document-label">Mobile Number</span>
            <strong>${getApplicationFieldValue(application, "mobileNumber")}</strong>
          </div>
          <div class="document-field">
            <span class="document-label">Telephone Number</span>
            <strong>${getApplicationFieldValue(application, "telephoneNumber")}</strong>
          </div>
          <div class="document-field">
            <span class="document-label">Civil Status</span>
            <strong>${getApplicationFieldValue(application, "civilStatus")}</strong>
          </div>
          <div class="document-field">
            <span class="document-label">Gender</span>
            <strong>${getApplicationFieldValue(application, "gender")}</strong>
          </div>
          <div class="document-field">
            <span class="document-label">Date of Birth</span>
            <strong>${getApplicationFieldValue(application, "dateOfBirth")}</strong>
          </div>
          <div class="document-field">
            <span class="document-label">Place of Birth</span>
            <strong>${getApplicationFieldValue(application, "placeOfBirth")}</strong>
          </div>
        </div>
      </section>

      <section class="document-section">
        <div class="document-section-heading">
          <span>Residence and Family Background</span>
        </div>
        <div class="document-grid document-grid-two">
          <div class="document-field document-field-wide">
            <span class="document-label">Current Address</span>
            <strong>${address}</strong>
          </div>
          <div class="document-field">
            <span class="document-label">Father</span>
            <strong>${getApplicationFieldValue(application, "fatherName")}</strong>
          </div>
          <div class="document-field">
            <span class="document-label">Mother</span>
            <strong>${getApplicationFieldValue(application, "motherName")}</strong>
          </div>
          <div class="document-field">
            <span class="document-label">Father's Occupation</span>
            <strong>${getApplicationFieldValue(application, "fatherOccupation")}</strong>
          </div>
          <div class="document-field">
            <span class="document-label">Mother's Occupation</span>
            <strong>${getApplicationFieldValue(application, "motherOccupation")}</strong>
          </div>
          <div class="document-field">
            <span class="document-label">Father's Annual Income</span>
            <strong>${getApplicationFieldValue(application, "fatherIncome")}</strong>
          </div>
          <div class="document-field">
            <span class="document-label">Mother's Annual Income</span>
            <strong>${getApplicationFieldValue(application, "motherIncome")}</strong>
          </div>
          <div class="document-field">
            <span class="document-label">Combined Family Income</span>
            <strong>${formatProfileMoney(totalIncome)}</strong>
          </div>
          <div class="document-field">
            <span class="document-label">Siblings</span>
            <strong>${getApplicationFieldValue(application, "siblings")}</strong>
          </div>
        </div>
      </section>

      <section class="document-section">
        <div class="document-section-heading">
          <span>Academic Information</span>
        </div>
        <div class="document-grid document-grid-three">
          <div class="document-field">
            <span class="document-label">College</span>
            <strong>${getApplicationFieldValue(application, "college")}</strong>
          </div>
          <div class="document-field">
            <span class="document-label">Program</span>
            <strong>${getApplicationFieldValue(application, "program")}</strong>
          </div>
          <div class="document-field">
            <span class="document-label">Year Level</span>
            <strong>${getApplicationFieldValue(application, "yearLevel")}</strong>
          </div>
          <div class="document-field">
            <span class="document-label">Specialization</span>
            <strong>${getApplicationFieldValue(application, "specialization")}</strong>
          </div>
          <div class="document-field">
            <span class="document-label">Enrollment Status</span>
            <strong>${getApplicationFieldValue(application, "enrolled")}</strong>
          </div>
          <div class="document-field">
            <span class="document-label">General Weighted Average</span>
            <strong>${getApplicationFieldValue(application, "gwa")}</strong>
          </div>
        </div>
      </section>

      <section class="document-section">
        <div class="document-section-heading">
          <span>Eligibility Indicators</span>
        </div>
        <div class="document-grid document-grid-two">
          <div class="document-field">
            <span class="document-label">Solo Parent</span>
            <strong>${getApplicationFieldValue(application, "soloParent")}</strong>
          </div>
          <div class="document-field">
            <span class="document-label">Child of Solo Parent</span>
            <strong>${getApplicationFieldValue(application, "childOfSoloParent")}</strong>
          </div>
          <div class="document-field">
            <span class="document-label">Student with Special Needs</span>
            <strong>${getApplicationFieldValue(application, "pwd")}</strong>
          </div>
          <div class="document-field">
            <span class="document-label">Indigenous People</span>
            <strong>${getApplicationFieldValue(application, "indigenous")}</strong>
          </div>
          <div class="document-field">
            <span class="document-label">4Ps Member</span>
            <strong>${getApplicationFieldValue(application, "fourPsMember")}</strong>
          </div>
          <div class="document-field">
            <span class="document-label">Current Scholarship / GIDA</span>
            <strong>${getApplicationFieldValue(application, "currentScholarship")}</strong>
          </div>
        </div>
      </section>

      <footer class="application-document-footer">
        <p>
          This document summarizes the scholarship application details submitted by the student through the BulSU Scholarship Portal.
        </p>
        <div class="document-signature-row">
          <div class="document-signature">
            <span>Applicant's Signature</span>
          </div>
          <div class="document-signature">
            <span>Scholarship Office Use</span>
          </div>
        </div>
      </footer>
    </article>
  `;
}

function fillApplicationModal(user) {
  const content = document.getElementById("application-modal-content");
  const application = getApplication();

  if (!content) {
    return;
  }

  content.innerHTML = application && application.email === user.email
    ? buildApplicationViewMarkup(application)
    : buildApplicationViewMarkup(null);
}

function routeStudentProfile(user = getCurrentUser(), application = getApplication()) {
  window.location.href = "student-profile.html";
}

function populateApplicationViewPage() {
  const content = document.querySelector("[data-application-view-content]");

  if (!content) {
    return;
  }

  const user = getCurrentUser();
  const application = getApplication();
  const title = document.querySelector("[data-application-view-title]");
  const subtitle = document.querySelector("[data-application-view-subtitle]");
  const validApplication = hasSubmittedApplication(user, application) ? application : null;
  const displayFirstName = getLeadingFirstName(validApplication?.firstName || user?.firstName);

  if (title) {
    title.textContent = displayFirstName
      ? `${displayFirstName} | Application Form`
      : user
        ? `${getDisplayName(user)} | Application Form`
        : "Application Form";
  }

  if (subtitle) {
    subtitle.textContent = validApplication
      ? "Here is the submitted application form currently saved for your account."
      : "No submitted application form was found for this account yet.";
  }

  content.innerHTML = buildApplicationViewMarkup(validApplication);
}

function setupEmptyApplicationModalPage() {
  const modal = document.querySelector("[data-empty-application-modal]");

  if (!modal) {
    return;
  }

  const user = getCurrentUser();
  const application = getApplication();

  if (hasSubmittedApplication(user, application)) {
    window.location.href = "student-profile.html";
    return;
  }

  function closeModal() {
    window.location.href = "student-home.html";
  }

  modal.hidden = false;
  document.body.classList.add("modal-open");

  modal.addEventListener("click", function (event) {
    if (event.target.matches("[data-close-empty-modal]")) {
      closeModal();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeModal();
    }
  });
}

function setupProfileUi() {
  const user = syncUserNamesFromApplication(getCurrentUser(), getApplication());
  const host = document.querySelector("[data-profile-host]");
  const iconLink = document.querySelector(".student-side-page .alt-home-nav-icon-link");

  if (!user) {
    return;
  }

  const nameTarget = document.querySelector("[data-student-name]");
  if (nameTarget) {
    nameTarget.textContent = getProfileMenuName(user);
  }

  if (!host && !iconLink) {
    return;
  }

  let interactionHost = host;
  let toggle = null;
  let menu = null;
  let modal = document.getElementById("application-modal");

  if (iconLink) {
    const wrapper = buildProfileMenu(user, {
      includeToggle: false,
      menuId: "profile-menu"
    });
    wrapper.classList.add("student-nav-profile");
    iconLink.parentNode.insertBefore(wrapper, iconLink);
    wrapper.insertBefore(iconLink, wrapper.firstChild);
    iconLink.setAttribute("role", "button");
    iconLink.setAttribute("aria-haspopup", "true");
    iconLink.setAttribute("aria-expanded", "false");
    interactionHost = wrapper;
    toggle = iconLink;
    menu = wrapper.querySelector("#profile-menu");
  } else if (host) {
    host.appendChild(buildProfileMenu(user));
    toggle = document.getElementById("profile-toggle");
    menu = document.getElementById("profile-menu");
  }

  if (!modal && host) {
    document.body.appendChild(buildApplicationModal());
    modal = document.getElementById("application-modal");
  }

  function closeModal() {
    if (!modal) {
      return;
    }

    modal.hidden = true;
    document.body.classList.remove("modal-open");
  }

  menu.querySelectorAll("[data-profile-action]").forEach(function (button) {
    button.dataset.menuAction = button.dataset.profileAction;
  });

  setupProfileMenuInteractions(
    interactionHost,
    toggle,
    menu,
    function (action, closeMenu, event) {
      if (action === "application") {
        if (event) {
          event.preventDefault();
        }
        closeMenu();
        window.location.href = getStudentApplicationPage(user, getApplication());
        return;
      }

      if (action === "status") {
        event.preventDefault();
        closeMenu();
        openStudentStatusModal();
        return;
      }

      if (action === "logout") {
        logoutStudent();
      }
    },
    function () {
      closeModal();
    }
  );

  if (modal) {
    modal.addEventListener("click", function (event) {
      if (event.target.matches("[data-close-modal]")) {
        closeModal();
      }
    });
  }
}

function setupStudentProfileLinks() {
  const profileLinks = Array.from(document.querySelectorAll("[data-student-profile-link]"));

  if (!profileLinks.length) {
    return;
  }

  profileLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      const user = getCurrentUser();
      const application = getApplication();

      if (hasSubmittedApplication(user, application)) {
        return;
      }

      event.preventDefault();
      routeStudentProfile(user, application);
    });
  });
}

function requireAuthIfNeeded() {
  if (!document.body.hasAttribute("data-require-auth")) {
    return;
  }

  const currentUser = getCurrentUser();
  if (!currentUser) {
    window.location.href = "login.html";
  }
}

function setupRegistrationForm() {
  const form = document.getElementById("register-form");
  if (!form) {
    return;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const username = String(formData.get("username")).trim();

    writeStorage(REGISTERED_USER_KEY, {
      username,
      email: "",
      password: String(password)
    });

    writeStorage(CURRENT_USER_KEY, {
      username,
      email: ""
    });

    window.location.href = "user-screening.html";
  });
}

function setupLoginForm() {
  const form = document.getElementById("login-form");
  if (!form) {
    return;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    const username = String(formData.get("username")).trim();
    const password = String(formData.get("password"));
    const registeredUser = readStorage(REGISTERED_USER_KEY);

    if (registeredUser && (registeredUser.username !== username || registeredUser.password !== password)) {
      alert("The username or password does not match the registered student account.");
      return;
    }

    const matchedUser = registeredUser && registeredUser.username === username
      ? sanitizeUserNames(registeredUser)
      : {
        username,
        email: ""
      };

    writeStorage(CURRENT_USER_KEY, matchedUser);
    window.location.href = "user-screening.html";
  });
}

function setupApplicationForm() {
  const form = document.getElementById("application-form");
  const currentUser = getCurrentUser();

  if (!form || !currentUser) {
    return;
  }

  setupScrollSectionHighlight(".step-item[href^='#']", "active");

  const existingApplication = getApplication();
  setupAddressDropdowns(form, existingApplication);

  if (existingApplication && existingApplication.email === currentUser.email) {
    Object.entries(existingApplication).forEach(([key, value]) => {
      const field = form.elements.namedItem(key);
      if (field) {
        field.value = value;
      }
    });
  } else if (form.elements.namedItem("email")) {
    form.elements.namedItem("email").value = currentUser.email || "";
  }

  const emailField = form.elements.namedItem("email");
  if (emailField) {
    emailField.readOnly = Boolean(currentUser.email);
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    const payload = {};

    formData.forEach((value, key) => {
      payload[key] = String(value).trim();
    });

    const submittedEmail = String(formData.get("email")).trim().toLowerCase();
    const accountEmail = currentUser.email || submittedEmail;

    payload.email = accountEmail;
    payload.accountName = payload.firstName || getDisplayName({
      ...currentUser,
      email: accountEmail
    });

    const applications = readStorage(APPLICATIONS_KEY, {});
    applications[accountEmail] = payload;
    writeStorage(APPLICATIONS_KEY, applications);

    const updatedUser = {
      ...currentUser,
      email: accountEmail,
      firstName: payload.firstName || currentUser.firstName || "",
      lastName: payload.lastName || currentUser.lastName || "",
      fullName: [payload.firstName, payload.lastName].filter(Boolean).join(" ") || currentUser.fullName || ""
    };

    writeStorage(CURRENT_USER_KEY, updatedUser);

    const registeredUser = readStorage(REGISTERED_USER_KEY);
    if (registeredUser && registeredUser.username === currentUser.username) {
      writeStorage(REGISTERED_USER_KEY, {
        ...registeredUser,
        email: accountEmail,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        fullName: updatedUser.fullName
      });
    }

    openInlineFeedbackModal({
      pageHref: "confirmation.html"
    });
  });
}

function normalizeStudentStatus(status) {
  const normalizedStatus = String(status || "").trim().toLowerCase();

  if (normalizedStatus === "accepted" || normalizedStatus === "qualified") {
    return "Accepted";
  }

  if (normalizedStatus === "rejected") {
    return "Rejected";
  }

  return "Pending";
}

function buildStudentStatusMarkup(status) {
  const normalizedStatus = normalizeStudentStatus(status);
  const safeLabel = escapeHtml(normalizedStatus);
  let className = "pending";

  if (normalizedStatus === "Accepted") {
    className = "accepted";
  } else if (normalizedStatus === "Rejected") {
    className = "rejected";
  }

  return `<span class="status ${className}">${safeLabel}</span>`;
}

function buildAdminStudentRowMarkup(student) {
  const normalizedStatus = normalizeStudentStatus(student.status);

  return `
    <tr data-college="${escapeHtml(student.college)}" data-program="${escapeHtml(student.program)}" data-status="${escapeHtml(normalizedStatus)}">
      <td>${escapeHtml(student.userId)}</td>
      <td>${escapeHtml(student.studentNumber)}</td>
      <td>${escapeHtml(student.lastName)}</td>
      <td>${escapeHtml(student.firstName)}</td>
      <td>${escapeHtml(student.middleName)}</td>
      <td>${escapeHtml(student.college)}</td>
      <td>${escapeHtml(student.program)}</td>
      <td>${buildStudentStatusMarkup(normalizedStatus)}</td>
    </tr>
  `.trim();
}

function getNextAdminStudentId(tableBody) {
  const ids = Array.from(tableBody.querySelectorAll("tr"))
    .map(function (row) {
      return Number.parseInt(row.children[0]?.textContent || "", 10);
    })
    .filter(Number.isFinite);

  return String((ids.length ? Math.max(...ids) : 1000) + 1);
}

function getNextAdminStudentIdFromList(students) {
  const ids = Array.from(students || [])
    .map(function (student) {
      return Number.parseInt(student?.userId || "", 10);
    })
    .filter(Number.isFinite);

  return String((ids.length ? Math.max(...ids) : 1000) + 1);
}

function appendAdminStudentRow(tableBody, student) {
  tableBody.insertAdjacentHTML("beforeend", buildAdminStudentRowMarkup(student));
}

function populateStoredAdminStudents() {
  const tableBody = document.getElementById("students-table-body");

  if (!tableBody) {
    return;
  }

  const storedStudents = readStorage(ADMIN_STUDENTS_KEY, []);

  storedStudents.forEach(function (student) {
    appendAdminStudentRow(tableBody, student);
  });
}

function setupAddStudentFormPage() {
  const form = document.getElementById("add-student-form");

  if (!form) {
    return;
  }

  const parentTargetOrigin = window.location.origin === "null" ? "*" : window.location.origin;

  setupAddressDropdowns(form);

  const closeButtons = Array.from(document.querySelectorAll("[data-close-add-student-form]"));
  closeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      window.parent?.postMessage(
        {
          type: "scholarshipPortal.closeAddStudentModal"
        },
        parentTargetOrigin
      );
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    const payload = {};

    formData.forEach(function (value, key) {
      payload[key] = String(value).trim();
    });

    payload.middleName = payload.middleName || "";

    window.parent?.postMessage(
      {
        type: "scholarshipPortal.addStudent",
        student: payload
      },
      parentTargetOrigin
    );

    form.reset();
    setupAddressDropdowns(form);
  });
}

function setupScrollSectionHighlight(linkSelector, activeClass) {
  const navLinks = Array.from(document.querySelectorAll(linkSelector));
  const trackedSections = navLinks
    .map(function (navLink) {
      const targetId = navLink.getAttribute("href");
      const section = targetId ? document.querySelector(targetId) : null;

      if (!section) {
        return null;
      }

      return {
        navLink,
        section
      };
    })
    .filter(Boolean);

  if (!trackedSections.length) {
    return;
  }

  const parentNav = navLinks[0].closest(".profile-tabs, .step-list, nav");

  if (parentNav && parentNav.classList.contains("profile-tabs")) {
    parentNav.setAttribute("role", "tablist");
    parentNav.setAttribute("aria-label", "Profile sections");
  }

  trackedSections.forEach(function ({ navLink, section }, index) {
    const sectionId = section.id || `section-${index + 1}`;
    const tabId = navLink.id || `${sectionId}-tab`;

    section.id = sectionId;
    navLink.id = tabId;

    if (parentNav && parentNav.classList.contains("profile-tabs")) {
      navLink.setAttribute("role", "tab");
      navLink.setAttribute("aria-controls", sectionId);
      navLink.setAttribute("aria-selected", index === 0 ? "true" : "false");
      navLink.setAttribute("tabindex", index === 0 ? "0" : "-1");
      section.setAttribute("role", "tabpanel");
      section.setAttribute("aria-labelledby", tabId);
    }
  });

  function setActiveLink(activeId) {
    trackedSections.forEach(function ({ navLink, section }) {
      const isActive = section.id === activeId;
      navLink.classList.toggle(activeClass, isActive);

      if (parentNav && parentNav.classList.contains("profile-tabs")) {
        navLink.setAttribute("aria-selected", String(isActive));
        navLink.setAttribute("tabindex", isActive ? "0" : "-1");
      }
    });
  }

  function shouldPreferLastSection() {
    const lastTrackedSection = trackedSections[trackedSections.length - 1].section;
    const lastSectionTop = lastTrackedSection.getBoundingClientRect().top;
    const isNearPageBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 120;

    return isNearPageBottom || lastSectionTop <= window.innerHeight * 0.45;
  }

  function updateActiveLinkOnScroll() {
    const triggerLine = window.innerHeight * 0.35;
    let activeSection = trackedSections[0].section;
    const lastTrackedSection = trackedSections[trackedSections.length - 1].section;

    if (shouldPreferLastSection()) {
      setActiveLink(lastTrackedSection.id);
      return;
    }

    trackedSections.forEach(function ({ section }) {
      const sectionTop = section.getBoundingClientRect().top;

      if (sectionTop <= triggerLine) {
        activeSection = section;
      }
    });

    setActiveLink(activeSection.id);
  }

  function getMostVisibleSection(entries) {
    const visibleEntries = entries.filter(function (entry) {
      return entry.isIntersecting;
    });

    if (!visibleEntries.length) {
      return null;
    }

    visibleEntries.sort(function (entryA, entryB) {
      if (entryB.intersectionRatio !== entryA.intersectionRatio) {
        return entryB.intersectionRatio - entryA.intersectionRatio;
      }

      return entryA.boundingClientRect.top - entryB.boundingClientRect.top;
    });

    return visibleEntries[0].target;
  }

  navLinks.forEach(function (navLink) {
    navLink.addEventListener("click", function (event) {
      const targetId = navLink.getAttribute("href")?.slice(1);
      const targetSection = targetId ? document.getElementById(targetId) : null;

      if (!targetId || !targetSection) {
        return;
      }

      event.preventDefault();
      setActiveLink(targetId);

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const navOffset = parseFloat(getComputedStyle(document.body).getPropertyValue("--student-nav-height")) || 0;
      const targetTop = window.scrollY + targetSection.getBoundingClientRect().top - navOffset - 32;

      window.scrollTo({
        top: Math.max(0, targetTop),
        behavior: reducedMotion ? "auto" : "smooth"
      });

      if (window.location.hash !== `#${targetId}`) {
        history.replaceState(null, "", `#${targetId}`);
      }
    });

    navLink.addEventListener("keydown", function (event) {
      if (event.key !== "ArrowDown" && event.key !== "ArrowRight" && event.key !== "ArrowUp" && event.key !== "ArrowLeft") {
        return;
      }

      event.preventDefault();

      const currentIndex = navLinks.indexOf(navLink);
      const direction = event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1;
      const nextIndex = (currentIndex + direction + navLinks.length) % navLinks.length;
      navLinks[nextIndex].focus();
    });
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        if (shouldPreferLastSection()) {
          setActiveLink(trackedSections[trackedSections.length - 1].section.id);
          return;
        }

        const visibleSection = getMostVisibleSection(entries);
        if (visibleSection?.id) {
          setActiveLink(visibleSection.id);
          return;
        }

        updateActiveLinkOnScroll();
      },
      {
        root: null,
        rootMargin: "-18% 0px -52% 0px",
        threshold: [0.2, 0.35, 0.5, 0.65]
      }
    );

    trackedSections.forEach(function ({ section }) {
      observer.observe(section);
    });
  }

  window.addEventListener("scroll", updateActiveLinkOnScroll, { passive: true });
  window.addEventListener("resize", updateActiveLinkOnScroll);
  updateActiveLinkOnScroll();
}

function getCurrentAdmin() {
  return readStorage(CURRENT_ADMIN_KEY);
}

function logoutAdmin() {
  localStorage.removeItem(CURRENT_ADMIN_KEY);
  window.location.href = "admin-login.html";
}

function buildAdminProfileMenu(admin) {
  const wrapper = document.createElement("div");
  wrapper.className = "profile-widget";
  wrapper.innerHTML = `
    <button
      type="button"
      class="profile-toggle admin-profile-toggle"
      id="admin-profile-toggle"
      aria-haspopup="true"
      aria-expanded="false"
      aria-label="Admin menu"
      title="Admin menu"
    >
      <span class="profile-avatar" aria-hidden="true">
        <img src="user_icon.png" alt="" class="profile-avatar-image admin-profile-avatar-image">
      </span>
    </button>
    <div class="profile-menu" id="admin-profile-menu" hidden>
      <div class="profile-menu-label">Signed in as ${admin.displayName || admin.username || "Admin"}</div>
      <button type="button" class="profile-menu-item danger" data-admin-action="logout" data-menu-action="logout">
        Log Out
      </button>
    </div>
  `;

  return wrapper;
}

function setupAdminLoginForm() {
  const form = document.getElementById("admin-login-form");
  if (!form) {
    return;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    const username = String(formData.get("username")).trim();
    const password = String(formData.get("password"));
    const matchedAdmin = ADMIN_CREDENTIALS.find(function (admin) {
      return admin.username === username && admin.password === password;
    });

    if (!matchedAdmin) {
      alert("Incorrect admin username or password.");
      return;
    }

    writeStorage(CURRENT_ADMIN_KEY, {
      username,
      displayName: matchedAdmin.displayName || titleCase(username.replace(/[._-]+/g, " ")) || "Admin"
    });

    window.location.href = "admin.html";
  });
}

function requireAdminAuthIfNeeded() {
  if (!document.body.hasAttribute("data-require-admin-auth")) {
    return;
  }

  if (!getCurrentAdmin()) {
    window.location.href = "admin-login.html";
  }
}

function setupAdminProfileUi() {
  const host = document.querySelector("[data-admin-profile-host]");
  const admin = getCurrentAdmin();
  console.log("Host found:", host);   // Check if the div exists
  console.log("Admin found:", admin);
  if (!host || !admin) {
    return;
  }

  host.appendChild(buildAdminProfileMenu(admin));

  const toggle = document.getElementById("admin-profile-toggle");
  const menu = document.getElementById("admin-profile-menu");

  menu.querySelectorAll("[data-admin-action]").forEach(function (button) {
    button.dataset.menuAction = button.dataset.adminAction;
  });

  setupProfileMenuInteractions(host, toggle, menu, function (action) {
    if (action === "logout") {
      logoutAdmin();
    }
  });

  document.addEventListener("click", function (event) {
    const logoutLink = event.target.closest("[data-admin-logout-link]");
    if (logoutLink) {
      event.preventDefault();
      logoutAdmin();
    }
  });
}

function setupStudentFilters() {
  const filterButton = document.getElementById("student-filter-button");
  const filterMenu = document.getElementById("student-filter-menu");
  const filterValueSelect = document.getElementById("student-filter-value");
  const filterTypeButtons = Array.from(document.querySelectorAll("[data-filter-type]"));
  const searchInput = document.getElementById("student-search");
  const tableBody = document.getElementById("students-table-body");
  const emptyState = document.getElementById("students-empty-state");

  if (
    !filterButton ||
    !filterMenu ||
    !filterValueSelect ||
    !searchInput ||
    !tableBody ||
    !emptyState
  ) {
    return;
  }

  const filterOptions = {
    college: [
      { value: "all", label: "All Colleges" },
      { value: "CICT", label: "CICT" },
      { value: "COE", label: "COE" },
      { value: "CTE", label: "CTE" },
      { value: "CBA", label: "CBA" }
    ],
    program: [
      { value: "all", label: "All Programs" },
      { value: "BSIT", label: "BSIT" },
      { value: "BSCE", label: "BSCE" },
      { value: "BSED", label: "BSED" },
      { value: "BSBA", label: "BSBA" }
    ],
    status: [
      { value: "all", label: "All Status" },
      { value: "Pending", label: "Pending" },
      { value: "Accepted", label: "Accepted" },
      { value: "Rejected", label: "Rejected" }
    ]
  };
  let activeFilterType = "";
  let activeFilterValue = "all";

  function normalizeValue(value) {
    return String(value || "").trim().toLowerCase();
  }

  function setFilterMenuOpen(isOpen) {
    filterMenu.hidden = !isOpen;
    filterButton.setAttribute("aria-expanded", String(isOpen));
  }

  function populateFilterValues(filterType) {
    const options = filterOptions[filterType] || [{ value: "all", label: "All" }];

    filterValueSelect.innerHTML = options
      .map(function (option) {
        return `<option value="${option.value}">${option.label}</option>`;
      })
      .join("");

    filterValueSelect.hidden = false;
    filterValueSelect.value = "all";
    activeFilterType = filterType;
    activeFilterValue = "all";

    filterTypeButtons.forEach(function (button) {
      button.classList.toggle("is-active", button.dataset.filterType === filterType);
    });
  }

  function applyStudentFilters() {
    const rows = Array.from(tableBody.querySelectorAll("tr"));
    const searchValue = normalizeValue(searchInput.value);
    const selectedFilterType = activeFilterType;
    const selectedFilterValue = normalizeValue(activeFilterValue);

    let visibleRowCount = 0;

    rows.forEach(function (row) {
      const rowCollege = normalizeValue(row.dataset.college);
      const rowProgram = normalizeValue(row.dataset.program);
      const rowStatus = normalizeValue(row.dataset.status);
      const rowText = normalizeValue(row.textContent);
      let matchesChosenFilter = true;

      const matchesSearch = !searchValue || rowText.includes(searchValue);

      if (selectedFilterType && selectedFilterValue !== "all") {
        if (selectedFilterType === "college") {
          matchesChosenFilter = rowCollege === selectedFilterValue;
        } else if (selectedFilterType === "program") {
          matchesChosenFilter = rowProgram === selectedFilterValue;
        } else if (selectedFilterType === "status") {
          matchesChosenFilter = rowStatus === selectedFilterValue;
        }
      }

      const isVisible = matchesSearch && matchesChosenFilter;

      row.hidden = !isVisible;

      if (isVisible) {
        visibleRowCount += 1;
      }
    });

    emptyState.hidden = visibleRowCount !== 0;
  }

  filterButton.addEventListener("click", function () {
    setFilterMenuOpen(filterMenu.hidden);
  });

  filterTypeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      populateFilterValues(button.dataset.filterType);
    });
  });

  filterValueSelect.addEventListener("change", function () {
    activeFilterValue = filterValueSelect.value;
    applyStudentFilters();
    setFilterMenuOpen(false);
  });

  searchInput.addEventListener("input", applyStudentFilters);

  document.addEventListener("click", function (event) {
    if (!event.target.closest(".filter-dropdown")) {
      setFilterMenuOpen(false);
    }
  });

  tableBody.addEventListener("studentlist:refresh", applyStudentFilters);
}

function setupAddStudentModal() {
  const openButton = document.getElementById("open-add-student-modal");
  const modal = document.getElementById("student-form-modal");
  const frame = document.getElementById("student-form-modal-frame");
  const tableBody = document.getElementById("students-table-body");
  const emptyState = document.getElementById("students-empty-state");
  const pendingSelectionBody = document.getElementById("pending-students-selection-body");
  const pendingEmptyState = document.getElementById("pending-students-empty-state");
  const hasInlinePendingSelection = Boolean(pendingSelectionBody && pendingEmptyState);

  if (!modal) {
    return;
  }

  const closeNodes = Array.from(modal.querySelectorAll("[data-close-add-student-modal]"));
  const storedStudents = readStorage(ADMIN_STUDENTS_KEY, []);

  function refreshStudentTable() {
    if (!tableBody || !emptyState) {
      return;
    }

    tableBody.dispatchEvent(new CustomEvent("studentlist:refresh"));
    emptyState.hidden = tableBody.querySelectorAll("tr:not([hidden])").length !== 0;
  }

  function openModal() {
    if (hasInlinePendingSelection) {
      renderInlinePendingApplicants();
    }

    modal.hidden = false;
    document.body.classList.add("modal-open");
  }

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
  }

  function handlePendingApplicantSelection(applicant) {
    if (!applicant) {
      return;
    }

    window.dispatchEvent(
      new CustomEvent("scholarshipPortal:pendingApplicantSelected", {
        detail: {
          applicant: applicant
        }
      })
    );
    closeModal();
  }

  window.handlePendingApplicantSelection = handlePendingApplicantSelection;
  window.closeAddStudentModal = closeModal;

  function normalizePendingValue(value) {
    return String(value || "").trim().toLowerCase();
  }

  function getInlinePendingApplicants() {
    return (window.ADMIN_PENDING_STUDENTS || []).filter(function (applicant) {
      return normalizePendingValue(applicant.status) === "pending";
    });
  }

  function renderInlinePendingApplicants() {
    if (!hasInlinePendingSelection) {
      return;
    }

    const pendingApplicants = getInlinePendingApplicants();

    pendingSelectionBody.innerHTML = pendingApplicants.map(function (applicant) {
      const fullName = `${applicant.lastName}, ${applicant.firstName}`;

      return `
        <tr data-pending-applicant-id="${escapeHtml(applicant.applicantId)}">
          <td>${escapeHtml(applicant.applicantId)}</td>
          <td>${escapeHtml(applicant.studentNumber)}</td>
          <td>${escapeHtml(fullName)}</td>
          <td>${escapeHtml(applicant.program)}</td>
          <td>${escapeHtml(applicant.gwa)}</td>
        </tr>
      `;
    }).join("");

    pendingEmptyState.hidden = pendingApplicants.length !== 0;
  }

  function selectInlinePendingApplicant(applicantId) {
    const pendingStudents = window.ADMIN_PENDING_STUDENTS || [];
    const applicantIndex = pendingStudents.findIndex(function (item) {
      return String(item.applicantId) === String(applicantId);
    });
    const applicant = applicantIndex >= 0 ? pendingStudents[applicantIndex] : null;

    if (!applicant) {
      return;
    }

    pendingStudents[applicantIndex] = {
      ...applicant,
      status: "Selected"
    };

    writeStorage(ADMIN_PENDING_STUDENTS_KEY, pendingStudents);
    window.ADMIN_PENDING_STUDENTS = pendingStudents;
    renderInlinePendingApplicants();

    if (typeof window.addApplicantToEvaluation === "function") {
      window.addApplicantToEvaluation(applicant);
    } else {
      handlePendingApplicantSelection(applicant);
    }

    closeModal();
  }

  if (openButton) {
    openButton.addEventListener("click", openModal);
  }

  closeNodes.forEach(function (node) {
    node.addEventListener("click", closeModal);
  });

  if (hasInlinePendingSelection) {
    pendingSelectionBody.addEventListener("click", function (event) {
      const row = event.target.closest("[data-pending-applicant-id]");

      if (!row) {
        return;
      }

      selectInlinePendingApplicant(row.dataset.pendingApplicantId);
    });
  }

  if (frame) {
    window.addEventListener("message", function (event) {
      if (event.source !== frame.contentWindow) {
        return;
      }

      const sameOrigin =
        window.location.origin === "null"
          ? event.origin === "null" || event.origin === ""
          : event.origin === window.location.origin;

      if (!sameOrigin || !event.data || typeof event.data !== "object") {
        return;
      }

      if (event.data.type === "scholarshipPortal.closeAddStudentModal") {
        closeModal();
        return;
      }

      if (event.data.type === "scholarshipPortal.resizeAddStudentModal") {
        const nextHeight = Number.parseFloat(event.data.height);

        if (Number.isFinite(nextHeight) && nextHeight > 0) {
          frame.style.height = `${Math.min(nextHeight, window.innerHeight - 96)}px`;
        }
        return;
      }

      if (event.data.type === "scholarshipPortal.selectPendingApplicant" && event.data.applicant) {
        handlePendingApplicantSelection(event.data.applicant);
        return;
      }

      if (event.data.type !== "scholarshipPortal.addStudent" || !event.data.student) {
        return;
      }

      const student = {
        ...event.data.student,
        userId: tableBody ? getNextAdminStudentId(tableBody) : getNextAdminStudentIdFromList(storedStudents),
        status: normalizeStudentStatus(event.data.student.status)
      };

      if (tableBody) {
        appendAdminStudentRow(tableBody, student);
      }

      writeStorage(ADMIN_STUDENTS_KEY, [...storedStudents, student]);
      storedStudents.push(student);
      refreshStudentTable();
      closeModal();
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !modal.hidden) {
      closeModal();
    }
  });

  refreshStudentTable();
}

function setupPendingStudentsSelectionPage() {
  const tableBody = document.getElementById("pending-students-selection-body");
  const emptyState = document.getElementById("pending-students-empty-state");

  if (
    !tableBody ||
    !emptyState ||
    !document.body.classList.contains("pending-students-modal-page")
  ) {
    return;
  }

  const parentOrigin = window.location.origin === "null" ? "*" : window.location.origin;
  let pendingStudents = [];

  function syncModalHeight() {
    const root = document.documentElement;
    const body = document.body;
    const nextHeight = Math.ceil(
      Math.max(
        root ? root.scrollHeight : 0,
        root ? root.offsetHeight : 0,
        body ? body.scrollHeight : 0,
        body ? body.offsetHeight : 0
      )
    );

    window.parent?.postMessage(
      {
        type: "scholarshipPortal.resizeAddStudentModal",
        height: nextHeight
      },
      parentOrigin
    );
  }

  function normalizeValue(value) {
    return String(value || "").trim().toLowerCase();
  }

  try {
    if (window.parent && window.parent !== window && Array.isArray(window.parent.ADMIN_PENDING_STUDENTS)) {
      pendingStudents = window.parent.ADMIN_PENDING_STUDENTS;
    } else if (Array.isArray(window.ADMIN_PENDING_STUDENTS)) {
      pendingStudents = window.ADMIN_PENDING_STUDENTS;
    }
  } catch (error) {
    pendingStudents = Array.isArray(window.ADMIN_PENDING_STUDENTS) ? window.ADMIN_PENDING_STUDENTS : [];
  }

  function getPendingApplicants() {
    return pendingStudents.filter(function (applicant) {
      return normalizeValue(applicant.status) === "pending";
    });
  }

  function renderPendingApplicants() {
    const pendingApplicants = getPendingApplicants();

    tableBody.innerHTML = pendingApplicants.map(function (applicant) {
      const fullName = `${applicant.lastName}, ${applicant.firstName}`;

      return `
        <tr data-pending-applicant-id="${escapeHtml(applicant.applicantId)}">
          <td>${escapeHtml(applicant.applicantId)}</td>
          <td>${escapeHtml(applicant.studentNumber)}</td>
          <td>${escapeHtml(fullName)}</td>
          <td>${escapeHtml(applicant.program)}</td>
          <td>${escapeHtml(applicant.gwa)}</td>
        </tr>
      `;
    }).join("");

    emptyState.hidden = pendingApplicants.length !== 0;
    syncModalHeight();
  }

  renderPendingApplicants();

  window.addEventListener("load", syncModalHeight);
  window.addEventListener("resize", syncModalHeight);

  tableBody.addEventListener("click", function (event) {
    const row = event.target.closest("[data-pending-applicant-id]");

    if (!row) {
      return;
    }

    const applicantId = row.dataset.pendingApplicantId;
    const applicantIndex = pendingStudents.findIndex(function (item) {
      return String(item.applicantId) === String(applicantId);
    });
    const applicant = applicantIndex >= 0 ? pendingStudents[applicantIndex] : null;

    if (!applicant) {
      return;
    }

    pendingStudents[applicantIndex] = {
      ...applicant,
      status: "Selected"
    };
    writeStorage(ADMIN_PENDING_STUDENTS_KEY, pendingStudents);
    window.ADMIN_PENDING_STUDENTS = pendingStudents;

    renderPendingApplicants();

    try {
      if (
        window.parent &&
        typeof window.parent.addApplicantToEvaluation === "function" &&
        typeof window.parent.closeAddStudentModal === "function"
      ) {
        window.parent.closeAddStudentModal();
        window.parent.addApplicantToEvaluation(applicant);
        return;
      }

      if (window.parent && typeof window.parent.handlePendingApplicantSelection === "function") {
        window.parent.handlePendingApplicantSelection(applicant);
        return;
      }
    } catch (error) {
      // Fallback to postMessage below when direct parent access is unavailable.
    }

    window.parent?.postMessage(
      {
        type: "scholarshipPortal.selectPendingApplicant",
        applicant: applicant
      },
      parentOrigin
    );
  });
}

function setupScholarsFilters() {
  const filterButton = document.getElementById("scholars-filter-button");
  const filterMenu = document.getElementById("scholars-filter-menu");
  const filterValueSelect = document.getElementById("scholars-filter-value");
  const filterTypeButtons = Array.from(document.querySelectorAll("[data-scholars-filter-type]"));
  const tableBody = document.getElementById("scholars-table-body");
  const emptyState = document.getElementById("scholars-empty-state");

  if (
    !filterButton ||
    !filterMenu ||
    !filterValueSelect ||
    !filterTypeButtons.length ||
    !tableBody ||
    !emptyState
  ) {
    return;
  }

  const rows = Array.from(tableBody.querySelectorAll("tr"));
  const filterOptions = {
    program: [
      { value: "all", label: "All Programs" },
      { value: "BSIT", label: "BSIT" },
      { value: "BSCE", label: "BSCE" },
      { value: "BSED", label: "BSED" }
    ],
    status: [
      { value: "all", label: "All Status" },
      { value: "Active", label: "Active" },
      { value: "Inactive", label: "Inactive" }
    ]
  };
  let activeFilterType = "";
  let activeFilterValue = "all";

  function normalizeValue(value) {
    return String(value || "").trim().toLowerCase();
  }

  function setFilterMenuOpen(isOpen) {
    filterMenu.hidden = !isOpen;
    filterButton.setAttribute("aria-expanded", String(isOpen));
  }

  function populateFilterValues(filterType) {
    const options = filterOptions[filterType] || [{ value: "all", label: "All" }];

    filterValueSelect.innerHTML = options
      .map(function (option) {
        return `<option value="${option.value}">${option.label}</option>`;
      })
      .join("");

    filterValueSelect.hidden = false;
    filterValueSelect.value = "all";
    activeFilterType = filterType;
    activeFilterValue = "all";

    filterTypeButtons.forEach(function (button) {
      button.classList.toggle("is-active", button.dataset.scholarsFilterType === filterType);
    });

    applyScholarsFilters();
  }

  function applyScholarsFilters() {
    const selectedFilterType = activeFilterType;
    const selectedFilterValue = normalizeValue(activeFilterValue);
    let visibleRowCount = 0;

    rows.forEach(function (row) {
      const rowProgram = normalizeValue(row.dataset.program);
      const rowStatus = normalizeValue(row.dataset.status);
      let matchesChosenFilter = true;

      if (selectedFilterType && selectedFilterValue !== "all") {
        if (selectedFilterType === "program") {
          matchesChosenFilter = rowProgram === selectedFilterValue;
        } else if (selectedFilterType === "status") {
          matchesChosenFilter = rowStatus === selectedFilterValue;
        }
      }

      row.hidden = !matchesChosenFilter;

      if (matchesChosenFilter) {
        visibleRowCount += 1;
      }
    });

    emptyState.hidden = visibleRowCount !== 0;
  }

  filterButton.addEventListener("click", function () {
    setFilterMenuOpen(filterMenu.hidden);
  });

  filterTypeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      populateFilterValues(button.dataset.scholarsFilterType);
    });
  });

  filterValueSelect.addEventListener("change", function () {
    activeFilterValue = filterValueSelect.value;
    applyScholarsFilters();
    setFilterMenuOpen(false);
  });

  document.addEventListener("click", function (event) {
    if (!event.target.closest(".filter-dropdown")) {
      setFilterMenuOpen(false);
    }
  });
}

function setupScreeningForm() {
  const form = document.getElementById("screening-form");

  if (!form) {
    return;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const gwa = Number(document.getElementById("gwa")?.value);
    if (gwa <= 2.25) {
      window.location.href = "forms.html";
      return;
    }

    openInlineFeedbackModal({
      pageHref: "not-qualified.html"
    });
  });
}

function setupStudentStatusPage() {
  const title = document.querySelector("[data-status-title]");
  const detail = document.querySelector("[data-status-detail]");
  const nextStep = document.querySelector("[data-status-next-step]");
  const action = document.querySelector("[data-status-action]");

  if (!title || !detail || !nextStep || !action) {
    return;
  }

  const user = getCurrentUser();
  const application = getApplication();
  const status = getStudentApplicationStatus(user, application);

  document.title = `${status.label} | Scholarship Portal`;
  title.textContent = status.label;
  detail.textContent = status.detail;
  nextStep.textContent = status.nextStep;
  nextStep.hidden = !status.nextStep;
  action.href = status.actionHref;
  action.textContent = status.actionLabel;
}

function populateStudentProfilePage() {
  const pageTitle = document.getElementById("student-profile-page-title");
  const pageSubtitle = document.getElementById("student-profile-page-subtitle");
  const fieldNodes = document.querySelectorAll("[data-student-profile-field]");

  if (!pageTitle || !pageSubtitle || !fieldNodes.length) {
    return;
  }

  setupScrollSectionHighlight(".profile-tabs a[href^='#']", "active");

  const user = getCurrentUser();
  const application = getApplication();
  const profile = buildStudentProfileData(user, application);

  if (!profile) {
    return;
  }

  document.title = `${profile.heading} | Scholarship Portal`;
  pageTitle.textContent = profile.title;
  pageSubtitle.textContent = `${profile.heading} from ${profile.college} - ${profile.program}.`;

  fieldNodes.forEach(function (node) {
    const key = node.dataset.studentProfileField;
    if (Object.prototype.hasOwnProperty.call(profile, key)) {
      node.textContent = profile[key];
    }
  });
}

function setupStudentHomePage() {
  const title = document.querySelector("[data-student-home-title]");
  const summary = document.querySelector("[data-student-home-summary]");
  const statusNode = document.querySelector("[data-student-home-status]");
  const nextStepNode = document.querySelector("[data-student-home-next-step]");
  const primaryAction = document.querySelector("[data-student-home-primary]");
  const secondaryAction = document.querySelector("[data-student-home-secondary]");
  const profileLinks = Array.from(document.querySelectorAll("[data-student-profile-link]"));

  if (!title || !summary || !statusNode || !nextStepNode || !primaryAction || !secondaryAction) {
    return;
  }

  const user = getCurrentUser();
  const application = getApplication();
  const status = getStudentApplicationStatus(user, application);
  const profileHref = "student-profile.html";
  statusNode.textContent = status.label;
  nextStepNode.textContent = status.nextStep;
  secondaryAction.href = "student-status.html";

  profileLinks.forEach(function (link) {
    link.href = profileHref;
  });
}

function setupAdminEvaluationPage() {
  const applicants = window.ADMIN_APPLICANTS || {};
  const tableBody = document.getElementById("evaluation-table-body");
  const emptyState = document.getElementById("evaluation-empty-state");
  const modal = document.getElementById("evaluation-modal");
  const modalProfileLink = document.getElementById("modal-profile-link");
  const modalFieldNodes = document.querySelectorAll("[data-modal-field]");
  const closeModalButton = document.getElementById("close-modal-button");
  const approveButton = document.getElementById("approve-button");
  const declineButton = document.getElementById("decline-button");
  const searchInput = document.getElementById("evaluation-search");
  const filterButton = document.getElementById("evaluation-filter-button");
  const filterMenu = document.getElementById("evaluation-filter-menu");
  const filterValueSelect = document.getElementById("evaluation-filter-value");
  const filterTypeButtons = Array.from(document.querySelectorAll("[data-evaluation-filter-type]"));
  let activeApplicantId = "1004";
  let activeFilterType = "";
  let activeFilterValue = "all";
  let activeSearchValue = "";

  if (!tableBody || !modal) {
    return;
  }

  const filterOptions = {
    status: [
      { value: "all", label: "All Status" },
      { value: "Pending Review", label: "Pending Review" },
      { value: "Approved", label: "Approved" },
      { value: "Declined", label: "Declined" }
    ],
    gwa: [
      { value: "all", label: "All GWA" },
      { value: "1.75 and below", label: "1.75 and below" },
      { value: "1.76 to 2.00", label: "1.76 to 2.00" },
      { value: "2.01 and above", label: "2.01 and above" }
    ],
    income: [
      { value: "all", label: "All Income" },
      { value: "below 100000", label: "Below 100,000" },
      { value: "100000 to 120000", label: "100,000 to 120,000" },
      { value: "above 120000", label: "Above 120,000" }
    ]
  };

  function normalizeValue(value) {
    return String(value || "").trim().toLowerCase();
  }

  function parseMoney(value) {
    return Number(String(value || "").replace(/[^\d.]/g, "")) || 0;
  }

  function setFilterMenuOpen(isOpen) {
    if (!filterButton || !filterMenu) {
      return;
    }

    filterMenu.hidden = !isOpen;
    filterButton.setAttribute("aria-expanded", String(isOpen));
  }

  function populateFilterValues(filterType) {
    if (!filterValueSelect) {
      return;
    }

    const options = filterOptions[filterType] || [{ value: "all", label: "All" }];

    filterValueSelect.innerHTML = options
      .map(function (option) {
        return `<option value="${option.value}">${option.label}</option>`;
      })
      .join("");

    filterValueSelect.hidden = false;
    filterValueSelect.value = "all";
    activeFilterType = filterType;
    activeFilterValue = "all";

    filterTypeButtons.forEach(function (button) {
      button.classList.toggle("is-active", button.dataset.evaluationFilterType === filterType);
    });
  }

  function matchesEvaluationFilter(applicant) {
    const searchableText = normalizeValue(
      [
        applicant.applicantId,
        applicant.studentNumber,
        applicant.lastName,
        applicant.firstName,
        applicant.middleName,
        applicant.program,
        applicant.college,
        applicant.status,
        applicant.familyIncome,
        applicant.income
      ].join(" ")
    );

    if (activeSearchValue && !searchableText.includes(activeSearchValue)) {
      return false;
    }

    if (!activeFilterType || normalizeValue(activeFilterValue) === "all") {
      return true;
    }

    const gwa = Number(applicant.gwa) || 0;
    const income = parseMoney(applicant.familyIncome || applicant.income);
    const selectedValue = activeFilterValue;

    if (activeFilterType === "status") {
      return normalizeValue(applicant.status) === normalizeValue(selectedValue);
    }

    if (activeFilterType === "gwa") {
      if (selectedValue === "1.75 and below") {
        return gwa <= 1.75;
      }

      if (selectedValue === "1.76 to 2.00") {
        return gwa > 1.75 && gwa <= 2.0;
      }

      if (selectedValue === "2.01 and above") {
        return gwa >= 2.01;
      }
    }

    if (activeFilterType === "income") {
      if (selectedValue === "below 100000") {
        return income < 100000;
      }

      if (selectedValue === "100000 to 120000") {
        return income >= 100000 && income <= 120000;
      }

      if (selectedValue === "above 120000") {
        return income > 120000;
      }
    }

    return true;
  }

  function renderApplicants() {
    const rows = Object.entries(applicants)
      .filter(function ([, applicant]) {
        return matchesEvaluationFilter(applicant);
      })
      .map(function ([id, applicant]) {
        const fullName = `${applicant.lastName}, ${applicant.firstName}`;
        const annualIncome = applicant.familyIncome || applicant.income || "N/A";

        return `
          <tr data-applicant-id="${id}">
            <td>${applicant.applicantId || id}</td>
            <td>${fullName}</td>
            <td>${applicant.gwa}</td>
            <td>${annualIncome}</td>
            <td class="evaluation-action-cell">
              <div class="evaluation-action-group">
                <button type="button" class="table-action evaluation-open-button" data-applicant-id="${id}">Review Application</button>
                <button type="button" class="table-action evaluation-delete-button" data-delete-applicant-id="${id}">Delete</button>
              </div>
            </td>
          </tr>
        `;
      })
      .join("");

    tableBody.innerHTML = rows;

    if (emptyState) {
      emptyState.hidden = rows !== "";
    }
  }

  function deleteApplicant(id) {
    const applicant = applicants[id];
    if (!applicant) {
      return;
    }

    const fullName = `${applicant.lastName}, ${applicant.firstName}`;
    const shouldDelete = window.confirm(`Delete ${fullName}'s application from the evaluation list?`);

    if (!shouldDelete) {
      return;
    }

    delete applicants[id];
    writeStorage(ADMIN_APPLICANTS_KEY, applicants);
    window.ADMIN_APPLICANTS = applicants;

    if (activeApplicantId === id) {
      closeModal();
      activeApplicantId = Object.keys(applicants)[0] || "";
    }

    renderApplicants();
  }

  function openModal(id) {
    const applicant = applicants[id];
    if (!applicant) {
      return;
    }

    activeApplicantId = id;
    const fullName = `${applicant.lastName}, ${applicant.firstName}`;

    modalFieldNodes.forEach(function (node) {
      const key = node.dataset.modalField;

      if (key === "fullName") {
        node.textContent = fullName;
        return;
      }

      if (Object.prototype.hasOwnProperty.call(applicant, key)) {
        node.textContent = applicant[key];
      }
    });

    if (modalProfileLink) {
      modalProfileLink.href = `admin-profile.html?applicant=${encodeURIComponent(id)}`;
    }

    modal.hidden = false;
    document.body.classList.add("modal-open");
  }

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
  }

  function setApplicantStatus(id, status) {
    const applicant = applicants[id];
    if (!applicant) {
      return;
    }

    applicant.status = status;
    applicant.applicationStatus = status;
    writeStorage(ADMIN_APPLICANTS_KEY, applicants);
    window.ADMIN_APPLICANTS = applicants;
    renderApplicants();
  }

  function upsertApplicant(applicant) {
    if (!applicant || !applicant.applicantId) {
      return;
    }

    const applicantId = String(applicant.applicantId);
    const existingApplicant = applicants[applicantId] || {};

    applicants[applicantId] = {
      ...existingApplicant,
      ...applicant,
      applicantId: applicantId,
      status: "Pending Review",
      applicationStatus: "Pending Review"
    };
    writeStorage(ADMIN_APPLICANTS_KEY, applicants);
    window.ADMIN_APPLICANTS = applicants;

    renderApplicants();
    activeApplicantId = applicantId;
    openApplicantReadyModal();
  }

  window.addApplicantToEvaluation = upsertApplicant;

  renderApplicants();

  if (filterButton && filterMenu && filterValueSelect && filterTypeButtons.length) {
    filterButton.addEventListener("click", function () {
      setFilterMenuOpen(filterMenu.hidden);
    });

    filterTypeButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        populateFilterValues(button.dataset.evaluationFilterType);
      });
    });

    filterValueSelect.addEventListener("change", function () {
      activeFilterValue = filterValueSelect.value;
      renderApplicants();
      setFilterMenuOpen(false);
    });

    document.addEventListener("click", function (event) {
      if (!event.target.closest(".filter-dropdown")) {
        setFilterMenuOpen(false);
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      activeSearchValue = normalizeValue(searchInput.value);
      renderApplicants();
    });
  }

  tableBody.addEventListener("click", function (event) {
    const deleteTrigger = event.target.closest("[data-delete-applicant-id]");
    if (deleteTrigger) {
      deleteApplicant(deleteTrigger.dataset.deleteApplicantId);
      return;
    }

    const reviewTrigger = event.target.closest("[data-applicant-id]");
    if (!reviewTrigger) {
      return;
    }

    openModal(reviewTrigger.dataset.applicantId);
  });

  modal.addEventListener("click", function (event) {
    if (event.target.hasAttribute("data-close-modal")) {
      closeModal();
    }
  });

  if (closeModalButton) {
    closeModalButton.addEventListener("click", closeModal);
  }

  if (approveButton) {
    approveButton.addEventListener("click", function () {
      setApplicantStatus(activeApplicantId, "Approved");
      const applicant = applicants[activeApplicantId];
      closeModal();
      openAdminDecisionModal({
        status: "Approved",
        fullName: applicant ? `${applicant.firstName} ${applicant.lastName}` : "The applicant"
      });
    });
  }

  if (declineButton) {
    declineButton.addEventListener("click", function () {
      setApplicantStatus(activeApplicantId, "Declined");
      const applicant = applicants[activeApplicantId];
      closeModal();
      openAdminDecisionModal({
        status: "Declined",
        fullName: applicant ? `${applicant.firstName} ${applicant.lastName}` : "The applicant"
      });
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !modal.hidden) {
      closeModal();
    }
  });

  window.addEventListener("scholarshipPortal:pendingApplicantSelected", function (event) {
    upsertApplicant(event.detail?.applicant);
  });
}

window.ADMIN_PENDING_STUDENTS = ADMIN_PENDING_STUDENTS;

function populateAdminProfilePage() {
  const pageTitle = document.getElementById("profile-page-title");
  const pageSubtitle = document.getElementById("profile-page-subtitle");
  const fieldNodes = document.querySelectorAll("[data-field]");
  const approveButton = document.getElementById("profile-approve-button");
  const rejectButton = document.getElementById("profile-reject-button");

  if (!pageTitle || !pageSubtitle || !fieldNodes.length) {
    return;
  }

  const applicantId = window.readCurrentApplicant ? window.readCurrentApplicant() : "1004";
  const applicant = window.getApplicantProfile ? window.getApplicantProfile(applicantId) : null;

  if (!applicant) {
    return;
  }

  document.title = `${applicant.heading} | Scholarship Portal`;
  pageTitle.textContent = applicant.title;
  pageSubtitle.textContent = `${applicant.heading} from ${applicant.college} - ${applicant.program}.`;

  fieldNodes.forEach(function (node) {
    const key = node.dataset.field;
    if (Object.prototype.hasOwnProperty.call(applicant, key)) {
      node.textContent = applicant[key];
    }
  });

  function refreshProfileStatus() {
    fieldNodes.forEach(function (node) {
      const key = node.dataset.field;
      if (key === "status" || key === "applicationStatus") {
        node.textContent = applicant[key];
      }
    });
  }

  if (approveButton) {
    approveButton.addEventListener("click", function () {
      applicant.status = "Approved";
      applicant.applicationStatus = "Approved";
      refreshProfileStatus();
      openAdminDecisionModal({
        status: "Approved",
        fullName: `${applicant.firstName} ${applicant.lastName}`
      });
    });
  }

  if (rejectButton) {
    rejectButton.addEventListener("click", function () {
      applicant.status = "Declined";
      applicant.applicationStatus = "Declined";
      refreshProfileStatus();
      openAdminDecisionModal({
        status: "Declined",
        fullName: `${applicant.firstName} ${applicant.lastName}`
      });
    });
  }

  setupScrollSectionHighlight(".profile-tabs a[href^='#']", "active");
}

document.addEventListener("DOMContentLoaded", function () {
  requireAuthIfNeeded();
  setupRegistrationForm();
  setupLoginForm();
  setupApplicationForm();
  setupScreeningForm();
  setupProfileUi();
  setupStudentProfileLinks();
  populateApplicationViewPage();
  setupEmptyApplicationModalPage();
  populateStudentProfilePage();
  setupStudentStatusPage();
  setupStudentHomePage();

  requireAdminAuthIfNeeded();
  setupAdminLoginForm();
  setupAdminProfileUi();
  populateStoredAdminStudents();
  setupAdminEvaluationPage();
  populateAdminProfilePage();
  setupStudentFilters();
  setupAddStudentModal();
  setupScholarsFilters();
  setupAddStudentFormPage();
  setupPendingStudentsSelectionPage();

  document.addEventListener("keydown", function (event) {
    const inlineFeedbackModal = document.getElementById("inline-feedback-modal");

    if (event.key === "Escape" && inlineFeedbackModal && !inlineFeedbackModal.hidden) {
      closeInlineFeedbackModal();
    }
  });
});
