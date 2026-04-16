<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Login | Scholarship Portal</title>
  <link rel="stylesheet" href="style.css">
</head>

<body class="auth-page">
  <div class="page page-center">
    <div class="card small-card">
      <h1>Admin Login</h1>

      <?php
      // Check if there is an error message in the session
      if (isset($_SESSION['login_error'])):
      ?>
        <p id="login-error" style="color:#a3474a; font-size:14px; display:block; margin-bottom: 10px;">
          <?php
          echo $_SESSION['login_error'];
          unset($_SESSION['login_error']); // Clear it so it disappears on refresh
          ?>
        </p>
      <?php endif; ?>

      <form method="POST" action="admin-loginProcess.php">
        <label>Username</label>
        <input type="text" name="username" placeholder="Enter username" required autocomplete="off">

        <label>Password</label>
        <input type="password" name="password" placeholder="Enter password" required>

        <div class="actions actions-end">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  </div>
</body>

</html>