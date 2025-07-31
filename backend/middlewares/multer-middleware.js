import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); 
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = file.originalname.split('.')[0];
    const extension = path.extname(file.originalname);
    cb(null, `${filename}-${uniqueSuffix}${extension}`); 
  }
});

export const upload = multer({ storage });
