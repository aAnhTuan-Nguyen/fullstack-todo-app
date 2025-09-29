import React from "react"
import TaskEmptyState from "./TaskEmptyState"
import TaskCard from "./TaskCard"

const TaskList = ({ filteredTasks, filter, handleChange }) => {
  if (!filteredTasks || filteredTasks.length === 0) {
    return <TaskEmptyState filter={filter} />
  }

  return (
    <div className="space-y-3">
      {filteredTasks.map((task, index) => (
        <TaskCard
          key={task._id}
          task={task}
          index={index}
          handleChange={handleChange}
        />
      ))}
    </div>
  )
}

export default TaskList
