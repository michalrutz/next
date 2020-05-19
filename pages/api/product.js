import connectDb from "../../utils/connectDb";
connectDb();
import Product from "../../models/Product";
import errorHandler from "../../utils/errorHandler";
import catchAsync from "../../utils/catchAsync";

const fs = require("fs");
const multer = require("multer");
const sharp = require("sharp");
//OPT -> STORAGE

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await handleGetRequest(req, res);
      break;
    case "POST":
      await handlePostRequest(req, res);
      break;
    case "DELETE":
      await deleteProduct(req, res);
      break;
    default:
      break;
  }
};

const handleGetRequest = async (req, res) => {
  const product = await Product.findById(req.query._id);
  res.status(200).json(product);
};

const upload = multer();

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

const handlePostRequest = async (req, res) => {
  try {
    const data = JSON.parse(req.body);
    console.log("DATA -> ", data);
    const product = await Product.create(data.product);
    res.status(200).json(product);
  } catch (err) {
    errorHandler(res, err);
  }
};

// const product = await Product.create(JSON.parse(req.body));

//OPT -> FILTER
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image")) {
//     cb(null, true);
//   } else {
//     cb(new AppError("Not an image! Please upload only images.", 400), false);
//   }
// };
// //1 UPLOAD
// const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter
// });
// upload.single("photo");
// //SET FILE NAME
// const filename = `user-photo-${req.query._id}.jpeg`;
// //2 RESIZE
// async (req, res, next) => {
//   if (req.file || req.files) {

//     await sharp(req.file.buffer)
//       .resize(500, 500)
//       .toFormat("jpeg")
//       .jpeg({ quality: 90 })
//       .toFile(
//         path.join(
//           __dirname,
//           `/public/img/users/${filename}` // file or body???
//         )
//       );
//   }
// };

// const product = await Product.create(req.body);
// console.log(product);
// res.status(201).json(product);
//   res.status(201).json({});
// };

const deleteProduct = async (req, res) => {
  const _id = req.query._id
  await Product.findByIdAndDelete(_id);
  // delete the local file
  const path = `${process.env.ROOT}/public/img/products/productImage-${_id}.jpeg`
  if(fs.existsSync(path)){
    fs.unlink(path, (err) => {
      if (err) throw err;
      console.log("successfully deleted " + path);
    });
  }
  res.status(204).json({ success: "successfully deleted " + _id + "!" });
};
