require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const todoRoutes = require("./routes/todoRoutes"); // Import routes

// Koneksi MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("🔥 MongoDB Connected!"))
.catch((err) => console.error("❌ MongoDB Connection Error:", err));

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/todos", todoRoutes);

app.get("/", (req, res) => {
    res.send("API berjalan!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🔥 Server berjalan di port ${PORT}`);
});
