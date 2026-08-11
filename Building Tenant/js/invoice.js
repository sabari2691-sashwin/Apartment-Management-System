// ==========================================
// Invoice Master - JavaScript
// ==========================================

let invoiceList = JSON.parse(localStorage.getItem("invoiceList")) || [];
let tenantList = JSON.parse(localStorage.getItem("tenantList")) || [];

let editIndex = -1;

const invoiceForm = document.getElementById("invoiceForm");
const invoiceTableBody = document.getElementById("invoiceTableBody");
const searchInvoice = document.getElementById("searchInvoice");

// ==========================================
// Page Load
// ==========================================

window.onload = function () {

    loadTenants();

    generateInvoiceNumber();

    displayInvoices();

    calculateTotal();

};

// ==========================================
// Generate Invoice Number
// ==========================================

function generateInvoiceNumber() {

    const invoiceNo = "INV-" +
        String(invoiceList.length + 1).padStart(4, "0");

    document.getElementById("invoiceNumber").value = invoiceNo;

}

// ==========================================
// Load Tenant Dropdown
// ==========================================

function loadTenants() {

    const tenantSelect = document.getElementById("tenantName");

    tenantSelect.innerHTML =
        '<option value="">Select Tenant</option>';

    tenantList.forEach((tenant) => {

        tenantSelect.innerHTML += `

            <option value="${tenant.tenantName}">

                ${tenant.tenantName}

            </option>

        `;

    });

}

// ==========================================
// Auto Fill Tenant Details
// ==========================================

document.getElementById("tenantName").addEventListener("change", function () {

    const tenant = tenantList.find(

        item => item.tenantName === this.value

    );

    if (!tenant) return;

    document.getElementById("buildingName").value =
        tenant.buildingName;

    document.getElementById("flatNumber").value =
        tenant.flatNumber;

    document.getElementById("monthlyRent").value =
        tenant.monthlyRent;

    calculateTotal();

});

// ==========================================
// Auto Calculate Total Amount
// ==========================================

const amountFields = [

    "monthlyRent",

    "maintenance",

    "electricity",

    "water",

    "otherCharges",

    "discount"

];

amountFields.forEach(id => {

    document.getElementById(id).addEventListener("input", calculateTotal);

});

function calculateTotal() {

    const rent =
        Number(document.getElementById("monthlyRent").value) || 0;

    const maintenance =
        Number(document.getElementById("maintenance").value) || 0;

    const electricity =
        Number(document.getElementById("electricity").value) || 0;

    const water =
        Number(document.getElementById("water").value) || 0;

    const other =
        Number(document.getElementById("otherCharges").value) || 0;

    const discount =
        Number(document.getElementById("discount").value) || 0;

    const total =
        rent + maintenance + electricity + water + other - discount;

    document.getElementById("totalAmount").value = total;

}

// ==========================================
// Save / Update Invoice
// ==========================================

invoiceForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const invoice = {

        invoiceNumber:
            document.getElementById("invoiceNumber").value,

        tenantName:
            document.getElementById("tenantName").value,

        buildingName:
            document.getElementById("buildingName").value,

        flatNumber:
            document.getElementById("flatNumber").value,

        invoiceMonth:
            document.getElementById("invoiceMonth").value,

        monthlyRent:
            document.getElementById("monthlyRent").value,

        maintenance:
            document.getElementById("maintenance").value,

        electricity:
            document.getElementById("electricity").value,

        water:
            document.getElementById("water").value,

        otherCharges:
            document.getElementById("otherCharges").value,

        discount:
            document.getElementById("discount").value,

        totalAmount:
            document.getElementById("totalAmount").value,

        dueDate:
            document.getElementById("dueDate").value,

        paymentStatus:
            document.getElementById("paymentStatus").value,

        remarks:
            document.getElementById("remarks").value

    };

    if (
        invoice.tenantName === "" ||
        invoice.invoiceMonth === ""
    ) {

        alert("Please fill all required fields.");

        return;

    }

    if (editIndex === -1) {

        invoiceList.push(invoice);

        alert("Invoice Saved Successfully.");

    } else {

        invoiceList[editIndex] = invoice;

        alert("Invoice Updated Successfully.");

        editIndex = -1;

    }

    localStorage.setItem(
        "invoiceList",
        JSON.stringify(invoiceList)
    );

    invoiceForm.reset();

    generateInvoiceNumber();

    calculateTotal();

    displayInvoices();

});
// ==========================================
// Display Invoices
// ==========================================

function displayInvoices(filteredList = invoiceList) {

    invoiceTableBody.innerHTML = "";

    if (filteredList.length === 0) {

        invoiceTableBody.innerHTML = `

            <tr>

                <td colspan="9" class="text-center text-muted">

                    No Invoice Records Found

                </td>

            </tr>

        `;

        return;

    }

    filteredList.forEach((invoice, index) => {

        let badgeClass = "";

        if (invoice.paymentStatus === "Paid") {

            badgeClass = "bg-success";

        } else if (invoice.paymentStatus === "Pending") {

            badgeClass = "bg-warning text-dark";

        } else {

            badgeClass = "bg-danger";

        }

        invoiceTableBody.innerHTML += `

            <tr>

                <td>${index + 1}</td>

                <td>${invoice.invoiceNumber}</td>

                <td>${invoice.tenantName}</td>

                <td>${invoice.buildingName}</td>

                <td>${invoice.flatNumber}</td>

                <td>${invoice.invoiceMonth}</td>

                <td>₹ ${invoice.totalAmount}</td>

                <td>

                    <span class="badge ${badgeClass}">

                        ${invoice.paymentStatus}

                    </span>

                </td>

                <td>

                    <button
                        class="btn btn-sm btn-primary me-2"
                        onclick="editInvoice(${index})">

                        <i class="fa-solid fa-pen"></i>

                    </button>

                    <button
                        class="btn btn-sm btn-danger"
                        onclick="deleteInvoice(${index})">

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </td>

            </tr>

        `;

    });

}

// ==========================================
// Edit Invoice
// ==========================================

function editInvoice(index) {

    const invoice = invoiceList[index];

    document.getElementById("invoiceNumber").value =
        invoice.invoiceNumber;

    document.getElementById("tenantName").value =
        invoice.tenantName;

    document.getElementById("buildingName").value =
        invoice.buildingName;

    document.getElementById("flatNumber").value =
        invoice.flatNumber;

    document.getElementById("invoiceMonth").value =
        invoice.invoiceMonth;

    document.getElementById("monthlyRent").value =
        invoice.monthlyRent;

    document.getElementById("maintenance").value =
        invoice.maintenance;

    document.getElementById("electricity").value =
        invoice.electricity;

    document.getElementById("water").value =
        invoice.water;

    document.getElementById("otherCharges").value =
        invoice.otherCharges;

    document.getElementById("discount").value =
        invoice.discount;

    document.getElementById("totalAmount").value =
        invoice.totalAmount;

    document.getElementById("dueDate").value =
        invoice.dueDate;

    document.getElementById("paymentStatus").value =
        invoice.paymentStatus;

    document.getElementById("remarks").value =
        invoice.remarks;

    editIndex = index;

    calculateTotal();

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}
// ==========================================
// Delete Invoice
// ==========================================

function deleteInvoice(index) {

    if (confirm("Are you sure you want to delete this invoice?")) {

        invoiceList.splice(index, 1);

        localStorage.setItem(
            "invoiceList",
            JSON.stringify(invoiceList)
        );

        generateInvoiceNumber();

        displayInvoices();

        alert("Invoice deleted successfully.");

    }

}

// ==========================================
// Search Invoice
// ==========================================

searchInvoice.addEventListener("keyup", function () {

    const keyword = this.value.toLowerCase();

    const filteredList = invoiceList.filter(invoice =>

        invoice.invoiceNumber.toLowerCase().includes(keyword) ||

        invoice.tenantName.toLowerCase().includes(keyword) ||

        invoice.buildingName.toLowerCase().includes(keyword) ||

        invoice.flatNumber.toLowerCase().includes(keyword) ||

        invoice.paymentStatus.toLowerCase().includes(keyword)

    );

    displayInvoices(filteredList);

});

// ==========================================
// Reset Form
// ==========================================

invoiceForm.addEventListener("reset", function () {

    editIndex = -1;

    generateInvoiceNumber();

    calculateTotal();

});

// ==========================================
// Refresh Table
// ==========================================

function refreshTable() {

    displayInvoices();

}

// ==========================================
// Initial Load
// ==========================================

displayInvoices();

console.log("Invoice Module Loaded Successfully...");