<?php
include_once 'connAdmin.php';

$app_id    = intval($_GET['application_id'] ?? 0);
$newStatus = $_GET['status'] ?? '';
$allowed   = ['Approved', 'Rejected'];

if (!$app_id || !in_array($newStatus, $allowed)) exit;

$stmt = $dbconn->prepare("SELECT s.last_name, s.first_name 
                          FROM application a 
                          JOIN student s ON a.student_id = s.student_id 
                          WHERE a.application_id = ?");
$stmt->bind_param("i", $app_id);
$stmt->execute();
$result = $stmt->get_result();
$studentData = $result->fetch_assoc();


$color   = $newStatus === 'Approved' ? '#2d7d42' : '#a3474a';
$message = $newStatus === 'Approved'
    ? "Are you sure you want to <strong>approve</strong> " . htmlspecialchars($studentData['first_name']) . ' ' . htmlspecialchars($studentData['last_name']) . " application?"
    : "Are you sure you want to <strong>reject</strong> " . htmlspecialchars($studentData['first_name']) . ' ' . htmlspecialchars($studentData['last_name']) . " application?";
?>

<div class="applicant-modal-inner">
    <div class="applicant-modal-topbar">
        <h2 class="applicant-modal-title">Confirm Action</h2>
    </div>

    <p style="margin: 0 0 20px; font-size: 16px;"><?= $message ?></p>

    <div class="applicant-modal-actions">
        <button type="button" class="applicant-btn"
            style="background:<?= $color ?>; color:#fff;"
            onclick="updateStatus(<?= $app_id ?>, '<?= $newStatus ?>')">
            Yes, <?= $newStatus ?>
        </button>
        <button type="button" class="applicant-btn applicant-btn--close"
            onclick="closeAdminModal()">
            Cancel
        </button>
    </div>
</div>