document.addEventListener('DOMContentLoaded', () => {
    ...existing code...

    function addReceipt(receipt) {
        receipts.push(receipt);
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="receipt-info">
                <span>${receipt.date}</span>
                <span>${receipt.description}</span>
                <span>PKR ${receipt.amount.toFixed(2)}</span>
            </div>
            <img src="${receipt.imageUrl}" alt="Receipt" height="50">
            <button onclick="this.parentElement.remove(); updateTotal();">Delete</button>
        `;
        receiptList.appendChild(li);
    }

    function updateTotal() {
        const total = receipts.reduce((sum, receipt) => sum + receipt.amount, 0);
        totalAmount.textContent = `Total: PKR ${total.toFixed(2)}`;
    }

    function convertToCSV(receipts) {
        const headers = ['Date', 'Description', 'Amount (PKR)', 'Image'];
        const rows = receipts.map(r => [
            r.date,
            r.description,
            r.amount.toFixed(2),
            'Receipt Image'
        ]);
        return [headers, ...rows]
            .map(row => row.join(','))
            .join('\n');
    }

    exportButton.addEventListener('click', () => {
        const month = new Date().toLocaleString('default', { month: 'long' });
        const csvContent = convertToCSV(receipts);
        
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `receipts-${month.toLowerCase()}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
});