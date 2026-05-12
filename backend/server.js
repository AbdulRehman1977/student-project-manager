import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import projectRoutes from "./routes/projectRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use("/api/projects", projectRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/tasks", taskRoutes);


//test route
app.get("/", (req,res) => {
    res.send("Api is running..");
})

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})