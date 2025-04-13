const form = document.getElementById('burgerForm');
const totalPriceSpan = document.getElementById('totalPrice');

form.addEventListener('change', () => {
    let total = 0;

    // Radios (Brot, Patty)
    const radios = form.querySelectorAll('input[type="radio"]:checked');
    radios.forEach(radio => total += parseFloat(radio.value));

    // Checkboxes (Toppings, Saucen, Extras)
    const checkboxes = form.querySelectorAll('input[type="checkbox"]:checked');
    checkboxes.forEach(box => total += parseFloat(box.value));

    totalPriceSpan.textContent = total.toFixed(2).replace('.', ',');
});

form.addEventListener("submit", function (e) {
    e.preventDefault();

    // ✅ GK100: Pflichtfelder prüfen
    const brotGewählt = form.querySelector('input[name="brot"]:checked');
    const pattyGewählt = form.querySelector('input[name="patty"]:checked');

    if (!brotGewählt) {
        alert("⚠️ Bitte wähle ein Brot aus!");
        return;
    }
    if (!pattyGewählt) {
        alert("⚠️ Bitte wähle ein Patty aus!");
        return;
    }

    let selected = [];
    const checked = form.querySelectorAll("input:checked, input[type='radio']:checked");
    checked.forEach(input => {
        selected.push(input.parentElement.textContent.trim());
    });

    const total = totalPriceSpan.textContent;

    // Speichere Auswahl & Preis im localStorage
    localStorage.setItem("burgerItems", JSON.stringify(selected));
    localStorage.setItem("burgerTotal", total);

    // Weiterleitung zum Warenkorb
    window.location.href = "Einkaufswagen.html";
});
const resetBtn = document.getElementById("resetBtn");

resetBtn.addEventListener("click", () => {
    // Alle ausgewählten Optionen des Formulars zurücksetzen
    form.reset();

    // Preis auf 0 setzen
    totalPriceSpan.textContent = "0,00";
});
