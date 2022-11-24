const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const useragent = require("express-useragent");
const cors = require('cors');

const config = require("./Utils/Configuracion").load();

//ESTO PERMITE RECIBIR PETICIONES FUERA DE ESTE DOMINIO
function perimitirCrossDomain(req, res, next) {
  //en vez de * se puede definir SÓLO los orígenes que permitimos
  // res.setHeader("Access-Control-Allow-Origin", "localhost:4200");
  res.header("Access-Control-Allow-Origin", "*");

  //metodos http permitidos para CORS
  res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader('Access-Control-Allow-Credentials', true);
  
  next();
}



const app = express();
// Parsea application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Habilitar la carpeta public
app.use(express.static(path.resolve(__dirname, "../public")));

app.use(useragent.express());



// Middlewares
app.use(cors());

// Configuración global de rutas
app.use(require("./Router"));

app.get("/api/", function (req, res) {
  res.json("Lotus API");
});
0;

app.listen(config.GENERAL.puertoServidor, () => {
  console.log("Escuchando el puerto " + config.GENERAL.puertoServidor);
  console.log("localhost:" + config.GENERAL.puertoServidor + "/");
});
