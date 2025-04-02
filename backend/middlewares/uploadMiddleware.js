const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "products", // Folder name in Cloudinary
    format: async () => "png", // Image format
    public_id: (req, file) => `${Date.now()}-${file.originalname}`, // Unique filename
  },
});

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => cb(null, "uploads/"),
//     filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
//   });

const upload = multer({ storage });

module.exports = upload;
