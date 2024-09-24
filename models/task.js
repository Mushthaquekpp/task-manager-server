import mongoose from "mongoose";
import moment from "moment-timezone";

const taskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
    dueDate: { type: Date, required: true },
  },
  { timestamps: true }
);

const serverTimezone = moment.tz.guess();

taskSchema.post("save", function (doc) {
  let dueDate = moment(this.dueDate)
    .tz(serverTimezone)
    .format("YYYY-MM-DD HH:mm:ss");
  this.dueDate = dueDate;
});

taskSchema.post("find", function (docs) {
  let dueDate = moment(this.dueDate)
    .tz(serverTimezone)
    .format("YYYY-MM-DD HH:mm:ss");
  this.dueDate = dueDate;
});

const Task = mongoose.model("Task", taskSchema);
export default Task;
