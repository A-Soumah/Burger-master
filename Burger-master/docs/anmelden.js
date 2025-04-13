document.addEventListener("DOMContentLoaded", () => {
    let anmeldestatus = "";
    let responsdata = "";

    // Anmelden
    document.querySelectorAll(".anmeldeParagraf").forEach(el => {
        el.addEventListener("click", () => {
            document.getElementById("anmeldeModal").style.visibility = "visible";
        });
    });
    const form = document.getElementById("anmelderegisterForm");
    if (form) {
        form.addEventListener("submit", async function (event) {
            event.preventDefault();

            const anmeldeUserName = document.getElementById("anmeldeUsername").value;
            const anmeldePassword = document.getElementById("anmeldePassword").value;

            try {
                const response = await fetch("http://localhost:5000/anmelden", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ anmeldeUserName, anmeldePassword }),
                });

                const data = await response.json();

                // alten Login löschen
                localStorage.removeItem("username");
                localStorage.removeItem("anmeldestatus");

                // speichern
                if (response.ok) {
                    localStorage.setItem("username", data.username);
                    localStorage.setItem("anmeldestatus", data.anmeldestatus);

                    responsdata = data.message;
                    anmeldestatus = data.anmeldestatus;

                    alert("✅ Anmeldung erfolgreich!");
                    window.location.reload(); // optional neu laden
                } else {
                    alert(data.message || "Anmeldung fehlgeschlagen!");
                }
            } catch (err) {
                console.error("Fehler beim Anmelden:", err);
                alert("Fehler bei der Verbindung zum Server.");
            }
        });
    }

    // Abmelden
    // ALLE Abmelde-Buttons abfangen (auch Sidebar etc.)
    document.querySelectorAll(".abmeldeParagraf").forEach(button => {
        button.addEventListener("click", async () => {
            const username = localStorage.getItem("username");
            if (!username) return;

            try {
                const res = await fetch("http://localhost:5000/abmelden", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username }),
                });

                const data = await res.json();
                console.log("Antwort vom Server:", data);

                localStorage.removeItem("username");
                localStorage.removeItem("anmeldestatus");

                alert("Du wurdest abgemeldet!");
                window.location.reload();
            } catch (err) {
                console.error("Fehler beim Abmelden:", err);
                alert("Abmeldung fehlgeschlagen!");
            }
        });
    });

});
