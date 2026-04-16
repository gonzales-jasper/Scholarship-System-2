<?php
ob_start();
session_start();

$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

if ($username === "admin" && $password === "admin123") {
    $_SESSION['isAdmin'] = true;
    $_SESSION['admin_username'] = $username;
    header("Location: admin.php");
    exit;
} else {
    // Save the error message in a session variable
    $_SESSION['login_error'] = "Incorrect username or password.";
    // Redirect back to the clean URL
    header("Location: admin-login.php");
    exit;
}
