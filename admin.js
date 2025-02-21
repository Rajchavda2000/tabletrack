// Dummy admin credentials
const ADMIN_USERNAME = "tabeltrack";
const ADMIN_PASSWORD = "tabel110";

// Function to handle login
function login() {
    const username = document.getElementById("adminUsername").value;
    const password = document.getElementById("adminPassword").value;
    const errorText = document.getElementById("loginError");

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        localStorage.setItem("adminLoggedIn", "true");
        showAdminPanel();
    } else {
        errorText.innerText = "Invalid username or password!";
    }
}

// Function to show admin panel after login
function showAdminPanel() {
    document.getElementById("login-container").style.display = "none";
    document.getElementById("adminPanel").style.display = "block";
    loadOrders();
}

// Function to check if admin is logged in
function checkLoginStatus() {
    if (localStorage.getItem("adminLoggedIn") === "true") {
        showAdminPanel();
    }
}

// Function to log out
function logout() {
    localStorage.removeItem("adminLoggedIn");
    location.reload();
}

// Load orders from local storage
let orders = JSON.parse(localStorage.getItem("orders")) || [];

// Function to display orders in admin panel
function loadOrders() {
    const ordersTable = document.getElementById("ordersTable");

    // Clear existing rows except headers
    ordersTable.innerHTML = `
        <tr>
            <th>Table No.</th>
            <th>Items</th>
            <th>Status</th>
            <th>Action</th>
        </tr>
    `;

    orders.forEach((order, index) => {
        let row = ordersTable.insertRow();
        row.innerHTML = `
            <td>${order.table}</td>
            <td>${order.items.join(", ")}</td>
            <td>${order.status}</td>
            <td>
                <button class="btn-complete" data-index="${index}">✔ Complete</button>
                <button class="btn-delete" data-index="${index}">❌ Delete</button>
            </td>
        `;
    });

    // Add event listeners for buttons
    document.querySelectorAll(".btn-complete").forEach(button => {
        button.addEventListener("click", (event) => {
            let index = event.target.getAttribute("data-index");
            markAsCompleted(index);
        });
    });

    document.querySelectorAll(".btn-delete").forEach(button => {
        button.addEventListener("click", (event) => {
            let index = event.target.getAttribute("data-index");
            deleteOrder(index);
        });
    });
}

// Function to mark an order as completed
function markAsCompleted(index) {
    orders[index].status = "Completed";
    localStorage.setItem("orders", JSON.stringify(orders));
    loadOrders();
}

// Function to delete an order
function deleteOrder(index) {
    orders.splice(index, 1);
    localStorage.setItem("orders", JSON.stringify(orders));
    loadOrders();
}

// Check login status when admin page loads
window.onload = checkLoginStatus;
