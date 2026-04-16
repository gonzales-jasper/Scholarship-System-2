<?php
session_start();
if (!isset($_SESSION['isAdmin'])) {
  header("Location: admin-login.php");
  exit;
}
?>
<?php include_once 'connAdmin.php'; ?>

<h1>Applicant Evaluation</h1>
<div class="admin-toolbar scholars-toolbar evaluation-toolbar">
  <div class="search-field">
    <label class="sr-only" for="evaluation-search">Search applicants</label>
    <input id="evaluation-search" type="search" placeholder="Search by name...">
  </div>


</div>

<div class="table-card evaluation-table-card" aria-label="Applicant evaluation table">
  <table>
    <thead>
      <tr>

        <th>Full Name</th>
        <th>Program</th>
        <th>GWA</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody id="evaluation-table-body">
      <?php
      $stmt = $dbconn->query('
        SELECT
          a.application_id,
          s.first_name,
          s.last_name,
          a.program,
          a.gwa,
          a.application_status,
          a.eligibility_status
        FROM application a
        JOIN student s ON a.student_id = s.student_id
        WHERE a.application_status = "Pending"
        ORDER BY a.academic_year DESC, a.submitted_at DESC
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

        $statusClass = match (strtolower($status)) {
          'accepted' => 'accepted',
          'rejected' => 'rejected',
          default    => 'pending'
        };
      ?>
        <tr onclick="viewApplicant(<?= $id ?>)" style="cursor:pointer;"
          data-name="<?= $dataName ?>"
          data-status="<?= $status ?>"
          data-program="<?= $prog ?>"
          data-gwa="<?= $gwa ?>">
          <td><?= $name ?></td>
          <td><?= $prog ?></td>
          <td><?= $gwa ?></td>
          <td><span class="status <?= $statusClass ?>"><?= $status ?></span></td>
          <td class="evaluation-action-cell">
            <div class="evaluation-action-group">
              <button onclick="event.stopPropagation(); viewApplicant(<?= $id ?>)"
                type="button" class="table-action evaluation-open-button">Review</button>
              <!--<button onclick="event.stopPropagation(); deleteApplication(<?= $id ?>)"
                type="button" class="table-action evaluation-open-button">Delete</button>-->
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