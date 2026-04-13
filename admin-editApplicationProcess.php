<?php
include_once 'connAdmin.php';

$app_id        = intval($_POST['application_id'] ?? 0);
$academic_year = $_POST['academic_year'] ?? '';
$first_name    = $_POST['first_name'] ?? 'Student'; // Default to 'Student' if missing
$last_name     = $_POST['last_name'] ?? '';
$program       = $_POST['program'] ?? '';
$college       = $_POST['college'] ?? '';
$year_level    = intval($_POST['year_level'] ?? 0);
$gwa           = (float)($_POST['gwa'] ?? 0);
$confirmed     = isset($_POST['confirmed']); // second POST has this
if (!$app_id) {
    echo "invalid";
    exit;
}
$fullName = trim($last_name . ',  ' . $first_name);
$isQualified = ($gwa <= 1.75);
$eligibility = $isQualified ? 'Qualified' : 'Not Qualified';

// if GWA is above 1.75 AND not yet confirmed — show confirmation modal
if (!$isQualified && !$confirmed) {
?>
    <div class="evaluation-modal-body" style="text-align:center; padding:2rem;">
        <p style="font-size:3rem; margin-bottom:1rem;">⚠️</p>

        <h3 style="margin-bottom:0.5rem;">
            <?= htmlspecialchars($fullName) ?>'s GWA is too high.
        </h3>

        <p style="margin-bottom:1rem;">
            GWA of <strong><?= $gwa ?></strong> is above 1.75.<br>
            This will mark the student as <strong>Not Qualified</strong><br>
            and remove them from the evaluation list.
        </p>

        <p style="font-weight:bold; margin-bottom:1.5rem;">
            Are you sure you want to save this change?
        </p>
        <!-- hidden form with all the same data + confirmed flag -->
        <form onsubmit="submitEditProcess(event)" style="display:inline;">
            <input type="hidden" name="application_id" value="<?= $app_id ?>">
            <input type="hidden" name="first_name" value="<?= htmlspecialchars($first_name) ?>">
            <input type="hidden" name="last_name" value="<?= htmlspecialchars($last_name) ?>">
            <input type="hidden" name="academic_year" value="<?= htmlspecialchars($academic_year) ?>">
            <input type="hidden" name="program" value="<?= htmlspecialchars($program) ?>">
            <input type="hidden" name="college" value="<?= htmlspecialchars($college) ?>">
            <input type="hidden" name="year_level" value="<?= $year_level ?>">
            <input type="hidden" name="gwa" value="<?= $gwa ?>">
            <input type="hidden" name="confirmed" value="1"> <!-- ← triggers save on next POST -->

            <div class="evaluation-modal-actions">
                <button type="submit" style="color:red">Yes, Save Changes</button>
                <button type="button" onclick="closeAdminModal()" class="button-outline">Cancel</button>
            </div>
        </form>
    </div>
<?php
    exit;
}

// either qualified OR confirmed — save to DB
$stmt = $dbconn->prepare('
    UPDATE application
    SET academic_year = ?, program = ?, college = ?,
        year_level = ?, gwa = ?, eligibility_status = ?
    WHERE application_id = ?
');
$stmt->bind_param(
    'sssidsi',
    $academic_year,
    $program,
    $college,
    $year_level,
    $gwa,
    $eligibility,
    $app_id
);
$stmt->execute();
?>

<div class="evaluation-modal-body" style="text-align:center; padding:2rem;">
    <?php if ($isQualified): ?>
        <p style="font-size:2rem;">✅</p>
        <h3>Application Updated</h3>
        <p>Changes saved successfully. Student remains <strong>Qualified</strong>.</p>
    <?php else: ?>
        <p style="font-size:2rem;">✅</p>
        <h3>Application Updated</h3>
        <p>Changes saved. Student is now marked as <strong>Not Qualified</strong>.</p>
    <?php endif; ?>
    <div class="evaluation-modal-actions">
        <button onclick="closeAdminModal()" class="button-outline">Close</button>
    </div>
</div>