import { File as MulterFile } from 'multer'; // Correct import
import { Request } from 'express';

declare global {
    namespace Express {
        interface Request {
            file?: MulterFile; // Correct type for single file
            files?: MulterFile[];
            user?: any; // Correct type for multiple files
        }
    }
}