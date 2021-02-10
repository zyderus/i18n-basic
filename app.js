const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3500;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


app.get('/test', (req, res) => {

  // read incoming header
  const headerLang = req.headers['accept-language'];
  console.log('headerLang: ', headerLang, ' | ', typeof headerLang);
  // built-in express func to read accept-language header
  const expressLang = req.get('Accept-Language');
  console.log('expressLang: ', expressLang, ' | ', typeof expressLang);

  // built-in func returns array of supported languages
  const acceptsLangs = req.acceptsLanguages();
  console.log('acceptsLangs: ', acceptsLangs, ' | ', typeof acceptsLangs);
  // built-in express func to eval if lang exists. returns string if true, otherwise false
  const matchLangs = req.acceptsLanguages('il');
  console.log('matchLangs: ', matchLangs, ' | ', typeof matchLangs);
  
  // read cookie with function below
  var cookie = getcookie(req);
  console.log('cookie with js: ', cookie);

  res.end();
});


// Route that serves JSON language data based on browser language prefs
app.get('/', getLanguageStrings, (req, res) => {
  console.log(req.languageStrings);
  console.log(req.acceptsLanguages());
  console.log('cookie value: ', req.cookies);
  
  res.render('index', { langstr: req.languageStrings });
});


// Listener
app.listen(port, () => console.log(`server on port ${port}`));

/* ----------------------------------------------------------------------------- */

// Middleware
function getLanguageStrings(req, res, next) {
  const userlang = req.cookies.language;

  if(userlang) {
    req.languageStrings = langstr[userlang];
    return next();
  } else {
    const lang = req.acceptsLanguages('en', 'ru', 'es');
    const selectedLang = lang ? lang : 'en';  // default to english
    req.languageStrings = langstr[selectedLang];
    return next();
  }

}


// DIY cookie-parser
function getcookie(req) {
  var cookie = req.headers.cookie;
  console.log('cookie from func: ', cookie);
  
  // user=someone; session=QyhYzXhkTZawIb5qSl3KKyPVN (this is my cookie i get)
  return cookie.split('; ');
}


// Language JSON
const langstr = {
  en: {
    btn_home: 'Home',
    btn_gallery: 'Gallery',
    btn_aboutus: 'About us', 
    btn_contacts: 'Contacts',
    btn_reset: 'reset',
  },
  ru: {
    btn_home: 'Главная',
    btn_gallery: 'Галерея',
    btn_aboutus: 'О нас', 
    btn_contacts: 'Контакты',
    btn_reset: 'сброс',
  },
  es: {
    btn_home: 'Hogar',
    btn_gallery: 'Galería',
    btn_aboutus: 'Sobre nosotros', 
    btn_contacts: 'Contactos',
    btn_reset: 'reiniciar',
  }
};