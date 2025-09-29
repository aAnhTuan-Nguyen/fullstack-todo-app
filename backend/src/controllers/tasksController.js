import Task from "../models/Task.js"

export const getTasks = async (req, res) => {
  const { filter } = req.query
  const now = new Date()
  let startDate
  if (filter === "today") {
    startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  } else if (filter === "week") {
    const firstDayOfWeek = now.getDate() - now.getDay() // Chủ nhật là ngày đầu tiên trong tuần
    startDate = new Date(now.getFullYear(), now.getMonth(), firstDayOfWeek)
  } else if (filter === "month") {
    startDate = new Date(now.getFullYear(), now.getMonth(), 1)
  } else {
    // all
    startDate = null
  }

  const query = startDate ? { createdAt: { $gte: startDate } } : {}
  try {
    const result = await Task.aggregate([
      { $match: query }, // Lọc theo createdAt nếu có startDate
      {
        $facet: {
          tasks: [{ $sort: { createdAt: -1 } }],
          activeCount: [{ $match: { status: "active" } }, { $count: "count" }],
          completedCount: [
            { $match: { status: "complete" } },
            { $count: "count" },
          ],
        },
      },
    ])
    // result nó trả về 1 mảng có 1 obj
    res.status(200).json({
      tasks: result[0].tasks,
      activeCount: result[0].activeCount[0]?.count || 0,
      completedCount: result[0].completedCount[0]?.count || 0,
    })
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

    const updateData = {
      title: title || existingTask.title,
      status: status || existingTask.status,
      completedAt: status === "complete" ? new Date() : null,
    }

    const updatedTask = await Task.findByIdAndUpdate(id, updateData, {
      new: true, // Trả về document đã cập nhật
    })
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
