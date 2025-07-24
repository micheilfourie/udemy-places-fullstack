import multer from "multer";

const fileUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const isValid = ["image/jpeg", "image/png", "image/jpg"].includes(file.mimetype);
    cb(isValid ? null : new Error("Invalid mime type"), isValid);
  },
});

export default fileUpload;
