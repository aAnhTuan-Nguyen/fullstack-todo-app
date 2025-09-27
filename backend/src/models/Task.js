import mongoose from "mongoose"

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "complete"],
      default: "active",
    },
    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // mongoose will automatically manage createdAt and updatedAt fields
  }
)

// Nó giống Table trong SQL
// Tạo một Model tên "Task" dựa trên taskSchema
const Task = mongoose.model("Task", taskSchema)

export default Task
