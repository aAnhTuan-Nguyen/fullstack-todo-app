import express from "express"
import tasksRouter from "./routes/tasksRouter.js"
import { conectToDB } from "./config/db.js"
import dotenv from "dotenv"
import cors from "cors"

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5001

// Middleware
app.use(express.json()) // Middleware để phân tích JSON trong body của request
app.use(
  cors({
    origin: "http://localhost:5173", // Vite dev server port
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
) // cho phép tất cả origins (chỉ dùng trong dev)

//
app.use("/api/tasks", tasksRouter)

conectToDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
})
