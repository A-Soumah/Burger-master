let anmeldestatus =""
let responsdata=""
document.getElementById("anmelderegisterForm").addEventListener("submit", async function(event)  {
    event.preventDefault();

    let anmeldeUserName=document.getElementById("anmeldeUsername").value;
    let anmeldePassword=document.getElementById("anmeldePassword").value;

    const response = await fetch("http://localhost:5000/anmelden", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ anmeldeUserName,  anmeldePassword })
    });

    const data = await response.json();
    localStorage.setItem("username", data.username);
    localStorage.setItem("anmeldestatus", data.anmeldestatus);

    responsdata=data.message;
    anmeldestatus=data.anmeldestatus

    if (data.anmeldestatus === "angemeldet") {
        alert("✅ Anmeldung erfolgreich!");
    } else {
        alert("❌ Anmeldung fehlgeschlagen!");
    }


});


