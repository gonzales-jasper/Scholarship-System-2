<?php
require_once 'connAdmin.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: admin.php?page=scholars');
    exit;
}

$app_id = intval($_POST['application_id'] ?? 0);
$action = $_POST['action'] ?? '';
$allowed = ['set_active', 'set_inactive'];

if (!$app_id || !in_array($action, $allowed)) {
    header('Location: admin.php?page=scholars');
    exit;
}

$new_status = $action === 'set_active' ? 'Accepted' : 'Inactive';
$msg        = $action === 'set_active' ? 'Scholar set to Active.' : 'Scholar set to Inactive.';

$stmt = $dbconn->prepare("UPDATE application SET active_status = ? WHERE application_id = ?");
$stmt->bind_param('si', $new_status, $app_id);
$stmt->execute();
$stmt->close();

http_response_code(200);
exit;
