<?php
session_start();
if (!isset($_SESSION['isAdmin'])) {
  header("Location: admin-login.php");
  exit;
}
include_once 'connAdmin.php';
// ── stat cards ──────────────────────────────────────────────
$totalStudents  = $dbconn->query("SELECT COUNT(*) FROM student")->fetch_row()[0];
$totalApproved  = $dbconn->query("SELECT COUNT(*) FROM application WHERE application_status = 'Accepted'")->fetch_row()[0];
$totalPending   = $dbconn->query("SELECT COUNT(*) FROM application WHERE application_status = 'Pending'")->fetch_row()[0];
$totalRejected  = $dbconn->query("SELECT COUNT(*) FROM application WHERE application_status = 'Rejected'")->fetch_row()[0];

// ── chart 1: applications by status ─────────────────────────
$statusData = $dbconn->query("
  SELECT application_status, COUNT(*) as total
  FROM application
  GROUP BY application_status
")->fetch_all(MYSQLI_ASSOC);

$statusLabels = [];
$statusCounts = [];
foreach ($statusData as $row) {
  $statusLabels[] = $row['application_status'];
  $statusCounts[] = $row['total'];
}

// ── chart 2: applications by program ────────────────────────
$programData = $dbconn->query("
  SELECT program, COUNT(*) as total
  FROM application
  GROUP BY program
  ORDER BY total DESC
  LIMIT 6
")->fetch_all(MYSQLI_ASSOC);

$programLabels = [];
$programCounts = [];
foreach ($programData as $row) {
  $programLabels[] = $row['program'];
  $programCounts[] = $row['total'];
}
?>

<h1>Scholarship Overview</h1>

<!-- ── Stat Cards ── -->
<div class="stats-grid" style="margin-bottom: 20px;">
  <div class="box stat-card">
    <h2>Registered Students</h2>
    <p class="big-number"><?= $totalStudents ?></p>
  </div>
  <div class="box stat-card">
    <h2>Approved</h2>
    <p class="big-number" style="color:#2d7d42;"><?= $totalApproved ?></p>
  </div>
  <div class="box stat-card">
    <h2>Pending</h2>
    <p class="big-number" style="color:#8b6139;"><?= $totalPending ?></p>
  </div>
  <div class="box stat-card">
    <h2>Rejected</h2>
    <p class="big-number" style="color:#a3474a;"><?= $totalRejected ?></p>
  </div>
</div>

<!-- ── Charts ── -->
<div class="box">
  <h2>Charts</h2>
  <div class="chart-grid">

    <!-- Chart 1: Doughnut — Applications by Status -->
    <div class="chart-card">
      <p><strong>Applications by Status</strong></p>
      <canvas id="statusChart" height="220"></canvas>
    </div>

    <!-- Chart 2: Bar — Applications by Program -->
    <div class="chart-card">
      <p><strong>Applications by Program</strong></p>
      <canvas id="programChart" height="220"></canvas>
    </div>

  </div>
</div>

<!-- Chart.js -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
  (function() {
    // ── Chart 1: Doughnut ──────────────────────────────────
    var statusLabels = <?= json_encode($statusLabels) ?>;
    var statusCounts = <?= json_encode($statusCounts) ?>;

    new Chart(document.getElementById('statusChart'), {
      type: 'doughnut',
      data: {
        labels: statusLabels,
        datasets: [{
          data: statusCounts,
          backgroundColor: ['#2d7d42', '#8b6139', '#a3474a', '#5b8ac4'],
          borderWidth: 2,
          borderColor: '#fff'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });

    // ── Chart 2: Bar ───────────────────────────────────────
    var programLabels = <?= json_encode($programLabels) ?>;
    var programCounts = <?= json_encode($programCounts) ?>;

    new Chart(document.getElementById('programChart'), {
      type: 'bar',
      data: {
        labels: programLabels,
        datasets: [{
          label: 'Applicants',
          data: programCounts,
          backgroundColor: 'rgba(143, 41, 45, 0.75)',
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    });
  })();
</script>