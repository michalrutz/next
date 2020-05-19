import connectDb from "../../utils/connectDb";
import User from "../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import errorHandler from "../../utils/errorHandler";
import AppError from "../../utils/AppError";
connectDb();

export default async (req, res) => {
  const body = JSON.parse(req.body);
  const { email, password } = body;
  console.log(email, password);
  try {
    // 1) check to see if a user exists with the provided email
    const user = await User.findOne({ email }).select("+password");
    console.log(user);
    // 2) --if not, return error
    if (!user) {
      return res.status(404).send("No user exists with that email");
    }
    // 3) check to see if users' password matches the one in db
    const passwordsMatch = await bcrypt.compare(password, user.password);
    // 4) --if so, generate a token
    if (passwordsMatch) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      // 5) send that token to the client
      res.status(200).json({ token: token });
    } else {
      throw new AppError("Passwords do not match", 401);
      //   res.status(401).send("Passwords do not match");
    }
  } catch (error) {
    errorHandler(res, error);
    // res.status(500).send("Error logging in user");
  }
};
