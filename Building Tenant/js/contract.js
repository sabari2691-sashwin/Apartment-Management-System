// ==========================================
// Tenant Contract - JavaScript
// ==========================================

let contractList = JSON.parse(localStorage.getItem("contractList")) || [];
let tenantList = JSON.parse(localStorage.getItem("tenantList")) || [];

let editIndex = -1;

const contractForm = document.getElementById("contractForm");
const contractTableBody = document.getElementById("contractTableBody");
const searchContract = document.getElementById("searchContract");

// ==========================================
// Page Load
// ==========================================

window.onload = function () {

    loadTenants();

    generateContractNumber();

    displayContracts();

};

// ==========================================
// Generate Contract Number
// ==========================================

function generateContractNumber() {

    const number = "CNT-" +
        String(contractList.length + 1).padStart(4, "0");

    document.getElementById("contractNumber").value = number;

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

    document.getElementById("advanceAmount").value =
        tenant.advanceAmount;

});

// ==========================================
// Save / Update Contract
// ==========================================

contractForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const contract = {

        contractNumber:
            document.getElementById("contractNumber").value,

        tenantName:
            document.getElementById("tenantName").value,

        buildingName:
            document.getElementById("buildingName").value,

        flatNumber:
            document.getElementById("flatNumber").value,

        agreementDate:
            document.getElementById("agreementDate").value,

        moveInDate:
            document.getElementById("moveInDate").value,

        leaseStartDate:
            document.getElementById("leaseStartDate").value,

        leaseEndDate:
            document.getElementById("leaseEndDate").value,

        monthlyRent:
            document.getElementById("monthlyRent").value,

        advanceAmount:
            document.getElementById("advanceAmount").value,

        maintenance:
            document.getElementById("maintenance").value,

        dueDate:
            document.getElementById("dueDate").value,

        contractStatus:
            document.getElementById("contractStatus").value,

        remarks:
            document.getElementById("remarks").value

    };

    if (

        contract.tenantName === "" ||

        contract.agreementDate === "" ||

        contract.leaseStartDate === "" ||

        contract.leaseEndDate === ""

    ) {

        alert("Please fill all required fields.");

        return;

    }

    if (editIndex === -1) {

        contractList.push(contract);

        alert("Contract Saved Successfully.");

    } else {

        contractList[editIndex] = contract;

        alert("Contract Updated Successfully.");

        editIndex = -1;

    }

    localStorage.setItem(

        "contractList",

        JSON.stringify(contractList)

    );

    contractForm.reset();

    generateContractNumber();

    displayContracts();

});
// ==========================================
// Display Contracts
// ==========================================

function displayContracts(filteredList = contractList) {

    contractTableBody.innerHTML = "";

    if (filteredList.length === 0) {

        contractTableBody.innerHTML = `

            <tr>

                <td colspan="9" class="text-center text-muted">

                    No Contract Records Found

                </td>

            </tr>

        `;

        return;

    }

    filteredList.forEach((contract, index) => {

        contractTableBody.innerHTML += `

            <tr>

                <td>${index + 1}</td>

                <td>${contract.contractNumber}</td>

                <td>${contract.tenantName}</td>

                <td>${contract.buildingName}</td>

                <td>${contract.flatNumber}</td>

                <td>${contract.leaseStartDate}</td>

                <td>${contract.leaseEndDate}</td>

                <td>

                    <span class="badge ${
                        contract.contractStatus === "Active"
                            ? "bg-success"
                            : contract.contractStatus === "Expired"
                            ? "bg-danger"
                            : "bg-warning text-dark"
                    }">

                        ${contract.contractStatus}

                    </span>

                </td>

                <td>

                    <button
                        class="btn btn-sm btn-primary me-2"
                        onclick="editContract(${index})">

                        <i class="fa-solid fa-pen"></i>

                    </button>

                    <button
                        class="btn btn-sm btn-danger"
                        onclick="deleteContract(${index})">

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </td>

            </tr>

        `;

    });

}

// ==========================================
// Edit Contract
// ==========================================

function editContract(index) {

    const contract = contractList[index];

    document.getElementById("contractNumber").value =
        contract.contractNumber;

    document.getElementById("tenantName").value =
        contract.tenantName;

    document.getElementById("buildingName").value =
        contract.buildingName;

    document.getElementById("flatNumber").value =
        contract.flatNumber;

    document.getElementById("agreementDate").value =
        contract.agreementDate;

    document.getElementById("moveInDate").value =
        contract.moveInDate;

    document.getElementById("leaseStartDate").value =
        contract.leaseStartDate;

    document.getElementById("leaseEndDate").value =
        contract.leaseEndDate;

    document.getElementById("monthlyRent").value =
        contract.monthlyRent;

    document.getElementById("advanceAmount").value =
        contract.advanceAmount;

    document.getElementById("maintenance").value =
        contract.maintenance;

    document.getElementById("dueDate").value =
        contract.dueDate;

    document.getElementById("contractStatus").value =
        contract.contractStatus;

    document.getElementById("remarks").value =
        contract.remarks;

    editIndex = index;

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}
// ==========================================
// Delete Contract
// ==========================================

function deleteContract(index) {

    if (confirm("Are you sure you want to delete this contract?")) {

        contractList.splice(index, 1);

        localStorage.setItem(
            "contractList",
            JSON.stringify(contractList)
        );

        generateContractNumber();

        displayContracts();

        alert("Contract deleted successfully.");

    }

}

// ==========================================
// Search Contract
// ==========================================

searchContract.addEventListener("keyup", function () {

    const keyword = this.value.toLowerCase();

    const filteredList = contractList.filter(contract =>

        contract.contractNumber.toLowerCase().includes(keyword) ||

        contract.tenantName.toLowerCase().includes(keyword) ||

        contract.buildingName.toLowerCase().includes(keyword) ||

        contract.flatNumber.toLowerCase().includes(keyword) ||

        contract.contractStatus.toLowerCase().includes(keyword)

    );

    displayContracts(filteredList);

});

// ==========================================
// Reset Edit Mode
// ==========================================

contractForm.addEventListener("reset", function () {

    editIndex = -1;

    generateContractNumber();

});

// ==========================================
// Refresh Table
// ==========================================

function refreshTable() {

    displayContracts();

}

// ==========================================
// Initial Load
// ==========================================

displayContracts();

console.log("Tenant Contract Module Loaded Successfully...");