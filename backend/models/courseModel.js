import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    courseCode: {
        type: String,
        required: true,
    },
    instructorName: {
        type: String,
        required: true,
    },
});

const Course = mongoose.model("Course", courseSchema);

export default Course;