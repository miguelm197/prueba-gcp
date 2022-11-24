const { DataBaseResult } = require("../Entities/Genericos");
const { DBACCESS } = require("./executer");
const { Cliente } = require("../Entities/Cliente");

exports.AltaCliente = async (cliente) => {
  let res = new DataBaseResult();
  let cli = new Cliente(cliente);

  let queryDB = ` INSERT INTO Clientes (EntidadId, EmpresaId, Codigo)
      VALUES (${cli.EntidadId}, ${cli.EmpresaId ? cli.EmpresaId : "NULL"}, '${cli.Codigo ? cli.Codigo : ""}');
      SELECT SCOPE_IDENTITY() AS Id`;

  res = await DBACCESS(queryDB);
  return res;
};

exports.ObtenerClientePorIdEntidad = async (idEntidad) => {
  let res = new DataBaseResult();

  let queryDB = `SELECT * FROM Clientes WHERE EntidadId = ${idEntidad}`;

  res = await DBACCESS(queryDB);
  return res;
};

exports.ObtenerClientePorCodigo = async (codigoCliente) => {
  let res = new DataBaseResult();

  let queryDB = `SELECT * FROM CLIENTES WHERE Codigo = '${codigoCliente}'`;

  res = await DBACCESS(queryDB);
  return res;
};

exports.ObtenerClientePorId = async (idCliente) => {
  let res = new DataBaseResult();

  let queryDB = `
      SELECT
        EntidadId AS 'entidad_Id', 
        Cli.Id AS 'cliente_Id',
        Ent.Nombre AS 'entidad_Nombre', 
        Ent.Email AS 'entidad_Email', 
        Cli.Codigo AS 'cliente_Codigo', 
        Ent.Telefono AS 'entidad_Telefono', 
        Ent.Telefono2 AS 'entidad_Telefono2', 
        Cli.EmpresaId AS 'cliente_EmpresaId', 
        Cli.Activo AS 'cliente_Activo',
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
        FROM Clientes AS Cli 
        INNER JOIN Entidades AS Ent ON Cli.EntidadId = Ent.Id
        LEFT JOIN Empresas AS Emp ON Cli.EmpresaId = Emp.Id
      WHERE Cli.Id = ${idCliente}`;

  res = await DBACCESS(queryDB);
  return res;
};

exports.ObtenerClientes = async (soloActivos = false) => {
  let res = new DataBaseResult();

  let queryDB = `
      SELECT
        EntidadId AS 'entidad_Id', 
        Cli.Id AS 'cliente_Id',
        Ent.Nombre AS 'entidad_Nombre', 
        Ent.Email AS 'entidad_Email', 
        Cli.Codigo AS 'cliente_Codigo', 
        Ent.Telefono AS 'entidad_Telefono', 
        Ent.Telefono2 AS 'entidad_Telefono2', 
        Cli.EmpresaId AS 'cliente_EmpresaId', 
        Cli.Activo AS 'cliente_Activo',
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
      FROM Clientes AS Cli 
      INNER JOIN Entidades AS Ent ON Cli.EntidadId = Ent.Id
      LEFT JOIN Empresas AS Emp ON Cli.EmpresaId = Emp.Id
      ${soloActivos ? "WHERE Activo = 1" : ""}`;

  res = await DBACCESS(queryDB);
  return res;
};

exports.EditarCliente = async (cliente) => {
  let res = new DataBaseResult();
  let cli = new Cliente(cliente);

  let queryDB = ` UPDATE Clientes SET
      EmpresaId = ${cli.EmpresaId}, Codigo = '${cli.Codigo}'
      WHERE Id = ${cli.Id};
      SELECT SCOPE_IDENTITY() AS Id`;

  res = await DBACCESS(queryDB);
  return res;
}

exports.EliminarCliente = async (idCliente) => {
  let res = new DataBaseResult();

  let queryDB = ` DELETE Clientes WHERE Id = ${idCliente};
      SELECT SCOPE_IDENTITY() AS Id`;

  res = await DBACCESS(queryDB);
  return res;
}

// TODO: Eliminar cliente
