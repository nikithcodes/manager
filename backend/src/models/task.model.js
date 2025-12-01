import mongoose,{Schema} from "mongoose";

const taskSchema = new Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    category: { 
        type: String,
        required: true,
        enum: ['Work', 'Personal', 'Urgent', 'Other']
    },
    dueDate: {
        type: Date,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
},{
    timestamps:true
})

export const Task = mongoose.model("Task", taskSchema);