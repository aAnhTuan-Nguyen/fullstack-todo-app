import { Circle } from "lucide-react"
import React from "react"
import { Card } from "./ui/card"

const TaskEmptyState = ({ filter }) => {
  return (
    <Card className="p-8 text-center border-0 bg-gradient-card shadow-custom-sm">
      <div className="space-y-3">
        <Circle className="mx-auto h-10 w-10 text-muted-foreground" />
        <div>
          <h3 className="font-medium text-foreground">
            {filter === "active"
              ? "Không có công việc đang hoạt động"
              : filter === "complete"
              ? "Không có công việc đã hoàn thành"
              : "Không có công việc nào"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {filter === "active"
              ? "Hãy thêm công việc mới để bắt đầu làm việc."
              : filter === "complete"
              ? "Hoàn thành công việc để chúng hiển thị ở đây."
              : "Hãy thêm công việc mới để bắt đầu làm việc."}
          </p>
        </div>
      </div>
    </Card>
  )
}

export default TaskEmptyState
