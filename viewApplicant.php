<?php
include_once 'conn.php';

$app_id = isset($_GET['application_id']) ? (int)$_GET['application_id'] : 0;

if ($app_id === 0) {
    echo '<p>Invalid application.</p>';
    exit;
}

$result = $dbconn->query("
    SELECT
        s.student_id, s.student_no, s.first_name, s.middle_name, s.last_name,
        a.application_id, a.academic_year, a.program, a.college, a.year_level,
        a.gwa, a.application_status, a.eligibility_status
    FROM application a
    JOIN student s ON a.student_id = s.student_id
    WHERE a.application_id = '$app_id'
");

if ($result && $result->num_rows > 0) {
    $d = $result->fetch_assoc();
} else {
    echo '<p>Applicant not found.</p>';
    exit;
}
?>

<div class="evaluation-modal-dialog" aria-labelledby="evaluation-modal-title" aria-modal="true" role="dialog">

    <div class="evaluation-modal-topbar">
        <h2 id="evaluation-modal-title">Student Information</h2>
        <a class="button-link button-outline" href="javascript:void(0)" onclick="loadFullProfile(<?= $d['student_id'] ?>)">>View Full Profile</a>
    </div>

    <div class="evaluation-modal-body">

        <div id="view-section">
            <div class="evaluation-modal-grid">
                <div class="evaluation-modal-info-card">
                    <span class="modal-info-label">Applicant ID</span>
                    <span class="modal-info-value"><?= htmlspecialchars($d['application_id']) ?></span>
                </div>
                <div class="evaluation-modal-info-card">
                    <span class="modal-info-label">Student No.</span>
                    <span class="modal-info-value"><?= htmlspecialchars($d['student_no']) ?></span>
                </div>
                <div class="evaluation-modal-info-card">
                    <span class="modal-info-label">Last Name</span>
                    <span class="modal-info-value"><?= htmlspecialchars($d['last_name']) ?></span>
                </div>
                <div class="evaluation-modal-info-card">
                    <span class="modal-info-label">First Name</span>
                    <span class="modal-info-value"><?= htmlspecialchars($d['first_name']) ?></span>
                </div>
                <div class="evaluation-modal-info-card">
                    <span class="modal-info-label">Middle Name</span>
                    <span class="modal-info-value"><?= htmlspecialchars($d['middle_name'] ?: '—') ?></span>
                </div>
                <div class="evaluation-modal-info-card">
                    <span class="modal-info-label">Program</span>
                    <span class="modal-info-value"><?= htmlspecialchars($d['program']) ?></span>
                </div>
                <div class="evaluation-modal-info-card">
                    <span class="modal-info-label">GWA</span>
                    <span class="modal-info-value"><?= htmlspecialchars($d['gwa']) ?></span>
                </div>
                <div class="evaluation-modal-info-card">
                    <span class="modal-info-label">Status</span>
                    <span class="modal-info-value"><strong><?= htmlspecialchars($d['application_status']) ?></strong></span>
                </div>
            </div>

            <div class="evaluation-modal-actions">
                <form onsubmit="submitEvaluation(event)" style="display:inline;">
                    <input type="hidden" name="application_id" value="<?= $d['application_id'] ?>">
                    <button type="submit" name="action" value="approved">Approve</button>
                    <button type="submit" name="action" value="rejected" class="muted-button">Reject</button>
                </form>
                <button onclick="showEditSection()" class="button-outline">Edit</button>
                <button onclick="deleteApplication(<?= $d['application_id'] ?>)" class="muted-button">Delete</button>
                <button onclick="closeModal()" class="button-link">Close</button>
            </div>
        </div>

        <div id="edit-section" style="display:none;">
            <form onsubmit="submitEdit(event)">
                <input type="hidden" name="application_id" value="<?= $d['application_id'] ?>">
                <div class="evaluation-modal-grid">
                    <div class="evaluation-modal-info-card">
                        <label class="modal-info-label">Program</label>
                        <input type="text" name="program" value="<?= htmlspecialchars($d['program']) ?>" required>
                    </div>
                    <div class="evaluation-modal-info-card">
                        <label class="modal-info-label">College</label>
                        <input type="text" name="college" value="<?= htmlspecialchars($d['college']) ?>" required>
                    </div>
                    <div class="evaluation-modal-info-card">
                        <label class="modal-info-label">Year Level</label>
                        <input type="number" name="year_level" value="<?= $d['year_level'] ?>" min="1" max="5" required>
                    </div>
                    <div class="evaluation-modal-info-card">
                        <label class="modal-info-label">GWA</label>
                        <input type="number" name="gwa" step="0.01" value="<?= $d['gwa'] ?>" required>
                    </div>
                </div>
                <div class="evaluation-modal-actions">
                    <button type="submit">Save Changes</button>
                    <button type="button" onclick="showViewSection()" class="button-outline">Cancel</button>
                </div>
            </form>
        </div>

    </div>
</div>