const jwt = require("jsonwebtoken");
const config = require("../Utils/Configuracion").load();
const log = require("../Utils/Log");

const { Generico } = require("../Entities/Genericos");
const { ROLES } = require("../Entities/Auth");

// ==================================
// VERIFICAR TOKEN
// ==================================

exports.verificaToken = (req, res, next) => {
  let retorno = new Generico();
  let token = req.get("token");

  if (token) {
    token = token.split("Bearer  ")[1];

    jwt.verify(token, config.SESION.tokenSecret, (err, decoded) => {
      let sourceReq = req.useragent.source;

      if (err || decoded.source != sourceReq) {
        retorno.set(false, 401, `Token inválido`);

        log.normal(retorno, true, true);
        return res.status(retorno.Status).json(retorno);
      }

      req.usuario = decoded.usuario;
      next();
    });
  } else {
    retorno = retorno.set(false, 401, "Token inválido");
    return res.status(retorno.Status).json(retorno);
  }
};

// ==================================
// VERIFICAR ROLES
// ==================================
exports.SUPER_ADMINISTRADOR = (req, res, next) => {
  if (req.usuario.RolId === ROLES.SUPER_ADMINISTRADOR) {
    next();
  } else {
    let retorno = new Generico();
    retorno = retorno.set(false, 401, "No tiene permisos");
    return res.status(retorno.Status).json(retorno);
  }
};

exports.ADMINISTRADOR = (req, res, next) => {
  console.log(req.usuario);

  if (req.usuario.RolId === ROLES.SUPER_ADMINISTRADOR || req.usuario.RolId === ROLES.ADMINISTRADOR) {
    next();
  } else {
    let retorno = new Generico();
    retorno = retorno.set(false, 401, "No tiene permisos");
    return res.status(retorno.Status).json(retorno);
  }
};

exports.EMPLEADO = (req, res, next) => {
  if (req.usuario.RolId === ROLES.SUPER_ADMINISTRADOR ||
    req.usuario.RolId === ROLES.ADMINISTRADOR ||
    req.usuario.RolId === ROLES.EMPLEADO) {
    next();
  } else {
    let retorno = new Generico();
    retorno = retorno.set(false, 401, "No tiene permisos");
    return res.status(retorno.Status).json(retorno);
  }
};

exports.CLIENTE = (req, res, next) => {
  if (req.usuario.RolId === ROLES.CLIENTE) {
    next();
  } else {
    let retorno = new Generico();
    retorno = retorno.set(false, 401, "No tiene permisos");
    return res.status(retorno.Status).json(retorno);
  }
};
