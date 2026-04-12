<div class="card content-card">
  <div class="content-header students-header">
    <h1>List of Students</h1>
  </div>

  <div class="admin-toolbar students-toolbar">
    <div class="search-field">
      <label class="sr-only" for="student-search">Search students</label>
      <input id="student-search" type="search" placeholder="Search">
    </div>

    <div class="students-toolbar-actions">
      <div class="filter-dropdown">
        <button type="button" class="button-outline filter-button" id="student-filter-button" aria-haspopup="true"
          aria-expanded="false">
          Filter
        </button>

        <div class="filter-menu" id="student-filter-menu" hidden>
          <p class="filter-menu-title">Filter by</p>
          <div class="filter-type-list" role="group" aria-label="Choose filter type">
            <button type="button" class="filter-type-button" data-filter-type="college">College</button>
            <button type="button" class="filter-type-button" data-filter-type="program">Program</button>
            <button type="button" class="filter-type-button" data-filter-type="status">Status</button>
          </div>

          <label class="sr-only" for="student-filter-value">Choose filter value</label>
          <select id="student-filter-value" hidden>
            <option value="all">All</option>
          </select>
        </div>
      </div>
    </div>
  </div>

  <div class="table-card">
    <table id="students-table">
      <thead>
        <tr>
          <th>User ID</th>
          <th>Student No.</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Sex</th>
          <th>Birthday</th>
          <th>Address</th>
        </tr>
      </thead>
      <?php
      include_once 'conn.php';
      $students = $dbconn->query('SELECT s.student_id, s.student_no, s.first_name, s.last_name, 
                 s.sex, s.birthday, s.address
          FROM student s
            ORDER BY last_name ASC');

      foreach ($students as $student) {
        echo " 
    <tr>
    <td>{$student['student_id']} </td> 
    <td>{$student['student_no']}</td> 
     <td> {$student['first_name']}</td>
    <td>{$student['last_name']}</td> 
   <td>{$student['sex']}</td>
    <td>{$student['birthday']}</td>  
    <td>{$student['address']}</td>  
    </tr>
      ";
      }
      ?>

    </table>
    <p class="table-empty-state" id="students-empty-state" hidden>No students match the selected filters.</p>
  </div>
</div>