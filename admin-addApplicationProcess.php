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

if ($gwa > 1.75) {
?>

    <div class="evaluation-modal-body" style="text-align:center; padding:2rem;">
        <p style="font-size:2rem;">❌</p>
        <h3>Not Qualified</h3>
        <p>GWA must be 1.75 or below to qualify for the scholarship.</p>
        <div class="evaluation-modal-actions">
            <button onclick="closeAdminModal()" class="button-outline">Close</button>
        </div>
    </div>
<?php
    exit;
}

$eligibility = 'Qualified'; // no need to check again, already blocked above

$stmt = $dbconn->prepare('
    INSERT INTO application
        (student_id, academic_year, program, college, year_level, gwa,
         application_status, eligibility_status, submitted_at)
    VALUES (?, ?, ?, ?, ?, ?, "Pending", ?, NOW())
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