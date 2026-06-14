const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} = require("../controllers/taskController");


// GET all tasks
router.get("/", authMiddleware, getTasks);


// CREATE task
router.post("/", authMiddleware, createTask);


// UPDATE task
router.put("/:id", authMiddleware, updateTask);


// DELETE task
router.delete("/:id", authMiddleware, deleteTask);


module.exports = router;