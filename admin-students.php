<?php
session_start();
if (!isset($_SESSION['isAdmin'])) {
  header("Location: admin-login.php");
  exit;
}
?>
<div class="content-header students-header">
  <h1>List of Applicants</h1>
</div>

<div class="admin-toolbar students-toolbar">
  <div class="search-field">
    <label class="sr-only" for="student-search">Search students</label>
    <input id="student-search" type="search" placeholder="Search">
  </div>

  <button onclick="openAddModal()"
    type="button"
    class="button-outline filter-button add-student-button"
    id="open-add-student-modal">
    + Add Application
  </button>
  <div class="evaluation-toolbar-actions">

    <div class="filter-dropdown">
      <button
        type="button"
        class="button-outline filter-button"
        id="evaluation-filter-button"
        aria-haspopup="true"
        aria-expanded="false">
        Filter
      </button>

      <div class="filter-menu" id="evaluation-filter-menu" hidden>
        <p class="filter-menu-title">Filter by</p>
        <div class="filter-type-list" role="group" aria-label="Choose applicant filter type">
          <button type="button" class="filter-type-button" data-evaluation-filter-type="status">Status</button>
          <button type="button" class="filter-type-button" data-evaluation-filter-type="program">Program</button>
          <button type="button" class="filter-type-button" data-evaluation-filter-type="gwa">GWA</button>
        </div>

        <label class="sr-only" for="evaluation-filter-value">Choose filter value</label>
        <select id="evaluation-filter-value" hidden>
          <option value="all">All</option>
        </select>
      </div>
    </div>
  </div>
</div>

<div class="table-card evaluation-table-card" aria-label="Applicant evaluation table">
  <table>
    <thead>
      <tr>
        <th>Student Number</th>
        <th>Full Name</th>
        <th>Program</th>
        <th>GWA</th>
        <th>Application Status</th>
        <th>Scholarship Status</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody id="evaluation-table-body">
      <?php
      include_once 'connAdmin.php';
      $stmt = $dbconn->query('
        SELECT
          s.student_no,
          a.application_id,
          s.first_name,
          s.last_name,
          a.program,
          a.gwa,
          a.application_status,
          a.active_status,
          a.eligibility_status
        FROM application a
        JOIN student s ON a.student_id = s.student_id
        WHERE a.eligibility_status = "Eligible"
        ORDER BY a.submitted_at DESC, a.academic_year DESC
      ');

      $apps = $stmt->fetch_all(MYSQLI_ASSOC);

      if (count($apps) === 0) {
        echo '<tr><td colspan="6" style="text-align:center; padding:32px; color:#aaa;">No applications found.</td></tr>';
      }

      foreach ($apps as $app) {
        $id       = $app['application_id'];
        $name     = htmlspecialchars($app['last_name'] . ', ' . $app['first_name']);
        $prog     = htmlspecialchars($app['program']);
        $gwa      = htmlspecialchars($app['gwa']);
        $status   = htmlspecialchars($app['application_status'] ?? 'Pending');
        $dataName = strtolower($app['last_name'] . ' ' . $app['first_name']);
        $studno = htmlspecialchars($app['student_no']);
        $activestatus = htmlspecialchars($app['active_status'] ?? 'inactive');
        $statusClass = match (strtolower($status)) {
          'accepted' => 'accepted',
          'rejected' => 'rejected',
          default    => 'pending'
        };
      ?>
        <tr onclick="viewListOfStudent(<?= $id ?>)" style="cursor:pointer;"
          data-name="<?= $dataName ?>"
          data-status="<?= $status ?>"
          data-program="<?= $prog ?>"
          data-gwa="<?= $gwa ?>">
          <td><?= $studno ?></td>
          <td><?= $name ?></td>
          <td><?= $prog ?></td>
          <td><?= $gwa ?></td>
          <td><span class="status <?= $statusClass ?>"><?= $status ?></span></td>
          <td><?= $activestatus ?></td>
          <td class="evaluation-action-cell">
            <div class="evaluation-action-group">
              <button onclick="event.stopPropagation(); viewListOfStudent(<?= $id ?>)"
                type="button" class="table-action evaluation-open-button">View</button>
              <button onclick="event.stopPropagation(); deleteApplication(<?= $id ?>)"
                type="button" class="table-action evaluation-open-button">Delete</button>
            </div>
          </td>
        </tr>
      <?php } ?>
    </tbody>
  </table>
  <p class="table-empty-state" id="evaluation-empty-state" hidden>
    No applicants match the current search or filter.
  </p>
</div>