document.getElementById("registerForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Verhindert das Neuladen der Seite

    // Eingabedaten aus dem Formular holen
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Daten an den Server senden
    const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password,anmeldestatus })
    });

    const data = await response.json();
    alert(data.message); // Meldung anzeigen
});