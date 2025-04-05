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
