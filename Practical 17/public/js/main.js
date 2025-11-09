const API_URL = '/api/students';
let students = [];
let editingId = null;

// DOM Elements
const studentForm = document.getElementById('studentForm');
const editForm = document.getElementById('editForm');
const studentsTableBody = document.getElementById('studentsTableBody');
const searchInput = document.getElementById('searchInput');
const studentCount = document.getElementById('studentCount');
const toast = document.getElementById('toast');
const modal = document.getElementById('editModal');
const closeModal = document.querySelector('.close');
const cancelEdit = document.getElementById('cancelEdit');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadStudents();
    setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
    studentForm.addEventListener('submit', handleAddStudent);
    editForm.addEventListener('submit', handleEditStudent);
    searchInput.addEventListener('input', handleSearch);
    closeModal.addEventListener('click', () => modal.classList.remove('show'));
    cancelEdit.addEventListener('click', resetForm);
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });
}

// Load all students
async function loadStudents() {
    try {
        showLoading();
        const response = await fetch(API_URL);
        const data = await response.json();
        
        if (data.success) {
            students = data.data;
            renderStudents(students);
            updateStudentCount(students.length);
        } else {
            showToast('Failed to load students', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Error loading students', 'error');
        studentsTableBody.innerHTML = '<tr><td colspan="8" class="no-data">Error loading students. Please refresh the page.</td></tr>';
    }
}

// Add new student
async function handleAddStudent(e) {
    e.preventDefault();
    
    const formData = new FormData(studentForm);
    const studentData = Object.fromEntries(formData);
    
    // Convert numeric fields
    studentData.feesPaid = Number(studentData.feesPaid) || 0;
    studentData.feesTotal = Number(studentData.feesTotal);
    
    // Validate fees paid vs total fees
    if (studentData.feesPaid > studentData.feesTotal) {
        showToast('Fees paid cannot be more than total fees!', 'error');
        return;
    }
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(studentData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            showToast('Student added successfully!', 'success');
            studentForm.reset();
            loadStudents();
        } else {
            showToast(data.message || 'Failed to add student', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Error adding student', 'error');
    }
}

// Edit student
function openEditModal(id) {
    const student = students.find(s => s._id === id);
    if (!student) return;
    
    document.getElementById('editId').value = student._id;
    document.getElementById('editName').value = student.name;
    document.getElementById('editEmail').value = student.email;
    document.getElementById('editPhone').value = student.phone;
    document.getElementById('editStandard').value = student.standard;
    document.getElementById('editSubject').value = student.subject;
    document.getElementById('editFeesTotal').value = student.feesTotal;
    document.getElementById('editFeesPaid').value = student.feesPaid;
    document.getElementById('editStatus').value = student.status;
    document.getElementById('editRemarks').value = student.remarks || '';
    
    modal.classList.add('show');
}

// Handle edit form submission
async function handleEditStudent(e) {
    e.preventDefault();
    
    const id = document.getElementById('editId').value;
    const formData = new FormData(editForm);
    const studentData = {
        name: formData.get('editName') || document.getElementById('editName').value,
        email: formData.get('editEmail') || document.getElementById('editEmail').value,
        phone: formData.get('editPhone') || document.getElementById('editPhone').value,
        standard: formData.get('editStandard') || document.getElementById('editStandard').value,
        subject: formData.get('editSubject') || document.getElementById('editSubject').value,
        feesTotal: Number(document.getElementById('editFeesTotal').value),
        feesPaid: Number(document.getElementById('editFeesPaid').value),
        status: document.getElementById('editStatus').value,
        remarks: document.getElementById('editRemarks').value
    };
    
    // Validate fees paid vs total fees
    if (studentData.feesPaid > studentData.feesTotal) {
        showToast('Fees paid cannot be more than total fees!', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(studentData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            showToast('Student updated successfully!', 'success');
            modal.classList.remove('show');
            loadStudents();
        } else {
            showToast(data.message || 'Failed to update student', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Error updating student', 'error');
    }
}

// Delete student
async function deleteStudent(id) {
    if (!confirm('Are you sure you want to delete this student?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        
        const data = await response.json();
        
        if (data.success) {
            showToast('Student deleted successfully!', 'success');
            loadStudents();
        } else {
            showToast(data.message || 'Failed to delete student', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Error deleting student', 'error');
    }
}

// Search functionality
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredStudents = students.filter(student => 
        student.name.toLowerCase().includes(searchTerm) ||
        student.email.toLowerCase().includes(searchTerm) ||
        student.subject.toLowerCase().includes(searchTerm) ||
        student.standard.toLowerCase().includes(searchTerm)
    );
    
    renderStudents(filteredStudents);
    updateStudentCount(filteredStudents.length);
}

// Render students table
function renderStudents(studentsData) {
    if (studentsData.length === 0) {
        studentsTableBody.innerHTML = '<tr><td colspan="8" class="no-data">No students found</td></tr>';
        return;
    }
    
    studentsTableBody.innerHTML = studentsData.map(student => {
        const balance = student.feesTotal - student.feesPaid;
        return `
            <tr>
                <td><strong>${student.name}</strong></td>
                <td>${student.email}</td>
                <td>${student.phone}</td>
                <td>${student.standard}</td>
                <td>${student.subject}</td>
                <td>
                    <div class="fees-info">
                        <div>Total: ₹${student.feesTotal}</div>
                        <div class="fees-paid">Paid: ₹${student.feesPaid}</div>
                        <div class="${balance > 0 ? 'fees-pending' : 'fees-paid'}">
                            ${balance > 0 ? 'Pending: ₹' + balance : 'Fully Paid ✓'}
                        </div>
                    </div>
                </td>
                <td>
                    <span class="status-badge ${student.status === 'Active' ? 'status-active' : 'status-inactive'}">
                        ${student.status}
                    </span>
                </td>
                <td>
                    <button class="action-btn btn-edit" onclick="openEditModal('${student._id}')">
                        ✏️ Edit
                    </button>
                    <button class="action-btn btn-delete" onclick="deleteStudent('${student._id}')">
                        🗑️ Delete
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

// Helper functions
function showLoading() {
    studentsTableBody.innerHTML = '<tr><td colspan="8" class="no-data"><div class="spinner"></div></td></tr>';
}

function updateStudentCount(count) {
    studentCount.textContent = `${count} Student${count !== 1 ? 's' : ''}`;
}

function showToast(message, type = 'info') {
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function resetForm() {
    editingId = null;
    studentForm.reset();
    cancelEdit.style.display = 'none';
    document.querySelector('#studentForm button[type="submit"]').textContent = 'Add Student';
}