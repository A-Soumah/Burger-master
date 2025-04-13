
    let sidebar = document.querySelector('.sidebar'); // Greift auf das erste Element mit .sidebar zu
    let buergermenue = document.querySelector(".fa-solid.fa-bars"); // Greift auf das Burger-Icon zu
    let closeButton=document.querySelector(".fa-xmark");
    let registriericon=document.querySelector(".fa-user-plus");
    let modal =document.querySelector(".modal");
    let formCloseButton=document.getElementById("formclosebutton");
    let anmeldeFormCloseButton=document.getElementById("anmeldeFormCloseButton");
    let anmeldeModal=document.getElementById("anmeldeModal");
    let anmeldeParagraf=document.querySelector(".anmeldeParagraf");
    const bestellhistorielink=document.querySelector(".bestellhistorielink");


    buergermenue.addEventListener("click", function() {
        if (sidebar.classList.contains("hidden")) {
            sidebar.classList.remove("hidden");
    }
        sidebar.classList.add("visible");
    })

    closeButton.addEventListener("click", function (){
        if (sidebar.classList.contains("visible")) {
            sidebar.classList.remove("visible");


        }
        sidebar.classList.add("hidden");

    })




    function toggleVisibility() {
        let element = document.querySelector(".my-element");

        if (element.classList.contains("hidden")) {
            element.classList.remove("hidden");
            element.classList.add("visible");
        } else {
            element.classList.remove("visible");
            element.classList.add("hidden");
        }
    }

    registriericon.addEventListener("click", ()=>{
        modal.style.visibility = "visible";


    });
    formCloseButton.addEventListener("click", ()=>{
        modal.style.visibility = "hidden";
    })
    anmeldeFormCloseButton.addEventListener("click", ()=>{
        anmeldeModal.style.visibility = "hidden";
    })

    anmeldeParagraf.addEventListener("click", ()=>{
        anmeldeModal.style.visibility = "visible";
    })

    // Inhalt für die einzelnen Burger
    document.addEventListener('DOMContentLoaded', function() {
        const burgerItems = document.querySelectorAll('.BürgerReihe-Komponente');

        burgerItems.forEach(item => {
            item.addEventListener('mouseover', function() {
                const description = this.querySelector('.tooltip').getAttribute('data-description');
                this.querySelector('.tooltip').textContent = description;
            });
        });


        burgerItems.forEach(item => {
            item.addEventListener('touchstart', function(event) {
                event.preventDefault();
                const description = this.querySelector('.tooltip').getAttribute('data-description');
                this.querySelector('.tooltip').textContent = description;
                this.classList.toggle('tooltip-active');
            });
        });


        document.addEventListener('click', function(event) {
            if (!event.target.closest('.BürgerReihe-Komponente')) {
                burgerItems.forEach(item => {
                    item.classList.remove('tooltip-active');
                });
            }
        });
    });

    //Bürger zum Warenkorb hinzufügen

    document.addEventListener("DOMContentLoaded", function () {
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


