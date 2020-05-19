var crypto = require("crypto");
var mongoose = require("mongoose");
// var uniqueValidator = require('mongoose-unique-validator');
var bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      minlength: [3, "name is shorter than the minimum allowed length (3)"],
      maxlength: [12, "name is longer than the maximum allowed length (12)"],
      unique: [true, "name must be unique"],
    },
    age: {
      type: Number,
      validate: {
        validator: function(v) {
          return v => 18;
        },
        message: props =>
          `${props.value}, the user must be at least 18 years old!`
      }
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [8, "password is shorter than the minimum allowed length (8)"],
      select: false
    },
    email: {
      type: String,
      required: [true, "email required"],
      unique: [true, "email is must be unique"]
    },
    role: {
      type: String,
      enum: ["admin", "guide", "user"],
      default: "user"
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    passwordChangedAt: Date
  },
  {
    toJSON: { virtuals: true },
    toOject: { virtuals: true }
  }
);



//CHANGE PASSWORD
userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString("hex"); // each time creates a random token

  this.passwordResetToken = crypto //encrypt the token (like the password) saved in the Model
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  // unencrypted token will be send via email and then compared with the saved encrypted version

  return resetToken;
};



export default mongoose.models.User || mongoose.model("User", userSchema);
