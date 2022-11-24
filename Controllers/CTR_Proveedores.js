const { Generico } = require("../Entities/Genericos");
const log = require("../Utils/Log");

const SVC_Proveedores = require("../Services/SVC_Proveedores");

exports.AltaProveedor = async (req, res) => {
  console.log("\n# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #");
  log.normal("POST - AltaProveedor /proveedores/alta \n", true);

  let body = req.body;
  let retorno = new Generico();

  // Validar parámetros
  if (!body.nombre) retorno.set(false, 406, "El nombre es requerido");

  if (retorno.Error) {
    log.normal(retorno, true, true);
    return res.status(retorno.Status).json(retorno);
  }

  // Crear proveedor
  let newProveedor = await SVC_Proveedores.AltaProveedor(body);

  if (newProveedor.error) retorno.set(false, 500, "Ha ocurrido un error");
  if (newProveedor.existe) retorno.set(false, 400, "El email " + body.email + " ya está registrado.");
  if (newProveedor.noExisteEmpresa) retorno.set(false, 400, "La empresa no está registrada.");
  if (newProveedor.existeCodigo) retorno.set(false, 406, "El código " + body.codigo + " ya está registrado.");

  if (newProveedor.ok) retorno.set(true, 200, "Proveedor creado correctamente.", newProveedor.data);

  return res.status(retorno.Status).json(retorno);
};

exports.ObtenerProveedores = async (req, res) => {
  console.log("\n# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #");
  log.normal("GET - ObtenerProveedores /proveedores/lista \n", true);

  let retorno = new Generico();

  // Obtener los proveedores
  let proveedores = await SVC_Proveedores.ObtenerProveedores();
  if (proveedores.error) retorno.set(false, 500, "Ha ocurrido un error");

  if (proveedores.ok) retorno.set(true, 200, "Lista de proveedores registrados.");
  retorno.Data = proveedores.data || null;

  return res.status(retorno.Status).json(retorno);
};

exports.ObtenerProveedorPorId = async (req, res) => {
  console.log("\n# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #");
  log.normal("GET - ObtenerProveedorPorId /proveedores/{id} \n", true);

  let params = req.params;
  let retorno = new Generico();

  // Obtener el proveedores
  let proveedores = await SVC_Proveedores.ObtenerProveedorPorId(params.Id);
  if (proveedores.error) retorno.set(false, 500, "Ha ocurrido un error");
  if (proveedores.noExiste) retorno.set(false, 400, "El proveedor no está registrado");

  if (proveedores.ok) retorno.set(true, 200, `Proveedor con id ${params.Id}.`);
  retorno.Data = proveedores.data || null;

  return res.status(retorno.Status).json(retorno);
};

exports.EditarProveedor = async (req, res) => {
  console.log("\n# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #");
  log.normal("PUT - EditarProveedor /proveedores/editar \n", true);

  let body = req.body;
  let retorno = new Generico();

  // Validar parámetros
  if (!body.nombre) retorno.set(false, 406, "El nombre es requerido");
  if (!body.id) retorno.set(false, 406, "El id es requerido");

  if (retorno.Error) {
    log.normal(retorno, true, true);
    return res.status(retorno.Status).json(retorno);
  }

  // Editar proveedor
  let cambioProveedor = await SVC_Proveedores.EditarProveedor(body);

  if (cambioProveedor.error) retorno.set(false, 500, "Ha ocurrido un error");
  if (cambioProveedor.noExiste) retorno.set(false, 400, "El proveedor no está registrado");
  if (cambioProveedor.noExisteEmpresa) retorno.set(false, 400, "La empresa no está registrada.");
  if (cambioProveedor.existeCodigo) retorno.set(false, 406, "El código " + body.codigo + " ya está registrado.");

  if (cambioProveedor.ok) retorno.set(true, 200, "Proveedor actualizado correctamente.", cambioProveedor.data);

  return res.status(retorno.Status).json(retorno);
};

exports.EliminarProveedor = async (req, res) => {
  console.log("\n# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #");
  log.normal("DELETE - EliminarProveedor /proveedores/{Id} \n", true);

  let params = req.params;
  let retorno = new Generico();

  if (retorno.Error) {
    log.normal(retorno, true, true);
    return res.status(retorno.Status).json(retorno);
  }

  // Eliminar proveedor
  let eliminarProveedor = await SVC_Proveedores.EliminarProveedor(params.Id);

  if (eliminarProveedor.error) retorno.set(false, 500, "Ha ocurrido un error");
  if (eliminarProveedor.noExiste) retorno.set(false, 400, "El proveedor no está registrado");

  if (eliminarProveedor.ok) retorno.set(true, 200, "Proveedor eliminado correctamente.", eliminarProveedor.data);

  return res.status(retorno.Status).json(retorno);
};

// TODO: ObtenerProveeodorPorEmail

// TODO: EditarProveeodor

// TODO: BajaProveeodor
