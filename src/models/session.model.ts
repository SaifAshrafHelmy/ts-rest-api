import mongoose, { InferSchemaType } from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: 'User' },
    valid: { type: Boolean, default: true },
    userAgent: { type: String }

  },
  { timestamps: true }
);




 type Session = InferSchemaType<typeof sessionSchema>;

const Session = mongoose.model("Session", sessionSchema);

export default Session;
