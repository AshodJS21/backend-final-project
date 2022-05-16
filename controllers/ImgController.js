const fs = require('fs');
const path=require('path');
const {UnsupportedFileType, FileExists, Unauthorized, Forbidden} = require('../errors')

//reading contents of a given directory. 
module.exports = {
    getAll: (req, res) => {
    const img = fs.readdirSync(path.join('public','img'))
    res.json({img})
    },
    
    //format of a file img
    upload: (req, res) => {
        if(req.user.userRole == 'client') { throw new Unauthorized } 
        if(!req.files.image.mimetype.startsWith('img/')){ 
            throw new UnsupportedFileType('only img are available') 
        }
        // check if a file already exists
    if(fs.existsSync(path.join('public','img', req.files.img.name))){
        throw new FileExists(req.files.img.name)
    }

    //copy a file from the source path to destination path
    fs.copyFileSync(req.files.image.tempFilePath, path.join('public','img', req.files.img.name))
    
    res.json({message: 'img uploaded'})
        }
    }