<?php
include_once 'conn.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $student_id    = (int)$_POST['student_id'];
    $academic_year = $_POST['academic_year'];
    $program       = $_POST['program'];
    $college       = $_POST['college'];
    $year_level    = (int)$_POST['year_level'];
    $gwa           = (float)$_POST['gwa'];
    $eligibility   = ($gwa <= 1.75) ? 'eligible' : 'not eligible';

    $stmt = $dbconn->prepare('
        INSERT INTO application
            (student_id, academic_year, program, college, year_level, gwa,
             application_status, eligibility_status, submitted_at)
        VALUES (?, ?, ?, ?, ?, ?, "pending", ?, NOW())
    ');
    $stmt->bind_param(
        'isssisd',
        $student_id,
        $academic_year,
        $program,
        $college,
        $year_level,
        $gwa,
        $eligibility
    );
    $stmt->execute();
    exit;
}

// GET — fetch all students for dropdown
$students = $dbconn->query('
    SELECT student_id, student_no, first_name, last_name
    FROM student 
    WHERE student_id NOT IN (SELECT student_id FROM application)
    ORDER BY last_name ASC
');
?>

<div class="evaluation-modal-dialog">
    <div class="evaluation-modal-topbar">
        <h2>Add Application</h2>
    </div>
    <div class="evaluation-modal-body">
        <form onsubmit="submitAdd(event)">
            <div class="evaluation-modal-grid">

                <div class="evaluation-modal-info-card">
                    <label class="modal-info-label">Student</label>
                    <select name="student_id" required>
                        <option value="">-- Select Student --</option>
                        <?php foreach ($students->fetch_all(MYSQLI_ASSOC) as $s): ?>
                            <option value="<?= $s['student_id'] ?>">
                                <?= htmlspecialchars($s['student_no'] . ' — ' . $s['last_name'] . ', ' . $s['first_name']) ?>
                            </option>
                        <?php endforeach; ?>
                    </select>
                </div>

                <div class="evaluation-modal-info-card">
                    <label class="modal-info-label">Academic Year</label>
                    <input type="text" name="academic_year" placeholder="e.g. 2024-2025" required>
                </div>

                <div class="evaluation-modal-info-card">
                    <label class="modal-info-label">Program</label>
                    <input type="text" name="program" placeholder="e.g. BSIT" required>
                </div>

                <div class="evaluation-modal-info-card">
                    <label class="modal-info-label">College</label>
                    <input type="text" name="college" placeholder="e.g. CIT" required>
                </div>

                <div class="evaluation-modal-info-card">
                    <label class="modal-info-label">Year Level</label>
                    <input type="number" name="year_level" min="1" max="5" required>
                </div>

                <div class="evaluation-modal-info-card">
                    <label class="modal-info-label">GWA</label>
                    <input type="number" name="gwa" step="0.01" min="1.00" max="5.00" required>
                </div>

            </div>

            <div class="evaluation-modal-actions">
                <button type="submit">Submit Application</button>
                <button type="button" onclick="closeModal()" class="button-outline">Cancel</button>
            </div>
        </form>
    </div>
</div>