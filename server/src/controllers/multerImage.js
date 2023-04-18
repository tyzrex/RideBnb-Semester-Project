import multer from 'multer';

//initializing multer to upload images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../../../client/public/uploads/')
    },
    filename: function (req, file, cb) {
      cb(null,Date.now()+file.originalname)
    }
})

const upload = multer({ storage: storage })

//end point for uploading images
export const uploadImage = (req, res) => {
    upload.single('file');
    const file = req.file;
    console.log(file);
    if(!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return error;
    }
    res.status(200).json(file.filename)
}