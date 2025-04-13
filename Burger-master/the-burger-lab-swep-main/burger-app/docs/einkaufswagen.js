const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');

// 🛒 Beide Speicherquellen abrufen
const gespeicherteMenüBurger = JSON.parse(localStorage.getItem('warenkorb')) || [];
const konfigurierteBurger = JSON.parse(localStorage.getItem('burgerItems')) || [];
const konfigPreis = parseFloat(localStorage.getItem('burgerTotal')?.replace(',', '.') || '0');

let gesamtpreis = 0;

// 🍔 Konfigurierten Burger optisch gruppieren
if (konfigurierteBurger.length > 0) {
    const konfigLi = document.createElement('li');
    konfigLi.innerHTML = `<strong>🍔 Dein konfigurierter Burger:</strong>`;

    const unterliste = document.createElement('ul');
    unterliste.classList.add('konfig-burger');

    konfigurierteBurger.forEach(name => {
        const zutat = document.createElement('li');
        zutat.textContent = `🍔 ${name} (konfiguriert)`;
        unterliste.appendChild(zutat);
    });

    const zwischensumme = document.createElement('li');
    zwischensumme.innerHTML = `<em>Zwischensumme: ${konfigPreis.toFixed(2).replace('.', ',')} €</em>`;
    unterliste.appendChild(zwischensumme);

    konfigLi.appendChild(unterliste);
    cartItems.appendChild(konfigLi);

    gesamtpreis += konfigPreis;
}

// 🍔 Menüburger anzeigen
if (gespeicherteMenüBurger.length > 0) {
    gespeicherteMenüBurger.forEach(entry => {
        const li = document.createElement('li');
        li.textContent = `🍔 ${entry.name} – ${entry.preis?.toFixed(2).replace('.', ',')} €`;
        cartItems.appendChild(li);
        gesamtpreis += entry.preis || 0;
    });
}

// 🧾 Falls keine Einträge vorhanden
if (gespeicherteMenüBurger.length === 0 && konfigurierteBurger.length === 0) {
    cartItems.innerHTML = '<li>Keine Burger im Warenkorb.</li>';
}

// 💶 Gesamtpreis anzeigen
cartTotal.textContent = gesamtpreis.toFixed(2).replace('.', ',');

// ✅ Bestellung abschließen
async function completeOrder() {
    const username = localStorage.getItem("username");

    // ❗️Wenn nicht eingeloggt, abbrechen
    if (!username) {
        alert("Bitte melde dich zuerst an, um die Bestellung abzuschließen.");
        return;
    }

    const konfigurierterBurger = {
        name: "Konfigurierter Burger",
        zutaten: konfigurierteBurger,
        preis: konfigPreis
    };

    const items = [
        ...(konfigurierteBurger.length > 0 ? [konfigurierterBurger] : []),
        ...gespeicherteMenüBurger
    ];


    const total = cartTotal.textContent;

    try {
        const response = await fetch("https://the-burger-lab.onrender.com/bestellhistorie", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, items, total })
        });

        if (!response.ok) throw new Error("Serverfehler bei Bestellung.");

        alert("Vielen Dank für deine Bestellung!");

        localStorage.removeItem("warenkorb");
        localStorage.removeItem("burgerItems");
        localStorage.removeItem("burgerTotal");

        window.location.href = "danke.html";
    } catch (error) {
        console.error("Fehler beim Bestellen:", error);
        alert("Es gab ein Problem beim Absenden deiner Bestellung. Bitte versuche es erneut.");
    }
}

