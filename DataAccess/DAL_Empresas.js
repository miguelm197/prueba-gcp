const { DataBaseResult } = require("../Entities/Genericos");
const { DBACCESS } = require("./executer");
const { Empresa } = require("../Entities/Empresa");
const { EmpresaBD } = require("../Entities/TablasBD");

exports.AltaEmpresa = async (empresa) => {
  let res = new DataBaseResult();
  let emp = new EmpresaBD(empresa);

  console.log("emp", emp);

  let queryDB = `
        INSERT INTO Empresas (Nombre, RazonSocial, Rut, Direccion, PaisId, EstadoId, Ciudad, Comentario)
        VALUES (
           '${emp.Nombre}',
           '${emp.RazonSocial}',
            ${emp.Rut},
            ${emp.Direccion ? "'" + emp.Direccion + "'" : "NULL"},
            ${emp.PaisId ? emp.PaisId : "NULL"},
            ${emp.EstadoId ? emp.EstadoId : "NULL"},
            ${emp.Ciudad ? "'" + emp.Ciudad + "'" : "NULL"},
            ${emp.Comentario ? "'" + emp.Comentario + "'" : "NULL"}
        );
        SELECT SCOPE_IDENTITY() AS Id`;

  res = await DBACCESS(queryDB);
  return res;
};

exports.ObtenerEmpresaPorId = async (idEmpresa) => {
  let res = new DataBaseResult();

  let queryDB = `SELECT 
          Empresas.Id,
          Empresas.Nombre,
          Empresas.Rut,
          Empresas.RazonSocial,
          Empresas.PaisId,
          Paises.Nombre AS 'PaisNombre',
          Empresas.EstadoId,
          Estados_Paises.Nombre AS 'EstadoNombre',
          Empresas.Ciudad,
          Empresas.Comentario,
          Empresas.Activo
          FROM Empresas 
          LEFT JOIN Paises ON Empresas.PaisId = Paises.Id
          LEFT JOIN Estados_Paises ON Empresas.EstadoId = Estados_Paises.Id
          WHERE Empresas.Id = ${idEmpresa}`;

  res = await DBACCESS(queryDB);
  return res;
};

exports.ObtenerEmpresaPorRut = async (rutEmpresa) => {
  let res = new DataBaseResult();

  let queryDB = `SELECT
          Empresas.Id,
          Empresas.Nombre,
          Empresas.Rut,
          Empresas.RazonSocial,
          Empresas.PaisId,
          Paises.Nombre AS 'PaisNombre',
          Empresas.EstadoId,
          Estados_Paises.Nombre AS 'EstadoNombre',
          Empresas.Ciudad,
          Empresas.Comentario,
          Empresas.Activo
          FROM Empresas 
          LEFT JOIN Paises ON Empresas.PaisId = Paises.Id
          LEFT JOIN Estados_Paises ON Empresas.EstadoId = Estados_Paises.Id
          WHERE Empresas.Rut = ${rutEmpresa}`;

  res = await DBACCESS(queryDB);
  return res;
};

exports.ObtenerEmpresas = async (soloActivos = false) => {
  let res = new DataBaseResult();

  let queryDB = `SELECT 
            Empresas.Id,
            Empresas.Nombre,
            Empresas.Rut,
            Empresas.RazonSocial,
            Empresas.PaisId,
            Paises.Nombre AS 'PaisNombre',
            Empresas.EstadoId,
            Estados_Paises.Nombre AS 'EstadoNombre',
            Empresas.Ciudad,
            Empresas.Comentario,
            Empresas.Activo
            FROM Empresas 
            LEFT JOIN Paises ON Empresas.PaisId = Paises.Id
            LEFT JOIN Estados_Paises ON Empresas.EstadoId = Estados_Paises.Id
            ${soloActivos ? "WHERE Empresas.Activo = 1" : ""}`;

  res = await DBACCESS(queryDB);
  return res;
};

// TODO: Editar empresa

// TODO: Eliminar empresa
