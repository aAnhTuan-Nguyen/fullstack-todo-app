//
export const getTasks = (req, res) => {
  res.send("Hello from the backend!")
}

export const createTask = (req, res) => {
  res.status(201).json({ message: "Task created" })
}

export const updateTask = (req, res) => {
  res.status(200).json({ message: "Task updated" })
}

export const deleteTask = (req, res) => {
  res.status(200).json({ message: "Task deleted" })
}
