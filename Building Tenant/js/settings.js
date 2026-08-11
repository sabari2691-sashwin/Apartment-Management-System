// ==========================================
// Settings Module - JavaScript
// ==========================================

let settings =
    JSON.parse(localStorage.getItem("settings")) || {};

const settingsForm =
    document.getElementById("settingsForm");

// ==========================================
// Page Load
// ==========================================

window.onload = function () {

    loadSettings();

    applyTheme();

};

// ==========================================
// Save Settings
// ==========================================

settingsForm.addEventListener("submit", function (e) {

    e.preventDefault();

    if (
        document.getElementById("password").value !==
        document.getElementById("confirmPassword").value
    ) {

        alert("Password and Confirm Password do not match.");

        return;

    }

    settings = {

        apartmentName:
            document.getElementById("apartmentName").value,

        ownerName:
            document.getElementById("ownerName").value,

        address:
            document.getElementById("address").value,

        phone:
            document.getElementById("phone").value,

        email:
            document.getElementById("email").value,

        website:
            document.getElementById("website").value,

        gstNumber:
            document.getElementById("gstNumber").value,

        adminName:
            document.getElementById("adminName").value,

        username:
            document.getElementById("username").value,

        password:
            document.getElementById("password").value,

        currency:
            document.getElementById("currency").value,

        theme:
            document.getElementById("theme").value,

        timeZone:
            document.getElementById("timeZone").value,

        dateFormat:
            document.getElementById("dateFormat").value,

        logo:
            document.getElementById("logoPreview").src

    };

    localStorage.setItem(
        "settings",
        JSON.stringify(settings)
    );

    applyTheme();

    alert("Settings Saved Successfully.");

});
// ==========================================
// Load Saved Settings
// ==========================================

function loadSettings() {

    if (Object.keys(settings).length === 0) {

        return;

    }

    document.getElementById("apartmentName").value =
        settings.apartmentName || "";

    document.getElementById("ownerName").value =
        settings.ownerName || "";

    document.getElementById("address").value =
        settings.address || "";

    document.getElementById("phone").value =
        settings.phone || "";

    document.getElementById("email").value =
        settings.email || "";

    document.getElementById("website").value =
        settings.website || "";

    document.getElementById("gstNumber").value =
        settings.gstNumber || "";

    document.getElementById("adminName").value =
        settings.adminName || "";

    document.getElementById("username").value =
        settings.username || "";

    document.getElementById("password").value =
        settings.password || "";

    document.getElementById("confirmPassword").value =
        settings.password || "";

    document.getElementById("currency").value =
        settings.currency || "₹";

    document.getElementById("theme").value =
        settings.theme || "light";

    document.getElementById("timeZone").value =
        settings.timeZone || "Asia/Kolkata";

    document.getElementById("dateFormat").value =
        settings.dateFormat || "dd-mm-yyyy";

    if (settings.logo) {

        document.getElementById("logoPreview").src =
            settings.logo;

    }

}

// ==========================================
// Logo Preview
// ==========================================

document.getElementById("companyLogo")
.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {

        document.getElementById("logoPreview").src =
            e.target.result;

    };

    reader.readAsDataURL(file);

});

// ==========================================
// Theme Change
// ==========================================

document.getElementById("theme")
.addEventListener("change", applyTheme);

function applyTheme() {

    const theme =
        document.getElementById("theme").value;

    if (theme === "dark") {

        document.body.classList.add("dark-theme");

    } else {

        document.body.classList.remove("dark-theme");

    }

}

// ==========================================
// Reset Settings
// ==========================================

settingsForm.addEventListener("reset", function () {

    setTimeout(() => {

        document.getElementById("logoPreview").src =
            "https://via.placeholder.com/120x120?text=Logo";

        document.body.classList.remove("dark-theme");

    }, 100);

});
// ==========================================
// Update Application Information
// ==========================================

function updateApplicationInfo() {

    const apartmentTitle =
        document.getElementById("apartmentName").value;

    const logo =
        document.getElementById("logoPreview").src;

    // Save for all pages

    localStorage.setItem("appName", apartmentTitle);

    localStorage.setItem("appLogo", logo);

}

// ==========================================
// Update on Save
// ==========================================

settingsForm.addEventListener("submit", function () {

    updateApplicationInfo();

});

// ==========================================
// Show Saved Company Name
// ==========================================

window.addEventListener("load", function () {

    const appName =
        localStorage.getItem("appName");

    if (appName) {

        document.title =
            appName + " | Apartment Management System";

    }

});

// ==========================================
// Clear Settings
// ==========================================

function clearSettings() {

    if (confirm("Do you want to reset all settings?")) {

        localStorage.removeItem("settings");

        localStorage.removeItem("appName");

        localStorage.removeItem("appLogo");

        settingsForm.reset();

        document.getElementById("logoPreview").src =
            "https://via.placeholder.com/120x120?text=Logo";

        document.body.classList.remove("dark-theme");

        alert("Settings Reset Successfully.");

    }

}

// ==========================================
// Keyboard Shortcut (Ctrl + S)
// ==========================================

document.addEventListener("keydown", function (e) {

    if (e.ctrlKey && e.key.toLowerCase() === "s") {

        e.preventDefault();

        settingsForm.requestSubmit();

    }

});

// ==========================================
// Module Loaded
// ==========================================

console.log("Settings Module Loaded Successfully...");