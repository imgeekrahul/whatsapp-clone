import grid from 'gridfs-stream';
import mongoose from 'mongoose';

const url = 'http://localhost:8000'

const con = mongoose.connection;

let gfs, gridFsBucket;
con.once('open', () => {
    gridFsBucket = new mongoose.mongo.GridFSBucket(con.db, {
        bucketName: 'fs'
    });
    gfs = grid(con.db, mongoose.mongo);
    gfs.collection('fs');
})

export const uploadFile = (req, res) => {
    if(!req.file) {
        return res.status(404).json("File not Found");
    }
    console.log("Request : ",req.file);
    const imageUrl = `${url}/file/${req.file.filename}`

    return res.status(200).json(imageUrl);
}

export const getImage = async (req, res) => {
    try {
        const file = await gfs.files.findOne({filename: req.params.filename});
        console.log("Request file: ", file);
        const readStream = gridFsBucket.openDownloadStream(file._id);
        readStream.pipe(res);
    } catch(err) {
        return res.status(500).json(err.message);
    }
}

