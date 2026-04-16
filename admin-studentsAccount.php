<?php
session_start();

// Use the same variable you used during login (isAdmin or admin_id)
if (!isset($_SESSION['isAdmin'])) {
    header("Location: admin-login.php");
    exit;
}

include_once 'connAdmin.php';

// Fetch students
$students = $dbconn->query('SELECT 
    student_id, 
    student_no, 
    first_name, 
    last_name, 
    sex, 
    birthdate, 
    address 
    FROM student 
    ORDER BY last_name ASC');
?>

<div class="content-header students-header">
    <h1>List of Students</h1>
</div>

<div class="admin-toolbar students-toolbar">
    <div class="search-field">
        <label class="sr-only" for="student-search">Search students</label>
        <input id="student-search" type="search" placeholder="Search">
    </div>
</div>

<div class="table-card">
    <table id="students-table">
        <thead>
            <tr>
                <th>Student No.</th>
                <!--<th>First Name</th>-->
                <th>Full Name</th>
                <th>Sex</th>
                <!--<th>Birthday</th>-->
                <!--<th>Address</th>-->
                <th>Action</th>
            </tr>
        </thead>
        <tbody id="students-table-body">
            <?php foreach ($students as $student):
                $studentId = $student['student_id'];
                $dataName = strtolower($student['last_name'] . ' ' . $student['first_name']);
            ?>
                <tr data-id="<?= $studentId ?>" data-name="<?= $dataName ?>">
                    <td><?= htmlspecialchars($student['student_no']) ?></td>
                    <td><?= htmlspecialchars($student['first_name']) . ' ' . htmlspecialchars($student['last_name']) ?></td>
                    <td><?= htmlspecialchars($student['sex']) ?></td>
                    <td>
                        <button onclick="event.stopPropagation(); viewStudentAccount(<?= $studentId ?>)"
                            type="button"
                            class="table-action evaluation-open-button">
                            View
                        </button>
                    </td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
    <p class="table-empty-state" id="students-empty-state" hidden>No students match the selected filters.</p>
</div>