<h1>Applicant Evaluation</h1>
<div class="admin-toolbar scholars-toolbar evaluation-toolbar">
  <div class="search-field">
    <label class="sr-only" for="evaluation-search">Search applicants</label>
    <input id="evaluation-search" type="search" placeholder="Search by name...">
  </div>

  <div class="evaluation-toolbar-actions">
    <button onclick="openAddModal()"
      type="button"
      class="button-outline filter-button add-student-button"
      id="open-add-student-modal">
      Add Application
    </button>

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
          <button type="button" class="filter-type-button" data-evaluation-filter-type="gwa">GWA</button>
          <button type="button" class="filter-type-button" data-evaluation-filter-type="income">Income</button>
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
        <th>Applicant ID</th>
        <th>Full Name</th>
        <th>Program</th>
        <th>GWA</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody id="evaluation-table-body">
      <?php
      include_once 'conn.php';
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
                where a.eligibility_status = "Qualified"
                 ORDER BY a.academic_year DESC, a.submitted_at DESC
            ');

      $apps = $stmt->fetch_all(MYSQLI_ASSOC);

      if (count($apps) === 0) {
        echo '<tr><td colspan="5">No applications found.</td></tr>';
      }

      foreach ($apps as $app) {
        $id     = $app['application_id'];
        $name   = htmlspecialchars($app['last_name'] . ', ' . $app['first_name']);
        $prog   = htmlspecialchars($app['program']);
        $gwa    = htmlspecialchars($app['gwa']);
        $status = htmlspecialchars($app['application_status'] ?? 'Pending');

        $statusClass = match (strtolower($status)) {
          'approved'  => 'approved',
          'rejected'  => 'rejected',
          default     => 'pending'
        };
      ?>
        <tr onclick="viewApplicant(<?= $id ?>)" style="cursor:pointer;"
          data-name="<?= $name ?>"
          data-status="<?= $status ?>"
          data-program="<?= $prog ?>">
          <td><?= $id ?></td>
          <td><?= $name ?></td>
          <td><?= $prog ?></td>
          <td><?= $gwa ?></td>
          <td><span class="status <?= $statusClass ?>"><?= $status ?></span></td>
          <td class="evaluation-action-cell">
            <div class="evaluation-action-group">
              <button onclick="event.stopPropagation(); viewApplicant(<?= $id ?>)"
                type="button" class="table-action evaluation-open-button">Review</button>
              <button onclick="event.stopPropagation(); editApplication(<?= $id ?>)"
                type="button" class="table-action">Edit</button>
              <button onclick="event.stopPropagation(); deleteApplication(<?= $id ?>)"
                type="button" class="table-action evaluation-delete-button">Delete</button>
            </div>
          </td>
        </tr>
      <?php } ?>
    </tbody>
  </table>
  <p class="table-empty-state" id="evaluation-empty-state" hidden>No applicants match the current search or filter.</p>
</div>