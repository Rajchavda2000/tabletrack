// Dark Mode Toggle
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

// Store orders in a local array
let orders = [];

// Order Placement Function
function placeOrder() {
    const tableNumber = document.getElementById("table").value;
    const selectedItems = document.querySelectorAll(".menu-item input:checked");

    if (selectedItems.length === 0) {
        alert("Please select at least one item to order.");
        return;
    }

    let orderItems = [];
    selectedItems.forEach(item => {
        orderItems.push(item.value);
    });

    // Store order in local storage (temporary)
    const orderData = {
        table: tableNumber,
        items: orderItems,
        status: "Pending"
    };

    orders.push(orderData);
    localStorage.setItem("orders", JSON.stringify(orders));

    // Show order confirmation
    document.getElementById("orderConfirmation").style.display = "block";
    setTimeout(() => {
        document.getElementById("orderConfirmation").style.display = "none";
    }, 3000);
}
