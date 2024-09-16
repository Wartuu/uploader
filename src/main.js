const PORT = 7000;
const MB_FILESIZE = 50;
const express = require('express');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const app = express();

const generateRandomString = () => {
  return crypto.randomBytes(3).toString('hex'); // Generates a 6-char hex string
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory where files will be saved
  },
  filename: (req, file, cb) => {
    const randomName = generateRandomString(); // Generate 5 random characters
    const ext = path.extname(file.originalname); // Get the file extension
    cb(null, randomName + ext); // Save file with random name and original extension
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * MB_FILESIZE },
});

app.use(express.static('static'));
app.use('/u', express.static('uploads'));

app.post('/api/v1/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    res.status(400).send('No file providen');
    return;
  }

  const fileUrl = '/u/' + req.file.filename;

  res.redirect(fileUrl);
});

app.listen(PORT, () => {
  console.log('listening at 127.0.0.1:' + PORT);
});
