import sharp from "sharp";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const imageSharpMiddleware = (size = 100) => {
  return async (req, res, next) => {
    if (!req.file) {
      return next();
    }

    const outputDir = `uploads/images/`;

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const fileName = uuidv4() + ".webp";
    const outputPath = path.join(outputDir, fileName);

    try {
      await sharp(req.file.buffer)
        .resize(size, size, { fit: "cover" })
        .webp({ quality: 80 })
        .toFile(outputPath);

      req.file.processedPath = outputPath;
      req.file.filename = fileName;
      
      delete req.file.buffer;

      next();
    } catch (err) {
      next(err);
    }
  };
};

export default imageSharpMiddleware;