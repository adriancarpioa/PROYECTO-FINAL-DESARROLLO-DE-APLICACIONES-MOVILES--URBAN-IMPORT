const multer = require('multer');

const {
    CloudinaryStorage
} = require('multer-storage-cloudinary');

const cloudinary =
require('./cloudinary');

const storage =
new CloudinaryStorage({

    cloudinary,

    params: {

        folder: 'urban-import',

        allowed_formats: [
            'jpg',
            'jpeg',
            'png',
            'webp'
        ],

        transformation: [

            {
                width: 1000,
                crop: 'limit'
            }

        ]

    }

});

module.exports =
multer({

    storage

});