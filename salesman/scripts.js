document.addEventListener('DOMContentLoaded', function() {
    // Initialize Materialize components
    const elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);

    const modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    // Event listener for opening modal from initial view button
    document.getElementById('openModal').addEventListener('click', function() {
        openModal();
    });

    // Event listener for opening modal from table section button
    document.getElementById('openModalFromTable').addEventListener('click', function() {
        openModal();
    });

    // Event listener for adding sale
    document.getElementById('addSale').addEventListener('click', function() {
        const clientName = document.getElementById('modalClientName').value;
        const productName = document.getElementById('modalProductName').value;
        const saleAmount = document.getElementById('modalSaleAmount').value;
        const currencySelect = document.getElementById('modalCurrency');
        const currency = currencySelect.value || currencySelect.options[currencySelect.selectedIndex].text;

        if (clientName && productName && saleAmount && currency) {
            addSaleToTable(clientName, productName, saleAmount, currency);

            // Clear input fields
            document.getElementById('modalClientName').value = '';
            document.getElementById('modalProductName').value = '';
            document.getElementById('modalSaleAmount').value = '';
            currencySelect.selectedIndex = 0; // Reset to the default placeholder option

            // Close the modal
            const modal = M.Modal.getInstance(document.getElementById('modal1'));
            modal.close();
        } else {
            // Alert if any field is missing
            alert('Please fill in all fields.');
        }
    });

    // Event listener for submit sales button
    document.getElementById('submitSales').addEventListener('click', function() {
        const rows = document.querySelectorAll('#salesTable tbody tr').length;
        if (rows > 0) {
            // Handle the submission logic here
            alert('Sale submitted.');

            // Reset to initial state
            resetPage();
        }
    });

    // Event listener for submit all button
    document.getElementById('submitAll').addEventListener('click', function() {
        const rows = document.querySelectorAll('#salesTable tbody tr').length;
        if (rows > 0) {
            // Handle the submission logic here
            alert('All sales submitted.');

            // Reset to initial state
            resetPage();
        }
    });
});

// Function to open the modal and reset its content
function openModal() {
    const modal = M.Modal.getInstance(document.getElementById('modal1'));
    const currencySelect = document.getElementById('modalCurrency');

    // Reset form fields
    document.getElementById('modalClientName').value = '';
    document.getElementById('modalProductName').value = '';
    document.getElementById('modalSaleAmount').value = '';
    currencySelect.selectedIndex = 0; // Reset to the default placeholder option

    // Reinitialize Materialize select
    M.FormSelect.init(currencySelect);

    // Open the modal
    modal.open();
}

// Function to handle adding a sale
function addSaleToTable(clientName, productName, saleAmount, currency) {
    const tableBody = document.querySelector('#salesTable tbody');

    // Create a new table row
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${clientName}</td>
        <td>${productName}</td>
        <td>${saleAmount}</td>
        <td>${currency}</td>
    `;

    // Append the new row to the table body
    tableBody.appendChild(newRow);

    // Show the table section if it's hidden
    document.getElementById('tableSection').style.display = 'block';

    // Hide the initial view section
    document.getElementById('initialView').style.display = 'none';

    // Update submit button text
    updateSubmitButton();
}

// Function to update the submit button text based on the number of sales
function updateSubmitButton() {
    const tableBody = document.querySelector('#salesTable tbody');
    const rows = tableBody.querySelectorAll('tr').length;

    if (rows === 1) {
        document.getElementById('submitSales').style.display = 'inline';
        document.getElementById('submitAll').style.display = 'none';
    } else if (rows > 1) {
        document.getElementById('submitSales').style.display = 'none';
        document.getElementById('submitAll').style.display = 'inline';
    } else {
        document.getElementById('submitSales').style.display = 'none';
        document.getElementById('submitAll').style.display = 'none';
    }
}

// Function to reset the page to the initial view
function resetPage() {
    document.getElementById('tableSection').style.display = 'none';
    document.getElementById('initialView').style.display = 'flex';
    document.querySelector('#salesTable tbody').innerHTML = ''; // Clear table rows
    updateSubmitButton(); // Ensure buttons are updated
}
