document.addEventListener('DOMContentLoaded', function() {
    const elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
});

document.getElementById('addSale').addEventListener('click', function() {
    const clientName = document.getElementById('clientName').value;
    const productName = document.getElementById('productName').value;
    const saleAmount = document.getElementById('saleAmount').value;
    const currency = document.getElementById('currency').value;

    if (clientName && productName && saleAmount && currency) {
        const tableBody = document.querySelector('#salesTable tbody');

        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${clientName}</td>
            <td>${productName}</td>
            <td>${saleAmount}</td>
            <td>${currency}</td>
        `;

        tableBody.appendChild(newRow);

        // Clear input fields
        document.getElementById('clientName').value = '';
        document.getElementById('productName').value = '';
        document.getElementById('saleAmount').value = '';
        document.getElementById('currency').value = '';

        // Reinitialize select elements
        M.FormSelect.init(document.querySelectorAll('select'));
    }
});
