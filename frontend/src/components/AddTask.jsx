import React, { useState } from "react"
import { Card } from "./ui/card"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Plus } from "lucide-react"
import { toast } from "sonner"
import api from "@/lib/axios"

const AddTask = ({ handleNewTaskAdded }) => {
  const [newTask, setNewTask] = useState("")

  const addTask = async () => {
    if (newTask.trim()) {
      try {
        await api.post("/tasks", {
          title: newTask,
        })
        toast.success(`Thêm task "${newTask}" thành công!`)
        handleNewTaskAdded()
        setNewTask("")
      } catch (error) {
        console.error("Lỗi xảy ra khi thêm nhiệm vụ", error)
        toast.error("Thêm task thất bại!")
      }
    } else {
      toast.error("Task không được để trống!")
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addTask()
    }
  }

  return (
    <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          type="text"
          placeholder="to do something..."
          className="h-12 text-base bg-slate-50 sm:flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/20"
          value={newTask}
          onChange={(event) => setNewTask(event.target.value)}
          onKeyPress={handleKeyPress}
        />

        <Button
          variant="gradient"
          size="xl"
          className="px-6"
          onClick={addTask}
          disabled={!newTask.trim()}
        >
          <Plus className="size-5" />
          <span className="font-bold text-[18px]">Thêm</span>
        </Button>
      </div>
    </Card>
  )
}

export default AddTask
