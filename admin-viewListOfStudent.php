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
    'accepted' => 'accepted',
    'rejected' => 'rejected',
    default    => 'pending'
};

$isApproved = strtolower($status) === 'accepted';
$isRejected = strtolower($status) === 'rejected';

// Fetch all applications for this specific student
$historyResult = mysqli_query($dbconn, "
    SELECT application_id, academic_year, application_status, submitted_at 
    FROM application 
    WHERE student_id = $studentId 
    ORDER BY submitted_at DESC
");
?>

<div class="applicant-modal-inner">

    <div class="applicant-modal-topbar">
        <div>
            <h2 class="applicant-modal-title">Application History</h2>
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
            <span class="applicant-info-label">Date Submitted</span>
            <span class="applicant-info-value"><?= $submitted ?></span>
        </div>

        <div class="applicant-info-card">
            <span class="applicant-info-label">Academic Year</span>
            <span class="applicant-info-value"><?= $app['academic_year'] ?></span>
        </div>

        <div class="applicant-modal-inner">
            <div class="history-section" style="margin-top: 20px; border-top: 1px solid #eee; padding-top: 15px;">
                <h3 style="font-size: 1.1rem; margin-bottom: 10px;">Application History</h3>

                <div class="history-list" style="display: flex; flex-direction: column; gap: 8px;">
                    <?php while ($history = mysqli_fetch_assoc($historyResult)):
                        $hStatus = htmlspecialchars($history['application_status']);
                        $hClass = match (strtolower($hStatus)) {
                            'accepted' => 'accepted',
                            'rejected' => 'rejected',
                            default    => 'pending'
                        };
                    ?>
                        <div class="history-item" style="display: flex; justify-content: space-between; align-items: center; padding: 10px; background: #f9f9f9; border-radius: 6px; border-left: 4px solid var(--primary-color, #4a90e2);">
                            <div>
                                <strong style="display: block; font-size: 0.9rem;">AY: <?= htmlspecialchars($history['academic_year']) ?></strong>
                                <small style="color: #666;">Submitted: <?= date('M d, Y', strtotime($history['submitted_at'])) ?></small>
                            </div>
                            <span class="status <?= $hClass ?>" style="font-size: 0.8rem;"><?= $hStatus ?></span>
                        </div>
                    <?php endwhile; ?>
                </div>
            </div>

            <div class="applicant-modal-actions">
            </div>
        </div>

    </div>

    <div class="applicant-modal-actions">
        <button type="button"
            class="applicant-btn applicant-btn--close"
            onclick="closeAdminModal()">
            Close
        </button>
    </div>

</div>