import { Schema, model } from "mongoose";

interface ITodo {
    userId: { type: Schema.Types.ObjectId; ref: "User"; required: true };
    title: string;
    completed: boolean;
}

const todoSchema = new Schema<ITodo>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        title: { type: String, required: true },
        completed: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const Todo = model<ITodo>("Todo", todoSchema);

export default Todo;
