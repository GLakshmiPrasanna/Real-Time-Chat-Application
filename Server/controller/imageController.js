import grid from 'gridfs-stream';
import mongoose from 'mongoose';

const url = "http://localhost:3001";

let gfs, gridFsBucket;
const connect = mongoose.connection;
connect.once('open', ()=>{
    gridFsBucket = new mongoose.mongo.GridFSBucket(connect.db,{
        bucketName: 'fs'
    });
    gfs = grid(connect.db,mongoose.mongo);
    gfs.collection('fs');
})

export const uploadFile = async (req,res) => {
    if(!req.file){
        return res.status(404).json("File not found");
    }

    const imageUrl = `${url}/file/${req.file.filename}`;

    return res.status(200).json(imageUrl);
}

export const getImage = async (req, res) => {
    try{
        const file = await gfs.files.findOne({filename: req.params.filename});

        const readStream = gridFsBucket.openDownloadStream(file._id);
        readStream.pipe(res);
    }catch(error){
        return res.status(500).json(error.message);
    }
}