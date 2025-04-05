// bestellhistorie.js
const username = localStorage.getItem("username");

if (!username) {
    alert("⚠️ Du bist nicht angemeldet!");
    window.location.href = "login.html";
}

async function ladeHistorie() {
    const response = await fetch(`http://localhost:5000/getHistory?username=${username}`);
    const data = await response.json();

    const orderList = document.getElementById("orderList");

    if (!data || data.length === 0) {
        orderList.innerHTML = "<li>Keine Bestellungen gefunden.</li>";
        return;
    }

    data.forEach(order => {
        const li = document.createElement("li");
        li.innerHTML = `
      <strong>Datum:</strong> ${new Date(order.date).toLocaleString()}<br>
      <strong>Preis:</strong> ${order.total_price.toFixed(2)} €<br>
      <strong>Zutaten:</strong><br>
      <ul>${order.items.map(item => `<li>${item}</li>`).join("")}</ul>
    `;
        orderList.appendChild(li);
    });
}

ladeHistorie();
