<?php
include_once 'connAdmin.php';

// Use OR for the status check
$query = "SELECT DISTINCT program FROM application 
          WHERE program IS NOT NULL 
          AND program != '' 
          AND (application_status = 'Pending' OR application_status = 'Accepted') 
          ORDER BY program ASC";

$result = $dbconn->query($query);

$programs = [];
while ($row = $result->fetch_assoc()) {
  $programs[] = $row['program'];
}

header('Content-Type: application/json');
echo json_encode($programs);
