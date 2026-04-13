<?php
include_once 'connAdmin.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') exit;

$app_id    = isset($_POST['application_id']) ? (int)$_POST['application_id'] : 0;
$newStatus = isset($_POST['status']) ? $_POST['status'] : '';
$allowed   = ['Approved', 'Rejected', 'Pending'];

if ($app_id === 0 || !in_array($newStatus, $allowed)) exit;

$stmt = $dbconn->prepare('UPDATE application SET application_status = ? WHERE application_id = ?');
$stmt->bind_param("si", $newStatus, $app_id);
$stmt->execute();

echo "ok";
