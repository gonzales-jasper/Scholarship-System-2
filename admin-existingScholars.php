<?php
session_start();
if (!isset($_SESSION['isAdmin'])) {
    header("Location: admin-login.php");
    exit;
}
require_once 'connAdmin.php';

// The query already filters for active only
$sql = '
    SELECT a.application_id, a.program, a.college, a.academic_year, a.application_status, a.active_status, a.gwa,
           s.student_no,
           CONCAT(s.first_name, " ", COALESCE(s.middle_name, ""), " ", s.last_name) AS full_name
    FROM application a
    JOIN student s ON s.student_id = a.student_id
    WHERE a.active_status = "active"
    ORDER BY s.last_name ASC
';
$scholars = $dbconn->query($sql);
?>

<h1>Existing Scholars</h1>
<p class="form-success scholars-success-msg" id="scholars-success-msg" hidden></p>

<div class="table-card">
    <table>
        <thead>
            <tr>
                <th>Student No.</th>
                <th>Name</th>
                <th>Program</th>
                <th>GWA</th>
                <th>Academic Year</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody id="scholars-table-body">
            <?php if ($scholars->num_rows === 0): ?>
                <tr>
                    <td colspan="7" class="table-empty-state">No active scholars found.</td>
                </tr>
                <?php else: while ($row = $scholars->fetch_assoc()): ?>
                    <tr data-program="<?= htmlspecialchars($row['program']) ?>" data-status="Active">
                        <td><?= htmlspecialchars($row['student_no']) ?></td>
                        <td><?= htmlspecialchars(trim($row['full_name'])) ?></td>
                        <td><?= htmlspecialchars($row['program']) ?></td>
                        <td><?= htmlspecialchars($row['gwa']) ?></td>
                        <td><?= htmlspecialchars($row['academic_year']) ?></td>
                        <td><span class="status scholar-active">Active</span></td>
                        <td>
                            <button type="button"
                                class="table-action scholar-action-button muted-button"
                                onclick="updateScholarStatus(<?= $row['application_id'] ?>, 'set_inactive', this)">
                                Set to inactive
                            </button>
                        </td>
                    </tr>
            <?php endwhile;
            endif; ?>
        </tbody>
    </table>
    <p class="table-empty-state" id="scholars-empty-state" hidden>No scholars match the selected filter.</p>
</div>