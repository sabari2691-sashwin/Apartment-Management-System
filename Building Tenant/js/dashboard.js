// ==========================================
// Apartment Management System
// Dashboard JavaScript
// ==========================================

// Sidebar Toggle

const menuBtn = document.querySelector(".menu-btn");
const sidebar = document.querySelector(".sidebar");

menuBtn.addEventListener("click", () => {

    sidebar.classList.toggle("active");

});

// ==========================================
// Counter Animation
// ==========================================

function animateCounter(id, target, prefix = "") {

    let count = 0;

    const element = document.getElementById(id);

    const speed = Math.ceil(target / 50);

    const timer = setInterval(() => {

        count += speed;

        if (count >= target) {

            count = target;

            clearInterval(timer);

        }

        element.innerHTML = prefix + count;

    }, 20);

}

animateCounter("buildingCount", 24);
animateCounter("flatCount", 320);
animateCounter("tenantCount", 280);
animateCounter("occupiedCount", 260);
animateCounter("vacantCount", 60);
animateCounter("revenueCount", 24500, "$");

// ==========================================
// Revenue Chart
// ==========================================

const revenueCtx = document
.getElementById("revenueChart")
.getContext("2d");

new Chart(revenueCtx, {

    type: "bar",

    data: {

        labels: [

            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun"

        ],

        datasets: [

            {

                label: "Revenue",

                data: [

                    12000,
                    15000,
                    18000,
                    17000,
                    22000,
                    24500

                ],

                backgroundColor: [

                    "#2563eb",
                    "#3b82f6",
                    "#60a5fa",
                    "#2563eb",
                    "#1d4ed8",
                    "#0ea5e9"

                ]

            }

        ]

    },

    options: {

        responsive: true,

        plugins: {

            legend: {

                display: false

            }

        }

    }

});
// ==========================================
// Occupancy Pie Chart
// ==========================================

const occupancyCtx = document
    .getElementById("occupancyChart")
    .getContext("2d");

new Chart(occupancyCtx, {

    type: "pie",

    data: {

        labels: [

            "Occupied",
            "Vacant"

        ],

        datasets: [{

            data: [

                260,
                60

            ],

            backgroundColor: [

                "#16a34a",
                "#f59e0b"

            ],

            borderWidth: 2

        }]

    },

    options: {

        responsive: true,

        plugins: {

            legend: {

                position: "bottom"

            }

        }

    }

});

// ==========================================
// Greeting Message
// ==========================================

const welcomeTitle = document.querySelector(".welcome-section h2");

const hour = new Date().getHours();

let greeting = "";

if (hour < 12) {

    greeting = "☀️ Good Morning";

}
else if (hour < 17) {

    greeting = "🌤 Good Afternoon";

}
else {

    greeting = "🌙 Good Evening";

}

welcomeTitle.innerHTML = `${greeting}, Admin 👋`;

// ==========================================
// Live Date & Time
// ==========================================

const profileSmall = document.querySelector(".profile small");

function updateTime() {

    const now = new Date();

    const time = now.toLocaleTimeString("en-IN");

    profileSmall.innerHTML = `
        <span style="color:#22c55e;">●</span>
        Online | ${time}
    `;

}

updateTime();

setInterval(updateTime, 1000);

// ==========================================
// Notification
// ==========================================

const notification = document.querySelector(".notification");

notification.addEventListener("click", function () {

    alert(
        "📢 Notifications\n\n" +
        "• 2 New Buildings Added\n" +
        "• 3 Pending Payments\n" +
        "• 1 Contract Expiring Soon"
    );

});

// ==========================================
// Dashboard Loaded
// ==========================================

console.log("Dashboard Loaded Successfully...");