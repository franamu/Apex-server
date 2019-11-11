/*
 * Puerto
 */
process.env.PORT = process.env.PORT || 3001;

// Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/*
 * Base de datos
 */
let urlDB;

if (process.env.NODE_ENV === 'dev') {
	urlDB = 'mongodb://localhost:27017/preguntas';
} else {
	urlDB = 'mongodb+srv://fran:1of8aQ1PAcuih7BN@cluster0-k1dhu.mongodb.net/preguntas';
}


process.env.URLDB = urlDB;