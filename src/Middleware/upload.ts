// middleware/upload.ts
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req,  file, cb) => {
        cb(null, 'uploads/'); // Save the files in the 'uploads/' directory
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Rename file with timestamp
    }
});

const upload = multer({ 
    storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Images Only!'));
        }
    }
});

export default upload;
