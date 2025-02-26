import { Schema, model, Document } from "mongoose";

interface ICourse extends Document {
  title: string;
  description: string;
  lecturer: Schema.Types.ObjectId;
  students: Schema.Types.ObjectId[];
}
const CourseSchema = new Schema<ICourse>({
  title: { type: String, required: true },
  description: { type: String },
  lecturer: { type: Schema.Types.ObjectId, ref: "User", required: true },
  students: [{ type: Schema.Types.ObjectId, ref: "User" }],
});
const Course = model<ICourse>("Course", CourseSchema);

export { Course };
