const { DataBaseResult } = require("../Entities/Genericos");
const { DBACCESS } = require("./executer");
const { UsuarioBD } = require("../Entities/TablasBD");

exports.AltaUsuario = async (usuario) => {
  let res = new DataBaseResult();
  let usr = new UsuarioBD(usuario);

  let queryDB = `
    INSERT INTO USUARIOS (Nombre, Email, Password, RolId, Telefono, Telefono2, EmailValidado)
    VALUES ('${usr.Nombre}', '${usr.Email}', '${usr.Password}', ${usr.RolId}, '${usr.Telefono}', '${usr.Telefono2}', ${usr.EmailValidado ? 1 : 0} );
    SELECT SCOPE_IDENTITY() AS Id`;

  res = await DBACCESS(queryDB);
  return res;
};

exports.ObtenerUsuarios = async () => {
  let res = new DataBaseResult();

  let queryDB = `SELECT Id, Nombre, Email, Password, EmailValidado, RolId, Telefono, Telefono2, Activo
  FROM USUARIOS `;

  res = await DBACCESS(queryDB);
  return res;
};

exports.ObtenerUsuarioPorEmail = async (email) => {
  let res = new DataBaseResult();

  let queryDB = `SELECT Id, Nombre, Email, Password, EmailValidado, RolId, Telefono, Telefono2, Activo
  FROM USUARIOS WHERE Email = '${email}' `;

  res = await DBACCESS(queryDB);
  return res;
};

exports.ObtenerUsuarioPorId = async (id) => {
  let res = new DataBaseResult();

  let queryDB = `SELECT Id, Nombre, Email, Password, EmailValidado, RolId, Telefono, Telefono2, Activo
  FROM USUARIOS WHERE Id = ${id}`;

  res = await DBACCESS(queryDB);
  return res;
};

exports.EditarUsuario = async (usuario) => {
  let res = new DataBaseResult();
  let usr = new UsuarioBD(usuario);

  let queryDB = `
    UPDATE USUARIOS SET
      Nombre = '${usr.Nombre}',
      Email = '${usr.Email}',
      Rolid = ${usr.RolId},
      Telefono = '${usr.Telefono}',
      Telefono2 = '${usr.Telefono2}',
      Activo = ${usr.Activo ? 1 : 0}
    WHERE Id = ${usr.Id};

    SELECT SCOPE_IDENTITY() AS Id
  `;

  res = await DBACCESS(queryDB);
  return res;
}

exports.DesactivarUsuario = async (id) => {
  let res = new DataBaseResult();

  let queryDB = `
    UPDATE USUARIOS SET Activo = 0
    WHERE Id = ${id};
  `;

  res = await DBACCESS(queryDB);
  return res;
}

// TODO: BorrarUsuario
