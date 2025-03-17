const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

// ✅ Get All Todos (Read)
router.get("/", async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ✅ Create Todo (Tambah)
router.post("/", async (req, res) => {
    const todo = new Todo({ task: req.body.task });
    try {
        const newTodo = await todo.save();
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// ✅ Update Todo (Edit)
router.put("/:id", async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            { task: req.body.task, completed: req.body.completed },
            { new: true }
        );
        res.json(updatedTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// ✅ Delete Todo (Hapus)
router.delete("/:id", async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.json({ message: "Todo deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
