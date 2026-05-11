import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100,
    },
    deadline: {
        type: Date,
    },
    estimatedHours: {
        type: Number,
        min: 0,
        max: 500,
    },
    status: {
        type: String,
        default: "not started",
        enum: ["not started", "in progress", "done"],
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    },
});

const Project = mongoose.model("Project", projectSchema);

export default Project;