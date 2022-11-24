const { DataBaseResult } = require("../Entities/Genericos");
const { Entidad } = require("../Entities/Entidad");
const { DBACCESS } = require("./executer");

exports.AltaEntidad = async (entidad) => {
  let res = new DataBaseResult();
  let ent = new Entidad(entidad);

  let queryDB = `
    INSERT INTO ENTIDADES (Nombre, Email, Telefono, Telefono2)
    VALUES ('${ent.Nombre}', '${ent.Email ? ent.Email : ""}', ${ent.Telefono ? ent.Telefono : "NULL"}, ${
    ent.Telefono2 ? ent.Telefono2 : "NULL"
  })
    SELECT SCOPE_IDENTITY() AS Id`;

  res = await DBACCESS(queryDB);

  return res;
};

exports.ObtenerEntidadPorEmail = async (email) => {
  let res = new DataBaseResult();

  let queryDB = `SELECT * FROM ENTIDADES WHERE Email = '${email}'`;

  res = await DBACCESS(queryDB);
  return res;
};

exports.EditarEntidad = async (entidad) => {
  let res = new DataBaseResult();
  let ent = new Entidad(entidad);
console.log("ENTIDAD", ent)
  let queryDB = ` UPDATE Entidades SET
      Nombre = '${ent.Nombre}', Email = '${ent.Email}',
      Telefono = '${ent.Telefono}',Telefono2 = '${ent.Telefono2}'
      
      WHERE Id = ${ent.Id};
      SELECT SCOPE_IDENTITY() AS Id`;

  res = await DBACCESS(queryDB);
  return res;
};

// TODO: ObtenerEntidades

// TODO: EditarEntidad

// TODO: BajaEntidad
