const { DataBaseResult } = require("../Entities/Genericos");
const { DBACCESS } = require("./executer");
const { Proveedor } = require("../Entities/Proveedor");

exports.AltaProveedor = async (proveedor) => {
  let res = new DataBaseResult();
  let prov = new Proveedor(proveedor);

  let queryDB = ` INSERT INTO Proveedores (EntidadId, EmpresaId, Codigo)
      VALUES (${prov.EntidadId}, ${prov.EmpresaId ? prov.EmpresaId : "NULL"}, '${prov.Codigo ? prov.Codigo : ""}');
      SELECT SCOPE_IDENTITY() AS Id`;

  res = await DBACCESS(queryDB);
  return res;
};

exports.ObtenerProveedorPorIdEntidad = async (idEntidad) => {
  let res = new DataBaseResult();

  let queryDB = `SELECT * FROM Proveedores WHERE EntidadId = ${idEntidad}`;

  res = await DBACCESS(queryDB);
  return res;
};

exports.ObtenerProveedorPorCodigo = async (codigoProveedor) => {
  let res = new DataBaseResult();

  let queryDB = `SELECT * FROM PROVEEDORES WHERE Codigo = '${codigoProveedor}'`;

  res = await DBACCESS(queryDB);
  return res;
};

exports.ObtenerProveedorPorId = async (idProveedor) => {
  let res = new DataBaseResult();

  let queryDB = `
      SELECT
        EntidadId AS 'entidad_Id', 
        Pro.Id AS 'proveedor_Id',
        Ent.Nombre AS 'entidad_Nombre', 
        Ent.Email AS 'entidad_Email', 
        Pro.Codigo AS 'proveedor_Codigo', 
        Ent.Telefono AS 'entidad_Telefono', 
        Ent.Telefono2 AS 'entidad_Telefono2', 
        Pro.EmpresaId AS 'proveedor_EmpresaId', 
        Pro.Activo AS 'proveedor_Activo',
        Emp.Id AS 'empresa_Id', 
        Emp.Nombre AS 'empresa_Nombre', 
        Emp.RazonSocial AS 'empresa_RazonSocial', 
        Emp.Rut AS 'empresa_Rut', 
        Emp.Direccion AS 'empresa_Direccion', 
        Emp.PaisId AS 'empresa_PaisId', 
        Emp.EstadoId AS 'empresa_EstadoId', 
        Emp.Ciudad AS 'empresa_Ciudad', 
        Emp.Comentario AS 'empresa_Comentario', 
        Emp.Activo AS 'empresa_Activo'
      FROM PROVEEDORES AS Pro 
      INNER JOIN Entidades AS Ent ON Pro.EntidadId = Ent.Id
      LEFT JOIN Empresas AS Emp ON Pro.EmpresaId = Emp.Id
      WHERE Pro.Id = ${idProveedor}`;

  res = await DBACCESS(queryDB);
  return res;
};

exports.ObtenerProveedores = async (soloActivos = false) => {
  let res = new DataBaseResult();

  let queryDB = `
      SELECT
        EntidadId AS 'entidad_Id', 
        Pro.Id AS 'proveedor_Id',
        Ent.Nombre AS 'entidad_Nombre', 
        Ent.Email AS 'entidad_Email', 
        Pro.Codigo AS 'proveedor_Codigo', 
        Ent.Telefono AS 'entidad_Telefono', 
        Ent.Telefono2 AS 'entidad_Telefono2', 
        Pro.EmpresaId AS 'proveedor_EmpresaId', 
        Pro.Activo AS 'proveedor_Activo',
        Emp.Id AS 'empresa_Id', 
        Emp.Nombre AS 'empresa_Nombre', 
        Emp.RazonSocial AS 'empresa_RazonSocial', 
        Emp.Rut AS 'empresa_Rut', 
        Emp.Direccion AS 'empresa_Direccion', 
        Emp.PaisId AS 'empresa_PaisId', 
        Emp.EstadoId AS 'empresa_EstadoId', 
        Emp.Ciudad AS 'empresa_Ciudad', 
        Emp.Comentario AS 'empresa_Comentario', 
        Emp.Activo AS 'empresa_Activo'
      FROM PROVEEDORES AS Pro 
      INNER JOIN Entidades AS Ent ON Pro.EntidadId = Ent.Id
      LEFT JOIN Empresas AS Emp ON Pro.EmpresaId = Emp.Id
      ${soloActivos ? "WHERE Activo = 1" : ""}`;

  res = await DBACCESS(queryDB);
  return res;
};

exports.EditarProveedor = async (proveedor) => {
  let res = new DataBaseResult();
  let prov = new Proveedor(proveedor);

  let queryDB = ` UPDATE Proveedores SET
      EmpresaId = ${prov.EmpresaId}, Codigo = '${prov.Codigo}'
      WHERE Id = ${prov.Id};
      SELECT SCOPE_IDENTITY() AS Id`;

  res = await DBACCESS(queryDB);
  return res;
}

exports.EliminarProveedor = async (idProveedor) => {
  let res = new DataBaseResult();

  let queryDB = ` DELETE Proveedores WHERE Id = ${idProveedor};
      SELECT SCOPE_IDENTITY() AS Id`;

  res = await DBACCESS(queryDB);
  return res;
}

