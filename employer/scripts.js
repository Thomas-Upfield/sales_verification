document.addEventListener('DOMContentLoaded', function() {
    // Initialize Materialize components
    const elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);

    // Fetch and display the sales data
    fetchSalesData();

    // Add event listeners for filters
    document.getElementById('statusFilter').addEventListener('change', filterTable);
    document.getElementById('salesmanFilter').addEventListener('input', filterTable);

    // Add event listener for the validate button
    document.getElementById('validateButton').addEventListener('click', validateSelectedRows);

    // Add event listeners for filter icons
    document.querySelectorAll('.filter-icon').forEach(icon => {
        icon.addEventListener('click', toggleFilterContainer);
    });

    // Close filter containers when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.classList.contains('filter-icon') && !event.target.closest('.filter-container')) {
            document.querySelectorAll('.filter-container').forEach(container => {
                container.style.display = 'none';
            });
        }
    });
});

function fetchSalesData() {
    fetch('hackathon_sales.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            displaySalesData(data);
        })
        .catch(error => {
            console.error('Error fetching the JSON file:', error);
            displayErrorMessage('Error fetching the JSON file. Please make sure the file exists and is accessible.');
        });
}

function displaySalesData(data) {
    const tableBody = document.querySelector('#salesTable tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    data.forEach((row, index) => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${row['Client Name']}</td>
            <td>${row['Product Name']}</td>
            <td>${row['Sale Amount']}</td>
            <td>${row['Currency']}</td>
            <td>${row['Salesman']}</td>
            <td>${row['Status']}</td>
        `;
        newRow.dataset.index = index; // Add an index attribute for identification
        newRow.addEventListener('click', () => {
            newRow.classList.toggle('selected');
        });
        tableBody.appendChild(newRow);
    });
}

function filterTable() {
    const statusFilter = document.getElementById('statusFilter').value.toUpperCase();
    const salesmanFilter = document.getElementById('salesmanFilter').value.toUpperCase();
    const tableRows = document.querySelectorAll('#salesTable tbody tr');

    tableRows.forEach(row => {
        const status = row.cells[5].innerText.toUpperCase();
        const salesman = row.cells[4].innerText.toUpperCase();
        const statusMatch = !statusFilter || status === statusFilter;
        const salesmanMatch = !salesmanFilter || salesman.includes(salesmanFilter);

        if (statusMatch && salesmanMatch) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function validateSelectedRows() {
    const selectedRows = document.querySelectorAll('#salesTable tbody tr.selected');

    selectedRows.forEach(row => {
        row.cells[5].innerText = 'VERIFIED'; // Change status to VERIFIED
        row.classList.remove('selected'); // Deselect the row
    });
}

function displayErrorMessage(message) {
    const container = document.querySelector('.container');
    const errorMessage = document.createElement('p');
    errorMessage.textContent = message;
    errorMessage.style.color = 'red';
    container.insertBefore(errorMessage, container.firstChild);
}

function toggleFilterContainer(event) {
    const targetId = event.target.getAttribute('data-target');
    const filterContainer = document.getElementById(targetId + 'Container');
    const isVisible = filterContainer.style.display === 'block';

    // Hide all filter containers
    document.querySelectorAll('.filter-container').forEach(container => {
        container.style.display = 'none';
    });

    // Toggle the target filter container
    if (!isVisible) {
        filterContainer.style.display = 'block';
    }
}
