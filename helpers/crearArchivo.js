const fs = require('fs');

let crearArchivo = (data) => {
	return new Promise( (resolve, reject)  => {
		fs.writeFile(`./preguntas/myjson.json`, data, (err) => {
			if (err)
				reject(err)
			else
				resolve(`preguntas.json`);
		});
	});
}

module.exports = {
	crearArchivo
}