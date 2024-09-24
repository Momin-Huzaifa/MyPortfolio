import mongoose from "mongoose";
// import validator from "validator";

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    // validate(value) {
    //   if (!validator.isEmail(value)) {
    //     throw new Error("Invalid Email id");
    //   }
    // },
  },
  message: {
    type: String,
    required: true,
  }
});



// We need a collections

const User = mongoose.model("User",userSchema);

export default User