import React from "react"

const TaskList = () => {
  let filter = "ALL" // ALL | ACTIVE | COMPLETE
  const tasks = [
    {
      _id: "1",
      title: "học next",
      status: "active",
      completedAt: null,
      createdAt: "2025-09-27T05:31:16.654Z",
    },
    {
      _id: "2",
      title: "học react",
      status: "active",
      completedAt: null,
      createdAt: "2025-09-27T05:28:17.368Z",
    },
  ]

  return <div className="space-y-4"></div>
}

export default TaskList
