<?php
include_once 'connAdmin.php';

// Get students who don't have ANY application yet
$students = $dbconn->query('
    SELECT s.student_id, s.student_no, s.first_name, s.last_name, 
           s.middle_name, s.sex, s.birthdate, s.address, 
           s.barangay, s.city, s.province, s.region
    FROM student s
    LEFT JOIN application a ON s.student_id = a.student_id
    WHERE a.application_id IS NULL
    ORDER BY s.last_name ASC
');
?>

<div class="applicant-modal-inner" style="max-height: 80vh; overflow-y: auto;">

    <div class="applicant-modal-topbar">
        <div>
            <h2 class="applicant-modal-title">Add Application</h2>
            <p class="applicant-modal-sub">Fill in the student's application details below.</p>
        </div>
        <button type="button" class="applicant-modal-close" onclick="closeAdminModal()">&times;</button>
    </div>

    <form onsubmit="submitAdd(event)">

        <!-- Student Selection -->
        <div class="applicant-info-card applicant-info-card--full" style="margin-bottom: 12px;">
            <span class="applicant-info-label">Select Student *</span>
            <select name="student_id" id="student-select" required
                style="width:100%; padding:8px 10px; border:1px solid #ddd; border-radius:8px; font-size:15px; margin-top:4px;">
                <option value="">-- Select Student --</option>
                <?php foreach ($students->fetch_all(MYSQLI_ASSOC) as $s): ?>
                    <option value="<?= $s['student_id'] ?>"
                        data-no="<?= htmlspecialchars($s['student_no']) ?>"
                        data-fname="<?= htmlspecialchars($s['first_name']) ?>"
                        data-lname="<?= htmlspecialchars($s['last_name']) ?>"
                        data-mname="<?= htmlspecialchars($s['middle_name'] ?? '') ?>"
                        data-sex="<?= htmlspecialchars($s['sex'] ?? '') ?>"
                        data-birthdate="<?= htmlspecialchars($s['birthdate'] ?? '') ?>"
                        data-address="<?= htmlspecialchars($s['address'] ?? '') ?>"
                        data-barangay="<?= htmlspecialchars($s['barangay'] ?? '') ?>"
                        data-city="<?= htmlspecialchars($s['city'] ?? '') ?>"
                        data-province="<?= htmlspecialchars($s['province'] ?? '') ?>"
                        data-region="<?= htmlspecialchars($s['region'] ?? '') ?>">
                        <?= htmlspecialchars($s['student_no'] . ' — ' . $s['last_name'] . ', ' . $s['first_name']) ?>
                    </option>
                <?php endforeach; ?>
            </select>
        </div>

        <!-- Selected Student Info Display (Hidden by default) -->
        <div id="selected-student-display" style="margin-bottom: 12px; display: none; background: #f0f7ff; border-left: 3px solid #4a90d9; padding: 12px; border-radius: 8px;">
            <div style="display: flex; gap: 24px; flex-wrap: wrap;">
                <div>
                    <span style="font-size: 11px; color: #666; text-transform: uppercase; letter-spacing: 0.5px;">Student Number</span>
                    <div id="selected-student-no" style="font-weight: 600; font-size: 14px; color: #333;"></div>
                </div>
                <div>
                    <span style="font-size: 11px; color: #666; text-transform: uppercase; letter-spacing: 0.5px;">Full Name</span>
                    <div id="selected-student-name" style="font-weight: 600; font-size: 14px; color: #333;"></div>
                </div>
            </div>
        </div>

        <!-- Personal Info Grid -->
        <div class="applicant-modal-grid" style="margin-bottom: 12px;">
            <div class="applicant-info-card">
                <span class="applicant-info-label">Birthday</span>
                <input type="text" id="birthdate-field" readonly
                    style="margin-top:4px; width:100%; padding:6px 8px; border:1px solid #e0e0e0;
                 border-radius:6px; font-size:14px; background-color: #f5f5f5; color: #666;">
            </div>

            <div class="applicant-info-card">
                <span class="applicant-info-label">Sex</span>
                <input type="text" id="sex-field" readonly
                    style="margin-top:4px; width:100%; padding:6px 8px; border:1px solid #e0e0e0;
                 border-radius:6px; font-size:14px; background-color: #f5f5f5; color: #666;">
            </div>

            <div class="applicant-info-card applicant-info-card--full">
                <span class="applicant-info-label">Address</span>
                <input type="text" id="address-field" readonly
                    style="margin-top:4px; width:100%; padding:6px 8px; border:1px solid #e0e0e0;
                 border-radius:6px; font-size:14px; background-color: #f5f5f5; color: #666;">
            </div>
        </div>

        <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;">

        <!-- Academic Information -->
        <div class="applicant-modal-grid">
            <div class="applicant-info-card">
                <span class="applicant-info-label">Academic Year *</span>
                <input type="text" name="academic_year" placeholder="2024-2025" required
                    style="margin-top:4px; width:100%; padding:6px 8px; border:1px solid #ddd;
                 border-radius:6px; font-size:14px;">
            </div>

            <div class="applicant-info-card">
                <span class="applicant-info-label">Program *</span>
                <input type="text" name="program" placeholder="BSIT" required
                    style="margin-top:4px; width:100%; padding:6px 8px; border:1px solid #ddd;
                 border-radius:6px; font-size:14px;">
            </div>

            <div class="applicant-info-card">
                <span class="applicant-info-label">College *</span>
                <input type="text" name="college" placeholder="CICT" required
                    style="margin-top:4px; width:100%; padding:6px 8px; border:1px solid #ddd;
                 border-radius:6px; font-size:14px;">
            </div>

            <div class="applicant-info-card">
                <span class="applicant-info-label">Year Level *</span>
                <select name="year_level" required
                    style="margin-top:4px; width:100%; padding:6px 8px; border:1px solid #ddd;
                 border-radius:6px; font-size:14px; background: white;">
                    <option value="">Select</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                    <option value="5">5th Year</option>
                </select>
            </div>

            <div class="applicant-info-card applicant-info-card--full">
                <span class="applicant-info-label">GWA *</span>
                <input type="number" name="gwa" step="0.01" min="1.00" max="5.00" placeholder="1.75" required
                    style="margin-top:4px; width:100%; padding:6px 8px; border:1px solid #ddd;
                 border-radius:6px; font-size:14px;">
            </div>
        </div>

        <div class="applicant-modal-actions" style="margin-top: 20px; padding-bottom: 10px;">
            <button type="submit" class="applicant-btn applicant-btn--approve">
                Submit Application
            </button>
            <button type="button" class="applicant-btn applicant-btn--close" onclick="closeAdminModal()">
                Cancel
            </button>
        </div>

    </form>

</div>

<script>
    // Use event delegation or direct binding after modal loads
    document.addEventListener('DOMContentLoaded', function() {
        initStudentSelect();
    });

    // Also try to init immediately in case DOM is already loaded
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(initStudentSelect, 1);
    }

    function initStudentSelect() {
        var select = document.getElementById('student-select');
        if (!select) return;

        // Remove inline onchange and use addEventListener
        select.onchange = function() {
            handleStudentSelect(this);
        };
    }

    function handleStudentSelect(selectEl) {
        var opt = selectEl.options[selectEl.selectedIndex];

        // Get all elements
        var display = document.getElementById('selected-student-display');
        var nameEl = document.getElementById('selected-student-name');
        var noEl = document.getElementById('selected-student-no');
        var birthdateField = document.getElementById('birthdate-field');
        var sexField = document.getElementById('sex-field');
        var addressField = document.getElementById('address-field');

        // Debug log
        console.log('handleStudentSelect called, value:', selectEl.value);
        console.log('opt:', opt);
        console.log('display element:', display);

        if (selectEl.value && opt) {
            // Get data attributes
            var fname = opt.getAttribute('data-fname') || '';
            var lname = opt.getAttribute('data-lname') || '';
            var mname = opt.getAttribute('data-mname') || '';
            var studentNo = opt.getAttribute('data-no') || '';
            var sex = opt.getAttribute('data-sex') || '';
            var birthdate = opt.getAttribute('data-birthdate') || '';
            var address = opt.getAttribute('data-address') || '';
            var barangay = opt.getAttribute('data-barangay') || '';
            var city = opt.getAttribute('data-city') || '';
            var province = opt.getAttribute('data-province') || '';
            var region = opt.getAttribute('data-region') || '';

            // Build full name
            var fullName = lname + ', ' + fname;
            if (mname && mname.trim() !== '' && mname !== 'NULL') {
                fullName += ' ' + mname;
            }

            // Update display card
            if (nameEl) nameEl.textContent = fullName;
            if (noEl) noEl.textContent = studentNo;
            if (display) display.style.display = 'block';

            // Update personal info fields
            if (birthdateField) {
                birthdateField.value = birthdate && birthdate !== 'NULL' ? birthdate : 'N/A';
            }
            if (sexField) {
                sexField.value = sex && sex !== 'NULL' ? sex : 'N/A';
            }
            if (addressField) {
                var fullAddress = [address, barangay, city, province, region]
                    .filter(function(part) {
                        return part && part.trim() !== '' && part !== 'NULL';
                    })
                    .join(', ');
                addressField.value = fullAddress || 'No address on file';
            }

            console.log('Student selected:', fullName, 'Birthdate:', birthdate, 'Sex:', sex);
        } else {
            // Clear everything if no selection
            if (display) display.style.display = 'none';
            if (birthdateField) birthdateField.value = '';
            if (sexField) sexField.value = '';
            if (addressField) addressField.value = '';
        }
    }
</script>