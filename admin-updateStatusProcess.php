<?php
include_once 'connAdmin.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') exit;

$app_id    = isset($_POST['application_id']) ? (int)$_POST['application_id'] : 0;
$newStatus = isset($_POST['status']) ? $_POST['status'] : '';
$allowed   = ['Accepted', 'Rejected', 'Pending'];

if ($app_id === 0 || !in_array($newStatus, $allowed)) exit;

// 1. Determine the active_status value
$activeStatus = 'Pending'; // Default for "Pending" status
if ($newStatus === 'Accepted') {
    $activeStatus = 'Active';
} elseif ($newStatus === 'Rejected') {
    $activeStatus = 'Inactive';
}

// 2. Update both columns in the database
$stmt = $dbconn->prepare('UPDATE application SET application_status = ?, active_status = ? WHERE application_id = ?');
$stmt->bind_param("ssi", $newStatus, $activeStatus, $app_id);

if ($stmt->execute()) {
    echo "ok";
} else {
    echo "error";
}

$stmt->close();
