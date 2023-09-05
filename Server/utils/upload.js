import multer from 'multer';
import {GridFsStorage} from 'multer-gridfs-storage';

import dotenv from "dotenv";

dotenv.config();

const storage = new GridFsStorage({
    url:"mongodb+srv://"+process.env.MONGODB_USERNAME+":"+process.env.MONGODB_PASSWORD+"@cluster0.zgkfcib.mongodb.net/?retryWrites=true&w=majority",
    options: { useNewUrlParser:true },
    file: (req,file) => {
        const match = ["image/png", "image/jpeg"];
        if(match.indexOf(file.mimeType) === -1){
            return `${Date.now()}-file-${file.originalname}`;
        }
        return {
            bucketName : "photos" , 
            fileName :  `${Date.now()}-file-${file.originalname}`
        }
    }
});

export default multer({storage});