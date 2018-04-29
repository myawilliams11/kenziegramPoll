const express = require('express');
const fs = require ('fs');
const multer = require('multer');
const upload = multer({ dest: 'public/uploads' })
const port = 3000;
const app = express();
const uploaded_files = [];

app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(express.static('public/uploads/'));


app.get('/', (req, res) => {
    const path = './public/uploads';
    fs.readdir(path, function(err,items) {
        console.log(items);

        res.render('index', { 
            images: items 
        });
    });
});


app.post('/upload', upload.single('myFile'), function (req, res, next) {
    // req.file is the `myFile` file
    // req.body will hold the text fields, if there were any
    console.log("Uploaded: " + req.file.filename);
    uploaded_files.push(req.file.filename);
    timestamp: Date.now()
    res.send('<a href="/">Upload Form</a>');

    for (let i = 0; i < uploadedImages.length; i++) {
        if (uploadedImages[i].timestamp > req.body.after) {
            newImages.images.push(uploadedImages[i].image);
        }
    }


    // res.setHeader("Location", "http://localhost:3000/home")
  })

app.listen(port);

// still need to add some type of image fetch and timeout

