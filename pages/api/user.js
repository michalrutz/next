import User from "../../models/User";
import connectDb from "../../utils/connectDb";

connectDb();

export default async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
};
