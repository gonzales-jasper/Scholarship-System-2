<?php
include_once 'connAdmin.php';
$app_id = isset($_GET['application_id']) ? (int)$_GET['application_id'] : 0;

if ($app_id === 0) {
    echo '<p>Invalid application.</p>';
    exit;
}

$stmt = $dbconn->prepare("SELECT s.last_name, s.first_name 
                          FROM application a 
                          JOIN student s ON a.student_id = s.student_id 
                          WHERE a.application_id = ?");
$stmt->bind_param("i", $app_id);
$stmt->execute();
$result = $stmt->get_result();
$studentData = $result->fetch_assoc();
?>

<div class="evaluation-modal-body" style="text-align:center; padding:2rem;">
    <p style="font-size:2rem; color: red">!!!</p>
    <h3>Delete Application</h3>
    <p>Are you sure you want to delete '<?= $studentData['last_name'] . ' ' . $studentData['first_name']   ?>' application?</p>
    <div class="evaluation-modal-actions">
        <button onclick="confirmedDeleteProcess(<?= $app_id ?>)">Yes, Delete</button>
        <button onclick="closeAdminModal()" class="button-outline">Cancel</button>
    </div>
</div>