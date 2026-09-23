import mongoose, { Schema } from "mongoose";
import { Types } from "mongoose";

export const noteSchema = new Schema({
    title: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return v !== v.toUpperCase();
            },
            message: "Title must not be entirely uppercase!"
        }
    },
    content: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user", 
        required: true
    }
}, { timestamps: true})

export const NoteModel = mongoose.model("note", noteSchema);
