import mongoose from "mongoose";

const userSchema = mongoose.Schema({
      username: { type: String },
      password: { type: String}
});

export default mongoose.model("User", userSchema);