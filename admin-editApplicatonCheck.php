<?php
include_once 'connAdmin.php';

$app_id = intval($_POST['application_id'] ?? 0);
$gwa    = (float)($_POST['gwa'] ?? 0);

// If GWA is fine, skip the warning and go straight to the saver
if ($gwa <= 1.75) {
    include 'admin-editApplicationProcess.php';
    exit;
}

// If GWA is high, show this "Warning Screen"
?>
<div class="evaluation-modal-body" style="text-align:center; padding:2rem;">
    <p style="font-size:3rem;">⚠️</p>
    <h3>Confirm Disqualification</h3>
    <p>The GWA (<?= $gwa ?>) exceeds the limit. Saving will remove this student from the qualified list.</p>

    <div class="evaluation-modal-actions">
        <button onclick="executeFinalSave()" class="applicant-btn--approve">Yes, Proceed</button>
        <button onclick="editApplication(<?= $app_id ?>)" class="applicant-btn--close">No, Fix GWA</button>
    </div>
</div>