<?php
include_once 'connAdmin.php';

$application_id = isset($_GET['application_id']) ? (int)$_GET['application_id'] : 0;

if ($application_id === 0) {
  echo '<p>Invalid student.</p>';
  exit;
}

$stmt = $dbconn->prepare("
    SELECT s.*, a.program, a.college, a.year_level, a.gwa,
           a.application_id, a.application_status, a.eligibility_status, a.academic_year
    FROM student s
    LEFT JOIN application a ON s.student_id = a.student_id
    WHERE a.application_id = ?
");

// 3. Bind the parameter ( 'i' means integer)
$stmt->bind_param("i", $application_id);
// 4. Execute
$stmt->execute();

// 5. Get the result
$result = $stmt->get_result();
$student = $result->fetch_assoc();

$status = htmlspecialchars($student['application_status'] ?? 'Pending');

$isApproved = strtolower($status) === 'accepted';
$isRejected = strtolower($status) === 'rejected';

if (!$student) {
  echo '<p>Student not found.</p>';
  exit;
}
?>




<div class="profile-hero">
  <div>
    <h1 id="profile-page-title">Profile | <?= htmlspecialchars($student['last_name'] . ', ' . $student['first_name']) ?></h1>
    <p class="profile-subtitle" id="profile-page-subtitle">Applicant details and supporting background for scholarship
      review.</p>
  </div>
  <div class="profile-hero-badges">
    <div class="profile-hero-badge">
      <span>Applicant ID</span>
      <strong data-field="applicantId"><strong><?= htmlspecialchars($student['application_id'] ?? '—') ?></strong></strong>
    </div>
    <div class="profile-hero-badge">
      <span>Status</span>
      <strong><?= htmlspecialchars($student['application_status'] ?? 'No Application') ?></strong>
    </div>
  </div>
</div>

<div class="profile-layout">
  <aside class="profile-tabs">
    <a href="#personal">Personal Information</a>
    <!-- <a href="#family">Family Background</a> -->
    <a href="#education">Education</a>
  </aside>

  <div class="profile-sections">
    <section class="profile-section" id="personal">
      <h2>Personal Information</h2>
      <div class="info-grid">
        <p><strong>Student No.:</strong> <?= htmlspecialchars($student['student_no']) ?></p>
        <p><strong>Last Name:</strong> <?= htmlspecialchars($student['last_name']) ?></p>
        <p><strong>First Name:</strong> <?= htmlspecialchars($student['first_name']) ?></p>
        <p><strong>Middle Name:</strong> <?= htmlspecialchars($student['middle_name'] ?? '—') ?></p>
        <p><strong>Sex:</strong> <?= htmlspecialchars($student['sex'] ?? '—') ?></p>
        <p><strong>Birthdate:</strong> <?= htmlspecialchars($student['birthdate']) ?></p>
        <p><strong>Address:</strong> <?= htmlspecialchars($student['address']) ?></p>
      </div>
    </section>

    <!-- <section class="profile-section" id="family">
      <h2>Family Background</h2>
      <div class="info-grid">
        <p><strong>Father:</strong> <span data-field="father">xqtrv nplok</span></p>
        <p><strong>Mother:</strong> <span data-field="mother">zmkia wreop</span></p>
        <p><strong>Occupation:</strong> <span data-field="occupation">plmno qzxrt / vbeui</span></p>
        <p><strong>Annual Income:</strong> <span data-field="familyIncome">100,000</span></p>
        <p><strong>Household Members:</strong> <span data-field="household">5</span></p>
        <p><strong>Address:</strong> <span data-field="address">Malolos, Bulacan</span></p>
      </div>
    </section> -->

    <section class="profile-section" id="education">
      <h2>Education</h2>
      <div class="info-grid">
        <p><strong>Program:</strong> <?= htmlspecialchars($student['program'] ?? '—') ?></p>
        <p><strong>College:</strong> <?= htmlspecialchars($student['college'] ?? '—') ?></p>
        <p><strong>Year Level:</strong> <?= htmlspecialchars($student['year_level'] ?? '—') ?></p>
        <p><strong>GWA:</strong> <?= htmlspecialchars($student['gwa'] ?? '—') ?></p>
        <p><strong>Academic Year:</strong> <?= htmlspecialchars($student['academic_year'] ?? '—') ?></p>
        <p><strong>Application Status:</strong> <?= htmlspecialchars($student['application_status'] ?? 'No Application') ?></p>
        <p><strong>Eligibility:</strong> <?= htmlspecialchars($student['eligibility_status'] ?? '—') ?></p>
      </div>
    </section>
  </div>
</div>

<div class="applicant-modal-actions">

  <button type="button"
    class="applicant-btn applicant-btn--close"
    onclick="loadPageAdmin('admin-students.php')">
    Go Back
  </button>
</div>