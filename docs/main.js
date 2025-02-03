document.addEventListener('DOMContentLoaded', () => {
    const receiptForm = document.getElementById('receiptForm');
    const receiptList = document.getElementById('receiptList');
    const totalAmount = document.getElementById('totalAmount');
    let receipts = [];

    receiptForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const date = document.getElementById('receiptDate').value;
        const description = document.getElementById('receiptDescription').value;
        const amount = parseFloat(document.getElementById('receiptAmount').value);
        const imageFile = document.getElementById('receiptImage').files[0];

        if (date && description && amount) {
            const receipt = { date, description, amount };
            receipts.push(receipt);
            displayReceipt(receipt);
            updateTotal();
            receiptForm.reset();
        }
    });

    function displayReceipt(receipt) {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="receipt-info">
                <span>${receipt.date}</span>
                <span>${receipt.description}</span>
                <span>PKR ${receipt.amount.toFixed(2)}</span>
                <button onclick="this.parentElement.parentElement.remove(); updateTotal();">Delete</button>
            </div>
        `;
        receiptList.appendChild(li);
    }

    function updateTotal() {
        const total = receipts.reduce((sum, receipt) => sum + receipt.amount, 0);
        totalAmount.textContent = `Total: PKR ${total.toFixed(2)}`;
    }
});