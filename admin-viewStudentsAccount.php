<?php
include_once 'connAdmin.php';

// Get the ID from the AJAX 'student_id' property
$id = intval($_GET['student_id'] ?? 0);

if (!$id) {
    echo "<div style='padding:20px; color:red;'>Invalid student record.</div>";
    exit;
}

// Simplified query: Only select from the student table
$result = mysqli_query($dbconn, "
    SELECT 
        student_id, student_no, first_name, last_name, middle_name, sex, birthdate, address 
    FROM student 
    WHERE student_id = $id 
    LIMIT 1
");

if (!$result || mysqli_num_rows($result) === 0) {
    echo "<div style='padding:20px; color:red;'>Student record not found.</div>";
    exit;
}

$student = mysqli_fetch_assoc($result);

// Formatting data
$fullName  = htmlspecialchars($student['last_name'] . ', ' . $student['first_name'] . ' ' . ($student['middle_name'] ?? ''));
$studentNo = htmlspecialchars($student['student_no'] ?? '-');
$sex       = htmlspecialchars($student['sex'] ?? '-');
$birthdate = htmlspecialchars($student['birthdate'] ?? '-');
$address   = htmlspecialchars($student['address'] ?? '-');
?>

<div class="applicant-modal-inner">
    <div class="applicant-modal-topbar">
        <div>
            <h2 class="applicant-modal-title">Student Account Details</h2>
            <p class="applicant-modal-sub">System ID: <?= $student['student_id'] ?></p>
        </div>
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
    </div>

    <div class="applicant-modal-actions" style="margin-top:20px;">
        <button type="button" class="applicant-btn applicant-btn--close" onclick="closeAdminModal()">
            Close
        </button>
    </div>
</div>