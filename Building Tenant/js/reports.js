// ==========================================
// Reports Module - JavaScript
// ==========================================

// Local Storage Data

const buildingList =
    JSON.parse(localStorage.getItem("buildings")) || [];

const flatList =
    JSON.parse(localStorage.getItem("flatList")) || [];

const tenantList =
    JSON.parse(localStorage.getItem("tenantList")) || [];

const contractList =
    JSON.parse(localStorage.getItem("contractList")) || [];

const invoiceList =
    JSON.parse(localStorage.getItem("invoiceList")) || [];

const paymentList =
    JSON.parse(localStorage.getItem("paymentList")) || [];

// ==========================================
// Page Load
// ==========================================


function loadBuildingFilter() {

    const buildingList =
        JSON.parse(localStorage.getItem("buildings")) || [];

    const buildingFilter =
        document.getElementById("buildingFilter");

    buildingFilter.innerHTML =
        '<option value="">All Buildings</option>';

    buildingList.forEach(building => {

        buildingFilter.innerHTML += `
            <option value="${building.name}">
                ${building.name}
            </option>
        `;

    });

}
window.onload = function () {

    console.log(buildingList);
console.log(localStorage.getItem("buildings"));
    loadDashboardCards();

    loadBuildingFilter();

    displayReports(paymentList);

};

// ==========================================
// Dashboard Cards
// ==========================================

function loadDashboardCards() {

    // Total Buildings

    document.getElementById("totalBuildings").textContent =
        buildingList.length;

    // Total Flats

    document.getElementById("totalFlats").textContent =
        flatList.length;

    // Total Tenants

    document.getElementById("totalTenants").textContent =
        tenantList.length;

    // Active Contracts

    const activeContracts = contractList.filter(contract =>
        contract.contractStatus === "Active"
    ).length;

    document.getElementById("activeContracts").textContent =
        activeContracts;

    // Total Invoices

    document.getElementById("totalInvoices").textContent =
        invoiceList.length;

    // Total Payments

    document.getElementById("totalPayments").textContent =
        paymentList.length;

    // Total Revenue

    let revenue = 0;

    paymentList.forEach(payment => {

        revenue += Number(payment.paidAmount) || 0;

    });

    document.getElementById("totalRevenue").textContent =
        "₹ " + revenue.toLocaleString();

    // Pending Payments

    const pending = paymentList.filter(payment =>
        payment.paymentStatus !== "Paid"
    ).length;

    document.getElementById("pendingPayments").textContent =
        pending;

}

// ==========================================
// Load Building Filter
// ==========================================



// ==========================================
// Display Report Table
// ==========================================

function displayReports(reportList) {

    const reportTableBody =
        document.getElementById("reportTableBody");

    reportTableBody.innerHTML = "";

    if (reportList.length === 0) {

        reportTableBody.innerHTML = `

            <tr>

                <td colspan="9"
                    class="text-center text-muted">

                    No Records Found

                </td>

            </tr>

        `;

        return;

    }

    reportList.forEach((payment, index) => {

        let badge = "";

        if (payment.paymentStatus === "Paid") {

            badge = "bg-success";

        }

        else if (payment.paymentStatus === "Partial") {

            badge = "bg-warning text-dark";

        }

        else {

            badge = "bg-danger";

        }

        reportTableBody.innerHTML += `

            <tr>

                <td>${index + 1}</td>

                <td>${payment.invoiceNumber}</td>

                <td>${payment.tenantName}</td>

                <td>${payment.buildingName}</td>

                <td>${payment.flatNumber}</td>

                <td>₹ ${payment.invoiceAmount}</td>

                <td>₹ ${payment.paidAmount}</td>

                <td>₹ ${payment.balanceAmount}</td>

                <td>

                    <span class="badge ${badge}">

                        ${payment.paymentStatus}

                    </span>

                </td>

            </tr>

        `;

    });

}
// ==========================================
// Search Report
// ==========================================

document.getElementById("searchReport").addEventListener("keyup", filterReports);

document.getElementById("buildingFilter").addEventListener("change", filterReports);

document.getElementById("monthFilter").addEventListener("change", filterReports);

document.getElementById("statusFilter").addEventListener("change", filterReports);

document.getElementById("filterBtn").addEventListener("click", filterReports);

// ==========================================
// Filter Reports
// ==========================================

function filterReports() {

    const searchText =
        document.getElementById("searchReport").value.toLowerCase();

    const building =
        document.getElementById("buildingFilter").value;

    const month =
        document.getElementById("monthFilter").value;

    const status =
        document.getElementById("statusFilter").value;

    const filteredList = paymentList.filter(payment => {

        const matchSearch =

            payment.invoiceNumber.toLowerCase().includes(searchText) ||

            payment.tenantName.toLowerCase().includes(searchText) ||

            payment.buildingName.toLowerCase().includes(searchText);

        const matchBuilding =

            building === "" ||

            payment.buildingName === building;

        const matchMonth =

            month === "" ||

            (payment.paymentDate &&
             payment.paymentDate.startsWith(month));

        const matchStatus =

            status === "" ||

            payment.paymentStatus === status;

        return (

            matchSearch &&

            matchBuilding &&

            matchMonth &&

            matchStatus

        );

    });

    displayReports(filteredList);

}

// ==========================================
// Reset Filters
// ==========================================

document.getElementById("resetFilter").addEventListener("click", function () {

    document.getElementById("searchReport").value = "";

    document.getElementById("buildingFilter").value = "";

    document.getElementById("monthFilter").value = "";

    document.getElementById("statusFilter").value = "";

    displayReports(paymentList);

});
// ==========================================
// Print Report
// ==========================================

document.getElementById("printReport")
.addEventListener("click", function () {

    window.print();

});

// ==========================================
// Export PDF (Phase 3)
// ==========================================

document.getElementById("pdfReport")
.addEventListener("click", function () {

    alert("PDF Export Feature will be added in Phase 3.");

});

// ==========================================
// Export Excel (Phase 3)
// ==========================================

document.getElementById("excelReport")
.addEventListener("click", function () {

    alert("Excel Export Feature will be added in Phase 3.");

});

// ==========================================
// Refresh Dashboard
// ==========================================

function refreshDashboard() {

    loadDashboardCards();

    displayReports(paymentList);

}

// ==========================================
// Auto Refresh on Storage Change
// ==========================================

window.addEventListener("storage", function () {

    refreshDashboard();

});

// ==========================================
// Initial Load
// ==========================================

refreshDashboard();

console.log("Reports Module Loaded Successfully...");