require("dotenv").config(); // Umgebungsvariablen laden
const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(express.json());
app.use(cors());

// Datenbankverbindung
async function connectDB() {
    const client = new MongoClient(MONGO_URI);
    await client.connect();
    console.log(" Mit MongoDB verbunden!");
    return client.db("burger_lab");
}
const dbPromise = connectDB();

// **Registrierungs-Route**
app.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "Alle Felder sind erforderlich!" });
    }

    try {
        const db = await dbPromise;
        const usersCollection = db.collection("users");

        // Prüfen, ob der Benutzer existiert
        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Benutzer existiert bereits!" });
        }

        // Passwort hashen
        //const hashedPassword = await bcrypt.hash(password, 10);

        // Neuen Benutzer in MongoDB speichern
        await usersCollection.insertOne({
            username,
            email,
            //password: hashedPassword,
            password:password,
            anmeldestatus: "abgemeldet",
            order_history: [],
            created_at: new Date()
        });

        res.json({ message: "Registrierung erfolgreich!" });
    } catch (error) {
        console.error(" Fehler beim Speichern:", error);
        res.status(500).json({ message: "Serverfehler" });
    }
});

// **Login-Route**
app.post("/anmelden", async (req, res) => {
    const { anmeldeUserName, anmeldePassword } = req.body;
    if (!anmeldeUserName || !anmeldePassword) {
        return res.status(400).json({ message: "Alle Felder sind erforderlich!" });
    }

    try {
        const db = await dbPromise;
        const usersCollection = db.collection("users");

        // Nutzer in der Datenbank suchen
        let user = await usersCollection.findOne({ username: anmeldeUserName });
        if (!user) {
            return res.status(400).json({ message: "Benutzer nicht gefunden!" });
        }

        // Passwort überprüfen
        /*const passwordMatch = await bcrypt.compare(anmeldePassword, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: "Falsches Passwort!" });
        }

         */
        if (anmeldePassword != user.password) {
            return res.status(400).json({ message: "Falsches Passwort!" });
        }
        await usersCollection.updateOne(
            { username: anmeldeUserName },
            { $set: { anmeldestatus: "angemeldet" } }
        );

        await usersCollection.updateOne(
            { username: anmeldeUserName },
            { $set: { anmeldestatus: "angemeldet" } }
        );

// ⬇ manuell den Wert im Rückgabeobjekt setzen
        user.anmeldestatus = "angemeldet";

        res.json({
            message: "Login erfolgreich!",
            username: user.username,
            anmeldestatus: user.anmeldestatus
        });


    } catch (error) {
        console.error(" Fehler beim Login:", error);
        res.status(500).json({ message: "Serverfehler" });
    }
});
app.post("/bestellhistorie", async (req, res) => {
    const { username, items, total } = req.body;

    if (!username || !items || !total) {
        return res.status(400).json({ message: "Alle Felder sind erforderlich!" });
    }

    try {
        const db = await dbPromise;
        const users = db.collection("users");

        const bestellung = {
            order_id: new Date().getTime(),
            items,
            total_price: parseFloat(total.replace(',', '.')),
            date: new Date()
        };

        await users.updateOne(
            { username: username },
            { $push: { order_history: bestellung } }
        );

        res.json({ message: "Bestellung erfolgreich gespeichert!" });
    } catch (err) {
        console.error("❌ Fehler beim Speichern:", err);
        res.status(500).json({ message: "Serverfehler" });
    }
});

// **Starte den Server**


app.get("/getHistory", async (req, res) => {
    const { username } = req.query;

    if (!username) {
        return res.status(400).json({ message: "Username fehlt" });
    }

    try {
        const db = await dbPromise;
        const users = db.collection("users");

        const user = await users.findOne({ username });
        if (!user || !user.order_history) {
            return res.json([]);
        }

        res.json(user.order_history);
    } catch (err) {
        console.error("❌ Fehler beim Laden der Bestellhistorie:", err);
        res.status(500).json({ message: "Serverfehler" });
    }
});
app.listen(PORT, () => {
    console.log(` Server läuft auf http://localhost:${PORT}`);
});