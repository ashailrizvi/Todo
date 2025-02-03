document.addEventListener('DOMContentLoaded', () => {
    const receiptForm = document.getElementById('receiptForm');
    const receiptList = document.getElementById('receiptList');
    const totalAmount = document.getElementById('totalAmount');
    const exportButton = document.getElementById('exportButton');
    let receipts = [];

    receiptForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const date = document.getElementById('receiptDate').value;
        const description = document.getElementById('receiptDescription').value;
        const amount = parseFloat(document.getElementById('receiptAmount').value);
        const imageFile = document.getElementById('receiptImage').files[0];

        if (date && description && amount && imageFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                addReceipt({
                    date,
                    description,
                    amount,
                    imageUrl: e.target.result
                });
                receiptForm.reset();
                updateTotal();
            };
            reader.readAsDataURL(imageFile);
        }
    });

    function addReceipt(receipt) {
        receipts.push(receipt);
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="receipt-info">
                <span>${receipt.date}</span>
                <span>${receipt.description}</span>
                <span>$${receipt.amount.toFixed(2)}</span>
            </div>
            <img src="${receipt.imageUrl}" alt="Receipt" height="50">
            <button onclick="this.parentElement.remove(); updateTotal();">Delete</button>
        `;
        receiptList.appendChild(li);
    }

    function updateTotal() {
        const total = receipts.reduce((sum, receipt) => sum + receipt.amount, 0);
        totalAmount.textContent = `Total: $${total.toFixed(2)}`;
    }

    exportButton.addEventListener('click', () => {
        const month = new Date().toLocaleString('default', { month: 'long' });
        const report = {
            month,
            receipts,
            total: receipts.reduce((sum, receipt) => sum + receipt.amount, 0)
        };
        
        // Create and download report file
        const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `receipts-${month.toLowerCase()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
});