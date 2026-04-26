import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required : true,
    },
    deadline: {
        type: Date,
    },
    estimatedHours: {
        type: Number,
    },
    status: {
        type: String,
        default: "not started",
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    },
});

const Project = mongoose.model("Project", projectSchema);

export default Project;