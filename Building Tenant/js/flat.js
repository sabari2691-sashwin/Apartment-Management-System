// ==========================================
// Flat Master - JavaScript
// ==========================================

let flatList = JSON.parse(localStorage.getItem("flatList")) || [];
let buildingList =
JSON.parse(localStorage.getItem("buildings")) || [];
let editIndex = -1;

const flatForm = document.getElementById("flatForm");
const flatTableBody = document.getElementById("flatTableBody");
const searchFlat = document.getElementById("searchFlat");

// ===============================
// Load Records
// ===============================
function loadBuildingDropdown() {
   

    const buildingDropdown =
        document.getElementById("buildingName");

    buildingDropdown.innerHTML =
        '<option value="">Select Building</option>';

    buildingList.forEach(building => {

        buildingDropdown.innerHTML += `
            <option value="${building.name}">
                ${building.name}
            </option>
        `;

    });

}
window.onload = function () {
    loadBuildingDropdown();
    displayFlats();
};

// ===============================
// Save / Update Flat
// ===============================

flatForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const flat = {

        flatNumber: document.getElementById("flatNumber").value.trim(),

        buildingName: document.getElementById("buildingName").value,

        floorNumber: document.getElementById("floorNumber").value,

        flatType: document.getElementById("flatType").value,

        area: document.getElementById("area").value,

        rent: document.getElementById("rent").value,

        advance: document.getElementById("advance").value,

        status: document.getElementById("status").value,

        remarks: document.getElementById("remarks").value.trim()

    };

    // Validation

    if (
        flat.flatNumber === "" ||
        flat.buildingName === "" ||
        flat.floorNumber === ""
    ) {

        alert("Please fill all required fields.");

        return;

    }

    if (editIndex === -1) {

        flatList.push(flat);

        alert("Flat saved successfully.");

    } else {

        flatList[editIndex] = flat;

        alert("Flat updated successfully.");

        editIndex = -1;

    }

    localStorage.setItem("flatList", JSON.stringify(flatList));

    flatForm.reset();

    displayFlats();

});
// ===============================
// Display Flats
// ===============================

function displayFlats(filteredList = flatList) {

    flatTableBody.innerHTML = "";

    if (filteredList.length === 0) {

        flatTableBody.innerHTML = `
            <tr>
                <td colspan="9" class="text-center text-muted">
                    No Flat Records Found
                </td>
            </tr>
        `;

        return;
    }

    filteredList.forEach((flat, index) => {

        flatTableBody.innerHTML += `

            <tr>

                <td>${index + 1}</td>

                <td>${flat.flatNumber}</td>

                <td>${flat.buildingName}</td>

                <td>${flat.floorNumber}</td>

                <td>${flat.flatType}</td>

                <td>${flat.area}</td>

                <td>$${flat.rent}</td>

                <td>

                    <span class="badge ${flat.status === "Occupied"
                        ? "bg-success"
                        : flat.status === "Vacant"
                        ? "bg-warning text-dark"
                        : "bg-secondary"}">

                        ${flat.status}

                    </span>

                </td>

                <td>

                    <button
                        class="btn btn-sm btn-primary me-2"
                        onclick="editFlat(${index})">

                        <i class="fa-solid fa-pen"></i>

                    </button>

                    <button
                        class="btn btn-sm btn-danger"
                        onclick="deleteFlat(${index})">

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </td>

            </tr>

        `;

    });

}

// ===============================
// Edit Flat
// ===============================

function editFlat(index) {

    const flat = flatList[index];

    document.getElementById("flatNumber").value = flat.flatNumber;

    document.getElementById("buildingName").value = flat.buildingName;

    document.getElementById("floorNumber").value = flat.floorNumber;

    document.getElementById("flatType").value = flat.flatType;

    document.getElementById("area").value = flat.area;

    document.getElementById("rent").value = flat.rent;

    document.getElementById("advance").value = flat.advance;

    document.getElementById("status").value = flat.status;

    document.getElementById("remarks").value = flat.remarks;

    editIndex = index;

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}
// ===============================
// Delete Flat
// ===============================

function deleteFlat(index) {

    if (confirm("Are you sure you want to delete this flat?")) {

        flatList.splice(index, 1);

        localStorage.setItem("flatList", JSON.stringify(flatList));

        displayFlats();

        alert("Flat deleted successfully.");

    }

}

// ===============================
// Search Flat
// ===============================

searchFlat.addEventListener("keyup", function () {

    const keyword = this.value.toLowerCase();

    const filteredList = flatList.filter(flat =>

        flat.flatNumber.toLowerCase().includes(keyword) ||

        flat.buildingName.toLowerCase().includes(keyword) ||

        flat.flatType.toLowerCase().includes(keyword) ||

        flat.status.toLowerCase().includes(keyword)

    );

    displayFlats(filteredList);

});

// ===============================
// Reset Edit Mode
// ===============================

flatForm.addEventListener("reset", function () {

    editIndex = -1;

});

// ===============================
// Refresh Table
// ===============================

function refreshTable() {

    displayFlats();

}

// ===============================
// Initial Load
// ===============================

displayFlats();

console.log("Flat Master Loaded Successfully...");

