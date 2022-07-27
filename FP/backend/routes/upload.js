const multer = require("multer");
const { Router } = require("express");
const router = Router();
const uploadController = require("../controllers/upload");

const storage = multer.diskStorage({
  destination: "assets/pics/",
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}.jpg`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 2, // 2 MB
  },
  fileFilter: (req, file, callback) => {
    if (["image/jpg", "image/jpeg", "image/png"].includes(file.mimetype)) {
      callback(null, true);
    } else {
      return callback(new Error("bad request"));
    }
  },
});

router.post("/picture", upload.single("file"), uploadController.upload);

module.exports = router;
