// client side

const express = require('express');
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: 'public/uploads' })
const port = process.env.port || 3000;
const app = express();
const uploadPath = './public/uploads';
const path = require('path');
const uploaded_files = [];

const responseData = {
    images: [],
    timestamp: 0
};


app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(express.static('public/uploads/'));
app.use(express.json());


app.get('/', (req, res) => {

    fs.readdir(uploadPath, function (err, items) {
        // console.log(items);

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
    res.send('<a href="/">Upload Form</a>');


    // res.setHeader("Location", "http://localhost:3000/home")
})


app.post('/latest', (req, res) => {
 
    fs.readdir(uploadPath, (err, images) => {
        responseData.images = [];
        for (let i in images) {
            let image = images[i];
            let imagePath = path.join(uploadPath, image);
            let modified = fs.statSync(imagePath).mtimeMs;
            responseData.timestamp = modified;

           if (modified > req.body.after) {
            responseData.images.push(image);
            if(modified > responseData.timestamp){
                responseData.timestamp = modified;
            }
           }

        }
        res.send(responseData);
        console.log(responseData);

    });
});

// still need to add some type of image fetch and timeout

app.listen(port, () => {
    console.log(`Server now running on http://localhost:${port}`)
});