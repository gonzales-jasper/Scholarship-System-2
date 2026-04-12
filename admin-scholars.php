<h1>Existing Scholars</h1>
<div class="admin-toolbar scholars-toolbar">
  <div class="scholars-toolbar-spacer" aria-hidden="true"></div>

  <div class="filter-dropdown">
    <button
      type="button"
      class="button-outline filter-button"
      id="scholars-filter-button"
      aria-haspopup="true"
      aria-expanded="false">
      Filter
    </button>

    <div class="filter-menu" id="scholars-filter-menu" hidden>
      <p class="filter-menu-title">Filter by</p>
      <div class="filter-type-list" role="group" aria-label="Choose scholars filter type">
        <button type="button" class="filter-type-button" data-scholars-filter-type="program">Program</button>
        <button type="button" class="filter-type-button" data-scholars-filter-type="status">Status</button>
      </div>

      <label class="sr-only" for="scholars-filter-value">Choose filter value</label>
      <select id="scholars-filter-value" hidden>
        <option value="all">All</option>
      </select>
    </div>
  </div>
</div>

<div class="table-card">
  <table>
    <thead>
      <tr>
        <th>Student No.</th>
        <th>Name</th>
        <th>Program</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody id="scholars-table-body">
      <tr data-program="BSIT" data-status="Active">
        <td>2023-017</td>
        <td>Elaine Ramos</td>
        <td>BSIT</td>
        <td><span class="status scholar-active">Active</span></td>
      </tr>
      <tr data-program="BSCE" data-status="Active">
        <td>2023-032</td>
        <td>Mark Salazar</td>
        <td>BSCE</td>
        <td><span class="status scholar-active">Active</span></td>
      </tr>
      <tr data-program="BSED" data-status="Inactive">
        <td>2023-044</td>
        <td>Jessa Flores</td>
        <td>BSED</td>
        <td><span class="status scholar-inactive">Inactive</span></td>
      </tr>
    </tbody>
  </table>
  <p class="table-empty-state" id="scholars-empty-state" hidden>No scholars match the selected filter.</p>
</div>
</div>
</div>
</div>