// ==========================================
// Payment Master - JavaScript
// ==========================================

let paymentList = JSON.parse(localStorage.getItem("paymentList")) || [];
let invoiceList = JSON.parse(localStorage.getItem("invoiceList")) || [];

let editIndex = -1;

const paymentForm = document.getElementById("paymentForm");
const paymentTableBody = document.getElementById("paymentTableBody");
const searchPayment = document.getElementById("searchPayment");

// ==========================================
// Page Load
// ==========================================

window.onload = function () {

    loadInvoices();

    generatePaymentNumber();

    displayPayments();

};

// ==========================================
// Generate Payment Number
// ==========================================

function generatePaymentNumber() {

    const paymentNo = "PAY-" +
        String(paymentList.length + 1).padStart(4, "0");

    document.getElementById("paymentNumber").value = paymentNo;

}

// ==========================================
// Load Invoice Dropdown
// ==========================================

function loadInvoices() {

    const invoiceSelect = document.getElementById("invoiceNumber");

    invoiceSelect.innerHTML =
        '<option value="">Select Invoice</option>';

    invoiceList.forEach(invoice => {

        invoiceSelect.innerHTML += `

            <option value="${invoice.invoiceNumber}">

                ${invoice.invoiceNumber}

            </option>

        `;

    });

}

// ==========================================
// Auto Fill Invoice Details
// ==========================================

document.getElementById("invoiceNumber").addEventListener("change", function () {

    const invoice = invoiceList.find(item =>
        item.invoiceNumber === this.value
    );

    if (!invoice) return;

    document.getElementById("tenantName").value =
        invoice.tenantName;

    document.getElementById("buildingName").value =
        invoice.buildingName;

    document.getElementById("flatNumber").value =
        invoice.flatNumber;

    document.getElementById("invoiceAmount").value =
        invoice.totalAmount;

    calculateBalance();

});

// ==========================================
// Balance Calculation
// ==========================================

document.getElementById("paidAmount")
.addEventListener("input", calculateBalance);

function calculateBalance() {

    const invoiceAmount =
        Number(document.getElementById("invoiceAmount").value) || 0;

    const paidAmount =
        Number(document.getElementById("paidAmount").value) || 0;

    const balance =
        invoiceAmount - paidAmount;

    document.getElementById("balanceAmount").value = balance;

}

// ==========================================
// Save / Update Payment
// ==========================================

paymentForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const payment = {

        paymentNumber:
            document.getElementById("paymentNumber").value,

        invoiceNumber:
            document.getElementById("invoiceNumber").value,

        tenantName:
            document.getElementById("tenantName").value,

        buildingName:
            document.getElementById("buildingName").value,

        flatNumber:
            document.getElementById("flatNumber").value,

        invoiceAmount:
            document.getElementById("invoiceAmount").value,

        paidAmount:
            document.getElementById("paidAmount").value,

        balanceAmount:
            document.getElementById("balanceAmount").value,

        paymentDate:
            document.getElementById("paymentDate").value,

        paymentMode:
            document.getElementById("paymentMode").value,

        transactionId:
            document.getElementById("transactionId").value,

        paymentStatus:
            document.getElementById("paymentStatus").value,

        remarks:
            document.getElementById("remarks").value

    };

    if (
        payment.invoiceNumber === "" ||
        payment.paymentDate === ""
    ) {

        alert("Please fill all required fields.");

        return;

    }

    if (editIndex === -1) {

        paymentList.push(payment);

        alert("Payment Saved Successfully.");

    } else {

        paymentList[editIndex] = payment;

        alert("Payment Updated Successfully.");

        editIndex = -1;

    }

    localStorage.setItem(
        "paymentList",
        JSON.stringify(paymentList)
    );

    paymentForm.reset();

    generatePaymentNumber();

    displayPayments();

});
// ==========================================
// Display Payments
// ==========================================

function displayPayments(filteredList = paymentList) {

    paymentTableBody.innerHTML = "";

    if (filteredList.length === 0) {

        paymentTableBody.innerHTML = `

            <tr>

                <td colspan="9" class="text-center text-muted">

                    No Payment Records Found

                </td>

            </tr>

        `;

        return;

    }

    filteredList.forEach((payment, index) => {

        let badgeClass = "";

        if (payment.paymentStatus === "Paid") {

            badgeClass = "bg-success";

        } else if (payment.paymentStatus === "Partial") {

            badgeClass = "bg-warning text-dark";

        } else {

            badgeClass = "bg-danger";

        }

        paymentTableBody.innerHTML += `

            <tr>

                <td>${index + 1}</td>

                <td>${payment.paymentNumber}</td>

                <td>${payment.invoiceNumber}</td>

                <td>${payment.tenantName}</td>

                <td>₹ ${payment.paidAmount}</td>

                <td>₹ ${payment.balanceAmount}</td>

                <td>${payment.paymentMode}</td>

                <td>

                    <span class="badge ${badgeClass}">

                        ${payment.paymentStatus}

                    </span>

                </td>

                <td>

                    <button
                        class="btn btn-sm btn-primary me-2"
                        onclick="editPayment(${index})">

                        <i class="fa-solid fa-pen"></i>

                    </button>

                    <button
                        class="btn btn-sm btn-danger"
                        onclick="deletePayment(${index})">

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </td>

            </tr>

        `;

    });

}

// ==========================================
// Edit Payment
// ==========================================

function editPayment(index) {

    const payment = paymentList[index];

    document.getElementById("paymentNumber").value =
        payment.paymentNumber;

    document.getElementById("invoiceNumber").value =
        payment.invoiceNumber;

    document.getElementById("tenantName").value =
        payment.tenantName;

    document.getElementById("buildingName").value =
        payment.buildingName;

    document.getElementById("flatNumber").value =
        payment.flatNumber;

    document.getElementById("invoiceAmount").value =
        payment.invoiceAmount;

    document.getElementById("paidAmount").value =
        payment.paidAmount;

    document.getElementById("balanceAmount").value =
        payment.balanceAmount;

    document.getElementById("paymentDate").value =
        payment.paymentDate;

    document.getElementById("paymentMode").value =
        payment.paymentMode;

    document.getElementById("transactionId").value =
        payment.transactionId;

    document.getElementById("paymentStatus").value =
        payment.paymentStatus;

    document.getElementById("remarks").value =
        payment.remarks;

    editIndex = index;

    calculateBalance();

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}
// ==========================================
// Delete Payment
// ==========================================

function deletePayment(index) {

    if (confirm("Are you sure you want to delete this payment?")) {

        paymentList.splice(index, 1);

        localStorage.setItem(
            "paymentList",
            JSON.stringify(paymentList)
        );

        generatePaymentNumber();

        displayPayments();

        alert("Payment deleted successfully.");

    }

}

// ==========================================
// Search Payment
// ==========================================

searchPayment.addEventListener("keyup", function () {

    const keyword = this.value.toLowerCase();

    const filteredList = paymentList.filter(payment =>

        payment.paymentNumber.toLowerCase().includes(keyword) ||

        payment.invoiceNumber.toLowerCase().includes(keyword) ||

        payment.tenantName.toLowerCase().includes(keyword) ||

        payment.paymentMode.toLowerCase().includes(keyword) ||

        payment.paymentStatus.toLowerCase().includes(keyword)

    );

    displayPayments(filteredList);

});

// ==========================================
// Reset Form
// ==========================================

paymentForm.addEventListener("reset", function () {

    editIndex = -1;

    generatePaymentNumber();

    document.getElementById("balanceAmount").value = "";

});

// ==========================================
// Refresh Table
// ==========================================

function refreshTable() {

    displayPayments();

}

// ==========================================
// Initial Load
// ==========================================

displayPayments();

console.log("Payment Module Loaded Successfully...");