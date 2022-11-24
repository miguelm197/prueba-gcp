const { Generico } = require("../Entities/Genericos");
const log = require("../Utils/Log");

const SVC_Empresas = require("../Services/SVC_Empresas");

exports.AltaEmpresa = async (req, res) => {
  console.log("\n# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #");
  log.normal("POST - AltaEmpresa /empresas/alta \n", true);

  let body = req.body;
  let retorno = new Generico();

  // Validar parámetros
  if (!body.Nombre) retorno.set(false, 406, "El nombre es requerido");
  if (!body.Rut) retorno.set(false, 406, "El rut es requerido");
  if (!body.RazonSocial) retorno.set(false, 406, "La razón social es requerida");

  if (retorno.Error) {
    log.normal(retorno, true, true);
    return res.status(retorno.Status).json(retorno);
  }

  // Crear cliente
  let newEmpresa = await SVC_Empresas.AltaEmpresa(body);

  if (newEmpresa.error) retorno.set(false, 500, "Ha ocurrido un error");
  if (newEmpresa.existe) retorno.set(false, 400, "El RUT " + body.Rut + " ya está registrado.");

  if (newEmpresa.ok) retorno.set(true, 200, "Empresa creada correctamente.", newEmpresa.data);

  return res.status(retorno.Status).json(retorno);
};

exports.ObtenerEmpresaPorId = async (req, res) => {
  console.log("\n# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #");
  log.normal("GET - ObtenerEmpresaPorId /empresas/{id} \n", true);

  let params = req.params;
  let retorno = new Generico();

  // Obtener la empresa
  let empresa = await SVC_Empresas.ObtenerEmpresaPorId(params.Id);
  if (empresa.error) retorno.set(false, 500, "Ha ocurrido un error");

  if (empresa.ok) retorno.set(true, 200, `Empresa con id ${params.Id}.`);
  retorno.Data = empresa.data || null;

  return res.status(retorno.Status).json(retorno);
};

exports.ObtenerEmpresas = async (req, res) => {
  console.log("\n# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #");
  log.normal("GET - ObtenerEmpresas /empresas/lista \n", true);

  let retorno = new Generico();

  // Obtener las empresas
  let empresas = await SVC_Empresas.ObtenerEmpresas();
  if (empresas.error) retorno.set(false, 500, "Ha ocurrido un error");

  if (empresas.ok) retorno.set(true, 200, "Lista de empresas registrados.");
  retorno.Data = empresas.data || null;

  return res.status(retorno.Status).json(retorno);
};
