<?php
include_once 'connAdmin.php';

$id = intval($_GET['application_id'] ?? 0);

if ($id === 0) {
    echo "<p style='color:red;'>Error: No Application ID provided.</p>";
    exit;
}
// fetch current application data
$result = mysqli_query($dbconn, "
  SELECT
    a.application_id,
    a.academic_year,
    a.program,
    a.college,
    a.year_level,
    a.gwa,
    a.application_status,
    a.eligibility_status,
    s.first_name,
    s.last_name,
    s.student_no
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

$fullName   = htmlspecialchars($app['last_name'] . ', ' . $app['first_name']);
$studentNo  = htmlspecialchars($app['student_no']);
$status     = htmlspecialchars($app['application_status'] ?? 'Pending');

$statusClass = match (strtolower($status)) {
    'accepted' => 'accepted',
    'rejected' => 'rejected',
    default    => 'pending'
};
?>

<div class="applicant-modal-inner">

    <div class="applicant-modal-topbar">
        <div>
            <h2 class="applicant-modal-title">Edit Application</h2>
            <p class="applicant-modal-sub">
                Application #<?= $id ?> &mdash;
                <span class="status <?= $statusClass ?>"><?= $status ?></span>
            </p>
        </div>
        <button type="button" class="applicant-modal-close" onclick="closeAdminModal()">&times;</button>
    </div>

    <!-- Student info (read-only, cannot be changed) -->
    <div class="applicant-modal-grid" style="margin-bottom:12px;">
        <div class="applicant-info-card">
            <span class="applicant-info-label">Full Name</span>
            <span class="applicant-info-value"><?= $fullName ?></span>
        </div>
        <div class="applicant-info-card">
            <span class="applicant-info-label">Student No.</span>
            <span class="applicant-info-value"><?= $studentNo ?></span>
        </div>
    </div>

    <form onsubmit="submitEditProcess(event)">
        <input type="hidden" name="application_id" value="<?= $id ?>">
        <input type="hidden" name="first_name" value="<?= htmlspecialchars($app['first_name']) ?>">
        <input type="hidden" name="last_name" value="<?= htmlspecialchars($app['last_name']) ?>">

        <div class="applicant-modal-grid">

            <div class="applicant-info-card">
                <span class="applicant-info-label">Academic Year</span>
                <input type="text" name="academic_year"
                    value="<?= htmlspecialchars($app['academic_year']) ?>" required
                    style="margin-top:4px; width:100%; padding:6px 8px; border:1px solid #ddd;
                 border-radius:8px; font-size:15px; font-weight:600; box-sizing:border-box;">
            </div>

            <div class="applicant-info-card">
                <span class="applicant-info-label">Program</span>
                <input type="text" name="program"
                    value="<?= htmlspecialchars($app['program']) ?>" required
                    style="margin-top:4px; width:100%; padding:6px 8px; border:1px solid #ddd;
                 border-radius:8px; font-size:15px; font-weight:600; box-sizing:border-box;">
            </div>

            <div class="applicant-info-card">
                <span class="applicant-info-label">College</span>
                <input type="text" name="college"
                    value="<?= htmlspecialchars($app['college']) ?>" required
                    style="margin-top:4px; width:100%; padding:6px 8px; border:1px solid #ddd;
                 border-radius:8px; font-size:15px; font-weight:600; box-sizing:border-box;">
            </div>

            <div class="applicant-info-card">
                <span class="applicant-info-label">Year Level</span>
                <input type="number" name="year_level" min="1" max="5"
                    value="<?= htmlspecialchars($app['year_level']) ?>" required
                    style="margin-top:4px; width:100%; padding:6px 8px; border:1px solid #ddd;
                 border-radius:8px; font-size:15px; font-weight:600; box-sizing:border-box;">
            </div>

            <div class="applicant-info-card applicant-info-card--full">
                <span class="applicant-info-label">GWA</span>
                <input type="number" name="gwa" step="0.01" min="1.00" max="5.00"
                    value="<?= htmlspecialchars($app['gwa']) ?>" required
                    style="margin-top:4px; width:100%; padding:6px 8px; border:1px solid #ddd;
                 border-radius:8px; font-size:15px; font-weight:600; box-sizing:border-box;">
            </div>

        </div>

        <div class="applicant-modal-actions" style="margin-top:20px;">
            <button type="submit" class="applicant-btn applicant-btn--approve">
                Save Changes
            </button>
            <button type="button" class="applicant-btn applicant-btn--close"
                onclick="closeAdminModal()">
                Cancel
            </button>
        </div>

    </form>

</div>