const bcrypt = require("bcrypt");
const { Usuario } = require("../Entities/Usuario");
const DAL_Usuarios = require("../DataAccess/DAL_Usuarios");

exports.AltaUsuario = async (usuario) => {
  let usr = new Usuario(usuario);

  // Encriptación de password
  usr.Password = bcrypt.hashSync(usuario.Password, 10);

  // Validar existencia de email
  let usuarioBD = await DAL_Usuarios.ObtenerUsuarioPorEmail(usr.Email);

  if (usuarioBD.Error) return { ok: false, error: usuarioBD.Error };
  if (usuarioBD.Cant > 0) return { ok: false, error: false, existe: true };

  // Crear usuario
  let newUsuario = await DAL_Usuarios.AltaUsuario(usr);

  if (newUsuario.Error) return { ok: false, error: newUsuario.Error };

  if (newUsuario.Cant > 0) return { ok: true, data: { ...usr, Password: "" } };
  else return { ok: false };
};

exports.ObtenerUsuarios = async () => {
  let usrsBD = await DAL_Usuarios.ObtenerUsuarios();

  if (usrsBD.Error) return { ok: false, error: usrsBD.Error };
  else return { ok: true, data: usrsBD.Data };
};

exports.ObtenerUsuarioPorId = async (id) => {
  let usrsBD = await DAL_Usuarios.ObtenerUsuarioPorId(id);

  if (usrsBD.Error) return { ok: false, error: usrsBD.Error };
  else return { ok: true, data: usrsBD.Data };
};

exports.EditarUsuario = async (usuario) => {
  let usr = new Usuario(usuario);

  // Validar existencia de usuario
  let usuarioBD = await DAL_Usuarios.ObtenerUsuarioPorId(usr.Id);
  if (usuarioBD.Error) return { ok: false, error: usuarioBD.Error };
  if (usuarioBD.Cant == 0) return { ok: false, error: false, noExiste: true };

  // Validar existencia de email
  let usuarioBDE = await DAL_Usuarios.ObtenerUsuarioPorEmail(usr.Email);
  if (usuarioBDE.Error) return { ok: false, error: usuarioBDE.Error };
  if (usuarioBDE.Cant > 0 && usuarioBDE.Id != usuarioBD.Id) return { ok: false, error: false, existeEmail: true };

  // Ignorar el cambio de password en caso de que viaje
  usr.Password = usuarioBD.Password;

  // Editar usuario
  let editUsuario = await DAL_Usuarios.EditarUsuario(usr);
  if (editUsuario.Error) return { ok: false, error: editUsuario.Error };

  if (editUsuario.Cant > 0) return { ok: true, data: { ...usr, Password: "" } };
  else return { ok: false };
};

exports.DesactivarUsuario = async (id) => {

  // Validar existencia de usuario
  let usuarioBD = await DAL_Usuarios.ObtenerUsuarioPorId(id);
  if (usuarioBD.Error) return { ok: false, error: usuarioBD.Error };
  if (usuarioBD.Cant == 0) return { ok: false, error: false, noExiste: true };

  // Desactivar usuario
  let desaUsuario = await DAL_Usuarios.DesactivarUsuario(id);
  if (desaUsuario.Error) return { ok: false, error: desaUsuario.Error };

  return { ok: true, data: usuarioBD.Data };

};