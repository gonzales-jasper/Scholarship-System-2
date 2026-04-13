<?php
include_once 'connAdmin.php';

$id = intval($_GET['application_id'] ?? 0);

if (!$id) {
    echo "<p style='color:red;'>Invalid application.</p>";
    exit;
}

$result = mysqli_query($dbconn, "
  SELECT
    a.application_id,
    a.program,
    a.gwa,
    a.application_status,
    a.submitted_at,
    a.academic_year,
    s.student_id,
    s.student_no,
    s.first_name,
    s.last_name,
    s.middle_name,
    s.sex,
    s.birthdate,
    s.address
  FROM application a
  JOIN student s ON a.student_id = s.student_id
  WHERE a.application_id = $id
  LIMIT 1
");

if (!$result || mysqli_num_rows($result) === 0) {
    echo "<p style='color:red;'>Application not found.</p>";
    exit;
}

$app = mysqli_fetch_assoc($result);

$fullName    = htmlspecialchars($app['last_name'] . ', ' . $app['first_name'] . ' ' . $app['middle_name']);
$studentNo   = htmlspecialchars($app['student_no'] ?? '-');
$program     = htmlspecialchars($app['program'] ?? '-');
$gwa         = htmlspecialchars($app['gwa'] ?? '-');
$status      = htmlspecialchars($app['application_status'] ?? 'Pending');
$submitted   = htmlspecialchars($app['submitted_at'] ?? '-');
$sex         = htmlspecialchars($app['sex'] ?? '-');
$birthdate   = htmlspecialchars($app['birthdate'] ?? '-');
$address     = htmlspecialchars($app['address'] ?? '-');
$studentId   = $app['student_id'];

$statusClass = match (strtolower($status)) {
    'approved' => 'approved',
    'rejected' => 'rejected',
    default    => 'pending'
};

$isApproved = strtolower($status) === 'approved';
$isRejected = strtolower($status) === 'rejected';
?>

<div class="applicant-modal-inner">

    <div class="applicant-modal-topbar">
        <div>
            <h2 class="applicant-modal-title">Student Application</h2>
            <p class="applicant-modal-sub">Application #<?= $id ?> &mdash; <span class="status <?= $statusClass ?>"><?= $status ?></span></p>
        </div>
        <button type="button"
            class="applicant-btn applicant-btn--profile"
            onclick="loadFullProfile(<?= $app['application_id'] ?>)">
            View Full Profile
        </button>
    </div>

    <div class="applicant-modal-grid">

        <div class="applicant-info-card">
            <span class="applicant-info-label">Full Name</span>
            <span class="applicant-info-value"><?= $fullName ?></span>
        </div>

        <div class="applicant-info-card">
            <span class="applicant-info-label">Student No.</span>
            <span class="applicant-info-value"><?= $studentNo ?></span>
        </div>

        <div class="applicant-info-card">
            <span class="applicant-info-label">Program</span>
            <span class="applicant-info-value"><?= $program ?></span>
        </div>

        <div class="applicant-info-card">
            <span class="applicant-info-label">GWA</span>
            <span class="applicant-info-value"><?= $gwa ?></span>
        </div>

        <div class="applicant-info-card">
            <span class="applicant-info-label">Sex</span>
            <span class="applicant-info-value"><?= $sex ?></span>
        </div>

        <div class="applicant-info-card">
            <span class="applicant-info-label">Birthdate</span>
            <span class="applicant-info-value"><?= $birthdate ?></span>
        </div>
        <div class="applicant-info-card applicant-info-card--full">
            <span class="applicant-info-label">Address</span>
            <span class="applicant-info-value"><?= $address ?></span>
        </div>

        <div class="applicant-info-card">
            <span class="applicant-info-label">Date Submitted</span>
            <span class="applicant-info-value"><?= $submitted ?></span>
        </div>

        <div class="applicant-info-card">
            <span class="applicant-info-label">Academic Year</span>
            <span class="applicant-info-value"><?= $app['academic_year'] ?></span>
        </div>



    </div>

    <div class="applicant-modal-actions">
        <button type="button"
            class="applicant-btn applicant-btn--approve <?= $isApproved ? 'btn-disabled' : '' ?>"
            onclick="<?= $isApproved ? 'void(0)' : "confirmStatus($id, 'Approved')" ?>"
            <?= $isApproved ? 'disabled' : '' ?>>
            ✓ Approve
        </button>
        <button type="button"
            class="applicant-btn applicant-btn--reject <?= $isRejected ? 'btn-disabled' : '' ?>"
            onclick="<?= $isRejected ? 'void(0)' : "confirmStatus($id, 'Rejected')" ?>"
            <?= $isRejected ? 'disabled' : '' ?>>
            ✕ Reject
        </button>
        <button type="button"
            class="applicant-btn applicant-btn--close"
            onclick="closeAdminModal()">
            Close
        </button>
    </div>

</div>