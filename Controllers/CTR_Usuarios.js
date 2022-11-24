const { Generico } = require("../Entities/Genericos");
const log = require("../Utils/Log");
const SVC_Usuarios = require("../Services/SVC_Usuarios");

exports.AltaUsuario = async (req, res) => {
  log.normal("POST - AltaUsuario /Usuarios/Alta", true);

  let body = req.body;
  let retorno = new Generico();

  // Validar parámetros
  if (!body.Nombre) retorno.set(false, 406, "El nombre es requerido");
  if (!body.Email) retorno.set(false, 406, "El email es requerido");
  if (!body.Password) retorno.set(false, 406, "El password es requerido");

  if (retorno.Error) {
    log.normal(retorno, true, true);
    return res.status(retorno.Status).json(retorno);
  }

  // Crear usuario
  let newUsuario = await SVC_Usuarios.AltaUsuario(body);

  if (newUsuario.error) retorno.set(false, 500, "Ha ocurrido un error");

  if (newUsuario.existe) retorno.set(false, 400, "El email " + body.Email + " ya está registrado.");
  if (newUsuario.ok) retorno.set(true, 200, "Usuario creado correctamente.", newUsuario.data);

  return res.status(retorno.Status).json(retorno);
};

exports.ObtenerUsuarios = async (req, res) => {
  log.normal("GET - ObtenerUsuarios /Usuarios/Lista", true);
  let retorno = new Generico();

  // Consulta usuarios
  let respUsers = await SVC_Usuarios.ObtenerUsuarios();
  if (respUsers.error) retorno.set(false, 500, "Ha ocurrido un error");

  if (respUsers.ok) {
    retorno.set(true, 200, "Lista de usuarios");
    retorno.Data = respUsers.data;
  }

  return res.status(retorno.Status).json(retorno);
};

exports.ObtenerUsuarioPorId = async (req, res) => {
  log.normal("GET - ObtenerUsuarioPorId /Usuarios/:Id", true);
  let retorno = new Generico();
  let usuarioId = req.params.Id;

  // Consulta usuarios
  let respUser = await SVC_Usuarios.ObtenerUsuarioPorId(usuarioId);
  if (respUser.error) retorno.set(false, 500, "Ha ocurrido un error");

  if (respUser.ok) {
    retorno.set(true, 200, "Información del usuario " + usuarioId);
    retorno.Data = respUser.data;
  }

  return res.status(retorno.Status).json(retorno);
};

exports.EditarUsuario = async (req, res) => {
  log.normal("PUT - EditarUsuario /Usuarios/Editar", true);

  let body = req.body;
  let retorno = new Generico();

  // Validar parámetros
  if (!body.Id) retorno.set(false, 406, "El id es requerido");
  if (!body.Nombre) retorno.set(false, 406, "El nombre es requerido");
  if (!body.Email) retorno.set(false, 406, "El email es requerido");

  if (retorno.Error) {
    log.normal(retorno, true, true);
    return res.status(retorno.Status).json(retorno);
  }

  // Editar usuario
  let editarUsuario = await SVC_Usuarios.EditarUsuario(body);

  if (editarUsuario.error) retorno.set(false, 500, "Ha ocurrido un error");

  if (editarUsuario.noExiste) retorno.set(false, 400, "El usuario que se quiere editar no existe - " + body.Id);
  if (editarUsuario.existeEmail) retorno.set(false, 400, "El email " + body.Email + " ya está registrado.");
  if (editarUsuario.ok) retorno.set(true, 200, "Usuario modificado correctamente.", editarUsuario.data);

  return res.status(retorno.Status).json(retorno);
};

exports.DesactivarUsuario = async (req, res) => {
  log.normal("DELETE - DesactivarUsuario /Usuarios/:Id", true);
  let retorno = new Generico();
  let usuarioId = req.params.Id;

  // Desactivar usuario
  let respDesactivar = await SVC_Usuarios.DesactivarUsuario(usuarioId);
  if (respDesactivar.noExiste) retorno.set(false, 500, "El id " + usuarioId + " no está registrado.");
  if (respDesactivar.error) retorno.set(false, 500, "Ha ocurrido un error");

  if (respDesactivar.ok) {
    retorno.set(true, 200, "Usuario desactivado correctamente ");
    retorno.Data = respDesactivar.data;
  }

  return res.status(retorno.Status).json(retorno);
};
