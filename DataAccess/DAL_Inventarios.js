const { DataBaseResult } = require("../Entities/Genericos");
const { DBACCESS } = require("./executer");
const { Inventario } = require("../Entities/Inventario");

exports.AltaInventario = async (inventario) => {
  let res = new DataBaseResult();
  let inv = new Inventario(inventario);

  let queryDB = ` INSERT INTO Inventario (Nombre, Codigo, ProveedorId, Fecha, Activo)
      VALUES ('${inv.Nombre}', '${inv.Codigo || ""}', ${inv.ProveedorId}, ${inv.Fecha ? "'" + inv.Fecha + "'" : "NULL"}, ${inv.Activo ? 1 : 0});
      SELECT SCOPE_IDENTITY() AS Id`;

  res = await DBACCESS(queryDB);
  return res;
};

exports.ObtenerInventarioPorCodigo = async (codigoInventario) => {
  let res = new DataBaseResult();

  let queryDB = `SELECT * FROM INVENTARIO WHERE Codigo = '${codigoInventario}'`;

  res = await DBACCESS(queryDB);
  return res;
};

exports.ObtenerInventarioPorId = async (idInventario) => {
  let res = new DataBaseResult();

  let queryDB = `
      SELECT
        Inv.Id AS 'inventario_Id',
        Inv.Nombre AS 'inventario_Nombre',
        Inv.Codigo AS 'inventario_Codigo',
        Inv.Fecha AS 'inventario_Fecha',
        Inv.Activo AS 'inventario_Activo',
        Pro.Id AS 'proveedor_Id',
        Pro.Codigo AS 'proveedor_Codigo',
        Pro.Activo AS 'proveedor_Activo',
        Ent.Id AS 'entidad_Id',
        Ent.Nombre AS 'entidad_Nombre',
        Ent.Email AS 'entidad_Email',
        Ent.Telefono AS 'entidad_Telefono',
        Ent.Telefono2 AS 'entidad_Telefono2',
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
      FROM INVENTARIO AS Inv 
      INNER JOIN PROVEEDORES AS Pro ON Inv.ProveedorId = Pro.Id
      LEFT JOIN ENTIDADES AS Ent ON Ent.Id = Pro.EntidadId
      LEFT JOIN EMPRESAS AS Emp ON Emp.Id = Pro.EmpresaId
      WHERE Inv.Id = ${idInventario}`;

  res = await DBACCESS(queryDB);
  return res;
};

exports.ObtenerInventarios = async (soloActivos = false) => {
  let res = new DataBaseResult();

  let queryDB = `
      SELECT
        Inv.Id AS 'inventario_Id',
        Inv.Nombre AS 'inventario_Nombre',
        Inv.Codigo AS 'inventario_Codigo',
        Inv.Fecha AS 'inventario_Fecha',
        Inv.Activo AS 'inventario_Activo',
        Pro.Id AS 'proveedor_Id',
        Pro.Codigo AS 'proveedor_Codigo',
        Pro.Activo AS 'proveedor_Activo',
        Ent.Id AS 'entidad_Id',
        Ent.Nombre AS 'entidad_Nombre',
        Ent.Email AS 'entidad_Email',
        Ent.Telefono AS 'entidad_Telefono',
        Ent.Telefono2 AS 'entidad_Telefono2',
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
      FROM INVENTARIO AS Inv 
      INNER JOIN PROVEEDORES AS Pro ON Inv.ProveedorId = Pro.Id
      LEFT JOIN ENTIDADES AS Ent ON Ent.Id = Pro.EntidadId
      LEFT JOIN EMPRESAS AS Emp ON Emp.Id = Pro.EmpresaId
      ${soloActivos ? "WHERE Inv.Activo = 1" : ""}`;

  res = await DBACCESS(queryDB);
  return res;
};

exports.EditarInventario = async (inventario) => {
  let res = new DataBaseResult();
  let inv = new Inventario(inventario);

  let queryDB = ` UPDATE INVENTARIO SET
      Nombre = '${inv.Nombre}', 
      Codigo = '${inv.Codigo || ""}',
      ProveedorId = ${inv.ProveedorId},
      Fecha = '${inv.Fecha}', 
      Activo = ${inv.Activo ? 1 : 0}
      WHERE Id = ${inv.Id};

      SELECT SCOPE_IDENTITY() AS Id`;

  res = await DBACCESS(queryDB);
  return res;
}

exports.EliminarInventario = async (idInventario) => {
  let res = new DataBaseResult();

  let queryDB = ` DELETE INVENTARIO WHERE Id = ${idInventario};
      SELECT SCOPE_IDENTITY() AS Id`;

  res = await DBACCESS(queryDB);
  return res;
}

