import mongoose from "mongoose";

const schemaTareas = new mongoose.Schema( {
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "users",
    },
    },
    {
    timestamps: true,
})

const Tareas = mongoose.model('tareas', schemaTareas)

export default Tareas