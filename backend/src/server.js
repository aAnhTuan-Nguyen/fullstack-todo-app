import express from "express"
import tasksRouter from "./routes/tasksRouter.js"
import { conectToDB } from "./config/db.js"
import dotenv from "dotenv"

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5001

conectToDB()

app.use("/api/tasks", tasksRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
