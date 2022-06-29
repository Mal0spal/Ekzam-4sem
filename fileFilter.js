import multer, { diskStorage } from 'multer';
import { extname as _extname } from 'path';


const upload = multer({
    fileFilter: (_req, file, cb) => {
        checkFileType(file, cb);
    }
}).any('name');

export default upload;