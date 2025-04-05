const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');

const items = JSON.parse(localStorage.getItem('burgerItems')) || [];
const total = localStorage.getItem('burgerTotal') || "0,00";

if (items.length > 0) {
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        cartItems.appendChild(li);
    });
} else {
    cartItems.innerHTML = '<li>Keine Zutaten ausgewählt.</li>';
}

cartTotal.textContent = total;

 async function completeOrder() {
     const items = JSON.parse(localStorage.getItem("burgerItems"));
     const total = localStorage.getItem("burgerTotal");
     const username = localStorage.getItem("username"); // muss beim Login gespeichert worden sein

     const response = await fetch("http://localhost:5000/bestellhistorie", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ username, items, total })
     });

     alert(" Vielen Dank für deine Bestellung!");
    localStorage.clear();
    window.location.href = "danke.html"; // oder: danke.html
}