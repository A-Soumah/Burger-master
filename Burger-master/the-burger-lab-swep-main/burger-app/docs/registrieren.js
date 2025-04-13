// Öffnet das Registrier-Modal (funktioniert für alle .fa-user-plus Icons)
document.querySelectorAll(".fa-user-plus").forEach(icon => {
    icon.addEventListener("click", () => {
        document.querySelector(".modal")?.style.setProperty("visibility", "visible");

        // Sidebar automatisch schließen (optional)
        const sidebar = document.querySelector(".sidebar");
        if (sidebar) {
            sidebar.style.visibility = "hidden";
            sidebar.style.opacity = "0";
        }
    });
});

// Registrierung abschicken
document.getElementById("registerForm")?.addEventListener("submit", async function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("https://the-burger-lab.onrender.com/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
    });

    const data = await response.json();
    alert(data.message);

    // Nach erfolgreicher Registrierung schließen (optional)
    document.querySelector(".modal")?.style.setProperty("visibility", "hidden");
});
