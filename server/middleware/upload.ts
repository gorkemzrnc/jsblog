import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Yükleme klasörü
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Benzersiz dosya adı
  }
});

export const uploadImages = multer({ storage }).fields([
  { name: 'thumbnailImage', maxCount: 1 }, 
  { name: 'postImages', maxCount: 10 },
  { name: 'profileImage', maxCount: 1 }
]);