//requires
const express = require('express');
const cheerio = require('cheerio');
const request = require('request');
const { crearArchivo } = require('../helpers/crearArchivo');
//crear app
const app = express();

app.get('/preguntas', function (req, resp) {

	let result = [],
		preguntero = {},
		currentdate = new Date(),
		datetime = currentdate.getFullYear()
								+ '-' + (currentdate.getMonth()+1)
								+ '-' + currentdate.getDate()
								+ ' ' + currentdate.getHours()
								+ ':' + currentdate.getMinutes();

	//obtener web
	request('https://www.naranja.com/comercios-amigos' , (err, res, body) => {

		if (!err && res.statusCode === 200) {

			//obtener el body de la web
			let $ = cheerio.load(body);

			//buscar las preguntas y respuestas
			$('dl', 'app-faq-question').each( function () {
				let preguntaConRespuesta = {},
					pregunta = $(this).find('dt').text(),
					respuesta = $(this).find('dd').text();
				preguntaConRespuesta.index = pregunta;
				preguntaConRespuesta.value = respuesta;
				result.push(preguntaConRespuesta);
			});

			//crear el objecto con la estructura solicitada
			preguntero = {
				result: result,
				updated: datetime
			};


			let json = JSON.stringify(preguntero);

			//crear archivo json
			crearArchivo(json)
				.then( (archivo) => {
					resp.json({
						ok: true,
						result
					})
				})
				.catch( (err) => {
					resp.json({
						ok: false
					})
				})
		}
	})

});

module.exports = app;