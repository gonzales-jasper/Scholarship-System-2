<?php
session_start();
if (!isset($_SESSION['isAdmin'])) {
  header("Location: admin-login.php");
  exit;
}
$adminUsername = htmlspecialchars($_SESSION['admin_username'] ?? 'Admin');
$adminDisplay  = htmlspecialchars($_SESSION['admin_display'] ?? $_SESSION['admin_username'] ?? 'Admin');
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin</title>
  <link rel="stylesheet" href="style.css">
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <script src="script.js"></script>
</head>

<body>
  <div class="page admin-page">
    <div class="profile-shell" data-admin-profile-host></div>
    <div class="admin-layout">
      <div class="card sidebar-card">
        <h2>Menu</h2>
        <nav class="nav-list">
          <a class="nav-link active " href="#" onclick='loadPageAdmin("admin-dashboard.php",this)'>Dashboard</a>
          <a class="nav-link" href="#" onclick=' loadPageAdmin("admin-studentsAccount.php", this)'>List of Students</a>
          <a class="nav-link" href="#" onclick=' loadPageAdmin("admin-students.php", this)'>List of Applicants</a>
          <a class="nav-link" href="#" onclick='loadPageAdmin("admin-evaluation.php", this)'>Applicant Evaluation</a>
          <a class="nav-link" href="#" onclick='loadPageAdmin("admin-existingScholars.php", this)'>Existing Scholars</a>
          <!--<a class="nav-link" href="#" onclick='loadPageAdmin("admin-scholars.php", this)'>Existing Scholars</a>-->
        </nav>
      </div>

      <div class="card content-card" id="main-content"> </div>
    </div>
    <div id="bg-modal" onclick="closeAdminModal()" style="display:none;"></div>
    <div id="modal" style="display:none;"></div>
  </div>

  <script>
    // Seed the admin profile widget from the PHP session
    // so it works even when localStorage has no stored admin.
    (function() {
      var sessionAdmin = {
        username: "<?= $adminUsername ?>",
        displayName: "<?= $adminDisplay ?>"
      };
      try {
        localStorage.setItem("scholarshipPortal.currentAdmin", JSON.stringify(sessionAdmin));
      } catch (e) {}
    })();

    $(document).ready(function() {
      loadPageAdmin("admin-dashboard.php");
    });
  </script>
</body>

</html>