require('./config/config');
const express = require('express');

const app = express();

var bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//requerir ruteo de preguntas
app.use( require('./routes/preguntas') );

app.listen(process.env.PORT, () => {
	console.log('Escuchando puerto: ', 3001);
});