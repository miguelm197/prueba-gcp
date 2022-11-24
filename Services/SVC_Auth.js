const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../Utils/Configuracion").load();

const DAL_Usuarios = require("../DataAccess/DAL_Usuarios");
const { Usuario } = require("../Entities/Usuario");
const { ROLES } = require("../Entities/Auth");

exports.Login = async (credenciales, req) => {
  let usuarioBD = await DAL_Usuarios.ObtenerUsuarioPorEmail(credenciales.Email);
  if (usuarioBD.Error) return { ok: false, error: usuarioBD.Error };

  // Validar existencia de usuario
  if (usuarioBD.Cant == 0) return { ok: false, noExiste: true };

  let usuario = new Usuario(usuarioBD.Data[0]);

  // Validar contraseña
  let validacionPass = bcrypt.compareSync(credenciales.Password, usuario.Password);
  if (!validacionPass) return { ok: false, errorPassword: true };

  // Validar si el mail está validado
  if (!usuario.EmailValidado) return { ok: false, emailNoValidado: true };

  // Validar ROL
  if (usuario.RolId === ROLES.SUPER_ADMINISTRADOR || usuario.RolId === ROLES.ADMINISTRADOR || usuario.RolId === ROLES.EMPLEADO)
    return { ok: false, sinPermiso: true };

  // Generación del token
  let token = jwt.sign(
    {
      usuario,
      fecha: new Date(),
      env: "WEB",
      source: req.useragent.source,
    },
    config.SESION.tokenSecret,
    {
      expiresIn: config.SESION.fullTiempo,
    }
  );

  console.log("\nTOKEN", token, "\n");

  return { ok: true, token };
};

exports.LoginBO = async (credenciales, req) => {
  let usuarioBD = await DAL_Usuarios.ObtenerUsuarioPorEmail(credenciales.Email);
  if (usuarioBD.Error) return { ok: false, error: usuarioBD.Error };
  
  // Validar existencia de usuario
  if (usuarioBD.Cant == 0) return { ok: false, noExiste: true };

  let usuario = new Usuario(usuarioBD.Data[0]);

  console.log("USUARIO", usuario);

  // Validar contraseña
  let validacionPass = bcrypt.compareSync(credenciales.Password, usuario.Password);
  if (!validacionPass) return { ok: false, errorPassword: true };

  // Validar si el mail está validado
  if (!usuario.EmailValidado) return { ok: false, emailNoValidado: true };

  // Validar ROL
  if (usuario.RolId === ROLES.CLIENTE) return { ok: false, sinPermiso: true };

  // Generación del token
  let token = jwt.sign(
    {
      usuario,
      fecha: new Date(),
      env: "BO",
      source: req.useragent.source,
    },
    config.SESION.tokenSecret,
    {
      expiresIn: config.SESION.fullTiempo,
    }
  );

  console.log("\nTOKEN", token, "\n");

  return { ok: true, token };
};

// Generacion token
