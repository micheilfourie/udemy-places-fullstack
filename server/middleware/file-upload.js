import multer from "multer";
import { v4 as uuidv4 } from 'uuid';

const mimeTypeMap = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const fileUpload = multer({
  limits: 500000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/images");
    },
    filename: (req, file, cb) => {
      const ext = mimeTypeMap[file.mimetype];
      cb(null, uuidv4() + "." + ext);
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!mimeTypeMap[file.mimetype];
    const error = isValid ? null : new Error("Invalid mime type!");
    
    cb(error, isValid);
  },
});

export default fileUpload;
