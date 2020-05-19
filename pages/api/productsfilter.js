import connectDb from "../../utils/connectDb";
connectDb();
import Product from "../../models/Product";

export default async (req, res) => {
  const query = req.query;
  console.log(query);
  const products = await Product.find().sort({ [req.query.val]: req.query.order });
  res.status(200).json(products);
};
