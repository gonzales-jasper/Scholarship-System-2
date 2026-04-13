<?php
include_once 'connAdmin.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') exit;

$app_id = isset($_POST['application_id']) ? (int)$_POST['application_id'] : 0;

if ($app_id === 0) exit;

$stmt = $dbconn->prepare('DELETE FROM application WHERE application_id = ?');


$stmt->execute([$app_id]);
