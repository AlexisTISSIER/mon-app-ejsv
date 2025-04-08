const express = require('express');
const app = express();
const port = 3000;
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  }
});

const upload = multer({ storage: storage });

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('home', { titre: 'Accueil', message: 'Bienvenue sur la page d\'accueil !' });
});

app.get('/about', (req, res) => {
  res.render('about', { auteur: 'alexis tissier', date: new Date().toLocaleDateString() });
});

app.get('/contact', (req, res) => {
    res.render('contact', { email: 'contact@exemple.com', telephone: '0123456789', nom: null, message: null });
  });
  
  app.post('/contact', upload.single('fichier'), (req, res) => {
    const { nom, message } = req.body;
    const fichier = req.file;
  
    res.render('contact', {
      email: 'contact@exemple.com',
      telephone: '0123456789',
      nom,
      message,
      fichier: fichier ? fichier.originalname : null
    });
  });
  

app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});
