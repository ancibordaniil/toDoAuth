import { Schema, model } from "mongoose";

interface ITodo {
  title: string;
  completed: boolean;
}

const todoSchema = new Schema<ITodo>(
  {
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default model<ITodo>("Todo", todoSchema);
