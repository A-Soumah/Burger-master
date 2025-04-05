
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
