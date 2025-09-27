import Task from "../models/Task.js"

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: "descending" }) // createdAt: -1 giarm dần
    res.status(200).json(tasks)
  } catch (error) {
    console.error("Error fetching tasks:", error)
    res.status(500).json({ message: "Server error" })
  }
}

export const createTask = async (req, res) => {
  try {
    const { title } = req.body
    const task = new Task({ title })
    const newTask = await task.save()
    res.status(201).json(newTask)
  } catch (error) {
    console.error("Error creating task:", error)
    res.status(500).json({ message: "Server error" })
  }
}

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params
    const { title, status } = req.body

    const existingTask = await Task.findById(id)
    if (!existingTask) {
      return res.status(404).json({ message: "Task not found" })
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      {
        title: title || existingTask.title,
        status: status || existingTask.status,
        completedAt: status === "complete" ? new Date() : null,
      },
      { new: true } // Trả về document đã được update, nếu ko có thì trả về document cũ
    )

    res.status(200).json(updatedTask)
  } catch (error) {
    console.error("Error updating task:", error)
    res.status(500).json({ message: "Server error" })
  }
}

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params
    const deletedTask = await Task.findByIdAndDelete(id)
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" })
    }
    res.status(200).json({ message: "Task deleted" })
  } catch (error) {
    console.error("Error deleting task:", error)
    res.status(500).json({ message: "Server error" })
  }
}
