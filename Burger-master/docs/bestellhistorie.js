const username = localStorage.getItem("username");

if (!username) {
    alert("⚠️ Du bist nicht angemeldet!");
    window.location.href = "login.html";
}

async function ladeHistorie() {
    const response = await fetch(`https://the-burger-lab.onrender.com/getHistory?username=${username}`);
    const data = await response.json();

    const orderList = document.getElementById("orderList");

    if (!data || data.length === 0) {
        orderList.innerHTML = "<li>Keine Bestellungen gefunden.</li>";
        return;
    }

    data.forEach(order => {
        const li = document.createElement("li");

        // Erzeuge Liste der Zutaten
        const zutatenListe = document.createElement("ul");

        order.items.forEach(item => {
            const eintrag = document.createElement("li");

            if (typeof item === "string") {
                eintrag.textContent = item;
            } else if (item.name && item.preis !== undefined) {
                // Preis vorhanden
                const preis = item.preis !== null ? `${item.preis.toFixed(2).replace('.', ',')} €` : "(konfiguriert)";
                eintrag.textContent = `🍔 ${item.name} – ${preis}`;
            } else if (item.name) {
                eintrag.textContent = `🍔 ${item.name}`;
            } else {
                eintrag.textContent = JSON.stringify(item);
            }

            zutatenListe.appendChild(eintrag);
        });

        // Gesamte Bestellung einfügen
        li.innerHTML = `
            <strong>Datum:</strong> ${new Date(order.date).toLocaleString()}<br>
            <strong>Preis:</strong> ${order.total_price.toFixed(2)} €<br>
            <strong>Zutaten:</strong>
        `;
        li.appendChild(zutatenListe);
        orderList.appendChild(li);
    });
}

ladeHistorie();
