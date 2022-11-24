const log = require("../Utils/Log");

const SVC_Auth = require("../Services/SVC_Auth");

const { Generico } = require("../Entities/Genericos");

exports.Login = async (req, res) => {
  log.normal("POST - Login /Login", true);

  let body = req.body;
  let retorno = new Generico();

  // Validar parámetros
  if (!body.Email) retorno.set(false, 406, "El email es requerido");
  if (!body.Password) retorno.set(false, 406, "La password es requerida");

  if (retorno.Error) {
    log.normal(retorno, true, true);
    return res.status(retorno.Status).json(retorno);
  }

  // Login
  let login = await SVC_Auth.Login(body, req);

  if (login.error) retorno.set(false, 500, "Ha ocurrido un error");
  if (login.noExiste) retorno.set(false, 400, "Usuario o contraseña incorrectos");
  if (login.errorPassword) retorno.set(false, 400, "Usuario o contraseña incorrectos");
  if (login.emailNoValidado) retorno.set(false, 400, "El email '" + body.Email + "' no ha sido validado.");
  if (login.sinPermiso) retorno.set(false, 401, "El usuario no tiene permisos.");
  if (login.ok) retorno.set(true, 200, "Usuario logueado correctamente.");

  retorno.Token = login.token;

  return res.status(retorno.Status).json(retorno);
};

exports.LoginBO = async (req, res) => {
  log.normal("POST - LoginBO /api/LoginBO", true);

  let body = req.body;
  let retorno = new Generico();

  // Validar parámetros
  if (!body.Email) retorno.set(false, 406, "El email es requerido");
  if (!body.Password) retorno.set(false, 406, "La password es requerida");

  if (retorno.Error) {
    log.normal(retorno, true, true);
    return res.status(retorno.Status).json(retorno);
  }

  // Login
  let login = await SVC_Auth.LoginBO(body, req);

  if (login.error) retorno.set(false, 500, "Ha ocurrido un error");
  if (login.noExiste) retorno.set(false, 401, "Usuario o contraseña incorrectos");
  if (login.errorPassword) retorno.set(false, 401, "Usuario o contraseña incorrectos");
  if (login.emailNoValidado) retorno.set(false, 400, "El email '" + body.Email + "' no ha sido validado.");
  if (login.sinPermiso) retorno.set(false, 401, "El usuario no tiene permisos.");
  if (login.ok) retorno.set(true, 200, "Usuario logueado correctamente.");

  retorno.Token = login.token;

  return res.status(retorno.Status).json(retorno);
};
