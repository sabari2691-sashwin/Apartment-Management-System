// ==========================================
// Apartment Management System
// Building Master
// ==========================================

// ================================
// Get HTML Elements
// ================================

const buildingForm = document.getElementById("buildingForm");

const buildingName = document.getElementById("buildingName");
const totalFlats = document.getElementById("totalFlats");
const contactPerson = document.getElementById("contactPerson");
const phoneNumber = document.getElementById("phoneNumber");
const email = document.getElementById("email");
const address = document.getElementById("address");
const status = document.getElementById("status");

const tableBody = document.getElementById("buildingTableBody");

const searchBuilding = document.getElementById("searchBuilding");

const messageBox = document.getElementById("messageBox");

// ================================
// Variables
// ================================

let buildings = [];
let editIndex = -1;

// ================================
// Show Message
// ================================

function showMessage(message, type) {

    messageBox.innerHTML = `

        <div class="alert alert-${type} alert-dismissible fade show">

            ${message}

            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="alert">
            </button>

        </div>

    `;

    setTimeout(() => {

        messageBox.innerHTML = "";

    }, 3000);

}

// ================================
// Save Data To Local Storage
// ================================

function saveToLocalStorage() {

    localStorage.setItem(
        "buildings",
        JSON.stringify(buildings)
    );

}

// ================================
// Load Data From Local Storage
// ================================

function loadFromLocalStorage() {

    const data = localStorage.getItem("buildings");

    if (data) {

        buildings = JSON.parse(data);

    }

}
// ================================
// Render Building Table
// ================================

function renderTable() {

    tableBody.innerHTML = "";

    buildings.forEach((building, index) => {

        tableBody.innerHTML += `

            <tr>

                <td>${index + 1}</td>

                <td>${building.name}</td>

                <td>${building.flats}</td>

                <td>${building.contact}</td>

                <td>${building.phone}</td>

                <td>${building.email}</td>

                <td>

                    <span class="badge ${building.status === "Active"
                        ? "bg-success"
                        : "bg-secondary"}">

                        ${building.status}

                    </span>

                </td>

                <td>

                    <button
                        class="btn btn-sm btn-primary editBtn"
                        data-index="${index}">

                        <i class="fa-solid fa-pen"></i>

                    </button>

                    <button
                        class="btn btn-sm btn-danger deleteBtn"
                        data-index="${index}">

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </td>

            </tr>

        `;

    });

}

// ================================
// Save / Update Building
// ================================

buildingForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const building = {

        name: buildingName.value.trim(),
        flats: totalFlats.value.trim(),
        contact: contactPerson.value.trim(),
        phone: phoneNumber.value.trim(),
        email: email.value.trim(),
        address: address.value.trim(),
        status: status.value

    };

    // Validation

    if (

        building.name === "" ||
        building.flats === "" ||
        building.contact === "" ||
        building.phone === "" ||
        building.email === "" ||
        building.address === ""

    ) {

        showMessage(
            "Please fill all fields.",
            "danger"
        );

        return;

    }

    // Phone Validation

    if (!/^[0-9]{10}$/.test(building.phone)) {

        showMessage(
            "Phone Number must contain 10 digits.",
            "danger"
        );

        return;

    }

    // Duplicate Check

    const duplicate = buildings.find((item, index) => {

        return (

            item.name.toLowerCase() === building.name.toLowerCase() &&
            index !== editIndex

        );

    });

    if (duplicate) {

        showMessage(
            "Building Name already exists.",
            "warning"
        );

        return;

    }

    // Update

    if (editIndex >= 0) {

        buildings[editIndex] = building;

        showMessage(
            "Building Updated Successfully.",
            "success"
        );

        editIndex = -1;

    } else {

        buildings.push(building);

        showMessage(
            "Building Saved Successfully.",
            "success"
        );

    }

    saveToLocalStorage();

    renderTable();

    buildingForm.reset();

});
// ================================
// Edit & Delete
// ================================

tableBody.addEventListener("click", function (e) {

    // ---------- Edit ----------

    if (e.target.closest(".editBtn")) {

        const index = Number(
            e.target.closest(".editBtn").dataset.index
        );

        const building = buildings[index];

        buildingName.value = building.name;
        totalFlats.value = building.flats;
        contactPerson.value = building.contact;
        phoneNumber.value = building.phone;
        email.value = building.email;
        address.value = building.address;
        status.value = building.status;

        editIndex = index;

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }

    // ---------- Delete ----------

    if (e.target.closest(".deleteBtn")) {

        const index = Number(
            e.target.closest(".deleteBtn").dataset.index
        );

        const confirmDelete = confirm(
            "Are you sure you want to delete this building?"
        );

        if (!confirmDelete) return;

        buildings.splice(index, 1);

        saveToLocalStorage();

        renderTable();

        showMessage(
            "Building Deleted Successfully.",
            "success"
        );

    }

});

// ================================
// Live Search
// ================================

searchBuilding.addEventListener("keyup", function () {

    const keyword = this.value.toLowerCase();

    const rows = tableBody.querySelectorAll("tr");

    rows.forEach((row) => {

        const text = row.innerText.toLowerCase();

        row.style.display = text.includes(keyword)
            ? ""
            : "none";

    });

});

// ================================
// Initial Load
// ================================

loadFromLocalStorage();

renderTable();