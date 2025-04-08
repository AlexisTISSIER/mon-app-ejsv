const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('home', { titre: 'Accueil', message: 'Bienvenue sur la page d\'accueil !' });
});

app.get('/about', (req, res) => {
  res.render('about', { auteur: 'alexis tissier', date: new Date().toLocaleDateString() });
});

app.get('/contact', (req, res) => {
  res.render('contact', { email: 'contact@exemple.com', telephone: '0123456789' });
});

app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});
