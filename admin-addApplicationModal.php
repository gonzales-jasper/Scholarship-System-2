<?php
include_once 'connAdmin.php';

$students = $dbconn->query('
    SELECT student_id, student_no, first_name, last_name
    FROM student
    ORDER BY last_name ASC
');
?>

<div class="applicant-modal-inner">

    <div class="applicant-modal-topbar">
        <div>
            <h2 class="applicant-modal-title">Add Application</h2>
            <p class="applicant-modal-sub">Fill in the student's application details below.</p>
        </div>
        <button type="button" class="applicant-modal-close" onclick="closeAdminModal()">&times;</button>
    </div>

    <form onsubmit="submitAdd(event)">

        <!-- Student Selection -->
        <div class="applicant-info-card applicant-info-card--full" style="margin-bottom: 12px;">
            <span class="applicant-info-label">Select Student</span>
            <select name="student_id" id="student-select" required
                style="width:100%; padding:8px 10px; border:1px solid #ddd; border-radius:8px; font-size:15px; margin-top:4px;"
                onchange="handleStudentSelect(this)">
                <option value="">-- Select Student --</option>
                <?php foreach ($students->fetch_all(MYSQLI_ASSOC) as $s): ?>
                    <option value="<?= $s['student_id'] ?>"
                        data-no="<?= htmlspecialchars($s['student_no']) ?>"
                        data-fname="<?= htmlspecialchars($s['first_name']) ?>"
                        data-lname="<?= htmlspecialchars($s['last_name']) ?>">
                        <?= htmlspecialchars($s['student_no'] . ' — ' . $s['last_name'] . ', ' . $s['first_name']) ?>
                    </option>
                <?php endforeach; ?>
            </select>
        </div>

        <!-- Application Details Grid -->
        <div class="applicant-modal-grid">

            <div class="applicant-info-card">
                <span class="applicant-info-label">Academic Year</span>
                <input type="text" name="academic_year" placeholder="e.g. 2024-2025" required
                    style="margin-top:4px; width:100%; padding:6px 8px; border:1px solid #ddd;
                 border-radius:8px; font-size:15px; font-weight:600; box-sizing:border-box;">
            </div>

            <div class="applicant-info-card">
                <span class="applicant-info-label">Program</span>
                <input type="text" name="program" placeholder="e.g. BSIT" required
                    style="margin-top:4px; width:100%; padding:6px 8px; border:1px solid #ddd;
                 border-radius:8px; font-size:15px; font-weight:600; box-sizing:border-box;">
            </div>

            <div class="applicant-info-card">
                <span class="applicant-info-label">College</span>
                <input type="text" name="college" placeholder="e.g. CICT" required
                    style="margin-top:4px; width:100%; padding:6px 8px; border:1px solid #ddd;
                 border-radius:8px; font-size:15px; font-weight:600; box-sizing:border-box;">
            </div>

            <div class="applicant-info-card">
                <span class="applicant-info-label">Year Level</span>
                <input type="number" name="year_level" min="1" max="5" placeholder="1" required
                    style="margin-top:4px; width:100%; padding:6px 8px; border:1px solid #ddd;
                 border-radius:8px; font-size:15px; font-weight:600; box-sizing:border-box;">
            </div>

            <div class="applicant-info-card applicant-info-card--full">
                <span class="applicant-info-label">GWA</span>
                <input type="number" name="gwa" step="0.01" min="1.00" max="5.00" placeholder="1.75" required
                    style="margin-top:4px; width:100%; padding:6px 8px; border:1px solid #ddd;
                 border-radius:8px; font-size:15px; font-weight:600; box-sizing:border-box;">
            </div>

        </div>

        <div class="applicant-modal-actions" style="margin-top: 20px;">
            <button type="submit" class="applicant-btn applicant-btn--approve">
                Submit Application
            </button>
            <button type="button" class="applicant-btn applicant-btn--close"
                onclick="closeAdminModal()">
                Cancel
            </button>
        </div>

    </form>

</div>