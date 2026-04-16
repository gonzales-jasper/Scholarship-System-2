<?php
include_once 'connAdmin.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    exit;
}

$student_id    = (int)$_POST['student_id'];
$academic_year = $_POST['academic_year'];
$program       = $_POST['program'];
$college       = $_POST['college'];
$year_level    = (int)$_POST['year_level'];
$gwa           = (float)$_POST['gwa'];

// Check if student already has an existing application
$checkStmt = $dbconn->prepare('SELECT application_id FROM application WHERE student_id = ?');
$checkStmt->bind_param('i', $student_id);
$checkStmt->execute();
$checkResult = $checkStmt->get_result();

if ($checkResult->num_rows > 0) {
?>
    <div class="evaluation-modal-body" style="text-align:center; padding:2rem;">
        <p style="font-size:2rem;">⚠️</p>
        <h3>Duplicate Application</h3>
        <p>This student already has an existing application in the system.</p>
        <div class="evaluation-modal-actions">
            <button onclick="closeAdminModal()" class="button-outline">Close</button>
        </div>
    </div>
<?php
    exit;
}

// GWA validation
if ($gwa > 2) {
?>
    <div class="evaluation-modal-body" style="text-align:center; padding:2rem;">
        <p style="font-size:2rem;">❌</p>
        <h3>Not Qualified</h3>
        <p>GWA must be 2 or below to qualify for the scholarship.</p>
        <div class="evaluation-modal-actions">
            <button onclick="closeAdminModal()" class="button-outline">Close</button>
        </div>
    </div>
<?php
    exit;
}

$eligibility = 'Eligible';

$stmt = $dbconn->prepare('
    INSERT INTO application
        (student_id, academic_year, program, college, year_level, gwa,
         application_status, eligibility_status, submitted_at, active_status)
    VALUES (?, ?, ?, ?, ?, ?, "Pending", ?, NOW(), "inactive")
');
$stmt->bind_param(
    'isssids',
    $student_id,
    $academic_year,
    $program,
    $college,
    $year_level,
    $gwa,
    $eligibility
);
$stmt->execute();
?>

<div class="evaluation-modal-body" style="text-align:center; padding:2rem;">
    <p style="font-size:2rem;">✅</p>
    <h3>Application Added</h3>
    <p>Application has been successfully submitted.</p>
    <div class="evaluation-modal-actions">
        <button onclick="closeAdminModal()" class="button-outline">Close</button>
    </div>
</div>