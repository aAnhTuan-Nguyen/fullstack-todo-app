import express from "express"
import tasksRouter from "./routes/tasksRouter.js"
import { conectToDB } from "./config/db.js"
import dotenv from "dotenv"
import cors from "cors"
import path from "path"
dotenv.config()
const app = express()
const PORT = process.env.PORT || 5001

const __dirname = path.resolve()

// Middleware
app.use(express.json()) // Middleware để phân tích JSON trong body của request
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173", // Vite dev server port
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    })
  )
}
//
app.use("/api/tasks", tasksRouter)

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")))

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
  })
}

conectToDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
})
