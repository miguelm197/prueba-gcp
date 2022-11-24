const config = require("../Utils/Configuracion").load();
const { DataBaseResult } = require("../Entities/Genericos");

const sql = require("mssql");

const DBACCESS = async function (consulta) {
  let dbResult = new DataBaseResult();

  console.log(
    ". . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . ."
  );
  console.log("\n" + consulta + "\n");
  console.log(
    ". . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . ."
  );

  try {
    let pool = await sql.connect(config.DATABASE);
    let res = await pool.request().query(consulta);

    dbResult.Data = res.recordset;
    dbResult.Cant = res.rowsAffected[0];
    dbResult.Output = res.output;
    dbResult.RowsAffected = res.rowsAffected;
  } catch (err) {
    console.log(err);
    
    dbResult.Ok = false;
    dbResult.Error = err;
    dbResult.ErrorDetail = "Ha ocurrido un error inesperado en la Base de Datos";
    dbResult.Message = err.toString();
    // TODO LOG
  } finally {
    return dbResult;
  }
};

module.exports = { DBACCESS };


// $2b$10$r7D95IwJXMWX1I.XKLyzUevVO4dZCDfGFa4K6YRlElzLAu7mSXheC