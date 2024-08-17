document.addEventListener('DOMContentLoaded', () => {
    const studentForm = document.getElementById('student-form');
    const studentTable = document.getElementById('student-table').getElementsByTagName('tbody')[0];
    let students = JSON.parse(localStorage.getItem('students')) || [];

    const renderTable = () => {
        studentTable.innerHTML = '';
        students.forEach((student, index) => {
            const row = studentTable.insertRow();
            row.insertCell(0).innerText = student.name;
            row.insertCell(1).innerText = student.id;
            row.insertCell(2).innerText = student.email;
            row.insertCell(3).innerText = student.contact;
            const actionsCell = row.insertCell(4);
            actionsCell.innerHTML = `
                <button class="edit-btn" data-index="${index}">Edit</button>
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;
        });
    };

    const addStudent = (student) => {
        students.push(student);
        localStorage.setItem('students', JSON.stringify(students));
        renderTable();
    };

    const updateStudent = (index, student) => {
        students[index] = student;
        localStorage.setItem('students', JSON.stringify(students));
        renderTable();
    };

    const deleteStudent = (index) => {
        students.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(students));
        renderTable();
    };

    studentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const student = {
            name: studentForm['student-name'].value.trim(),
            id: studentForm['student-id'].value.trim(),
            email: studentForm['email'].value.trim(),
            contact: studentForm['contact'].value.trim()
        };
        if (student.name && student.id && student.email && student.contact) {
            addStudent(student);
            studentForm.reset();
        }
    });

    studentTable.addEventListener('click', (e) => {
        if (e.target.classList.contains('edit-btn')) {
            const index = e.target.dataset.index;
            const student = students[index];
            studentForm['student-name'].value = student.name;
            studentForm['student-id'].value = student.id;
            studentForm['email'].value = student.email;
            studentForm['contact'].value = student.contact;
            studentForm.onsubmit = (e) => {
                e.preventDefault();
                updateStudent(index, {
                    name: studentForm['student-name'].value.trim(),
                    id: studentForm['student-id'].value.trim(),
                    email: studentForm['email'].value.trim(),
                    contact: studentForm['contact'].value.trim()
                });
                studentForm.reset();
                studentForm.onsubmit = addStudent;
            };
        } else if (e.target.classList.contains('delete-btn')) {
            const index = e.target.dataset.index;
            deleteStudent(index);
        }
    });

    renderTable();
});
// document.addEventListener("DOMContentLoaded", function() {
//     const tableContainer = document.querySelector(".table-container");
//     const table = document.querySelector("#studentTable");

//     // Set the table container height
//     tableContainer.style.height = "400px";

//     // Ensure the table inside the container scrolls
//     tableContainer.style.overflowY = "scroll";

//     // Adjust the table to ensure it fits within the container
//     table.style.display = "block";
//     table.style.overflow = "auto";
//     table.style.width = "100%";
// });


// document.addEventListener('DOMContentLoaded', function() {
//     const container = document.querySelector('.table-container');
//     const content = container.querySelector('table');
//     console.log('Container Height:', container.clientHeight);
//     console.log('Content Height:', content.scrollHeight);
// });








