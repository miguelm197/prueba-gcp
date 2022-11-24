var fs = require("fs");

exports.configuracion = {
  GENERAL: {
    puertoServidor: null,
    rutaLog: null,
    env: null,
  },
  DATABASE: {
    user: null,
    password: null,
    server: null,
    database: null,
    options: {
      enableArithAbort: null,
    },
  },
  SESION: {
    tokenSecret: null,
    tiempo: null,
    tiempoUnidad: null,
  },
};

/**
 * Carga en memoria la configuración del sistema (Se debe correr al inicio del hilo)
 */
exports.load = function () {
  configuracion = leerArchivoConfiguracion();

  if (process.env.PORT) configuracion.GENERAL.puertoServidor = process.env.PORT;
  if (process.env.NODE_ENV) configuracion.GENERAL.env = process.env.NODE_ENV;

  return configuracion;
};

/**
 * Accede al fichero de configuración "/config.json" y retorna un objeto
 */
function leerArchivoConfiguracion() {
  try {
    var archivoConfiguracion = {};
    let cjson = fs.readFileSync(__dirname + "/../config.json");
    archivoConfiguracion = JSON.parse(cjson);
  } catch (e) {
    if (e.toString().indexOf("SyntaxError") >= 0) {
      console.log("ERROR en el formato del archivo './config'");
      return 0;
    } else {
      console.log("No se pudo leer el archivo de configuración.");
    }
  }
  return archivoConfiguracion;
}
