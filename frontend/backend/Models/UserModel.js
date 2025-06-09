/*const mongoose = require('mongoose')

 const UserSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
 })

 const UserModel = mongoose.model("users", UserSchema) ///collection name is users
 
 module.exports = UserModel
 */

 const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Your username is required"],
    //unique: true,
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model("users", userSchema);
//module.exports = mongoose.model("User", userSchema);