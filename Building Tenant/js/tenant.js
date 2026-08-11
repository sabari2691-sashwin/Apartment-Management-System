// ==========================================
// Tenant Master - JavaScript
// ==========================================

let tenantList = JSON.parse(localStorage.getItem("tenantList")) || [];
let buildingList = JSON.parse(localStorage.getItem("buildings")) || [];let flatList = JSON.parse(localStorage.getItem("flatList")) || [];

let editIndex = -1;

const tenantForm = document.getElementById("tenantForm");
const tenantTableBody = document.getElementById("tenantTableBody");
const searchTenant = document.getElementById("searchTenant");

// ==========================================
// Load Data
// ==========================================

window.onload = function () {

    loadBuildings();

    loadFlats();

    displayTenants();

};

// ==========================================
// Load Building Dropdown
// ==========================================

function loadBuildings() {

    const buildingSelect = document.getElementById("buildingName");

    buildingSelect.innerHTML =
        '<option value="">Select Building</option>';

    buildingList.forEach(building => {

        buildingSelect.innerHTML += `

            <option value="${building.name}">
                ${building.name}
            </option>

        `;

    });

}

// ==========================================
// Load Flat Dropdown
// ==========================================

function loadFlats() {

    const flatSelect = document.getElementById("flatNumber");

    flatSelect.innerHTML =
        '<option value="">Select Flat</option>';

    flatList.forEach(flat => {

        flatSelect.innerHTML += `

            <option value="${flat.flatNumber}">
                ${flat.flatNumber}
            </option>

        `;

    });

}

// ==========================================
// Save / Update Tenant
// ==========================================

tenantForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const tenant = {

        tenantName: document.getElementById("tenantName").value.trim(),

        mobileNumber: document.getElementById("mobileNumber").value.trim(),

        email: document.getElementById("email").value.trim(),

        aadhaarNumber: document.getElementById("aadhaarNumber").value.trim(),

        buildingName: document.getElementById("buildingName").value,

        flatNumber: document.getElementById("flatNumber").value,

        occupation: document.getElementById("occupation").value.trim(),

        companyName: document.getElementById("companyName").value.trim(),

        monthlyRent: document.getElementById("monthlyRent").value,

        advanceAmount: document.getElementById("advanceAmount").value,

        moveInDate: document.getElementById("moveInDate").value,

        status: document.getElementById("status").value,

        address: document.getElementById("address").value.trim()

    };

    if (
        tenant.tenantName === "" ||
        tenant.mobileNumber === "" ||
        tenant.buildingName === "" ||
        tenant.flatNumber === ""
    ) {

        alert("Please fill all required fields.");

        return;

    }

    if (editIndex === -1) {

        tenantList.push(tenant);

        alert("Tenant saved successfully.");

    } else {

        tenantList[editIndex] = tenant;

        alert("Tenant updated successfully.");

        editIndex = -1;

    }

    localStorage.setItem("tenantList", JSON.stringify(tenantList));

    tenantForm.reset();

    displayTenants();

});
// ==========================================
// Display Tenants
// ==========================================

function displayTenants(filteredList = tenantList) {

    tenantTableBody.innerHTML = "";

    if (filteredList.length === 0) {

        tenantTableBody.innerHTML = `

            <tr>

                <td colspan="8" class="text-center text-muted">

                    No Tenant Records Found

                </td>

            </tr>

        `;

        return;

    }

    filteredList.forEach((tenant, index) => {

        tenantTableBody.innerHTML += `

            <tr>

                <td>${index + 1}</td>

                <td>${tenant.tenantName}</td>

                <td>${tenant.mobileNumber}</td>

                <td>${tenant.buildingName}</td>

                <td>${tenant.flatNumber}</td>

                <td>$${tenant.monthlyRent}</td>

                <td>

                    <span class="badge ${
                        tenant.status === "Active"
                            ? "bg-success"
                            : tenant.status === "Vacated"
                            ? "bg-danger"
                            : "bg-warning text-dark"
                    }">

                        ${tenant.status}

                    </span>

                </td>

                <td>

                    <button
                        class="btn btn-sm btn-primary me-2"
                        onclick="editTenant(${index})">

                        <i class="fa-solid fa-pen"></i>

                    </button>

                    <button
                        class="btn btn-sm btn-danger"
                        onclick="deleteTenant(${index})">

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </td>

            </tr>

        `;

    });

}

// ==========================================
// Edit Tenant
// ==========================================

function editTenant(index) {

    const tenant = tenantList[index];

    document.getElementById("tenantName").value = tenant.tenantName;

    document.getElementById("mobileNumber").value = tenant.mobileNumber;

    document.getElementById("email").value = tenant.email;

    document.getElementById("aadhaarNumber").value = tenant.aadhaarNumber;

    document.getElementById("buildingName").value = tenant.buildingName;

    document.getElementById("flatNumber").value = tenant.flatNumber;

    document.getElementById("occupation").value = tenant.occupation;

    document.getElementById("companyName").value = tenant.companyName;

    document.getElementById("monthlyRent").value = tenant.monthlyRent;

    document.getElementById("advanceAmount").value = tenant.advanceAmount;

    document.getElementById("moveInDate").value = tenant.moveInDate;

    document.getElementById("status").value = tenant.status;

    document.getElementById("address").value = tenant.address;

    editIndex = index;

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}
// ==========================================
// Delete Tenant
// ==========================================

function deleteTenant(index) {

    if (confirm("Are you sure you want to delete this tenant?")) {

        tenantList.splice(index, 1);

        localStorage.setItem(
            "tenantList",
            JSON.stringify(tenantList)
        );

        displayTenants();

        alert("Tenant deleted successfully.");

    }

}

// ==========================================
// Search Tenant
// ==========================================

searchTenant.addEventListener("keyup", function () {

    const keyword = this.value.toLowerCase();

    const filteredList = tenantList.filter(tenant =>

        tenant.tenantName.toLowerCase().includes(keyword) ||

        tenant.mobileNumber.toLowerCase().includes(keyword) ||

        tenant.buildingName.toLowerCase().includes(keyword) ||

        tenant.flatNumber.toLowerCase().includes(keyword) ||

        tenant.status.toLowerCase().includes(keyword)

    );

    displayTenants(filteredList);

});

// ==========================================
// Reset Edit Mode
// ==========================================

tenantForm.addEventListener("reset", function () {

    editIndex = -1;

});

// ==========================================
// Refresh Table
// ==========================================

function refreshTable() {

    displayTenants();

}

// ==========================================
// Initial Load
// ==========================================

displayTenants();

console.log("Tenant Master Loaded Successfully...");