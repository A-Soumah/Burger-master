document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.querySelector('.sidebar');
    const burgerMenu = document.querySelector(".fa-bars");
    const closeButton = document.querySelector(".fa-xmark");
    const registrierIcon = document.querySelector(".fa-user-plus");
    const modal = document.querySelector(".modal");
    const formCloseButton = document.getElementById("formclosebutton");
    const anmeldeFormCloseButton = document.getElementById("anmeldeFormCloseButton");
    const anmeldeModal = document.getElementById("anmeldeModal");
    const anmeldeParagraf = document.querySelector(".anmeldeParagraf");
    const bestellhistorielink = document.querySelector(".bestellhistorielink");


    // Sidebar öffnen
    burgerMenu.addEventListener("click", () => {
        sidebar.classList.add("visible");

    });

    // Sidebar schließen
    closeButton.addEventListener("click", () => {
        sidebar.classList.remove("visible");
    });

    // Registrierung Modal
    registrierIcon.addEventListener("click", () => {
        modal.style.visibility = "visible";

    });

    formCloseButton.addEventListener("click", () => {
        modal.style.visibility = "hidden";
        burgerMenu.style.visibilit
    });

    // Anmelden Modal
    anmeldeFormCloseButton.addEventListener("click", () => {
        anmeldeModal.style.visibility = "hidden";
    });

    anmeldeParagraf.addEventListener("click", () => {
        anmeldeModal.style.visibility = "visible";
    });

    // Tooltip Verhalten (Mouse + Touch)
    const burgerItems = document.querySelectorAll('.BürgerReihe-Komponente');

    burgerItems.forEach(item => {
        item.addEventListener('mouseover', function () {
            const description = this.querySelector('.tooltip').getAttribute('data-description');
            this.querySelector('.tooltip').textContent = description;
        });

        item.addEventListener('touchstart', function (event) {
            // Verhindere Tooltip-Aktivierung, wenn ein Button berührt wird
            if (event.target.closest(".button-Komponente")) {
                return; // nicht Tooltip öffnen, wenn Button gedrückt wurde
            }

            const description = this.querySelector('.tooltip').getAttribute('data-description');
            this.querySelector('.tooltip').textContent = description;
            this.classList.toggle('tooltip-active');
        });
    });

    document.addEventListener('click', function (event) {
        if (!event.target.closest('.BürgerReihe-Komponente')) {
            burgerItems.forEach(item => {
                item.classList.remove('tooltip-active');
            });
        }
    });

    // Burger zum Warenkorb hinzufügen
    const burgerButtons = document.querySelectorAll(".BürgerReihe-Komponente .button-Komponente");

    burgerButtons.forEach(button => {
        button.addEventListener("click", function () {
            const el = this.parentElement;
            const burgerName = el.querySelector("h2").textContent.trim();
            const priceAttr = el.getAttribute("data-price");
            const price = parseFloat(priceAttr || 0);

            const warenkorb = JSON.parse(localStorage.getItem("warenkorb")) || [];

            warenkorb.push({
                name: burgerName,
                menge: 1,
                preis: price
            });

            localStorage.setItem("warenkorb", JSON.stringify(warenkorb));

            alert(`🍔 ${burgerName} wurde zum Warenkorb hinzugefügt.`);
        });
    });
});
